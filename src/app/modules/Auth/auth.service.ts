import { UserStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { jwtHelpers } from "../../../Helper/jwtHelper";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
const loginUserIntoDB = async (payload: {
  password: string;
  email: string;
}) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
      isDeleted: false,
    },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User does not exists!");
  }

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Your password is incorrect!");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  //generate accessToken
  const accessToken = await jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );
  //generate refreshToken
  const refreshToken = await jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  const decodedData = await jwtHelpers.verifyToken(
    refreshToken,
    config.jwt.refresh_token_secret as string
  );

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
      isDeleted: false,
    },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User does not exists!");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  //generate access token
  const accessToken = await jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  return { accessToken };
};

export const AuthServices = {
  loginUserIntoDB,
  refreshToken,
};

import { User } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: any): Promise<User> => {
  console.log(payload);
  const admin = await prisma.user.findUnique({
    where: {
      email: payload.user.email,
    },
  });

  if (admin) {
    throw new ApiError(StatusCodes.CONFLICT, "This email already registered!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const adminData = {
    name: payload.user.name,
    email: payload.user.email,
    photoUrl: payload.user.photoUrl,
    password: hashedPassword,
  };
  const createdUserData = await prisma.user.create({
    data: adminData,
  });

  return createdUserData;
};

export const UserServices = {
  createUserIntoDB,
};

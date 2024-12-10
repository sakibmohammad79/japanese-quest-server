import { User } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

const createAdminIntoDB = async (payload: any): Promise<User> => {
  const admin = await prisma.user.findUnique({
    where: {
      email: payload.body.user.email,
    },
  });

  if (admin) {
    throw new ApiError(StatusCodes.CONFLICT, "This email already registered!");
  }

  const hashedPassword = await bcrypt.hash(payload.body.password, 12);

  const adminData = {
    password: hashedPassword,
  };
  const createdUserData = await prisma.user.create({
    data: adminData,
  });

  return createdUserData;
};

export const UserServices = {
  createAdminIntoDB,
};

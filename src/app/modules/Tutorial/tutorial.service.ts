import { Tutorial, UserStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";

const createTutorialIntoDB = async (payload: any): Promise<Tutorial> => {
  const user = await prisma.user.findUnique({
    where: {
      id: payload.createdById,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not exits!");
  }

  const createTutorialData = await prisma.tutorial.create({
    data: payload,
  });
  return createTutorialData;
};

export const TutorailServices = {
  createTutorialIntoDB,
};

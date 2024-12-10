import { Lesson, UserStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";

const createLessonIntoDB = async (payload: any): Promise<Lesson> => {
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
  const createLessonData = await prisma.lesson.create({
    data: payload,
  });
  return createLessonData;
};
export const LessonServices = {
  createLessonIntoDB,
};

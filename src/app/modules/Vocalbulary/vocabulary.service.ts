import { Lesson, UserStatus, Vocabulary } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";

const createVocabularyIntoDB = async (payload: any): Promise<Vocabulary> => {
  const user = await prisma.user.findUnique({
    where: {
      id: payload.adminId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not exits!");
  }
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: payload.lessonId,
    },
  });
  if (!lesson) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Lesson not exits!");
  }
  const createVocabularyData = await prisma.vocabulary.create({
    data: payload,
  });
  return createVocabularyData;
};
export const VocabularyServices = {
  createVocabularyIntoDB,
};

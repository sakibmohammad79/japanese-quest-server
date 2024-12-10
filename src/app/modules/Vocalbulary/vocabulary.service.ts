import { Lesson, Prisma, UserStatus, Vocabulary } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import { IPaginationOptions } from "../../Interface/pagination";
import { paginationHelpers } from "../../../Helper/paginationHelpers";
import { vocabularySearchableFields } from "./vocabulary.constant";

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

const getAllVocabularyFromDB = async (
  params: any,
  options: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andCondition: Prisma.VocabularyWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: vocabularySearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //search field exact same

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.VocabularyWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};

  const result = await prisma.vocabulary.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.vocabulary.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getAllVocabularyByLesson = async (
  lessonId: string,
  params: any,
  options: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andCondition: Prisma.VocabularyWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: vocabularySearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //search field exact same

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // Add lessonId filter if provided
  if (lessonId) {
    andCondition.push({
      lessonId: {
        equals: lessonId,
      },
    });
  }

  const whereCondition: Prisma.VocabularyWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};

  const result = await prisma.vocabulary.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.vocabulary.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleVocabularyByID = async (id: string) => {
  const vocabulary = await prisma.vocabulary.findFirstOrThrow({
    where: {
      id,
    },
  });

  return vocabulary;
};

const updateVocabularyIntoDB = async (
  id: string,
  payload: Partial<Vocabulary>
): Promise<Vocabulary | null> => {
  const vocabulary = await prisma.vocabulary.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!vocabulary) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Vocabulary not exits!");
  }
  const updatedVocabularyData = await prisma.vocabulary.update({
    where: {
      id: vocabulary.id,
    },
    data: payload,
  });
  return updatedVocabularyData;
};

const deleteVocabularyFromDB = async (
  id: string
): Promise<Vocabulary | null> => {
  //  Find the lesson
  const vocabulary = await prisma.vocabulary.findUniqueOrThrow({
    where: { id },
  });

  const deletedVocabulary = await prisma.vocabulary.delete({
    where: { id: vocabulary.id },
  });

  return deletedVocabulary;
};
export const VocabularyServices = {
  createVocabularyIntoDB,
  getAllVocabularyFromDB,
  getAllVocabularyByLesson,
  getSingleVocabularyByID,
  updateVocabularyIntoDB,
  deleteVocabularyFromDB,
};

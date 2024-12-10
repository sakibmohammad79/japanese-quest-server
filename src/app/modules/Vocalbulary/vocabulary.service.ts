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

// const updateLessonIntoDB = async (
//   id: string,
//   payload: Partial<Lesson>
// ): Promise<Lesson | null> => {
//   const lesson = await prisma.lesson.findUniqueOrThrow({
//     where: {
//       id,
//     },
//   });

//   if (!lesson) {
//     throw new ApiError(StatusCodes.NOT_FOUND, "Lesson not exits!");
//   }
//   const updatedLessonData = await prisma.lesson.update({
//     where: {
//       id: lesson.id,
//     },
//     data: payload,
//   });
//   return updatedLessonData;
// };

// const getSingleLessonByID = async (id: string) => {
//   const LessonData = await prisma.lesson.findFirstOrThrow({
//     where: {
//       id,
//     },
//   });

//   return LessonData;
// };

// const deleteLessonFromDB = async (id: string): Promise<Lesson | null> => {
//   //  Find the lesson
//   const lesson = await prisma.lesson.findUniqueOrThrow({
//     where: { id },
//   });

//   // Check if there are any vocabularies related to this lesson
//   const vocabulariesExist = await prisma.vocabulary.count({
//     where: { lessonId: lesson.id },
//   });

//   //If vocabularies exist, delete them
//   if (vocabulariesExist > 0) {
//     await prisma.vocabulary.deleteMany({
//       where: { lessonId: lesson.id },
//     });
//   } else {
//     console.log("No vocabularies found for this lesson.");
//   }

//   //Delete the lesson itself
//   const deletedLesson = await prisma.lesson.delete({
//     where: { id: lesson.id },
//   });

//   return deletedLesson;
// };
export const VocabularyServices = {
  createVocabularyIntoDB,
  getAllVocabularyFromDB,
  getAllVocabularyByLesson,
};

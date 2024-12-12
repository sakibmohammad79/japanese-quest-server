import { Lesson, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import { IPaginationOptions } from "../../Interface/pagination";
import { paginationHelpers } from "../../../Helper/paginationHelpers";
import { lesssonSearchableFields } from "./lesson.constant";

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

  const lastLesson = await prisma.lesson.findFirst({
    orderBy: { lessonNumber: "desc" },
  });

  const nextLessonNumber = (lastLesson?.lessonNumber || 0) + 1;

  const createLessonData = await prisma.lesson.create({
    data: {
      ...payload,
      lessonNumber: nextLessonNumber,
    },
  });
  return createLessonData;
};

const getAllLessonFromDB = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andCondition: Prisma.LessonWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: lesssonSearchableFields.map((field) => ({
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

  const whereCondition: Prisma.LessonWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};

  const result = await prisma.lesson.findMany({
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

  const total = await prisma.lesson.count({
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

const updateLessonIntoDB = async (
  id: string,
  payload: Partial<Lesson>
): Promise<Lesson | null> => {
  const lesson = await prisma.lesson.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Lesson not exits!");
  }
  const updatedLessonData = await prisma.lesson.update({
    where: {
      id: lesson.id,
    },
    data: payload,
  });
  return updatedLessonData;
};

const getSingleLessonByID = async (id: string) => {
  const LessonData = await prisma.lesson.findFirstOrThrow({
    where: {
      id,
    },
  });

  return LessonData;
};

const deleteLessonFromDB = async (id: string): Promise<Lesson | null> => {
  //  Find the lesson
  const lesson = await prisma.lesson.findUniqueOrThrow({
    where: { id },
  });

  // Check if there are any vocabularies related to this lesson
  const vocabulariesExist = await prisma.vocabulary.count({
    where: { lessonId: lesson.id },
  });

  //If vocabularies exist, delete them
  if (vocabulariesExist > 0) {
    await prisma.vocabulary.deleteMany({
      where: { lessonId: lesson.id },
    });
  } else {
    console.log("No vocabularies found for this lesson.");
  }

  //Delete the lesson itself
  const deletedLesson = await prisma.lesson.delete({
    where: { id: lesson.id },
  });

  return deletedLesson;
};
const publishLessonIntoDB = async (id: string) => {
  //  Find the lesson
  const lesson = await prisma.lesson.findUnique({
    where: { id },
  });

  if (!lesson) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Lesson Not Found!");
  }
  // check is already published
  const isPublished = await prisma.lesson.findUnique({
    where: {
      id: lesson.id,
      isPublish: true,
    },
  });

  if (isPublished) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Lesson Already Published!");
  }

  //Delete the lesson itself
  const publishLesson = await prisma.lesson.update({
    where: {
      id: lesson.id,
    },
    data: {
      isPublish: true,
    },
  });

  return publishLesson;
};

export const LessonServices = {
  createLessonIntoDB,
  getAllLessonFromDB,
  updateLessonIntoDB,
  getSingleLessonByID,
  deleteLessonFromDB,
  publishLessonIntoDB,
};

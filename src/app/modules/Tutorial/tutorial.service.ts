import { Prisma, Tutorial, UserStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import { IPaginationOptions } from "../../Interface/pagination";
import { paginationHelpers } from "../../../Helper/paginationHelpers";
import { tutorialSearchableFields } from "./tutorial.constant";

const getAllTutorialFromDB = async (
  params: any,
  options: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andCondition: Prisma.TutorialWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: tutorialSearchableFields.map((field) => ({
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

  const whereCondition: Prisma.TutorialWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};

  const result = await prisma.tutorial.findMany({
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

  const total = await prisma.tutorial.count({
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
  getAllTutorialFromDB,
  createTutorialIntoDB,
};

import { Prisma, User } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { IPaginationOptions } from "../../Interface/pagination";
import { paginationHelpers } from "../../../Helper/paginationHelpers";
import { userSearchableFields } from "./user.constant";

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

const getAllUserFromDB = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andCondition: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: userSearchableFields.map((field) => ({
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

  const whereCondition: Prisma.UserWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};

  const result = await prisma.user.findMany({
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
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
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

const getSingleUserByID = async (id: string) => {
  const UserData = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  return UserData;
};
export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserByID,
};

import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../../Shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { userFilterableFields } from "./user.constant";
import { pick } from "../../../Shared/pick";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await UserServices.getAllUserFromDB(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All user fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.getSingleUserByID(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User data fetched successfully!",
      data: result,
    });
  }
);

const deleteUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await UserServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User deleted successfully!",
    data: result,
  });
});
const softDeleteUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await UserServices.softDeleteUserFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User soft deleted successfully!",
    data: result,
  });
});

const updateUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const result = await UserServices.updateUserIntoDB(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User data updated successfully!",
    data: result,
  });
});

const changeUserStatus: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.changeUserStatus(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User status change successfully!",
    data: result,
  });
});
const makeAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.makeAdminIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Update user role, This user now admin!",
    data: result,
  });
});
const makeUser: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.makeUserDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Update user role, This user now user!",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  softDeleteUser,
  updateUser,
  changeUserStatus,
  makeAdmin,
  makeUser,
};

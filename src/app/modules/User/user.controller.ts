import { RequestHandler } from "express";
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

export const UserController = {
  createUser,
  getAllUser,
};

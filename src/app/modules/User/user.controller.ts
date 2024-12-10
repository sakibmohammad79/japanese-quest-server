import { RequestHandler } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../../Shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

export const UserController = {
  createUser,
};

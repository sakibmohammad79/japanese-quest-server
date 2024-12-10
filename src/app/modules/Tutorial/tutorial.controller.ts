import { RequestHandler } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { TutorailServices } from "./tutorial.service";
import { sendResponse } from "../../../Shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createTutorial: RequestHandler = catchAsync(async (req, res) => {
  const result = await TutorailServices.createTutorialIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "New tutorial created successfully!",
    data: result,
  });
});

export const TutorialController = {
  createTutorial,
};

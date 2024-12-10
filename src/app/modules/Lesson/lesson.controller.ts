import { RequestHandler } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { LessonServices } from "./lesson.service";
import { sendResponse } from "../../../Shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createLesson: RequestHandler = catchAsync(async (req, res) => {
  const result = await LessonServices.createLessonIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "New Lesson created successfully!",
    data: result,
  });
});

export const LessonController = {
  createLesson,
};

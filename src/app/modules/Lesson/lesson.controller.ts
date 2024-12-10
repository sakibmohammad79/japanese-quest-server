import { RequestHandler } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { LessonServices } from "./lesson.service";
import { sendResponse } from "../../../Shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { userFilterableFields } from "../User/user.constant";
import { pick } from "../../../Shared/pick";

const createLesson: RequestHandler = catchAsync(async (req, res) => {
  const result = await LessonServices.createLessonIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "New Lesson created successfully!",
    data: result,
  });
});

const getAllLesson: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await LessonServices.getAllLessonFromDB(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All  Lesson fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const updateLesson: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const result = await LessonServices.updateLessonIntoDB(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Lesson data updated successfully!",
    data: result,
  });
});

const singleLesson: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await LessonServices.getSingleLessonByID(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Single lesson get successfully!",
    data: result,
  });
});
const deleteLesson: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await LessonServices.deleteLessonFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Lesson deleted successfully!",
    data: result,
  });
});

export const LessonController = {
  createLesson,
  getAllLesson,
  updateLesson,
  singleLesson,
  deleteLesson,
};

import { RequestHandler } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { TutorailServices } from "./tutorial.service";
import { sendResponse } from "../../../Shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { pick } from "../../../Shared/pick";
import { tutorialFilterableFields } from "./tutorial.constant";

const getAllTutorial: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, tutorialFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await TutorailServices.getAllTutorialFromDB(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All  tutorial fetched!",
    meta: result.meta,
    data: result.data,
  });
});
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
  getAllTutorial,
  createTutorial,
};

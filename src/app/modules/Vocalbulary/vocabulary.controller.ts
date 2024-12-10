import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../Shared/catchAsync";
import { sendResponse } from "../../../Shared/sendResponse";
import { VocabularyServices } from "./vocabulary.service";

const createVocabulary: RequestHandler = catchAsync(async (req, res) => {
  const result = await VocabularyServices.createVocabularyIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "New vocabulary created successfully!",
    data: result,
  });
});

export const VocabularyController = {
  createVocabulary,
};

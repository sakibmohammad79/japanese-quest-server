import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../Shared/catchAsync";
import { sendResponse } from "../../../Shared/sendResponse";
import { VocabularyServices } from "./vocabulary.service";
import { userFilterableFields } from "../User/user.constant";
import { pick } from "../../../Shared/pick";

const createVocabulary: RequestHandler = catchAsync(async (req, res) => {
  const result = await VocabularyServices.createVocabularyIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "New vocabulary created successfully!",
    data: result,
  });
});

const getAllVocabulary: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await VocabularyServices.getAllVocabularyFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All  Vacabulary fetched!",
    meta: result.meta,
    data: result.data,
  });
});
const getAllVocabularyByLesson: RequestHandler = catchAsync(
  async (req, res) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const { id } = req.params;
    const result = await VocabularyServices.getAllVocabularyByLesson(
      id,
      filters,
      options
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All  Vacabulary fetched by lesson!",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleVocabulary: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const result = await VocabularyServices.getSingleVocabularyByID(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Single vocabulary get successfully!",
      data: result,
    });
  }
);

const updateVocabulary: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const result = await VocabularyServices.updateVocabularyIntoDB(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vocabulary data updated successfully!",
    data: result,
  });
});

const deleteVocabulary: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await VocabularyServices.deleteVocabularyFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vocabulary deleted successfully!",
    data: result,
  });
});

export const VocabularyController = {
  createVocabulary,
  getAllVocabulary,
  getAllVocabularyByLesson,
  getSingleVocabulary,
  updateVocabulary,
  deleteVocabulary,
};

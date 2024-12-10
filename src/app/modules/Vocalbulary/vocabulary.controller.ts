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

// const updateLesson: RequestHandler = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const data = req.body;
//   const result = await LessonServices.updateLessonIntoDB(id, data);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "Lesson data updated successfully!",
//     data: result,
//   });
// });

// const singleLesson: RequestHandler = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const result = await LessonServices.getSingleLessonByID(id);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "Single lesson get successfully!",
//     data: result,
//   });
// });
// const deleteLesson: RequestHandler = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const result = await LessonServices.deleteLessonFromDB(id);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "Lesson deleted successfully!",
//     data: result,
//   });
// });

export const VocabularyController = {
  createVocabulary,
  getAllVocabulary,
  getAllVocabularyByLesson,
};

import {
  IPaginationOptions,
  IPaginationResult,
} from "../app/Interface/pagination";

const calculatePagination = (
  options: IPaginationOptions
): IPaginationResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 50;
  const skip: number = (page - 1) * limit;
  const sortBy: string = options.sortBy || "createdAt";
  const sortOrder: string = options.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};

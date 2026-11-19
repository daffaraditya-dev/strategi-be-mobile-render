import { isNaN, slice } from "lodash";

export function paginate<T>(data: T[], page?: number, pageSize?: number) {
  const isValidPage = page && !isNaN(page) && page > 0;
  const isValidPageSize = pageSize && !isNaN(pageSize) && pageSize > 0;


  if (!isValidPage || !isValidPageSize) {
    return {
      page: 1,
      pageSize: data.length,
      total: data.length,
      totalPages: 1,
      data,
    };
  }

  const total = data.length;
  const totalPages = Math.ceil(total / Number(pageSize));
  const start = (Number(page) - 1) * Number(pageSize);
  const paginated = slice(data, start, start + Number(pageSize));


  return {
    page: Number(page),
    pageSize: Number(pageSize),
    total,
    totalPages,
    data: paginated,
  };
}

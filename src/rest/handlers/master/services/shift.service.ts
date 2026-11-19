import { AppDataSource } from "@/data-source";
import { LaporanPoskoShift } from "@/entities/LaporanPoskoShift";

export const getShiftList = async () => {
  const repo = AppDataSource.getRepository(LaporanPoskoShift);
  return repo.find();
};

export const getShiftDetail = async (id: number) => {
  const repo = AppDataSource.getRepository(LaporanPoskoShift);
  return repo.findOne({ where: { id } });
};

export const createShift = async (payload: {
  name: string;
  startTime: string;
  endTime: string;
}) => {
  const repo = AppDataSource.getRepository(LaporanPoskoShift);

  const shift = repo.create({
    ...payload
  });

  return await repo.save(shift);
};

export const updateShift = async (
  id: number,
  payload: {
    name?: string;
    startTime?: string;
    endTime?: string;
  }
) => {
  const repo = AppDataSource.getRepository(LaporanPoskoShift);

  await repo.update(id, payload);
  return repo.findOne({ where: { id } });
};

export const deleteShift = async (id: number) => {
  const repo = AppDataSource.getRepository(LaporanPoskoShift);

  await repo.delete(id);
  return { success: true };
};

import { AppDataSource } from '@/data-source';
import { MstProvinsi } from '@/entities/MstProvinsi';

let cache: MstProvinsi[] | null = null;

export async function getProvinceCache(): Promise<MstProvinsi[]> {
  if (cache) return cache;
  cache = await AppDataSource.getRepository(MstProvinsi).find();
  return cache;
}

export function findProvince(provinces: MstProvinsi[], name: string | undefined | null): MstProvinsi | undefined {
  if (!name || name === 'null' || name === 'undefined') return undefined;
  const lower = name.toLowerCase();
  return provinces.find(p => p.namaProvinsi?.toLowerCase().includes(lower));
}

export function invalidateProvinceCache(): void {
  cache = null;
}

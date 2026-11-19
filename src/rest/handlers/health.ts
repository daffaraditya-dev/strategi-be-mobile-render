import { Request, Response } from "express";
import os from "os";

interface HealthResponse {
  status: boolean;
  data: {
    message: string;
    memoryUsage: NodeJS.MemoryUsage;
    cpuUsage: NodeJS.CpuUsage;
    totalMemory: string;
    freeMemory: string;
  };
}

export const healthHandler = (req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  const totalMemoryInBytes = os.totalmem();
  const freeMemoryInBytes = os.freemem();

  const data: HealthResponse = {
    status: true,
    data: {
      message: "server is up",
      memoryUsage,
      cpuUsage,
      totalMemory: `${(totalMemoryInBytes / (1024 * 1024)).toFixed(2)} MB`, // convert to MB with 2 decimal places
      freeMemory: `${(freeMemoryInBytes / (1024 * 1024)).toFixed(2)} MB`, // convert to MB with 2 decimal places
    },
  };

  res.json(data);
};

import "dotenv/config";

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3003,
  dbHost: process.env.DB_HOST as string,
  dbPort: process.env.DB_PORT as unknown as number,
  dbUser: process.env.DB_USER as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbName: process.env.DB_NAME as string,
  dbType: process.env.DB_TYPE as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN as string,
  jwtRefreshExpiresIn: (process.env.JWT_REFRESH_EXPIRES_IN as string) || "7d",
  hubnetApiUrl: process.env.HUBNET_API_URL as string,
  hubnetBackendApiUrl: process.env.HUBNET_BACKEND_API_URL as string, //hubnetBackendApiUrl
  hubnetBackendApiKey: process.env.HUBNET_BACKEND_API_KEY as string,
  rssUrl: process.env.RSS_URL as string,
  cacheDuration: process.env.CACHE_DURATION || "5 minutes",
  cacheDir: process.env.CACHE_DIR || "../cache",
  cacheTtl: (process.env.CACHE_TTL as unknown as number) || 300,
  uploadDir: process.env.UPLOAD_DIR as string || "uploads",
};

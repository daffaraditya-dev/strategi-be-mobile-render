import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Strategi Mobile API",
      description:
        "API endpoints for Strategi Mobile App documented on swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT ? process.env.PORT : 3003}/`,
        description: "Local server",
      },
      {
        url: `${process.env.LIVE_SERVER_URL}/`,
        description: "Live server",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional: for UI display only
        },
      },
    },
  },
  apis: ["./src/rest/routes.ts", "./src/rest/routes/docs/*.ts", "./src/rest/routes/docs/v2/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express) {
  // Swagger Page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

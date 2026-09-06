import express from "express";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", service: "github-actions-cicd" });
  });

  app.get("/version", (_req, res) => {
    res.status(200).json({ version: process.env.APP_VERSION ?? "dev" });
  });

  return app;
};

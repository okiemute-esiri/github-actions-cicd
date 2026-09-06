import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("service API", () => {
  it("reports healthy status", async () => {
    const response = await request(createApp()).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok", service: "github-actions-cicd" });
  });

  it("returns the development version by default", async () => {
    const response = await request(createApp()).get("/version");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ version: "dev" });
  });
});

import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Redis disabled for local development to avoid connection errors

export const redis = {
    get: async () => null,
    set: async () => null,
    del: async () => null
};

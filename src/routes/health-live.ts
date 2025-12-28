import { FastifyInstance } from "fastify";

export async function HealthLive(app: FastifyInstance) {
    app.get("/health/live", async () => ({ 
        status: "alive"
    }));
}
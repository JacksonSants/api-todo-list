import { FastifyInstance } from "fastify";

export async function HealthCheck(app: FastifyInstance) {
    app.get("/health", async (_, reply) => {
        return reply.status(200).send({
            status: "ok",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        });
    });
}

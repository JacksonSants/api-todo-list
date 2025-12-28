import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function updateTask(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .put('/updateTask/:id', {
            schema: {
                params: z.object({
                    id: z.string().uuid(),
                }),
                body: z.object({
                    title: z.string(),
                    dateTime: z.string(),
                    description: z.string(),
                }),
                response: {
                    200: z.object({
                        id: z.string(),
                        title: z.string(),
                        dateTime: z.string(),
                        description: z.string(),
                    }),
                },
            },
        }, async (request, reply) => {
            const { id } = request.params;
            const { title, dateTime, description } = request.body;

            const task = await prisma.task.update({
                where: { id },
                data: {
                    title,
                    dateTime: new Date(dateTime),
                    description,
                },
            });

            return reply.code(200).send({
                id: task.id,
                title: task.title,
                dateTime: task.dateTime.toISOString(),
                description: task.description,
            });
        });
}

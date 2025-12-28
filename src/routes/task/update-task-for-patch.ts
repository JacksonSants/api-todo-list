import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function updateTaskForPatch(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .patch('/updateTask/:id', {
            schema: {
                params: z.object({
                    id: z.string().uuid(),
                }),
                body: z.object({
                    title: z.string().nullish(),
                    dateTime: z.string().nullish(),
                    description: z.string().nullish(),
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
                    title: title ?? undefined,
                    dateTime: dateTime ? new Date(dateTime) : undefined,
                    description: description ?? undefined,
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

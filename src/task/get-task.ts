import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getTask(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get('/getTask', {
            schema: {
                querystring: z.object({
                    query: z.string().nullish(),
                    pageIndex: z.string().nullish().default('0').transform(Number),
                }),
                response: {
                    200: z.array(z.object({
                        id: z.string(),
                        title: z.string(),
                        dateTime: z.string(),
                        description: z.string(),
                    })),
                },
            },
        }, async (request, reply) => {
            const { query, pageIndex } = request.query;

            const pageSize = 10;

            const tasks = await prisma.task.findMany({
                where: {
                    title: query ? {
                        contains: query,
                    } : undefined,
                },
                skip: pageIndex * pageSize,
                take: pageSize,
            });

            const formattedTasks = tasks.map(task => ({
                id: task.id,
                title: task.title,
                dateTime: task.dateTime.toISOString(),
                description: task.description,
            }));

            return reply.code(200).send(formattedTasks);
        });
}

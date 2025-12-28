import { FastifyInstance, FastifyTypeProvider } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z, date } from "zod";
import { prisma } from "../../lib/prisma";

export async function createTask(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .post('/createTask', {
            schema: {
                body: z.object({
                    title: z.string(),
                    dateTime: z.string().datetime(),
                    description: z.string(),
                }),
                response: {
                    201: z.object({
                        taskId: z.string().uuid(),
                    }),
                },
            }

        }, async  (request, reply) => {
            const { title, dateTime, description } = request.body;

            const task = await prisma.task.create({
                data: {
                    title,
                    dateTime,
                    description,
                    completed:  false,

                }
            })

            return  reply.code(201).send({taskId:  task.id})
        })

}
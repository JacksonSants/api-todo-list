import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function DeleteTask(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .delete('/deleteTask/:id', {
            schema: {
                params: z.object({
                    id: z.string().uuid(),
                }),
                response: {
                    204: z.void(),
                },
            },
        }, async (request, reply) => {
            const { id } = request.params;

            await prisma.task.delete({
                where: { id },
            });

            return reply.code(204).send();
        });
}

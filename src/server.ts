import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { createTask } from "./routes/task/create-task";
import { getTask } from "./routes/task/get-task";
import { updateTask } from "./routes/task/updatetask";
import { updateTaskForPatch } from "./routes/task/update-task-for-patch";
import { DeleteTask } from "./routes/task/delete-task";
import { HealthCheck } from "./routes/health-check";

const app = fastify().withTypeProvider<ZodTypeProvider>();
const port = Number(process.env.PORT) || 8080;

app.register(createTask);
app.register(getTask);
app.register(updateTask);
app.register(updateTaskForPatch);
app.register(DeleteTask);
app.register(HealthCheck);
app.get("/", async(_, reply) => {
  return reply.status(200).send({
    message: "Bem vindo ao listfy"
  })
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log("Server listening on port 8080");
});

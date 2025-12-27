import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { ZodType } from "zod";
import { createTask } from "./task/create-task";
import { getTask } from "./task/get-task";
import { updateTask } from "./task/updatetask";
import { updateTaskForPatch } from "./task/update-task-for-patch";
import { DeleteTask } from "./task/delete-task";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(createTask);
app.register(getTask);
app.register(updateTask);
app.register(updateTaskForPatch);
app.register(DeleteTask)

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("Server listening on port 3000");
});

import fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { checkIn } from "./routes/check-in";
import { getEvent } from "./routes/get-event";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { getEventAttendees } from "./routes/get-event-attendees";

import { errorHandler } from "./error-handler";

import {serializerCompiler, validatorCompiler, jsonSchemaTransform} from "fastify-type-provider-zod"

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
    origin: '*',
})
app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'Especificações da API em NodeJS',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app.setErrorHandler(errorHandler);

app.listen({ port: 8088, host: '0.0.0.0'}).then(()=>{
    console.log("HTTP server running")
})


    // .parse(x)
    // utilizado para fazer a verificado dos dados a partir da
    // biblioteca zod definido acima e após a verificação guarda-os
    // dentro do data

    //1 ele retorna uma promise o async await deve ser 
    //1.1 utilizado para garantir que seja aguardado o tempo necessário para finalizar a requisição
    //2 Async informa que dentro dessa função terá campos que demorarão para serem executados 

    //return 
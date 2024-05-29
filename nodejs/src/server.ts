import fastify from "fastify";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod"
import {z} from 'zod';
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);

app.listen({ port: 8088}).then(()=>{
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
import fastify from "fastify";
import {z} from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query'],
})

const app = fastify();

app.get('/', ()=>{
    return 'Hello World!'
})

app.post('/events', async (request,reply) => {
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
    })

    const data = createEventSchema.parse(request.body);
    // .parse(x)
    // utilizado para fazer a verificado dos dados a partir da
    // biblioteca zod definido acima e após a verificação guarda-os
    // dentro do data


    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendees,
            slug: new Date().toISOString(),
        },
    })
    //1 ele retorna uma promise o async await deve ser 
    //1.1 utilizado para garantir que seja aguardado o tempo necessário para finalizar a requisição
    //2 Async informa que dentro dessa função terá campos que demorarão para serem executados 

    return `Evento criado com ID: ${event.id}`

})


app.listen({ port: 8088}).then(()=>{
    console.log("HTTP server running")
})
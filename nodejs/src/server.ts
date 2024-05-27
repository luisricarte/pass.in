import fastify from "fastify";
import {z} from 'zod';
import { PrismaClient } from '@prisma/client';
import { generateSlug } from "./utils/generate-slug";

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

    const {
        title,
        details,
        maximumAttendees
    } = createEventSchema.parse(request.body);
    // .parse(x)
    // utilizado para fazer a verificado dos dados a partir da
    // biblioteca zod definido acima e após a verificação guarda-os
    // dentro do data

    const slug = generateSlug(title);

    const eventWithSameSlug = await prisma.event.findUnique({
        where: {
            slug   
        }
    })

    if (eventWithSameSlug !== null) {
        throw new Error('This event title already exists!')
    }

    const event = await prisma.event.create({
        data: {
            title,
            details,
            maximumAttendees,
            slug,
        },
    })
    //1 ele retorna uma promise o async await deve ser 
    //1.1 utilizado para garantir que seja aguardado o tempo necessário para finalizar a requisição
    //2 Async informa que dentro dessa função terá campos que demorarão para serem executados 

    //return 
    return reply.status(201).send(`Evento criado com ID: ${event.id}`)
})


app.listen({ port: 8088}).then(()=>{
    console.log("HTTP server running")
})
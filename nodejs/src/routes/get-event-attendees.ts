import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prima";

export async function getEventAttendees(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/events/:eventId/attendees', {
            schema: {
                summary: 'Retorna os participantes cadastrados no evento',
                tags: ['events'],
                params: z.object({
                    eventId: z.string().uuid(),
                }),
                querystring: z.object({
                    query: z.string().nullish(),
                    pageIndex: z.string().nullish().default('0').transform(Number),
                }),
                response: {
                    200: z.object({
                        attendeesRegisteredForTheEvent: z.array(
                            z.object({
                                id: z.number(),
                                name: z.string(),
                                email: z.string().email(),
                                createdAt: z.date(),
                                checkedInAt: z.date().nullish()
                            })
                        )
                    })
                }
            }
        }, async (request, reply) => {
            const { eventId } = request.params
            const { pageIndex, query } = request.query

            const attendeesRegisteredForTheEvent = await prisma.attendee.findMany({
                select: {
                    id:true,
                    name: true,
                    email: true,
                    createdAt: true,
                    CheckIn: {
                        select: {
                            createdAt:true,
                        }
                    }
                },
                where: query ? {
                    eventId,
                    name: {
                        contains: query
                    }
                } : {
                    eventId,

                },
                take: 10, // pegar apenas 
                skip: pageIndex * 10,
                orderBy:{
                    createdAt:'desc'
                }
            })

            return reply.send({ 
                attendeesRegisteredForTheEvent: attendeesRegisteredForTheEvent.map(attendee =>{
                    return {
                        id: attendee.id,
                        name: attendee.name,
                        email: attendee.email,
                        createdAt: attendee.createdAt,
                        checkedInAt: attendee.CheckIn?.createdAt ?? null
                    }
                })
            })
        })
}
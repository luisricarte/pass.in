import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prima";
import { BadRequest } from "./_errors/bad-request";

export async function registerForEvent(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events/:eventId/attendees', {
            schema: {
                summary: 'cadastra um participante a um evento',
                tags: ['attendee'],
                body: z.object({
                    name: z.string(),
                    email: z.string().email(),
                }),
                params: z.object({
                    eventId: z.string().uuid()
                }),
                response: {
                    201: z.object({
                        attendeeId: z.number()
                    })
                }
            }
        }, async (request,reply) => {
            const { eventId } = request.params
            const { name, email } = request.body


            const attendeeFromEmail = await prisma.attendee.findUnique({
                where: {
                    eventId_email: {
                        email,
                        eventId
                    }
                }
            })

            if (attendeeFromEmail !== null) {
                throw new BadRequest('This email is already registered for this event.')
            }

            //

            const event = await prisma.event.findUnique({
                where:{
                    id: eventId
                }
            })


            const totalAttendeesForEvent = await prisma.attendee.count({
                where:{
                    eventId,
                }
            })

            if( event?.maximumAttendees && totalAttendeesForEvent >= event.maximumAttendees){
                throw new Error('Maximum number of attendees for this event has been reached')
            }


            const attendee = await prisma.attendee.create({
                data: {
                    name,
                    email,
                    eventId,
                }
            })

            return reply.status(201).send({ attendeeId: attendee.id })
        })
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prima";

export async function getEventAttendees(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/events/:eventId/attendees', {
            schema: {
                params: z.object({
                    eventId: z.string().uuid(),
                }),
                querystring: z.object({
                    pageIndex: z.string().nullable().default('0').transform(Number),
                }),
                response: {}
            }
        }, async (request, reply) => {
            const { eventId } = request.params
            const { pageIndex } = request.query

            const attendees = await prisma.attendee.findMany({
                where: {
                    eventId,
                },
                take: 10, // pegar apenas 
                skip: pageIndex * 10,
            })

            return reply.send({ attendees })
        })
}
import {prisma} from '../src/lib/prima'

async function seed() {
    await prisma.event.create({
        data: {
            id: '5e2a4fbd-5fe8-4be3-9e4c-1dded9c63d8a',
            title: 'NIPON 2008',
            slug: 'NIPON',
            details: 'Um evento para apaixonados pela cultura GEEK!',
            maximumAttendees:100
        }
    })
}

seed().then(()=>{
    console.log('Database seeded!')
})
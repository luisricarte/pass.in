import fastify from "fastify";

const app = fastify();

app.listen({ port: 8088}).then(()=>{
    console.log("HTTP server running")
})
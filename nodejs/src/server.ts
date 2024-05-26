import fastify from "fastify";

const app = fastify();

app.get('/', ()=>{
    return 'Hello World!'
})

app.get('/teste', ()=>{
    return 'HelloTeste!'
})


app.listen({ port: 8088}).then(()=>{
    console.log("HTTP server running")
})
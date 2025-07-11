const http=require('http');
const app=require('./app');
const port = process.env.PORT ||3000;
const {intializeSocket}=require('./socket');
const server= http.createServer(app);
intializeSocket(server);
server.listen(port,()=>{
    console.log(`server is running on port:${port}`)
});
const socketIO=require('socket.io');
const userModel=require('./models/user.model');
const captainModel=require('./models/captain.model');
let io;
function intializeSocket(server){
    io=socketIO(server,{
        cors:{
            origin:'*',
            methods:['GET','POST']
        }
    });
    io.on('connection',(socket)=>{
        console.log(`Client Connected!! ${socket.id}`);
        socket.on('join',async (data)=>{
            const {userId,userType}=data;
            console.log(data)
            if(userType==="user"){
                await userModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                });
            }
            else if(userType==="captain"){
                await captainModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                })
            }
        })
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            console.log(location);
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: `Invalid Location!!` });
            }
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd:location.ltd,
                    lng:location.lng,
                }
            });
        });
        socket.on('disconnect',()=>{
            console.log(`Client disConnected!! ${socket.id}`);
        })
        
    })
}
function sendMessageToSocketId(socketId,message){
    if(io){
        io.to(socketId).emit('message',message);
    }
    else console.log(`socketId not initialized🚨🚨`)
}

module.exports={
    intializeSocket,
    sendMessageToSocketId
}
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
            if (
              !location ||
              location.type !== 'Point' ||
              !Array.isArray(location.coordinates) ||
              location.coordinates.length !== 2
            ) {
              return socket.emit('error', { message: `Invalid Location!!` });
            }
        
            await captainModel.findByIdAndUpdate(userId, {
              location,
            });
        });
        
        socket.on('disconnect',()=>{
            console.log(`Client disConnected!! ${socket.id}`);
        })
        
    })
}
function sendMessageToSocketId(socketId, message) {
    console.log(`Sending event '${message.event}' to socketId ${socketId}`);
    if (io) {
        io.to(socketId).emit(message.event, message.data); 
    }
    else {
        console.log(`Socket.io not initialized 🚨`);
    }
}

module.exports={
    intializeSocket,
    sendMessageToSocketId
}
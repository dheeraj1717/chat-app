import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
interface User {
    socket:WebSocket;
    room :string
}

let allSockets:User[] = [];

wss.on("connection",(socket)=>{
    console.log("connected");
    socket.on("message",(message)=>{
        // {"type":"join","room":"room1"....}
        const parsedMessage = JSON.parse(message as unknown as string);
        if(parsedMessage.type === 'join'){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type === 'chat'){
            const currUserRoom = allSockets.find((x)=>x.socket ==  socket)?.room
            for(let i =0;i<allSockets.length;i++){
                if(allSockets[i].room == currUserRoom){
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    })

    // socket.on("disconnect",()=>{
    //     allSockets = allSockets.filter((s) => s !== socket);
    // })
})
const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

server.listen(8080)
console.log('Server listening on port 8080');



wss.on('connection', (ws)=>{
    console.log('WebSocket connected');
    // Handle WebSocket messages here
    ws.on("message",message =>{
        const msg =  JSON.parse(message);
        switch(msg.event){
            case "connected":
                console.log('connected');
                break;
            case "start":
                console.log('starting the media server');
                break;
            case "media":
                console.log('Recieving audio data');
                break;
            case "stop":
                console.log('Stopping the media server');
                break;
        }
    })
});

app.post('/',(req,res)=>{
    res.set('Content-Type', 'text/xml');
    res.send(
        `<Response>
            <Start>
                <Stream url = "wss://${req.headers.host}"/>
            </Start>
            <Say>
                I Will stream the next next 60 seconds of audio
            </Say>
            <Pause length = "60"/>
        </Response>`
    )
})


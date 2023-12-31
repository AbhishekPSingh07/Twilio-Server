const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const speech = require('@google-cloud/speech');
const fs = require('fs');
const client = new speech.SpeechClient();

process.env.GOOGLE_APPLICATION_CREDENTIALS = "../api_key.json"

const request = {
    config:{
        encoding: "MULAW",
        sampleRateHertz: 8000,
        languageCode: "en-GB"
    },
    interimResults: true,
};
server.listen(8080)
console.log('Server listening on port 8080');



wss.on('connection', (ws)=>{
    console.log('WebSocket connected');
    let recognizeStream = null;
    ws.on("message",message =>{
        const msg =  JSON.parse(message);
        switch(msg.event){
            case "connected":
                console.log('connected');
                recognizeStream = client
                .streamingRecognize(request)
                .on("error",console.error)
                .on("data",data=>{
                    console.log(data.results[0].
                    alternatives[0].transcript)
                    });
                break;
            case "start":
                console.log('starting the media server');
                break;
            case "media":
                recognizeStream.write(msg.media.payload);
                break;
            case "stop":
                console.log('Stopping the media server');
                recognizeStream.destroy();
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


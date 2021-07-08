var express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const url = 'https://api.line.me/v2/bot/message/broadcast'
const TOKEN = 'your TOKEN'
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "your domain"
const sslport = 23023;
const SECRET = 'your SECRET'
const line = require('@line/bot-sdk');
var gender='';
var content_id = ''
var youtuber_man = ''
var youtuber_woman = ''

const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.post('/hook', function (req, res) {

    var eventObj = req.body.events[0];
    var text = eventObj.message.text;

    const spawn = require('child_process').spawn;
    const result_man = spawn('python', ['similar_man.py']);
    const result_woman = spawn('python', ['similar_woman.py']);
    
    if (!(eventObj.message.type == 'image')) {
        console.log('======================', new Date() ,'======================');
        console.log('[request]', req.body);
        console.log('[request source] ', eventObj.source);
        console.log('[request message]', eventObj.message);
    }
    if(text == '남자'){
        result_man.stdout.on('data', function(data) { 
            youtuber_man = data.toString();
            console.log(youtuber_man);
            py_man(eventObj.replyToken, youtuber_man);
        });
        result_man.stderr.on('data', function(data) { 
            console.log(data.toString()); 
        });
        //남여 선택
        man(eventObj.replyToken);
        res.sendStatus(200);
    }
    else if(text == '여자'){
        result_woman.stdout.on('data', function(data) { 
            youtuber_woman = data.toString();
            console.log(youtuber_woman);
            py_woman(eventObj.replyToken, youtuber_woman);
        });
        result_woman.stderr.on('data', function(data) { 
            console.log(data.toString()); 
        });
        
        woman(eventObj.replyToken);
        res.sendStatus(200);
    }
    else if(eventObj.message.type == 'image'){
        content_id = eventObj.message.id;
        const downloadPath = path.join(__dirname, 'sample.jpg');
        try{
            downloadContent(content_id, downloadPath);
        }
        catch(error){
            console.log(error);
        }
        put_gender(eventObj.replyToken);
        res.sendStatus(200);
    }
    else { 
        usingMessage = text;
        initReply(eventObj.replyToken);
        res.sendStatus(200);
    }

});

function initReply (replyToken) {
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":replyToken,
                "messages":[
                    {
                        "type": "text",
                        "text": "안녕하세요.KhuBy에요~\n여러분의 메이크업을 도와 줄 유튜버를 추천해 드릴게요."
                    },
                    {
                        "type": "text",
                        "text": "정방향으로 화면에 얼굴이 꽉 차도록 나온 사진을 업로드 해주세요."
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}

function put_gender(replyToken){
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":replyToken,
                "messages":[
                    {
                        "type": "text",
                        "text": "자신의 성별을 입력해 주세요.(남자 혹은 여자)"
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}

function man(replyToken){
    request.post({
        url: url,
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        },
        json: {
            "messages":[
                {
                    "type":"image",
                    //이미지 url에서 bucket name 변경 필요(dusdjhyeon->your bucket name)
                    "originalContentUrl" : "https://dusdjhyeon.s3.amazonaws.com/swap_man.jpg",
                    "previewImageUrl" : "https://dusdjhyeon.s3.amazonaws.com/swap_man.jpg"
                }
            ]
        }
    },(error, response, body) => {
        console.log(body)

    });
}

function woman(replyToken){
    request.post({
        url: url,
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        },
        json: {
            "messages":[
                {
                    "type":"image",
                    //이미지 url에서 bucket name 변경 필요(dusdjhyeon->your bucket name)
                    "originalContentUrl" : "https://dusdjhyeon.s3.amazonaws.com/swap.jpg",
                    "previewImageUrl" : "https://dusdjhyeon.s3.amazonaws.com/swap.jpg"
                }
            ]
        }
    },(error, response, body) => {
        console.log(body)

    });
}

function py_woman(replyToken, youtuber_woman){
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":replyToken,
                "messages":[
                    {
                        "type": "text",
                        "text":  youtuber_woman
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}

function py_man(replyToken, youtuber_man){
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":replyToken,
                "messages":[
                    {
                        "type": "text",
                        "text": youtuber_man
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}

const config = ({
    channelAccessToken: `${TOKEN}`,
    channelSecret: `${SECRET}`,
});
const client = new line.Client(config);
function downloadContent(messageId, downloadPath) {
    return client.getMessageContent(messageId)
      .then((stream) => new Promise((resolve, reject) => {
        const writable = fs.createWriteStream(downloadPath);
        stream.pipe(writable);
        stream.on('end', () => resolve(downloadPath));
        stream.on('error', reject);
      }));
}

try {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
      key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }
  
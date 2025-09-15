const functions = require('firebase-functions');
const express = require('express');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Google Cloud TTS 클라이언트 설정
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: './yakk-472016-c8b6971457c3.json',
});

// POST /tts 엔드포인트
app.post('/tts', async (req, res) => {
  const { text, lang } = req.body;

  const voiceName =
    lang === 'ko-KR' ? 'ko-KR-Chirp3-HD-Algieba' : 'ja-JP-Chirp3-HD-Aoede';

  console.log('🔊 입력 텍스트:', text);
  console.log('🌐 언어:', lang);
  console.log('🗣 사용된 voice.name:', voiceName);

  const request = {
    input: { text },
    voice: {
      languageCode: lang,
      name: voiceName,
    },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (err) {
    console.error('❌ TTS 오류:', err);
    res.status(500).send('TTS Failed');
  }
});

// Firebase Function으로 export
exports.api = functions.https.onRequest(app);

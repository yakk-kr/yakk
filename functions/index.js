const functions = require('firebase-functions');
const express = require('express');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: './yakk-472016-c8b6971457c3.json',
});

app.post('/tts', async (req, res) => {
  const { text, lang } = req.body;

  const request = {
    input: { text },
    voice: {
      languageCode: lang,
      name:
        lang === 'ko-KR' ? 'ko-KR-Chirp3-HD-Algieba' : 'ja-JP-Chirp3-HD-Aoede',
    },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (err) {
    console.error('TTS Error:', err);
    res.status(500).send('TTS Failed');
  }
});

exports.api = functions.https.onRequest(app);

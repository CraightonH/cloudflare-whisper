# Whisper Audio Transcription Worker

A Cloudflare Worker that transcribes audio files using OpenAI's Whisper model via Cloudflare AI.

## Overview

This worker:
- Receives audio files via POST requests
- Processes them using `@cf/openai/whisper-tiny-en` AI model
- Returns the transcribed text as JSON

## Key Files

- `src/index.ts`: Main worker code that handles requests and processes audio
- `wrangler.jsonc`: Configuration for the Cloudflare Worker
- `package.json`: Project dependencies and scripts

## How It Works

1. Client sends a POST request with an audio file in a form field named "audio"
2. Worker extracts the audio file and converts it to a Uint8Array
3. Worker sends the audio to Cloudflare's AI binding
4. AI model transcribes the audio to text
5. Worker returns the transcription as JSON

## Testing Locally

1. Start the worker:
```bash
npm run dev
```

2. Send a test audio file:
```bash
curl -X POST http://localhost:8787 \
  -F "audio=@path/to/audio.wav" \
  -H "Content-Type: multipart/form-data"
```

## Deployment

1. Deploy to Cloudflare:
```bash
npm run deploy
```

2. The worker will be available at your worker's URL

## Requirements

- Cloudflare account with Workers AI access
- Node.js and npm installed
- Wrangler CLI installed (`npm install -g wrangler`)

## Error Handling

The worker handles:
- Invalid request methods (only POST allowed)
- Missing audio files
- AI processing errors
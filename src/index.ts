/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Check if the request is a POST
		if (request.method !== 'POST') {
			return new Response('Method not allowed. Please use POST.', { status: 405 });
		}

		try {
			// Get the audio file from the request
			const formData = await request.formData();
			const audioFile = formData.get('audio'); // change this based on voice preview requirements
			
			if (!audioFile || !(audioFile instanceof Blob)) {
				return new Response('Missing audio file. Please upload an audio file with the key "audio".', {
					status: 400
				});
			}

			// Convert the audio file to a Uint8Array
			const audioArrayBuffer = await audioFile.arrayBuffer();
			const audioUint8Array = new Uint8Array(audioArrayBuffer);

			// Process the audio with Whisper
			const result = await env.AI.run('@cf/openai/whisper-tiny-en', {
				audio: [...audioUint8Array]
			});

			// Return the transcribed text
      // TODO: Edit return object to work with voice preview edition
			return new Response(JSON.stringify({
				text: result.text
			}), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (error) {
			console.error('Error processing audio:', error);
			return new Response(JSON.stringify({
				error: 'Failed to process audio file. Please try again.'
			}), {
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	},
} satisfies ExportedHandler<Env>;

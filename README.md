# Bolkar Fit

A voice-first blouse fitting notebook for independent tailors. Speak the customer’s name and measurements in **Telugu, Hindi, or English**, review the read-back, correct a value, and save the fitting. Wispr Flow provides dictation.

## Judges — start here

Clone this public repository and run the following from the **repository root**. Start Docker Desktop or Docker Engine first. Docker Compose v2 is required.

```sh
git clone https://github.com/MEGHANADHA-REDDY/scawis.git
cd scawis
docker compose up --build -d --wait
```

**Open [http://localhost:8080](http://localhost:8080/) on the machine running Docker.** Compose publishes **port 8080** with the mapping `8080:8080`. The page should show the **Bolkar Fit** fitting screen and language switch.

- **No API keys, secrets, environment variables, or `.env` file are required.** There is no `.env.example` because the app requires no environment setup.
- The first build needs internet access to download the base image, dependencies, and two public Piper voice models.
- **Use Wispr Flow for the voice demo.** Install and sign in to Flow, then follow the sample fitting below. Flow transcribes each spoken turn and Bolkar Fit processes it automatically.
- Run `docker compose ps` to confirm the `app` service is **healthy** and publishes `8080->8080/tcp`. Run `docker compose down` to stop it.

## Verify a complete fitting

Select **తెలుగు**, turn sound on, and start a new fitting. Dictate each line below **one at a time** with Wispr Flow. Stop dictation after each turn and wait for the app’s response.

| Turn | Sample input | Expected result |
| --- | --- | --- |
| 1 | కస్టమర్ పేరు అనిత | The card shows the customer name, Anita. |
| 2 | భుజం పదహారు, ఛాతీ ముప్పై ఆరు, నడుము ముప్పై, చేతి పొడవు పది, బ్లౌజ్ పొడవు పదిహేను | The card shows **16, 36, 30, 10, 15 inches** and the app reads back the values in Telugu. |
| 3 | చేతి పొడవు తొమ్మిదిన్నర | The app asks whether to change the sleeve from 10 to 9.5 inches. |
| 4 | అవును | Sleeve changes to **9.5 inches**. |
| 5 | అయిపోయింది | The app asks whether to save Anita's fitting. |
| 6 | అవును | The card appears under saved fittings. Refresh the same page to verify it persists. |

Use **Hear reply** (జవాబు వినండి) to replay the latest prompt. The in-app guide includes matching samples for English and Hindi.

## Use Wispr Flow

Choose the same language in Bolkar Fit and in **Wispr Flow’s language settings**. Start a fitting, focus the dictation field, and use Flow’s own start and stop controls. When you stop, Flow inserts the transcript and the app processes it automatically.

If the tailor is speaking to the customer between measurements, prefix each measurement with **“Note this,” “కొలత రాయి,” or “नोट करो”** and pause briefly afterward. The app uses the first clause after each marker. Review the read-back before saving.

## Open on a phone

Connect the phone and the Docker computer to the same trusted Wi-Fi. Find the computer’s Wi-Fi IPv4 address using `ipconfig` on Windows or network settings on macOS/Linux. Open `http://<computer-ip>:8080` on the phone, for example `http://192.168.1.42:8080`. Keep Docker running. If it works on the computer but not the phone, check the host firewall and whether the Wi-Fi blocks connections between devices.

The GitHub URL is for source code. The app URL is available on the machine running it, or over the local network as described above.

## Run locally without Docker

From the repository root on Windows, with Python installed:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install piper-tts==1.4.1
New-Item -ItemType Directory -Force voices | Out-Null
.\.venv\Scripts\python.exe -m piper.download_voices --download-dir voices te_IN-maya-medium hi_IN-pratham-medium
.\.venv\Scripts\python.exe server.py
```

Keep PowerShell open and visit [http://127.0.0.1:8080](http://127.0.0.1:8080/). Press **Ctrl+C** to stop. The environment and model setup is one-time.

## Dependencies and storage

- Wispr Flow provides speech-to-text. Browser JavaScript interprets the transcript and manages the fitting.
- The Python server serves the app and uses [Piper](https://github.com/OHF-Voice/piper1-gpl) for local neural read-back in Telugu ([Maya](https://huggingface.co/rhasspy/piper-voices/tree/main/te/te_IN/maya/medium)) and Hindi ([Pratham](https://huggingface.co/rhasspy/piper-voices/tree/main/hi/hi_IN/pratham/medium)). English playback uses the browser’s voice. Written replies remain available if audio fails.
- Fittings stay in browser storage on the current device and site address. Different addresses or ports have separate storage.

## Troubleshooting

- **“No configuration file provided”** — change into the cloned `scawis` directory before running Compose.
- **Docker API or daemon error** — start Docker Desktop or Docker Engine and retry.
- **Port 8080 is in use** — stop the other local preview, then rerun Compose. For personal testing, you can change the mapping to `8081:8080` and open `http://localhost:8081`.
- **Page unavailable** — run `docker compose ps` and `docker compose logs app` from the repo root.
- **Checking transcript handling** — if you are troubleshooting a dictation issue, paste the exact transcript into the dictation field and compare the result.
- **Silent reply** — turn sound on and tap **Hear reply**. Browsers can require a tap before allowing playback.

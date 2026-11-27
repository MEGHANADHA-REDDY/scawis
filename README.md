# Bolkar Fit

Bolkar Fit is a Telugu-first fitting notebook for independent tailors. Dictate blouse measurements with Wispr Flow, review the measurement card, correct values by voice, and save the fitting under the customer's name.

## Run from GitHub

**Prerequisites:** Git and Docker with Docker Compose v2. On Windows or macOS, start Docker Desktop before running the commands. On Linux, start Docker Engine and make sure the Compose plugin is installed. An internet connection is needed on the first run to download the Nginx base image.

```sh
git clone https://github.com/MEGHANADHA-REDDY/scawis.git
cd scawis
docker compose up --build -d --wait
```

Open **[http://localhost:8080](http://localhost:8080)** on the same computer. The home screen starts without any environment variables, API keys, Wispr Flow account, or database. You can paste or type the Telugu demo inputs below to test the whole fitting without installing Wispr Flow.

Choose English, తెలుగు, or हिन्दी at the top of the app to switch its guide, measurement labels, and prompts. The app remembers your choice on that device and keeps the current fitting. For live dictation, install and sign in to Wispr Flow, then select the matching dictation language there. Place the cursor in the dictation field and use Flow's start/stop controls. After Flow inserts the finished transcript, the app processes it automatically. The Docker build bundles eSpeak NG to generate Telugu and Hindi replies locally in a browser worker. No installed voice or external speech API is needed. English uses the browser voice. Tap New fitting or Hear reply to enable playback in browsers that require a tap. Use the Docker site or local HTTP preview for the bundled voices. Written replies are always displayed.

### Open on a phone

Keep the computer and phone on the same Wi-Fi. On Windows, run `ipconfig` and look for the active Wi-Fi adapter's IPv4 address. On macOS or Linux, find the active adapter's address in network settings. On the phone, open `http://<computer-ip>:8080`, replacing the placeholder with the address, for example `http://192.168.1.42:8080`. Keep the container running and use a trusted network. If it works on the computer but not on the phone, check the computer's firewall and whether the Wi-Fi isolates devices.

The GitHub repository URL opens the source code. The localhost URL opens the app on your own computer after Compose starts. A public browser demo requires separate hosting.

## Demo a Telugu fitting

You can say the name in its own turn or begin the measurement turn with it. For example, “Customer peru Ani. భుజం పద్నాలుగున్నర, నడుము ముప్పై.” Use separate turns for the save prompt and confirmation. With pasted text, wait briefly after each paste for automatic processing.

1. Click **New fitting** and say **కస్టమర్ పేరు అనిత**.
2. Say all five in one turn: **భుజం పద్నాలుగున్నర అంగుళాలు, ఛాతీ ముప్పై ఆరు అంగుళాలు, నడుము ముప్పై అంగుళాలు, చేతి పొడవు తొమ్మిదిన్నర అంగుళాలు, బ్లౌజ్ పొడవు పద్నాలుగు అంగుళాలు**. The card should show 14.5, 36, 30, 9.5, and 14 inches.
3. Say **చేతి పొడవు పది అంగుళాలు**. When asked to confirm the change, say **అవును**. The sleeve should change to 10 inches.
4. Say **అయిపోయింది**. When asked to save Anita's fitting, say **అవును**. The card appears under **Saved fittings**. Refresh to check that it persists.

For a fitting with conversation in between, say **కొలత రాయి** before each measurement and pause briefly afterward. Try **కొలత రాయి భుజం పద్నాలుగున్నర. కాస్త నిటారుగా నిలబడండి. కొలత రాయి నడుము ముప్పై.** The app reads the first clause after each marker. Check the card before saving.

## Architecture and storage

Docker builds an Nginx image containing the static app. Browser JavaScript parses the transcript and manages the fitting. Wispr Flow supplies speech-to-text. The app uses the browser voice for English and eSpeak NG (GPL-3.0-or-later, https://github.com/ianmarmour/espeak-ng.js) for local Telugu and Hindi read-back. The fitting records are stored in the browser on the current device and site address. Opening the app on another device or port uses separate browser storage.

## Troubleshooting

- **Page unavailable:** Run `docker compose ps` and `docker compose logs app`. Confirm the container is running and open the URL on the machine running Docker.
- **Port 8080 is in use:** Change `"8080:80"` in `docker-compose.yml` to `"8081:80"`, rebuild, and open `http://localhost:8081`.
- **Changed code isn't showing:** Run `docker compose up --build -d --wait` again and refresh the page.
- **No spoken reply:** Check that **Sound on** is enabled and the browser has access to a speech voice. You can still follow the reply on screen.
- **Stop the app:** Run `docker compose down`.

## Push this source

Clone the target repository first so you preserve any existing history. Copy the contents of the supplied source folder into the clone, including `.gitignore` and `.dockerignore`. The repo root should contain `docker-compose.yml`, `Dockerfile`, `nginx.conf`, `README.md`, and `app/`.

```sh
git status
git add .
git commit -m "Build Telugu-first Bolkar Fit prototype"
git push -u origin HEAD
```

For the hackathon, make sure the repository is public and ask a teammate to run the Compose instructions from a fresh clone.

FROM python:3.12-slim
WORKDIR /opt/bolkar
RUN pip install --no-cache-dir piper-tts==1.4.1 \
    && mkdir -p voices \
    && (python -m piper.download_voices --download-dir voices te_IN-maya-medium hi_IN-pratham-medium \
        || python -m piper.download_voices --download-dir voices te_IN-maya-medium hi_IN-pratham-medium)
COPY app/ ./app/
COPY server.py .
EXPOSE 8080
CMD ["python", "server.py", "--host", "0.0.0.0"]

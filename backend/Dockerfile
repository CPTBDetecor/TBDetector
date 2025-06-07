FROM python:3.11-slim

# Install system dependencies & Node.js
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        python3-dev \
        python3-pip \
        python3-setuptools \
        libglib2.0-0 \
        libsm6 \
        libxrender1 \
        libxext6 \
        git \
        curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN pip install --upgrade pip && pip install -r requirements.txt

RUN npm install

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]

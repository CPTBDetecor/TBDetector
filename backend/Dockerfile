# Base image: Python 3.11 dengan OS ringan
FROM python:3.11-slim

# Environment variables agar Python tidak cache dan output langsung
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set workdir di dalam container
WORKDIR /app

# Install system dependencies (untuk build package yang butuh compile)
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy semua file project ke dalam container
COPY . .

# Upgrade pip dan install dependencies dari requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Jalankan aplikasi Python (ubah kalau entry point kamu bukan app.py)
CMD ["python", "app.py"]

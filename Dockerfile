FROM python:3.13-slim

WORKDIR /app

# --------- Install system deps ---------
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates build-essential git unzip wget \
    && rm -rf /var/lib/apt/lists/*

# --------- Copy project files ---------
COPY . .

# --------- Install Python dependencies ---------
RUN pip install --upgrade pip
# ensure openai is installed; either add to requirements.txt or install here
RUN pip install -r src/components/sections/server/requirements.txt || true
RUN pip install openai

# --------- Generate KB files (kb_items.json & kb_embeddings.npz) ---------
RUN python src/components/sections/server/embed.py

# --------- Install Node.js (20.x) and npm ---------
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get update && apt-get install -y nodejs \
 && npm install --global npm@latest

# Install frontend dependencies and build
WORKDIR /app
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
RUN npm run build

# --------- Install 'serve' to host the static build ---------
RUN npm install -g serve

# --------- Expose ports ---------
EXPOSE 5173 5174

# --------- Copy & make start script executable ---------
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]

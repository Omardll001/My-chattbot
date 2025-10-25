FROM python:3.10-slim

WORKDIR /app

# Install system dependencies (if needed)
RUN apt-get update && apt-get install -y build-essential

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your backend code
COPY . .

# Expose the port (change if needed)
EXPOSE 5174

# Set environment variables (can be overridden at runtime)
ENV FLASK_HOST=0.0.0.0
ENV FLASK_PORT=5174

# Start the server using start.sh
RUN chmod +x start.sh
CMD ["bash", "start.sh"]
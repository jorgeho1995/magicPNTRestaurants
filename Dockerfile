# Dockerfile
FROM python:3.7-stretch
RUN apt update -y
RUN apt install -y python-pip python-dev build-essential
COPY magicPNTRestaurants/ /app
WORKDIR /app
RUN pip install -r requirements.txt
ENV PORT 8080
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app

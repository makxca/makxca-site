# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM python:3.9

COPY app.py /app.py
COPY static /static
COPY templates /templates
COPY modules /modules
COPY requirements.txt /requirements.txt

RUN pip install -r requirements.txt

EXPOSE 3000

CMD [ "waitress-serve", "--port=3000", "app:app" ]

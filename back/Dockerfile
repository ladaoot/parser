FROM python:3.12

WORKDIR /back

COPY requirements.txt ./requirements.txt

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV SERVICE_PORT=0.0.0.0
ENV HOST=8000

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY . /back

CMD ["fastapi", "run", "/back/src/main.py"]
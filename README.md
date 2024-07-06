# PARSER

Учебный проект -  разработка платформы парсинга данных о вакансиях с
платформы hh.ru .

## Загрузка и использование

Для начала убедитесь что у вас установлен [Docker](https://docs.docker.com/engine/install/).

Скопируйте себе на компьютер данный репозиторий

```
cd existing_repo
git remote add origin https://github.com/ladaoot/parser.git
```
После используйте следующие команды:

1. Открыть папку созданнную git-ом
```
cd parser
```
2. Поднять контейнеры приложения
```
docker-compose up -d
```

После выполнения этих шагов перейдите на [http://localhost:3000](http://localhost:3000) в браузере.

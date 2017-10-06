## Приложение-картотека для архива ЯГБ №3

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

1. Создать файл конфигурации `server/config/config.json`:
```json
{
    "config": {
        "port": 3000, // порт сервера
        "secret": "$im$alabim",
        "ldap": {
            "server": "192.168.0.1", // сервер AD
            "domain": "domain.local", // домен
            "dc1": "domain",
            "dc2": "local",
            "dc3": ""
        },
        "rmis": {
            "auth": {
                "username": "username",
                "password": "password"
            },
            "path": "https://dev.is-mis.ru/",
            "clinicId": 1, // ID медицинского учреждения в RMIS
            "allowedServices": [
                "appointment-ws/appointment",
                "employees-ws/service",
                "departments-ws/departments",
                "individuals-ws/individuals",
                "locations-ws/resources",
                "patients-ws/patient",
                "refbooks-ws/refbooksWS",
                "rooms-ws/rooms"
            ]
        },
        "mongoose": {
            "host": "127.0.0.1", // IP-адрес mongoDb
            "port": 27017, // порт mongoDb
            "username": "user",
            "password": "password",
            "db": "tracker", // имя базы данных для сохранения
            "options": {
                "useMongoClient": true,
                "socketTimeoutMS": 10000,
                "keepAlive": true,
                "reconnectTries": 30
            }
        }
    }
}
```
2. `npm i`
3. `npm start`
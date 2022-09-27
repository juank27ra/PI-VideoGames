![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Videogames

<p align="right">
  <img height="200" src="./videogame.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Practicar el workflow de GIT.

## Comenzando

 - Clonar el repositorio en sus computadoras para comenzar

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM.

Actualmente las versiónes necesarias son:

- __react-router-dom__: 5.2.0

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. 
Adicionalmente será necesario que creen desde psql una base de datos llamada `videogames`

En 'api' y en 'client': hacer npm i | npm start para ejecutar

 la api externa [rawg](https://rawg.io/apidocs) 

__IMPORTANTE__: Para poder utilizar esta API externa es necesario crearse una cuenta para obtener una API Key

![WhatsApp Image 2022-09-27 at 11 24 04 AM](https://user-images.githubusercontent.com/96093773/192647191-42377529-6bbe-4842-95ce-4d5545ab944a.jpeg)
![WhatsApp Image 2022-09-27 at 11 24 30 AM](https://user-images.githubusercontent.com/96093773/192647194-2bca1f5c-fa3b-4c2f-8fff-c3cbbf39b180.jpeg)
![WhatsApp Image 2022-09-27 at 12 13 09 PM](https://user-images.githubusercontent.com/96093773/192647196-19713757-2a01-45da-a1eb-c50d166effc6.jpeg)
![WhatsApp Image 2022-09-27 at 11 20 51 AM](https://user-images.githubusercontent.com/96093773/192647198-1a160e3a-71f8-4beb-b237-1b5d3e661ae3.jpeg)
![WhatsApp Image 2022-09-27 at 11 21 20 AM](https://user-images.githubusercontent.com/96093773/192647201-36de0968-f32a-43dd-9504-564f831c478a.jpeg)


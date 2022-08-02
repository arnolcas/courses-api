# Installation

> To run the app you have to get a firebase credentials (JSON key file And Service Account Key JSON file), generate from your Firabase Console


## setup

If you want run app only (external database) make sure setup all fields in your .env file and run these commands:

```
npm install
npm run build
npm start
```

## Run with Docker

If you want to run the app with Docker, make sure you set all of the following fields in your docker-compose.yml file

> -   DB_HOST=postgresql
> -   BD_PORT='5432'
> -   BD_USER='user'
> -   BD_PASS='user123'
> -   BD_NAME='bankuish'
> -   PORT=3000
> -   JWT_SECRET='aVerySecretKey:)'

and then run these commands:

```
docker-compose up
```

## Running tests

To run test make sure set all fields in your .env file, if you are running the app with a container make sure set all fieds in your docker-compose.yml file same as your .env file, and run these commands

```
npm run test
```

## Build app

To build the app run these commands

```
npm run build
```

and check _./dist_ folder

# Let's play with API

To play with the API you have to create user and do login. With your JWT Token you can set courses for a user register

End points list:

-   POST /api/v1/auth/register User register
-   POST /api/v1/auth/login User Login
-   POST /api/v1/users Set user courses list

For more information about endpoints and how to use, you can visit *https://www.postman.com/arnolcas/workspace/a95f8604-7ebd-4089-a8d9-c217e203c577* to check how to use API Endpoints

# podcast-rest-api

## Description
Backend API for the podcast Mobile App and Web page
 Technologies: 
    Express,
    NodeJS,
    Javascript(ES6,ES7,ES8 support)
    Mongoose,
    Mysql,
    JWT,
    Docker,
    Kubernetes (Helm)

## Running with docker
Make sure [docker](https://hub.docker.com/) is being installed first

```
> yarn install
> yarn build 
> docker-compose build
> docker-compose up
```

By Default, the application listens on port 5000
Go to http://localhost:5000/api/health-check to ensure app is running

## Running locally without docker
Make sure [mongodb](https://docs.mongodb.com/manual/administration/install-community/) is installed and running on the default port of 27017

```
> yarn install
> yarn build 
> yarn dev
```

## Contributing
Fork the repository and create a branch off of master. When your feature is ready, submit a pull request for the master branch. Be sure to include a short description of the feature or pull request and reference any related issues.
# Evmos.me Frontend

A `#HackAtom` 2021 project: a wallet integration for evmos.

## Requirements

-   Evmos.me backend
-   NodeJs

## Local development

```sh
yarn dev
```

## Variables

`REACT_APP_BACKEND_URL` it should point to the url where [evmos.me-backend](https://github.com/hanchon-live/evmos.me-backend) is hosted.

## Deployment

```sh
yarn install
yarn build
yarn run export
```

The statics files will be on the `/out` folder.
Note: this project is automatically hosted using a github action to publish on github pages after each push to master.


<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/24254209/83550812-cf3f9600-a4dd-11ea-8bcd-cf11d27a6a2f.png" alt="logo">
</p>
<br />


<img alt="Ecoleta Banner" src="https://user-images.githubusercontent.com/24254209/84195188-85722500-aa74-11ea-8c93-d6b16a8d2e41.png" />


# Table of contents
* [About](#recycle-about)
* [Technologies](#rocket-Technologies)
* [Installation](#gear-Installation)
* [License](#memo-License)

## :recycle: About 

The **Ecoleta** is a application to help people find collection points for recycling.

## :rocket: Technologies 

### Server
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [Celebrate](https://github.com/arb/celebrate)
- [Typescript](https://www.typescriptlang.org/)
- [Knex.js](http://knexjs.org/)
- [SQLite](https://www.sqlite.org/index.html)

### Web
- [ReactJS](https://reactjs.com/)
- [Axios](https://github.com/axios/axios)
- [StyledComponents](https://styled-components.com/)
- [Typescript](https://www.typescriptlang.org/)

### Mobile
- [React Native](https://reactnative.dev/)
- [Axios](https://github.com/axios/axios)
- [StyledComponents](https://styled-components.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Expo](https://expo.io/)

## :gear: Installation

### Server

1. Clone the repository: `git@github.com:matheus-neves/ecoleta.git`
2. Access the directory: `cd server`
3. Install the dependencies: `yarn`
4. Run the command `yarn knex:migrate` to create database.sqlite and seed with `yarn knex:seed`
5. Run the server: `yarn dev:server`
6. Server running in `http://localhost:3333/`

Notes: For mobile to work, create **.env** in `./server` open .env-example, and do the same as in item 3 of Mobile.


### Web

1. Access the directory: `cd web`
2. Install the dependencies: `yarn`
3. Run command: `yarn start`

### Mobile

1. Access the directory: `cd mobile`
2. Install the dependencies: `yarn`
3. Create **.env** in `./mobile`, open .env-example, copy the variables and paste in **.env**. Copy your local ip, the expo shows it, but change port to :3333, and fill in **APP_API_URL**. You will also need to generate a [Google Maps geolocation](https://console.cloud.google.com/google/maps-apis/start) API_KEY, after that fill in the value with this key. 

3. Run command: `yarn start`



### :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE.md) file for more details.

---
Made with :purple_heart: by Matheus Neves :wave: [See my linkedin!](https://www.linkedin.com/in/matheus-neves-front-end/)
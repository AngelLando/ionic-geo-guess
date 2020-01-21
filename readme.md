# Hybrid app Geo Guess
Geo Guess is a hybrid mobile app developped with Ionic and Angular. It is about users who post thumbnails with a certain location and/or try to guess where photos from the thumbnails were taken.


## Requirements
Node.js 12.x

## Usage

### Install the dependecies
```
git clone git@github.com/AngelLando/ionic-geo-guess
cd ionic-geo-guess
npm install

```

### duplicate the file environnment.sample.ts

cd ionic-geo-guess\src\environments

* duplicate this file to create a copy named environment.prod.ts and replace the content by the following:

Replace the qimgUrl with your secret key.

```
export const environment = {
  production: false,
  apiUrl: 'https://comem-archioweb-2019-2020-g.herokuapp.com',
    qimgUrl: '...'
};
```

* duplicate a second time this file with the same content:


### Serve the application
* The first time after having changed the content of the environnment file

```
ionic serve --prod
```
* everytime after
```
ionic serve
```

### 


Visit http://localhost:8100.
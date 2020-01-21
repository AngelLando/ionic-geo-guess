# Hybrid app Geo Guess
Geo Guess is a hybrid mobile app developped with Ionic and Angular. It is about users who post thumbnails with a certain location and/or try to guess where photos from the thumbnails were taken.

## A user can:

* create an account
* login/logout
* post a thumbnail
* see all thumbnails
* make a guess on a thumbnail
* get a score
* see all scores and filter them
* see his thumbnails
* see the guesses made on his thumbnails
* get notifications when someone makes a guess on one of his thumbnails
* change his profile information (username, country, city)
* delete his account

## Not yet implemented:

* active/disactivate notifications

## What could be improved:

* loading time when a user post a thumbnail
* loading time to see all guesses for a thumbnail
* improvements on the API:
  * for a user, add the field "profile_picture"
  * a user should not be able to make more than one guess on a thumbnail (only frontend implemented for the moment)
  * a user should be able to change his password


## Requirements
Node.js 12.x

## Usage

### Install the dependencies
```
git clone git@github.com/AngelLando/ionic-geo-guess
cd ionic-geo-guess
npm install

```

### Environment files

cd ionic-geo-guess\src\environments

* Duplicate the file environment.sample.ts to create a copy named environment.ts and replace the content by the following:

(replace the qimgSecret with your secret key)

```
export const environment = {
  production: false,
  apiUrl: 'https://comem-archioweb-2019-2020-g.herokuapp.com',
    qimgUrl: 'https://comem-qimg.herokuapp.com/api',
    qimgSecret: ''
};
```

* This time, duplicate the file environment.ts to create a copy named environment.prod.ts with the same content.

(But we keep in mind that for a real project, the url would certainly be different)


### Serve the application
* The first time after having changed the content of the environnment file

```
ionic serve --prod
```

* Everytime after

```
ionic serve
```

### 


Visit http://localhost:8100.
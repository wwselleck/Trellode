# Trellode
[![npm version](https://badge.fury.io/js/trellode.svg)](http://badge.fury.io/js/trellode) [![Build Status](https://travis-ci.org/wwselleck/Trellode.svg?branch=master)](https://travis-ci.org/wwselleck/Trellode)

[Interestingly enough, Trello has a Trello board for development of the Trello API](https://trello.com/b/cI66RoQS/trello-public-api). 

You can view the Trello API documentation [here](https://trello.com/docs/). It's main use for you will be seeing what options you can specify if it's not already documented here.

## Installation
```
npm install trellode
```

## Usage

#### Acquire API key and token
+ Get your developer key from [here](https://trello.com/1/appKey/generate).
+ To access a user's private account information, you need to get an Access Token. You can do so by redirecting them to 
   `https://trello.com/1/authorize?key=<YOUR_PUBLIC_API_KEY>&name=<YOUR_APPLICATION_NAME>&expiration=never&scope=read,write&response_type=token`
  + You can set `expiration` to be something other than `never` (like a number of days), and can limit the scope to read only by removing the `scope` parameter entirely. 

#### Get Started
First, import the module.
```javascript
var Trellode = require('trellode');
```
Then instaniate a new instance of Trellode with your API key and access token.
```javascript 
var trelloApi = new Trellode("<YOUR_API_KEY>", "<TOKEN>");
```
Now you can get started! All methods return a promise by default unless you supply a callback, then they will return `undefined`.

```javascript
// Using promises
trelloApi.getBoards().then(function(boards){
  console.log(boards);
});

//Using callbacks
trelloApi.getBoards(function(err, boards){
  console.log(boards);
});
```

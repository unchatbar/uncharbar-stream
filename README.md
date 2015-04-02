# Unchatbar Stream
[![Build Status](https://travis-ci.org/unchatbar/unchatbar-stream.svg?branch=redesign)](https://travis-ci.org/unchatbar/unchatbar-stream)

Peer to peer chat application using WebRTC technologies

## Requirements
* Node.js 0.10+
* Chrome 26+ or Firefox 23+

## Installation
* Install Bower: `npm install -g bower`
* Install Gunt CLI: `npm install -g grunt-cli`
* Clone repository `git clone git://github.com/unchatbar/unchatbar-stream.git`
* Run `npm install` to install required Node.js modules
* Run `bower install` to install required Bower components


## Dependencies
* angular
* json3
* es5-shim
* bootstrap-css-only
* lodash
* unchatbar-connection

## Get Started
```javascript
angular.module('app', ['unchatbar-stream'])
```



## API

* call a stream to client (unStreamConnection.createOwnStream have to call and resolve before)

>
```javascript
unStreamConnection.call([PEER-ID], [VIDEO/AUDIO], [METADATA]);
```


* close a stream from client

>
```javascript
unStreamConnection.close([PEER-ID]);
```

* add a new stream to storage

>
```javascript
unStreamConnection.add([PEER-ID],[open/waitingForClientAnswer/waitingForYourAnswer]);
```

* get a stream from storage

>
```javascript
unStreamConnection.get([PEER-ID]);
```

* get a list of stream

>
```javascript
unStreamConnection.getList([FILTER]);
```

* create a own stream object

>
```javascript
unStreamConnection.createOwnStream([VIDEO/AUDIO]);
```

* create a own stream object from storage

>
```javascript
unStreamConnection.getOwnStream([VIDEO/AUDIO]);
```


## Directive


* own video stream

>
```html
<un-stream-own></un-stream-own>
```

* stream call video button for channel

>
```html
<un-stream-call-video data-channel="{{[CHANNELNAME]}}" data-user-map="[USERLIST IN CHANNEL]"></un-stream-call-video>
```

* stream call audio button for channel

>
```html
<un-stream-call-audio data-channel="{{[CHANNELNAME]}}" data-user-map="[USERLIST IN CHANNEL]"></un-stream-call-audio>
```


* client stream waiting for your answer/permission

>
```html
<un-stream-waiting-for-your-answer data-user-map="[USERLIST]"></un-stream-waiting-for-your-answer>
```


* your stream calls, waiting for client answer/permission

>
```html
<un-stream-waiting-for-client-answer data-user-map="[USERLIST]"></un-stream-waiting-for-client-answer>
```


* list of open stream

>
```html
<un-stream-open data-channel="{{activeChannel.name}}"
data-channel="{{[CHANNELNAME]}}" data-user-map="[USERLIST IN CHANNEL]"></un-stream-open>
```

## Events

* **StreamUpdate**: add/Update/remove a stream (contains `waitingClients` : list of clients waiting for your answer: )
* **StreamRemoveOwn**: remove own stream

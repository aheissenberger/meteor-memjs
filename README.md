# aheissenberger:memjs

A Meteor wrapper for MemJS a pure Node.js client library for using memcache, in particular, the
[MemCachier](http://memcachier.com/) service. It
uses the binary protocol and support SASL authentication.

## Dependencies

 * [memjs](https://github.com/alevy/memjs) - A memcache client for node using the binary protocol and SASL authentication




## Installation

Install using Meteor:

```sh
meteor add aheissenberger:memjs
```

## Quick Start

Using it is straight-forward as memjs understands the
MEMCACHIER_SERVERS, MEMCACHIER_USERNAME and MEMCACHIER_PASSWORD
environment variables.

```javascript
var client = MemJS.Client.create()
client.set('hello', 'world', 600);
var result = client.get('hello')
```

Documentation can be found here: [http://amitlevy.com/projects/memjs/](http://amitlevy.com/projects/memjs/)

## API

### Settings Values

``` javascript
client.set('hello', 'world', function(err, val) {

}, 600);
```

The `set(key, val, callback, expiration)` function accepts the following parameters.

* `key`: key to set
* `val`: value to set
* `callback`: a callback invoked after the value is set
  * `err` : error
  * `val` : value retrieved
* `expiration`: time interval, in seconds, after which memcached will expire the object

### Getting Values

``` javascript
client.get('hello', function(err, val) {

});
```

The `get(key, callback)` function accepts the following parameters.

* `key`: key to retrieve
* `callback`: a callback invoked after the value is retrieved
  * `err` : error
  * `val` : value retrieved

## Configuration ##

MemJS understands the following environment variables:

* `MEMCACHIER_SERVERS` - used to determine which servers to connect to. Should be a comma separated list of _[hostname:port]_.
* `MEMCACHIER_USERNAME` - if present with `MEMCACHIER_PASSWORD`, MemJS will try to authenticated to the server using SASL.
* `MEMCACHIER_PASSWORD` - if present with `MEMCACHIER_USERNAME`, MemJS will try to authenticated to the server using SASL.
* `MEMCACHE_USERNAME` - used if `MEMCACHIER_USERNAME` is not present
* `MEMCACHE_PASSWORD` - used if `MEMCACHIER_PASSWORD` is not present

Environment variables are only used as a fallback for explicit parameters.

## TODO
 * Functions with callback(err, para1, para2) do not work: GET, INCREMENT, STATS,

## Changelog

### v0.0.1
 * Initial release

## Copyright and license

Copyright © 2015 [Andreas Heissenberger](http://www.heissenberger.at)

_aheissenberger:memjs_ is licensed under the [**MIT**](http://aheissenberger.mit-license.org) license.
# aheissenberger:memjs

A Meteor wrapper for MemJS a pure Node.js client library for using memcache, in particular, the
[MemCachier](http://memcachier.com/) service. It
uses the binary protocol and support SASL authentication.

MemCachier is the Memcache Add-On provided by [cloudcontroll](http://www.cloudcontrolled.com) which supports Meteor hosting with a custom [buildpack](https://github.com/aheissenberger/cloudcontrol-buildpack-meteor).

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
var client = new MemJS()
client.set('hello', 'world', 600);
var result = client.get('hello');
console.log(result.toString());
```

Documentation can be found here: [http://amitlevy.com/projects/memjs/](http://amitlevy.com/projects/memjs/)

## API

### Settings Values

``` javascript
client.set('hello', 'world', 600);
```

The `set(key, val, expiration)` function accepts the following parameters.

* `key`: key to set
* `val`: value to set
* `expiration` [optional]: time interval, in seconds, after which memcached will expire the object

*return*
* true if successful
* will throw an error of something goes wrong

### Getting Values

``` javascript
client.get('hello', function(err, val) {

});
```

The `get(key)` function accepts the following parameters.

* `key`: key to retrieve

*return*
* value (Buffer Object) if successful - you need to convert it back to a String  
* null if key does not exist
* will throw an error of something goes wrong

### all methodes ###
| function | returns | description |
| -------- | ------- | ----------- |
| new MemJS( server, options ) | Connection Object | initializes connection to Memcachier |
| get( key ) | value | get value for key, null if key does not exist |
| set( key, value, expire ) | success | set/overrides value of key |
| add( key, value, expire ) | success | set value of key, fails if key exists |
| replace( key, value, expire ) | success | set value of key, fails if key exists |
| delete( key ) | success | deletes key |
| increment( key, amount, expire ) | value | returns the value after the increment |
| decrement( key, amount, expire ) | success | returns the value after the decrement - success if OK - this is different to increment!! |
| stats( ) | {server, stats} | Fetches memcache stats from each connected server |
| flush( ) | {lastErr, results} | Flushes the cache on each connected server |
| close( ) | success | Closes connections to all the servers |

*input:* `value` will allways coverted to string - you can change this with this [option](#specific-option-of-the-wrapper)
*output:* `value` will allways be a Buffer Value - use to String to covert it

`expire` is optional, default can be set as option of `new MemJS` call

## Configuration ##

MemJS understands the following environment variables:

* `MEMCACHIER_SERVERS` - used to determine which servers to connect to. Should be a comma separated list of _[hostname:port]_.
* `MEMCACHIER_USERNAME` - if present with `MEMCACHIER_PASSWORD`, MemJS will try to authenticated to the server using SASL.
* `MEMCACHIER_PASSWORD` - if present with `MEMCACHIER_USERNAME`, MemJS will try to authenticated to the server using SASL.
* `MEMCACHE_USERNAME` - used if `MEMCACHIER_USERNAME` is not present
* `MEMCACHE_PASSWORD` - used if `MEMCACHIER_PASSWORD` is not present

Environment variables are only used as a fallback for explicit parameters.

### specific Option of the Wrapper ###
``` javascript
var client = new MemJS('USERNAME:PASSWORD@SERVER:PORT',{EJSON:true});
```

The `EJSON:true` allows to store and retrieve Javascript Objects - please check Meteor [EJSON](http://docs.meteor.com/#/full/ejson) for more information.
`$ meteor add ejson` is required to use this option

## Changelog

### v0.0.2
 * Convert Numbers to Strings

### v0.0.1
 * Initial release


## Copyright and license

Copyright © 2015 [Andreas Heissenberger](http://www.heissenberger.at)

_aheissenberger:memjs_ is licensed under the [**MIT**](http://aheissenberger.mit-license.org) license.
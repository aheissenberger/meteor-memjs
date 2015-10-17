var Future = Npm.require('fibers/future');
var getSettingsValueFor = function(key) {
    if (Meteor.settings && Meteor.settings.private && Meteor.settings.private.MemJS) {
        return Meteor.settings.private.MemJS[key];
    }
};
MemJS = function(serversStr, options) {
    var serversStr = serversStr || getSettingsValueFor('servers'); // fallback on the MEMCACHIER_SERVERS environment variable
    var options = options || getSettingsValueFor('options');
    if (options && options.EJSON) {
        this.EJSON = options.EJSON;
    } else {
        this.EJSON = false;
    }
    this._asyncAPI = Npm.require('memjs').Client.create(serversStr, options);
}
MemJS.prototype.parse = function(value) {
    return (this.EJSON ? EJSON.parse(value.toString()) : value);
}
MemJS.prototype.stringify = function(value) {
    return (this.EJSON ? EJSON.stringify(value) : (typeof(value !== 'string') ? value.toString() : value));
}
MemJS.prototype.get = function(key, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.get(key, callback);
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.get, this._asyncAPI);
            var value = wrapped(key);
            if (value) {
                value = this.parse(value);
            }
            return value;
        } catch (error) {
            // A workaround for:
            // https://github.com/meteor/meteor/issues/2774
            if (!error.error) {
                throw new Meteor.Error(error.code, error.message);
            } else {
                throw new Meteor.Error(error);
            }
        }
    }
}
MemJS.prototype.set = function(key, value, expires, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.set(key, value, callback, expires);
    } else {
        value = this.stringify(value);
        var future = new Future();
        this._asyncAPI.set(key, value, Meteor.bindEnvironment(function(err, success) {
            if (err) {
                future.throw(err);
            } else {
                future.return(success);
            }
        }), expires)
        return future.wait();
    }
}
MemJS.prototype.add = function(key, value, expires, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.add(key, value, callback, expires);
    } else {
        value = this.stringify(value);
        var future = new Future();
        this._asyncAPI.add(key, value, Meteor.bindEnvironment(function(err, success) {
            if (err) {
                future.throw(err);
            } else {
                future.return(success);
            }
        }), expires)
        return future.wait();
    }
}
MemJS.prototype.replace = function(key, value, expires, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.replace(key, value, callback, expires);
    } else {
        value = this.stringify(value);
        var future = new Future();
        this._asyncAPI.replace(key, value, Meteor.bindEnvironment(function(err, success) {
            if (err) {
                future.throw(err);
            } else {
                future.return(success);
            }
        }), expires)
        return future.wait();
    }
}
MemJS.prototype.delete = function(key, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.delete(key, callback);
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.delete, this._asyncAPI);
            return wrapped(key);
        } catch (error) {
            // A workaround for:
            // https://github.com/meteor/meteor/issues/2774
            if (!error.error) {
                throw new Meteor.Error(error.code, error.message);
            } else {
                throw new Meteor.Error(error);
            }
        }
    }
}
MemJS.prototype.increment = function(key, amount, expires, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.increment(key, amount, callback, expires);
    } else {
        var future = new Future();
        this._asyncAPI.increment(key, amount, Meteor.bindEnvironment(function(err, success, value) {
            if (err) {
                future.throw(err);
            } else if (success) {
                future.return(value);
            } else {
                future.return(success);
            }
        }), expires)
        return future.wait();
    }
}
MemJS.prototype.decrement = function(key, amount, expires, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.decrement(key, amount, callback, expires);
    } else {
        var future = new Future();
        this._asyncAPI.decrement(key, amount, Meteor.bindEnvironment(function(err, success) {
            if (err) {
                future.throw(err);
            } else {
                future.return(success);
            }
        }), expires)
        return future.wait();
    }
}
MemJS.prototype.flush = function(callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.flush(callback);
    } else {
        var future = new Future();
        this._asyncAPI.flush(Meteor.bindEnvironment(function(lastErr, result) {
            future.return({
                lastErr: lastErr,
                result: result
            });
        }))
        return future.wait();
    }
}
MemJS.prototype.stats = function(callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.stats(callback);
    } else {
        var numServers = this._asyncAPI.servers.length;
        var result = [];
        var future = new Future();
        this._asyncAPI.stats(Meteor.bindEnvironment(function(err, server, stats) {
            if (err) {
                future.throw(err);
            } else {
                result.push({
                    server: server,
                    stats: stats
                });
                numServers--;
                if (numServers <= 0) {
                    future.return(result);
                }
            }
        }))
        return future.wait();
    }
}
MemJS.prototype.perform = function(key, request, retries, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.perform(key, request, callback, retries);
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.perform, this._asyncAPI);
            return wrapped(key, request, callback, retries);
        } catch (error) {
            // A workaround for:
            // https://github.com/meteor/meteor/issues/2774
            if (!error.error) {
                throw new Meteor.Error(error.code, error.message);
            } else {
                throw new Meteor.Error(error);
            }
        }
    }
}
MemJS.prototype.close = function() {
    this._asyncAPI.close();
}
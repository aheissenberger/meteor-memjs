
var getSettingsValueFor = function(key) {
    if (Meteor.settings && Meteor.settings.private && Meteor.settings.private.MemJS) {
        return Meteor.settings.private.MemJS[key];
    }
};
MemJS = function(serversStr, options) {
    var serversStr = serversStr || getSettingsValueFor('servers'); // fallback on the MEMCACHIER_SERVERS environment variable
    var options = options || getSettingsValueFor('options');
    this._asyncAPI = Npm.require('memjs').Client.create(serversStr, options);
    this
}

MemJS.prototype.get = function(key, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.get(key, callback);
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.get, this._asyncAPI);
            var value = wrapped(key);
            if (value !== false) {
              value = EJSON.parse(value.toString());
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


MemJS.prototype.set = function(key,  value, expires, callback) {
    var ejsonval = EJSON.stringify(value);
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.set(key,  ejsonval, callback, expires);
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.set, this._asyncAPI);
            return wrapped(key,  ejsonval, callback, expires);
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

MemJS.prototype.add = function(key,  value, expires, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.add(key,  value, callback, expires );
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.add, this._asyncAPI);
            return wrapped(key,  value, callback, expires);
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

MemJS.prototype.replace = function(key,  value, expires, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.replace(key,  value, callback, expires );
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.replace, this._asyncAPI);
            return wrapped(key,  value, callback, expires);
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

MemJS.prototype.increment = function(key,  amount, expires, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.increment(key,  amount, callback, expires );
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.increment, this._asyncAPI);
            return wrapped(key,  amount, callback, expires);
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

MemJS.prototype.decrement = function(key,  amount, expires, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.decrement(key,  amount, callback, expires );
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.decrement, this._asyncAPI);
            return wrapped(key,  amount, callback, expires);
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

MemJS.prototype.flush = function( callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.flush(callback);
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.flush, this._asyncAPI);
            return wrapped();
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

MemJS.prototype.stats = function( callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.stats(callback);
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.stats, this._asyncAPI);
            return wrapped();
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

MemJS.prototype.perform = function(key,  request, retries, callback) {
    if (callback && typeof callback === 'function') {
        // If anyone still wants to use old-fashioned callback method
        this._asyncAPI.perform(key,  request, callback, retries );
    } else {
        try {
            var wrapped = Meteor.wrapAsync(this._asyncAPI.perform, this._asyncAPI);
            return wrapped(key,  request, callback, retries);
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
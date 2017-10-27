(function() {
    var root = this;

    var previousUnderscore = root._;

    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;

    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = Function.bind;

    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    
}
    _.VERSION = '1.7.0';

    var createCallback = function(func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function(value) {
                return func.call(context, value);
            };
            case 2: return function(value, other) {
                return func.call(context, value, other);
            };
            case 3: return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function() {
            return func.apply(context,arguments);
        };
    };

    _.each = _.forEach = function(obj, iteratee, context) {
        if (obj == null) return obj;
        iteratee = createCallback(iteratee, context);
        var i, length = obj.length;
        if (length === +length) {
            for (i = 0; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], i, obj);
            }
        }
        return obj;
    };

    // Object Functions
    // ----------------

    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj,key)) keys.push(key);
        return keys;
    };

    _.values = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    _.pairs = function(obj) {
        var keys = _.keys(obj),
            length = keys.length,
            pairs = Array(length),
            i = 0;
        for (; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };

    _.invert = function(obj) {
        var keys = _.keys(obj),
            length = keys.length,
            result = {},
            i = 0;
        for (; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };
    
    _.functions = _.methods = function(obj) {
        var names = [],
            key;
        for (key in obj) if (_.isFunction(obj[key])) names.push(key);
        return names.sort();
    };

    

    _.has = function(obj, key) {
        return obj != null && hasOwnProperty.call(obj,key);
    };

    _.isEqual = function(a, b) {
        //todo:
    };

    _.isEmpty = function(obj) {
        if (obj == null) return true;
        //todo:
    };

    _.isElement = function(obj) {
        return !!(obj && obj.nodeType ===1);
    };

    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };

    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
        _['is' + name] = function(obj) {
            return toString.call(obj) === '[object '+name+']';
        };
    });

    if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
            return _.has(obj, 'callee');
        };
    }

    if (typeof /./ !== 'function') {
        _.isFunction = function(obj) {
            return typeof obj === 'function' || false;
        };
    }

    _.isFinite = function(obj) {
        return isFinite(obj) && _.isNaN(parseFloat(obj));
    };

    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj !== +obj;
    };

    _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    _.isNull = function(obj) {
        return obj === null;
    };

    _.isUndefined = function(obj) {
        return obj === void 0;
    };
}());
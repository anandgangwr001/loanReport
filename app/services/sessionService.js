app.service('LS', function (webStorage) {
    var issupported = webStorage.session.isSupported;
    var key = null;
    var value = null;
    return {
        set: function (key, value) {
            if (issupported)
                webStorage.session.set(key, value);
                else 
               webStorage.memory.set(key, value);
        },
        get: function (key) {
              if (issupported)
               return webStorage.session.get(key);
               else 
               return webStorage.memory.get(key);
        },
        remove: function (key) {
            if (issupported)
                webStorage.session.remove(key);
                else
                webStorage.memory.get(key);

        },
        clearAll: function() {
             if (issupported)
                webStorage.session.clear();
                else
                webStorage.memory.clear();
        }
    };
});
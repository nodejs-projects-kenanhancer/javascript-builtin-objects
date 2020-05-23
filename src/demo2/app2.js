var files = {
    "messages.js": "module.exports = 'Hello World'",
    "englishGreeting.js": `var { getFullName } = require("greetingHelper.js");
    module.exports.sayHello = (firstName, lastName)=> "Hello " + getFullName(firstName, lastName)`,
    "turkishGreeting.js": "module.exports.sayHello = (firstName, lastName)=> `Merhaba ${firstName} ${lastName}`",
    "greetingHelper.js": "module.exports.getFullName = (firstName, lastName)=> `${firstName} ${lastName}`",
    "constants.json": '{"firstName": "kenan", "lastName": "hancer"}'
};

var fileLoaders = {
    "js": function (filePath) {

        var jsLoader = function (filePath) {
            var fileContent = files[filePath];

            var params = {module: {exports: {}}};
            params.exports = params.module.exports;
            params.require = function (filePath) {
                return jsLoader(filePath);
            };

            return fileContent && (new Function("module", "exports", "require", `${fileContent}; return module.exports;`)).apply(this, Object.values(params));
        };

        return jsLoader(filePath);
    },
    "json": function (filePath) {
        var fileContent = files[filePath];

        return fileContent && JSON.parse(fileContent);
    }
};

var fileLoadersMap = new Map(Object.entries(fileLoaders));

var loadedFiles = Object.entries(files).reduce((acc, [filePath, fileContent, [fileName, ext] = filePath.split('.')]) => {

    return {
        ...acc,
        [fileName]: fileLoadersMap.has(ext) && fileLoadersMap.get(ext)(filePath)
    };
}, {});


var englishGreeting = loadedFiles.englishGreeting.sayHello('kenan', 'hancer');

console.log(englishGreeting);
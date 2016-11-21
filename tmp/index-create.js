/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var fs = __webpack_require__(2);
	var SerializationHelper_1 = __webpack_require__(5);
	var Template_1 = __webpack_require__(3);
	var TemplateDatabase_1 = __webpack_require__(4);
	var crypto = __webpack_require__(57);
	console.log("Creating...");
	var CreateCommandArguments = (function () {
	    function CreateCommandArguments() {
	    }
	    return CreateCommandArguments;
	}());
	var CreateCommand = (function () {
	    function CreateCommand() {
	    }
	    CreateCommand.prototype.CreateTemplate = function (commandArgs) {
	        crypto.randomBytes(12, function (err, buffer) {
	            var token = buffer.toString("hex");
	            fs.readFile(commandArgs.templateRootFolder + "/.template-index.json", "utf8", function (err, data) {
	                if (err) {
	                    return console.log(err);
	                }
	                var db = SerializationHelper_1.SerializationHelper.toInstance(new TemplateDatabase_1.TemplateDatabase(), data);
	                var templates = db.templates.filter(function (item) { return item.id === commandArgs.templateName; });
	                if (templates.length === 0) {
	                    var template = new Template_1.Template();
	                    template.filename = token;
	                    template.id = commandArgs.templateName;
	                    db.templates.push(template);
	                    fs.createReadStream(commandArgs.sourceFilePath)
	                        .pipe(fs.createWriteStream(commandArgs.templateRootFolder + "/templates/" + token));
	                    fs.writeFile(commandArgs.templateRootFolder + "/.template-index.json", JSON.stringify(db), function (err) {
	                        if (err) {
	                            return console.log(err);
	                        }
	                    });
	                }
	                else {
	                    console.log("Template already exists");
	                }
	            });
	        });
	    };
	    CreateCommand.prototype.ValidateArguments = function (args) {
	        return false;
	    };
	    return CreateCommand;
	}());


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },

/***/ 3:
/***/ function(module, exports) {

	"use strict";
	var Template = (function () {
	    function Template() {
	    }
	    return Template;
	}());
	exports.Template = Template;


/***/ },

/***/ 4:
/***/ function(module, exports) {

	"use strict";
	var TemplateDatabase = (function () {
	    function TemplateDatabase() {
	    }
	    return TemplateDatabase;
	}());
	exports.TemplateDatabase = TemplateDatabase;


/***/ },

/***/ 5:
/***/ function(module, exports) {

	"use strict";
	var SerializationHelper = (function () {
	    function SerializationHelper() {
	    }
	    SerializationHelper.toInstance = function (obj, json) {
	        var jsonObj = JSON.parse(json);
	        if (typeof obj["fromJSON"] === "function") {
	            obj["fromJSON"](jsonObj);
	        }
	        else {
	            for (var propName in jsonObj) {
	                obj[propName] = jsonObj[propName];
	            }
	        }
	        return obj;
	    };
	    return SerializationHelper;
	}());
	exports.SerializationHelper = SerializationHelper;


/***/ },

/***/ 57:
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ }

/******/ });
//# sourceMappingURL=index-create.js.map
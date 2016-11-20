import * as minimist from 'minimist';
import * as fs from 'fs';
import { anyid } from 'anyid';
import * as crypto from 'crypto';
var openInEditor = require('open-in-editor');

console.log("my-cli");

class Template {
    id: string
    filename: string
    extension: string
    type: string
}

class SerializationHelper {
    static toInstance<T>(obj: T, json: string): T {
        var jsonObj = JSON.parse(json);

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }
}

class TemplateDatabase {
    templates: Array<Template>
}

function getUserHome() {
    return process.env.HOME || process.env.USERPROFILE;
}

const homeFolder = getUserHome();

let parserOptions = {
    default: {
        "new": false,
        "templateFolder": `${homeFolder}/.my-templates/`
    }
};

const args = minimist(process.argv.slice(2), parserOptions);
console.log(args);

let exists = fs.existsSync(args["templateFolder"]);

if (exists == false) {
    console.log("Initializing template db...")
    fs.mkdir(args["templateFolder"]);

    let db = new TemplateDatabase();
    db.templates = new Array<Template>();

    fs.writeFile(args["templateFolder"] + "/.template-index.json", JSON.stringify(db), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

if (args["list"]) {
    fs.readFile(args["templateFolder"] + "/.template-index.json", 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var db = SerializationHelper.toInstance(new TemplateDatabase(), data);

        console.log('NAME\t\t\tFILENAME')
        for (let entry of db.templates) {

            console.log(`${entry.id}\t\t${entry.filename}\t${entry.extension}`);
        }
    });
}

if (args["new"] == true) {
    require('crypto').randomBytes(20, function (err, buffer) {
        var token = buffer.toString('hex');

        fs.createReadStream(args["from"])
            .pipe(fs.createWriteStream(args["templateFolder"] + "/" + token));

        fs.readFile(args["templateFolder"] + "/.template-index.json", 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var db = SerializationHelper.toInstance(new TemplateDatabase(), data);
            var templates = db.templates.filter(item => item.id == args["name"]);

            if (templates.length == 0) {
                var template = new Template();
                template.filename = token;
                template.id = args["name"];
                db.templates.push(template);

                fs.writeFile(args["templateFolder"] + "/.template-index.json", JSON.stringify(db), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            } else {
                console.log("Template already exists");
            }
        });
    });
}

if (args["add"] == true) {
    fs.readFile(args["templateFolder"] + "/.template-index.json", 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var db = SerializationHelper.toInstance(new TemplateDatabase(), data);
        var templates = db.templates.filter(item => item.id == args["t"]);

        if (templates.length == 0) {
            console.log(`'${args['t']}' template not found`);
        }
        var template = templates[0];

        fs.createReadStream(`${args["templateFolder"]}/${template.filename}`)
            .pipe(fs.createWriteStream(args["o"]));
    });
}

if (args["edit"] == true) {

    fs.readFile(args["templateFolder"] + "/.template-index.json", 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var db = SerializationHelper.toInstance(new TemplateDatabase(), data);
        var templates = db.templates.filter(item => item.id == args["t"]);

        if (templates.length == 0) {
            console.log(`'${args['t']}' template not found`);
        }
        var template = templates[0];

        var editor = openInEditor.configure({
            editor: 'code'
        }, function (err) {
            console.error('Something went wrong: ' + err);
        });

        editor.open(args["templateFolder"] + template.filename)
            .then(function () {
                console.log('Success!');
            }, function (err) {
                console.error('Something went wrong: ' + err);
            });
    });


}
import * as minimist from "minimist";
import * as fs from "fs";
import {anyid} from "anyid";
import {Template} from "./Template";
import { TemplateDatabase } from "./TemplateDatabase";
import { SerializationHelper } from "./SerializationHelper";
import { Arguments, Command } from "./Arguments";
import { compile, template } from "handlebars";
import * as program from "commander";

const openInEditor = require("open-in-editor");
const crypto = require("crypto");

console.log("Welcome to TBD");

program
  .version("0.10.0")
  .command("create [name]", "create a new template")
  .command("list", "list all templates", {isDefault: true})
  .option("-t, --template", "template")
  .option("-o, --output", "output filename")
  .option("-f, --from", "template source file")
  .option("-c, --cheese [type]", "add the specified type of cheese [marble]", "marble")
  .parse(process.argv);

function getUserHome() {
    return process.env.HOME || process.env.USERPROFILE;
}

const homeFolder = getUserHome();

let parserOptions = {
    default: {
        "new": false,
        alias: { h: "help", v: "version" },
        "templateFolder": `${homeFolder}/.my-templates/`
    }
};

const args = minimist(process.argv.slice(2), parserOptions);

if (args["verbose"]) {
    console.log(args);
}

let exists = fs.existsSync(args["templateFolder"]);

if (exists === false) {
    console.log("Initializing template db...");
    fs.mkdir(args["templateFolder"]);
    fs.mkdir(`${args["templateFolder"]}/templates`);

    let db = new TemplateDatabase();
    db.templates = new Array<Template>();

    fs.writeFile(args["templateFolder"] + "/.template-index.json", JSON.stringify(db), function(err) {
        if (err) {
            return console.log(err);
        }
    });
}

if (args["list"]) {
    fs.readFile(args["templateFolder"] + "/.template-index.json", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        let db = SerializationHelper.toInstance(new TemplateDatabase(), data);

        console.log("NAME\t\t\tFILENAME");
        for (let entry of db.templates) {

            console.log(`${entry.id}\t\t${entry.filename}\t${entry.extension}`);
        }
    });
}

if (args["new"] === true) {
    crypto.randomBytes(12, function(err, buffer) {
        const token = buffer.toString("hex");

        fs.readFile(args["templateFolder"] + "/.template-index.json", "utf8", function(err, data) {
            if (err) {
                return console.log(err);
            }
            const db = SerializationHelper.toInstance(new TemplateDatabase(), data);
            const templates = db.templates.filter(item => item.id === args["name"]);

            if (templates.length === 0) {
                let template = new Template();
                template.filename = token;
                template.id = args["name"];
                db.templates.push(template);

                fs.createReadStream(args["from"])
                    .pipe(fs.createWriteStream(args["templateFolder"] + "/templates/" + token));

                fs.writeFile(args["templateFolder"] + "/.template-index.json", JSON.stringify(db), function(err) {
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

if (args["add"] === true) {
    fs.readFile(args["templateFolder"] + "/.template-index.json", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }

        let templateName = args["t"];
        let outputname = args["o"];

        let templateOptions = {
            outputname: outputname,
            extension: "tsx"
        };

        const db = SerializationHelper.toInstance(new TemplateDatabase(), data);
        let templates = db.templates.filter(item => item.id === args["t"]);

        if (templates.length === 0) {
            console.log(`'${args["t"]}' template not found`);

        } else {

            let template = templates[0];

            fs.readFile(`${args["templateFolder"]}/templates/${template.filename}`, "utf-8", function(err, templateText) {
                if (err) {
                    console.log(err);
                    return;
                }
                let template = compile(templateText);
                let output = template(templateOptions);

                fs.writeFile(`${outputname}.ts`, output, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            });
        }
    });
}

if (args["edit"] === true) {

    fs.readFile(args["templateFolder"] + "/.template-index.json", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        const db = SerializationHelper.toInstance(new TemplateDatabase(), data);
        let templates = db.templates.filter(item => item.id === args["t"]);

        if (templates.length === 0) {
            console.log(`'${args["t"]}' template not found`);
        }
        let template = templates[0];

        let editor = openInEditor.configure({
            editor: "code"
        }, function(err) {
            console.error("Something went wrong: " + err);
        });

        editor.open(args["templateFolder"] + "/templates/" + template.filename)
            .then(function() {
                console.log("Success!");
            }, function(err) {
                console.error("Something went wrong: " + err);
            });
    });


}

if (args["help"] === true) {
    console.log("Help Info");
}

if (args["error"] === true) {

}
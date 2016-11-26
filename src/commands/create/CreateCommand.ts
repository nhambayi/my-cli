import * as fs from "fs";
import { SerializationHelper } from "../../SerializationHelper";
import { Template } from "../../Template";
import { TemplateDatabase } from "../../TemplateDatabase";
const crypto = require("crypto");

console.log("Creating...");

class CreateCommandArguments {
    public templateRootFolder: string;
    public templateName: string;
    public sourceFilePath: string;
    public templateExtension: string;
    public templateIndexFileName: string;
    public templatesType: string;
}

class CreateCommand {

    TemplateDatabase: TemplateDatabase;

    CreateTemplate(commandArgs: CreateCommandArguments): void {

        crypto.randomBytes(12, function (err, buffer) {
            const token = buffer.toString("hex");

            fs.readFile(`${commandArgs.templateRootFolder}/.template-index.json`, "utf8", function (err, data) {
                if (err) {
                    return console.log(err);
                }
                const db = SerializationHelper.toInstance(new TemplateDatabase(), data);
                const templates = db.templates.filter(item => item.id === commandArgs.templateName);

                if (templates.length === 0) {
                    let template = new Template();
                    template.name = token;
                    template.id = commandArgs.templateName;
                    db.templates.push(template);

                    fs.createReadStream(commandArgs.sourceFilePath)
                        .pipe(fs.createWriteStream(commandArgs.templateRootFolder + "/templates/" + token));

                    fs.writeFile(commandArgs.templateRootFolder + "/.template-index.json", JSON.stringify(db), function (err) {
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

    ValidateArguments(args: CreateCommandArguments): boolean {
        return false;
    }
}


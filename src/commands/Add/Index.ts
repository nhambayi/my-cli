import * as chalk from "chalk";
import { ITemplateStore, IApplicationConfiguration, ILogger, ICommand } from "../../Interfaces";
import { TemplateStore } from "../../TemplateStore";
import { TemplateStoreConfiguration } from "../../TemplateStoreConfiguration";
import { FileStore } from "../../FileStore";
import { Logger } from "../../Logger";
import { DiskDbTemplateIndex } from "../../DiskDbTemplateIndex";
import { TEMPLATES_COLLECTION_NAME } from "../../Constants";
import { AddCommand } from "./AddCommand";
import * as program from "commander";

program
  .option("-f, --from [filename]", "template source file")
  .option("-p, --project [projectName]", "project")
  .option("-x, --extension [extension]", "extension")
  .option("-d, --desc [description]", "description")
  .option("-n, --name [name]", "template name")
  .parse(process.argv);

const config = new TemplateStoreConfiguration();
const fileStore = new FileStore();
const logger = new Logger();
const templateIndex = new DiskDbTemplateIndex(config.templateIndexPath, TEMPLATES_COLLECTION_NAME);
const store = new TemplateStore(templateIndex, config, fileStore, logger);
const command: ICommand = new AddCommand(store);
let name: string;
let desc: string = program["desc"];

if (program.args[0]) {
  name = program.args[0];
} else {
  name = program["from"];
}

command.execute(program["from"], name, program["extension"], desc);
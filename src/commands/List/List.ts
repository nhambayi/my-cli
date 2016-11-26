import * as chalk from "chalk";
import { ITemplateStore, IApplicationConfiguration, ILogger } from "../../Interfaces";
import { TemplateStore } from "../../TemplateStore";
import { TemplateStoreConfiguration } from "../../TemplateStoreConfiguration";
import { FileStore } from "../../FileStore";
import { Logger } from "../../Logger";
import {ListCommand} from "./ListCommand";

console.log("Listing...");

const config = new TemplateStoreConfiguration();
const fileStore = new FileStore();
const logger = new Logger();
const store = new TemplateStore(config, fileStore, logger);
const command = new ListCommand(store);

command.execute();


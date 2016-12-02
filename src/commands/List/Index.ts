import * as chalk from "chalk";
import { ITemplateStore, IApplicationConfiguration, ILogger } from "../../Interfaces";
import { TemplateStore } from "../../TemplateStore";
import { TemplateStoreConfiguration } from "../../TemplateStoreConfiguration";
import { FileStore } from "../../FileStore";
import { Logger } from "../../Logger";
import {ListCommand} from "./ListCommand";
import {DiskDbTemplateIndex} from "../../DiskDbTemplateIndex";
import {TEMPLATES_COLLECTION_NAME} from "../../Constants";

const config = new TemplateStoreConfiguration();
const fileStore = new FileStore();
const logger = new Logger();
const templateIndex = new DiskDbTemplateIndex(config.templateIndexPath, TEMPLATES_COLLECTION_NAME);
const store = new TemplateStore(templateIndex, config, fileStore, logger);
const command = new ListCommand(store);

 command.execute();

import * as chalk from "chalk";
import { ITemplateStore, IApplicationConfiguration, ILogger } from "../Interfaces";
import { TemplateStore } from "../TemplateStore";
import { TemplateStoreConfiguration } from "../TemplateStoreConfiguration";
import { FileStore } from "../FileStore";
import { Logger } from "../Logger";

console.log("Listing...");

const config = new TemplateStoreConfiguration();
const fileStore = new FileStore();
const logger = new Logger();
const store = new TemplateStore(config, fileStore, logger);
const command = new ListCommand(store);

command.execute();

export class ListCommand {

    constructor(store: ITemplateStore) {
        this.store = store;
    }

    private store: ITemplateStore;

    execute() {
        this.store.initialize()
            .then(this.listItems);
    }

    private listItems() {
        console.log("listing...");
    }
}
import { ITemplateStore, IApplicationConfiguration, ILogger, ITemplate, ICommand } from "../../Interfaces";
import {Template} from "../../Template";
let Table = require("easy-table");


export class AddCommand implements ICommand {

    constructor(store: ITemplateStore) {
        this.store = store;
    }

    private store: ITemplateStore;

    async execute(from: string, name: string, extension: string, desc: string) {
        return new Promise<void>((resolve, reject) => {
        this.store.initialize()
            .then(() => {
                this.add(from, name, extension, desc);
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    private add(from: string, name: string, extension: string, desc: string) {
        if (!extension) {
            extension = "";
        }

        if (!desc) {
            desc = "";
        }

        let template = new Template();
        template.name = name;
        template.extension = extension;
        template.description = desc;
        template.context = ".";
        console.log("Adding...");
        this.store.add(template);
    }
}
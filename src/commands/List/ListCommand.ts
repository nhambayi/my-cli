import { ITemplateStore, IApplicationConfiguration, ILogger } from "../../Interfaces";
let Table = require('easy-table');

export class ListCommand {

    constructor(store: ITemplateStore) {
        this.store = store;
    }

    private store: ITemplateStore;

    async execute() {
        return new Promise<void>((resolve, reject) => {
        this.store.initialize()
            .then(() => {
                this.listItems();
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    private listItems() {
        console.log("");
        let t = new Table();
        let templateList = this.store.getAll();
        templateList.forEach((item, index, array) => {
            t.cell(" ", index + 1);
            t.cell("Name", item.name);
            t.cell("Description", item.description);
            t.cell("Ext", item.extension);
            t.cell("Context", item.context);
            t.cell("Template", item._id);
            t.newRow();
        });

        console.log(t.toString())
    }
}
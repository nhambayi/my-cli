import { ITemplateStore, IApplicationConfiguration, ILogger } from "../../Interfaces";

export class ListCommand {

    constructor(store: ITemplateStore) {
        this.store = store;
    }

    private store: ITemplateStore;

    execute() {
        this.store.initialize()
            .then(this.listItems)
            .catch((err) => { console.log(err); });
    }

    private listItems() {
        console.log("Done.");
    }
}
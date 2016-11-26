import { ITemplate, ITemplateIndex } from "./Interfaces";
import * as db from "diskdb";

export class DiskDbTemplateIndex implements ITemplateIndex {

    templates: Array<ITemplate>;
    private database: db.IDiskDb;
    private templateCollection: db.IDiskDbCollection;
    isConnected: boolean;

    constructor(private pathToStore: string, private templateCollectionName: string) {
        this.isConnected = false;
    }

    async connect() {
        return new Promise<void>((resolve, reject) => {
            this.database = db.connect(this.pathToStore);
            this.database.loadCollections([this.templateCollectionName]);
            this.templateCollection = this.database[this.templateCollectionName];
            resolve();
        });
    }

    add(template: ITemplate): void {
        this.templateCollection.save(template);
    }

    getAll(): Array<ITemplate> {
        return this.templateCollection.find();
    }
}
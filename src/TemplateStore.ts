import { ITemplateIndex, ITemplateStore, IFileStore, IApplicationConfiguration, ILogger } from "./Interfaces";
import { SerializationHelper } from "./SerializationHelper";
import { INDEX_FOLDER_NAME, TEMPLATES_COLLECTION_NAME } from "./Constants";
import * as db from "diskdb";

export class TemplateStore implements ITemplateStore {

    constructor(config: IApplicationConfiguration, fileStore: IFileStore, logger: ILogger) {
        this.configuration = config;
        this.fileStore = fileStore;
        this.logger = logger;
    }

    templateIndex: ITemplateIndex;
    fileStore: IFileStore;
    configuration: IApplicationConfiguration;
    logger: ILogger;
    database: db.IDiskDb;
    templateCollection: db.IDiskDbCollection;


    async initialize() {
        return new Promise<void>((resolve, reject) => {
            if (!this.fileStore.fileExists(this.configuration.templateRootFolder)) {
                this.createFolder(this.configuration.templateRootFolder).then(() => {
                    this.initiializeTemplateIndex().then(() => {
                        resolve();
                    }).catch((err) => { console.log(err); });
                }).catch((err) => { console.log(err); });
            }

            this.initiializeTemplateIndex().then(() => {
                resolve();
            }).catch((err) => { console.log(err); });

        });

    }

    add(): void {

    }

    update(): void {

    }

    remove(): void {

    }

    find(): void {

    }

    getAll(): void {

    }

    private async load(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.fileStore.loadFile(this.configuration.templateIndexPath, (result, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    private async createFolder(path: string) {
        return new Promise<void>((resolve, reject) => {
            this.fileStore.createFolder(path, (result, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private async initiializeTemplateIndex() {
        return new Promise<void>((resolve, reject) => {
            if (!this.fileStore.fileExists(this.configuration.templateIndexPath)) {
                this.createFolder(this.configuration.templateIndexPath).then(() => {
                    this.database = db.connect(this.configuration.templateIndexPath);
                    this.templateCollection = this.database.loadCollections([TEMPLATES_COLLECTION_NAME]);
                });
            } else {
                this.database = db.connect(this.configuration.templateIndexPath);
                this.database.loadCollections([TEMPLATES_COLLECTION_NAME]);
                this.templateCollection = this.database[TEMPLATES_COLLECTION_NAME];
            }
        });
    }
}
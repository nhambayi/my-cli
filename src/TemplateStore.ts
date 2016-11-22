import { ITemplateIndex, ITemplateStore, IFileStore, IApplicationConfiguration, ILogger } from "./Interfaces";
import { SerializationHelper } from "./SerializationHelper";
import { INDEX_FILE_NAME } from "./Constants";

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

    async initialize() {
        return new Promise<void>((resolve, reject) => {
            if (!this.fileStore.fileExists(this.configuration.templateRootFolder)) {
                this.createRootFolder().then(() => {
                    if (!this.fileStore.fileExists(`${this.configuration.templateRootFolder}/${INDEX_FILE_NAME}`)) {
                        this.initiializeTemplateIndex().then(() => {
                            resolve();
                        });
                    }
                });
            }

            if (!this.fileStore.fileExists(`${this.configuration.templateRootFolder}/${INDEX_FILE_NAME}`)) {
                this.initiializeTemplateIndex().then(() => {
                    resolve();
                });
            }
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

    private async createRootFolder() {
        return new Promise<void>((resolve, reject) => {
            this.fileStore.createFolder(this.configuration.templateRootFolder, (result, err) => {
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
            let template: string = "";
            this.fileStore.saveFile(this.configuration.templateIndexPath, template, (result, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
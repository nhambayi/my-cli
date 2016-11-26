import { ITemplateIndex, ITemplate, ITemplateStore, IFileStore, IApplicationConfiguration, ILogger } from "./Interfaces";
import { SerializationHelper } from "./SerializationHelper";
import { INDEX_FOLDER_NAME, TEMPLATES_COLLECTION_NAME } from "./Constants";
import { DiskDbTemplateIndex } from "./DiskDbTemplateIndex";
import {Template} from "./Template";

export class TemplateStore implements ITemplateStore {

    constructor(private templateIndex: ITemplateIndex, private configuration: IApplicationConfiguration, private fileStore: IFileStore, private logger: ILogger) {
    }

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

    find(): Array<Template>  {
        return null;
    }

    getAll(): Array<Template> {
        return this.templateIndex.getAll();
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
                    this.templateIndex.connect();
                    resolve();
                });
            } else {
                this.templateIndex.connect();
                resolve();
            }
        });
    }
}
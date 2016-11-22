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

    initialize(): void {

        if (!this.fileStore.fileExists(this.configuration.templateRootFolder)) {
            this.createRootFolder((err) => {
                if (!this.fileStore.fileExists(`${this.configuration.templateRootFolder}/${INDEX_FILE_NAME}`)) {
                    this.initiializeTemplateIndex((err) => {
                        this.load();
                    });
                }
            });
        } else {
            if (!this.fileStore.fileExists(`${this.configuration.templateRootFolder}/${INDEX_FILE_NAME}`)) {
                this.initiializeTemplateIndex((err) => {
                    this.load();
                });
            }
        }
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

    private load(): void {
        this.fileStore.loadFile(this.configuration.templateIndexPath, (result, err) => {
            if (err) {
                this.logger.error(err);
                return;
            }
        });
    }


    private createRootFolder(callback: (err) => void): void {
        this.fileStore.createFolder(this.configuration.templateRootFolder, (result, err) => {
            callback(err);
        });
    }

    private initiializeTemplateIndex(callback: (err) => void): void {
        let template: string = "";
        this.fileStore.saveFile(this.configuration.templateIndexPath, template, (result, err) => {
            callback(err);
        });
    }
}
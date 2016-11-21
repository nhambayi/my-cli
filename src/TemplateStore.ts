import { ITemplateIndex, ITemplateStore, IFileStore, IApplicationConfiguration } from "./Interfaces";
import { SerializationHelper } from "./SerializationHelper";
import { INDEX_FILE_NAME } from "./Constants";

export class TemplateStore implements ITemplateStore {

    constructor(config: IApplicationConfiguration, fileStore: IFileStore) {
        this.configuration = config;
        this.fileStore = fileStore;
    }

    templateIndex: ITemplateIndex;
    fileStore: IFileStore;
    configuration: IApplicationConfiguration;

    initialize(): void {
        if (!this.fileStore.fileExists(this.configuration.templateRootFolder)) {
            this.createRootFolder();
        }

        if (!this.fileStore.fileExists(`${this.configuration.templateRootFolder}/${INDEX_FILE_NAME}`)) {
            this.initiializeTemplateIndex();
        }
    }

    load(): void {

    }

    add(): void {

    }

    update(): void {

    }

    remove(): void {

    }

    find(): void {

    }

    private createRootFolder(): void {
        this.fileStore.createFolder(this.configuration.templateRootFolder);
    }

    private initiializeTemplateIndex(): void {
        let template: string = "";
        this.fileStore.saveFile(this.configuration.templateIndexPath);
    }
}
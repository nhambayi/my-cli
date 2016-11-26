import { IApplicationConfiguration } from "./Interfaces";
import {INDEX_FOLDER_NAME, ROOT_FOLDER_NAME} from "./Constants";

export class TemplateStoreConfiguration implements IApplicationConfiguration {

    constructor() {
        this.initialize();
    }

    private initialize() {
        this.userHomeDirectory = this.getUserHome();
        this.templateRootFolder = `${this.userHomeDirectory}/${ROOT_FOLDER_NAME}`;
        this.templateIndexPath = `${this.templateRootFolder}/${INDEX_FOLDER_NAME}`;
    }

    public userHomeDirectory;
    public templateRootFolder: string;
    public templateIndexPath: string;

    private getUserHome() {
        return process.env.HOME || process.env.USERPROFILE;
    }
}
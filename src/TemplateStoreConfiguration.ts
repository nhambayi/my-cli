import { IApplicationConfiguration } from "./Interfaces";
import {INDEX_FILE_NAME} from "./Constants";

export class TemplateStoreConfiguration implements IApplicationConfiguration {

    constructor() {
        this.userHomeDirectory = this.getUserHome();
        this.templateRootFolder = `${this.userHomeDirectory}/.my-templates/`;
        this.templateIndexPath = `${this.templateRootFolder}/.template-index.json`;
    }

    public userHomeDirectory;
    public templateRootFolder: string;
    public templateIndexPath: string;

    private getUserHome() {
        return process.env.HOME || process.env.USERPROFILE;
    }
}
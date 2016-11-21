import {IApplicationConfiguration} from "./Interfaces";

export class TemplateStoreConfiguration implements IApplicationConfiguration {
    public templateRootFolder: string;
    public templateIndexPath: string;
}
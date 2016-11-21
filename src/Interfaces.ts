
export interface ITemplateIndex {

}

export interface ITemplateStore {
    initialize(): void;
    load(): void;
    add(): void;
    update(): void;
    remove(): void;
    find(name: string, project: string): void;
}

export interface IFileStore {
    loadFile(path: string): void;
    saveFile(path: string): void;
    createFolder(path: string): void;
    deleteFile(path: string): void;
    fileExists(path: string): boolean;
}

export interface IApplicationConfiguration {
    templateRootFolder: string;
    templateIndexPath: string;
}

export interface ITemplateIndex {

}

export interface ITemplate {
    name: string;
    id: string;
    type: string;
    extension: string;
    context: string;
}

export interface ITemplateStore {
    initialize(): Promise<void>;
    add(): void;
    update(): void;
    remove(): void;
    find(name: string, project: string): void;
    getAll(): void;
}

export interface IFileStore {
    loadFile(path: string, callback: (data: string, err: any) => void): void;
    saveFile(path: string, content: string, callback: (success: boolean, err: any) => void): void;
    createFolder(path: string, callback: (success: boolean, err: any) => void): void;
    deleteFile(path: string, callback: (success: boolean, err: any) => void): void;
    fileExists(path: string): boolean;
}

export interface IApplicationConfiguration {
    templateRootFolder: string;
    templateIndexPath: string;
}

export interface ILogger {
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

export interface ITemplateDatabase {

}
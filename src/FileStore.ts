import {IFileStore} from "./Interfaces";
import * as fs from "fs";

export class FileStore implements IFileStore {

    loadFile(path: string, callback: (data: string, err: any) => void) {
        fs.readFile(path, "utf8", (data, err) => {
            callback(err, data);
        });
    }

    saveFile(path: string, content: string, callback: (success: boolean, err: any) => void) {
        fs.watchFile(path, content, (err) => {
            callback(false, err);
        });
    }

    createFolder(path: string, callback: (success: boolean, err: any) => void) {
        fs.mkdir(path, (err) => {
            callback(false, err);
        });
    }

    deleteFile(path: string, callback: (success: boolean, err: any) => void) {
        callback(false, "not implemented");
    }

    fileExists(path: string): boolean {
        let exists = fs.existsSync(path);
        return exists;
    }

}
import {ITemplate} from "./Interfaces";

export class Template implements ITemplate {
    _id: string;
    name: string;
    extension: string;
    type: string;
    context: string;
    description: string;

    get id(): string {
        return this._id;
    }

    set id(value: string){
        this._id = value;
    }
}


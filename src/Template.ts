import {ITemplate} from "./Interfaces";

export class Template implements ITemplate {
    id: string;
    name: string;
    extension: string;
    type: string;
    context: string;
}


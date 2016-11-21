
export interface ITemplateIndex {

}

export interface ITemplateStore {
    load(): void;
    add(): void;
    update(): void;
    remove(): void;
    find(name: string, project: string): void;
}
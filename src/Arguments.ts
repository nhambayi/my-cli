export class Arguments {
    
}

export enum Command {
    List,
    Help,
    Add,
    New,
    Edit
}

export function Parse():Arguments {
    return new Arguments();
}


import {ILogger} from "./Interfaces";
import * as chalk from "chalk";

export class Logger implements ILogger {
    log(message: string): void {
        console.log(message);
    }

    warn(message: string): void {
        console.log(chalk.yellow(message));
    }

    error(message: string): void {
        console.log(chalk.red(message));
    }
}
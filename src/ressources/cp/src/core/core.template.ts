import { randomUUID } from "crypto";

export class Template {
    readonly id: string;
    readonly time: string;

    constructor() {
        this.id = randomUUID();
        this.time = new Date().toISOString();
    }
}

import { execSync, ExecSyncOptionsWithBufferEncoding } from "child_process";

interface ICmd {
    (cmd: string, opts?: ExecSyncOptionsWithBufferEncoding): unknown;
}

export default function CMD(cwd?: string): ICmd {
    return (cmd: string, opts?: ExecSyncOptionsWithBufferEncoding) => {
        execSync(cmd, { cwd, stdio: "inherit", ...opts });
    };
}

import fs from "fs";
import path from "path";
import readLine from "readline";

import CMD from "./cmd";

console.log("***", "Typescript project creator", "***");

// Input parse and declaration
const arg = process.argv[2];
const folder = arg || ".";
const projectDirPath = path.resolve(folder);
const ressources = path.resolve(path.join(__dirname, "ressources", "cp"));

const cmd = CMD(projectDirPath);

const ask = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Create new typecript project :");
console.log(projectDirPath);

separator();

// Create folder if not exist
if (!fs.existsSync(projectDirPath)) {
    console.group("Folder", projectDirPath, "does not exist");
    console.log(":::", "Create it !");
    fs.mkdirSync(projectDirPath);
    console.log(":::", "Project folder created");
    console.groupEnd();
    separator();
}

console.group("Init npm project");
cmd("npm init -y");
console.groupEnd();

separator();

console.group("Install dev dependencies");

const tsDeps = [
    "typescript",
    "ts-node-dev",
    "rimraf",
    "ttypescript",
    "tsconfig-paths",
    "typescript-transform-paths",
];
const lintDeps = [
    "prettier",
    "eslint",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint-config-prettier",
];
const testDeps = ["jest", "ts-jest"];
const typeDeps = ["@types/node", "@types/jest"];

const deps = tsDeps.concat(lintDeps).concat(testDeps).concat(typeDeps);

cmd(`npm i -D ${deps.join(" ")}`);

console.groupEnd();

separator();

console.group("Copy configuration files");
fs.cpSync(ressources, projectDirPath, {
    recursive: true,
});

console.groupEnd();

console.group("Create npm scripts");
const packageBuf = fs.readFileSync(path.join(projectDirPath, "package.json"));
const packageStr = packageBuf.toString();
const p = JSON.parse(packageStr);
const scripts = require("./ressources/scripts.json");

p.scripts = scripts;

fs.writeFileSync(
    path.join(projectDirPath, "package.json"),
    JSON.stringify(p, null, 4)
);

console.groupEnd();

separator();

console.group("Project initialized !");
ask.question("Open it (y/n) ", (answer) => {
    if (answer === "y") {
        cmd("code " + projectDirPath);
    }

    process.exit(0);
});

function separator() {
    console.log(...Array(9).fill("==="));
}

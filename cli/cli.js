"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var program = new commander_1.Command("Something");
program.name("pkrc")
    .description("pkrc cli tool (Windows package manager)")
    .version("1.0.0");
program.option("-i, --install <package>", "download a package");
program.option("-u, --update <package>", "update a package");
program.option("-r, --remove <package>", "remove a package");
program.parse(process.argv);
var opts = program.opts();
console.log(opts);

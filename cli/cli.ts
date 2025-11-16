import { Command } from "commander";
import * as nfetch from "node-fetch";

const program = new Command();

program.name("pkrc")
       .description("pkrc cli tool (Windows package manager)")
       .version("1.0.0")
    
program.option("-i, --install <package>", "download a package");
program.option("-u, --update <package>",  "update a package");
program.option("-r, --remove <package>",  "remove a package");

program.parse(process.argv);
const opts = program.opts();

function addAccount(){} // write functions

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_index_1 = require("./database.index");
var express = require("express");
var multer = require("multer");
var app = express();
var packagedb = new database_index_1.PackageDatabase();
app.use(express.json());
var upload = multer({ storage: multer.memoryStorage() });
app.get("/package/:user_name/:package_name/:package_version", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = req.params;
                console.log(inputs);
                return [4 /*yield*/, packagedb.getPackageByOwnerNameAndPackageNameAndVersion(inputs.user_name, inputs.package_name, inputs.package_version, function (thepack) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log(thepack);
                            if (!thepack.package) {
                                return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      ".concat(thepack.message, "\n    </p>\n  </div>\n</body>\n</html>\n"))];
                            }
                            else if (thepack.package.type !== "public") { // means its private
                                return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      package not found\n    </p>\n  </div>\n</body>\n</html>\n")];
                            }
                            else {
                                return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>PKRC Package Info</title>\n<style>\n  body {\n    margin: 0;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: #1e1e1e;\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  }\n\n  .card {\n    width: 500px;\n    padding: 20px;\n    border-radius: 15px;\n    background: #2b2b2b;\n    box-shadow: 0 8px 20px rgba(0,0,0,0.4);\n    display: flex;\n    flex-direction: column;\n    gap: 15px;\n    color: white;\n  }\n\n  .card h1 { margin:0; font-size:1.8rem; color:#4da6ff; }\n  .card .version { font-size:1rem; color:#80c342; font-weight:bold; }\n  .card .description { font-size:0.95rem; line-height:1.4; color:#ffff99; }\n\n  .info-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n    gap: 10px;\n  }\n\n  .info-grid div {\n    padding: 10px;\n    border-radius: 8px;\n    font-size: 0.9rem;\n    font-weight: 500;\n  }\n\n  .blue { background-color: #4da6ff30; color: #4da6ff; }\n  .green { background-color: #80c34230; color: #80c342; }\n  .yellow { background-color: #ffff9930; color: #ffff99; }\n\n</style>\n</head>\n<body>\n\n<div class=\"card\">\n  <h1 id=\"package-name\">Package Name</h1>\n  <div class=\"version\" id=\"package-version\">v0.0.0</div>\n  <div class=\"description\" id=\"package-description\">Description goes here</div>\n\n  <div class=\"info-grid\">\n    <div class=\"blue\"><strong>Owner:</strong> <span id=\"owner-name\"></span></div>\n    <div class=\"blue\"><strong>Owner ID:</strong> <span id=\"owner-id\"></span></div>\n    <div class=\"blue\"><strong>Package ID:</strong> <span id=\"package-id\"></span></div>\n\n    <div class=\"green\"><strong>Command:</strong> <span id=\"package-command\"></span></div>\n    <div class=\"green\"><strong>Type:</strong> <span id=\"package-type\"></span></div>\n    <div class=\"green\"><strong>Path:</strong> <span id=\"package-path\"></span></div>\n\n    <div class=\"yellow\"><strong>Size:</strong> <span id=\"package-size\"></span></div>\n    <div class=\"yellow\"><strong>Compressed:</strong> <span id=\"package-compressed-size\"></span></div>\n    <div class=\"yellow\"><strong>Files:</strong> <span id=\"contains-files\"></span></div>\n    <div class=\"yellow\"><strong>Released:</strong> <span id=\"released-at\"></span></div>\n  </div>\n</div>\n\n<script type=\"module\">\n  import { marked } from \"https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js\";\n\n  const thepack = {\n    owner_id: ".concat(thepack.package.owner_id, ",\n    owner_name: \"").concat(thepack.package.owner_name, "\",\n    id: \"").concat(thepack.package.id, "\",\n    size: ").concat(thepack.package.size, ",\n    compressed_size: ").concat(thepack.package.compressed_size, ",\n    contains_files: ").concat(thepack.package.contains_files, ",\n    name: \"").concat(thepack.package.name, "\",\n    command: \"").concat(thepack.package.command, "\",\n    description: \"").concat(thepack.package.description, "\",\n    type: \"public\",\n    released_at: ").concat(thepack.package.released_at, ",\n    version: \"").concat(thepack.package.version, "\",\n    path: \"").concat(thepack.package.path, "\"\n};\n\n  document.getElementById(\"package-name\").textContent = thepack.name;\n  document.getElementById(\"package-version\").textContent = \"v\" + thepack.version;\n  document.getElementById(\"package-description\").innerHTML = marked.parse(thepack.description);\n  document.getElementById(\"owner-name\").textContent = thepack.owner_name;\n  document.getElementById(\"owner-id\").textContent = thepack.owner_id;\n  document.getElementById(\"package-id\").textContent = thepack.id;\n  document.getElementById(\"package-type\").textContent = thepack.type;\n  document.getElementById(\"package-command\").textContent = thepack.command;\n  document.getElementById(\"released-at\").textContent = new Date(thepack.released_at).toLocaleString();\n  document.getElementById(\"package-size\").textContent = (thepack.size/1024).toFixed(2) + \" KB\";\n  document.getElementById(\"package-compressed-size\").textContent = (thepack.compressed_size/1024).toFixed(2) + \" KB\";\n  document.getElementById(\"contains-files\").textContent = thepack.contains_files;\n  document.getElementById(\"package-path\").textContent = thepack.path;\n</script>\n\n</body>\n</html>\n"))];
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.get("/package/:user_name/:package_name", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = req.params;
                console.log(inputs);
                return [4 /*yield*/, packagedb.getPackageByOwnerNameAndPackageName(inputs.user_name, inputs.package_name, function (thepack) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log(thepack);
                            if (!thepack.package) {
                                return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      ".concat(thepack.message, "\n    </p>\n  </div>\n</body>\n</html>\n"))];
                            }
                            else if (thepack.package.type !== "public") { // means its private
                                return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      package not found\n    </p>\n  </div>\n</body>\n</html>\n")];
                            }
                            else {
                                return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>PKRC Package Info</title>\n<style>\n  body {\n    margin: 0;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: #1e1e1e;\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  }\n\n  .card {\n    width: 500px;\n    padding: 20px;\n    border-radius: 15px;\n    background: #2b2b2b;\n    box-shadow: 0 8px 20px rgba(0,0,0,0.4);\n    display: flex;\n    flex-direction: column;\n    gap: 15px;\n    color: white;\n  }\n\n  .card h1 { margin:0; font-size:1.8rem; color:#4da6ff; }\n  .card .version { font-size:1rem; color:#80c342; font-weight:bold; }\n  .card .description { font-size:0.95rem; line-height:1.4; color:#ffff99; }\n\n  .info-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n    gap: 10px;\n  }\n\n  .info-grid div {\n    padding: 10px;\n    border-radius: 8px;\n    font-size: 0.9rem;\n    font-weight: 500;\n  }\n\n  .blue { background-color: #4da6ff30; color: #4da6ff; }\n  .green { background-color: #80c34230; color: #80c342; }\n  .yellow { background-color: #ffff9930; color: #ffff99; }\n\n</style>\n</head>\n<body>\n\n<div class=\"card\">\n  <h1 id=\"package-name\">Package Name</h1>\n  <div class=\"version\" id=\"package-version\">v0.0.0</div>\n  <div class=\"description\" id=\"package-description\">Description goes here</div>\n\n  <div class=\"info-grid\">\n    <div class=\"blue\"><strong>Owner:</strong> <span id=\"owner-name\"></span></div>\n    <div class=\"blue\"><strong>Owner ID:</strong> <span id=\"owner-id\"></span></div>\n    <div class=\"blue\"><strong>Package ID:</strong> <span id=\"package-id\"></span></div>\n\n    <div class=\"green\"><strong>Command:</strong> <span id=\"package-command\"></span></div>\n    <div class=\"green\"><strong>Type:</strong> <span id=\"package-type\"></span></div>\n    <div class=\"green\"><strong>Path:</strong> <span id=\"package-path\"></span></div>\n\n    <div class=\"yellow\"><strong>Size:</strong> <span id=\"package-size\"></span></div>\n    <div class=\"yellow\"><strong>Compressed:</strong> <span id=\"package-compressed-size\"></span></div>\n    <div class=\"yellow\"><strong>Files:</strong> <span id=\"contains-files\"></span></div>\n    <div class=\"yellow\"><strong>Released:</strong> <span id=\"released-at\"></span></div>\n  </div>\n</div>\n\n<script type=\"module\">\n  import { marked } from \"https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js\";\n\n  const thepack = {\n    owner_id: ".concat(thepack.package.owner_id, ",\n    owner_name: \"").concat(thepack.package.owner_name, "\",\n    id: \"").concat(thepack.package.id, "\",\n    size: ").concat(thepack.package.size, ",\n    compressed_size: ").concat(thepack.package.compressed_size, ",\n    contains_files: ").concat(thepack.package.contains_files, ",\n    name: \"").concat(thepack.package.name, "\",\n    command: \"").concat(thepack.package.command, "\",\n    description: \"").concat(thepack.package.description, "\",\n    type: \"public\",\n    released_at: ").concat(thepack.package.released_at, ",\n    version: \"").concat(thepack.package.version, "\",\n    path: \"").concat(thepack.package.path, "\"\n};\n\n  document.getElementById(\"package-name\").textContent = thepack.name;\n  document.getElementById(\"package-version\").textContent = \"v\" + thepack.version;\n  document.getElementById(\"package-description\").innerHTML = marked.parse(thepack.description);\n  document.getElementById(\"owner-name\").textContent = thepack.owner_name;\n  document.getElementById(\"owner-id\").textContent = thepack.owner_id;\n  document.getElementById(\"package-id\").textContent = thepack.id;\n  document.getElementById(\"package-type\").textContent = thepack.type;\n  document.getElementById(\"package-command\").textContent = thepack.command;\n  document.getElementById(\"released-at\").textContent = new Date(thepack.released_at).toLocaleString();\n  document.getElementById(\"package-size\").textContent = (thepack.size/1024).toFixed(2) + \" KB\";\n  document.getElementById(\"package-compressed-size\").textContent = (thepack.compressed_size/1024).toFixed(2) + \" KB\";\n  document.getElementById(\"contains-files\").textContent = thepack.contains_files;\n  document.getElementById(\"package-path\").textContent = thepack.path;\n</script>\n\n</body>\n</html>\n"))];
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.listen(3000, "0.0.0.0", function () {
    console.log("runned - http://127.0.0.1:3000");
});
var x = new database_index_1.UnrealPackageDatabase();
packagedb.udb.connect().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
x.connect().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
// {
//   status: true,
//   user: {
//     id: 725697481238,
//     name: 'Mmd.Programmer',
//     gmail: 'someone@gmail.com',
//     auth: '471b23fce1cdfda01eef883eabfed7d28825fbcf9b48cf0b479e7d560c31d928c761c80c2eb62427bd728baf21e1ca74802c',
//     packages: [],
//     verified: false
//   }
// }
// {
//   status: true,
//   package: {
//     command: 'yeppy',
//     compressed_size: 1000000,
//     contains_files: 60,
//     description: 'Something is *new* and Want to _cya_',
//     name: 'Yeppy-Manager',
//     path: '/package/Mmd.Programmer/Yeppy-Manager/1.0.0',
//     released_at: 1763316597639,
//     size: 49999999999999,
//     type: 'public',
//     version: '1.0.0',
//     id: '4a8a4f2f-8e78-4b4f-b4fb-927b78efbfe7',
//     owner_name: 'Mmd.Programmer',
//     owner_id: 725697481238
//   }
// }

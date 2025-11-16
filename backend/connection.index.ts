import { PackageDatabase, UserDatabase, UnrealPackageDatabase } from "./database.index";
import * as exp from "express";
import * as fs from "fs";
import * as path from "path";
import * as _multer from "multer";
import * as archiver from "archiver";
import { Package } from "./interface.package";
const express = require("express");
const multer = require("multer");

const store_packages = path.join(__dirname, "stored-packages");
const app: exp.Application = express();
const packagedb = new PackageDatabase();
app.use(express.json());
const upload: _multer.Multer = multer({ storage: multer.memoryStorage(), limits: { fileSize: 500 * 1024 * 1024 } });

if (!fs.existsSync(store_packages)){
    fs.mkdirSync(store_packages, { recursive: true });
}

// packagedb.udb.connect();
// packagedb.udb.packages.connect();

interface PackageInput {
    user_name: string;
    package_name: string;
    package_version: string;
}

interface PackageInputWithoutVersion extends Omit<PackageInput, "package_version"> {}

interface ClientInput {
    auth: string;
    name: string;
    command: string;
    description: string;
    type: "public" | "private";
    version: string;
    contains_files: number;
}

interface ClientEditInput {
    auth: string;
    package_id: string;
    description?: string;
    type?: "public" | "private";
}

interface ClientDeleteAccountInput {
    auth: string;
}

interface ClientDeletePackageInput {
    auth: string;
    package_id: string;
}

interface ClientCreateAccountInput {
    name: string;
    gmail: string;
}

app.get("/package/:user_name/:package_name/:package_version", async (req, res) => {
    const inputs: PackageInput = req.params;
    console.log(inputs)

    await packagedb.getPackageByOwnerNameAndPackageNameAndVersion(inputs.user_name, inputs.package_name, inputs.package_version, async (thepack) => {
        console.log(thepack);
        if (!thepack.package){
            return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PKRC Message Card</title>
  <style>
    /* ===== Global Styles ===== */
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1e1e1e; /* Dark background for contrast */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */
    }

    /* ===== Card Styles ===== */
    .card {
      width: 400px;
      padding: 15px;
      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
      border-left: 5px solid red;
      border-radius: 15px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .card svg {
      height: 40px;
      width: 40px;
      fill: red;
      flex-shrink: 0;
    }

    .card p {
      color: white;
      font-size: 15px;
      line-height: 1.5;
      margin: 0;
    }

    /* Optional: responsive on smaller screens */
    @media (max-width: 450px) {
      .card {
        width: 90%;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .card svg {
        margin-bottom: 10px;
      }
    }
  </style>
</head>
<body>
  <!-- Message Card -->
  <div class="card">
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
    </svg>
    <p>
      ${thepack.message}
    </p>
  </div>
</body>
</html>
`)
        } else if (thepack.package.type !== "public"){ // means its private
            return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PKRC Message Card</title>
  <style>
    /* ===== Global Styles ===== */
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1e1e1e; /* Dark background for contrast */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */
    }

    /* ===== Card Styles ===== */
    .card {
      width: 400px;
      padding: 15px;
      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
      border-left: 5px solid red;
      border-radius: 15px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .card svg {
      height: 40px;
      width: 40px;
      fill: red;
      flex-shrink: 0;
    }

    .card p {
      color: white;
      font-size: 15px;
      line-height: 1.5;
      margin: 0;
    }

    /* Optional: responsive on smaller screens */
    @media (max-width: 450px) {
      .card {
        width: 90%;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .card svg {
        margin-bottom: 10px;
      }
    }
  </style>
</head>
<body>
  <!-- Message Card -->
  <div class="card">
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
    </svg>
    <p>
      package not found
    </p>
  </div>
</body>
</html>
`)
        } else {
            return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PKRC Package Info</title>
<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1e1e1e;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .card {
    width: 500px;
    padding: 20px;
    border-radius: 15px;
    background: #2b2b2b;
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: white;
  }

  .card h1 { margin:0; font-size:1.8rem; color:#4da6ff; }
  .card .version { font-size:1rem; color:#80c342; font-weight:bold; }
  .card .description { font-size:0.95rem; line-height:1.4; color:#ffff99; }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px;
  }

  .info-grid div {
    padding: 10px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .blue { background-color: #4da6ff30; color: #4da6ff; }
  .green { background-color: #80c34230; color: #80c342; }
  .yellow { background-color: #ffff9930; color: #ffff99; }

</style>
</head>
<body>

<div class="card">
  <h1 id="package-name">Package Name</h1>
  <div class="version" id="package-version">v0.0.0</div>
  <div class="description" id="package-description">Description goes here</div>

  <div class="info-grid">
    <div class="blue"><strong>Owner:</strong> <span id="owner-name"></span></div>
    <div class="blue"><strong>Owner ID:</strong> <span id="owner-id"></span></div>
    <div class="blue"><strong>Package ID:</strong> <span id="package-id"></span></div>

    <div class="green"><strong>Command:</strong> <span id="package-command"></span></div>
    <div class="green"><strong>Type:</strong> <span id="package-type"></span></div>
    <div class="green"><strong>Path:</strong> <span id="package-path"></span></div>

    <div class="yellow"><strong>Size:</strong> <span id="package-size"></span></div>
    <div class="yellow"><strong>Compressed:</strong> <span id="package-compressed-size"></span></div>
    <div class="yellow"><strong>Files:</strong> <span id="contains-files"></span></div>
    <div class="yellow"><strong>Released:</strong> <span id="released-at"></span></div>
  </div>
</div>

<script type="module">
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

  const thepack = {
    owner_id: ${thepack.package.owner_id},
    owner_name: "${thepack.package.owner_name}",
    id: "${thepack.package.id}",
    size: ${thepack.package.size},
    compressed_size: ${thepack.package.compressed_size},
    contains_files: ${thepack.package.contains_files},
    name: "${thepack.package.name}",
    command: "${thepack.package.command}",
    description: "${thepack.package.description}",
    type: "public",
    released_at: ${thepack.package.released_at},
    version: "${thepack.package.version}",
    path: "${thepack.package.path}"
};

  document.getElementById("package-name").textContent = thepack.name;
  document.getElementById("package-version").textContent = "v" + thepack.version;
  document.getElementById("package-description").innerHTML = marked.parse(thepack.description);
  document.getElementById("owner-name").textContent = thepack.owner_name;
  document.getElementById("owner-id").textContent = thepack.owner_id;
  document.getElementById("package-id").textContent = thepack.id;
  document.getElementById("package-type").textContent = thepack.type;
  document.getElementById("package-command").textContent = thepack.command;
  document.getElementById("released-at").textContent = new Date(thepack.released_at).toLocaleString();
  document.getElementById("package-size").textContent = (thepack.size/1024).toFixed(2) + " KB";
  document.getElementById("package-compressed-size").textContent = (thepack.compressed_size/1024).toFixed(2) + " KB";
  document.getElementById("contains-files").textContent = thepack.contains_files;
  document.getElementById("package-path").textContent = thepack.path;
</script>

</body>
</html>
`)
        }
    })
})

app.get("/package/:user_name/:package_name", async (req, res) => {
    const inputs: PackageInputWithoutVersion = req.params;
    console.log(inputs)

    await packagedb.getPackageByOwnerNameAndPackageName(inputs.user_name, inputs.package_name, async (thepack) => {
        console.log(thepack);
        if (!thepack.package){
            return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PKRC Message Card</title>
  <style>
    /* ===== Global Styles ===== */
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1e1e1e; /* Dark background for contrast */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */
    }

    /* ===== Card Styles ===== */
    .card {
      width: 400px;
      padding: 15px;
      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
      border-left: 5px solid red;
      border-radius: 15px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .card svg {
      height: 40px;
      width: 40px;
      fill: red;
      flex-shrink: 0;
    }

    .card p {
      color: white;
      font-size: 15px;
      line-height: 1.5;
      margin: 0;
    }

    /* Optional: responsive on smaller screens */
    @media (max-width: 450px) {
      .card {
        width: 90%;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .card svg {
        margin-bottom: 10px;
      }
    }
  </style>
</head>
<body>
  <!-- Message Card -->
  <div class="card">
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
    </svg>
    <p>
      ${thepack.message}
    </p>
  </div>
</body>
</html>
`)
        } else if (thepack.package.type !== "public"){ // means its private
            return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PKRC Message Card</title>
  <style>
    /* ===== Global Styles ===== */
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1e1e1e; /* Dark background for contrast */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */
    }

    /* ===== Card Styles ===== */
    .card {
      width: 400px;
      padding: 15px;
      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
      border-left: 5px solid red;
      border-radius: 15px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .card svg {
      height: 40px;
      width: 40px;
      fill: red;
      flex-shrink: 0;
    }

    .card p {
      color: white;
      font-size: 15px;
      line-height: 1.5;
      margin: 0;
    }

    /* Optional: responsive on smaller screens */
    @media (max-width: 450px) {
      .card {
        width: 90%;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .card svg {
        margin-bottom: 10px;
      }
    }
  </style>
</head>
<body>
  <!-- Message Card -->
  <div class="card">
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
    </svg>
    <p>
      package not found
    </p>
  </div>
</body>
</html>
`)
        } else {
            return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PKRC Package Info</title>
<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1e1e1e;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .card {
    width: 500px;
    padding: 20px;
    border-radius: 15px;
    background: #2b2b2b;
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: white;
  }

  .card h1 { margin:0; font-size:1.8rem; color:#4da6ff; }
  .card .version { font-size:1rem; color:#80c342; font-weight:bold; }
  .card .description { font-size:0.95rem; line-height:1.4; color:#ffff99; }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px;
  }

  .info-grid div {
    padding: 10px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .blue { background-color: #4da6ff30; color: #4da6ff; }
  .green { background-color: #80c34230; color: #80c342; }
  .yellow { background-color: #ffff9930; color: #ffff99; }

</style>
</head>
<body>

<div class="card">
  <h1 id="package-name">Package Name</h1>
  <div class="version" id="package-version">v0.0.0</div>
  <div class="description" id="package-description">Description goes here</div>

  <div class="info-grid">
    <div class="blue"><strong>Owner:</strong> <span id="owner-name"></span></div>
    <div class="blue"><strong>Owner ID:</strong> <span id="owner-id"></span></div>
    <div class="blue"><strong>Package ID:</strong> <span id="package-id"></span></div>

    <div class="green"><strong>Command:</strong> <span id="package-command"></span></div>
    <div class="green"><strong>Type:</strong> <span id="package-type"></span></div>
    <div class="green"><strong>Path:</strong> <span id="package-path"></span></div>

    <div class="yellow"><strong>Size:</strong> <span id="package-size"></span></div>
    <div class="yellow"><strong>Compressed:</strong> <span id="package-compressed-size"></span></div>
    <div class="yellow"><strong>Files:</strong> <span id="contains-files"></span></div>
    <div class="yellow"><strong>Released:</strong> <span id="released-at"></span></div>
  </div>
</div>

<script type="module">
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

  const thepack = {
    owner_id: ${thepack.package.owner_id},
    owner_name: "${thepack.package.owner_name}",
    id: "${thepack.package.id}",
    size: ${thepack.package.size},
    compressed_size: ${thepack.package.compressed_size},
    contains_files: ${thepack.package.contains_files},
    name: "${thepack.package.name}",
    command: "${thepack.package.command}",
    description: "${thepack.package.description}",
    type: "public",
    released_at: ${thepack.package.released_at},
    version: "${thepack.package.version}",
    path: "${thepack.package.path}"
};

  document.getElementById("package-name").textContent = thepack.name;
  document.getElementById("package-version").textContent = "v" + thepack.version;
  document.getElementById("package-description").innerHTML = marked.parse(thepack.description);
  document.getElementById("owner-name").textContent = thepack.owner_name;
  document.getElementById("owner-id").textContent = thepack.owner_id;
  document.getElementById("package-id").textContent = thepack.id;
  document.getElementById("package-type").textContent = thepack.type;
  document.getElementById("package-command").textContent = thepack.command;
  document.getElementById("released-at").textContent = new Date(thepack.released_at).toLocaleString();
  document.getElementById("package-size").textContent = (thepack.size/1024).toFixed(2) + " KB";
  document.getElementById("package-compressed-size").textContent = (thepack.compressed_size/1024).toFixed(2) + " KB";
  document.getElementById("contains-files").textContent = thepack.contains_files;
  document.getElementById("package-path").textContent = thepack.path;
</script>

</body>
</html>
`)
        }
    })
})

app.post("/upload-package", upload.single("package"), async (req, res) => {
    const json: ClientInput = req.body;
    const file = req.file;

    if (!file){
        return res.json({ status: false, message: "no file inputted" });
    }

    if (!file.filename.endsWith(".zip")){
        return res.json({ status: false, message: "invalid file format" }); // need to be stronger
    }

    if (json.contains_files > 999999){
        return res.json({ status: false, message: "too many files" });
    }

    await packagedb.udb.getUserByAuth(json.auth, async (user) => {
        if (!user){
            return res.json({ status: false, message: "invalid auth" });
        }

        if (!fs.existsSync(path.join(store_packages, user.name))){
            await fs.promises.mkdir(path.join(store_packages, user.name), { recursive: true });
        }

        if (!fs.existsSync(path.join(store_packages, user.name, json.name))){
            await fs.promises.mkdir(path.join(store_packages, user.name, json.name), { recursive: true });
        }

        if (!fs.existsSync(path.join(store_packages, user.name, json.name, json.version))){
            await fs.promises.mkdir(path.join(store_packages, user.name, json.name, json.version), { recursive: true });
        }

        const real_store = path.join(store_packages, user.name, json.name, json.version);
        await fs.promises.rename(file.filename, real_store);
        const output = fs.createWriteStream(path.join(real_store, path.parse(file.filename).base));

        output.on("close", async () => {
            const cjson: Omit<Package, "id" | "owner_id" | "owner_name"> = {
                command: json.command,
                compressed_size: fs.statSync(path.join(real_store, path.parse(file.filename).base)).size,
                contains_files: json.contains_files,
                description: json.description,
                name: json.name,
                released_at: Date.now(),
                type: json.type,
                version: json.version,
                path: `/package/${user.name}/${json.name}`
            };
            await packagedb.pushPackage(
                json.auth,
                cjson,
                async (dt) => {
                    return res.json(dt);
                }
            )
        })
    })
})

app.post("/edit-package", async (req, res) => {
    const json: Partial<ClientEditInput> = req.body;

    if (!json.auth || !json.package_id){
        return res.json({ status: false, message: "invalid input | auth or package_id missed" });
    }

    await packagedb.editPackage(json.auth, json.package_id, { description: json.description, type: json.type }, async (dt) => {
        return res.json(dt);
    })
})

app.post("/delete-package", async (req, res) => {
    const json: Partial<ClientDeletePackageInput> = req.body;

    if (!json.auth || !json.package_id){
        return res.json({ status: false, message: "invalid input | auth or package_id missed" });
    }

    await packagedb.deletePackage(json.auth, json.package_id, async (dt) => {
        return res.json(dt);
    })
})

app.post("/delete-account", async (req, res) => {
    const json: Partial<ClientDeleteAccountInput> = req.body;

    if (!json.auth){
        return res.json({ status: false, message: "invalid input | auth missed" });
    }

    await packagedb.udb.deleteAccount(json.auth, async (dt) => {
        return res.json(dt);
    })
})

app.post("/add-account", async (req, res) => {
    const json: Partial<ClientCreateAccountInput> = req.body;

    if (!json.name || !json.gmail){
        return res.json({ status: false, message: "invalid input | name or gmail missed" });
    }

    await packagedb.udb.add(json.name, json.gmail, async (dt) => {
        return res.json(dt);
    })
})

app.post("/download-package", async (req, res) => {
    const json: { package_name: string, owner_name: string, version?: string } = req.body;

    if (json.version){
        await packagedb.getPackageByOwnerNameAndPackageNameAndVersion(json.owner_name, json.package_name, json.version, async (_pack) => {
            if (!_pack){
                return res.json({ status: false, message: "package not found" });
            }

            const store_path = path.join(store_packages, json.owner_name, json.package_name, json.version!);
            const _o = fs.readdirSync(store_path);
            if (_o.length === 0){
                return res.json({ status: false, message: "package file not found" });
            }
            res.download(path.join(store_packages, json.owner_name, json.package_name, json.version!, _o[0]));
        })
    } else {
        await packagedb.getPackageByOwnerNameAndPackageName(json.owner_name, json.package_name, async (_pack) => {
            if (!_pack){
                return res.json({ status: false, message: "package not found" });
            }

            const store_path = path.join(store_packages, json.owner_name, json.package_name, _pack.package.version);
            const _o = fs.readdirSync(store_path);
            if (_o.length === 0){
                return res.json({ status: false, message: "package file not found" });
            }
            res.download(path.join(store_packages, json.owner_name, json.package_name, _pack.package.version, _o[0]));
        })
    }
})

app.listen(3001, "0.0.0.0", () => {
    console.log("runned - http://127.0.0.1:3001");
})

//packagedb.udb.connect().then(async () => {
    
    // packagedb.udb.deleteAccount("7d514463465e0a39ad52252ef71a8a899ec326a2a587a77459da6766d72dc9e3a21c67cbb8f5cfb3081d421ab6d62460833b", async (yy) => {
    //     console.log(yy)
    // })

    // await packagedb.udb.add("Mmd.Programmer", "someone@gmail.com", async (user) => {
    //     console.log(user);
    // })

    // await packagedb.pushPackage("471b23fce1cdfda01eef883eabfed7d28825fbcf9b48cf0b479e7d560c31d928c761c80c2eb62427bd728baf21e1ca74802c", {
    //     command: "yeppy",
    //     compressed_size: 1000000,
    //     contains_files: 60,
    //     description: "Something is *new* and Want to _cya_",
    //     name: "Yeppy-Manager",
    //     path: "/package/Mmd.Programmer/Yeppy-Manager/1.0.0",
    //     released_at: Date.now(),
    //     size: 49999999999999,
    //     type: "public",
    //     version: "1.0.0"
    // }, async (e) => {
    //     console.log(e);
    // })
//})

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

import { Package } from "./interface.package";
import { randomBytes, randomUUID } from "crypto";
import { User, UserCarry } from "./interface.user";
import { micromark } from "micromark";
import { MongoClient, Db, Collection } from "mongodb";

export class UnrealPackageDatabase {
  private static instance: UnrealPackageDatabase;
  private client: MongoClient;
  private db?: Db;

  constructor(
    private uri: string = "mongodb://localhost:27017",
    private dbName: string = "PCKRCSXdb"
  ) {
    this.client = new MongoClient(this.uri);
  }

  
  public static getInstance(): UnrealPackageDatabase {
    if (!UnrealPackageDatabase.instance) {
      UnrealPackageDatabase.instance = new UnrealPackageDatabase();
    }
    return UnrealPackageDatabase.instance;
  }

  public async connect(): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log(`MongoDB connected to database: ${this.dbName}`);
    }
    return this.db;
  }

  public getDb(): Db {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }

  public collection(): Collection<any> {
    return this.getDb().collection<any>("packages");
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
    this.db = undefined;
    console.log("MongoDB connection closed");
  }

  public async getPackages(callback: (users: Package[]) => void){
    const allpackages = await this.collection().find({ }).toArray() as any[] as Package[];
    return callback(allpackages);
  }

  public async getPackageById(id: string, callback: (pack: Package | null) => void){
    await this.getPackages(async (packages) => {
        for (const pack of packages){
            if (pack.id === id){
                return callback(pack);
            }
        }

        return callback(null);
    })
  }

  public async getManyPackagesById(ids: string[], callback: (packs: Package[]) => void){
    await this.getPackages(async (packages) => {
        const found: Package[] = [];
        const most = packages.map(pack => pack.id);
        
        for (const id of ids){
            if (most.includes(id)){
                found.push(packages[most.indexOf(id)]);
            }
        }

        return callback(found);
    })
  }
}

export class UserDatabase {
  private static instance: UserDatabase;
  private client: MongoClient;
  public  packages: UnrealPackageDatabase;
  public  namePattern: RegExp;
  private db?: Db;

  constructor(
    private uri: string = "mongodb://localhost:27017",
    private dbName: string = "PCKRCSXdb"
  ) {
    this.client = new MongoClient(this.uri);
    this.packages = new UnrealPackageDatabase();
    this.namePattern = /^[a-zA-Z0-9._-]+$/;
  }

  
  public static getInstance(): UserDatabase {
    if (!UserDatabase.instance) {
      UserDatabase.instance = new UserDatabase();
    }
    return UserDatabase.instance;
  }

  public async connect(): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log(`MongoDB connected to database: ${this.dbName}`);
    }
    return this.db;
  }

  public getDb(): Db {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }

  public collection(): Collection<any> {
    return this.getDb().collection<any>("users");
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
    this.db = undefined;
    console.log("MongoDB connection closed");
  }

  public async getUsers(callback: (users: UserCarry[]) => void){
    const allusers = await this.collection().find({ }).toArray() as any[] as User[];
    const allcarryusers: UserCarry[] = [];
    for (const user of allusers){
        await this.packages.getManyPackagesById(user.packages, async (pcks) => {
            const _u = user as any;
            _u.packages = pcks;
            const userSample = _u as UserCarry;
            allcarryusers.push(userSample);
        })
    }
    return callback(allcarryusers);
  }

  public async getUserById(id: number, callback: (user: UserCarry | null) => void){
    await this.getUsers(async (users) => {
        for (const user of users){
            if (user.id === id){
                return callback(user);
            }
        }

        return callback(null);
    })
  }

  public async getUserByGmail(gmail: string, callback: (user: UserCarry | null) => void){
    await this.getUsers(async (users) => {
        for (const user of users){
            if (user.gmail === gmail){
                return callback(user);
            }
        }

        return callback(null);
    })
  }

  public async getUserByAuth(auth: string, callback: (user: UserCarry | null) => void){
    await this.getUsers(async (users) => {
        for (const user of users){
            if (user.auth === auth){
                return callback(user);
            }
        }

        return callback(null);
    })
  }

  public async getUserByName(name: string, callback: (user: UserCarry | null) => void){
    await this.getUsers(async (users) => {
        for (const user of users){
            if (user.name === name){
                return callback(user);
            }
        }

        return callback(null);
    })
  }

  public async getUserPackagesByNameFromAuth(auth: string, callback: (packs: Package[]) => void){
    await this.getUserByAuth(auth, async (user) => {
      if (!user){return callback([]);}
      await this.packages.getPackages(async (allpacks) => {
        const found_packs: Package[] = [];
        for (const pack of allpacks){
          if (pack.owner_name === user.name){
            found_packs.push(pack);
          }
        }

        return callback(found_packs);
      })
    })
  }

  public get createAuth(): string {
    return randomBytes(50).toString("hex");
  }

  public get createId(): number {
    return Math.floor(Math.random() * (999999999999 - 100000 + 1)) + 100000;
  }

  public async add(
    name: string,
    gmail: string,
    callback: (data: any) => void
  ){
    await this.getUserByGmail(gmail, async (guser) => {
        if (guser){
          return callback({ status: false, message: "gmail already exists" });
        }

        name = name.trim().normalize().replace(" ", "");
        gmail = gmail.trim().normalize();

        if (name.length > 100){
          return callback({ status: false, message: "invalid name length" });
        }

        if (name.length < 5){
          return callback({ status: false, message: "invalid name length" });
        }

        if (!this.namePattern.test(name)){
          return callback({ status: false, message: "invalid name" });
        }

        if (gmail.length > 100){
          return callback({ status: false, message: "invalid gmail length" });
        }

        if (gmail.length === 0){
          return callback({ status: false, message: "invalid gmail length" });
        }
        
        const usercontent: User = {
            id: this.createId,
            name,
            gmail,
            auth: this.createAuth,
            packages: [],
            verified: false
        }

        await this.collection().insertOne({ ...usercontent }).then(async () => {
          return callback({ status: true, user: usercontent });
        }).catch(async (e) => {
          console.error(e);
          return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
        })
    })
  }

  public async verify(auth: string, callback: (data: any) => void){
    await this.getUserByAuth(auth, async (user) => {
        if (!user){
          return callback({ status: false, message: "auth not found" });
        }

        if (user.verified === true){
          return callback({ status: false, message: "user already verified" });
        }

        await this.collection().updateOne({ auth }, { $set: { verified: true } }).then(async () => {
          user.verified = true;
          return callback({ status: true, user: user });
        }).catch(async (e) => {
          console.error(e);
          return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
        })
    })
  }

  public async unverify(auth: string, callback: (data: any) => void){
    await this.getUserByAuth(auth, async (user) => {
        if (!user){
            return callback({ status: false, message: "auth not found" });
        }

        if (user.verified === false){
            return callback({ status: false, message: "user already unverified" });
        }

        await this.collection().updateOne({ auth }, { $set: { verified: false } }).then(async () => {
            user.verified = false;
            return callback({ status: true, user: user });
        }).catch(async (e) => {
            console.error(e);
            return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
        })
    })
  }

  private async updateName(auth: string, newName: string, callback: (data: any) => void){ // better to do not use it
    await this.getUserByAuth(auth, async (user) => {
        if (!user){
            return callback({ status: false, message: "auth not found" });
        }

        newName = newName.trim().normalize().replace(" ", "");

        if (newName.length > 100 || newName.length < 5){
          return callback({ status: false, message: "invalid name length" });
        }

        if (!this.namePattern.test(newName)){
          return callback({ status: false, message: "invalid name" });
        }

        await this.collection().updateOne({ auth }, { $set: { name: newName } }).then(async () => {
          user.verified = false;
          return callback({ status: true, user: user });
        }).catch(async (e) => {
          console.error(e);
          return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
        })
    })
  }

  public async updateGmail(auth: string, newGmail: string, callback: (data: any) => void){
    await this.getUserByAuth(auth, async (user) => {
        if (!user){
            return callback({ status: false, message: "auth not found" });
        }

        newGmail = newGmail.trim().normalize();

        if (newGmail.length > 100 || newGmail.length === 0){
            return callback({ status: false, message: "invalid gmail length" });
        }

        await this.collection().updateOne({ auth }, { $set: { gmail: newGmail } }).then(async () => {
            user.verified = false;
            return callback({ status: true, user: user });
        }).catch(async (e) => {
            console.error(e);
            return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
        })
    })
  }

  public async deleteAccount(auth: string, callback: (data: any) => void){
    await this.getUserByAuth(auth, async (user) => {
        if (!user){
            return callback({ status: false, message: "auth not found" });
        }

        await this.collection().deleteOne({ auth }).then(async () => {
            user.verified = false;
            return callback({ status: true });
        }).catch(async (e) => {
            console.error(e);
            return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
        })
    })
  }
}

export class PackageDatabase {
    public udb: UserDatabase;
    private packageNameRegex: RegExp;
    
    constructor(){
      this.udb = new UserDatabase();
      this.packageNameRegex = /^[A-Za-z0-9._()\-]+$/;
      this.udb.connect();
      this.udb.packages.connect();
    }

    async isMarkdown(input: string): Promise<boolean> {
      try {
        const html = micromark(input);

        // micromark always returns HTML, but if Markdown is extremely invalid,
        // the output becomes identical to the input (raw text).
        const looksTransformed =
          html !== input && /<\/?[a-z]/i.test(html); // contains HTML tags

        // If HTML changed OR tags exist → Markdown recognized
        return looksTransformed;
      } catch (err) {
        return false;
      }
    }

    async getPackageByOwnerNameAndPackageName(owner_name: string, package_name: string, callback: (pack: any) => void){
      await this.udb.getUserByName(owner_name, async (user) => {
        if (!user){
          return callback({ status: false, message: "invalid users name" });
        }

        const _found_packs: Package[] = [];

        for (const pack of user.packages){
          if (pack.name === package_name){
            //return callback({ status: true, package: pack });
            _found_packs.push(pack);
          }
        }

        const _all_versions = _found_packs.map(pck => pck.version);
        const _late_version = getLatestVersion(_all_versions);
        if (!_late_version){
          return callback({ status: false, message: "package not found for this user" });
        } else {
          return callback({ status: false, package: _found_packs.find(pck => pck.version === _late_version)! });
        }        
      })
    }

    async getPackageByOwnerNameAndPackageNameAndVersion(owner_name: string, package_name: string, version: string, callback: (pack: any) => void){
      await this.udb.getUserByName(owner_name, async (user) => {
        if (!user){
          return callback({ status: false, message: "invalid users name" });
        }

        console.log(user)

        for (const pack of user.packages){
          if (pack.name === package_name && pack.version === version){
            return callback({ status: true, package: pack });
          }
        }

        return callback({ status: false, message: "package not found for this user" });
      })
    }

    async pushPackage(auth: string, pack: Omit<Package, "id" | "owner_name" | "owner_id">, callback: (data: any) => void){
      await this.udb.getUserByAuth(auth, async (user) => {
          if (!user){
            return callback({ status: false, message: "auth not found" });
          }

          await this.getPackageByOwnerNameAndPackageName(user.name, pack.name, async (pck) => {
            if (pck.status){
              if (pck.package.version === pack.version){
                return callback({ status: false, message: "package version is not available to use" });
              }
            }

            pack.command     = pack.command.toLowerCase();
            pack.name        = pack.name.trim().normalize();
            pack.description = pack.description.trim().normalize();
            const isMark     = await this.isMarkdown(pack.description);

            if (pack.command.includes(" ")){
              return callback({ status: false, message: "package command includes white-spaces" });
            }

            if (!this.packageNameRegex.test(pack.command)){
              return callback({ status: false, message: "package command does not contain Windows rules as an executable tool" });
            }

            if (pack.command.length > 100){
              return callback({ status: false, message: "command length is too long" });
            }

            if (!isMark){
              return callback({ status: false, message: "description is not a valid Markdown" });
            }

            if (pack.description.length > 5000){
              return callback({ status: false, message: "description length is too long" });
            }

            const _pack: Package = { ...pack, id: randomUUID(), owner_name: user.name, owner_id: user.id };
            const _packs: string[] = user.packages.map(__pack => __pack.id);

            await this.udb.packages.collection().insertOne({ ..._pack }).then(async () => {
              _packs.push(_pack.id);
              await this.udb.collection().updateOne({ id: user.id }, { $set: { packages: _packs } }).then(async () => {
                return callback({ status: true, package: _pack });
              }).catch(async (e) => {
                console.error(e);
                return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
              })
            }).catch(async (e) => {
              console.error(e);
              return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
            })
          })
      })
    }

    async editPackage(auth: string, pack_id: string, pack: { description?: string, type?: "public" | "private" }, callback: (data: any) => void){
      await this.udb.getUserByAuth(auth, async (theuser) => {
        if (!theuser){
          return callback({ status: false, message: "auth not found" });
        }

        pack.description = pack.description ?? "";
        pack.description = pack.description.trim().normalize();
        const isMark     = await this.isMarkdown(pack.description);

        if (!isMark){
          return callback({ status: false, message: "description is not a valid Markdown" });
        }

        if (pack.description.length > 5000){
          return callback({ status: false, message: "description length is too long" });
        }

        await this.udb.packages.getPackageById(pack_id, async (_pack) => {
          if (!_pack){
            return callback({ status: false, message: "package not found" });
          }

          pack.type = pack.type ?? _pack.type

          const _updated_package: Package = { ..._pack, ...pack };

          await this.udb.packages.collection().updateOne({ id: _pack.id }, { $set: { ..._updated_package } }).then(async () => {
            return callback({ status: true, package: _updated_package });
          }).catch(async (e) => {
            console.error(e);
            return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
          })
        })
      })
    }

    async deletePackage(auth: string, pack_id: string, callback: (data: any) => void){
      await this.udb.getUserByAuth(auth, async (theuser) => {
        if (!theuser){
          return callback({ status: false, message: "auth not found" });
        }

        await this.udb.packages.getPackageById(pack_id, async (_pack) => {
          if (!_pack){
            return callback({ status: false, message: "package not found" });
          }

          const _packs: string[] = theuser.packages.map(pcks => pcks.id);

          if (_packs.includes(_pack.id)){
            _packs.splice(_packs.indexOf(_pack.id));
          } else {
            return callback({ status: false, message: "package is not in users storage" });
          }

          await this.udb.packages.collection().deleteOne({ id: _pack.id }).then(async () => {
            await this.udb.collection().updateOne({ id: theuser.id }, { $set: { packages: _packs } }).then(async () => {
              return callback({ status: true });
            }).catch(async (e) => {
              console.error(e);
              return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
            })
          }).catch(async (e) => {
            console.error(e);
            return callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e });
          })
        })
      })
    }
}

function getLatestVersion(versions: string[]): string {
  return versions.sort((a, b) => {
    const aParts = a.split('.').map(Number);
    const bParts = b.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
      if (aParts[i] > bParts[i]) return -1; // a is newer
      if (aParts[i] < bParts[i]) return 1;  // b is newer
    }
    return 0; // equal
  })[0];
}
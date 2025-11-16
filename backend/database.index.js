"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.PackageDatabase = exports.UserDatabase = exports.UnrealPackageDatabase = void 0;
var crypto_1 = require("crypto");
var micromark_1 = require("micromark");
var mongodb_1 = require("mongodb");
var UnrealPackageDatabase = /** @class */ (function () {
    function UnrealPackageDatabase(uri, dbName) {
        if (uri === void 0) { uri = "mongodb://localhost:27017"; }
        if (dbName === void 0) { dbName = "PCKRCSXdb"; }
        this.uri = uri;
        this.dbName = dbName;
        this.client = new mongodb_1.MongoClient(this.uri);
    }
    UnrealPackageDatabase.getInstance = function () {
        if (!UnrealPackageDatabase.instance) {
            UnrealPackageDatabase.instance = new UnrealPackageDatabase();
        }
        return UnrealPackageDatabase.instance;
    };
    UnrealPackageDatabase.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.db) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        this.db = this.client.db(this.dbName);
                        console.log("MongoDB connected to database: ".concat(this.dbName));
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.db];
                }
            });
        });
    };
    UnrealPackageDatabase.prototype.getDb = function () {
        if (!this.db) {
            throw new Error("Database not connected. Call connect() first.");
        }
        return this.db;
    };
    UnrealPackageDatabase.prototype.collection = function () {
        return this.getDb().collection("packages");
    };
    UnrealPackageDatabase.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.close()];
                    case 1:
                        _a.sent();
                        this.db = undefined;
                        console.log("MongoDB connection closed");
                        return [2 /*return*/];
                }
            });
        });
    };
    UnrealPackageDatabase.prototype.getPackages = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var allpackages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection().find({}).toArray()];
                    case 1:
                        allpackages = _a.sent();
                        return [2 /*return*/, callback(allpackages)];
                }
            });
        });
    };
    UnrealPackageDatabase.prototype.getPackageById = function (id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPackages(function (packages) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, packages_1, pack;
                            return __generator(this, function (_a) {
                                for (_i = 0, packages_1 = packages; _i < packages_1.length; _i++) {
                                    pack = packages_1[_i];
                                    if (pack.id === id) {
                                        return [2 /*return*/, callback(pack)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UnrealPackageDatabase.prototype.getManyPackagesById = function (ids, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPackages(function (packages) { return __awaiter(_this, void 0, void 0, function () {
                            var found, most, _i, ids_1, id;
                            return __generator(this, function (_a) {
                                found = [];
                                most = packages.map(function (pack) { return pack.id; });
                                for (_i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                                    id = ids_1[_i];
                                    if (most.includes(id)) {
                                        found.push(packages[most.indexOf(id)]);
                                    }
                                }
                                return [2 /*return*/, callback(found)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UnrealPackageDatabase;
}());
exports.UnrealPackageDatabase = UnrealPackageDatabase;
var UserDatabase = /** @class */ (function () {
    function UserDatabase(uri, dbName) {
        if (uri === void 0) { uri = "mongodb://localhost:27017"; }
        if (dbName === void 0) { dbName = "PCKRCSXdb"; }
        this.uri = uri;
        this.dbName = dbName;
        this.client = new mongodb_1.MongoClient(this.uri);
        this.packages = new UnrealPackageDatabase();
        this.namePattern = /^[a-zA-Z0-9._-]+$/;
    }
    UserDatabase.getInstance = function () {
        if (!UserDatabase.instance) {
            UserDatabase.instance = new UserDatabase();
        }
        return UserDatabase.instance;
    };
    UserDatabase.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.db) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        this.db = this.client.db(this.dbName);
                        console.log("MongoDB connected to database: ".concat(this.dbName));
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.db];
                }
            });
        });
    };
    UserDatabase.prototype.getDb = function () {
        if (!this.db) {
            throw new Error("Database not connected. Call connect() first.");
        }
        return this.db;
    };
    UserDatabase.prototype.collection = function () {
        return this.getDb().collection("users");
    };
    UserDatabase.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.close()];
                    case 1:
                        _a.sent();
                        this.db = undefined;
                        console.log("MongoDB connection closed");
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.getUsers = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var allusers, allcarryusers, _loop_1, this_1, _i, allusers_1, user;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection().find({}).toArray()];
                    case 1:
                        allusers = _a.sent();
                        allcarryusers = [];
                        _loop_1 = function (user) {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this_1.packages.getManyPackagesById(user.packages, function (pcks) { return __awaiter(_this, void 0, void 0, function () {
                                            var _u, userSample;
                                            return __generator(this, function (_a) {
                                                _u = user;
                                                _u.packages = pcks;
                                                userSample = _u;
                                                allcarryusers.push(userSample);
                                                return [2 /*return*/];
                                            });
                                        }); })];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, allusers_1 = allusers;
                        _a.label = 2;
                    case 2:
                        if (!(_i < allusers_1.length)) return [3 /*break*/, 5];
                        user = allusers_1[_i];
                        return [5 /*yield**/, _loop_1(user)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, callback(allcarryusers)];
                }
            });
        });
    };
    UserDatabase.prototype.getUserById = function (id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsers(function (users) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, users_1, user;
                            return __generator(this, function (_a) {
                                for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                                    user = users_1[_i];
                                    if (user.id === id) {
                                        return [2 /*return*/, callback(user)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.getUserByGmail = function (gmail, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsers(function (users) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, users_2, user;
                            return __generator(this, function (_a) {
                                for (_i = 0, users_2 = users; _i < users_2.length; _i++) {
                                    user = users_2[_i];
                                    if (user.gmail === gmail) {
                                        return [2 /*return*/, callback(user)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.getUserByAuth = function (auth, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsers(function (users) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, users_3, user;
                            return __generator(this, function (_a) {
                                for (_i = 0, users_3 = users; _i < users_3.length; _i++) {
                                    user = users_3[_i];
                                    if (user.auth === auth) {
                                        return [2 /*return*/, callback(user)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.getUserByName = function (name, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsers(function (users) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, users_4, user;
                            return __generator(this, function (_a) {
                                for (_i = 0, users_4 = users; _i < users_4.length; _i++) {
                                    user = users_4[_i];
                                    if (user.name === name) {
                                        return [2 /*return*/, callback(user)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.getUserPackagesByNameFromAuth = function (auth, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByAuth(auth, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, callback([])];
                                        }
                                        return [4 /*yield*/, this.packages.getPackages(function (allpacks) { return __awaiter(_this, void 0, void 0, function () {
                                                var found_packs, _i, allpacks_1, pack;
                                                return __generator(this, function (_a) {
                                                    found_packs = [];
                                                    for (_i = 0, allpacks_1 = allpacks; _i < allpacks_1.length; _i++) {
                                                        pack = allpacks_1[_i];
                                                        if (pack.owner_name === user.name) {
                                                            found_packs.push(pack);
                                                        }
                                                    }
                                                    return [2 /*return*/, callback(found_packs)];
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(UserDatabase.prototype, "createAuth", {
        get: function () {
            return (0, crypto_1.randomBytes)(50).toString("hex");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserDatabase.prototype, "createId", {
        get: function () {
            return Math.floor(Math.random() * (999999999999 - 100000 + 1)) + 100000;
        },
        enumerable: false,
        configurable: true
    });
    UserDatabase.prototype.add = function (name, gmail, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByGmail(gmail, function (guser) { return __awaiter(_this, void 0, void 0, function () {
                            var usercontent;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (guser) {
                                            return [2 /*return*/, callback({ status: false, message: "gmail already exists" })];
                                        }
                                        name = name.trim().normalize().replace(" ", "");
                                        gmail = gmail.trim().normalize();
                                        if (name.length > 100) {
                                            return [2 /*return*/, callback({ status: false, message: "invalid name length" })];
                                        }
                                        if (name.length < 5) {
                                            return [2 /*return*/, callback({ status: false, message: "invalid name length" })];
                                        }
                                        if (!this.namePattern.test(name)) {
                                            return [2 /*return*/, callback({ status: false, message: "invalid name" })];
                                        }
                                        if (gmail.length > 100) {
                                            return [2 /*return*/, callback({ status: false, message: "invalid gmail length" })];
                                        }
                                        if (gmail.length === 0) {
                                            return [2 /*return*/, callback({ status: false, message: "invalid gmail length" })];
                                        }
                                        usercontent = {
                                            id: this.createId,
                                            name: name,
                                            gmail: gmail,
                                            auth: this.createAuth,
                                            packages: [],
                                            verified: false
                                        };
                                        return [4 /*yield*/, this.collection().insertOne(__assign({}, usercontent)).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    return [2 /*return*/, callback({ status: true, user: usercontent })];
                                                });
                                            }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    console.error(e);
                                                    return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.verify = function (auth, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByAuth(auth, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, callback({ status: false, message: "auth not found" })];
                                        }
                                        if (user.verified === true) {
                                            return [2 /*return*/, callback({ status: false, message: "user already verified" })];
                                        }
                                        return [4 /*yield*/, this.collection().updateOne({ auth: auth }, { $set: { verified: true } }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    user.verified = true;
                                                    return [2 /*return*/, callback({ status: true, user: user })];
                                                });
                                            }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    console.error(e);
                                                    return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.unverify = function (auth, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByAuth(auth, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, callback({ status: false, message: "auth not found" })];
                                        }
                                        if (user.verified === false) {
                                            return [2 /*return*/, callback({ status: false, message: "user already unverified" })];
                                        }
                                        return [4 /*yield*/, this.collection().updateOne({ auth: auth }, { $set: { verified: false } }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    user.verified = false;
                                                    return [2 /*return*/, callback({ status: true, user: user })];
                                                });
                                            }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    console.error(e);
                                                    return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.updateName = function (auth, newName, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: // better to do not use it
                    return [4 /*yield*/, this.getUserByAuth(auth, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, callback({ status: false, message: "auth not found" })];
                                        }
                                        newName = newName.trim().normalize().replace(" ", "");
                                        if (newName.length > 100 || newName.length < 5) {
                                            return [2 /*return*/, callback({ status: false, message: "invalid name length" })];
                                        }
                                        if (!this.namePattern.test(newName)) {
                                            return [2 /*return*/, callback({ status: false, message: "invalid name" })];
                                        }
                                        return [4 /*yield*/, this.collection().updateOne({ auth: auth }, { $set: { name: newName } }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    user.verified = false;
                                                    return [2 /*return*/, callback({ status: true, user: user })];
                                                });
                                            }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    console.error(e);
                                                    return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.updateGmail = function (auth, newGmail, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByAuth(auth, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, callback({ status: false, message: "auth not found" })];
                                        }
                                        newGmail = newGmail.trim().normalize();
                                        if (newGmail.length > 100 || newGmail.length === 0) {
                                            return [2 /*return*/, callback({ status: false, message: "invalid gmail length" })];
                                        }
                                        return [4 /*yield*/, this.collection().updateOne({ auth: auth }, { $set: { gmail: newGmail } }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    user.verified = false;
                                                    return [2 /*return*/, callback({ status: true, user: user })];
                                                });
                                            }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    console.error(e);
                                                    return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.deleteAccount = function (auth, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByAuth(auth, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, callback({ status: false, message: "auth not found" })];
                                        }
                                        return [4 /*yield*/, this.collection().deleteOne({ auth: auth }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    user.verified = false;
                                                    return [2 /*return*/, callback({ status: true })];
                                                });
                                            }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    console.error(e);
                                                    return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserDatabase;
}());
exports.UserDatabase = UserDatabase;
var PackageDatabase = /** @class */ (function () {
    function PackageDatabase() {
        this.udb = new UserDatabase();
        this.packageNameRegex = /^[A-Za-z0-9._()\-]+$/;
        this.udb.connect();
        this.udb.packages.connect();
    }
    PackageDatabase.prototype.isMarkdown = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var html, looksTransformed;
            return __generator(this, function (_a) {
                try {
                    html = (0, micromark_1.micromark)(input);
                    looksTransformed = html !== input && /<\/?[a-z]/i.test(html);
                    // If HTML changed OR tags exist → Markdown recognized
                    return [2 /*return*/, looksTransformed];
                }
                catch (err) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    PackageDatabase.prototype.getPackageByOwnerNameAndPackageName = function (owner_name, package_name, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.udb.getUserByName(owner_name, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _found_packs, _i, _a, pack, _all_versions, _late_version;
                            return __generator(this, function (_b) {
                                if (!user) {
                                    return [2 /*return*/, callback({ status: false, message: "invalid users name" })];
                                }
                                _found_packs = [];
                                for (_i = 0, _a = user.packages; _i < _a.length; _i++) {
                                    pack = _a[_i];
                                    if (pack.name === package_name) {
                                        //return callback({ status: true, package: pack });
                                        _found_packs.push(pack);
                                    }
                                }
                                _all_versions = _found_packs.map(function (pck) { return pck.version; });
                                _late_version = getLatestVersion(_all_versions);
                                if (!_late_version) {
                                    return [2 /*return*/, callback({ status: false, message: "package not found for this user" })];
                                }
                                else {
                                    return [2 /*return*/, callback({ status: false, package: _found_packs.find(function (pck) { return pck.version === _late_version; }) })];
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PackageDatabase.prototype.getPackageByOwnerNameAndPackageNameAndVersion = function (owner_name, package_name, version, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.udb.getUserByName(owner_name, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, _a, pack;
                            return __generator(this, function (_b) {
                                if (!user) {
                                    return [2 /*return*/, callback({ status: false, message: "invalid users name" })];
                                }
                                console.log(user);
                                for (_i = 0, _a = user.packages; _i < _a.length; _i++) {
                                    pack = _a[_i];
                                    if (pack.name === package_name && pack.version === version) {
                                        return [2 /*return*/, callback({ status: true, package: pack })];
                                    }
                                }
                                return [2 /*return*/, callback({ status: false, message: "package not found for this user" })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PackageDatabase.prototype.pushPackage = function (auth, pack, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.udb.getUserByAuth(auth, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, callback({ status: false, message: "auth not found" })];
                                        }
                                        return [4 /*yield*/, this.getPackageByOwnerNameAndPackageName(user.name, pack.name, function (pck) { return __awaiter(_this, void 0, void 0, function () {
                                                var isMark, _pack, _packs;
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (pck.status) {
                                                                if (pck.package.version === pack.version) {
                                                                    return [2 /*return*/, callback({ status: false, message: "package version is not available to use" })];
                                                                }
                                                            }
                                                            pack.command = pack.command.toLowerCase();
                                                            pack.name = pack.name.trim().normalize();
                                                            pack.description = pack.description.trim().normalize();
                                                            return [4 /*yield*/, this.isMarkdown(pack.description)];
                                                        case 1:
                                                            isMark = _a.sent();
                                                            if (pack.command.includes(" ")) {
                                                                return [2 /*return*/, callback({ status: false, message: "package command includes white-spaces" })];
                                                            }
                                                            if (!this.packageNameRegex.test(pack.command)) {
                                                                return [2 /*return*/, callback({ status: false, message: "package command does not contain Windows rules as an executable tool" })];
                                                            }
                                                            if (pack.command.length > 100) {
                                                                return [2 /*return*/, callback({ status: false, message: "command length is too long" })];
                                                            }
                                                            if (!isMark) {
                                                                return [2 /*return*/, callback({ status: false, message: "description is not a valid Markdown" })];
                                                            }
                                                            if (pack.description.length > 5000) {
                                                                return [2 /*return*/, callback({ status: false, message: "description length is too long" })];
                                                            }
                                                            _pack = __assign(__assign({}, pack), { id: (0, crypto_1.randomUUID)(), owner_name: user.name, owner_id: user.id });
                                                            _packs = user.packages.map(function (__pack) { return __pack.id; });
                                                            return [4 /*yield*/, this.udb.packages.collection().insertOne(__assign({}, _pack)).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                    var _this = this;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                _packs.push(_pack.id);
                                                                                return [4 /*yield*/, this.udb.collection().updateOne({ id: user.id }, { $set: { packages: _packs } }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                                        return __generator(this, function (_a) {
                                                                                            return [2 /*return*/, callback({ status: true, package: _pack })];
                                                                                        });
                                                                                    }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                                                        return __generator(this, function (_a) {
                                                                                            console.error(e);
                                                                                            return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                                                        });
                                                                                    }); })];
                                                                            case 1:
                                                                                _a.sent();
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        console.error(e);
                                                                        return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                                    });
                                                                }); })];
                                                        case 2:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PackageDatabase.prototype.editPackage = function (auth, pack_id, pack, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.udb.getUserByAuth(auth, function (theuser) { return __awaiter(_this, void 0, void 0, function () {
                            var isMark;
                            var _this = this;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!theuser) {
                                            return [2 /*return*/, callback({ status: false, message: "auth not found" })];
                                        }
                                        pack.description = (_a = pack.description) !== null && _a !== void 0 ? _a : "";
                                        pack.description = pack.description.trim().normalize();
                                        return [4 /*yield*/, this.isMarkdown(pack.description)];
                                    case 1:
                                        isMark = _b.sent();
                                        if (!isMark) {
                                            return [2 /*return*/, callback({ status: false, message: "description is not a valid Markdown" })];
                                        }
                                        if (pack.description.length > 5000) {
                                            return [2 /*return*/, callback({ status: false, message: "description length is too long" })];
                                        }
                                        return [4 /*yield*/, this.udb.packages.getPackageById(pack_id, function (_pack) { return __awaiter(_this, void 0, void 0, function () {
                                                var _updated_package;
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!_pack) {
                                                                return [2 /*return*/, callback({ status: false, message: "package not found" })];
                                                            }
                                                            _updated_package = __assign(__assign({}, _pack), pack);
                                                            return [4 /*yield*/, this.udb.packages.collection().updateOne({ id: _pack.id }, { $set: __assign({}, _updated_package) }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        return [2 /*return*/, callback({ status: true, package: _updated_package })];
                                                                    });
                                                                }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        console.error(e);
                                                                        return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                                    });
                                                                }); })];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PackageDatabase.prototype.deletePackage = function (auth, pack_id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.udb.getUserByAuth(auth, function (theuser) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!theuser) {
                                            return [2 /*return*/, callback({ status: false, message: "auth not found" })];
                                        }
                                        return [4 /*yield*/, this.udb.packages.getPackageById(pack_id, function (_pack) { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!_pack) {
                                                                return [2 /*return*/, callback({ status: false, message: "package not found" })];
                                                            }
                                                            return [4 /*yield*/, this.udb.packages.collection().deleteOne({ id: _pack.id }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        return [2 /*return*/, callback({ status: true })];
                                                                    });
                                                                }); }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        console.error(e);
                                                                        return [2 /*return*/, callback({ status: false, message: "local server error", error: e instanceof Error ? e.message : e })];
                                                                    });
                                                                }); })];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PackageDatabase;
}());
exports.PackageDatabase = PackageDatabase;
function getLatestVersion(versions) {
    return versions.sort(function (a, b) {
        var aParts = a.split('.').map(Number);
        var bParts = b.split('.').map(Number);
        for (var i = 0; i < 3; i++) {
            if (aParts[i] > bParts[i])
                return -1; // a is newer
            if (aParts[i] < bParts[i])
                return 1; // b is newer
        }
        return 0; // equal
    })[0];
}

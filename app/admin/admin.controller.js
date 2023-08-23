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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_service_1 = __importDefault(require("./admin.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin = new admin_service_1.default();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        const salt = parseInt(process.env.SALT_PASS || "10");
        const hashedPw = yield bcrypt_1.default.hash(password, salt);
        const id = Math.floor(Math.random() * 90000000) + 10000000;
        if (name !== undefined && password !== undefined) {
            const createdAdmin = yield admin.createNewAdmin({
                login_id: id.toString(),
                name,
                password: hashedPw,
            });
            return res.json({
                meta: {
                    success: true,
                    message: "success",
                    devMessage: createdAdmin,
                },
            });
        }
        else {
            return res.json({
                meta: {
                    success: false,
                    message: "fields-required",
                    devMessage: "fields-required",
                },
            });
        }
    }
    catch (err) {
        return res.json({
            meta: {
                success: false,
                message: "internal-server-error",
                devMessage: err,
            },
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, name } = req.body;
        if (password !== undefined && name !== undefined) {
            const existingAdmin = yield admin.findAdmin(name);
            if (existingAdmin) {
                const checkPassword = bcrypt_1.default.compareSync(password, existingAdmin.password);
                if (checkPassword) {
                    const token = jsonwebtoken_1.default.sign({
                        data: { id: existingAdmin.login_id, status: "admin" },
                    }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
                    yield admin.updateAdmin(existingAdmin.login_id, {
                        token: token,
                    });
                    return res.json({
                        meta: {
                            success: true,
                            message: "success",
                            devMessage: "admin-login",
                        },
                        body: {
                            token,
                            admin: {
                                login_id: existingAdmin.login_id,
                                name: existingAdmin.name,
                            },
                        },
                    });
                }
                else {
                    return res.json({
                        meta: {
                            success: false,
                            message: "wrong password",
                            devMessage: "admin-login-failed",
                        },
                        body: "",
                    });
                }
            }
            else {
                return res.json({
                    meta: {
                        success: false,
                        message: "admin not exist!",
                        devMessage: "",
                    },
                });
            }
        }
        else {
            return res.json({
                meta: {
                    success: false,
                    message: "fields-required",
                    devMessage: "",
                },
            });
        }
    }
    catch (err) {
        return res.json({
            meta: {
                success: false,
                message: "internal-server-error",
                devMessage: err,
            },
        });
    }
});
exports.login = login;

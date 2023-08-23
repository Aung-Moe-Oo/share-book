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
exports.deleteUserByAdmin = exports.updateUserByAdmin = exports.fetchAllUsers = exports.editUserById = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_service_1 = __importDefault(require("./users.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user = new users_service_1.default();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, email, password } = req.body;
        const salt = parseInt(process.env.SALT_PASS || "10");
        const hashedPw = yield bcrypt_1.default.hash(password, salt);
        if (user_name !== undefined &&
            email !== undefined &&
            password !== undefined) {
            const createdUser = yield user.createNewUser({
                user_name,
                email,
                password: hashedPw,
            });
            return res.json({
                meta: {
                    success: true,
                    message: "success",
                    devMessage: createdUser,
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
        const { password, email } = req.body;
        if (password !== undefined && email !== undefined) {
            const existingUser = yield user.findUser(email);
            if (existingUser) {
                const checkPassword = bcrypt_1.default.compareSync(password, existingUser.password);
                if (checkPassword) {
                    const token = jsonwebtoken_1.default.sign({
                        data: { id: existingUser.user_id, status: "verified" },
                    }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
                    yield user.updateUser(existingUser.user_id, {
                        token: token,
                        status: "verified",
                    });
                    return res.json({
                        meta: {
                            success: true,
                            message: "success",
                            devMessage: "user-login",
                        },
                        body: {
                            token,
                            user: {
                                user_id: existingUser.user_id,
                                user_name: existingUser.user_name,
                                email: existingUser.email,
                            },
                        },
                    });
                }
                else {
                    return res.json({
                        meta: {
                            success: false,
                            message: "wrong password",
                            devMessage: "user-login-failed",
                        },
                        body: "",
                    });
                }
            }
            else {
                return res.json({
                    meta: {
                        success: false,
                        message: "user not exist!",
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
const editUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { user_name, bio } = req.body;
    try {
        const updatedUser = yield user.updateUser(id, {
            user_name,
            bio,
        });
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: updatedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            meta: {
                success: false,
                message: "internal server error",
            },
            body: err,
        });
    }
});
exports.editUserById = editUserById;
// ----------------User Management By Admin----------------------
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user
        .getAllUsers()
        .then((userList) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: userList,
        });
    })
        .catch((err) => {
        res.status(500).json({
            meta: {
                success: false,
                message: "internal server error",
            },
            body: err,
        });
    });
});
exports.fetchAllUsers = fetchAllUsers;
const updateUserByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status, user_type } = req.body;
    try {
        const updatedUser = yield user.updateUser(id, {
            status,
            user_type,
            updated_by: {
                connect: {
                    login_id: req.admin.id,
                },
            },
        });
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: updatedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            meta: {
                success: false,
                message: "internal server error",
            },
            body: err,
        });
    }
});
exports.updateUserByAdmin = updateUserByAdmin;
const deleteUserByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedUser = yield user.deleteUser(id);
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: deletedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            meta: {
                success: false,
                message: "internal server error",
            },
            body: err,
        });
    }
});
exports.deleteUserByAdmin = deleteUserByAdmin;

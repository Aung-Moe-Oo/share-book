"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAllToken = exports.VerifyAdminToken = exports.VerifyUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const VerifyUserToken = (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, secret, (err, user) => {
            if (err) {
                res.status(401).json({
                    meta: {
                        success: false,
                        message: "invalid-token",
                    },
                });
            }
            req.user = user.data;
            if (req.user.status === "verified") {
                next();
            }
            else {
                res.status(403).json({
                    meta: {
                        success: false,
                        message: "forbidden",
                    },
                });
            }
        });
    }
    else {
        res.status(401).json({
            meta: {
                success: false,
                message: "invalid-token",
            },
        });
    }
};
exports.VerifyUserToken = VerifyUserToken;
const VerifyAdminToken = (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, secret, (err, admin) => {
            if (err) {
                return res.status(401).json({
                    meta: {
                        success: false,
                        message: "invalid-token",
                    },
                });
            }
            req.admin = admin.data;
            if (req.admin.status === "admin") {
                next();
            }
            else {
                res.status(403).json({
                    meta: {
                        success: false,
                        message: "forbidden",
                    },
                });
            }
        });
    }
    else {
        res.status(401).json({
            meta: {
                success: false,
                message: "invalid-token",
            },
        });
    }
};
exports.VerifyAdminToken = VerifyAdminToken;
const VerifyAllToken = (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, secret, (err, all) => {
            if (err) {
                return res.status(401).json({
                    meta: {
                        success: false,
                        message: "invalid-token",
                    },
                });
            }
            req.user = all.data;
            next();
        });
    }
    else {
        res.status(401).json({
            meta: {
                success: false,
                message: "invalid-token",
            },
        });
    }
};
exports.VerifyAllToken = VerifyAllToken;

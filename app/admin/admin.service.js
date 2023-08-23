"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const { admin } = new client_1.PrismaClient();
class Admin {
    constructor() { }
    createNewAdmin(props) {
        return admin.create({ data: props });
    }
    findAdmin(name) {
        return admin.findFirst({ where: { name } });
    }
    updateAdmin(login_id, props) {
        return admin.update({ where: { login_id }, data: props });
    }
}
exports.default = Admin;

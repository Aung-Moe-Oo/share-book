"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const { user } = new client_1.PrismaClient();
class User {
    constructor() { }
    createNewUser(props) {
        return user.create({ data: props });
    }
    getAllUsers() {
        return user.findMany();
    }
    findUser(email) {
        return user.findUnique({ where: { email } });
    }
    updateUser(user_id, props) {
        return user.update({ where: { user_id }, data: props });
    }
    deleteUser(user_id) {
        return user.delete({ where: { user_id } });
    }
}
exports.default = User;

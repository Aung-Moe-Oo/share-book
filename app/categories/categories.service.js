"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const { category } = new client_1.PrismaClient();
class Category {
    constructor() { }
    get() {
        return category.findMany({
            orderBy: {
                category_id: "desc",
            },
        });
    }
    getByCategoryId(category_id) {
        return category.findFirst({
            where: { category_id },
            orderBy: {
                category_id: "desc",
            },
        });
    }
    create(props) {
        return category.create({ data: props });
    }
    update(category_id, props) {
        return category.update({
            where: {
                category_id,
            },
            data: props,
        });
    }
    delete(category_id) {
        return category.delete({
            where: {
                category_id,
            },
        });
    }
}
exports.default = Category;

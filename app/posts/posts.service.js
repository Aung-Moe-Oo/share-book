"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const { post } = new client_1.PrismaClient();
class Post {
    constructor() { }
    get() {
        return post.findMany({
            orderBy: {
                post_id: "desc",
            },
            include: {
                created_by: {
                    select: {
                        user_name: true,
                        email: true,
                    },
                },
                category: true,
                reported_user_ids: true,
            },
        });
    }
    getPublishedPost() {
        return post.findMany({
            where: { status: "published" },
            orderBy: {
                post_id: "desc",
            },
            include: {
                created_by: {
                    select: {
                        user_name: true,
                        email: true,
                    },
                },
                category: true,
                reported_user_ids: true,
            },
        });
    }
    getByPostId(post_id) {
        return post.findFirst({
            where: { post_id },
            include: {
                created_by: {
                    select: {
                        user_name: true,
                        email: true,
                    },
                },
                category: true,
                reported_user_ids: true,
            },
        });
    }
    create(props) {
        return post.create({ data: props });
    }
    update(post_id, props) {
        return post.update({
            where: {
                post_id,
            },
            data: props,
        });
    }
    delete(post_id) {
        return post.delete({
            where: {
                post_id,
            },
        });
    }
}
exports.default = Post;

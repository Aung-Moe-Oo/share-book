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
exports.deletePost = exports.updatePostByAdmin = exports.updatePostByUser = exports.createPost = exports.fetchPostById = exports.fetchPublishedPosts = exports.fetchAllPosts = void 0;
const posts_service_1 = __importDefault(require("./posts.service"));
const client_1 = require("@prisma/client");
var PostStatusEnum;
(function (PostStatusEnum) {
    PostStatusEnum["PUBLISHED"] = "published";
    PostStatusEnum["DRAFT"] = "draft";
})(PostStatusEnum || (PostStatusEnum = {}));
const fetchAllPosts = (req, res) => {
    const post = new posts_service_1.default();
    post
        .get()
        .then((postList) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: postList,
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
};
exports.fetchAllPosts = fetchAllPosts;
const fetchPublishedPosts = (req, res) => {
    const post = new posts_service_1.default();
    post
        .getPublishedPost()
        .then((postList) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: postList,
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
};
exports.fetchPublishedPosts = fetchPublishedPosts;
const fetchPostById = (req, res) => {
    const post = new posts_service_1.default();
    const id = req.params.id;
    post
        .getByPostId(id)
        .then((post) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: post,
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
};
exports.fetchPostById = fetchPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new posts_service_1.default();
    const { report } = new client_1.PrismaClient();
    const { title, content, status, category_id, reported_user_ids } = req.body;
    if (!Object.values(PostStatusEnum).includes(status)) {
        return res.status(400).json({
            meta: {
                success: false,
                message: "Invalid status value",
            },
        });
    }
    try {
        const newPost = yield post.create({
            title: title,
            content: content,
            created_by: {
                connect: {
                    user_id: req.user.id,
                },
            },
            status,
            category: {
                connect: {
                    category_id,
                },
            },
        });
        reported_user_ids.map((user_id) => __awaiter(void 0, void 0, void 0, function* () {
            yield report.create({
                data: {
                    reported_user_id: {
                        connect: {
                            user_id,
                        },
                    },
                    reported_post: {
                        connect: {
                            post_id: newPost.post_id,
                        },
                    },
                },
            });
        }));
        return res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: newPost,
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
exports.createPost = createPost;
const updatePostByUser = (req, res) => {
    const post = new posts_service_1.default();
    const id = req.params.id;
    const { title, content, status, category_id } = req.body;
    if (!Object.values(PostStatusEnum).includes(status)) {
        return res.status(400).json({
            meta: {
                success: false,
                message: "Invalid status value",
            },
        });
    }
    post
        .update(id, {
        title: title,
        content: content,
        status,
        category: {
            connect: {
                category_id,
            },
        },
    })
        .then((updatedPost) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: updatedPost,
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
};
exports.updatePostByUser = updatePostByUser;
const updatePostByAdmin = (req, res) => {
    const post = new posts_service_1.default();
    const id = req.params.id;
    const { title, content, status, category_id } = req.body;
    post
        .update(id, {
        title: title,
        content: content,
        status,
        category: {
            connect: {
                category_id,
            },
        },
        updated_by: {
            connect: {
                login_id: req.admin.id,
            },
        },
    })
        .then((updatedPost) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: updatedPost,
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
};
exports.updatePostByAdmin = updatePostByAdmin;
const deletePost = (req, res) => {
    const post = new posts_service_1.default();
    const id = req.params.id;
    post
        .delete(id)
        .then((deletedPost) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: deletedPost,
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
};
exports.deletePost = deletePost;

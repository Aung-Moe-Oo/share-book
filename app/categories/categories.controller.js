"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.fetchCategoryById = exports.fetchAllCategories = void 0;
const categories_service_1 = __importDefault(require("./categories.service"));
const fetchAllCategories = (req, res) => {
    const category = new categories_service_1.default();
    category
        .get()
        .then((categoryList) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: categoryList,
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
exports.fetchAllCategories = fetchAllCategories;
const fetchCategoryById = (req, res) => {
    const category = new categories_service_1.default();
    const id = req.params.id;
    category
        .getByCategoryId(id)
        .then((category) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: category,
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
exports.fetchCategoryById = fetchCategoryById;
const createCategory = (req, res) => {
    const category = new categories_service_1.default();
    const { name } = req.body;
    category
        .create({
        name,
        created_by: {
            connect: {
                user_id: req.user.id,
            },
        },
    })
        .then((newCategory) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: newCategory,
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
exports.createCategory = createCategory;
const updateCategory = (req, res) => {
    const category = new categories_service_1.default();
    const id = req.params.id;
    const { name } = req.body;
    category
        .update(id, {
        name,
    })
        .then((updatedCategory) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: updatedCategory,
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
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => {
    const category = new categories_service_1.default();
    const id = req.params.id;
    category
        .delete(id)
        .then((deletedCategory) => {
        res.status(200).json({
            meta: {
                success: true,
                message: "success",
            },
            body: deletedCategory,
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
exports.deleteCategory = deleteCategory;

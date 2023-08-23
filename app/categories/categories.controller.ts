import { Request, Response } from "express";
import Category from "./categories.service";

interface AuthRequest extends Request {
  user?: any;
  admin?: any;
}

export const fetchAllCategories = (req: Request, res: Response) => {
  const category = new Category();

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

export const fetchCategoryById = (req: Request, res: Response) => {
  const category = new Category();
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

export const createCategory = (req: AuthRequest, res: Response) => {
  const category = new Category();
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

export const updateCategory = (req: AuthRequest, res: Response) => {
  const category = new Category();
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

export const deleteCategory = (req: Request, res: Response) => {
  const category = new Category();
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

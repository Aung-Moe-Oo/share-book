import { Request, Response } from "express";
import Post from "./posts.service";
import { PrismaClient } from "@prisma/client";

interface AuthRequest extends Request {
  user?: any;
  admin?: any;
}

enum PostStatusEnum {
  PUBLISHED = "published",
  DRAFT = "draft",
}

export const fetchAllPosts = (req: Request, res: Response) => {
  const post = new Post();

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

export const fetchPublishedPosts = (req: Request, res: Response) => {
  const post = new Post();

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

export const fetchPostById = (req: Request, res: Response) => {
  const post = new Post();
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

export const createPost = async (req: AuthRequest, res: Response) => {
  const post = new Post();
  const { report } = new PrismaClient();
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
    const newPost = await post.create({
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
    reported_user_ids.map(async (user_id: string) => {
      await report.create({
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
    });
    return res.status(200).json({
      meta: {
        success: true,
        message: "success",
      },
      body: newPost,
    });
  } catch (err) {
    res.status(500).json({
      meta: {
        success: false,
        message: "internal server error",
      },
      body: err,
    });
  }
};

export const updatePostByUser = (req: AuthRequest, res: Response) => {
  const post = new Post();
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

export const updatePostByAdmin = (req: AuthRequest, res: Response) => {
  const post = new Post();
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

export const deletePost = (req: Request, res: Response) => {
  const post = new Post();
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

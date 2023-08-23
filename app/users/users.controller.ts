import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import User from "./users.service";
import bcrypt from "bcrypt";

interface AuthRequest extends Request {
  user?: any;
  admin?: any;
}

const user = new User();

export const register = async (req: Request, res: Response) => {
  try {
    const { user_name, email, password } = req.body;
    const salt = parseInt(process.env.SALT_PASS || "10");
    const hashedPw = await bcrypt.hash(password, salt);

    if (
      user_name !== undefined &&
      email !== undefined &&
      password !== undefined
    ) {
      const createdUser = await user.createNewUser({
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
    } else {
      return res.json({
        meta: {
          success: false,
          message: "fields-required",
          devMessage: "fields-required",
        },
      });
    }
  } catch (err) {
    return res.json({
      meta: {
        success: false,
        message: "internal-server-error",
        devMessage: err,
      },
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    if (password !== undefined && email !== undefined) {
      const existingUser = await user.findUser(email);
      if (existingUser) {
        const checkPassword = bcrypt.compareSync(
          password,
          existingUser.password
        );
        if (checkPassword) {
          const token = JWT.sign(
            {
              data: { id: existingUser.user_id, status: "verified" },
            },
            process.env.JWT_SECRET || "",
            { expiresIn: "1d" }
          );
          await user.updateUser(existingUser.user_id, {
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
        } else {
          return res.json({
            meta: {
              success: false,
              message: "wrong password",
              devMessage: "user-login-failed",
            },
            body: "",
          });
        }
      } else {
        return res.json({
          meta: {
            success: false,
            message: "user not exist!",
            devMessage: "",
          },
        });
      }
    } else {
      return res.json({
        meta: {
          success: false,
          message: "fields-required",
          devMessage: "",
        },
      });
    }
  } catch (err) {
    return res.json({
      meta: {
        success: false,
        message: "internal-server-error",
        devMessage: err,
      },
    });
  }
};

export const editUserById = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const { user_name, bio } = req.body;
  try {
    const updatedUser = await user.updateUser(id, {
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

// ----------------User Management By Admin----------------------

export const fetchAllUsers = async (req: Request, res: Response) => {
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
};

export const updateUserByAdmin = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const { status, user_type } = req.body;
  try {
    const updatedUser = await user.updateUser(id, {
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

export const deleteUserByAdmin = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  try {
    const deletedUser = await user.deleteUser(id);
    res.status(200).json({
      meta: {
        success: true,
        message: "success",
      },
      body: deletedUser,
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

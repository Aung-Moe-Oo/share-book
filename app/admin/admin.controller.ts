import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import Admin from "./admin.service";
import bcrypt from "bcrypt";

const admin = new Admin();
export const register = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const salt = parseInt(process.env.SALT_PASS || "10");
    const hashedPw = await bcrypt.hash(password, salt);
    const id = Math.floor(Math.random() * 90000000) + 10000000;

    if (name !== undefined && password !== undefined) {
      const createdAdmin = await admin.createNewAdmin({
        login_id: id.toString(),
        name,
        password: hashedPw,
      });
      return res.json({
        meta: {
          success: true,
          message: "success",
          devMessage: createdAdmin,
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
    const { password, name } = req.body;
    if (password !== undefined && name !== undefined) {
      const existingAdmin = await admin.findAdmin(name);
      if (existingAdmin) {
        const checkPassword = bcrypt.compareSync(
          password,
          existingAdmin.password
        );
        if (checkPassword) {
          const token = JWT.sign(
            {
              data: { id: existingAdmin.login_id, status: "admin" },
            },
            process.env.JWT_SECRET || "",
            { expiresIn: "1d" }
          );
          await admin.updateAdmin(existingAdmin.login_id, {
            token: token,
          });
          return res.json({
            meta: {
              success: true,
              message: "success",
              devMessage: "admin-login",
            },
            body: {
              token,
              admin: {
                login_id: existingAdmin.login_id,
                name: existingAdmin.name,
              },
            },
          });
        } else {
          return res.json({
            meta: {
              success: false,
              message: "wrong password",
              devMessage: "admin-login-failed",
            },
            body: "",
          });
        }
      } else {
        return res.json({
          meta: {
            success: false,
            message: "admin not exist!",
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

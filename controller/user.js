import { Op } from "sequelize";
import { User } from "../models/User.js";
import validateSchema from "../models/validateSchema.js";
import bcrypt from "bcrypt";
import { userToken } from "../service/auth.js";

const registerUser = async (req, h) => {
  try {
    const { firstName, lastName, userName, email, phone, password } =
      req.payload;

    const { error } = validateSchema.validate(req.payload);

    if (error) {
      return h
        .response({
          message: error?.message,
          error: true,
          success: false,
        })
        .code(400);
    }

    const existedUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { userName }, { phone }],
      },
    });

    if (existedUser) {
      return h.response({
        message: "user is already regisered",
        error: true,
        success: false,
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      phone,
      password,
    });

    return h
      .response({
        message: "user registered successfully",
        error: false,
        success: true,
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
        },
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        message: error?.message || "internal server error",
        error: true,
        success: false,
      })
      .code(500);
  }
};

const login = async (req, h) => {
  try {
    const { email, password } = req.payload;

    if (!email) {
      throw new Error("please enter email");
    }

    if (!password) {
      throw new Error("please enter your password");
    }

    const checkUser = await User.findOne({ where: { email: email } });

    if (!checkUser) {
      throw new Error("user not registered");
    }

    const isValidPassword = await bcrypt.compare(password, checkUser.password);
    if (!isValidPassword) {
      return h
        .response({
          message: "Invalid credentials",
          error: true,
          success: false,
        })
        .code(401);
    }

    const token = userToken(checkUser);

    return h
      .response({
        message: "Login successful",
        error: false,
        success: true,
        data: {
          id: checkUser.id,
          email: checkUser.email,
          userName: checkUser.userName,
          token,
        },
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        message: error?.message || "internal server error",
        error: true,
        success: false,
      })
      .code(500);
  }
};

const logout = async (req, h) => {
  try {
    return h
      .response({
        message: "Logged out successfully.",
        success: true,
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        message: error?.message || "Internal server error",
        error: true,
        success: false,
      })
      .code(500);
  }
};

const getAllUser = async(req, h) => {
  try {
    if(req.user.role !== "ADMIN"){
      h.response({
        message: "You do not have access to this page",
        error: true,
        success: false
      }).code(403)
    }
    const allUser = await User.findAll();

    return h.response({
      message: "Fetched all users",
      error: false,
      success: true,
      data: allUser
    }).code(200)
  } catch (error) {
    console.log(error)
    return h.response({
      message: error?.message || "something went wrong",
      error: true,
      success: false
    }).code(500)
  }
}

export { registerUser, login, logout, getAllUser };

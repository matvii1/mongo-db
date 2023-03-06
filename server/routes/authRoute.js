import bcrypt from "bcryptjs";
import config from "config";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authRoute = express.Router();

authRoute.post(
  "/register",
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(400).send({ message: "User already exists" });

        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).send({ message: "user is created" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong123" });
    }
  }
);

authRoute.post(
  "/login",
  async (req, res) => {

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).send({ message: "User not found" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(500).send({ message: "Password is not correct" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.send({
        token: token,
        userId: user.id,
      });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

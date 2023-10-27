import { User } from "../models/User.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = new User({ email, password });

    await user.save();

    //JWT token

    return res.json({ ok: true });
  } catch (error) {
    console.log(error.code);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
  }
};

export const login = async (req, res) => {
  res.json({ ok: "login" });
};

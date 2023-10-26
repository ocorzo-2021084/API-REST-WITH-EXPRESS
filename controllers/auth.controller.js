export const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  res.json({ ok: "login" });
};

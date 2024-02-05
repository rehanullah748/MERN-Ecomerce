const { validationResult } = require("express-validator");
const userModel = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password, image } = req.body;
    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword)
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        await userModel.create({
          name,
          email,
          password: hashedPassword,
          image

        });

        return res.status(200).json({ msg: "user created", password });
      }
      return res.status(401).json({ errors: [{ msg: "user is already taken", path: "email" }] });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ errors: errors.array(), type: "array" });
  }
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
              res.cookie("shopUser",token,{maxAge: 1000 * 60 * 60 * 24 * 2, domain:"localhost", httpOnly: true, sameSite:true})
        return res.status(200).json({ logdIn: "logdIn successfully", token });
      } else {
        return res.status(400).json({ error: "wrong credintials" });
      }
    } else {
      return res.status(404).json({ error: "wrong credintials" });
    }
  }
  return res.status(400).json({ errors: errors.array() });
}; 

module.exports.logOut = (req, res) => {
  try {
    res.clearCookie("shopUser", {domain: "localhost", httpOnly: true})
    return res.status(200).json({msg: "you are logged out"})
  } catch (error) {
    res.status(500).json({error: "server internal error"})
  }
}

module.exports.getProfile = async(req, res) => {
const {email} = req.query;
try {
  const user = await userModel.findOne({email})
  if(!user) {
    return res.status(404).json({error: "user not found"})
  } else {
    return res.status(200).json(user)
  }
} catch (error) {
  res.status(500).json({error: "server internal error"})
}
}
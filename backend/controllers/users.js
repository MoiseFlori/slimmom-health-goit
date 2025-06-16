const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { nanoid } = require("nanoid");
const sgMail = require("@sendgrid/mail");

const { JWT_SECRET } = process.env;
const BASE_URL = process.env.BASE_URL;
sgMail.setApiKey(process.env.EMAIL_API);

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken,
    verify: false,
  });

  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL,
    subject: "Please verify your email",
    html: `<p>Hello,</p>
          <p>Please verify your email by clicking on the link below:</p>
    <a href="${BASE_URL}/users/verify/${verificationToken}">Verifică email-ul tău</a>`,
  };

  await sgMail.send(msg);

  res.status(201).json({
    user: {
      name,
      email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  if (!user.verify) {
    return res.status(401).json({ message: "Email not verified" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.status(204).send();
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  res.status(200).json({ message: "Verification successful" });
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verificationToken = user.verificationToken;
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL,
    subject: "Please verify your email",
    html: `<p>Hello,</p>
          <p>Please verify your email by clicking on the link below:</p>
    <a href="${BASE_URL}/users/verify/${verificationToken}">Verifică email-ul tău</a>`,
  };
  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Error sending verification email" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { height, age, currentWeight, desiredWeight, blood, dailyRate } =
      req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        height,
        age,
        currentWeight,
        desiredWeight,
        blood,
        dailyRate,
      },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "height age currentWeight desiredWeight blood dailyRate"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get profile", error: error.message });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verifyEmail,
  resendVerificationEmail,
  updateUserProfile,
  getUserProfile
};

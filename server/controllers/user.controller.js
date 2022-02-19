require("dotenv").config();
const fs = require("fs");
const util = require("util");
const userService = require("../services/userService");
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);

const updateUser = async (req, res) => {
  try {
    const { phone, name, profilePic } = req.body;
    const { email, id } = req.user;
    const dirPath = `${process.env.PROFILE_PICS_FOLDER}${id}`;
    const imagePath = `${process.env.PROFILE_PICS_FOLDER}${id}/${id}.jpg`;
    const defaultImagePath = `${process.env.PROFILE_PICS_FOLDER}/pic.jpg`;

    await mkdir(dirPath, { recursive: true });

    if (!profilePic) {
      await copyFile(defaultImagePath, imagePath);
    } else {
      await writeFile(imagePath, profilePic);
    }

    await userService.updateUser(email, name, phone, imagePath);

    return res.status(200).json({ message: "Profile updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.user.email;
    await userService.deleteUser(email);
    return res.status(200).json({ message: "Your account was deleted" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

module.exports = {
  updateUser,
  deleteUser,
};

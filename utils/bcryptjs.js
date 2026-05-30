import bcrypt from "bcryptjs";
const saltRound = 10;

export const hashPassword = (plainPassword) => {
  try {
    const salt = bcrypt.hashSync(plainPassword, saltRound);
    return salt;
  } catch (error) {
    console.log(error);
    throw new Error("Error hashing password");
  }
};

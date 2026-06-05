import bcrypt from "bcryptjs";
const saltRound = 10;

export const hashPassword = (plainPassword) => {
  try {
    const salt = bcrypt.hashSync(plainPassword, saltRound);
    return salt;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

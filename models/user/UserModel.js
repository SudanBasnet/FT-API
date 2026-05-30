import UserSchema from "./UserSchema.js";

//CRUD operations

export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

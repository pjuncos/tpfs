import { NotFoundError, ValidationError } from "../errors";
import User, { IUser, ROLES } from "../models/user";
import { encodePassword } from "./auth";

const addUser = async (
  name: string,
  email: string,
  isActive: boolean,
  password: string,
  role?: number
): Promise<IUser> => {
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return Promise.reject(new ValidationError("User already exists"));
  }
  if (role) {
    console.log(ROLES.STUDENT);
  }
  const encoded = await encodePassword(password);
  const usr = new User({
    name: name,
    email: email,
    isActive: isActive,
    password: encoded,
    role,
  });

  const user: IUser = await usr.save();
  return user;
};

const getAllUsers = async (
  limit: number,
  offset: number
): Promise<Array<IUser>> => {
  const users: Array<IUser> = await User.find({}).limit(limit).skip(offset);
  return users;
};

const getUser = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    return Promise.reject(new NotFoundError("User does not exists"));
  }
  return user;
};

const editUser = async (user: IUser): Promise<IUser> => {
  const result = await User.findByIdAndUpdate(user._id, user, { new: true });
  if (!result) {
    return Promise.reject(new NotFoundError("User does not exists"));
  }
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    return Promise.reject(new NotFoundError("User does not exists"));
  }
  return result;
};

export { addUser, getAllUsers, getUser, editUser, deleteUser };

import User, { IUser } from "../models/user";
import { encodePassword } from "./auth";

const addUser = async (
  name: string,
  email: string,
  isActive: boolean,
  password: string
): Promise<IUser | null> => {
  const existUser = await User.findOne({ email: email });
  if (!existUser) {
    const encoded = await encodePassword(password);
    const usr = new User({
      name: name,
      email: email,
      isActive: isActive,
      password: encoded,
    });

    const user: IUser = await usr.save();
    return user;
  } else {
    return null;
  }
};

const getAllUsers = async (
  limit: number,
  offset: number
): Promise<Array<IUser>> => {
  const users: Array<IUser> = await User.find({}).limit(limit).skip(offset);
  return users;
};

const getUser = async (id: number): Promise<IUser | null> => {
  const user = await User.findById(id);
  return user;
};

const editUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(user._id, user, { new: true });
  return result;
};

const deleteUser = async (id: number) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export { addUser, getAllUsers, getUser, editUser, deleteUser };

import { NotFoundError, ValidationError } from "../errors";
import Class, { IClass } from "../models/class";
import User, { IUser } from "../models/user";

const addClass = async (
  name: string,
  ownerId: string,
  isActive: boolean
): Promise<IClass | null> => {
  const owner = await User.findById(ownerId);
  if (!owner) {
    return Promise.reject(new ValidationError("User does not exists"));
  }
  if (!owner.isActive) {
    return Promise.reject(new ValidationError("User is not active"));
  }

  const cls = new Class({
    name: name,
    owner,
    isActive: isActive,
  });

  const newClass: IClass = await cls.save();
  return newClass;
};

const getClassesByUser = async (
  owner: IUser,
  limit: number,
  offset: number
): Promise<Array<IClass>> => {
  const classes: Array<IClass> = await Class.find({ owner })
    .limit(limit)
    .skip(offset);
  return classes;
};

const getAllClasses = async (
  limit: number,
  offset: number
): Promise<Array<IClass>> => {
  const classes: Array<IClass> = await Class.find({}).limit(limit).skip(offset);
  return classes;
};

const getClass = async (id: string): Promise<IClass | null> => {
  const cls = await Class.findById(id);
  if (!cls) {
    return Promise.reject(new NotFoundError("Class does not exist"));
  }
  return cls;
};

const editClass = async (clss: IClass): Promise<IClass | null> => {
  const result = await Class.findByIdAndUpdate(clss._id, clss, { new: true });
  if (!result) {
    return Promise.reject(new NotFoundError("Class does not exist"));
  }
  return result;
};

const deleteClass = async (id: string) => {
  const result = await Class.findByIdAndDelete(id);
  if (!result) {
    return Promise.reject(new NotFoundError("Class does not exist"));
  }
  return result;
};

export {
  addClass,
  getClassesByUser,
  getAllClasses,
  getClass,
  editClass,
  deleteClass,
};

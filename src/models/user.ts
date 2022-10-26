import { Document, Schema, model } from "mongoose";

export enum ROLES {
  ADMIN = 0,
  TEACHER = 1,
  STUDENT = 2,
}

export interface IUser extends Document {
  email: string;
  name: string;
  role: number;
  password: string;
  isActive: boolean;
}

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      minLength: [4, "Name should be minimum of 4 characters"],
    },
    role: { type: Number, required: true, enum: ROLES, default: ROLES.STUDENT },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be a minimum of 8 characters"],
    },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
).set("toJSON", {
  transform: (document, object) => {
    object.id = document.id;
    delete object._id;
    delete object.password;
  },
});

const User = model<IUser>("User", UserSchema);
export default User;

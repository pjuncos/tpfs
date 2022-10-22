import { Document, Schema, model } from "mongoose";

const ROLES = {
  ADMIN: 0,
  TEACHER: 1,
  STUDENT: 2,
};

export interface IUser extends Document {
  email: string;
  name: string;
  role: string;
  password: string;
  isActive: boolean;
}

export const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ROLES, default: ROLES.STUDENT },
    password: { type: String, required: true },
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

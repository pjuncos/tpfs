import { Document, Schema, model } from "mongoose";

export enum ROLES {
  ADMIN = 0,
  USER = 1,
}

export interface IUser extends Document {
  email: string;
  name: string;
  role: number;
  password: string;
  isActive: boolean;
  isAdmin(): boolean;
}

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      minLength: [4, "Name should be minimum of 4 characters"],
    },
    role: { type: Number, required: true, enum: ROLES, default: ROLES.USER },
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

UserSchema.methods.isAdmin = function (this: IUser) {
  return this.role === ROLES.ADMIN;
};

const User = model<IUser>("User", UserSchema);
export default User;

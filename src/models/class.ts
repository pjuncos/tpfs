import { Document, Schema, model, Types } from "mongoose";

export interface IClass extends Document {
  name: string;
  members: [Types.ObjectId];
  owner: Types.ObjectId;
  isActive: boolean;
}

export const ClassSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [4, "Name should be minimum of 4 characters"],
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
).set("toJSON", {
  transform: (document, object) => {
    object.id = document.id;
    delete object._id;
  },
});

const Class = model<IClass>("Class", ClassSchema);
export default Class;

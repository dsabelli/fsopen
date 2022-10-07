import mongoose from "mongoose";

export interface Usera {
  save(): unknown;
  username: string;
  password: string;
  friends: Persona[];
  _id: mongoose.Types.ObjectId;
}
export interface Token {
  username: string;
  id: string;
}
export interface Me {
  currentUser: Usera;
}
export interface Persona {
  name: string;
  phone?: string;
  street: string;
  city: string;
  _id: mongoose.Types.ObjectId;
}

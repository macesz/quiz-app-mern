import { IUser } from "./IUser.js";

export interface ISignUpBody extends Pick<IUser, "username" | "email" | "password"> {}

export interface ISignInBody extends Pick<IUser, "username" | "password"> {}

export interface IUpdateUserBody extends Partial<IUser> {}
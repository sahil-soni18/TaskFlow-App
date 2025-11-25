export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

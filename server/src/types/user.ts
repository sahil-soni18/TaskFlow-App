export interface IUser {
    email: string;
    password: string;
    role: 'admin' | 'user';
    name: string;
}
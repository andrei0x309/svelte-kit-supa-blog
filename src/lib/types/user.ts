export type ICurrentUser = {
    id: number;
    username: string;
    email: string;
    avatar: string;
    role: string;
    password_hash?: string;
}

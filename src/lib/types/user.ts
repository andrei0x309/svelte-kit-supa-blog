export type ICurrentUser = {
    id: number;
    username: string;
    email: string;
    avatar: string;
    role: string;
    password_hash?: string;
    description: string;
    created_at: string;
    social_links: Record<string, string>;
}

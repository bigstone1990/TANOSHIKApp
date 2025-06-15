export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    kana: string; // 共通
    office_id?: number | null; // User用
}

interface Permission {
    user: [];
    admin: [];
}

interface Flash {
    id: string | null;
    message: string | null;
    status: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        permissions: Permission;
    };
    flash: Flash;
};

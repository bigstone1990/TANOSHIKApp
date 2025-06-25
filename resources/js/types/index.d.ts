export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    kana: string; // 共通
    role?: number; // User用
    office_id?: number | null; // User用
    can_manage_job_postings?: boolean; // User用
    can_manage_groupings?: boolean; // User用
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
        isAdmin: Boolean;
        permissions: Permission;
    };
    flash: Flash;
};

export * from './option';

import httpClient from '@/shared/config/api/httpClient';
import { ENDP_ADMIN } from '@/shared/config/api/URLs';

export interface Admin {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    role: string;
    access: { id: number; name: string }[];
    createdAt: string;
}

export interface CreateAdminDto {
    name: string;
    lastName: string;
    phone: string;
    role: string;
    access: string[];
}

export const getAdmins = async (): Promise<Admin[]> => {
    const { data } = await httpClient.get(ENDP_ADMIN);
    return data;
};

export const createAdmin = async (admin: CreateAdminDto): Promise<{ ok: boolean; token: string; admin: Admin }> => {
    const { data } = await httpClient.post(ENDP_ADMIN, admin);
    return data;
};

export const updateAdmin = async (id: number, admin: Partial<CreateAdminDto>): Promise<Admin> => {
    const { data } = await httpClient.put(`${ENDP_ADMIN}/${id}`, admin);
    return data.admin;
};

export const deleteAdmin = async (id: number): Promise<void> => {
    await httpClient.delete(`${ENDP_ADMIN}/${id}`);
};

import httpClient from '@/shared/config/api/httpClient';

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
    const { data } = await httpClient.get('/api/admin');
    return data;
};

export const createAdmin = async (admin: CreateAdminDto): Promise<{ ok: boolean; token: string; admin: Admin }> => {
    const { data } = await httpClient.post('/api/admin', admin);
    return data;
};

export const updateAdmin = async (id: number, admin: Partial<CreateAdminDto>): Promise<Admin> => {
    const { data } = await httpClient.put(`/api/admin/${id}`, admin);
    return data.admin;
};

export const deleteAdmin = async (id: number): Promise<void> => {
    await httpClient.delete(`/api/admin/${id}`);
};

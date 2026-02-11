export interface IUser {
    id: string;
    phone: string;
    name: string;
    lastName: string;
    gender: string;
    profile_picture: string;
    createdAt: string;
    updatedAt: string;
    reviews?: any[];
    orders?: any[];
}

export interface IUpdateUserRequest {
    name?: string;
    lastName?: string;
    gender?: string;
    phone?: string;
    profile_picture?: string;
}

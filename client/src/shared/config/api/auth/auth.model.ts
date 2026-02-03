interface LoginRequest {
    phone: string;
    password: string;
}

interface RegisterRequest {
    phone: string;
    password: string;
    name: string;
    gender: string;
    female: string;
};

export type { LoginRequest, RegisterRequest };
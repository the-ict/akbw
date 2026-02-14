interface LoginRequest {
  phone: string;
  password?: string;
}

interface RegisterRequest {
  phone: string;
  name: string;
  gender: string;
  lastName: string;
}

export type { LoginRequest, RegisterRequest };

interface SmsRequest {
  phone: string;
}

interface VerifyRequest {
  phone: string;
  code: string;
}

export type { SmsRequest, VerifyRequest };

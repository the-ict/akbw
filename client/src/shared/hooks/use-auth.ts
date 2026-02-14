import React from 'react';

export default function UseAuth(
  phone: string,
  setPhone: (phone: string) => void,
  setOtp: (otp: string) => void,
) {
  const formatPhone = (value: string) => {
    let cleaned = value.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+998')) {
      cleaned = '+998' + cleaned.replace('+', '').replace('998', '');
    }

    let formatted = '+998';
    const digits = cleaned.slice(4).replace(/\D/g, '');

    if (digits.length > 0) formatted += ' ' + digits.slice(0, 2);
    if (digits.length > 2) formatted += ' ' + digits.slice(2, 5);
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 7);
    if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    if (formatted.length <= 19) {
      setPhone(formatted);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 5) {
      setOtp(value);
    }
  };

  return { handlePhoneChange, handleOtpChange };
}

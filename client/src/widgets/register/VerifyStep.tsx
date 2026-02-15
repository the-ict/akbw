import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  otp: string;
  phone: string;
  errors: Record<string, string>;
  timeLeft: number;
  handleOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVerify: () => void;
  handleResendCode: () => void;
  setSteps: (step: 'register' | 'verify') => void;
  setTimeLeft: (timeLeft: number) => void;
}

export default function VerifyStep({
  otp,
  phone,
  errors,
  timeLeft,
  handleOtpChange,
  handleVerify,
  handleResendCode,
  setSteps,
  setTimeLeft,
}: Props) {
  const t = useTranslations("Register");
  return (
    <>
      <div className="flex flex-col gap-1 mt-5">
        <Input
          placeholder={t("otp_placeholder")}
          value={otp}
          onChange={handleOtpChange}
          className={cn(
            'text-center tracking-[1em] font-bold text-xl h-12',
            errors.otp
              ? 'border-red-500'
              : 'placeholder:opacity-30 placeholder:tracking-normal',
          )}
          maxLength={5}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            {t("otp_sent_text", { phone })}
          </p>
          {timeLeft > 0 ? (
            <p className="text-xs font-medium text-black">
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </p>
          ) : (
            <button
              onClick={handleResendCode}
              className="text-xs cursor-pointer font-bold text-black underline hover:opacity-70 transition-opacity"
            >
              {t("resend_code_btn")}
            </button>
          )}
        </div>
        {errors.otp && <p className="text-xs text-red-500">{errors.otp}</p>}
      </div>

      <Button onClick={handleVerify} className="mt-8 w-full">
        {t("verify_btn")}
      </Button>

      <Button
        onClick={() => {
          setSteps('register');
          setTimeLeft(60);
        }}
        className="bg-[#fff]/50 mt-3 text-[#000] btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20 shadow-xl text-sm font-bold w-full"
      >
        {t("edit_info_btn")}
      </Button>
    </>
  );
}

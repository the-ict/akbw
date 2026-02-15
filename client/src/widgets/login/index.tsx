import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
} from '@/shared/ui/modal';
import {
  cn
} from '@/shared/lib/utils';
import {
  X
} from 'lucide-react';
import React from 'react';
import * as z from 'zod';
import {
  useMutation
} from '@tanstack/react-query';
import {
  sendSms,
  verifySms
} from '@/shared/config/api/sms/sms.request';
import { login } from '@/shared/config/api/auth/auth.request';
import { useUserStore } from '@/shared/store/user.store';
import UseAuth from '@/shared/hooks/use-auth';
import Register from '../register';
import { useTranslations } from 'next-intl';

const registerSchema = z.object({
  phone: z
    .string()
    .min(12, "phone_invalid")
    .regex(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "phone_invalid"),
});

type Steps = 'register' | 'verify';

interface LoginProps {
  trigger?: React.ReactNode;
  className?: string;
}

function Login({ trigger, className }: LoginProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [steps, setSteps] = React.useState<Steps>('register');
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [phone, setPhone] = React.useState('+998');
  const [otp, setOtp] = React.useState('');

  const { handlePhoneChange, handleOtpChange } = UseAuth(
    phone,
    setPhone,
    setOtp,
  );

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (steps === 'verify' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [steps, timeLeft]);

  const { setToken } = useUserStore();

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.data.ok) {
        setToken(data.data.token);
        console.log('Logged in successfully');
        window.location.reload();
      }
    },
  });

  const sendSmsMutation = useMutation({
    mutationKey: ['send-sms'],
    mutationFn: sendSms,
    onSuccess: () => {
      setSteps('verify');
      setTimeLeft(60);
      setErrors({});
    },
  });

  const verifySmsMutation = useMutation({
    mutationKey: ['verify-sms'],
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      verifySms(phone, code),
    onSuccess: async () => {
      setErrors({});
      await loginMutation.mutateAsync({ phone });
    },
  });

  const handleRegister = async () => {
    const result = registerSchema.safeParse({ phone });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue: z.ZodIssue) => {
        newErrors[issue.path[0] as string] = t(issue.message);
      });
      setErrors(newErrors);
      return;
    }

    await sendSmsMutation.mutateAsync(phone);
  };

  const handleVerify = async () => {
    if (otp.length < 5) {
      setErrors({ otp: "Kod 5 ta raqamdan iborat bo'lishi kerak" });
      return;
    }
    setErrors({});
    await verifySmsMutation.mutateAsync({ phone, code: otp });
  };

  const handleResendCode = async () => {
    setTimeLeft(60);
    setOtp('');
    await sendSmsMutation.mutateAsync(phone);
  };

  const t = useTranslations("Login");

  const renderRegisterSteps = () => {
    switch (steps) {
      case 'register':
        return (
          <>
            <div className="flex flex-col gap-1 mt-3">
              <label className="text-sm font-medium">{t("phone_label")}</label>
              <Input
                placeholder={t("phone_placeholder")}
                value={phone}
                onChange={handlePhoneChange}
                className={
                  errors.phone ? 'border-red-500' : 'placeholder:opacity-50'
                }
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}

              <p className="text-gray-500 mt-3 text-[11px] text-center">
                {t("not_registered_text")} <Register trigger={<span className='text-gray-600 underline font-bold'>{t("register_link")}</span>} />
              </p>
            </div>

            <Button onClick={handleRegister} className="mt-5 w-full">
              {t("send_code_btn")}
            </Button>
          </>
        );

      case 'verify':
        return (
          <>
            <div className="flex flex-col gap-1 mt-5">
              <Input
                placeholder="00000"
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
                  {t("otp_sent_text", { phone: phone, })}
                </p>
                {timeLeft > 0 ? (
                  <p className="text-xs font-medium text-black">
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </p>
                ) : (
                  <button
                    onClick={handleResendCode}
                    className="text-xs font-bold text-black underline hover:opacity-70 transition-opacity"
                  >
                    {t("resend_code_btn")}
                  </button>
                )}
              </div>
              {errors.otp && (
                <p className="text-xs text-red-500">{errors.otp}</p>
              )}
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
              {t("change_phone_btn")}
            </Button>
          </>
        );
    }
  };

  return (
    <Modal>
      <ModalTrigger asChild>{trigger || <Button>Kirish</Button>}</ModalTrigger>
      <ModalContent className={className}>
        <ModalClose>
          <X />
        </ModalClose>

        <h1 className="font-display text-2xl md:text-3xl font-bold w-full text-center">
          AKBW
        </h1>
        <ModalTitle className="text-center">
          {steps === 'register' ? t("login_title") : t("verify_title")}
        </ModalTitle>
        {renderRegisterSteps()}

        <ModalDescription className="text-gray-500 mt-3 text-[11px] text-center">
          {t("continue_terms_text")} {' '}
          <a href="/terms" className="text-gray-600 underline font-bold">
            {t("terms_link_text")}
          </a>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
}

export default Login;

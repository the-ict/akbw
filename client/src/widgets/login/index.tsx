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
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import React from 'react';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { sendSms, verifySms } from '@/shared/config/api/sms/sms.request';
import { login } from '@/shared/config/api/auth/auth.request';
import { useUserStore } from '@/shared/store/user.store';
import UseAuth from '@/shared/hooks/use-auth';

const registerSchema = z.object({
  phone: z
    .string()
    .min(12, "Telefon raqami noto'g'ri")
    .regex(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Telefon raqami noto'g'ri"),
});

type Steps = 'register' | 'verify';

interface LoginProps {
  trigger?: React.ReactNode;
}

function Login({ trigger }: LoginProps) {
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
        newErrors[issue.path[0] as string] = issue.message;
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

  const renderRegisterSteps = () => {
    switch (steps) {
      case 'register':
        return (
          <>
            <div className="flex flex-col gap-1 mt-3">
              <label className="text-sm font-medium">Telefon raqami</label>
              <Input
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={handlePhoneChange}
                className={
                  errors.phone ? 'border-red-500' : 'placeholder:opacity-50'
                }
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            <Button onClick={handleRegister} className="mt-5 w-full">
              Kod yuborish
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
                  {phone} raqamiga yuborilgan 5 xonali kodni kiriting
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
                    Qayta kod yuborish
                  </button>
                )}
              </div>
              {errors.otp && (
                <p className="text-xs text-red-500">{errors.otp}</p>
              )}
            </div>

            <Button onClick={handleVerify} className="mt-8 w-full">
              Tasdiqlash
            </Button>

            <Button
              onClick={() => {
                setSteps('register');
                setTimeLeft(60);
              }}
              className="bg-[#fff]/50 mt-3 text-[#000] btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20 shadow-xl text-sm font-bold w-full"
            >
              Raqamni o&apos;zgartirish
            </Button>
          </>
        );
    }
  };

  return (
    <Modal>
      <ModalTrigger asChild>{trigger || <Button>Kirish</Button>}</ModalTrigger>
      {/* ... rest of the modal ... */}
      <ModalContent>
        <ModalClose>
          <X />
        </ModalClose>

        <h1 className="font-display text-2xl md:text-3xl font-bold w-full text-center">
          AKBW
        </h1>
        <ModalTitle className="text-center">
          {steps === 'register' ? 'Kirish' : 'Tasdiqlash kodi'}
        </ModalTitle>
        {renderRegisterSteps()}

        <ModalDescription className="text-gray-500 mt-3 text-[11px] text-center">
          Davom etgan holda men{' '}
          <a href="/terms" className="text-gray-600 underline font-bold">
            AKBW ma&apos;lumotlarni qayta ishlash siyosatiga rozilik bildiraman!
          </a>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
}

export default Login;

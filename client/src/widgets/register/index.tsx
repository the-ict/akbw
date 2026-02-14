import { Button } from '@/shared/ui/button';
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
} from '@/shared/ui/modal';
import { X } from 'lucide-react';
import React from 'react';
import * as z from 'zod';
import RegisterStep from './RegisterStep';
import VerifyStep from './VerifyStep';
import UseAuth from '@/shared/hooks/use-auth';
import { useMutation } from '@tanstack/react-query';
import { sendSms, verifySms } from '@/shared/config/api/sms/sms.request';
import { register } from '@/shared/config/api/auth/auth.request';
import { useUserStore } from '@/shared/store/user.store';
import { toast } from '@/shared/ui/toast';
import { onError } from '@/shared/config/api/isAxiosError';

const registerSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
  lastName: z
    .string()
    .min(2, "Familiya kamida 2 ta harfdan iborat bo'lishi kerak"),
  gender: z.string().min(2, "Jins kamida 2 ta harfdan iborat bo'lishi kerak"),
  phone: z
    .string()
    .min(12, "Telefon raqami noto'g'ri")
    .regex(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Telefon raqami noto'g'ri"),
});

type Steps = 'register' | 'verify';

interface RegisterProps {
  trigger?: React.ReactNode;
}

function Register({ trigger }: RegisterProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [steps, setSteps] = React.useState<Steps>('register');
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [lastName, setLastName] = React.useState('');
  const [gender, setGender] = React.useState('male');
  const [phone, setPhone] = React.useState('+998');
  const [name, setName] = React.useState('');
  const [otp, setOtp] = React.useState('');

  const { setToken } = useUserStore();

  const { handlePhoneChange, handleOtpChange } = UseAuth(
    phone,
    setPhone,
    setOtp,
  );

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      console.log(data);
      if (data.data.ok) {
        toast.success("Ro'yhatdan o'tish muvaffaqiyatli bajarildi");
        setToken(data.data.token);
      }

      setOtp('');
      setName('');
      setLastName('');
      setGender('male');
      setPhone('+998');
      setErrors({});
    },
    onError: onError,
  });

  const sendSmsMutation = useMutation({
    mutationKey: ['send-sms'],
    mutationFn: sendSms,
    onSuccess: () => {
      if (steps !== 'verify') {
        setSteps('verify');
      }
      setTimeLeft(60);
      setErrors({});
    },
    onError,
  });

  const verifySmsMutation = useMutation({
    mutationKey: ['verify-sms'],
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      verifySms(phone, code),
    onSuccess: async () => {
      setSteps('register');
      setTimeLeft(60);
      setErrors({});

      await registerMutation.mutateAsync({ name, lastName, phone, gender });
    },
    onError,
  });

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (steps === 'verify' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [steps, timeLeft]);

  const handleSendVerification = async () => {
    const result = registerSchema.safeParse({ name, lastName, gender, phone });
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
    console.log('Resending code to:', phone);

    await sendSmsMutation.mutateAsync(phone);
  };

  const renderRegisterSteps = () => {
    switch (steps) {
      case 'register':
        return (
          <RegisterStep
            name={name}
            setName={setName}
            setLastName={setLastName}
            lastName={lastName}
            gender={gender}
            setGender={setGender}
            phone={phone}
            errors={errors}
            handleRegister={handleSendVerification}
            handlePhoneChange={handlePhoneChange}
          />
        );

      case 'verify':
        return (
          <VerifyStep
            otp={otp}
            setSteps={setSteps}
            phone={phone}
            errors={errors}
            timeLeft={timeLeft}
            handleOtpChange={handleOtpChange}
            handleVerify={handleVerify}
            handleResendCode={handleResendCode}
            setTimeLeft={setTimeLeft}
          />
        );
    }
  };

  return (
    <Modal>
      <ModalTrigger asChild>
        {trigger || (
          <Button
            variant={'outline'}
            className="bg-[#fff]/50 text-[#000] btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20 shadow-xl text-sm font-bold"
          >
            Ro&apos;yhatdan o&apos;tish
          </Button>
        )}
      </ModalTrigger>
      <ModalContent>
        <ModalClose>
          <X />
        </ModalClose>

        <h1 className="font-display text-2xl md:text-3xl font-bold w-full text-center">
          AKBW
        </h1>
        <ModalTitle className="text-center">
          {steps === 'register' ? "Ro'yhatdan o'tish" : 'Tasdiqlash kodi'}
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

export default Register;

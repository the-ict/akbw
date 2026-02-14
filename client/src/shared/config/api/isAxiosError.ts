import { isAxiosError } from 'axios';
import { toast } from '@/shared/ui/toast';

export const onError = (error: unknown) => {
  if (isAxiosError(error)) {
    toast.error(error.response?.data.message);
  } else {
    toast.error("Nomalum xatolik yuz berdi! Iltimos keyinroq urunib ko'ring");
  }
};

import { getNotifications } from '@/shared/config/api/notifications/notifications.requests';
import {
  getHelpChat,
  sendHelpMessage,
  createHelpChat,
  getAskChat,
  sendAskMessage,
  createAskChat,
} from '@/shared/config/api/profile/profile.requests';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useNotifications = () => {
  const query = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  return query;
};

export const useSupportChat = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['support-chat'],
    queryFn: getHelpChat,
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendHelpMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support-chat'] });
    },
  });

  const createChatMutation = useMutation({
    mutationFn: createHelpChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support-chat'] });
    },
  });

  return {
    ...query,
    sendMessage: sendMessageMutation.mutateAsync,
    createChat: createChatMutation.mutateAsync,
  };
};

export const useProductInquiry = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product-inquiry'],
    queryFn: getAskChat,
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendAskMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-inquiry'] });
    },
  });

  const createChatMutation = useMutation({
    mutationFn: createAskChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-inquiry'] });
    },
  });

  return {
    ...query,
    sendMessage: sendMessageMutation.mutateAsync,
    createChat: createChatMutation.mutateAsync,
  };
};

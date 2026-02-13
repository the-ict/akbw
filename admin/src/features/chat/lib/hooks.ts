import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAskForChats, getAllHelpChats, sendAdminAskMessage, sendAdminHelpMessage } from "@/shared/config/api/chat/chat.request";
import { toast } from "sonner";

export const useAdminHelpChats = () => {
    return useQuery({
        queryKey: ["admin-help-chats"],
        queryFn: getAllHelpChats
    });
};

export const useAdminSendMessage = (type: 'help' | 'ask') => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: type === 'help' ? sendAdminHelpMessage : sendAdminAskMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [type === 'help' ? "admin-help-chats" : "admin-ask-chats"] });
        },
        onError: () => {
            toast.error("Xabar yuborishda xatolik yuz berdi");
        }
    });
};

export const useAdminAskChats = () => {
    return useQuery({
        queryKey: ["admin-ask-chats"],
        queryFn: getAllAskForChats
    });
};

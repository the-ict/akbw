import { getNotifications } from "@/shared/config/api/notifications/notifications.requests";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
    const query = useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications
    });

    return query;
};
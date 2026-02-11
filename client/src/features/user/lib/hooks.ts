import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userRequest } from "@/shared/config/api/user/user.request";
import { IUpdateUserRequest } from "@/shared/config/api/user/user.model";

export const useUser = () => {
    return useQuery({
        queryKey: ["user", "me"],
        queryFn: () => userRequest.getMe()
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IUpdateUserRequest) => userRequest.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", "me"] });
        }
    });
};

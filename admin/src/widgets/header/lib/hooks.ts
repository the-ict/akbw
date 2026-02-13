import { useQuery } from "@tanstack/react-query"
import { adminMeRequest } from "@/shared/config/api/admin/admin.request"

export const useAdminMe = () => {
    return useQuery({
        queryKey: ["admin-me"],
        queryFn: () => adminMeRequest(),
    })
}
import { useQuery } from "@tanstack/react-query";
import { dashboardRequest } from "@/shared/config/api/dashboard/dashboard.request";

export const useDashboardData = (dayRange: number = 30) => {
    return useQuery({
        queryKey: ["dashboard", dayRange],
        queryFn: () => dashboardRequest.getData(dayRange),
    });
};

export const useStatisticsData = (dayRange: number = 30) => {
    return useQuery({
        queryKey: ["statistics", dayRange],
        queryFn: () => dashboardRequest.getStatistics(dayRange),
    });
};

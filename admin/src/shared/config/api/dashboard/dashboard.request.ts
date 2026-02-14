import httpClient from "../httpClient";
import { ENDP_DASHBOARD, ENDP_STATISTICS } from "../URLs";
import { IDashboardData, IStatisticsData } from "./dashboard.model";

export const dashboardRequest = {
    getData: async (dayRange: number = 30) => {
        const response = await httpClient.get<IDashboardData>(ENDP_DASHBOARD, {
            params: { dayRange }
        });
        return response.data;
    },
    getStatistics: async (dayRange: number = 30) => {
        const response = await httpClient.get<IStatisticsData>(ENDP_STATISTICS, {
            params: { dayRange }
        });
        return response.data;
    }
};

export interface IDashboardData {
    overAllSales: {
        _sum: {
            total_price: number | null;
        };
    };
    ordersNumber: number;
    usersNumber: number;
    grownPercentsAtOrders: number;
}

export interface IStatisticsData {
    averageCheckPrice: number;
    dailyAverageOrdersPrice: number;
    monthsOrdersNumber: number;
    newUserCount: number;
    weekSales: { date: string; count: number }[];
    monthSales: { date: string; count: number }[];
    mostSoldProducts: {
        productId: number;
        _sum: {
            quantity: number;
        };
        details: any;
    }[];
    mostSoldSizes: {
        sizeId: number;
        _sum: {
            quantity: number;
        };
        details: any;
    }[];
    mostSoldColors: {
        colorId: number;
        _sum: {
            quantity: number;
        };
        details: any;
    }[];
}

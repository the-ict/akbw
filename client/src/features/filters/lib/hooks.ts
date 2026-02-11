import { useQuery } from "@tanstack/react-query";
import { getColors, getSizes } from "@/features/product/lib/api";

export const useColors = () => {
    return useQuery({
        queryKey: ["colors"],
        queryFn: getColors,
    })
};

export const useSizes = () => {
    return useQuery({
        queryKey: ["sizes"],
        queryFn: getSizes,
    })
}
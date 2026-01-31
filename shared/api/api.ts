import axios from 'axios';
import type { Term } from "@/shared/model/term";
import type {Relation} from "@/shared/model/relation";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    },
    adapter: "fetch"
})

export const getApi = {
    getTerms: async () => axiosInstance.get<Term[]>('/terms'),
    getRelations: async () => axiosInstance.get<Relation[]>('/relations'),
}
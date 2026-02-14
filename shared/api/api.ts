import axios from 'axios';
import type {Term} from "@/shared/model/term";
import type {Relation} from "@/shared/model/relation";

const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SERVER_BASE_URL = process.env.API_URL;

const axiosInstance = axios.create({
    baseURL: SERVER_BASE_URL || CLIENT_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    },
    adapter: "fetch",

})

export const getApi = {
    getTerms: async () => {
        try {
            const response = await axiosInstance.get<Term[]>('/terms');
            return response.data;
        } catch (error) {
            console.error(error)
            return [];
        }
    },
    getRelations: async () => {
        try {
            const response = await axiosInstance.get<Relation[]>('/relations');
            return response.data;
        } catch (error) {
            console.error(error)
            return [];
        }
    },
}
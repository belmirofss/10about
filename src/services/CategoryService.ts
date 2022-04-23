import { AxiosResponse } from "axios";
import { ListCategoriesResponse } from "../interfaces/ListCategoriesResponse";
import { API } from "./API";

export const CategoryService = {
    listAll: (): Promise<AxiosResponse<ListCategoriesResponse>> => API.get('api_category.php')
};
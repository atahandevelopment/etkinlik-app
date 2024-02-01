import api from "@/interceptor";
import { ProductQueryTypes } from "@/types";

export const GetAllProductsService = async (data: ProductQueryTypes) => {
  const { id, title, stock, category, price, in_mainpage, brand } = data;
  let url = "/products?";
  if (id) url += `id=${id}&`;
  if (title) url += `title=${title}&`;
  if (stock) url += `stock=${stock}&`;
  if (in_mainpage) url += `in_mainpage=${in_mainpage}&`;
  if (category) url += `category=${category}&`;
  if (price) url += `price=${price}&`;
  if (brand) url += `brand=${brand}&`;
  return await api.get(url);
};


export const BannerService = async () => {
    return await api.get('/banners');
}
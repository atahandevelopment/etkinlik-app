import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type CategoryTypes = {
  _id: string;
  label: string;
  slug: string;
  parent: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductImageType = {
  _id: string;
  name: string;
  is_main: boolean;
  url: string;
  created_at: string;
  updated_at: string;
};

export type Products = {
  _id: string;
  title: string;
  stock: number;
  category: string;
  price: number;
  in_mainpage: boolean;
  gallery: ProductImageType[];
  image: ProductImageType;
  brand: string;
  created_at: string;
  updated_at: string;
  description: string;
  meta_tags: string[];
};

export type BannerTypes = {
  _id: string;
  url: string;
  title: string;
  image: ProductImageType;
  category: CategoryTypes;
  description: string;
};
export type IndexProps = {
  products: Products[];
  banners: BannerTypes[];
};

export type ProductQueryTypes = {
  id?: string;
  title?: string;
  stock?: number;
  category?: string;
  price?: number;
  in_mainpage?: boolean;
  brand?: string;
};

export type PostMessageTypes = {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
};

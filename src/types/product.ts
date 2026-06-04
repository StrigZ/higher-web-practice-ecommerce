import type {
  productCategories,
  productCharacteristics,
  productCurliness,
  productSortingVariants,
  productStyles,
  productThickness,
} from '@/lib/constants';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  characteristics: ProductCharacteristics;
  inStock: boolean;
  rating: number; // 1–5
  ratingCount: number;
  createdAt: string;
};

export type ProductListResponse = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductSort = (typeof productSortingVariants)[number];
export type ProductCategory = (typeof productCategories)[number];
export type ProductThickness = (typeof productThickness)[number];
export type ProductCurliness = (typeof productCurliness)[number];
export type ProductStyle = (typeof productStyles)[number];
export type ProductCharacteristic = (typeof productCharacteristics)[number];
export type ProductCharacteristics = Record<ProductCharacteristic, string>;
export type ProductSubcategory = string;

export type Filters = {
  searchTerm: string | null;
  category: ProductCategory | null;
  subcategory: ProductSubcategory | null;
  style: string | null;
  thickness: ProductThickness | null;
  curliness: ProductCurliness | null;
  inStock: true | null;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: ProductSort;
};

export type ProductFilterGroup =
  | typeof productCategories
  | typeof productThickness
  | typeof productCurliness
  | typeof productStyles
  | ['В наличии'];

export type ProductRating = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  createdAt: string;
};

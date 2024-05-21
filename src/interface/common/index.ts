export type BannerDto = {
  id: string;
  created_at: string;
  updated_at: string;
  image: string;
  time_to: Date;
  time_from: Date;
  page: string;
  display_location: string;
  is_active: boolean;
};

export type CategoryDto = {
  name: string;
  parent_category_id: string;
  updated_at: Date;
  id: string;
  created_at: Date;
  slug: string;
  image: string;
  supplier_count: number;
};

export interface CategoriesHierarchyDto {
  id: string;
  name: string;
  parent_category_id: string | null;
  child_categories: CategoriesHierarchyDto[];
  image?: string;
}

export type ProductDto = {
  name: string;
  description: string;
  first_category_id: string;
  second_category_id: string;
  third_category_id: string;
  industry: string;
  title: string;
  group: string;
  video: string;
  min_price: number;
  max_price: number;
  unit: string;
  min_order: number;
  min_order_unit: string;
  package: string;
  port: string;
  lead_time: Date;
  is_showcase: boolean;
};
type ImageType = {
  id: string;
  url: string;
};

export type ProductSearchDto = {
  id: string;
  name: string;
  description: string;
  image: ImageType[];
  category: string;
  price: {
    total_range_price: number;
    min_price: number;
    max_price: number;
  };
  min_order: number;
};

export type FilterProductDto = {
  product_category_id?: string | null;
  keyword?: string | null;
  category_ids?: string[];
  countries?: string[];
  from_price?: string;
  to_price?: string;
  moq?: string;
  page?: string | null;
  limit?: string;
};

export type ProductSearchResultDto = {
  products: ProductSearchDto[];
  categories: { [key: string]: string };
  countries: string[];
  metadata: {
    prev_page: number | null;
    current_page: number | null;
    next_page: number | null;
    total_page: number | null;
    limit: number | null;
    total_data: number | null;
  };
};

export type SearchCookiesType = {
  keyword: string;
  id: string | null;
};

export type FilterSupplierDto = {
  keyword?: string | null;
  category_ids?: string[];
  countries?: string[];
};

export type SupplierDto = {
  id: any;
  name: string;
  image: string;
  category: string;
  location: string;
};

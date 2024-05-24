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

export type PriceType = {
  min_amount: string;
  max_amount: string;
  price: string;
};

export type VariantAttriButesType = {
  color?: string[];
  size?: string[];
};

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
  price: PriceType[];
  variant_attributes?: VariantAttriButesType;
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
  slug: string;
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

export type CompanyDto = {
  address: string;
  category_id: string;
  city: string;
  company_name: string;
  country: string;
  created_at: string;
  id: string;
  introduction: string;
  is_feature: boolean;
  number_of_employees: number;
  slug: string;
  state: string;
  type: string;
  updated_at: string;
  user_id: string;
  website: string;
  year_established: number;
};

export type SupplierDto = {
  id: string;
  company_name: string;
  main_category: string;
  country: string;
  image: string;
};

export type PaginationDto = {
  page: number;
  limit: number;
  totalPage?: number;
};

export interface IResponse<T> {
  data: T;
  status: number;
  status_code: number;
}
export type IResponseWithMetadata<T> = {
  data: T;
  code: string;
  message: string;
  metadata?: Metadata;
};

export type Metadata = {
  prev_page: number;
  current_page: number;
  next_page: number;
  total_page: number;
  limit: number;
  total_data: number;
};

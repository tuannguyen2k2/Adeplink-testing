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

export type PriceProductDetailType = {
  min_amount: string;
  max_amount: string;
  price: string;
};

export type PriceProductListType = {
  total_range_price: number;
  min_price: number;
  max_price: number;
};

export type VariantAttriButesType = {
  color?: string[];
  size?: string[];
  package?: string[];
  weight?: string[];
};

export type TemporaryCartType = {
  name: string | false;
  color?: string;
  package?: string;
  size?: string;
  weight?: string;
  orderQuantity: number;
  unitPrice: string | null;
};

export type VariantCartType = {
  id: string;
  name: string;
  price: number;
  min_order: number;
  quantity: number;
  subtotal: number;
};

export type ProductCartType = {
  id: string;
  name: string;
  price: number;
  min_order: number;
  quantity: number;
  subtotal: number;
  image: string;
  range_price: PriceProductDetailType[];
  variant: VariantCartType[];
};
export type SupplierCartType = {
  id: string;
  name: string;
  product: ProductCartType[];
};

export type CartType = {
  items: SupplierCartType[];
  total_price: number;
  total_items: number;
};

export type ProductDto = {
  category?: string;
  id: string;
  name: string;
  description: string;
  industry: string;
  title: string;
  group: string;
  video: string;
  min_price: number;
  max_price: number;
  unit: string;
  min_order: number;
  min_order_unit: string;
  port: string;
  lead_time: Date;
  is_showcase: boolean;
  price: PriceProductListType;
  image: ImageType[];
  variant_attributes?: VariantAttriButesType;
  slug: string;
};

export type ProductDetailDto = {
  id: string;
  name: string;
  description: string;
  industry: string;
  title: string;
  group: string;
  video: string;
  min_price: number;
  max_price: number;
  unit: string;
  min_order: number;
  min_order_unit: string;
  port: string;
  lead_time: Date;
  is_showcase: boolean;
  price: PriceProductDetailType[];
  image: ImageType[];
  recommend_products: ProductDto[];
  supplier: SupplierDto;
  supplier_products: ProductDto[];
  variant_attributes?: VariantAttriButesType;
};
export type ImageType = {
  updated_at: Date;
  created_at: Date;
  id: string;
  image_url: string;
};

export type ProductSearchDto = {
  id: string;
  name: string;
  description: string;
  image: ImageType[];
  category: string;
  price: PriceProductListType;
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
  slug: string;
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

export type GetRecommendSupplierType = {
  id: string;
  company_name: string;
  is_feature: boolean;
  image: string;
  product_category_id: string;
  category_name: string;
  slug: string;
  country: string;
};

export type SupplierDetailDto = {
  company: {
    email: string;
    phone: string;
    type: string;
    country: string;
    city: string;
    year_established: number;
    is_feature: boolean;
    updated_at: string;
    slug: string;
    introduction: string;
    category_id: string;
    category_name: string;
    company_name: string;
    website: string;
    state: string;
    address: string;
    number_of_employees: number;
    id: string;
    created_at: string;
    user_id: string;
    image: string;
  };
  category: [
    {
      id: string;
      name: string;
    }
  ];
};

export type PaginationDto = {
  page: number;
  limit: number;
  totalPage?: number;
};

export type RatingFilter = {
  star: number | null;
  with_media: boolean | null;
};

export type VariantType = {
  variant: {
    id: string;
  };

  images: ImageType[];
};

export type ProductRatingDto = {
  product_vote: {
    vote_count: number;
    created_at: string;
    product_id: string;
    vote_one_star_count: number;
    vote_three_star_count: number;
    vote_five_star_count: number;
    id: string;
    updated_at: string;
    vote_average_score: number;
    vote_two_star_count: number;
    vote_four_star_count: number;
  };
  product_user_vote_list: [
    {
      images: [string];
      id: string;
      user_id: string;
      comment: null;
      vote_score: number;
      created_at: string;
      user_name: string;
      replies: string[];
    }
  ];
};

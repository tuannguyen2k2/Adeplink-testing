import { ICity, ICountry, IState } from "country-state-city";

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
  [key: string]: string[];
};

export type TemporaryCartType = {
  name: string | false;
  attributeCartTemporary: { [key: string]: string[] };
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
  is_tick: boolean;
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
  is_tick: boolean;
  slug: string;
};
export type SupplierCartType = {
  id: string;
  name: string;
  is_tick: boolean;
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
  variant_attributes: VariantAttriButesType;
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
  variant_attributes: VariantAttriButesType;
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

export type FilterProductOfSupplierDto = {
  company_slug: string;
  category_id?: string;
  page: string;
  limit: string;
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
  slug: string | null;
};

export type FilterSupplierDto = {
  keyword?: string | null;
  category_ids?: string[];
  countries?: string[];
  page?: number;
  limit?: number;
  is_newest?: boolean;
  is_sorted?: boolean;
};

export type GetSearchSupplierType = {
  companies: SupplierDto[];
  categories: Object;
  countries: string[];
  metadata: Metadata;
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

export type AddressFormType = {
  company: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  street: string;
  street_number: string;
  id: string;
  is_default: boolean;
  is_save_later_use?: boolean;
};

export type ListAddressesType = {
  email: string;
  name: string;
  phone: string;
  is_supplier: boolean;
  id: string;
  is_active: boolean;
  addresses: AddressType[];
};

export type AddressDto = {
  company: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  street?: string;
  street_number?: string;
  is_default?: boolean;
};

export type AddressType = {
  company: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  is_default?: boolean;
  id: string;
};

export type SupplierOrderType = SupplierCartType & {
  shipping_method: {
    name: string;
    price: string;
  };
};

export type OrderFormType = {
  link: {
    success: string;
    failure: string;
  };
  shipping_address: {
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
    address_line1: string;
    address_line2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    company: string;
  };
  billing_address: {
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
    address_line1: string;
    address_line2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    company: string;
  };
  total_price: number;
  total_item: number;
  fee: number;
  items: SupplierOrderType[];
};

export type OrderResponseType = {
  id: string;
  status: string;
  links: { href: string; rel: string; method: string }[];
};

export type CountryType = {
  name: string;
  phoneCode: string;
  isoCode: string;
};

export type StateType = {
  province_id: string;
  province_name: string;
  province_type: string;
  province_iso_code?: string;
};

export type CityType = {
  district_id: string;
  district_name: string;
};

export interface IFormInputComponentRef {
  blur: () => void;
  focus: () => void;
}

export interface IFormInputComponentProps<T = any> {
  id?: string;
  name?: string;
  value?: T | null;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onFocus?: () => void;
}

export interface IOption {
  id?: any;
  label: string;
  value: any;
}

export type OrderReviewType = OrderFormType & {
  check_same_billing_address: boolean;
  payment_method: 0 | 1;
  card_information: PaymentForm;
};

export interface PaymentForm {
  cardholder: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: number;
  amount: number;
}

export type ChangePasswordFormType = {
  old_password: string;
  new_password: string;
  confirmed_password: string;
};

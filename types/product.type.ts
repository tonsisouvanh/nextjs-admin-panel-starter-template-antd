export interface ProductType {
  id?: number;
  product_number?: number;
  name?: string;
  code?: string;
  short_description?: string;
  long_description?: string;
  price?: string;
  sku?: null;
  images?: null;
  size?: string;
  bundleproducts?: BundleProductType[];
  category_id?: null;
  supplier_id?: null;
  quantity?: number;
  reorder_level?: number;
  active_at?: Date;
  pack?: number;
  type?: string;
  created_at?: Date;
  updated_at?: Date;
  category?: null;
}

export interface ProductTableFilterType {
  name?: string;
  date?: Date | null;
  status?: string;
  search?: string;
}

export interface BundleProductType {
  bundle_productId?: number;
  code?: string;
  name: string;
  price: string;
  storage_type?: string;
  quantity?: number;
  pack?: number;
  images?: string;
}

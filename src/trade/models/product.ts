import type { BaseResource } from '../../common/models';

export interface Product extends BaseResource {
  name: string;
  sku?: string;
  barcode?: string;
  description?: string;
  categoryId?: string;
  categoryName?: string;
  unitPrice: number;
  costPrice?: number;
  currency: string;
  taxId?: string;
  unit?: string;
  stockQuantity: number;
  minStockLevel?: number;
  isActive: boolean;
  type: string;
  typeLabel: string;
  images?: string[];
}

export interface CreateProductRequest {
  name: string;
  sku?: string;
  barcode?: string;
  description?: string;
  categoryId?: string;
  unitPrice: number;
  costPrice?: number;
  currency?: string;
  taxId?: string;
  unit?: string;
  minStockLevel?: number;
  type?: string;
}

export interface UpdateProductRequest {
  name?: string;
  sku?: string;
  barcode?: string;
  description?: string;
  categoryId?: string;
  unitPrice?: number;
  costPrice?: number;
  taxId?: string;
  unit?: string;
  minStockLevel?: number;
  isActive?: boolean;
}

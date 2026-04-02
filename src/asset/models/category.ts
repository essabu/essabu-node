import type { BaseResource } from '../../common/models';

export interface AssetCategory extends BaseResource {
  name: string;
  code?: string;
  description?: string;
  parentId?: string;
  parentName?: string;
  defaultUsefulLifeMonths?: number;
  defaultDepreciationMethod?: string;
  assetCount: number;
}

export interface CreateAssetCategoryRequest {
  name: string;
  code?: string;
  description?: string;
  parentId?: string;
  defaultUsefulLifeMonths?: number;
  defaultDepreciationMethod?: string;
}

export interface UpdateAssetCategoryRequest {
  name?: string;
  code?: string;
  description?: string;
  parentId?: string;
  defaultUsefulLifeMonths?: number;
  defaultDepreciationMethod?: string;
}

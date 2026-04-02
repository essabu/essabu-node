import type { HttpClientInterface } from '../common/models';
import { AssetsApi } from './api/assets';
import { AssetCategoriesApi } from './api/categories';
import { DepreciationsApi } from './api/depreciations';

/**
 * Asset module client.
 */
export class AssetClient {
  private _assets?: AssetsApi;
  private _categories?: AssetCategoriesApi;
  private _depreciations?: DepreciationsApi;

  constructor(private readonly httpClient: HttpClientInterface) {}

  get assets(): AssetsApi {
    return (this._assets ??= new AssetsApi(this.httpClient));
  }

  get categories(): AssetCategoriesApi {
    return (this._categories ??= new AssetCategoriesApi(this.httpClient));
  }

  get depreciations(): DepreciationsApi {
    return (this._depreciations ??= new DepreciationsApi(this.httpClient));
  }
}

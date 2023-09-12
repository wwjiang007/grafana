import { from, Observable } from 'rxjs';

import {
  DataQuery,
  DataQueryRequest,
  DataQueryResponse,
  TestDataSourceResponse,
  DataSourceApi,
  DataSourceJsonData,
  DataSourcePluginMeta,
  DataSourceRef,
} from '@grafana/data';
import { publicDashboardQueryHandler } from '@grafana/runtime/src/utils/publicDashboardQueryHandler';

export const PUBLIC_DATASOURCE = '-- Public --';
export const DEFAULT_INTERVAL = '1min';

export class PublicDashboardDataSource extends DataSourceApi<DataQuery, DataSourceJsonData, {}> {
  constructor(datasource: DataSourceRef | string | DataSourceApi | null) {
    let meta = {} as DataSourcePluginMeta;

    super({
      name: 'public-ds',
      id: 0,
      type: 'public-ds',
      meta,
      uid: PublicDashboardDataSource.resolveUid(datasource),
      jsonData: {},
      access: 'proxy',
      readOnly: true,
    });
  }

  /**
   * Get the datasource uid based on the many types a datasource can be.
   */
  private static resolveUid(datasource: DataSourceRef | string | DataSourceApi | null): string {
    if (typeof datasource === 'string') {
      return datasource;
    }

    return datasource?.uid ?? PUBLIC_DATASOURCE;
  }
  /**
   * Ideally final -- any other implementation may not work as expected
   */
  query(request: DataQueryRequest<DataQuery>): Observable<DataQueryResponse> {
    return from(publicDashboardQueryHandler(request));
  }

  testDatasource(): Promise<TestDataSourceResponse> {
    return Promise.resolve({ message: '', status: '' });
  }

  // Try to get the browser timezone otherwise return blank
  getBrowserTimezone(): string {
    return window.Intl?.DateTimeFormat().resolvedOptions()?.timeZone || '';
  }
}

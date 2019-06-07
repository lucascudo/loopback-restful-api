import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mundipagg.datasource.json';

export class MundipaggDataSource extends juggler.DataSource {
  static dataSourceName = 'mundipagg';

  constructor(
    @inject('datasources.config.mundipagg', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

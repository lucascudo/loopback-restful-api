import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {MundipaggDataSource} from '../datasources/mundipagg.datasource';
import {MundipaggCustomer} from '../models';

export interface MundipaggService {
  createCustomer(customer: object): Promise<MundipaggCustomer>;
  createOrder(order: object): Promise<object>;
}

export class MundipaggServiceProvider implements Provider<MundipaggService> {
  constructor(
    @inject('datasources.mundipagg')
    protected dataSource: juggler.DataSource = new MundipaggDataSource(),
  ) {}

  value(): Promise<MundipaggService> {
    return getService(this.dataSource);
  }
}

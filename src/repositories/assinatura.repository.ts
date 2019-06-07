import {DefaultCrudRepository} from '@loopback/repository';
import {Assinatura, AssinaturaRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AssinaturaRepository extends DefaultCrudRepository<
  Assinatura,
  typeof Assinatura.prototype.id,
  AssinaturaRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Assinatura, dataSource);
  }
}

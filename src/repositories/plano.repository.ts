import {DefaultCrudRepository} from '@loopback/repository';
import {Plano, PlanoRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlanoRepository extends DefaultCrudRepository<
  Plano,
  typeof Plano.prototype.id,
  PlanoRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Plano, dataSource);
  }
}

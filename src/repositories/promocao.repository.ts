import {DefaultCrudRepository} from '@loopback/repository';
import {Promocao, PromocaoRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PromocaoRepository extends DefaultCrudRepository<
  Promocao,
  typeof Promocao.prototype.id,
  PromocaoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Promocao, dataSource);
  }
}

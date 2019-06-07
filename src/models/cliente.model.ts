import {Entity, model, property} from '@loopback/repository';
import {Cartao, MundipaggCustomer} from '.';

@model({settings: {}})
export class Cliente extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    id: true,
    required: true,
  })
  email: string;

  @property({
    type: 'object',
  })
  cartao?: Cartao;

  @property({
    type: 'object',
  })
  mundipaggCustomer: MundipaggCustomer;

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  orders: Array<object>;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;

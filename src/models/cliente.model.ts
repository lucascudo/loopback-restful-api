import {Entity, model, property} from '@loopback/repository';
import {
  Cartao,
  MundipaggCustomer,
  MundipaggOrder,
  MundipaggSubscription,
} from '.';

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
    required: true,
  })
  cartao: Cartao;

  @property({
    type: 'object',
  })
  mundipaggCustomer: MundipaggCustomer;

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  orders: MundipaggOrder[];

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  subscriptions: MundipaggSubscription[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;

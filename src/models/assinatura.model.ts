import { Entity, model, property } from '@loopback/repository';
import { Cliente, Cartao, Produto } from '.';

@model({ settings: {} })
export class Assinatura extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'object',
    required: true,
  })
  cliente: Cliente;

  @property({
    type: 'object',
    required: true,
  })
  cartao: Cartao;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  produtos: Array<Produto>;

  constructor(data?: Partial<Assinatura>) {
    super(data);
  }
}

export interface AssinaturaRelations {
  // describe navigational properties here
}

export type AssinaturaWithRelations = Assinatura & AssinaturaRelations;


import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Promocao extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  condicoes: object;

  constructor(data?: Partial<Promocao>) {
    super(data);
  }
}

export interface PromocaoRelations {
  // describe navigational properties here
}

export type PromocaoWithRelations = Promocao & PromocaoRelations;

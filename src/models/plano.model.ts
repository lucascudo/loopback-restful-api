import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Plano extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'number',
    required: true,
    default: 0.0,
  })
  preco: number;

  @property({
    type: 'number',
    required: true,
    default: 1,
  })
  intervalo: number;

  @property({
    type: 'number',
  })
  saltarDias?: number;

  constructor(data?: Partial<Plano>) {
    super(data);
  }
}

export interface PlanoRelations {
  // describe navigational properties here
}

export type PlanoWithRelations = Plano & PlanoRelations;

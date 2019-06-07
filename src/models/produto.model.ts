import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Produto extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  plano_id: string;

  constructor(data?: Partial<Produto>) {
    super(data);
  }
}

export default Produto;

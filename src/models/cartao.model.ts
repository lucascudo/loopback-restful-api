import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Cartao extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'string',
    required: true,
  })
  cvv: string;

  @property({
    type: 'number',
    required: true,
  })
  expiracao_mes: number;

  @property({
    type: 'number',
    required: true,
  })
  expiracao_ano: number;

  @property({
    type: 'string',
    required: true,
  })
  portador: string;

  constructor(data?: Partial<Cartao>) {
    super(data);
  }
}

export default Cartao;

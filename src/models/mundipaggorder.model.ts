import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class MundipaggOrder extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  plano_id: string;

  constructor(data?: Partial<MundipaggOrder>) {
    super(data);
  }
}

export default MundipaggOrder;

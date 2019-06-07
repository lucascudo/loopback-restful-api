import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class MundipaggCustomer extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'boolean',
  })
  delinquent?: boolean;

  @property({
    type: 'string',
  })
  created_at?: string;

  @property({
    type: 'string',
  })
  updated_at?: string;

  constructor(data?: Partial<MundipaggCustomer>) {
    super(data);
  }
}

export default MundipaggCustomer;

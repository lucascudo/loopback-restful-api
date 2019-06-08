import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class MundipaggSubscription extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  constructor(data?: Partial<MundipaggSubscription>) {
    super(data);
  }
}

export default MundipaggSubscription;

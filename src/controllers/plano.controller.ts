import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Plano} from '../models';
import {PlanoRepository} from '../repositories';

export class PlanoController {
  constructor(
    @repository(PlanoRepository)
    public planoRepository : PlanoRepository,
  ) {}

  @post('/planos', {
    responses: {
      '200': {
        description: 'Plano model instance',
        content: {'application/json': {schema: {'x-ts-type': Plano}}},
      },
    },
  })
  async create(@requestBody() plano: Plano): Promise<Plano> {
    return await this.planoRepository.create(plano);
  }

  @get('/planos/count', {
    responses: {
      '200': {
        description: 'Plano model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Plano)) where?: Where<Plano>,
  ): Promise<Count> {
    return await this.planoRepository.count(where);
  }

  @get('/planos', {
    responses: {
      '200': {
        description: 'Array of Plano model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Plano}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Plano)) filter?: Filter<Plano>,
  ): Promise<Plano[]> {
    return await this.planoRepository.find(filter);
  }

  @patch('/planos', {
    responses: {
      '200': {
        description: 'Plano PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() plano: Plano,
    @param.query.object('where', getWhereSchemaFor(Plano)) where?: Where<Plano>,
  ): Promise<Count> {
    return await this.planoRepository.updateAll(plano, where);
  }

  @get('/planos/{id}', {
    responses: {
      '200': {
        description: 'Plano model instance',
        content: {'application/json': {schema: {'x-ts-type': Plano}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Plano> {
    return await this.planoRepository.findById(id);
  }

  @patch('/planos/{id}', {
    responses: {
      '204': {
        description: 'Plano PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() plano: Plano,
  ): Promise<void> {
    await this.planoRepository.updateById(id, plano);
  }

  @put('/planos/{id}', {
    responses: {
      '204': {
        description: 'Plano PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() plano: Plano,
  ): Promise<void> {
    await this.planoRepository.replaceById(id, plano);
  }

  @del('/planos/{id}', {
    responses: {
      '204': {
        description: 'Plano DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.planoRepository.deleteById(id);
  }
}

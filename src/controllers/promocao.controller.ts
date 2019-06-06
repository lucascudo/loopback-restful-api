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
import {Promocao} from '../models';
import {PromocaoRepository} from '../repositories';

export class PromocaoController {
  constructor(
    @repository(PromocaoRepository)
    public promocaoRepository : PromocaoRepository,
  ) {}

  @post('/promocaos', {
    responses: {
      '200': {
        description: 'Promocao model instance',
        content: {'application/json': {schema: {'x-ts-type': Promocao}}},
      },
    },
  })
  async create(@requestBody() promocao: Promocao): Promise<Promocao> {
    return await this.promocaoRepository.create(promocao);
  }

  @get('/promocaos/count', {
    responses: {
      '200': {
        description: 'Promocao model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Promocao)) where?: Where<Promocao>,
  ): Promise<Count> {
    return await this.promocaoRepository.count(where);
  }

  @get('/promocaos', {
    responses: {
      '200': {
        description: 'Array of Promocao model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Promocao}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Promocao)) filter?: Filter<Promocao>,
  ): Promise<Promocao[]> {
    return await this.promocaoRepository.find(filter);
  }

  @patch('/promocaos', {
    responses: {
      '200': {
        description: 'Promocao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() promocao: Promocao,
    @param.query.object('where', getWhereSchemaFor(Promocao)) where?: Where<Promocao>,
  ): Promise<Count> {
    return await this.promocaoRepository.updateAll(promocao, where);
  }

  @get('/promocaos/{id}', {
    responses: {
      '200': {
        description: 'Promocao model instance',
        content: {'application/json': {schema: {'x-ts-type': Promocao}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Promocao> {
    return await this.promocaoRepository.findById(id);
  }

  @patch('/promocaos/{id}', {
    responses: {
      '204': {
        description: 'Promocao PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() promocao: Promocao,
  ): Promise<void> {
    await this.promocaoRepository.updateById(id, promocao);
  }

  @put('/promocaos/{id}', {
    responses: {
      '204': {
        description: 'Promocao PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() promocao: Promocao,
  ): Promise<void> {
    await this.promocaoRepository.replaceById(id, promocao);
  }

  @del('/promocaos/{id}', {
    responses: {
      '204': {
        description: 'Promocao DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.promocaoRepository.deleteById(id);
  }
}

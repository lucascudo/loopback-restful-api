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
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
  ) {}

  @post('/clientes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: {'x-ts-type': Cliente}}},
      },
    },
  })
  async create(@requestBody() cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.create(cliente);
  }

  @get('/clientes/count', {
    responses: {
      '200': {
        description: 'Cliente model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return await this.clienteRepository.count(where);
  }

  @get('/clientes', {
    responses: {
      '200': {
        description: 'Array of Cliente model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Cliente}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Cliente)) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return await this.clienteRepository.find(filter);
  }

  @patch('/clientes', {
    responses: {
      '200': {
        description: 'Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() cliente: Cliente,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return await this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: {'x-ts-type': Cliente}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Cliente> {
    return await this.clienteRepository.findById(id);
  }

  @patch('/clientes/{id}', {
    responses: {
      '204': {
        description: 'Cliente PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}', {
    responses: {
      '204': {
        description: 'Cliente PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}', {
    responses: {
      '204': {
        description: 'Cliente DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}

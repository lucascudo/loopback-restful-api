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
  HttpErrors,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import {Cliente, Assinatura, Plano, MundipaggSubscription} from '../models';
import {
  ClienteRepository,
  AssinaturaRepository,
  PlanoRepository,
} from '../repositories';
import {MundipaggService} from '../services';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(AssinaturaRepository)
    public assinaturaRepository: AssinaturaRepository,
    @repository(PlanoRepository)
    public planoRepository: PlanoRepository,
    @inject('services.MundipaggService')
    protected mundipaggService: MundipaggService,
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
    @param.query.object('where', getWhereSchemaFor(Cliente))
    where?: Where<Cliente>,
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
    @param.query.object('filter', getFilterSchemaFor(Cliente))
    filter?: Filter<Cliente>,
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
    @param.query.object('where', getWhereSchemaFor(Cliente))
    where?: Where<Cliente>,
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

  @post('/clientes/assinar', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: {'x-ts-type': Cliente}}},
      },
    },
  })
  async assinar(@requestBody() data: Assinatura): Promise<Cliente> {
    let startAt: Date;
    let subscription: object;
    let plano: Plano;
    let mundipaggSubscription: MundipaggSubscription;
    let cliente: Cliente = Object.assign({}, data.cliente);
    if (!cliente.nome) {
      throw new HttpErrors.BadRequest('nome é obrigatório');
    }
    if (!cliente.email) {
      throw new HttpErrors.BadRequest('email é obrigatório');
    }
    cliente.cartao = data.cartao;
    cliente.mundipaggCustomer = await this.mundipaggService.createCustomer({
      name: cliente.nome,
      email: cliente.email,
    });
    cliente.subscriptions = [];
    data.produtos = data.produtos.filter(produto => produto.tipo === 'plano');
    for (const i in data.produtos) {
      /*eslint-disable @typescript-eslint/camelcase*/
      plano = await this.planoRepository.findById(data.produtos[i].plano_id);
      startAt = new Date();
      if (plano.saltarDias) {
        startAt.setDate(startAt.getDate() + plano.saltarDias);
      }
      subscription = {
        code: cliente.mundipaggCustomer.id + '_' + plano.id,
        customer_id: cliente.mundipaggCustomer.id,
        currency: 'BRL',
        interval: 'month',
        interval_count: plano.intervalo,
        billing_type: 'prepaid',
        installments: 1,
        minimun_price: plano.preco,
        start_at: startAt.toJSON(),
        payment_method: 'credit_card',
        card: {
          number: data.cartao.numero,
          exp_month: data.cartao.expiracao_mes,
          exp_year: data.cartao.expiracao_ano,
          cvv: data.cartao.cvv,
          holder_name: data.cartao.dono,
        },
        items: [
          {
            description: plano.nome,
            quantity: 1,
            pricing_scheme: {
              price: plano.preco,
            },
          },
        ],
      };
      mundipaggSubscription = await this.mundipaggService.createSubscription(
        subscription,
      );
      cliente.subscriptions.push(mundipaggSubscription);
      /*eslint-enable @typescript-eslint/camelcase*/
    }
    cliente = await this.clienteRepository.create(cliente);
    this.assinaturaRepository.create(data);
    return cliente;
  }
}

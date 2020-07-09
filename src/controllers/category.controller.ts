import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Category} from '../models';
import {CategoryRepository} from '../repositories';
import {basicAuthorization} from '../services/basic.authorization';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';

@authenticate('jwt')
export class CategoryController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) {}

  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  @post('/categories', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    category: Omit<Category, 'id'>,
  ): Promise<Category> {
    return this.categoryRepository.create(category);
  }

  @authorize({allowedRoles: ['admin', 'user'], voters: [basicAuthorization]})
  @get('/categories/count', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Category model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Category) where?: Where<Category>): Promise<Count> {
    return this.categoryRepository.count(where);
  }

  @authorize({allowedRoles: ['admin', 'user'], voters: [basicAuthorization]})
  @get('/categories', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of Category model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Category, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Category) filter?: Filter<Category>,
  ): Promise<Category[]> {
    const res = this.categoryRepository.find(filter);
    console.log(res);
    return res;
  }

  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  @patch('/categories', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Category PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Category,
    @param.where(Category) where?: Where<Category>,
  ): Promise<Count> {
    return this.categoryRepository.updateAll(category, where);
  }

  @authorize({allowedRoles: ['admin', 'user'], voters: [basicAuthorization]})
  @get('/categories/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Category model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.filter(Category, {exclude: 'where'})
    filter?: FilterExcludingWhere<Category>,
  ): Promise<Category> {
    return this.categoryRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  @patch('/categories/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Category PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Category,
  ): Promise<void> {
    await this.categoryRepository.updateById(id, category);
  }

  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  @put('/categories/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Category PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() category: Category,
  ): Promise<void> {
    await this.categoryRepository.replaceById(id, category);
  }

  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  @del('/categories/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Category DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.categoryRepository.deleteById(id);
  }
}

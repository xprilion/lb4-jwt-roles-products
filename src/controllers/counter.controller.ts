import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {get} from '@loopback/rest';
import {basicAuthorization} from '../services/basic.authorization';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';
import {CounterSchema} from './specs/counter.controller.spec';

@authenticate('jwt')
export class CounterController {
  // user with ADMIN role can see the number of views
  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  @get('/number-of-views', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The counter',
        content: {
          'application/json': {
            schema: CounterSchema,
          },
        },
      },
    },
  })
  numOfViews(): number {
    return 100;
  }
}

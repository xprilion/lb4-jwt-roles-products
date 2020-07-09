export const CredentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export const UserProfileSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    email: {type: 'string'},
    name: {type: 'string'},
    roles: {type: 'object'},
  },
};

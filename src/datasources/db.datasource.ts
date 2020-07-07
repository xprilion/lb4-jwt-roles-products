// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'mongodb',
  url:
    'mongodb+srv://1kuser:XCWCXcfpp8o3sx1S@demoadmin.p6cia.gcp.mongodb.net/demoadmin?retryWrites=true&w=majority',
  host: 'demoadmin.p6cia.gcp.mongodb.net',
  port: 27017,
  user: '1kuser',
  password: 'XCWCXcfpp8o3sx1S',
  database: 'demoadmin',
  useNewUrlParser: true,
};

export class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

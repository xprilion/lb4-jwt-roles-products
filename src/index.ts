import {ApplicationConfig} from '@loopback/core';
import {DemoAdminApplication} from './application';

export {DemoAdminApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new DemoAdminApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

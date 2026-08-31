import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

/** Used only by the build-time prerender pass — see `main.server.ts`. */
export const config = mergeApplicationConfig(appConfig, serverConfig);

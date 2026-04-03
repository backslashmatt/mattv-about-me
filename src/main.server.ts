import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

enableProdMode();

const bootstrap = () => bootstrapApplication(AppComponent, appConfig);

export default async function render(
  url: string,
  document: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _options?: any
) {
  const html = await renderApplication(bootstrap, {
    document,
    url,
  });
  return html;
}

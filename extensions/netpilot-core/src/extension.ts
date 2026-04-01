import * as vscode from 'vscode';

import { NetPilotCoreApi } from './api.js';
import { NetPilotHttpClient } from './http/client.js';
import { NetPilotWsConnection } from './ws/connection.js';

export async function activate(context: vscode.ExtensionContext): Promise<NetPilotCoreApi> {
  const httpClient = new NetPilotHttpClient('http://localhost:3737/api/v1');
  const wsConnection = new NetPilotWsConnection('ws://localhost:3737/ws/events');
  const api = new NetPilotCoreApi(httpClient, wsConnection);

  context.subscriptions.push(
    vscode.commands.registerCommand('np.backend.reconnect', () => {
      void api;
    }),
  );

  return api;
}

export async function deactivate(): Promise<void> {
}
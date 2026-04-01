import type {
  DeviceDetailResponse,
  TerminalAssistResponse,
  TerminalCompletionRequest,
  TerminalSessionOpenRequest,
  TerminalSessionOpenResponse,
  WebviewRequest,
  WebviewResponse,
  WsMessage,
} from '@netpilot/shared-types';

import { NetPilotHttpClient } from './http/client.js';
import { NetPilotWsConnection } from './ws/connection.js';

export class NetPilotCoreApi {
  public constructor(
    private readonly httpClient: NetPilotHttpClient,
    private readonly wsConnection: NetPilotWsConnection,
  ) {}

  public async getDeviceDetail(deviceId: string): Promise<DeviceDetailResponse> {
    return this.httpClient.get<DeviceDetailResponse>(`/devices/${deviceId}`);
  }

  public async openTerminalSession(
    request: TerminalSessionOpenRequest,
  ): Promise<TerminalSessionOpenResponse> {
    return this.httpClient.post<TerminalSessionOpenResponse>('/devices/' + request.deviceId + '/terminal/sessions', request);
  }

  public async requestTerminalCompletion(
    request: TerminalCompletionRequest,
  ): Promise<TerminalAssistResponse> {
    return this.httpClient.post<TerminalAssistResponse>('/terminal/completion', request);
  }

  public sendWsMessage(message: WsMessage): void {
    this.wsConnection.send(message);
  }

  public postWebviewRequest(message: WebviewRequest): void {
    this.wsConnection.postWebview(message);
  }

  public handleWebviewResponse(message: WebviewResponse): void {
    this.wsConnection.handleWebviewResponse(message);
  }
}
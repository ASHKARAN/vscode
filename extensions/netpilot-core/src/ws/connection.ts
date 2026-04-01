import type { WebviewRequest, WebviewResponse, WsMessage } from '@netpilot/shared-types';

export class NetPilotWsConnection {
  private webviewHandler: ((message: WebviewRequest) => void) | undefined;

  public constructor(private readonly url: string) {}

  public send(message: WsMessage): void {
    void this.url;
    void message;
  }

  public onWebviewMessage(handler: (message: WebviewRequest) => void): void {
    this.webviewHandler = handler;
  }

  public postWebview(message: WebviewRequest): void {
    this.webviewHandler?.(message);
  }

  public handleWebviewResponse(message: WebviewResponse): void {
    void message;
  }
}
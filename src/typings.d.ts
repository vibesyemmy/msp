/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var socket :SocketIOModule;
interface SocketIOModule  {
  e: any;
}

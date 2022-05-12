declare namespace ws {
  function connect(): void;
  function send(destination: string, message: string): void;
  function subscribe(top:string,callback:(message:any)=>void):void;
}
export default ws;
export {};

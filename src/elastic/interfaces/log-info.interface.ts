export interface ILogInfo {
  timestamp: string;
  headers: Headers;
  request_body: string;
  method: string;
  url: string;
  _response?: string,
  statusCode?: any,
  ip_addresss:string,
  tracking_code: string
}

import { ILogInfo } from "./log-info.interface";

export const ELASTIC_SERVICE = "Elastic Service"
export interface IElasticService {
  logSlowQuery(arg0: { time: number; query: string; parameters: string }): unknown;
  log_info(body: ILogInfo);
}
import { ELASTIC_INDEX_PREFIX } from "src/config/elastic.config";

export const LOG_API = `${ELASTIC_INDEX_PREFIX}-api-logs`;
export const LOG_ERROR = `${ELASTIC_INDEX_PREFIX}-error-logs`;
export const LOG_QUERY = `${ELASTIC_INDEX_PREFIX}-query-logs`;
export const SLOW_QUERY = `${ELASTIC_INDEX_PREFIX}-slow-query-logs`;
export const LOG_GRPC_ERROR = `${ELASTIC_INDEX_PREFIX}-grpc-errors-log`;
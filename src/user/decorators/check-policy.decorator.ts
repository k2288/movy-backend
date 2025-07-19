import { SetMetadata } from "@nestjs/common";

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = <T>(...handlers: T[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
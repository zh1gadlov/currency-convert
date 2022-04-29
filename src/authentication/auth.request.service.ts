import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class AuthRequestService {
  constructor() {}

  public isAuthorized(): boolean {
    return true;
  }
}

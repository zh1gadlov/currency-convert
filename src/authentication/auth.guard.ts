import {
  CanActivate,
  Inject,
  Injectable, Scope
} from '@nestjs/common';
import { AuthRequestService } from './auth.request.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthRequestService)
    private readonly authRequestService
  ) {}

  public async canActivate(): Promise<boolean> {
    const isAuthorized = this.authRequestService.isAuthorized();

    return isAuthorized;
  }
}

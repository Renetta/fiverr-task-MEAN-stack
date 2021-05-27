import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authtoken = this.service.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authtoken)
    });

    return next.handle(authRequest);
  }

}

import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.clone({setHeaders: {'Content-Type': 'application/json'}});
    let token = this.authService.token;
    if (token != null) {
      const authReq = req.clone({setHeaders: {Authorization: 'Bearer ' + token}});
      return next.handle(authReq);
    }
    return next.handle(req)
  }
}

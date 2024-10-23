import {HttpInterceptorFn,
} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  const localToken = localStorage.getItem("token") || token;
  console.log("l", localToken)

  if(localToken != null) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localToken}`)
    });
    return next(authReq);
  } else {
    return next(req);
  }
};


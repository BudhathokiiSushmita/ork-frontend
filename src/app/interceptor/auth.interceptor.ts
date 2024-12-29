import {HttpInterceptorFn,
} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {TokenService} from "../service/token.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();
  const tokenService = inject(TokenService);

  const localToken = localStorage.getItem("token") || token;
  console.log("l", localToken)

  if(localToken != null) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localToken}`)
    });
    return next(authReq).pipe(
      catchError((error) => {
        if (error.status === 401 && !tokenService.isOpen) {

          //Cannot use NgbModal to open Modal directly because HttpInterceptor are executed outside the
          // angular component tree meaning cannot directly inject Angular UI services.
          tokenService.openTokenExpiredModal();
        }
        return throwError(error);  // Propagate the error
      })
    )
  } else {
    return next(req);
  }
};


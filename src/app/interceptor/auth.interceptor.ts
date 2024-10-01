import {HttpInterceptorFn,
} from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("l", localStorage.getItem("token"))
  if(localStorage.getItem("token") != null) {
    const localToken = localStorage.getItem("token");
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localToken}`)
    });
    return next(authReq);
  } else {
    return next(req);
  }
};

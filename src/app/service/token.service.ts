import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenExpireModalComponent} from "../component/token-expire-modal/token-expire-modal.component";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isOpen = false;

  constructor(
    private ngbModal: NgbModal
  ) { }

  openTokenExpiredModal() {{
    this.isOpen = true;
    const modal = this.ngbModal.open(TokenExpireModalComponent);
    modal.result.then(() => {
      this.isOpen = false;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("roleType");
    })
  }}
}

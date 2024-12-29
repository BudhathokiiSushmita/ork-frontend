import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-token-expire-modal',
  standalone: true,
  imports: [],
  templateUrl: './token-expire-modal.component.html',
  styleUrl: './token-expire-modal.component.css'
})
export class TokenExpireModalComponent implements OnInit{

  constructor(
    private router: Router,
    private ngbActiveModal: NgbActiveModal,
  ) {
  }
  ngOnInit(): void {
  }

  redirect() {
    this.router.navigate(["/login"]);
    this.ngbActiveModal.close();
  }

}

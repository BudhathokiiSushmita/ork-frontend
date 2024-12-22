import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent implements OnInit{

  @Input() action: any;
  constructor(
    private ngbActiveModal: NgbActiveModal
  ) {

  }

  ngOnInit(): void {
  }

  confirmation(action: boolean) {
    if (action) {
      this.ngbActiveModal.close(true);
    } else {
      this.ngbActiveModal.close();
    }
  }

}

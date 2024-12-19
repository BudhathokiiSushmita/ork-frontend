import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-application-modal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './post-application-modal.component.html',
  styleUrl: './post-application-modal.component.css'
})
export class PostApplicationModalComponent implements OnInit{

  @Input() sectorId: any | undefined;

  constructor(
    private ngbActiveModal: NgbActiveModal,
    private router: Router
  ) {
  }
  ngOnInit(): void {
  }

  applyJobs() {
    this.router.navigate(["/home/page", this.sectorId]);
    this.ngbActiveModal.close();
  }

  viewApplications() {
    this.router.navigate(["/home/my-applications"]);
    this.ngbActiveModal.close();
  }
}

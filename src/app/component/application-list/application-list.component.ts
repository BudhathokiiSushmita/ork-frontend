import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ApplicationService} from "../../service/application.service";
import {CommonModule, DatePipe} from "@angular/common";
import {ROLEConstant} from "../../constant/APIConstant";
import {MatMenuModule} from "@angular/material/menu";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    MatTableModule, MatPaginatorModule, DatePipe, CommonModule, MatMenuModule
  ],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.css'
})
export class ApplicationListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'vacancy', 'company', 'submittedDate', 'status'];
  dataList: Array<String> = new Array<String>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  roleType = localStorage.getItem("roleType");
  protected readonly ROLEConstant = ROLEConstant;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private applicationService: ApplicationService,
    private ngbModal: NgbModal) {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchAllApplications();

    if(this.roleType != ROLEConstant.APPLICANT) {
      this.displayedColumns.push('applicant');
    }

    //to add it to last index
    this.displayedColumns.push('action');

  }

  fetchAllApplications() {
    this.applicationService.getAll(false).subscribe({
      next : (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;
      }
    });
  }

  performAction(item: any, action: string) {
    const ngbModal = this.ngbModal.open(ConfirmationModalComponent);
    ngbModal.componentInstance.action = action;
    ngbModal.result.then(
      (res: any) => {
        if (res) {
          switch (action) {
            case 'Edit' : {
              break;
            }

            case 'Delete' : {
              break;
            }

            case 'Forward' : {
              this.applicationService.action(item.id,'FORWARD').subscribe({
                next: (res: any) => {
                }
              })
              break;
            }

            case 'Backward' : {
              this.applicationService.action(item.id,'BACKWARD').subscribe({
                next: (res: any) => {
                }
              })
              break;
            }

            case 'Approve' : {
              this.applicationService.action(item.id,'APPROVE').subscribe({
                next: (res: any) => {
                }
              })
              break;
            }
          }
          return;
        }
      })
  }
}

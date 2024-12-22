import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ApplicationService} from "../../service/application.service";
import {CommonModule, DatePipe} from "@angular/common";
import {ROLEConstant} from "../../constant/APIConstant";

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    MatTableModule, MatPaginatorModule, DatePipe, CommonModule
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
    private modalService: NgbModal,
    private applicationService: ApplicationService) {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchAllApplications();

    if(this.roleType != ROLEConstant.APPLICANT) {
      this.displayedColumns.push('applicant');
    }
  }

  fetchAllApplications() {
    this.applicationService.getAll(false).subscribe({
      next : (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;
      }
    });
  }

}

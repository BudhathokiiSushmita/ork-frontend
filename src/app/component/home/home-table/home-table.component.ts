import {Component, OnInit, ViewChild} from '@angular/core';
import {VacancyService} from "../../../service/vacancy.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {EnumValuePipe} from "../../../pipe/enumValue.pipe";
import {BooleanPipe} from "../../../pipe/boolean.pipe";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home-table',
  standalone: true,
  imports: [
    MatTableModule, MatPaginatorModule, CommonModule, MatCardModule, MatButtonModule,
    MatIconModule, EnumValuePipe, BooleanPipe
  ],
  templateUrl: './home-table.component.html',
  styleUrl: './home-table.component.css'
})
export class HomeTableComponent implements OnInit{

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedVacancy: any;
  dataList: Array<any> = new Array<any>();

  currentPage = 0;
  pageSize = 10;

  get pagedData() {
    const start = this.currentPage * this.pageSize;
    return this.dataList.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  constructor(
    private vacancyService: VacancyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.fetchCompanies();
  }

  private fetchCompanies() {
    const sectorId = this.activatedRoute.snapshot.params["id"];
    this.vacancyService.getById(sectorId).subscribe({
      next: (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;
        this.selectedVacancy = this.dataList.at(0);
      }
    });
  }

  seeDetail(id: any) {
    this.selectedVacancy = this.dataList.find(f => f.id == id);
  }

  onApply(vacancyId: any) {
    const token = localStorage.getItem("token");
    if(token) {
      this.router.navigate(["/application-form", vacancyId]);
    } else {
      this.toastr.error("Oops! Please log in to proceed.");
      this.router.navigate(["/login"]);
    }
  }
}

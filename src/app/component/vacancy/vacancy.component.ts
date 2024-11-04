import {Component, OnInit, ViewChild} from '@angular/core';
import {VacancyService} from "../../service/vacancy.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {AddVacancyComponent} from "./add-vacancy/add-vacancy.component";

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.css'
})
export class VacancyComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title'];
  dataList: Array<String> = new Array<String>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vacancyService: VacancyService,
    private modalService: NgbModal,
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.vacancyService.getAllVacancies(false).subscribe({
      next : (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;
      }
    });
  }

  openForm() {
    const dialogRef = this.modalService.open(AddVacancyComponent, {
      size: 'lg'
    });
    dialogRef.result.then(
      (res: any) => {
        this.fetchData();
      })
  }

}

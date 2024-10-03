import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AddSectorComponent} from "./add-sector/add-sector.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SectorService} from "../../service/sector.service";
@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.css'
})
export class SectorComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name'];
  dataList: Array<String> = new Array<String>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modalService: NgbModal,
    private sectorService: SectorService) {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchAllSector();
  }

  openForm() {
    const dialogRef = this.modalService.open(AddSectorComponent,);
    dialogRef.result.then(
      (res: any) => {
      this.fetchAllSector();
    })
  }

  fetchAllSector() {
    this.sectorService.getAll(false).subscribe({
      next : (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;
      }
    });
  }
}

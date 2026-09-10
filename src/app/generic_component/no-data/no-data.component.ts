import { Component, Input } from '@angular/core';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.css'
})
export class NoDataComponent {

  @Input() title = 'No Data Available';
  @Input() message = 'There is currently no data to display.';
  @Input() icon = 'inbox';
}



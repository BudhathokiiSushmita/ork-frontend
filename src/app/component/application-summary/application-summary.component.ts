import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { STATUSConstant } from '../../constant/APIConstant';

@Component({
  selector: 'app-application-summary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './application-summary.component.html',
  styleUrl: './application-summary.component.css'
})
export class ApplicationSummaryComponent {

  @Input() application: any;

  @Output() close = new EventEmitter<void>();

  protected readonly STATUSConstant = STATUSConstant;

  closeSummary(): void {
    this.close.emit();
  }

}
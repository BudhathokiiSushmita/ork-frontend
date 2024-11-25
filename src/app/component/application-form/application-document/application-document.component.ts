import { Component } from '@angular/core';

@Component({
  selector: 'app-application-document',
  standalone: true,
  imports: [],
  templateUrl: './application-document.component.html',
  styleUrl: './application-document.component.css'
})
export class ApplicationDocumentComponent {

  fileName: string | null = null;
  previewUrl: string | null = null;


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input?.files[0];
      this.fileName = file.name;

      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}

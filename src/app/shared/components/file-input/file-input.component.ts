import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { FilePondOptions } from 'filepond';
// import filepond module
import { FilePondComponent, FilePondModule } from 'ngx-filepond';
import './plugins/file-pond.plugins';

@Component({
  selector: 'app-file-input',
  imports: [FilePondModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent {
  protected filePond = viewChild<FilePondComponent>('filePond');

  pondOptions: FilePondOptions = {
    className: 'file-input-pond',
    allowMultiple: true,
    acceptedFileTypes: ['image/*', 'application/pdf'],
    maxFiles: 10,
    required: true,
    credits: false,
  };

  pondFiles: FilePondOptions['files'] = [];

  pondHandleInit() {
    console.log('FilePond has initialised');
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  pondHandlePrepareFile(event: any) {
    console.log('A file was prepared', event);
    // Append output image to page for testing
    // const url = URL.createObjectURL(event.output);
    // const img = new Image();
    // img.src = url;
    // document.body.append(img);
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event);
  }
}

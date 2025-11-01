import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { FilePondOptions } from 'filepond';
// import filepond module
import { FilePondComponent, FilePondModule } from 'ngx-filepond';
import './plugins/file-pond.plugins';
// pintura
import { DomSanitizer } from '@angular/platform-browser';
import { AngularPinturaModule } from '@pqina/angular-pintura';
// pintura
import {
  createDefaultImageReader,
  createDefaultImageWriter,
  getEditorDefaults,
  openEditor,
  processImage,
} from '@pqina/pintura';

@Component({
  selector: 'app-file-input',
  imports: [FilePondModule, AngularPinturaModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent {
  protected filePond = viewChild<FilePondComponent>('filePond');
  protected domSanitizer = inject(DomSanitizer);

  pondOptions: FilePondOptions = {
    allowMultiple: true, // solo un archivo (usar según necesidad)
    acceptedFileTypes: ['image/*', 'application/pdf'], // solo imágenes y PDFs
    imageEditor: {
      // configuración del plugin de editor
      // Función para abrir el editor (Pintura)
      createEditor: openEditor,
      // Procesador invisible para crear vista previa / resultado
      imageProcessor: processImage,
      // Lector por defecto (devuelve data de la imagen)
      imageReader: [
        createDefaultImageReader,
        {
          /* options */
        },
      ],
      // Escritor por defecto (genera imagen resultante)
      imageWriter: [
        createDefaultImageWriter,
        {
          // Podemos ajustar tamaño de salida o tipo; por ejemplo, png para máscaras
          // targetSize: { width: 512, height: 512, fit: 'cover' },
          mimeType: 'image/png',
        },
      ],
      // Opciones del editor Pintura
      editorOptions: {
        ...getEditorDefaults(),
        // Recorte cuadrado: relación de aspecto 1:1
        imageCropAspectRatio: 1,
      },
    },
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

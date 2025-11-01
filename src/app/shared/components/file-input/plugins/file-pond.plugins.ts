import { registerPlugin } from 'ngx-filepond';
// plugins
import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(
  FilePondPluginFileValidateType,

  FilePondPluginImageEditor,

  FilePondPluginFilePoster
);

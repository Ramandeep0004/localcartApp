import Constant from '../constant';
import {mainWrapper} from '../main';

const baseUrl = `${Constant.host}`;

const UploadService = {
  fileupload,
};

function fileupload(params, progressCallback) {
  return mainWrapper.upload(
    baseUrl + 'upload-file',
    params,
    progressCallback,
  );
}

export default UploadService;

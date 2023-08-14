import React from 'react';
import { Toaster } from '../../app/components/Helper/Toaster';
import UploadService from '../Services/image.uplaod.services';

class ImageUploadController extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   *  Imageupload
   * @param {Array} data
   * @return {Array} image
   */
  async addImage(data) {
    let post = {
      file: 'data:image/png;base64,' + data.image.base64,
      path: data.folder,
      name: data.image.fileName,
      file_type: 'image',
    };
    let response = await UploadService.fileupload(post, data.callback);
    if (response && response.status) {
      return response;
    } else {
      new Toaster().error(response.error);
      return null;
    }
  }

  // async addDocument(data) {
  //   let img = await base64File(data.image.uri);
  //   console.log()
  //   let post = {
  //     file: img,
  //     path: data.folder,
  //     name: data.image.name,
  //     file_type: 'file',
  //   };
  //   let response = await UploadService.fileupload(post, data.callback);
  //   if (response && response.status) {
  //     return response;
  //   } else {
  //     new Toaster().error(response.error);
  //     return null;
  //   }
  // }
}

export default ImageUploadController;

import React, {PropTypes} from 'react';
import API_BASE_URL from '../../config';
let API_URL_FILES = API_BASE_URL + '/v1/files/';

const UploadedPhotosWrapper = ({photos, removePhoto}) => {

    return (
      <div>
        <h3 className="center"> Wgrane zdjęcia </h3>
        <div className="row">
          {photos.map( (photo,index) => {
            return (<div key={photo.id} className="previewWrapper col s3">
                    <img className="z-depth-2 responsive-img" src={API_URL_FILES + photo.fileName}/>
                    <a onClick={(event) => removePhoto(event,index)} className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">clear</i></a>
                  </div>);
          })}
        </div>
       </div>
  );
};

UploadedPhotosWrapper.propTypes = {
  photos: PropTypes.array,
  removePhoto: PropTypes.func,
  fileName: PropTypes.string,
  removeCallback: PropTypes.func
};

export default UploadedPhotosWrapper;

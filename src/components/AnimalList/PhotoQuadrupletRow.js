import React, {PropTypes} from 'react';
import API_BASE_URL from '../../config';
let API_URL_FILES = API_BASE_URL + 'files/';

const PhotoQuadrupletRow = ({tagPhotoAsProfile, photosQuadruplet, index, removePhoto}) => {
    return (
      <div className="row">
        {photosQuadruplet && photosQuadruplet.map( (photo, photoIndex) => {
          return(
          <div key={photo.id} className="previewWrapper col s3">
                  <img className="z-depth-2 responsive-img" src={API_URL_FILES + photo.fileName}/>
                  <a onClick={(event) => removePhoto(event,index * 4 + photoIndex)} className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">clear</i></a>
                  <div className="center">
                    <button onClick={(event) =>tagPhotoAsProfile(index * 4 + photoIndex, true, event)} className="btn btn-large profile-btn">{photo.profil ? "Profilowe" : "Wybierz jako profilowe"}</button>
                  </div>
                </div>);
        })}
      </div>
    );
  };

PhotoQuadrupletRow.propTypes = {
  photosQuadruplet: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  removePhoto: PropTypes.func.isRequired,
  tagPhotoAsProfile: PropTypes.func.isRequired
};

export default PhotoQuadrupletRow;

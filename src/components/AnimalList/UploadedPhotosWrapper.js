import React, {PropTypes} from 'react';
import _ from 'lodash';
import PhotoQuadrupletRow from './PhotoQuadrupletRow';

const UploadedPhotosWrapper = ({tagPhotoAsProfile, photos, removePhoto}) => {

    return (
      <div>
        <h3 className="center"> Wgrane zdjęcia </h3>
          {photos && _.chunk(photos, 4).map( (photosQuadruplet,index) => {

            return  <PhotoQuadrupletRow key={index} tagPhotoAsProfile={tagPhotoAsProfile} photosQuadruplet={photosQuadruplet} index={index} removePhoto={removePhoto} />;

          })}
       </div>
  );
};

UploadedPhotosWrapper.propTypes = {
  photos: PropTypes.object,
  removePhoto: PropTypes.func,
  fileName: PropTypes.string,
  removeCallback: PropTypes.func
};

export default UploadedPhotosWrapper;

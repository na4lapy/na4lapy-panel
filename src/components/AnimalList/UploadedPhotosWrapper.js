import React, {PropTypes} from 'react';

const UploadedPhotosWrapper = ({photos}) => {

    return (
      <div>
        <h3 className="center"> Wgrane zdjęcia </h3>
        <div className="row">
          {photos.map(photo => {

            return <div key={photo.id} className="col s3"><img className="z-depth-2 responsive-img" src={"http://localhost:9000/v1/files/" + photo.fileName}/></div>;
          })}
        </div>
      </div>
  );
};

UploadedPhotosWrapper.propTypes = {
  photos: PropTypes.array
};

export default UploadedPhotosWrapper;

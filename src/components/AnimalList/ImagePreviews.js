import React, {PropTypes} from 'react';

const ImagePreviews = ({previewsTriples, rowIndex, deletePhoto}) => {
  return (
    <div className="row">
    {previewsTriples.map( (preview, index) => {
        return (<div key={index} className="col s4 previewWrapper">
          <img className="z-depth-2 responsive-img"  src={preview} />
          <a onClick={(event) => deletePhoto(event, rowIndex *3 + index)} className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">clear</i></a>
        </div>);
    })};
    </div>
  );
};

ImagePreviews.propTypes = {
  previewsTriples: PropTypes.array,
  rowIndex: PropTypes.number,
  deletePhoto: PropTypes.func
};


export default ImagePreviews;

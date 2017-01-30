import React, {PropTypes} from 'react';

const ImagePreviews = ({previewsTriples, rowIndex, deletePhoto, failedFiles, files}) => {

  let fileNames = files.map((file) => {return file.name});

  return (
    <div className="row">
    {previewsTriples.map( (preview, index) => {
      let imageClasess = "col s4 previewWrapper";
      let imageUploadFailed = failedFiles.includes(fileNames[index]);
      if (failedFiles.length != 0) {
        imageClasess += imageUploadFailed ? " image-upload-failed" : " image-upload-success";
      }

        return (<div key={index} className={imageClasess}>
          <img className="z-depth-2 responsive-img"  src={preview} />
          <div className="overlay valign-wrapper">
                  <div className="valign">
                    <p>{imageUploadFailed ? "Zdjęcia nie wgrano!" : "Zdjęcie wgrano poprawnie"}</p>
                  </div>
          </div>
          <a onClick={(event) => deletePhoto(event, rowIndex * 3 + index)} className={"btn-floating btn-small waves-effect waves-light red "}><i className="material-icons">clear</i></a>
        </div>);
    })};
    </div>
  );
};

ImagePreviews.propTypes = {
  previewsTriples: PropTypes.array,
  rowIndex: PropTypes.number,
  deletePhoto: PropTypes.func,
  files: PropTypes.array,
  failedFiles: PropTypes.array
};


export default ImagePreviews;

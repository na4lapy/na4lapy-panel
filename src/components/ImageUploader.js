import React, {PropTypes} from 'react';
import { Field, actions } from 'react-redux-form';
import {connect} from 'react-redux';
import FileRemovalModal from './AnimalList/FileRemovalModal';
import {bindActionCreators} from 'redux';
import UploadedPhotosWrapper from './AnimalList/UploadedPhotosWrapper';
import ImagePreviews from './AnimalList/ImagePreviews';
import _ from 'lodash';

class ImageUploader extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      files: [],
      imagePreviewUrls: []
    };

    this.handleFilesUpload = this.handleFilesUpload.bind(this);
    this.openUploadedModal = this.openUploadedModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.removeFromTempQueue = this.removeFromTempQueue.bind(this);
    this.removeUploadedPhoto = this.removeUploadedPhoto.bind(this);
    this.openTempPhotosModal = this.openTempPhotosModal.bind(this);
  }

  openUploadedModal(e, index){
    this.setState({
       photosType: 'wgranych',
       callback: this.removeUploadedPhoto,
       photoId: this.props.photos[index].id
     }, this.openModal(e, this.props.photos[index].fileName, index));
  }

  openTempPhotosModal(e, index){
    this.setState({photosType: 'do wgrania', callback: this.removeFromTempQueue}, this.openModal(e, '', index));
  }

  removeUploadedPhoto() {
    this.props.deletePhoto(this.props.animalId, this.state.photoId);
  }

  openModal(e, fileName, index){
    this.setState({removingFileName: fileName, removingFileIndex: index}, () => {
      $('#removingFileModal').openModal();
    });

  }

  removeFromTempQueue() {
    let files = _.clone(this.state.files);
    let urls = _.clone(this.state.imagePreviewUrls);

    files.splice(this.state.removingFileIndex, 1);
    urls.splice(this.state.removingFileIndex, 1);

      this.props.changeModel('animal.tempPhotos', files);

      this.setState({
        files: files,
        imagePreviewUrls: urls
      });
    }

  handleFilesUpload(e){
    e.preventDefault();
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onloadend = () => {
        let tempFiles = _.clone(this.state.files);
        tempFiles.push(files[i]);
        this.props.changeModel('animal.tempPhotos', tempFiles);
        this.setState({
           files: tempFiles,
           imagePreviewUrls: this.state.imagePreviewUrls.concat(reader.result)
         });

      };
      reader.readAsDataURL(files[i]);
    }
  }

  renderUploadedPhotos(){
    if (this.props.photos && this.props.photos.length != 0) {
      return (<UploadedPhotosWrapper photos={this.props.photos} removePhoto={this.openUploadedModal}/>);
    }
  }

  render() {
    let {imagePreviewUrls} = this.state;
    return (
      <div>
        {this.renderUploadedPhotos()}
        <h2 className="center">Wgraj zdjęcia</h2>
        <div className="file-field input-field">
          <div className="btn">
          <span>Zdjęcia</span>
          <Field  model="animal.tempPhotos">
            <input type="file" multiple onChange={this.handleFilesUpload}/>
          </Field>
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Wgraj jedno lub więcej zdjęć"/>
          </div>
      </div>
      <h3 key="header" className="center">Zdjęcia do wgrania</h3>
      {imagePreviewUrls && _.chunk(imagePreviewUrls, 3).map( (previews, rowIndex) => {
        return  <ImagePreviews key={rowIndex} previewsTriples={previews} rowIndex={rowIndex} deletePhoto={this.openTempPhotosModal}/>;
      })}
      <FileRemovalModal removeCallback={this.state.callback} fileName={this.state.removingFileName} photosType={this.state.photosType}/>

    </div>);
  }
}

ImageUploader.propTypes = {
  deletePhoto: PropTypes.func,
  photos: PropTypes.array,
  animalId: PropTypes.number,
  changeModel: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeModel: bindActionCreators(actions.change, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ImageUploader);

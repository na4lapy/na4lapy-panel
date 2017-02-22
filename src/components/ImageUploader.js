import React, {PropTypes} from 'react';
import { Field, actions } from 'react-redux-form';
import {connect} from 'react-redux';
import FileRemovalModal from './AnimalList/FileRemovalModal';
import {bindActionCreators} from 'redux';
import UploadedPhotosWrapper from './AnimalList/UploadedPhotosWrapper';
import ImagePreviews from './AnimalList/ImagePreviews';
import _ from 'lodash';
import { FILE_SIZE_LIMIT_IN_MB } from "../config";

class ImageUploader extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      files: [],
      imagePreviewUrls: [],
      url: window.location.pathname
    };

    this.handleFilesUpload = this.handleFilesUpload.bind(this);
    this.openUploadedModal = this.openUploadedModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.removeFromTempQueue = this.removeFromTempQueue.bind(this);
    this.removeUploadedPhoto = this.removeUploadedPhoto.bind(this);
    this.openTempPhotosModal = this.openTempPhotosModal.bind(this);
    this.clearFileQueue = this.clearFileQueue.bind(this);
    this.tagPhotoAsProfile = this.tagPhotoAsProfile.bind(this);
  }

  componentDidMount() {
    $('#removingFileModal').modal();
  }

  componentWillUpdate(nextProps, nextState) {
    if ((nextState.url.match('animals\\\d+?')) && (!window.location.pathname.match('animals\\\d+?'))){
      this.setState({
        files: [],
        imagePreviewUrls: []
      });
      this.refs.fileNamesInput.value = null;
    }
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
      $('#removingFileModal').modal('open');
    });

  }

  removeFromTempQueue() {
    let files = _.clone(this.state.files);
    let urls = _.clone(this.state.imagePreviewUrls);

    files.splice(this.state.removingFileIndex, 1);
    urls.splice(this.state.removingFileIndex, 1);

    this.props.changeModel('animal.tempPhotos', files);
    this.refs.fileNamesInput.value = files.map( f => f.name + " ");
    if (files.length == 0 && urls.length == 0) {
      this.clearFileQueue();
    } else {
      this.setState({
        files: files,
        imagePreviewUrls: urls
      });
    }
  }

  tagPhotoAsProfile(id, isAlreadUploaded,e ) {
    e.preventDefault();
    //reset temp files and already uploaded files to not
    this.setState({
      files: this.state.files.map((file, index) =>{
        if (index == id && !isAlreadUploaded) {
          file.profil = true;
        } else {
          file.profil = false;
        }
        return file;
      })
    });

    let photos = [];

    this.props.photos.forEach((firstObject) => {
      let secondObject = {};
      for(let k in firstObject) {
        secondObject[k]=firstObject[k];
      }
      photos.push(secondObject);
    });

    let photosWithProfiles = photos.map((photo, index) => {

       if (index == id && isAlreadUploaded) {
          photo.profil = true;
       } else {
         photo.profil = false;
       }
       return photo;
    });

    this.props.changeModel('animal.photos', photosWithProfiles);
  }

  handleFilesUpload(e){
    e.preventDefault();
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onloadend = () => {

        if (files[i].size/1024/1024 > FILE_SIZE_LIMIT_IN_MB) {
          this.setState({fileSizeError: true});
          this.props.setValidity('animal.tempPhotos', false);
          return;
        }
        let tempFiles = _.clone(this.state.files);

        files[i].profil = i == 0 && this.props.photos.filter((p) => p.profil).length == 0;

        tempFiles.push(files[i]);
        this.props.changeModel('animal.tempPhotos', tempFiles);
        this.setState({
           files: tempFiles,
           imagePreviewUrls: this.state.imagePreviewUrls.concat(reader.result)
         }, () => {
             this.refs.fileNamesInput.value = this.state.files.map( f => f.name + " " );
         });
      };
      reader.readAsDataURL(files[i]);
    }
  }

  renderUploadedPhotos(){
    if (this.props.photos && this.props.photos.length != 0) {
      return (<UploadedPhotosWrapper tagPhotoAsProfile={this.tagPhotoAsProfile} photos={this.props.photos} removePhoto={this.openUploadedModal}/>);
    }
  }

  clearFileQueue() {
      this.setState({
        files: [],
        imagePreviewUrls: []
      });
      this.refs.fileNamesInput.value = null;
      this.refs.fileInput.value = null;
  }


  render() {
    let {imagePreviewUrls} = this.state;
    let placeholderMessage = "Wgraj jedno lub więcej zdjęć do " + FILE_SIZE_LIMIT_IN_MB + " Mb";
    let sizeErrorMessage = "Jedno lub więcej zdjęć przekracza limit " + FILE_SIZE_LIMIT_IN_MB + " Mb. Formularz nie może zostać zapisany.";
    return (
      <div>
        {this.renderUploadedPhotos()}
        <h2 className="center">Wgraj zdjęcia</h2>
        <div className="file-field input-field">
          <div className="btn">
          <span>Zdjęcia</span>
          <Field  model="animal.tempPhotos">
            <input ref="fileInput" type="file" multiple onChange={this.handleFilesUpload} id="fileInput"/>
          </Field>
          </div>
          <div className="file-path-wrapper">
            <input ref="fileNamesInput" className="file-path validate" type="text" placeholder={placeholderMessage}/>
            {this.state.fileSizeError && <p className="text-red">{sizeErrorMessage}</p>}
          </div>
      </div>
      <h3 key="header" className="center">Zdjęcia do wgrania</h3>
      {imagePreviewUrls && _.chunk(imagePreviewUrls, 3).map( (previews, rowIndex) => {
        return  <ImagePreviews key={rowIndex} previewsTriples={previews} rowIndex={rowIndex} tagPhotoAsProfile={this.tagPhotoAsProfile} deletePhoto={this.openTempPhotosModal} failedFiles={this.props.failedFiles} files={_.chunk(this.state.files, 3)[rowIndex]}/>;
      })}
      <FileRemovalModal removeCallback={this.state.callback} fileName={this.state.removingFileName} photosType={this.state.photosType}/>

    </div>);
  }
}

ImageUploader.propTypes = {
  deletePhoto: PropTypes.func,
  photos: PropTypes.object,
  animalId: PropTypes.number,
  changeModel: PropTypes.func,
  failedFiles: PropTypes.array,
  areImageUploadFinished: PropTypes.bool,
  reloadAnimal: PropTypes.func,
  setValidity: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeModel: bindActionCreators(actions.change, dispatch),
    setValidity: bindActionCreators(actions.setValidity, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(ImageUploader);

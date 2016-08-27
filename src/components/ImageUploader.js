import React, {PropTypes} from 'react';
import { Field } from 'react-redux-form';
import FileRemovalModal from './AnimalList/FileRemovalModal';
import UploadedPhotosWrapper from './AnimalList/UploadedPhotosWrapper';

export default class ImageUploader extends React.Component {

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

  openUploadedModal(e, fileName, index){
    this.setState({
       photosType: 'wgranych',
       callback: this.removeUploadedPhoto,
       photoId: this.props.photos[index].id
     }, this.openModal(e, fileName, index));
  }

  openTempPhotosModal(e, fileName, index){
    this.setState({photosType: 'do wgrania', callback: this.removeFromTempQueue}, this.openModal(e, fileName, index));
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
      this.setState({
        files: this.state.files.splice(1, this.state.removingFileIndex),
        imagePreviewUrls: this.state.imagePreviewUrls.splice(1, this.state.removingFileIndex)
      });
    }

  handleFilesUpload(e){
    e.preventDefault();
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
           files: this.state.files.concat([files[i]]),
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
    let imagePreviews = null;
    if (imagePreviewUrls) {
        imagePreviews= [];
        imagePreviews.push(<h3 className="center">Zdjęcia do wgrania</h3>);
        imagePreviewUrls.map( (imagePreviewUrl,index) => {
          imagePreviews.push(
            <div key={index} className="col s4 previewWrapper">
              <img className="z-depth-2 responsive-img"  src={imagePreviewUrl} />
              <a onClick={(event) => this.openTempPhotosModal(event,this.state.files[index].name, index)} className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">clear</i></a>
            </div> );
        });
    }
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
            <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
          </div>
      </div>
      <div className="row">
        {imagePreviews}
      </div>
      <FileRemovalModal removeCallback={this.state.callback} fileName={this.state.removingFileName} photosType={this.state.photosType}/>

    </div>);
  }
}

ImageUploader.propTypes = {
  deletePhoto: PropTypes.func,
  photos: PropTypes.array,
  animalId: PropTypes.number
};

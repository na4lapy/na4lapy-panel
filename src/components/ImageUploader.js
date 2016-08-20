import React, {PropTypes} from 'react';
import { Field } from 'react-redux-form';

export default class ImageUploader extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      files: [],
      imagePreviewUrls: []
    };

    this.handleFilesUpload = this.handleFilesUpload.bind(this);
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

  render() {
    let {imagePreviewUrls} = this.state;
    let imagePreviews = null;
    if (imagePreviewUrls) {
        imagePreviews= [];
        imagePreviews.push(<h3 className="center">Zdjęcia do wgrania</h3>);
        imagePreviewUrls.map( (imagePreviewUrl,index) => {
          imagePreviews.push(
            <div key={index} className="col s4">
              <img className="z-depth-2 responsive-img"  src={imagePreviewUrl} />
            </div> );
        });
    }
    return (
      <div>
        <h2 className="center">Wgraj zdjęcia</h2>
        <div className="btn">
        <span>Zdjęcia</span>
        <Field model="animal.tempPhotos">
          <input type="file" multiple onChange={this.handleFilesUpload}/>
        </Field>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
      </div>
      <div className="row">
        {imagePreviews}
      </div>
    </div>);
  }
}

ImageUploader.propTypes = {

};

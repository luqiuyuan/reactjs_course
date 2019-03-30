import React, { Component } from 'react';
import Text from '../components/Text';
import UserFetcher from '../components/UserFetcher';
import { connect } from 'react-redux';
import styles from './styles/User';
import { EditButton, ButtonSmallPositive, ButtonSmallNegative } from '../components/Button';
import TextInput from '../components/TextInput';
import validate, {
  nameLength
} from '../utils/validations';
import defaultAvatar from '../assets/imgs/avatar_default.jpg';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCSlaCGWn08FSiesAcNjYmDHfDWRwHonhY",
  authDomain: "bigfish-48c70.firebaseapp.com",
  databaseURL: "https://bigfish-48c70.firebaseio.com",
  projectId: "bigfish-48c70",
  storageBucket: "bigfish-48c70.appspot.com",
  messagingSenderId: "39090856777"
};
firebase.initializeApp(config);

class User extends Component {

  static VALIDATIONS = {
    name: [nameLength],
  }

  state = {
    name_err: '',
    input_values: {},
  }

  render() {
    const { id } = this.props.match.params
    const { user_token } = this.props;

    return (
      <div style={styles.container}>
        <UserFetcher
          id={id}
          onFetched={(user) => this.setState({ input_values: {...this.state.input_values, name: user.name} })}>
          {
            (user) => <>
              <Avatar
                style={styles.avatar}
                avatarURL={user.avatar_url}
                userID={user.id}
                editable={user_token.user_id == id}
                onUploaded={this.props.update} />
              <div style={styles.info}>
                <Editable
                  childrenNormal={
                    <Text type="xl">{user.name}</Text>
                  }
                  childrenEditing={
                    <TextInput
                      placeholder="Name"
                      value={this.state.input_values.name !== undefined? this.state.input_values.name : user.name}
                      id="name"
                      errMsg={this.state['name_err']}
                      onBlur={this.onBlur}
                      onChange={this.onChange} />
                  }
                  editable={user_token.user_id == id}
                  onSave={this.onSaveName} />
                <Text>Gender</Text>
                <Text>{user.gender}</Text>
                <Text>Short Description</Text>
                <Text>{user.discription}</Text>
              </div>
            </>
          }
        </UserFetcher>
      </div>
    );
  }

  // trigger when user typing words
  onChange = ({ target: { id, value } }) => {
    this.setState({ input_values: {...this.state.input_values, name: value} });
    // Reset the error message when user typing
    if (this.state[id + '_err']) {
      this.setState({ [id + '_err']: '' })
    }
  }

  // check the input existence on input blur
  onBlur = ({ target: { id, value } }) => {
    const first_validation = User.VALIDATIONS[id][0];
    if (first_validation.name === 'required') {
      this.setState({
        [id + '_err']: validate(first_validation, value)
      });
    }
  }

  onSaveName = () => {
    // validate each input, get error message
    let _errMsgs = {}
    Object.keys(User.VALIDATIONS).forEach((id) => {
      if (User.VALIDATIONS[id]) {
        _errMsgs[id + '_err'] = validate(User.VALIDATIONS[id], this.state.input_values[id]);
      }
    });

    // only try to setState when there are validation errors
    if (this._checkErr(_errMsgs)) {
      this.setState(_errMsgs)
    } else {
      this.props.update && this.props.update({ name: this.state.input_values.name });
    }
  }

  // check if there is a error message
  _checkErr = obj => {
    // traverse the obj, if there is any valid error message, return true
    for (let val in obj) {
      if (obj[val]) return true
    }
    return false
  }

}

const mapState = state => ({
  user_token: state.user_token,
});
const mapDispatch = ({ users: { update } }) => ({
  update: (user) => update({ user }),
});
export default connect(mapState, mapDispatch)(User);

class Editable extends Component {

  state = {
    hovered: false,
    editing: false,
  }

  render() {
    const { editable } = this.props;
    const { hovered, editing } = this.state;

    return (
      <div
        style={styles.container_editable}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}>
        <div style={styles.row_first_editable}>
          {editing? this.props.childrenEditing : this.props.childrenNormal}
          {editable && hovered && !editing
          ? <EditButton style={styles.edit_button} onClick={() => this.setState({ editing: true })} />
          : null
          }
        </div>
        {editing
        ? <div style={styles.row_second_editable}>
            <ButtonSmallPositive label="Save" onClick={this.props.onSave} />
            <ButtonSmallNegative label="Cancel" style={styles.button_second_editable} />
          </div>
        : null
        }
      </div>
    );
  }

}

class Avatar extends Component {

  render() {
    const { avatarURL, style, editable } = this.props;

    return (
      <div style={{...styles.container_avatar, backgroundImage: 'url(' + (avatarURL? avatarURL : defaultAvatar) + ')', ...style}}>
        {editable
        ? <div
            style={styles.overlay}
            onClick={this.onClick}>
            <img
              style={styles.icon_camera}
              src={require('../assets/imgs/icons/photo-camera.svg')} />
            <Text type="white" style={styles.text_avatar}>Edit your avatar</Text>
            <input
              style={{display: 'none'}}
              type="file" ref={this.fileInputRef}
              onChange={this.onChange} />
          </div>
        : null
        }
      </div>
    );
  }

  onClick = () => {
    this._file_input && this._file_input.click();
  }

  onChange = (event) => {
    var file = event.target.files[0];
    this.uploadImage(file, this.props.userID);
  }

  uploadImage(image, user_id) {
    var storageRef = firebase.storage().ref();
    var imageRef = storageRef.child(`/avatars/${user_id}`);

    var uploadTask = imageRef.put(image);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      // Callbacks called during uploading
    }, () => {
      // Fail callback
    }, () => {
      // Success callback
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.props.onUploaded && this.props.onUploaded({ avatar_url: downloadURL });
      });
    });
  }

  fileInputRef = (ref) => {
    this._file_input = ref;
  }

}

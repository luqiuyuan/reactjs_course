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
            (user) => <div style={styles.info}>
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
        console.log(this.state.input_values);
      }
    });
    console.log(_errMsgs);

    // only try to setState when there are validation errors
    if (this._checkErr(_errMsgs)) {
      this.setState(_errMsgs)
    } else {
      // this.props.create && this.props.create(this.input_values['title'], this.input_values['content'], () => {
      //   this.props.getAll && this.props.getAll();
      //   this.hide();
      // });
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
export default connect(mapState, null)(User);

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

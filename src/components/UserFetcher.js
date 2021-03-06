import { connect } from 'react-redux';

function UserFetcher({ id, children, user, getUser, onFetched }) {
  !user && getUser(id, onFetched)
  return children(user || {})
}

const mapState = (state, own_props) => ({
  user: state.users[own_props.id]
})

const mapDispatch = dispatch => ({
  getUser: (id, success_callback) => dispatch.users.getUser({ id, success_callback })
})

export default connect(mapState, mapDispatch)(UserFetcher)
const styles = {

  container: {
    // styling self
    width: 1200,
    background: 'white',
    marginTop: 56,
    // styling children
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  info: {
    // styling self
    marginLeft: 30,
    // styling children
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  container_editable: {
    // styling children
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  row_first_editable: {
    // styling children
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  row_second_editable: {
    // styling self
    marginTop: 14,
    // styling children
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  edit_button: {
    marginLeft: 30,
  },

  button_second_editable: {
    marginLeft: 30,
  },

  container_avatar: {
    // styling self
    width: 250,
    height: 250,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // styleing children
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    position: 'relative',
    marginLeft: 30,
    top: -36,
  },

  editable_description: {
    marginTop: 50,
  },

  overlay: {
    // styling self
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: 'rgba(233, 231, 239, 0.5)',
    cursor: 'pointer',
    // styling children
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon_camera: {
    width: 100,
    height: 80,
  },

  text_avatar: {
    marginTop: 49,
  },

  label: {
    width: 270,
  },

  content_description: {
    maxWidth: 290,
    overflowWrap: 'break-word',
  },

};

export default styles;

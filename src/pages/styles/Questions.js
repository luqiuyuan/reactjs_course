const styles = {

  scrollable: {
    // styling self
    flex: 1,
    alignSelf: 'stretch',
    overflow: 'auto',
    // styling children
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  question_list_container: {
    // styling self
    width: 900,
    backgroundColor: 'white',
    // styling children
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 23,
    paddingBottom: 23,
    flexShrink: 0,
  },

  question: {
    alignSelf: 'stretch',
    marginLeft: 29,
    marginRight: 29,
  },

  button_add: {
    position: 'absolute',
    right: 25,
    bottom: 25,
  },

  container_create_question: {
    // styling self
    backgroundColor: 'rgba(216, 216, 216, 0.5)',
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    // styling children
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  panel_create_question: {
    // styling self
    width: 900,
    height: 400,
    backgroundColor: 'white',
    // styling children
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  title_create_question: {
    width: 700,
    marginTop: 36,
  },

  content_create_question: {
    width: 700,
  },

  blank: {
    flex: 1,
  },

  button_create_question: {
    alignSelf: 'flex-end',
    marginBottom: 25,
    marginRight: 100,
  },

};

export default styles;

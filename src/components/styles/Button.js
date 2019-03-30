import {
    COLOR_THEME,
    COLOR_YAQING,
} from '../../constants';

const styles = {
    button: {
        // self styles
        width: 386,
        height: 50,
        backgroundColor: COLOR_THEME,
        borderRadius: 5,
        cursor: 'pointer',
        // children styles
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_label: {
        fontSize: 25,
        color: "white",
        margin: 0,
    },
    button_small_positive: {
      // self styles
      width: 193,
      height: 50,
      backgroundColor: COLOR_THEME,
      borderRadius: 5,
      cursor: 'pointer',
      // children styles
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button_small_negative: {
      // self styles
      width: 193,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 5,
      cursor: 'pointer',
      borderWidth: 1,
      borderColor: COLOR_YAQING,
      // children styles
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container_float_button: {
      // styling self
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: COLOR_THEME,
      cursor: 'pointer',
      // styling children
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon_float_button: {
      width: 35,
      height: 35,
    },
    container_edit_button: {
      // styling self
      cursor: 'pointer',
      // styling children
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    icon_edit: {
      width: 26,
      height: 25,
    },
    label_edit: {
      marginLeft: 15,
    },
};

export default styles;

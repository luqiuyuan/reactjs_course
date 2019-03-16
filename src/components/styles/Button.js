import {
    COLOR_THEME,
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
    container_float_button: {
        // styling self
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLOR_THEME,
        position: 'absolute',
        right: 25, bottom: 25,
        cursor: 'pointer',
        // styling children
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 35,
        height: 35,
    }
};

export default styles;

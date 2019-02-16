import {
    COLOR_THEME,
} from '../constants';

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
};

export default styles;

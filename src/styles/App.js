import background_image from "../assets/imgs/background.jpg";
import {
    COLOR_THEME,
    COLOR_SILVER_WHITE,
    COLOR_YAQING,
} from '../constants';

const styles = {
    container: {
        // self styles
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url(' + background_image + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // children styles
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    panel: {
        // self styles
        width: 500,
        height: 600,
        backgroundColor: "white",
        marginTop: 132,
        // children styles
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        fontSize: 50,
        color: COLOR_THEME,
    },
    button: {
        // self styles
        width: 386,
        height: 50,
        backgroundColor: COLOR_THEME,
        borderRadius: 5,
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
    placeholder: {
        flex: 1,
    },
    footer: {
        // self styles
        height: 118,
        backgroundColor: COLOR_SILVER_WHITE,
        alignSelf: 'stretch',
        // children styles
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer_text: {
        fontSize: 25,
        color: COLOR_YAQING,
    },
    footer_link: {
        fontSize: 25,
        color: COLOR_THEME,
        marginLeft: 10,
    },
};

export default styles;

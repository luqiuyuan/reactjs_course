import background_image from "../assets/imgs/background.jpg";
import {
    COLOR_THEME,
    COLOR_SILVER_WHITE,
} from '../../constants';

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
        // to prevent shrink when parent flex container doesnt have enough space
        flexShrink: 0
    },
    header: {
        color: COLOR_THEME,
        marginTop: 46,
        marginBottom: 32
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
    footer_link: {
        color: COLOR_THEME,
        marginLeft: 10
    },
};

export default styles;

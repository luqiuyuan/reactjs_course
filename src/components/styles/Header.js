import {
    COLOR_THEME,
    COLOR_CRAB_SHELL_CYAN,
} from '../../constants';

const styles = {

    container: {
        // styleing self
        width: '100vw',
        height: 80,
        backgroundColor: 'white',
        boxShadow: '0px 1px 5px ' + COLOR_CRAB_SHELL_CYAN,
        // styling children
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    logo: {
        color: COLOR_THEME,
        marginLeft: 19,
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 24,
    },

};

export default styles;

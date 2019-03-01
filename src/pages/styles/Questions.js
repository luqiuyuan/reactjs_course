import {
    COLOR_LEAD_WHITE,
} from '../../constants';

const styles = {

    container: {
        // styling self
        width: '100vw',
        height: '100vh',
        backgroundColor: COLOR_LEAD_WHITE,
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
    },

    question: {
        marginLeft: 29,
        marginRight: 29,
    },

};

export default styles;

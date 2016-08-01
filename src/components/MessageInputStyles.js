import {colors} from '../lib/colors';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center'
    },
    textInput: {
        flex: 8,
        backgroundColor: colors.white,
        height: '60%',
        margin: 10,
        border: 'none',
        borderRadius: 10,
        padding: 10,
        fontSize: '1.5em'
    },
    submit: {
        flex: 2,
        backgroundColor: colors.blue,
        border: '2px solid',
        borderColor: colors.white,
        margin: 10,
        color: colors.white,
        fontSize: '1.5em',
        borderRadius: 10
    },
}

export default styles;
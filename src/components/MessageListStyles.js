import {colors} from '../lib/colors';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    row: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        fontSize: '1em'
    },
    democrat: {
        fontWeight: 700,
        color: colors.deepBlue
    },
    republican: {
        fontWeight: 700,
        color: colors.red
    }
}

export default styles;
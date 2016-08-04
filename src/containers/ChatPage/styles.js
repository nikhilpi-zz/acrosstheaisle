import {colors} from '../../lib/colors';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    chatNav: {
        flex: 1,
        backgroundColor: colors.red,
        color: colors.white,
        padding: '0px 20px',
        display: 'flex',
        flexDirection: 'row'
    },
    chatContentLeft: {
        flex: 1,
    },
    chatContentRight: {
        flex: 1,
        textAlign: 'right'
    },
    chatMessages: {
        flex: 8,
        backgroundColor: colors.white,
        overflow: 'scroll'
    },
    chatInput: {
        flex: 1,
        backgroundColor: colors.blue
    }
}

export default styles;
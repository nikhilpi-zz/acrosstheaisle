import {colors} from '../../lib/colors';

const styles = {
    welcomeInfo: {
        color: colors.white,
        width: '50%',
        fontFamily: "'Lato', sans-serif",
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: colors.deepBlue
    },
    formContianer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    partyOptions: {
        flex: 1,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    partyButton: {
        flex: 1,
        width: '200px'
    }
}

export default styles;
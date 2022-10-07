import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    brand: {
        fontSize: 30,
        textAlign: 'center',
        color: '#555',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    rowContainerSpace: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 50,
        marginVertical: 20,
    },
    rowContainerTodo: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '90%',
        marginTop: 30,
        marginBottom: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    rowContainerListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    rowContainerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 50,
        marginVertical: 30,
    },
    backgroundCover: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    backgroundCoverToDo: {
        alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '90%',
        height: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    addToDoModal: {
        backgroundColor: 'rgba(255, 255, 255,0.9)',
        height: '40%',
        width: '98%',
        padding: 40,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    addToDoModalCover: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255,0)',

    },
    header: {
        fontSize: 25,
        marginBottom: 20,
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 5,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa'
    },
    inLineTextButton: {
        color: '#0af',
    },
    pressedInLineTextButton: {
        color: '#00f',
        opacity: .6
    },
    errorText: {
        color: '#f55',
        marginBottom: 10
    },
    manageAccountButtons: {
        marginVertical: 5,
    }
});
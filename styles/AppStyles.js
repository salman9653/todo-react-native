import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    // imageContainer: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // noPadding: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: "red"
    // },
    // fillSpace: {
    //     flex: 1
    // },
    // rightAligned: {
    //     justifyContent: "flex-end"
    // },
    // topMargin: {
    //     marginTop: 16
    // },
    // bottomMargin: {
    //     marginBottom: 16
    // },
    // rightMargin: {
    //     marginRight: 16
    // },
    // leftMargin: {
    //     marginLeft: 16
    // }, lightText: {
    //     color: "#fff"
    // },
    // errorText: {
    //     color: "#ff0000"
    // }, lightTextInput: {
    //     borderBottomColor: "#ffffff"
    // },
    // darkTextInput: {
    //     borderBottomColor: "#000000"
    // },



    container: {
        flex: 1,
        justifyContent: 'center',
    },
    brand: {
        fontSize: 30,
        textAlign: 'center',
        color: '#555',
        fontWeight: 'bold',
        marginVertical: 30,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
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
});
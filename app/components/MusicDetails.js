import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';

class MusicDetails extends React.Component {
    constructor(props) {
        super(props);
        console.log('props:- ', props);
        this.state = {
            visible: true
        }

    }
    hideSpinner() {
        this.setState({ visible: false })
    }
    render() {
        const { item } = this.props.navigation.state.params
        return (
            <>
                <View style={styles.headerContainer}>

                    <Text style={styles.textHeader}>SONG DETAILS</Text>
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={() => this.props.navigation.navigate('Dummyapi')}
                    >
                        <Text style={styles.btnText}>{'<'}</Text>
                    </TouchableOpacity>
                </View>
                {item.trackViewUrl == "" ?
                    <View >
                        <View style={styles.container}>
                            <View style={[styles.card,]}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={{ uri: item.artworkUrl100 }} style={{ width: 325, height: 325 }} />
                                </View>
                                <View style={ styles.trackDetails}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text style={styles.track}>{item.trackName}</Text>
                                        <Text style={styles.subDetails1}>{item.artistName}</Text>
                                        <Text style={styles.subDetails2}>{(item.trackTimeMillis / (1000 * 60)).toFixed(2)} m</Text>
                                    </View>
                                </View>
                            </View >
                        </View>
                    </View>
                    :
                    <>
                        <WebView style={{}}
                            onLoadStart={() => this.setState({ visible: true })}
                            onLoadEnd={() => this.setState({ visible: false })}
                            source={{ uri: item.trackViewUrl }}
                        />
                        {this.state.visible && (
                            <View style={styles.loader}>
                                <ActivityIndicator size={"large"} color={"#333"} />
                                <Text>Loading...</Text>
                            </View>
                        )}
                    </>
                }

            </>
        )
    }
}

const styles = StyleSheet.create({
    rows: {
        flexDirection: 'row',
        marginBottom: 20
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#3f696e',
        justifyContent: 'center',
        paddingHorizontal: 55
    },
    btn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        marginTop: 35,
        backgroundColor: '#11c5d9',
        paddingVertical: 20
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    label: {
        fontWeight: 'bold',
        width: '50%'
    },
    textHeader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    headerContainer: {
        paddingVertical: 20,
        backgroundColor: '#11c5d9',
        alignItems: 'center',
    },
    track: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#11c5d9',
        marginBottom: 8
    },
    subDetails1: {
        fontSize: 16,
        marginBottom: 4
    },
    subDetails2: {
        fontSize: 14,
    },
    backIcon: {
        position: 'absolute',
        left: 10,
        top: 0,
        padding: 10
    },
    trackDetails:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 40
    }
});


export default MusicDetails
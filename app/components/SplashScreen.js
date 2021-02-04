/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

class SplashScreen extends Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                1000
            )
        )
    }

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            this.props.navigation.navigate('Dummyapi');
        }
    }

    render() {
        return (
            <>
                <View >
                    <Image
                        source={require('../assets/images/splash-img.jpg')}
                        style={{ ...styles.imageBg }}
                    />
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    imageBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        opacity: 1
    },
    logoImg: {
        width: '90%',
        height: 68,
        resizeMode: 'stretch',
        position: 'absolute',
        opacity: 1
    }
});

export default SplashScreen;

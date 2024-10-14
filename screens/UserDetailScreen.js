import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { db } from '../database/firebaseDb';
import { Button, Icon, Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemeProvider } from '@react-navigation/native';

class UserDetailScreen extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <ThemeProvider theme={ theme }>
                <ScrollView style={styles.container}>
                <Input
                        placeholder={'Name'}
                    />
                    <Input
                        placeholder={'Email'}
                    />
                    <Input
                        placeholder={'Mobile'}
                    />
                    <Button
                        title={'Update'}
                    />
                    <Button
                        title={'Delete'}
                        containerStyle={{
                            marginTop: 10
                        }}
                        buttonStyle={{
                            backgroundColor: "red"
                        }}
                    />

                </ScrollView>
            </ThemeProvider>        
        )
    }
}

const theme = {
    Button: {
        raised: true
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        buttom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default UserDetailScreen
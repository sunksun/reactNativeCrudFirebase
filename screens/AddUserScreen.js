import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Button, Input, ThemeProvider } from 'react-native-elements';
import { EvilIcons, Fontisto, AntDesign } from '@expo/vector-icons';
import { db } from '../database/firebaseDb';
import { collection, addDoc } from 'firebase/firestore';

class AddUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: ''
        };
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    storeUser = async () => {
        if(this.state.name === '' || this.state.email === '' || this.state.mobile === '') {
            alert('กรุณากรอกข้อมูลให้ครบ!');
        } else {
            try {
                const docRef = await addDoc(collection(db, 'react-native-crud'), {
                    name: this.state.name,
                    email: this.state.email,
                    mobile: this.state.mobile
                });
                console.log("Document written with ID: ", docRef.id);
                Alert.alert('Success', 'บันทึกข้อมูลเรียบร้อยแล้ว !');
                this.setState({
                    name: '',
                    email: '',
                    mobile: ''
                });
                this.props.navigation.navigate('UserScreen');
            } catch (error) {
                console.error("Error adding document: ", error);
                alert('An error occurred while adding the user.');
            }
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <ScrollView style={styles.container}>
                    <Image 
                            source={require('../img/logo_tacking.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    <Input
                        leftIcon={<EvilIcons name="user" size={28} color="black" />}
                        placeholder='Name'
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                    />
                    <Input
                        leftIcon={<Fontisto name="email" size={24} color="black" />}
                        placeholder='Email'
                        value={this.state.email}
                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                    />
                    <Input
                        leftIcon={<AntDesign name="mobile1" size={24} color="black" />}
                        placeholder='Mobile'
                        value={this.state.mobile}
                        onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
                    />
                    <Button
                        title='Add User'
                        onPress={() => this.storeUser()}
                        buttonStyle={styles.addButton}
                    />
                    <Button
                        title='User List'
                        onPress={() => this.props.navigation.navigate('UserScreen')}
                        containerStyle={styles.buttonContainer}
                    />
                    <Button
                        title='User Detail'
                        onPress={() => this.props.navigation.navigate('UserDetailScreen')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.detailButton}
                    />
                </ScrollView>
            </ThemeProvider>
        );
    }
}

const theme = {
    Button: {
        raised: true
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#FFF'
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginVertical: 20,
    },
    addButton: {
        backgroundColor: "green"
    },
    buttonContainer: {
        marginTop: 10
    },
    detailButton: {
        backgroundColor: "blue"
    },
});

export default AddUserScreen;
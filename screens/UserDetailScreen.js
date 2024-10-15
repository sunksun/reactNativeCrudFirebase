import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../database/firebaseDb';
import { Button, Input, ThemeProvider } from 'react-native-elements';
import { EvilIcons, Fontisto, AntDesign } from '@expo/vector-icons';

class UserDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            name: '',
            email: '',
            mobile: '',
            isLoading: true
        };
    }
 
    async componentDidMount() {
        try {
            const userKey = this.props.route.params.userKey;
            const docRef = doc(db, 'react-native-crud', userKey);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const userData = docSnap.data();
                this.setState({
                    key: docSnap.id,
                    name: userData.name,
                    email: userData.email,
                    mobile: userData.mobile,
                    isLoading: false
                });
            } else {
                console.log('Document does not exist!');
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.error('Error fetching document: ', error);
            this.setState({ isLoading: false });
        }
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    updateUser = async () => {
        if (!this.state.name || !this.state.email || !this.state.mobile) {
            alert('Please fill in all fields');
            return;
        }
    
        this.setState({ isLoading: true });
    
        try {
            const userRef = doc(db, 'react-native-crud', this.state.key);
            await updateDoc(userRef, {
                name: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile,
            });
    
            alert('User updated successfully!');
            this.props.navigation.navigate('UserScreen');
        } catch (error) {
            console.error('Error updating user: ', error);
            alert('Failed to update user. Please try again.');
        } finally {
            this.setState({ isLoading: false });
        }
    }

    deleteUser = async () => {
        this.setState({ isLoading: true });
    
        try {
            const userRef = doc(db, 'react-native-crud', this.state.key);
            await deleteDoc(userRef);
    
            alert('User deleted successfully!');
            this.props.navigation.navigate('UserScreen');
        } catch (error) {
            console.error('Error deleting user: ', error);
            alert('Failed to delete user. Please try again.');
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            );
        }

        return (
            <ThemeProvider theme={theme}>
                <ScrollView style={styles.container}>
                    <Input
                        leftIcon={<EvilIcons name="user" size={24} color="black" />}
                        placeholder={'Name'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                    />
                    <Input
                        leftIcon={<Fontisto name="email" size={24} color="black" />}
                        placeholder={'Email'}
                        value={this.state.email}
                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                    />
                    <Input
                        leftIcon={<AntDesign name="mobile1" size={24} color="black" />}
                        placeholder={'Mobile'}
                        value={this.state.mobile}
                        onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
                    />
                    <Button
                        icon={<AntDesign name="edit" size={24} color="white" />}
                        title='Update'
                        onPress={this.updateUser}
                    />
                    <Button
                        icon={<AntDesign name="delete" size={24} color="white" />}
                        title='Delete'
                        onPress={this.deleteUser}
                        containerStyle={{ marginTop: 10 }}
                        buttonStyle={{ backgroundColor: "red" }}
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
        padding: 35
    },
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default UserDetailScreen;
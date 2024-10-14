import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { Badge, ListItem } from 'react-native-elements';
import { db } from '../database/firebaseDb';
import { collection, onSnapshot } from 'firebase/firestore';

class UserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userArr: []
        };
        this.firestoreRef = collection(db, 'react-native-crud');
    }

    componentDidMount() {
        this.unsubscribe = onSnapshot(this.firestoreRef, this.getCollection);
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    getCollection = (querySnapshot) => {
        const userArr = querySnapshot.docs.map(doc => ({
            key: doc.id,
            ...doc.data()
        }));
        this.setState({ userArr, isLoading: false });
    }

    renderUserItem = ({ item, index }) => (
        <ListItem
            key={item.key}
            bottomDivider
            onPress={() => this.props.navigation.navigate('UserDetailScreen', { userKey: item.key })}
        >
            <Badge value={index + 1} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            );
        }

        return (
            <ScrollView style={styles.container}>
                {this.state.userArr.map((item, index) => this.renderUserItem({ item, index }))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default UserScreen;
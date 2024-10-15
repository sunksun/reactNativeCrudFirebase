import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { db } from '../database/firebaseDb';
import { collection, onSnapshot } from 'firebase/firestore';

class UserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userArr: [],
            search: '',
        };
        this.firestoreRef = collection(db, 'react-native-crud');
    }

    componentDidMount() {
        this.unsubscribe = onSnapshot(this.firestoreRef, this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const userArr = querySnapshot.docs.map(doc => ({
            key: doc.id,
            ...doc.data()
        }));
        this.setState({ userArr, isLoading: false });
    }

    updateSearch = (search) => {
        this.setState({ search });
    }

    renderUserItem = ({ item }) => (
        <ListItem
            key={item.key}
            bottomDivider
            onPress={() => this.props.navigation.navigate('UserDetailScreen', { userKey: item.key })}
        >
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

        const { search } = this.state;
        const filteredUsers = this.state.userArr.filter(user => 
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Search by name or email..."
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme
                    round
                />
                <ScrollView style={styles.scrollView}>
                    {filteredUsers.map((item, index) => this.renderUserItem({ item, index }))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
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
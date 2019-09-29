import { Ionicons, EvilIcons } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import {
    Alert,
    AsyncStorage,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { NavigationContext } from 'react-navigation'
import Helena from '../assets/images/Helena.png'
import Colors from '../constants/Colors'
import * as UserService from '../services/UserService'

export default function ProfileScreen() {
    // noinspection JSCheckFunctionSignatures
    const navigation = useContext(NavigationContext)

    const [ user, setUser] = useState({})

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                setUser(JSON.parse(user))
            } else {
                navigation.navigate('Auth')
            }
        })
    }, [])

    async function save() {
        try {
            await UserService.update(user)
            await AsyncStorage.setItem('user', JSON.stringify(user))
            navigation.navigate('Menu')
        } catch (err) {
            if (err.message === 'Network Error') {
                Alert.alert(
                    'Ocorreu um erro',
                    'Não foi possível conectar com o servidor',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            } else if (err.response && err.response.status) {
                if (err.response.status === 500) {
                    Alert.alert(
                        'Ocorreu um erro',
                        'Ocorreu um erro interno. Entre em contato com os responsáveis do aplicativo.',
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false },
                    );
                }
                if (err.response.status === 404) {
                    Alert.alert(
                        'Ocorreu um erro',
                        'Usuário não encontrado',
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false },
                    );
                }
            } else {
                console.error(err)
            }
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} enabled behavior='padding'>
            <ScrollView contentContainerStyle={styles.container2}>
                <View style={styles.top}>
                    <TouchableOpacity
                        style={styles.goToMenuButton}
                        onPress={() => navigation.navigate('Menu')}
                    >
                        <Ionicons name='md-menu' size={32} color='#707070'/>
                    </TouchableOpacity>
                    <Image
                        style={styles.image}
                        source={Helena}
                        resizeMode='contain'
                    />
                    <Text style={styles.title}>Perfil</Text>
                </View>
                <View style={styles.fields}>
                    <EvilIcons
                        name='user'
                        size={190} color='#9f9f9f'
                    />
                    <TextInput
                        style={styles.field}
                        placeholder='Nome completo'
                        placeholderTextColor='#9a9a9a'
                        maxLength={100}
                        value={user.fullName}
                        onChangeText={(value) => setUser(u => ({...user, fullName: value}))}
                    />
                    <TextInput
                        style={styles.field}
                        placeholder='E-mail'
                        placeholderTextColor='#9a9a9a'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        maxLength={255}
                        value={user.email}
                        onChangeText={(value) => setUser(u => ({...user, email: value}))}
                    />
                    <TextInput
                        style={styles.field}
                        placeholder='Senha'
                        placeholderTextColor='#9a9a9a'
                        textContentType='password'
                        secureTextEntry={true}
                        maxLength={64}
                        value={user.password}
                        onChangeText={(value) => setUser(u => ({...user, password: value}))}
                    />
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={save}
                    >
                        <Text style={styles.signUpButtonText}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8 * 2
    },
    top: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8 * 3,
        marginTop: 8 * 3
    },
    image: {
        flex: 1,
        marginTop: 8,
        width: 100,
        height: 50,
        marginRight: 'auto'
    },
    title: {
        flex: 1,
        alignItems: 'center',
        marginRight: 'auto',
        color: '#848484',
        fontSize: 18,
        fontFamily: 'Roboto'
    },
    goToMenuButton: {
        height: 8 * 8,
        backgroundColor: '#e9e9e9',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 8 * 2,
        borderRadius: 8 * 4,
        width: 8 * 8,
        marginRight: 'auto'
    },
    fields: {
        marginTop: 8 * 2,
        marginHorizontal: 8 * 2,
        width: '100%',
        alignItems: 'center'
    },
    field: {
        marginTop: 8 * 2,
        width: '100%',
        height: 8 * 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 8 * 3,
        paddingVertical: 8
    },
    signUpButton: {
        height: 8 * 8,
        backgroundColor: Colors.tintColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 8 * 4,
        borderRadius: 8
    },
    signUpButtonText: {
        fontSize: 8 * 2,
        color: '#f5f5ff',
        fontFamily: 'Roboto',
        fontWeight: '500'
    }
})

import React, { useContext, useEffect, useState } from 'react'
import { AsyncStorage, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { NavigationContext } from 'react-navigation'
import Helena from '../assets/images/Helena.png'
import Colors from '../constants/Colors'
import * as UserService from '../services/UserService'

export default function SignInScreen() {
    // noinspection JSCheckFunctionSignatures
    const navigation = useContext(NavigationContext)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    useEffect(() => {
        AsyncStorage.removeItem('userToken').then()
        AsyncStorage.removeItem('user').then()
    }, [])

    const _signInAsync = async () => {
        try {
            console.log(email, password)
            const res = await UserService.auth(email, password)
            console.log(res)
            await AsyncStorage.setItem('userToken', res.data.token)
            await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
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
                if (err.response.status === 400) {
                    Alert.alert(
                        'Ocorreu um erro',
                        'Senha incorreta',
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
            <Image
                style={styles.image}
                source={Helena}
                resizeMode='contain'
            />
            <Text style={styles.subheader}>Seja bem-vindo</Text>
            <TextInput
                style={styles.field}
                placeholder='E-mail'
                placeholderTextColor='#9a9a9a'
                keyboardType='email-address'
                textContentType='emailAddress'
                maxLength={255}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.field}
                placeholder='Senha'
                placeholderTextColor='#9a9a9a'
                textContentType='password'
                secureTextEntry={true}
                maxLength={64}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={styles.signInButton}
                onPress={_signInAsync}
            >
                <Text style={styles.signInButtonText}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.signUpButtonText}>CRIAR NOVA CONTA</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8 * 2,
        backgroundColor: '#fafafa'
    },
    image: {
        width: 200,
        height: 150
    },
    subheader: {
        color: '#959595',
        fontSize: 18,
        fontFamily: 'Roboto'
    },
    field: {
        marginHorizontal: 8 * 2,
        marginTop: 8 * 2,
        width: '100%',
        height: 8 * 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 8 * 3,
        paddingVertical: 8
    },
    signInButton: {
        height: 8 * 8,
        backgroundColor: Colors.tintColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 8 * 4,
        borderRadius: 8
    },
    signInButtonText: {
        fontSize: 8 * 2,
        color: '#f5f5ff',
        fontFamily: 'Roboto',
        fontWeight: '500'
    },
    signUpButton: {
        height: 8 * 8,
        backgroundColor: '#e9e9e9',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 8 * 2,
        borderRadius: 8
    },
    signUpButtonText: {
        fontSize: 8 * 2,
        color: Colors.tintColor,
        fontFamily: 'Roboto',
        fontWeight: '500'
    },
})

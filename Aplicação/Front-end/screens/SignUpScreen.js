import { Ionicons } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
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

export default function SignUpScreen() {
    // noinspection JSCheckFunctionSignatures
    const navigation = useContext(NavigationContext)
    const [ fullName, setFullName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const _signUpAsync = async () => {
        try {
            const res = await UserService.create(fullName, email, password, confirmPassword)
            await AsyncStorage.setItem('userToken', res.data.token)
            await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
            navigation.navigate('Config')
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
                if (err.response.status === 400) {
                    Alert.alert(
                        'Ocorreu um erro',
                        err.response.data.message,
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
                        style={styles.goBackButton}
                        onPress={() => navigation.navigate('Auth')}
                    >
                        <Ionicons name='md-arrow-round-back' size={32} color='#707070'/>
                    </TouchableOpacity>
                </View>
                <Image
                    style={styles.image}
                    source={Helena}
                    resizeMode='contain'
                />
                <Text style={styles.subheader}>Criar nova conta</Text>
                <TextInput
                    style={styles.field}
                    placeholder='Nome completo'
                    placeholderTextColor='#9a9a9a'
                    maxLength={100}
                    value={fullName}
                    onChangeText={setFullName}
                />
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
                <TextInput
                    style={styles.field}
                    placeholder='Confirmação de senha'
                    placeholderTextColor='#9a9a9a'
                    textContentType='password'
                    secureTextEntry={true}
                    maxLength={64}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={_signUpAsync}
                >
                    <Text style={styles.signUpButtonText}>CRIAR</Text>
                </TouchableOpacity>
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
    },
    goBackButton: {
        height: 8 * 8,
        backgroundColor: '#e9e9e9',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 8 * 2,
        borderRadius: 8 * 4,
        width: 8 * 8,
        marginRight: 'auto'
    },
    top: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8 * 3,
        marginTop: 8 * 3
    },
})

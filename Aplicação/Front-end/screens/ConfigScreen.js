import { Ionicons } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import {
    Alert,
    AsyncStorage,
    Image,
    KeyboardAvoidingView,
    Picker,
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

export default function ConfigScreen() {
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
                    <Text style={styles.title}>Parametrização</Text>
                </View>
                <View style={styles.fields}>
                    <Text style={styles.fieldLabel}>Nome do negócio</Text>
                    <TextInput
                        style={styles.field}
                        value={user.businessName}
                        onChangeText={(value) => setUser(u => ({...user, businessName: value}))}
                    />
                    <Text style={styles.fieldLabel}>Seguimento do negócio</Text>
                    <View style={[ styles.field, styles.fieldPicker ]}>
                        <Picker
                            style={styles.picker}
                            selectedValue={user.businessPursuitId}
                            onValueChange={(value) => setUser(u => ({...user, businessPursuitId: value}))}
                        >
                            <Picker.Item label='' value=''/>
                            <Picker.Item label='Vestuário' value={1}/>
                            <Picker.Item label='Calçados' value={2}/>
                            <Picker.Item label='Alimentos' value={3}/>
                            <Picker.Item label='Restaurantes' value={4}/>
                            <Picker.Item label='Imagem Pessoal' value={5}/>
                        </Picker>
                    </View>
                    <Text style={styles.fieldLabel}>Faixa etária do público alvo</Text>
                    <View style={[ styles.field, styles.fieldPicker ]}>
                        <Picker
                            style={styles.picker}
                            selectedValue={user.businessTargetAgeId}
                            onValueChange={(value) => setUser(u => ({...user, businessTargetAgeId: value}))}
                        >
                            <Picker.Item label='' value=''/>
                            <Picker.Item label='0 - 10' value={1}/>
                            <Picker.Item label='10 - 20' value={2}/>
                            <Picker.Item label='20 - 30' value={3}/>
                            <Picker.Item label='30 - 40' value={4}/>
                            <Picker.Item label='40 +' value={5}/>
                            <Picker.Item label='Todas as idades' value={6}/>
                        </Picker>
                    </View>
                    <Text style={styles.fieldLabel}>Porte do negócio</Text>
                    <View style={[ styles.field, styles.fieldPicker ]}>
                        <Picker
                            style={styles.picker}
                            selectedValue={user.businessSizeId}
                            onValueChange={(value) => setUser(u => ({...user, businessSizeId: value}))}
                        >
                            <Picker.Item label='' value=''/>
                            <Picker.Item label='Micro' value={1}/>
                            <Picker.Item label='Pequeno' value={2}/>
                            <Picker.Item label='Médio' value={3}/>
                            <Picker.Item label='Grande' value={4}/>
                        </Picker>
                    </View>
                    <Text style={styles.fieldLabel}>Cor primária do negócio</Text>
                    <View style={[ styles.field, styles.fieldPicker ]}>
                        <Picker
                            style={styles.picker}
                            selectedValue={user.businessPrimaryColorId}
                            onValueChange={(value) => setUser(u => ({...user, businessPrimaryColorId: value}))}
                        >
                            <Picker.Item label='' value=''/>
                            <Picker.Item label='Vermelho' value={1}/>
                            <Picker.Item label='Verde' value={2}/>
                            <Picker.Item label='Azul' value={3}/>
                            <Picker.Item label='Rosa' value={4}/>
                            <Picker.Item label='Preto' value={5}/>
                            <Picker.Item label='Cinza' value={6}/>
                            <Picker.Item label='Amarelo' value={7}/>
                        </Picker>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={save}
                >
                    <Text style={styles.saveButtonText}>SALVAR</Text>
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
        width: '100%'
    },
    fieldLabel: {
        marginBottom: 8,
        marginLeft: 8,
        color: '#868686',
        fontFamily: 'Roboto'
    },
    field: {
        width: '100%',
        height: 8 * 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 8 * 3,
        paddingVertical: 8,
        marginBottom: 16
    },
    picker: {
        flex: 1,
        width: '100%'
    },
    fieldPicker: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingLeft: 8 * 2
    },
    saveButton: {
        height: 8 * 8,
        backgroundColor: Colors.tintColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 8 * 4,
        borderRadius: 8
    },
    saveButtonText: {
        fontSize: 8 * 2,
        color: '#f5f5ff',
        fontFamily: 'Roboto',
        fontWeight: '500'
    }
})

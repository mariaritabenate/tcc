import { Feather, Ionicons } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import {
    AsyncStorage,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { NavigationContext } from 'react-navigation'
import Helena from '../assets/images/Helena.png'

export default function MenuScreen() {
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

    return (
        <KeyboardAvoidingView style={styles.container} enabled behavior='padding'>
            <ScrollView contentContainerStyle={styles.container2}>
                <View style={styles.top}>
                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={() => navigation.navigate('Auth')}
                >
                    <Ionicons name='md-exit' size={32} color='#707070'/>
                </TouchableOpacity>
                <Text style={styles.title}>Olá, {user.fullName}</Text>
                </View>
                <Image
                    style={styles.image}
                    source={Helena}
                    resizeMode='contain'
                />
                <View style={styles.menuGroup}>
                    <TouchableOpacity
                        style={styles.menu}
                        onPress={() => navigation.navigate('Calendar')}
                    >
                        <Feather name='calendar' size={64} color='#9f9f9f'/>
                        <Text style={styles.menuText}>Agenda</Text>
                    </TouchableOpacity>
                    <View style={[ styles.separatorV, { marginBottom: -60 } ]}/>
                    <TouchableOpacity
                        style={styles.menu}
                        onPress={() => navigation.navigate('Tips')}
                    >
                        <Feather name='heart' size={64} color='#9f9f9f'/>
                        <Text style={styles.menuText}>Dicas</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separatorH}/>
                <View style={styles.menuGroup}>
                    <TouchableOpacity
                        style={styles.menu}
                        onPress={() => navigation.navigate('Config')}
                    >
                        <Feather name='settings' size={64} color='#9f9f9f'/>
                        <Text style={styles.menuText}>Parametrização</Text>
                    </TouchableOpacity>
                    <View style={[ styles.separatorV, { marginTop: -60 } ]}/>
                    <TouchableOpacity
                        style={styles.menu}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Feather name='user' size={64} color='#9f9f9f'/>
                        <Text style={styles.menuText}>Perfil</Text>
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
    title: {
        flex: 1,
        alignItems: 'center',
        marginRight: 'auto',
        color: '#848484',
        fontSize: 18,
        fontFamily: 'Roboto',
        marginLeft: 16
    },
    image: {
        marginTop: 8 * 4,
        width: 200,
        height: 150
    },
    signOutButton: {
        height: 8 * 8,
        backgroundColor: '#e9e9e9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8 * 4,
        width: 8 * 8,
        marginRight: 'auto',
    },
    menuGroup: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    menu: {
        marginTop: 8 * 4,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8 * 3
    },
    menuText: {
        fontFamily: 'Roboto',
        marginTop: 8,
        fontSize: 20,
        color: '#7f7f7f'
    },
    separatorH: {
        width: '70%',
        height: 2,
        backgroundColor: '#e2e2e2'
    },
    separatorV: {
        width: 2,
        height: '100%',
        backgroundColor: '#e2e2e2'
    }
})

import { Ionicons } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationContext } from 'react-navigation'
import Helena from '../assets/images/Helena.png'
import landscape from '../assets/images/landscape.png'
import * as TipService from '../services/TipService'

export default function TipsScreen() {
    // noinspection JSCheckFunctionSignatures
    const navigation = useContext(NavigationContext)

    const [ tips, setTips ] = useState([])

    useEffect(() => {
        TipService
            .findAll()
            .then((res) => {
                setTips(res.data)
            })
    }, [])

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
                    <Text style={styles.title}>Dicas</Text>
                </View>
                <View style={styles.tips}>
                    {tips.map(t => (
                        <View style={styles.tip} key={t.id}>
                            <Image
                                style={styles.tipImage}
                                source={{uri: t.imageUrl}}
                            />
                            <Text style={styles.tipTitle}>{t.title}</Text>
                            <Text style={styles.tipContent}>
                                {t.content}
                            </Text>
                        </View>
                    ))}
                    {/*<View style={styles.tip}>
                        <Image
                            style={styles.tipImage}
                            source={landscape}
                        />
                        <Text style={styles.tipTitle}>Dica #2</Text>
                        <Text style={styles.tipContent}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aperiam,
                            aspernatur aut deserunt dolor earum enim fugit illo illum iste nemo quod repellat
                            repellendus voluptatibus. Consequuntur nulla pariatur tenetur.
                        </Text>
                    </View>
                    <View style={styles.tip}>
                        <Image
                            style={styles.tipImage}
                            source={landscape}
                        />
                        <Text style={styles.tipTitle}>Dica #3</Text>
                        <Text style={styles.tipContent}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aperiam,
                            aspernatur aut deserunt dolor earum enim fugit illo illum iste nemo quod repellat
                            repellendus voluptatibus. Consequuntur nulla pariatur tenetur.
                        </Text>
                    </View>*/}
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
    tips: {
        flex: 1
    },
    tip: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        marginBottom: 8 * 2,
        shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.12,
        // shadowRadius: 3,
        elevation: 2
    },
    tipImage: {
        width: '100%',
        height: 150,
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 8,
        resizeMode: 'cover'
    },
    tipTitle: {
        fontWeight: '500',
        fontFamily: 'Roboto',
        color: '#848484',
        padding: 8 * 2,
        paddingBottom: 0
    },
    tipContent: {
        fontFamily: 'Roboto',
        color: '#575757',
        padding: 8 * 2
    }
})

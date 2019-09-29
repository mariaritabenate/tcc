import { Ionicons } from '@expo/vector-icons'
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
import Colors from '../constants/Colors'
import { getCalendar } from '../services/UserService'

export default function CalendarScreen() {
    // noinspection JSCheckFunctionSignatures
    const navigation = useContext(NavigationContext)

    const [ user, setUser ] = useState({})
    const [ calendar, setCalendar ] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                setUser(JSON.parse(user))
            } else {
                navigation.navigate('Auth')
            }
        })
    }, [])

    useEffect(() => {
        if (user.id) {
            getCalendar(user.id).then((res) => {
                setCalendar(res.data[0])
            })
        }
    }, [ user.id ])

    const today = new Date()
    const monday = getMonday(new Date(today))
    let tuesday = new Date(monday)
    tuesday.setDate(tuesday.getDate() + 1)
    let wednesday = new Date(tuesday)
    wednesday.setDate(wednesday.getDate() + 1)
    let thursday = new Date(wednesday)
    thursday.setDate(thursday.getDate() + 1)
    let friday = new Date(thursday)
    friday.setDate(friday.getDate() + 1)

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
                    <Text style={styles.title}>Agenda</Text>
                </View>
                {calendar && <>
                    <View style={[ styles.event, monday.getTime() === today.getTime() ? styles.eventToday : null ]}>
                        <View style={styles.eventDate}>
                            <Text
                                style={[ styles.eventDateDay, monday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >{monday.getDate()}</Text>
                            <Text
                                style={[ styles.eventDateWeekday, monday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >Seg</Text>
                        </View>
                        <View style={[ styles.eventInfo, styles['color' + calendar.color] ]}>
                            <Text style={[ styles.eventInfoText, styles['textcolor' + calendar.color] ]}>{calendar.monday}</Text>
                            <Text style={[ styles.eventInfoTime, styles['textcolor' + calendar.color] ]}>{calendar.time}</Text>
                        </View>
                    </View>
                    <View style={[ styles.event, tuesday.getTime() === today.getTime() ? styles.eventToday : null ]}>
                        <View style={styles.eventDate}>
                            <Text
                                style={[ styles.eventDateDay, tuesday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >{tuesday.getDate()}</Text>
                             <Text
                                style={[ styles.eventDateWeekday, tuesday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >Ter</Text>
                        </View>
                        <View style={[ styles.eventInfo, styles['color' + calendar.color] ]}>
                            <Text style={[ styles.eventInfoText, styles['textcolor' + calendar.color] ]}>{calendar.tuesday}</Text>
                            <Text style={[ styles.eventInfoTime, styles['textcolor' + calendar.color] ]}>{calendar.time}</Text>
                        </View>
                    </View>
                    <View style={[ styles.event, wednesday.getTime() === today.getTime() ? styles.eventToday : null ]}>
                        <View style={styles.eventDate}>
                            <Text
                                style={[ styles.eventDateDay, wednesday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >{wednesday.getDate()}</Text>
                             <Text
                                style={[ styles.eventDateWeekday, wednesday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >Qua</Text>
                        </View>
                        <View style={[ styles.eventInfo, styles['color' + calendar.color] ]}>
                            <Text style={[ styles.eventInfoText, styles['textcolor' + calendar.color] ]}>{calendar.wednesday}</Text>
                            <Text style={[ styles.eventInfoTime, styles['textcolor' + calendar.color] ]}>{calendar.time}</Text>
                        </View>
                    </View>
                    <View style={[ styles.event, thursday.getTime() === today.getTime() ? styles.eventToday : null ]}>
                        <View style={styles.eventDate}>
                            <Text
                                style={[ styles.eventDateDay, thursday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >{thursday.getDate()}</Text>
                             <Text
                                style={[ styles.eventDateWeekday, thursday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >Qui</Text>
                        </View>
                        <View style={[ styles.eventInfo, styles['color' + calendar.color] ]}>
                            <Text style={[ styles.eventInfoText, styles['textcolor' + calendar.color] ]}>{calendar.thursday}</Text>
                            <Text style={[ styles.eventInfoTime, styles['textcolor' + calendar.color] ]}>{calendar.time}</Text>
                        </View>
                    </View>
                    <View style={[ styles.event, friday.getTime() === today.getTime() ? styles.eventToday : null ]}>
                        <View style={styles.eventDate}>
                            <Text
                                style={[ styles.eventDateDay, friday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >{friday.getDate()}</Text>
                             <Text
                                style={[ styles.eventDateWeekday, friday.getTime() === today.getTime() ? styles.eventToday : null ]}
                            >Sex</Text>
                        </View>
                        <View style={[ styles.eventInfo, styles['color' + calendar.color] ]}>
                            <Text style={[ styles.eventInfoText, styles['textcolor' + calendar.color] ]}>{calendar.friday}</Text>
                            <Text style={[ styles.eventInfoTime, styles['textcolor' + calendar.color] ]}>{calendar.time}</Text>
                        </View>
                    </View>
                </>}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

function getMonday(d) {
    d = new Date(d)
    const day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
    return new Date(d.setDate(diff))
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
    event: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 8 * 2,
        opacity: 0.5
    },
    eventDate: {
        width: 40,
        justifyContent: 'center'
    },
    eventDateDay: {
        fontSize: 18,
        fontFamily: 'Roboto',
        color: '#616161'
    },
    eventDateWeekday: {
        fontFamily: 'Roboto',
        color: '#979797'
    },
    eventInfo: {
        backgroundColor: Colors.tintColor,
        padding: 8 * 2,
        borderRadius: 8,
        width: '100%'
    },
    eventInfoText: {
        color: 'white',
        fontWeight: '500',
        fontFamily: 'Roboto'
    },
    eventInfoTime: {
        color: 'white',
        fontFamily: 'Roboto'
    },
    eventToday: {
        fontWeight: '500',
        color: '#424242',
        opacity: 1
    },

    colorred: {
        backgroundColor: 'red',
    },
    colorgreen: {
        backgroundColor: 'green',
    },
    colorblue: {
        backgroundColor: 'blue',
    },
    colorpink: {
        backgroundColor: 'pink',
    },
    colorblack: {
        backgroundColor: 'black',
    },
    colorgray: {
        backgroundColor: 'gray',
    },
    coloryellow: {
        backgroundColor: 'yellow',
    },
    textcoloryellow: {
        color: 'black'
    }
})

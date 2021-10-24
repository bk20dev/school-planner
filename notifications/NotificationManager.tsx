import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef} from 'react';
import {Platform} from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const NotificationManager = () => {
    const [setExpoPushToken] = useState('');
    const [notification,setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(() => {
        // @ts-ignore
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // @ts-ignore
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            // @ts-ignore
            return setNotification(notification);
        });

        // @ts-ignore
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            // @ts-ignore
            Notifications.removeNotificationSubscription(notificationListener.current);
            // @ts-ignore
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        const backgroundSubscription =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        const foregroundSubscription =
            Notifications.addNotificationReceivedListener((notification) => {
                console.log(notification);
            });
        return () => {
            backgroundSubscription.remove();
            foregroundSubscription.remove();
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('reminder', {
                name: 'exam',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                sound: "sound.wav",
            });
        }
    }

}
export async function scheduleNotification(title:string,subtitle:string,content:string,date:Date) {
    await Notifications.setNotificationChannelAsync('reminder', {
        name: 'exam',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound:"sound.wav",
    });
    return await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            subtitle:subtitle,
            body: content,
            sound:true,
            autoDismiss:false,
        },
        trigger: {seconds:date.getTime()-Date.now()},
    });
}

export async function getScheduledNotifiactions(){
    return await Notifications.getAllScheduledNotificationsAsync();
}

export async function removeScheduledNotification(identifier:string){
    await Notifications.cancelScheduledNotificationAsync(identifier);
}
export async function removeAllScheduledNotification(){
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export default NotificationManager;

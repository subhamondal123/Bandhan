import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';

export function fetchCurrentLocation() {
    return new Promise(async function (resolved, reject) {
        try {
            if (Platform.OS == "android") {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission Required',
                        message:
                            'Application needs access to your Location',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    resolved(getGeoLocation());
                }
            } else {
                resolved(getGeoLocation());
            }
        } catch (err) {
            // resolved(err)
            console.log(err)
        }
    });
}

function getGeoLocation() {
    return new Promise(async function (resolved, reject) {
        try {
            if (Platform.OS == 'ios') {
                Geolocation.requestAuthorization("always");
            }
            Geolocation.getCurrentPosition(
                (position) => {
                    // console.log(position);
                    let currentLocation = position.coords;
                    resolved(currentLocation)
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } catch (err) {
            // resolved(err)
            console.log(err)
        }
    })
}
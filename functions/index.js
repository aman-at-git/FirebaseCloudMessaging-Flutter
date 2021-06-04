//worked
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().functions);

var newData;

exports.myTrigger = functions.firestore.document('users/{id}').onCreate(async (snapshot, context) => {

    if (snapshot.empty) {
            console.log('No Devices');
            return;
        }

        newData = snapshot.data().tokennn;

        const deviceIdTokens = await admin
            .firestore()
            .collection('users')
            .get();

        var tokens = [
            newData
        ];

        var payload = {
            notification: {
                title: 'Notification',
                body: 'This is a notification',
                sound: 'default',
            },
        };

        try {
            const response = await admin.messaging().sendToDevice(tokens, payload);
            console.log('Notification sent successfully');
        } catch (err) {
            console.log(err);
        }
});
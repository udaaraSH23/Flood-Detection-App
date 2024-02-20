const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotificationOnWaterLevelChange = functions.firestore
  .document('floodDetection/{floodId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data().waterLvState;
    const oldValue = change.before.data().waterLvState;

    // Check if water level changed
    if (newValue !== oldValue) {
        const userCollect = admin.firestore().collection('users'); // Assuming floodId is the userId

      try {
        // Retrieve the user document from the 'users' collection based on userId
        
        const userSnapshot = await admin.firestore().collection('users').doc(userId).get();

        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          const userToken = userData.fcmToken;

          if (userToken) {
            const message = {
              token: userToken,
              notification: {
                title: 'Water Level Changed!',
                body: `New water level: ${newValue}`,
              },
            };

            // Send the notification
            await admin.messaging().send(message);
            console.log('Notification sent successfully!');
          } else {
            console.log('FCM token not found for user:', userId);
          }
        } else {
          console.log('User document not found for userId:', userId);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    }

    return null;
  });

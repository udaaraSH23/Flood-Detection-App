const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendEmergencyNotification = functions.database
  .ref('/warningState/state')
  .onUpdate(async (change, context) => {
    const newValue = change.after.val();
    const oldValue = change.before.val();

    // Check if the warning state changed to "emergency"
    if (newValue === 'emergency' && newValue !== oldValue) {
      try {
        // Retrieve FCM tokens of all users from the 'users' node
        const usersSnapshot = await admin.database().ref('/users').once('value');
        const usersData = usersSnapshot.val();

        // Send notification to each user
        Object.keys(usersData).forEach(userId => {
          const user = usersData[userId];
          const userToken = user.token;

          if (userToken) {
            const message = {
              token: userToken,
              notification: {
                title: 'Emergency Alert!',
                body: 'Emergency situation detected.',
              },
            };

            // Send the notification
            admin.messaging().send(message)
              .then(response => {
                console.log('Notification sent successfully:', response);
              })
              .catch(error => {
                console.error('Error sending notification:', error);
              });
          }
        });
      } catch (error) {
        console.error('Error sending emergency notification:', error);
      }
    }

    return null;
  });

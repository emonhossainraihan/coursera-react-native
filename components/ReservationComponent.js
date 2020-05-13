import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Modal,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

//!animations
import * as Animatable from 'react-native-animatable';

//!expo sdk
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as Calendar from 'expo-calendar';

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export const Reservation = () => {
  const [guests, setGuests] = useState(1);
  const [smoking, setSmoking] = useState(false);
  const [date, setDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('reservation-messages', {
        name: 'Messages',
        priority: 'max',
        sound: true,
        vibrate: [0, 250, 500, 250],
      });
    }

    Notifications.createCategoryAsync('myCategoryName', [
      {
        actionId: 'openEvent',
        buttonTitle: 'Open event in calendar',
      },
    ]);

    Notifications.addListener(handleNotification);
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const resetForm = () => {
    setGuests(1);
    setSmoking(false);
    setDate('');
  };

  const handleNotification = ({ actionId, data }) => {
    switch (actionId) {
      case 'openEvent':
        Calendar.openEventInCalendar(data.eventId);
        break;
      default:
        break;
    }
  };

  const handleReservation = () => {
    addReservationToCalendar(date);
    resetForm();
    // toggleModal();
  };

  const addReservationToCalendar = async (date) => {
    await obtainCalendarPermission();
    let calendarID = await getCalendar();

    if (!calendarID) {
      calendarID = await createCalendar();
    }

    const eventID = await Calendar.createEventAsync(calendarID, {
      title: 'Con Fusion Table Reservation',
      startDate: new Date(Date.parse(date)),
      endDate: new Date(Date.parse(date) + 2 * 60 * 60 * 1000),
      location:
        '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
      timeZone: 'Asia/Hong_Kong',
    });

    presentLocalNotification(date, eventID);
  };

  const obtainCalendarPermission = async () => {
    let permission = await Permissions.getAsync(Permissions.CALENDAR);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.CALENDAR);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    return permission;
  };

  const getCalendar = async () => {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const calendar = calendars.find(
      ({ title }) => title === 'Con Fusion Calendar'
    );

    if (calendar) {
      return calendar.id;
    } else {
      return;
    }
  };

  const createCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Con Fusion Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    return newCalendarID;
  };

  const getDefaultCalendarSource = async () => {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(
      (each) => each.source.name === 'Default'
    );
    return defaultCalendars[0].source;
  };

  const presentLocalNotification = async (date, eventId) => {
    await obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
      title: 'Your Reservation',
      body: 'Reservation for ' + date + ' requested',
      data: {
        eventId,
      },
      ios: {
        sound: true,
      },
      android: {
        channelId: 'reservation-messages',
        sound: true,
        vibrate: true,
        color: '#512DA8',
      },
      categoryId: 'myCategoryName',
    });
  };

  const obtainNotificationPermission = async () => {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    return permission;
  };

  return (
    <Animatable.View animation="zoomIn" duration={1000}>
      <ScrollView>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker
            style={styles.formItem}
            selectedValue={guests}
            onValueChange={(itemValue) => setGuests(itemValue)}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
          <Switch
            style={styles.formItem}
            value={smoking}
            trackColor="#512DA8"
            onValueChange={(value) => setSmoking(value)}
          ></Switch>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date and Time</Text>
          <DatePicker
            style={{ flex: 2, marginRight: 20 }}
            date={date}
            format=""
            mode="datetime"
            placeholder="select date and Time"
            minDate="2017-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => setDate(date)}
          />
        </View>
        <View style={styles.formRow}>
          <Button
            // onPress={handleReservation}
            onPress={() =>
              Alert.alert(
                'Your Reservation OK?',
                `Number of Guests: ${guests} \n Smoking? ${smoking} \n Date and Time: ${date}`,
                [
                  {
                    text: 'OK',
                    onPress: handleReservation,
                  },
                  {
                    text: 'Cancel',
                    onPress: resetForm,
                    style: 'cancel',
                  },
                ],
                { cancelable: false }
              )
            }
            title="Reserve"
            color="#512DA8"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={showModal}
          // onDismiss={resetForm} // Exucute after close modal
          onRequestClose={toggleModal} // Exucute when user go back from device button
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.modal}>
              <Card title="Your Reservation">
                <Text style={styles.modalText}>Number of Guests: {guests}</Text>
                <Text style={styles.modalText}>
                  Smoking?: {smoking ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.modalText}>Date and Time: {date}</Text>

                <Button
                  onPress={() => {
                    resetForm();
                    toggleModal();
                  }}
                  color="#512DA8"
                  title="Close"
                />
              </Card>
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </Animatable.View>
  );
};

export default Reservation;

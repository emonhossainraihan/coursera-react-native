/*  
Before review my assignment you may read this thread: https://www.coursera.org/learn/react-native/discussions/weeks/1/threads/8PifLG4EQ724nyxuBDO9DQ

beacuse the instructor use react navigation v2 which is far old hence I use react navigation v5 latest one to implement 
docs link: https://reactnavigation.org/docs/getting-started/
*/

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {
  render() {
    return (
      <Card title="Contact Information">
        <Text style={{ margin: 10 }}>121, Clear Water Bay Road</Text>
        <Text style={{ margin: 10 }}>Clear Water Bay, Kowloon</Text>
        <Text style={{ margin: 10 }}>HONG KONG</Text>
        <Text style={{ margin: 10 }}>Tel: +852 1234 5678</Text>
        <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>
        <Text style={{ margin: 10 }}>Email:confusion@food.net</Text>
      </Card>
    );
  }
}

export default Contact;

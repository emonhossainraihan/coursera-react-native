import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() => navigate('Dishdetail', { dishId: item.id })}
          leftAvatar={{ source: require('./images/uthappizza.png') }}
        />
      );
    };

    return (
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default Menu;

//! The keyExtractor will extract one of the props off each
//! item in the array/data and use that as a key here

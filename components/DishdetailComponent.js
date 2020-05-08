import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Button, Modal } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

//!redux part
import { postFavorite, postComment } from '../redux/ActionCreators';

//!animations
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (author, comment, dishId, rating) =>
    dispatch(postComment(author, comment, dishId, rating)),
});

function RenderDish(props) {
  const { dish, favorite, onPress, toggleModal } = props;

  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
            <Icon
              raised
              reverse
              name={favorite ? 'heart' : 'heart-o'}
              type="font-awesome"
              color="#f50"
              onPress={() =>
                favorite ? console.log('Already favorite') : onPress()
              }
            />
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="#512DA8"
              onPress={() => toggleModal()}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          ratingCount={item.rating}
          imageSize={12}
          style={{ flexDirection: 'row' }}
        />
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}{' '}
        </Text>
      </View>
    );
  };

  if (comments != null) {
    return (
      <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title="Comments">
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comment: '',
      author: '',
      rating: 5,
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment() {
    const dishId = parseInt(this.props.route.params.dishId, 10);
    const { author, comment, rating } = this.state;
    this.props.postComment(author, comment, dishId, rating);
    this.toggleModal();
  }

  render() {
    const dishId = this.props.route.params.dishId;
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          showModal={this.state.showModal}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View
            style={{
              justifyContent: 'center',
              margin: 20,
            }}
          >
            <Rating
              showRating
              value={this.state.rating}
              selectedValue={this.state.rating}
              onFinishRating={() =>
                this.setState({ rating: this.state.rating })
              }
            ></Rating>
            <Input
              placeholder="Author"
              leftIcon={
                <Icon name="user" type="font-awesome" size={24} color="black" />
              }
              onChangeText={(value) => this.setState({ author: value })}
            />
            <Input
              placeholder="Comment"
              leftIcon={
                <Icon
                  name="comment"
                  type="font-awesome"
                  size={24}
                  color="black"
                />
              }
              onChangeText={(value) => this.setState({ comment: value })}
            />
            <Button
              onPress={() => {
                this.toggleModal();
                this.handleComment();
              }}
              color="#512DA8"
              title="SUBMIT"
            />
            <Button
              onPress={() => {
                this.toggleModal();
              }}
              color="#808080"
              title="CANCEL"
            />
          </View>
        </Modal>
      </ScrollView>
    );
    //! plus turn [+dishId] an integer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

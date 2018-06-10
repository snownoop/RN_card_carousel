import React, { Component } from "react";
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_TRESHHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
const RIGHT_DIRECTION = 'right';
const LEFT_DIRECTION = 'left';

const STYLE = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  }
}

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };

    this.position = new Animated.ValueXY(0, 0);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({
          x: gesture.dx,
          y: gesture.dy
        });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_TRESHHOLD) {
          this.forceSwipe(RIGHT_DIRECTION);
        } else if (gesture.dx < -SWIPE_TRESHHOLD) {
          this.forceSwipe(LEFT_DIRECTION);
        } else {
          this.resetPosition();
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (nextProps.data !== data) {
      this.setState({  currentIndex: 0 });
    }
  }

  componentWillUpdate() {
    // For Android
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    // For both Androdi and IOS
    LayoutAnimation.spring()
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const { currentIndex } = this.state;
    const currentItem = data[currentIndex];
    direction === RIGHT_DIRECTION ? onSwipeRight(currentItem) : onSwipeLeft(currentItem);
    this.position.setValue({ x: 0, y: 0 });
    this.setState({ currentIndex: currentIndex + 1 });
  }

  forceSwipe(direction) {
    const x = direction === RIGHT_DIRECTION ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => this.onSwipeComplete(direction));
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"]
    });
    return {
      ...this.position.getLayout(),
      transform: [{ rotate: rotate }]
    };
  }

  getCardStackStyle(index) {
    const { currentIndex } = this.state;
    return index - currentIndex <= 3 ? { top: 10 * (index - currentIndex)} : { top: 10 };
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: {
        x: 0,
        y: 0
      }
    }).start();
  }

  renderCards() {
    const { data, renderCard, renderNoMoreCards } = this.props;
    const { currentIndex } = this.state;
    if (currentIndex >= data.length) return renderNoMoreCards();
    return data.map((item, index) => {
      if (index < currentIndex) return null;
      if (index === currentIndex) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), STYLE.cardStyle]}
            {...this.panResponder.panHandlers}
          >
            {renderCard(item, index)}
          </Animated.View>
        );
      }
      return (
        // Animaed.View to remove flash
        <Animated.View key={item.id} style={[this.getCardStackStyle(index), STYLE.cardStyle]}>
          {renderCard(item, index)}
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

export default Deck;

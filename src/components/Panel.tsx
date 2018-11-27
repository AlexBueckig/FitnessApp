import React, { Component } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

interface IProps {
  title: string;
}
interface IState {
  expanded: boolean;
  title: string;
  animation: Animated.Value;
  maxHeight: number;
  minHeight: number;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  button: {},
  buttonImage: {
    width: 30,
    height: 25
  }
});

class Panel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value(39),
      minHeight: 39,
      maxHeight: 0
    };
  }

  public render() {
    const icon = this.state.expanded ? 'arrow-drop-down' : 'arrow-drop-up';
    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]}>
        <View style={styles.titleContainer} onLayout={this.setMinHeight.bind(this)}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableHighlight style={styles.button} onPress={this.toggle.bind(this)} underlayColor="#f1f1f1">
            <Icon name={icon} />
          </TouchableHighlight>
        </View>
        <View onLayout={this.setMaxHeight.bind(this)}>{this.props.children}</View>
      </Animated.View>
    );
  }

  private toggle() {
    const initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    const finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      // Step 4
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  private setMinHeight(event: LayoutChangeEvent) {
    console.log('SetMinHeight: ' + event.nativeEvent.layout.height);
    this.setState({ minHeight: event.nativeEvent.layout.height });
  }

  private setMaxHeight(event: LayoutChangeEvent) {
    console.log('SetMaxHeight: ' + event.nativeEvent.layout.height);
    this.setState({ maxHeight: event.nativeEvent.layout.height });
  }
}

export default Panel;

import * as React from "react"
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  StyleSheet,
  Text,
  View,
} from "react-native"

interface RootScreenState {
  dropZoneValues: LayoutRectangle
  pan: Animated.ValueXY
  showDraggable: boolean
}

export default class RootScreen extends React.Component<{}, RootScreenState> {
  private panResponder: PanResponderInstance

  constructor(props: any) {
    super(props)

    this.state = {
      showDraggable: true,
      dropZoneValues: { x: 0, y: 0, width: 0, height: 0 },
      pan: new Animated.ValueXY(),
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        { nativeEvent: null },
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y,
        },
      ]),
      onPanResponderRelease: this._onPanResponderRelease,
    })
  }

  _onPanResponderRelease = (e: GestureResponderEvent, gestureState: PanResponderGestureState): void => {
    if (this.isDropZone(gestureState)) {
      this.setState({
        showDraggable: false,
      })
    } else {
      Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start()
    }
  }

  isDropZone(gestureState: PanResponderGestureState): boolean {
    var dz = this.state.dropZoneValues
    return gestureState.moveY > dz.y && gestureState.moveY < dz.y + dz.height
  }

  setDropZoneValues(event: LayoutChangeEvent): void {
    this.setState({
      dropZoneValues: event.nativeEvent.layout,
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View onLayout={this.setDropZoneValues.bind(this)} style={styles.dropZone}>
          <Text style={styles.text}>End Zone</Text>
        </View>

        {this.renderDraggable()}
      </View>
    )
  }

  renderDraggable() {
    if (this.state.showDraggable) {
      return (
        <View style={styles.draggableContainer}>
          <Animated.View {...this.panResponder.panHandlers} style={[this.state.pan.getLayout(), styles.circle]}>
            <Text style={styles.text}>Qux</Text>
          </Animated.View>
        </View>
      )
    }
  }
}

const radius = 36
let Window = Dimensions.get("window")
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dropZone: {
    height: radius * 2.5,
    backgroundColor: "#B03A2E",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#FFF",
  },
  draggableContainer: {
    position: "absolute",
    top: Window.height / 2 - radius,
    left: Window.width / 2 - radius,
  },
  circle: {
    backgroundColor: "#1ABC9C",
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
  },
})

import * as React from "react";
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View, } from "react-native";
export default class RootScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onPanResponderRelease = (e, gestureState) => {
            if (this.isDropZone(gestureState)) {
                this.setState({
                    showDraggable: false,
                });
            }
            else {
                Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
            }
        };
        this.state = {
            showDraggable: true,
            dropZoneValues: { x: 0, y: 0, width: 0, height: 0 },
            pan: new Animated.ValueXY(),
        };
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                { nativeEvent: null },
                {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y,
                },
            ]),
            onPanResponderRelease: this.onPanResponderRelease,
        });
    }
    isDropZone(gestureState) {
        const dz = this.state.dropZoneValues;
        return gestureState.moveY > dz.y && gestureState.moveY < dz.y + dz.height;
    }
    setDropZoneValues(event) {
        this.setState({
            dropZoneValues: event.nativeEvent.layout,
        });
    }
    render() {
        return (React.createElement(View, { style: styles.mainContainer },
            React.createElement(View, { onLayout: this.setDropZoneValues.bind(this), style: styles.dropZone },
                React.createElement(Text, { style: styles.text }, "End Zone")),
            this.renderDraggable()));
    }
    renderDraggable() {
        if (this.state.showDraggable) {
            return (React.createElement(View, { style: styles.draggableContainer },
                React.createElement(Animated.View, Object.assign({}, this.panResponder.panHandlers, { style: [this.state.pan.getLayout(), styles.circle] }),
                    React.createElement(Text, { style: styles.text }, "Qux"))));
        }
    }
}
const radius = 36;
const Window = Dimensions.get("window");
const styles = StyleSheet.create({
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
});
//# sourceMappingURL=rootScreen.js.map
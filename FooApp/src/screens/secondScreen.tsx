import * as React from "react"
import { AppRegistry, Text, View } from "react-native"
import { NavigationScreenProp, NavigationStackScreenOptions, NavigationTabScreenOptions } from "react-navigation"

interface Prop {
  navigation?: NavigationScreenProp<any, any>
}

interface State {
  text: string
}

export default class SecondScreen extends React.Component<Prop, State> {
  static navigationOptions = {
    title: "Second",
  }
  render() {
    const { params } = this.props.navigation!.state
    return (
      <Text>
        A second screen. Parameter: {params.text}.
      </Text>
    )
  }
}

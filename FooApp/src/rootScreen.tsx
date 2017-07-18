import * as React from "react"
import { View } from "react-native"
import { StackNavigator } from "react-navigation"
import Screens from "./screens/index"

const SimpleStack = StackNavigator({
  Home: { screen: Screens.HomeScreen },
  Second: { screen: Screens.SecondScreen },
})

export default class RootScreen extends React.Component {
  render() {
    return (
      <View>
        <SimpleStack />
      </View>
    )
  }
}

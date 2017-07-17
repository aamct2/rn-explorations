import * as React from "react"
import { AppRegistry } from "react-native"
import { StackNavigator } from "react-navigation"
import Screens from "./screens/index"

const SimpleApp = StackNavigator({
  Home: { screen: Screens.HomeScreen },
  Second: { screen: Screens.SecondScreen },
})

AppRegistry.registerComponent("FooApp", () => SimpleApp)

import * as React from "react"
import { AppRegistry, Button, Text, View } from "react-native"
import {
  StackNavigator,
  addNavigationHelpers,
  NavigationScreenProp,
  NavigationStackScreenOptions,
  NavigationTabScreenOptions,
} from "react-navigation"

interface Prop {
  navigation?: NavigationScreenProp<any, any>
}

class HomeScreen extends React.Component<Prop, {}> {
  static navigationOptions: NavigationStackScreenOptions & NavigationTabScreenOptions = {
    title: "Welcome",
  }
  render() {
    return (
      <View>
        <Text>Hello, Navigation!</Text>
        <Button onPress={() => this.props.navigation!.navigate("Second")} title="Second Screen" />
      </View>
    )
  }
}

class SecondScreen extends React.Component {
  static navigationOptions = {
    title: "Second",
  }
  render() {
    return <Text>A second screen.</Text>
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Second: { screen: SecondScreen },
})

AppRegistry.registerComponent("FooApp", () => SimpleApp)

import * as React from "react"
import { AppRegistry, Button, Text, TextInput, View } from "react-native"
import { NavigationScreenProp, NavigationStackScreenOptions, NavigationTabScreenOptions } from "react-navigation"

interface Prop {
  navigation?: NavigationScreenProp<any, any>
}

interface State {
  text: string
}

export default class HomeScreen extends React.Component<Prop, State> {
  static navigationOptions: NavigationStackScreenOptions & NavigationTabScreenOptions = {
    title: "Welcome",
  }
  render() {
    return (
      <View>
        <Text>Hello, Navigation!</Text>
        <TextInput onChangeText={text => this.setState({ text })} placeholder="Input Random Phrase Here" />
        <Button
          onPress={() => this.props.navigation!.navigate("Second", { text: this.state.text })}
          title="Second Screen"
        />
      </View>
    )
  }
}

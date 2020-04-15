import NetInfo from "@react-native-community/netinfo"
import React from "react"

export const NetworkContext = React.createContext({ isConnected: true })

export class NetworkProvider extends React.PureComponent {
  unsubscribe

  state = {
    isConnected: true,
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleConnectivityChange = (state) => {
    this.setState({ isConnected: state.isConnected })
  }

  render() {
    return <NetworkContext.Provider value={this.state}>{this.props.children}</NetworkContext.Provider>
  }
}

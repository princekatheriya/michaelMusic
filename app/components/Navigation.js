
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import DummyApiCalls from './DummyApiCalls'
import SplashScreen from './SplashScreen';
import MusicDetails from './MusicDetails';

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Dummyapi: DummyApiCalls,
  MusicDetails: MusicDetails
}, {
  initialRouteName: 'Splash',
});
export default createAppContainer(
  createSwitchNavigator(
    {
      App: InitialNavigator,
    },
    {
      initialRouteName: 'App'
    }
  )
)
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Hello</Text>
        <Text style={styles.subtitleText}>My name is</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.innerText}>Wong Jin Xuan</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 8,
  },
  welcomeText: {
    fontSize: 90,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  subtitleText: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center'
  },
  innerContainer: {
    width: '80%',
    height: '55%',
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center'
  },
  innerText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

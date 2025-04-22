import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <LinearGradient colors={backgroundGradient.colors} start={backgroundGradient.start} end={backgroundGradient.end} style={styles.container}>
        <Text style={styles.helloText}>Hello  &#128075;</Text>
        <Text style={styles.imText}>I am</Text>
        <LinearGradient colors={containerGradient.colors} start={containerGradient.start} end={containerGradient.end} style={styles.contentContainer}>
          <Text style={styles.usernameText}>{user.username}</Text>
          <Text style={styles.courseText}>{user.course} Student</Text>
          <View style={styles.informationContainer}>
            <View style={styles.moduleContainer}>
              <Text style={styles.moduleTitle}>Module Code</Text>
              <Text style={styles.moduleDescription}>{user.moduleCode}</Text>
            </View>
            <View style={styles.moduleContainer}>
              <Text style={styles.moduleTitle}>Module</Text>
              <Text style={styles.moduleDescription}>{user.module}</Text>
            </View>
          </View>
        </LinearGradient>
      </LinearGradient>
    </SafeAreaView>
  );
}

const user = {
  username: 'wong jin xuan',
  course: 'computer science',
  moduleCode: 'cm3050',
  module: 'mobile development'
}

const backgroundGradient = {
  colors: ['#0F2027', '#203A43', '#2C5364'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
}

const containerGradient = {
  colors: ['#203A43', '#2C5364'],
  start: { x: 1, y: 1 },
  end: { x: 0, y: 0 }
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
    outline: 2,
    padding: 8,
  },
  helloText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 3,
    marginBottom: 10,
    textTransform: 'uppercase'
  },
  imText: {
    fontSize: 18,
    color: 'white',
    letterSpacing: 3,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  contentContainer: {
    width: '80%',
    height: '55%',
    display: 'flex',
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  usernameText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 3,
    color: '#fff',
    textTransform: 'uppercase',
  },
  courseText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'capitalize'
  },
  informationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    columnGap: 30,
  },
  moduleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ffffff99',
    paddingTop: 10
  },
  moduleTitle: {
    textTransform: 'uppercase',
    color: '#ffffff70',
    textAlign: 'center',
    letterSpacing: 2,
  },
  moduleDescription: {
    textTransform: 'uppercase',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  }
});

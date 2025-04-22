import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import QRCode from 'react-native-qrcode-svg';

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <Text style={styles.helloText}>Hello  &#128075;</Text>
        <Text style={styles.imText}>I am</Text>

        <View style={styles.contentWrapper}>
          <View style={styles.contentContainer}>
            <Text style={styles.usernameText}>{user.username}</Text>
            <Text style={styles.pronounText}>{user.pronoun}</Text>
            <Text style={styles.courseText}>A {user.course} Student</Text>

            <View style={styles.informationContainer}>
              <View style={styles.moduleContainer}>
                <Text style={styles.moduleTitle}>Code</Text>
                <Text style={styles.moduleDescription}>{user.moduleCode}</Text>
              </View>
              <View style={styles.moduleContainer}>
                <Text style={styles.moduleTitle}>Module</Text>
                <Text style={styles.moduleDescription}>{user.module}</Text>
              </View>
            </View>
          </View>

          <View style={styles.qrWrapper}>
            <View style={styles.qrContainer}>
              <Text style={styles.qrText}>My GitHub</Text>
              <QRCode
                value={user.github}
                size={80}
                color="#3f418d"
                backgroundColor="#f9eded"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const user = {
  username: 'wong jin xuan',
  pronoun: 'he/him',
  course: 'computer science',
  moduleCode: 'cm3050',
  module: 'mobile development',
  github: 'https://github.com/jx1126',
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#3f418d',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  helloText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f9eded',
    letterSpacing: 3,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  imText: {
    fontSize: 18,
    color: '#f9eded',
    letterSpacing: 3,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  contentContainer: {
    width: 'auto',
    minHeight: 220,
    minWidth: 500,
    backgroundColor: '#f9eded',
    borderRadius: 25,
    justifyContent: 'center',
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  usernameText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 3,
    color: '#3f418d',
    textTransform: 'uppercase',
  },
  pronounText: {
    color: '#3f418d',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 4,
  },
  courseText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#3f418d',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  informationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 30,
  },
  moduleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#3f418d',
    paddingTop: 10,
  },
  moduleTitle: {
    textTransform: 'uppercase',
    color: '#3f418d',
    textAlign: 'center',
  },
  moduleDescription: {
    textTransform: 'uppercase',
    color: '#3f418d',
    textAlign: 'center',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  qrWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  qrContainer: {
    backgroundColor: '#f9eded',
    padding: 12,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  qrText: {
    color: '#3f418d',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  }
});

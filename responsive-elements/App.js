import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.col1, styles.borderBottom, styles.borderRight]}>
          <Text style={styles.input}>X</Text>
        </View>
        <View style={[styles.col2, styles.borderBottom, styles.borderRight]}>
          <Text style={styles.input}>X</Text>
        </View>
        <View style={[styles.col3, styles.borderBottom]}>
          <Text style={styles.input}>X</Text>
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={[styles.col1, styles.borderBottom, styles.borderRight]}>
          <Text style={styles.input}>X</Text>
        </View>
        <View style={[styles.col2, styles.borderBottom, styles.borderRight]}>
          <Text style={styles.input}>X</Text>
        </View>
        <View style={[styles.col3, styles.borderBottom]}>
          <Text style={styles.input}>X</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.col1, styles.borderRight]}>
          <Text style={styles.input}>X</Text>
        </View>
        <View style={[styles.col2, styles.borderRight]}>
          <Text style={styles.input}>X</Text>
        </View>
        <View style={styles.col3}>
          <Text style={styles.input}>X</Text>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItem: 'center',
  },
  col1: {
    height: 150,
    flex: 1,
    justifyContent: 'center',
  },
  col2: {
    height: 150,
    flex: 1,
    justifyContent: 'center',
  },
  col3: {
    height: 150,
    flex: 1,
    justifyContent: 'center',
  },
  borderBottom: {
    borderBottomColor: 'black',
    borderBottomWidth: 4,
  },
  borderRight: {
    borderRightColor: 'black',
    borderRightWidth: 4,
  },
  input: {
    fontSize: 80,
    alignSelf: 'center',
  }
});

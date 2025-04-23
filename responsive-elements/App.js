import { Text, View, SafeAreaView, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Responsive Elements</Text>

      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.column, styles.columnO]}>
            <Text style={styles.cellO}>O</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={[styles.column, styles.columnO]}>
            <Text style={styles.cellO}>O</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={[styles.column, styles.columnX]}>
            <Text style={styles.cellX}>X</Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />

        <View style={styles.row}>
          <View style={[styles.column, styles.columnX]}>
            <Text style={styles.cellX}>X</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={[styles.column, styles.columnO]}>
            <Text style={styles.cellO}>O</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={[styles.column, styles.columnO]}>
            <Text style={styles.cellO}>O</Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />

        <View style={styles.row}>
          <View style={[styles.column, styles.columnX]}>
            <Text style={styles.cellX}>X</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={[styles.column, styles.columnX]}>
            <Text style={styles.cellX}>X</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={[styles.column, styles.columnO]}>
            <Text style={styles.cellO}>O</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#f3e9dc",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#5e3023",
    marginBottom: 15,
  },
  container: {
    width: "90%",
    aspectRatio: 1,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#c0855250",
    zIndex: 1,
    flexDirection: "column",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  columnX: {
    backgroundColor: "#c08552",
  },
  columnO: {
    backgroundColor: "#5e3023",
  },
  column: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 15,
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 3,
    borderTopColor: "#ffffff80",
    borderLeftWidth: 3,
    borderLeftColor: "#ffffff80",
    borderRightWidth: 3,
    borderRightColor: "#00000080",
    borderBottomWidth: 3,
    borderBottomColor: "#00000080",
  },
  cellX: {
    fontSize: 40,
    color: "#5e3023",
    fontWeight: "bold",
  },
  cellO: {
    fontSize: 40,
    color: "#c08552",
    fontWeight: "bold",
  },
  verticalLine: {
    width: 3,
    backgroundColor: "#00000040",
  },
  horizontalLine: {
    height: 3,
    backgroundColor: "#00000040",
  },
});

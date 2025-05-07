import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Restaurant"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Menu"
          component={DetailsScreen}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const HomeScreenCell = (props) => {
  return (
    <Cell
      height={290}
      backgroundColor={'white'}
      highlightColor="#cccccc"
      onPress={props.action}
      {...props}
      cellContentView={
        <View style={styles.cellContainer}>
          <View style={styles.contentWrapper}>
            <Image 
              source={props.imgUri}
              style={styles.restaurantImage}
              resizeMode='cover'
            />

            <View style={styles.etaContainer}>
              <Text style={styles.etaText}>
                {props.eta}
              </Text>
            </View>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.restaurantTitle}>
              {props.title}
            </Text>
            <Text style={styles.restaurantSubtitle}>
              {props.tagline}
            </Text>
          </View>
        </View>
      }
    />
  );
}

function HomeScreen({navigation}) {
  return (
    <View style={styles.body}>
      <ScrollView>
        <TableView>
          <Section header="" hideSeparator={true} separatorTintColor="#ccc">
            <HomeScreenCell
              title="Joe's Gelato"
              tagline="Dessert, Ice cream, £££"
              eta="10 mins"
              imgUri={require('./images/restaurant-1.jpg')}
              action={() => navigation.navigate('Menu', {
                sections: [
                  {
                    'title': 'Gelato',
                    'contents':[
                      {'title':'Vanilla'},
                    ],
                  }
                ]
              })}
            />

            <HomeScreenCell
              title="Joe's Pancakes"
              tagline="Dessert, Ice cream, £££"
              eta="30+ mins"
              imgUri={require('./images/restaurant-2.jpg')}
              action={() => navigation.navigate('Menu', {
                sections: [
                  {
                    'title': 'Gelato',
                    'contents':[
                      {'title':'Vanilla'},
                    ],
                  }
                ]
              })}
            />
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}

function DetailsScreen({ route }) {
  const { sections } = route.params;

  return (
    <View style={styles.body}>
      <ScrollView>
        <TableView>
          {sections.map((section, index) => (
            <Section key={index} header={section.title}>
              {section.contents.map((item, idx) => (
                <Cell key={idx} title={item.title} />
              ))}
            </Section>
          ))}
        </TableView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cellContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  etaContainer: {
    position: 'absolute',
    bottom: -20,
    right: 15,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  etaText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textWrapper: {
    padding: 10,
  },
  restaurantTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  restaurantSubtitle: {
    fontSize: 14,
    color: '#525252',
  },
});

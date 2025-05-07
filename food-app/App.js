import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function App() {
  const Stack = createStackNavigator();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  
  if (!fontsLoaded) {
    return null;
  }

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
                    'title': 'Gelato Flavours',
                    'contents':[
                      {'title': 'Vanilla', 'price': '£3.50'},
                      {'title': 'Chocolate', 'price': '£3.50'},
                      {'title': 'Strawberry', 'price': '£3.50'},
                      {'title': 'Pistachio', 'price': '£4.00'},
                      {'title': 'Biscoff', 'price': '£4.00'},
                      {'title': 'Tiramisu', 'price': '£4.00'},
                      ],
                  },
                  {
                    'title': 'Toppings',
                    'contents':[
                      {'title':'Chocolate Sauce', 'price': '£0.50'},
                      {'title':'Caramel Sauce', 'price': '£0.50'},
                      {'title':'Sprinkles', 'price': '£0.50'},
                      {'title':'Whipped Cream', 'price': '£0.50'},
                      {'title':'Marshmallows', 'price': '£0.50'},
                      {'title':'Mixed Fruits', 'price': '£1.00'},
                    ],
                  },
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
                    'title': 'Pancake Flavours',
                    'contents':[
                      {'title': 'Classic', 'price': '£6.50'},
                      {'title': 'Chocolate', 'price': '£7.00'},
                      {'title': 'Strawberry', 'price': '£7.00'},
                      {'title': 'Blueberry', 'price': '£7.00'},
                      {'title': 'Banana', 'price': '£7.00'},                      
                      {'title': 'Nutella', 'price': '£8.00'},
                    ],
                  },
                  {
                    'title': 'Toppings',
                    'contents':[
                      {'title':'Maple Syrup', 'price': '£0.50'},
                      {'title':'Chocolate Sauce', 'price': '£0.50'},
                      {'title':'Honey', 'price': '£0.80'},
                      {'title':'Sliced Butter', 'price': '£1.00'},
                      {'title':'Vanilla Ice Cream', 'price': '£1.50'},
                      {'title':'Mixed Fruits', 'price': '£2.00'},
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
            <Section
              key={index}
              headerComponent= {
                <Text style={styles.detailSectionHader}>{section.title}</Text>
              }
            >
              {section.contents.map((item, idx) => (
                <Cell
                  key={idx}
                  title={item.title}
                  detail={item.price || ''}
                  cellStyle="RightDetail"
                  cellContentView= {
                    <View style={styles.detailCellContainer}>
                      <Text style={styles.detailCellTitle}>
                        {item.title}
                      </Text>
                      <Text style={styles.detailCellPrice}>
                        {item.price}
                      </Text>
                    </View>
                  }
                />
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
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
  },
  textWrapper: {
    padding: 10,
  },
  restaurantTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins_700Bold',
  },
  restaurantSubtitle: {
    fontSize: 14,
    color: '#525252',
    fontFamily: 'Poppins_400Regular',
  },
  detailSectionHader: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    paddingHorizontal: 15,
    paddingVertical: 5,
    opacity: 0.4,
  },
  detailCellContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E140',
  },
  detailCellTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  detailCellPrice: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    opacity: 0.4,
  },
});

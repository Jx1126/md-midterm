import { StatusBar } from 'expo-status-bar';
import { useState, useContext, createContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
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
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Restaurant"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => <CartIcon navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Menu"
            component={DetailsScreen}
            options={({ navigation }) => ({
              headerRight: () => <CartIcon navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </CartProvider>
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
              imgUri={require('./images/restaurant/gelato.jpg')}
              action={() => navigation.navigate('Menu', {
                restaurantName: "Joe's Gelato",
                sections: [
                  {
                    'title': 'Gelato Flavours',
                    'contents':[
                      {'title': 'Vanilla', 'price': '£3.50', 'image': require('./images/gelato/vanilla.png')},
                      {'title': 'Chocolate', 'price': '£3.50', 'image': require('./images/gelato/chocolate.png')},
                      {'title': 'Strawberry', 'price': '£3.50', 'image': require('./images/gelato/strawberry.png')},
                      {'title': 'Pistachio', 'price': '£4.00', 'image': require('./images/gelato/pistachio.png')},
                      {'title': 'Biscoff', 'price': '£4.00', 'image': require('./images/gelato/biscoff.png')},
                      {'title': 'Tiramisu', 'price': '£4.00', 'image': require('./images/gelato/tiramisu.png')},
                      ],
                  },
                  {
                    'title': 'Pick Your Toppings',
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
              imgUri={require('./images/restaurant/pancake.jpg')}
              action={() => navigation.navigate('Menu', {
                restaurantName: "Joe's Pancakes",
                sections: [
                  {
                    'title': 'Pancake Flavours',
                    'contents':[
                      {'title': 'Classic', 'price': '£6.50', 'image': require('./images/pancake/classic.png')},
                      {'title': 'Chocolate', 'price': '£7.00', 'image': require('./images/pancake/chocolate.png')},
                      {'title': 'Strawberry', 'price': '£7.00', 'image': require('./images/pancake/strawberry.png')},
                      {'title': 'Blueberry', 'price': '£7.00', 'image': require('./images/pancake/blueberry.png')},
                      {'title': 'Banana', 'price': '£7.00', 'image': require('./images/pancake/banana.png')},                      
                      {'title': 'Nutella', 'price': '£8.00', 'image': require('./images/pancake/nutella.png')},
                    ],
                  },
                  {
                    'title': 'Pick Your Toppings',
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

const QuantityCell = ({ item, onQuantityUpdate }) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    onQuantityUpdate(item.title, updatedQuantity, item.price);
  }

  const decreaseQuantity = () => {  
    const updatedQuantity = Math.max(quantity - 1, 0);
    setQuantity(updatedQuantity);
    onQuantityUpdate(item.title, updatedQuantity, item.price);
  }

  return (
    <View style={styles.quantityMenuContainer}>
      <TouchableOpacity onPress={decreaseQuantity} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>−</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity onPress={increaseQuantity} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

function DetailsScreen({ route }) {
  const { restaurantName, sections } = route.params;
  const [selectedFlavour, setSelectedFlavour] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState({});
  const [toppingPrices, setToppingPrices] = useState({});
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.body}>
      <ScrollView>
        {!selectedFlavour ? (
          <TableView>
            <Section
              key={sections[0].index}
              headerComponent= {
                <Text style={styles.detailSectionHeader}>{sections[0].title}</Text>
              }
            >
              {sections[0].contents.map((item, idx) => (
                <Cell
                  key={idx}
                  title={item.title}
                  detail={item.price || ''}
                  backgroundColor={'white'}
                  cellStyle="RightDetail"
                  cellContentView= {
                    <View style={styles.detailCellContainer}>
                      <View style={styles.detailImageTextContainer}>
                        <Image
                          source={item.image}
                          style={{ width: 50, height: 50, borderRadius: 10 }}
                          resizeMode='cover'
                        />
                        <View>
                          <Text style={styles.detailCellTitle}>{item.title}</Text>
                          <Text style={styles.detailCellPrice}>{item.price}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => {setSelectedFlavour(item);}}
                        style={styles.ctaSelectButton}
                      >
                        <Text style={styles.ctaSelectButtonText}>
                          Select
                        </Text>
                      </TouchableOpacity>
                    </View>
                  }
                />
              ))}
            </Section>
          </TableView>
        ) : (
          <View>
            <Text style={styles.selectedFlavourText}>
              Selected Flavour: {selectedFlavour.title}
            </Text>

            <TableView>
              <Section
                key={sections[1].index}
                headerComponent= {
                  <Text style={styles.detailSectionHeader}>{sections[1].title}</Text>
                }
              >
                {sections[1].contents.map((item, idx) => (
                  <Cell
                    key={idx}
                    title={item.title}
                    detail={item.price || ''}
                    backgroundColor={'white'}
                    cellStyle="RightDetail"
                    cellContentView= {
                      <View style={styles.detailCellContainer}>
                        <View>
                          <Text style={styles.detailCellTitle}>
                            {item.title}
                          </Text>
                          <Text style={styles.detailCellPrice}>
                            {item.price}
                          </Text>
                        </View>
                        <QuantityCell
                          item={item}
                          onQuantityUpdate={(title, quantity, price) => {
                            setSelectedTopping((prev) => ({
                              ...prev,
                              [title]: quantity,
                            }));
                            setToppingPrices((prev) => ({
                              ...prev,
                              [title]: price,
                            }));
                          }}
                        />
                      </View>
                    }
                  />
                ))}
              </Section>
          </TableView>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              const selectedToppingsArray = Object.entries(selectedTopping)
                .filter(([_, quantity]) => quantity > 0)
                .map(([title, quantity]) => ({
                  title,
                  quantity,
                  price: toppingPrices[title] || 0,
                }));

              addToCart(
                restaurantName,
                selectedFlavour,
                selectedToppingsArray
              )

              alert(
                'Added to cart!',
              )
              
              setSelectedFlavour(null);
              setSelectedTopping({});
              setToppingPrices({});
            }}
          >
            <Text style={styles.ctaSelectButtonText}>
                Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
      </ScrollView>
    </View>
  );
}

function CartIcon({ navigation }) {
  const { cartItems } = useContext(CartContext);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.cartIconButton}
    >
      <Image
        source={require('./images/cart-icon.png')}
        style={styles.cartIconImage}
        resizeMode='contain'
      />
      <Text style={styles.cartIconText}>
        Cart
      </Text>

      {cartItems.length > 0 && (
        <View style={styles.cartItemCountBadge}>
          <Text style={styles.cartItemCountText}>
            {cartItems.length}
          </Text>
        </View>
      )}

    </TouchableOpacity>        
  );
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (restaurantName, flavour, toppings) => {
    const newItem = {
      id: Date.now().toString(),
      restaurantName,
      flavour,
      toppings,
    };
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== itemId));

  };

  const clearCart = () => {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
};

function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.restaurantName]) {
      groups[item.restaurantName] = [];
    }
    groups[item.restaurantName].push(item);
    return groups;
  }, {});

  const cartCheckout = () => {
    alert('Checkout successful! Hope to see you again soon!');
    clearCart();
  }

  if (cartItems.length == 0) {
    return (
      <View style={[styles.body, styles.emptyCartBody]}>
        <Text style={styles.emptyCartText}>
          Your cart is currently empty. Add some items to it from the menu.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.body}>
      <ScrollView>
        {Object.entries(groupedItems).map(([restaurantName, items], index) => (
          <View key={index} style={styles.cartContainer}>
            <Text style={styles.cartRestaurantName}>{restaurantName}</Text>

            {items.map((item, idx) => {
              const flavourPrice = parseFloat(item.flavour.price.replace('£', ''));
              let toppingsTotal = 0;
            
              if (item.toppings && item.toppings.length > 0) {
                item.toppings.forEach((topping) => {
                  const price = parseFloat(topping.price.replace('£', ''));
                  toppingsTotal += price * topping.quantity;
                });
              }
            
              const subtotal = (flavourPrice + toppingsTotal).toFixed(2);

              return (
                <View key={idx} style={styles.cartItemCard}>
                  <View style={styles.flavourContainer}>
                    <Text style={[styles.flavourContainerText, styles.flavourContainerTitleText]}>{item.flavour.title}</Text>
                    <Text style={styles.flavourContainerText}>{item.flavour.price}</Text>
                    
                  </View>

                  <View style={styles.toppingsContainer}>
                    {item.toppings && item.toppings.length > 0 ? (
                      item.toppings.map((topping, toppingIdx) => (
                        <Text key={toppingIdx} style={styles.toppingsContainerText}>
                          - {topping.quantity}x {topping.title} ({topping.price})
                        </Text>
                      ))
                    ) : (
                      <Text style={styles.toppingsContainerText}>
                        No toppings selected
                      </Text>
                    )}
                  </View>

                  <View style={styles.cartSubtotalContainer}>
                    <Text style={styles.cartSubtotalText}>
                      Subtotal: £{subtotal}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                      style={styles.removeButton}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        ))}


      </ScrollView>
        <View style={styles.cartCheckoutContainer}>
          <Text style={styles.totalPriceText}>
            Total: £{cartItems.reduce((total, item) => {
              const flavourPrice = parseFloat(item.flavour.price.replace('£', ''));
              let totalPrice = flavourPrice;

              if (item.toppings && item.toppings.length > 0) {
                item.toppings.forEach((topping) => {
                  const toppingPrice = parseFloat(topping.price.replace('£', ''));
                  totalPrice += toppingPrice * topping.quantity;
                });
              }
              return total + totalPrice;
            }, 0).toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={cartCheckout}
          >
            <Text style={styles.checkoutButtonText}>
              Checkout
            </Text>
          </TouchableOpacity>          
        </View>
    </View>
  )
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
  detailSectionHeader: {
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
    paddingRight: 0,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e140',
  },
  detailImageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
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
  quantityMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: '#f1f1f1',
    width: 45,
    height: 45,
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: 'Poppins_400Regular',
  },
  quantityText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    marginHorizontal: 20,
  },
  detailCtaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  addToCartButton: {
    backgroundColor: '#24a0ed',
    width: 'full',
    height: 50,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  addToCartButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
  },
  ctaSelectButton: {
    backgroundColor: '#24a0ed',
    width: 'fit-content',
    height: 'fit-content',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaSelectButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    padding: 5,
    textAlign: 'center',
  },
  selectedFlavourText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 20,
    textAlign: 'center',
    color: '#00000080',
  },
  cartIconButton: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  cartIconImage: {
    width: 28,
    height: 28,
  },
  cartIconText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#979797',
    textAlign: 'center',
  },
  cartItemCountBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#24a0ed',
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
    paddingTop: 3,
    textAlign: 'center',
  },
  emptyCartBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    color: '#00000080',
    paddingHorizontal: 20,
  },
  cartContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e140',
  },
  cartRestaurantName: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: '#e1e1e180',
  },
  cartItemCard: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  flavourContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    justifyContent: 'space-between',
  },
  flavourContainerText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  flavourContainerTitleText: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
  },
  toppingsContainer: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  toppingsContainerText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    opacity: 0.6,
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    width: 'fit-content',
    height: 'fit-content',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    
  },
  removeButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    padding: 5,
    textAlign: 'center',
  },
  cartCheckoutContainer: {
    padding: 15,
    borderTopWidth: 3,
    borderTopColor: '#e1e1e1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  checkoutButton: {
    backgroundColor: '#24a0ed',
    height: 50,
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  checkoutButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
  totalPriceText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
    marginTop: 5,
  },
  cartSubtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  cartSubtotalText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    marginTop: 5,
  },
});

import { StatusBar } from 'expo-status-bar';
import { useState, useContext, createContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
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
}

const HomeScreenCell = (props) => {
  return (
    <Cell
      height={290}
      backgroundColor={'#fafafa'}
      highlightColor="#fff"
      onPress={props.action}
      {...props}
      cellContentView={
        <View style={styles.homeCard}>
          <View style={styles.homeCardContent}>
            <Image 
              source={props.imgUri}
              style={styles.homeCardImage}
              resizeMode='cover'
            />

            <View style={styles.homeEtaBadge}>
              <Text style={styles.homeEtaText}>
                {props.eta}
              </Text>
            </View>
          </View>

          <View style={styles.homeCardTextWrapper}>
            <Text style={styles.homeCardTitle}>
              {props.title}
            </Text>
            <Text style={styles.homeCardSubtitle}>
              {props.tagline}
            </Text>
          </View>
        </View>
      }
    />
  );
}

function HomeScreen({navigation}) {
  const { setDeliveryAddress, setDeliveryCost } = useContext(CartContext);
  const [address, setAddress] = useState('');

  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={styles.homeDeliveryContainer}>
          <Text style={styles.homeDeliveryInputLabel}>Enter Delivery Address</Text>
          <View style={styles.homeDeliveryInputRow}>
            <TextInput
              style={styles.homeDeliveryInput}
              placeholder="Leave Blank for Self-Pickup"
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity
              onPress={() => {
                if (address.trim() !== '') {
                  const deliveryCost = (Math.random() * 2.5 + 1.5).toFixed(2);
                  setDeliveryAddress(address.trim());
                  setDeliveryCost(parseFloat(deliveryCost));
                  alert(`Delivery cost set to £${deliveryCost}`);
                } else {
                  alert('Please enter a valid address.');
                }
              }}
              style={styles.homeDeliveryButton}
            >
              <Text style={styles.homeDeliveryButtonText}>
                Set
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TableView>
          <Section header="Popular Restaurants" hideSeparator={true} separatorTintColor="#ccc">
            <HomeScreenCell
              title="Joe's Gelato"
              tagline="Dessert, Ice cream, £"
              eta="10 mins"
              imgUri={require('./images/restaurant/gelato.jpg')}
              action={() => navigation.navigate('Menu', {
                restaurantName: "Joe's Gelato",
                restaurantImage: require('./images/restaurant/gelato.jpg'),
                sections: [
                  {
                    'title': 'Gelato Flavours',
                    'contents':[
                      {'title': 'Vanilla', 'price': '£3.50', 'image': require('./images/gelato/flavour/vanilla.png'), 'outOfStock': true},
                      {'title': 'Chocolate', 'price': '£3.50', 'image': require('./images/gelato/flavour/chocolate.png'), 'outOfStock': false},
                      {'title': 'Strawberry', 'price': '£3.50', 'image': require('./images/gelato/flavour/strawberry.png'), 'outOfStock': false},
                      ],
                  },
                  {
                    'title': 'Time Limited Flavours',
                    'contents':[
                      {'title': 'Pistachio', 'price': '£4.00', 'image': require('./images/gelato/flavour/pistachio.png'), 'outOfStock': false},
                      {'title': 'Biscoff', 'price': '£4.00', 'image': require('./images/gelato/flavour/biscoff.png'), 'outOfStock': false},
                      {'title': 'Tiramisu', 'price': '£4.00', 'image': require('./images/gelato/flavour/tiramisu.png'), 'outOfStock': true},
                      ],
                  },
                  {
                    'title': 'Pick Your Toppings',
                    'contents':[
                      {'title':'Chocolate Sauce', 'price': '£0.50', 'image': require('./images/gelato/topping/chocolate.png'), 'outOfStock': false},
                      {'title':'Caramel Sauce', 'price': '£0.50', 'image': require('./images/gelato/topping/caramel.png'), 'outOfStock': true},
                      {'title':'Sprinkles', 'price': '£0.50', 'image': require('./images/gelato/topping/sprinkles.png'), 'outOfStock': false},
                      {'title':'Whipped Cream', 'price': '£0.50', 'image': require('./images/gelato/topping/cream.png'), 'outOfStock': true},
                      {'title':'Marshmallows', 'price': '£0.50', 'image': require('./images/gelato/topping/marshmallows.png'), 'outOfStock': false},
                      {'title':'Mixed Fruits', 'price': '£1.00', 'image': require('./images/gelato/topping/fruits.png'), 'outOfStock': false},
                    ],
                  },
                ]
              })}
            />

            <HomeScreenCell
              title="Joe's Pancakes"
              tagline="Breakfast, Pancakes, ££"
              eta="20 mins"
              imgUri={require('./images/restaurant/pancake.jpg')}
              action={() => navigation.navigate('Menu', {
                restaurantName: "Joe's Pancakes",
                restaurantImage: require('./images/restaurant/pancake.jpg'),
                sections: [
                  {
                    'title': 'Pancake Flavours',
                    'contents':[
                      {'title': 'Classic', 'price': '£6.50', 'image': require('./images/pancake/flavour/classic.png'), 'outOfStock': false},
                      {'title': 'Chocolate', 'price': '£7.00', 'image': require('./images/pancake/flavour/chocolate.png'), 'outOfStock': false},
                      {'title': 'Strawberry', 'price': '£7.00', 'image': require('./images/pancake/flavour/strawberry.png'), 'outOfStock': false},
                      {'title': 'Banana', 'price': '£7.00', 'image': require('./images/pancake/flavour/banana.png'), 'outOfStock': false},                      
                    ],
                  },
                  {
                    'title': 'Time Limited Flavours',
                    'contents':[
                      {'title': 'Blueberry', 'price': '£7.00', 'image': require('./images/pancake/flavour/blueberry.png'), 'outOfStock': false},
                      {'title': 'Nutella', 'price': '£8.00', 'image': require('./images/pancake/flavour/nutella.png'), 'outOfStock': true},
                    ],
                  },
                  {
                    'title': 'Pick Your Toppings',
                    'contents':[
                      {'title':'Maple Syrup', 'price': '£0.50', 'image': require('./images/pancake/topping/maple.png'), 'outOfStock': false},
                      {'title':'Chocolate Sauce', 'price': '£0.50', 'image': require('./images/pancake/topping/chocolate.png'), 'outOfStock': false},
                      {'title':'Honey', 'price': '£0.80', 'image': require('./images/pancake/topping/honey.png'), 'outOfStock': true},
                      {'title':'Sliced Butter', 'price': '£1.00', 'image': require('./images/pancake/topping/butter.png'), 'outOfStock': false},
                      {'title':'Vanilla Ice Cream', 'price': '£1.50', 'image': require('./images/pancake/topping/vanilla.png'), 'outOfStock': true},
                      {'title':'Mixed Fruits', 'price': '£2.00', 'image': require('./images/pancake/topping/fruits.png'), 'outOfStock': false},
                    ],
                  }
                ]
              })}
            />

            <HomeScreenCell
              title="Joe's Pizzas"
              tagline="Fast Food, Pizza, ££"
              eta="50 mins"
              imgUri={require('./images/restaurant/pizza.jpg')}
              action={() => navigation.navigate('Menu', {
                restaurantName: "Joe's Pizzas",
                restaurantImage: require('./images/restaurant/pizza.jpg'),
                sections: [
                  {
                    'title': 'Classic Large Pizzas',
                    'contents':[
                      {'title': 'Hawaiian', 'price': '£10.00', 'image': require('./images/pizza/flavour/hawaiian.jpg'), 'outOfStock': false},
                      {'title': 'Margherita', 'price': '£11.00', 'image': require('./images/pizza/flavour/margherita.jpg'), 'outOfStock': false},
                      {'title': 'Peperoni', 'price': '£11.50', 'image': require('./images/pizza/flavour/peperoni.jpg'), 'outOfStock': false},
                    ],
                  },
                  {
                    'title': 'Special Large Pizzas',
                    'contents':[
                      {'title': 'Nacho Cheese', 'price': '£12.00', 'image': require('./images/pizza/flavour/nacho.jpg'), 'outOfStock': false},
                      {'title': 'Seafood', 'price': '£14.00', 'image': require('./images/pizza/flavour/seafood.jpg'), 'outOfStock': false},
                      {'title': 'Truffle Mushroom', 'price': '£14.00', 'image': require('./images/pizza/flavour/truffle.jpg'), 'outOfStock': false},
                    ],
                  },
                  {
                    'title': 'Pick Your Toppings',
                    'contents':[
                      {'title':'Pineapple', 'price': '£1.00', 'image': require('./images/pizza/topping/pineapple.jpg'), 'outOfStock': false},
                      {'title':'Olives', 'price': '£1.00', 'image': require('./images/pizza/topping/olives.jpg'), 'outOfStock': true},
                      {'title':'Cheese', 'price': '£1.00', 'image': require('./images/pizza/topping/cheese.jpg'), 'outOfStock': false},
                      {'title':'Mushrooom', 'price': '£1.00', 'image': require('./images/pizza/topping/mushroom.jpg'), 'outOfStock': false},
                      {'title':'Smoked Bacon', 'price': '£2.00', 'image': require('./images/pizza/topping/bacon.jpg'), 'outOfStock': false},
                    ],
                  }
                ]
              })}
            />

            <HomeScreenCell
              title="Joe's Ricebowls"
              tagline="Asian, Ricebowl, ££"
              eta="30 mins"
              imgUri={require('./images/restaurant/ricebowl.jpg')}
              action={() => navigation.navigate('Menu', {
                restaurantName: "Joe's Ricebowls",
                restaurantImage: require('./images/restaurant/ricebowl.jpg'),
                sections: [
                  {
                    'title': 'Signature Ricebowls',
                    'contents':[
                      {'title': 'Yakiniku Don', 'price': '£6.00', 'image': require('./images/ricebowl/flavour/beef.jpg'), 'outOfStock': false},
                      {'title': 'Shabu Don', 'price': '£6.50', 'image': require('./images/ricebowl/flavour/pork.jpg'), 'outOfStock': false},
                      {'title': 'Unagi Don', 'price': '£7.00', 'image': require('./images/ricebowl/flavour/unagi.jpg'), 'outOfStock': false},
                    ],
                  },
                  {
                    'title': 'Specialty Ricebowls',
                    'contents':[
                        {'title': 'Bibimbap', 'price': '£8.00', 'image': require('./images/ricebowl/flavour/bibimbap.jpg'), 'outOfStock': false},
                      {'title': 'Shabu Unagi Combo Don', 'price': '£10.00', 'image': require('./images/ricebowl/flavour/mixed.jpg'), 'outOfStock': false},
                    ],
                  },
                  {
                    'title': 'Pick Your Toppings',
                    'contents':[
                      {'title':'Extra Rice', 'price': '£1.00', 'image': require('./images/ricebowl/topping/rice.jpg'), 'outOfStock': false},
                      {'title':'Kimchi', 'price': '£1.00', 'image': require('./images/ricebowl/topping/kimchi.jpg'), 'outOfStock': true},
                      {'title':'Onsen Egg', 'price': '£1.50', 'image': require('./images/ricebowl/topping/egg.jpg'), 'outOfStock': false},
                      {'title':'Miso Soup', 'price': '£3.00', 'image': require('./images/ricebowl/topping/miso.jpg'), 'outOfStock': false},
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
    <View style={styles.detailQuantityControl}>
      <TouchableOpacity onPress={decreaseQuantity} style={styles.detailQuantityButton}>
        <Text style={styles.detailQuantityButtonText}>−</Text>
      </TouchableOpacity>
      <Text style={styles.detailQuantityText}>{quantity}</Text>
      <TouchableOpacity onPress={increaseQuantity} style={styles.detailQuantityButton}>
        <Text style={styles.detailQuantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

function DetailsScreen({ route, navigation }) {
  const { restaurantName, restaurantImage, sections } = route.params;
  const toppingsSectionIndex = sections.length - 1;
  const flavourSectionIndex = sections.slice(0, toppingsSectionIndex);

  const [selectedFlavour, setSelectedFlavour] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState({});
  const [toppingPrices, setToppingPrices] = useState({});
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={styles.detailRestaurantSection}>
          <Image
            source={restaurantImage}
            style={styles.detailRestaurantImage}
            resizeMode="cover"
          />
          <Text style={styles.detailRestaurantName}>
            {restaurantName}
          </Text>
        </View>
        {!selectedFlavour ? (
          <TableView>
            {flavourSectionIndex.map((section, index) => (
              <Section
                key={`section-${index}`}
                headerComponent= {
                  <Text style={styles.detailSectionHeader}>{section.title}</Text>
                }
              >
                {section.contents.map((item, idx) => (
                  <Cell
                    key={`item-${index}-${idx}`}
                    title={item.title}
                    detail={item.price || ''}
                    backgroundColor={'white'}
                    cellStyle="RightDetail"
                    cellContentView= {
                      <View style={styles.detailItemRow}>
                        <View style={styles.detailItemImageText}>
                          <Image
                            source={item.image}
                            style={[
                              styles.detailItemImage,
                              item.outOfStock && styles.detailItemImageOutOfStock,
                            ]}
                            resizeMode='cover'
                          />
                          <View>
                            <Text
                              style={[
                                styles.detailItemTitle,
                                item.outOfStock && styles.detailItemTextOutOfStock,
                              ]}>{item.title}
                            </Text>
                            <Text
                              style={[
                                styles.detailItemPrice,
                                item.outOfStock && styles.detailItemTextOutOfStock,
                              ]}>{item.price}
                            </Text>
                          </View>
                        </View>
                        { !item.outOfStock ? (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedFlavour(item);
                              setSelectedSection(index);
                            }}
                            style={styles.detailSelectButton}
                          >
                            <Text style={styles.detailSelectButtonText}>
                              Select
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.detailSelectButtonOutOfStock}>
                            <Text style={styles.detailSelectButtonTextOutOfStock}>
                              Select
                            </Text>
                          </View>
                        )}
                      </View>
                    }
                  />
                ))}
              </Section>
            ))}
          </TableView>
        ) : (
          <View>
            <Text style={styles.detailSelectedFlavourText}>
              Selected Flavour: {selectedFlavour.title}
            </Text>

            <TableView>
              <Section
                headerComponent= {
                  <Text style={styles.detailSectionHeader}>{sections[toppingsSectionIndex].title}</Text>
                }
              >
                {sections[toppingsSectionIndex].contents.map((item, idx) => (
                  <Cell
                    key={idx}
                    title={item.title}
                    detail={item.price || ''}
                    backgroundColor={'white'}
                    cellStyle="RightDetail"
                    cellContentView= {
                      <View style={styles.detailItemRow}>
                        <View style={styles.detailItemImageText}>
                          <Image
                            source={item.image}
                            style={[
                              styles.detailItemImage,
                              item.outOfStock && styles.detailItemImageOutOfStock]}
                            resizeMode='cover'
                          />
                          <View>
                            <Text
                              style={[
                                styles.detailItemTitle,
                                item.outOfStock && styles.detailItemTextOutOfStock,
                              ]}>{item.title}</Text>
                            <Text
                              style={[
                                styles.detailItemPrice,
                                item.outOfStock && styles.detailItemTextOutOfStock,
                              ]}>{item.price}</Text>
                          </View>
                        </View>
                        { !item.outOfStock ? (
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
                        ) : (
                          <View style={styles.detailQuantityButtonOutOfStock}>
                            <Text style={styles.detailSelectButtonTextOutOfStock}>
                              Out of Stock
                            </Text>
                          </View>
                        )}
                      </View>
                    }
                  />
                ))}
              </Section>
          </TableView>

          <TouchableOpacity
            style={styles.detailAddToCartButton}
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

              Alert.alert(
                'Item Added to Cart',
                'Proceed to checkout or continue browsing?',
                [
                  { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') },
                  { text: 'Keep Browsing', style: 'cancel' },
                ]
              );
              
              setSelectedFlavour(null);
              setSelectedSection(null);
              setSelectedTopping({});
              setToppingPrices({});
            }}
          >
            <Text style={styles.detailSelectButtonText}>
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

      {cartItems.length > 0 && (
        <View style={styles.cartIconBadge}>
          <Text style={styles.cartIconBadgeText}>
            {cartItems.length}
          </Text>
        </View>
      )}
    </TouchableOpacity>        
  );
}

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(null);

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
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, deliveryAddress, setDeliveryAddress, deliveryCost, setDeliveryCost }}>
      {children}
    </CartContext.Provider>
  )
};

function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, clearCart, deliveryCost, deliveryAddress } = useContext(CartContext);

  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.restaurantName]) {
      groups[item.restaurantName] = [];
    }
    groups[item.restaurantName].push(item);
    return groups;
  }, {});

  const cartCheckout = () => {
    if (!deliveryAddress || deliveryAddress.trim() === '') {
      return Alert.alert(
        'No Delivery Address',
        'No delivery address was entered. Are you choosing self-pickup instead?',
        [
          {
            text: 'Enter Address',
            onPress: () => navigation.navigate('Restaurant'),
            style: 'cancel',
          },
          {
            text: 'Proceed with Self-Pickup',
            onPress: () => {
              Alert.alert(
                'Checkout Completed',
                'Your order has been placed for pickup. See you soon!',
                [{text: 'OK',}],
              );
              clearCart();
              navigation.navigate('Restaurant');
            },
          },
        ],
      );
    } else {
      Alert.alert(
        'Checkout Completed',
        `Your order has been placed for delivery to ${deliveryAddress}.`,
        [{text: 'OK',}],
      );
      clearCart();
      navigation.navigate('Restaurant');
    }
  };

  if (cartItems.length == 0) {
    return (
      <View style={[styles.body, styles.cartEmptyContainer]}>
        <Text style={styles.cartEmptyText}>
          Your cart is currently empty. Add some items to it from the menu.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.body}>
      <ScrollView>
        {deliveryCost !== null && (
          <View style={styles.cartDeliveryContainer}>
            <Text style={styles.cartDeliveryHeader}>
              Delivery Details
            </Text>
            <Text style={styles.cartDeliveryAddressText}>
              Delivery to: {deliveryAddress}
            </Text>
            <Text style={styles.cartDeliveryCostText}>
              Delivery Fee: £{deliveryCost.toFixed(2)}
            </Text>
          </View>
        )}

        {Object.entries(groupedItems).map(([restaurantName, items], index) => (
          <View key={index} style={styles.cartGroupContainer}>
            <Text style={styles.cartGroupTitle}>{restaurantName}</Text>

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
                  <View style={styles.cartItemHeader}>
                    <Text style={styles.cartItemHeaderText}>{item.flavour.title}</Text>
                    <Text style={styles.cartItemHeaderText}>{item.flavour.price}</Text>
                  </View>

                  <View style={styles.cartToppingsContainer}>
                    {item.toppings && item.toppings.length > 0 ? (
                      item.toppings.map((topping, toppingIdx) => (
                        <Text key={toppingIdx} style={styles.cartToppingsText}>
                          - {topping.quantity}x {topping.title} ({topping.price})
                        </Text>
                      ))
                    ) : (
                      <Text style={styles.cartToppingsText}>
                        No toppings selected
                      </Text>
                    )}
                  </View>

                  <View style={styles.cartSubtotalRow}>
                    <Text style={styles.cartSubtotalText}>
                      Subtotal: £{subtotal}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                      style={styles.cartRemoveButton}
                    >
                      <Text style={styles.cartRemoveButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={styles.cartCheckoutContainer}>
        <Text style={styles.cartTotalPriceText}>
          Total: £{(
            cartItems.reduce((total, item) => {
              const flavourPrice = parseFloat(item.flavour.price.replace('£', ''));
              let totalPrice = flavourPrice;

              if (item.toppings && item.toppings.length > 0) {
                item.toppings.forEach((topping) => {
                  const toppingPrice = parseFloat(topping.price.replace('£', ''));
                  totalPrice += toppingPrice * topping.quantity;
                });
              }
              return total + totalPrice;
            }, 0) + (deliveryCost || 0)
          ).toFixed(2)}
        </Text>

        <TouchableOpacity
          style={styles.cartCheckoutButton}
          onPress={cartCheckout}
        >
          <Text style={styles.cartCheckoutButtonText}>
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
    backgroundColor: '#fafafa',
  },
  homeCard: {
    flex: 1,
    position: 'relative',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  homeCardContent: {
    flex: 1,
    position: 'relative',
  },
  homeCardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  homeEtaBadge: {
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
  homeEtaText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
  },
  homeCardTextWrapper: {
    padding: 10,
  },
  homeCardTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins_700Bold',
  },
  homeCardSubtitle: {
    fontSize: 14,
    color: '#525252',
    fontFamily: 'Poppins_400Regular',
  },
  homeDeliveryContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  homeDeliveryInputLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 5,
  },
  homeDeliveryInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  homeDeliveryInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    flex: 10,
  },
  homeDeliveryButton: {
    backgroundColor: '#24a0ed',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  homeDeliveryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
  detailRestaurantSection: {
    alignItems: 'center',
  },
  detailRestaurantImage: {
    width: '100%',
    height: 150,
  },
  detailRestaurantName: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 10,
    textAlign: 'center',
    color: '#00000090',
  },
  detailSectionHeader: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    paddingHorizontal: 15,
    paddingVertical: 5,
    opacity: 0.4,
  },
  detailItemRow: {
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
  detailItemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  detailItemImageOutOfStock: {
    opacity: 0.4,
  },
  detailItemImageText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  detailItemTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  detailItemPrice: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    opacity: 0.4,
  },
  detailItemTextOutOfStock: {
    opacity: 0.4,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  detailQuantityControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailQuantityButton: {
    backgroundColor: '#f1f1f1',
    width: 45,
    height: 45,
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailQuantityButtonText: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: 'Poppins_400Regular',
  },
  detailQuantityText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    marginHorizontal: 20,
  },
  detailAddToCartButton: {
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
  detailSelectButton: {
    backgroundColor: '#24a0ed',
    width: 'fit-content',
    height: 'fit-content',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailSelectButtonOutOfStock: {
    backgroundColor: '#f1f1f1',
    width: 'fit-content',
    height: 'fit-content',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailQuantityButtonOutOfStock: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailSelectButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    padding: 5,
    textAlign: 'center',
  },
  detailSelectButtonTextOutOfStock: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    padding: 5,
    textAlign: 'center',
    opacity: 0.4,
    textDecorationStyle: 'solid',
  },
  detailSelectedFlavourText: {
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
    borderRadius: 10,
  },
  cartIconImage: {
    width: 26,
    height: 26,
    opacity: 0.6,
  },
  cartIconBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#24a0ed',
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIconBadgeText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
    paddingTop: 3,
    textAlign: 'center',
  },
  cartEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartEmptyText: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    color: '#00000080',
    paddingHorizontal: 20,
  },
  cartDeliveryContainer: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  cartDeliveryHeader: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 2,
    textDecorationLine: 'underline',
    color: '#00000080',
  },
  cartDeliveryAddressText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#00000080',
  },
  cartDeliveryCostText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#00000080',
  },
  cartGroupContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e140',
  },
  cartGroupTitle: {
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
  cartItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    justifyContent: 'space-between',
  },
  cartItemHeaderText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  cartToppingsContainer: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  cartToppingsText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    opacity: 0.6,
  },
  cartRemoveButton: {
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
  cartRemoveButtonText: {
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
  cartCheckoutButton: {
    backgroundColor: '#24a0ed',
    height: 50,
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  cartCheckoutButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
  cartTotalPriceText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
    marginTop: 5,
  },
  cartSubtotalRow: {
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

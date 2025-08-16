// import React, {useCallback} from 'react';
// import {Button, Text, View, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {addToCart} from './src/redux/actions';
// import {
//   UPDATE_ADDRESS,
//   UPDATE_AGE,
//   UPDATE_MAIL,
//   UPDATE_NAME,
//   FETCH_PRODUCTS,
// } from './src/redux/actions/actionTypes';
// import {
//   handleUpdateAddress,
//   handleUpdateAge,
//   handleUpdateMail,
//   handleUpdateName,
//   handleFetchProductAction,
// } from './src/redux/actions/actionCreators';
// import {FONTS} from './src/utils/theme';
// import { RootStateType, AppDispatch } from './src/redux/store'

// type ProductItemProps = {
//   thumbnail: string;
//   brand: string;
//   title: string;
//   description: string;
//   price: number;
//   category: string;
//   rating: string;
// }

// type reduxStateType = {
//   name: string;
//   age: string;
//   address: string;
//   mail: string;
//   loading: boolean;
//   products: ProductItemProps[],
// }

// const App = () => {
//   const reduxState = useSelector<RootStateType>(state => state.demo);
//   const dispatch = useDispatch<AppDispatch>();

//   const ListContainer = useCallback(
//     ({item}: {item: ProductItemProps}) => {
//       return (
//         <View
//           style={{
//             height: 150,
//             backgroundColor: '#fff',
//             elevation: 2,
//             shadowColor: '#000',
//             margin: 10,
//             borderWidth: 1,
//             borderColor: 'grey',
//             borderRadius: 15,
//             flexDirection: 'row',
//             alignItems: 'stretch',
//             overflow: 'hidden',
//           }}>
//           <View
//             style={{
//               flex: 0.35,
//               backgroundColor: 'yellow',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Image
//               source={{uri: item.thumbnail}}
//               style={{width: '98%', height: '98%', borderRadius: 12}}
//               resizeMode={'cover'}
//             />
//           </View>
//           <View
//             style={{
//               flex: 0.65,
//               paddingHorizontal: 12,
//               justifyContent: 'center',
//               gap: 1,
//             }}>
//             <Text
//               style={{fontSize: 25, fontFamily: FONTS.BOLD, color: '#000'}}
//               numberOfLines={1}>
//               {item.brand}
//             </Text>
//             <Text
//               style={{fontSize: 20, fontFamily: FONTS.SEMI_BOLD}}
//               numberOfLines={1}>
//               {item.title}
//             </Text>
//             <Text
//               style={{fontSize: 18, fontFamily: FONTS.SEMI_BOLD}}
//               numberOfLines={1}>
//               {Number(item.price).toLocaleString('en-IN', {
//                 style: 'currency',
//                 currency: 'INR',
//               })}
//             </Text>
//             <Text
//               style={{fontSize: 17, fontFamily: FONTS.MEDIUM}}
//               numberOfLines={2}>
//               {item.description}
//             </Text>
//           </View>
//         </View>
//       );
//     },
//     [],
//   );

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flex: 0.2,
//           backgroundColor: 'red',
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexWrap: 'wrap',
//           gap: 18,
//           alignSelf: 'auto',
//         }}>
//         <Button
//           title={UPDATE_ADDRESS}
//           onPress={() => dispatch(handleUpdateAddress('Log Angelses'))}
//         />
//         <Button
//           title={UPDATE_AGE}
//           onPress={() => dispatch(handleUpdateAge(19))}
//         />
//         <Button
//           title={UPDATE_MAIL}
//           onPress={() =>
//             dispatch(handleUpdateMail('bhupendrajogi777@gmail.com'))
//           }
//         />
//         <Button
//           title={UPDATE_NAME}
//           onPress={() => dispatch(handleUpdateName('Bhupendra Jogi'))}
//         />
//         <Button
//           title={FETCH_PRODUCTS.concat(reduxState?.products.length)}
//           onPress={() => dispatch(handleFetchProductAction(reduxState.products.length))}
//         />
//       </View>
//       <View
//         style={{
//           flex: 0.8,
//         }}>
//         <FlatList
//           data={reduxState?.products}
//           keyExtractor={(_, index) => index.toString()}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{flexGrow: 1, width: '100%'}}
//           renderItem={({item, index}) => (
//             <ListContainer item={item} key={`${index}`} />
//           )}
//           onEndReached={() => (reduxState?.products.length > 0 && reduxState?.moreLoading) && dispatch(handleFetchProductAction(reduxState?.products.length))}
//           onEndReachedThreshold={0.1}
//           ListFooterComponent={() => {
//             return(
//               (reduxState?.moreLoading && reduxState?.products.length > 0) ? <View style={{height: 150,alignItems:'center',justifyContent:'center'}}>
//                 <ActivityIndicator size={'large'} color={'#262626'} />
//               </View> : null
//             )
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });




// // import * as React from 'react';
// // import {NavigationContainer} from '@react-navigation/native';
// // import {createNativeStackNavigator} from '@react-navigation/native-stack';
// // import HomeScreen from './src/screens/HomeScreen';
// // import LoginScreen from './src/screens/LoginScreen';
// // import RegisterScreen from './src/screens/RegisterScreen';
// // import {store, persister} from './src/store/store';
// // import {Provider, useSelector} from 'react-redux';
// // import {PersistGate} from 'redux-persist/integration/react';

// // const Stack = createNativeStackNavigator();

// // const AuthStack = () => {
// //   return (
// //     <Stack.Navigator initialRouteName="Login">
// //       <Stack.Screen name="Login" component={LoginScreen} />
// //       <Stack.Screen name="Register" component={RegisterScreen} />
// //     </Stack.Navigator>
// //   );
// // };

// // const PublicStack = () => {
// //   return (
// //     <Stack.Navigator initialRouteName="Home">
// //       <Stack.Screen name="Home" component={HomeScreen} />
// //     </Stack.Navigator>
// //   );
// // };

// // const RootNavigator = () => {
// //   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

// //   return (
// //     <Stack.Navigator
// //       screenOptions={{
// //         headerShown: false,
// //       }}>
// //       {isAuthenticated ? (
// //         <Stack.Screen name="PublicStack" component={PublicStack} />
// //       ) : (
// //         <Stack.Screen name="AuthStack" component={AuthStack} />
// //       )}
// //     </Stack.Navigator>
// //   );
// // };

// // export default function App() {
// //   return (
// //     <Provider store={store}>
// //       <PersistGate loading={null} persistor={persister}>
// //         <NavigationContainer>
// //           <RootNavigator />
// //         </NavigationContainer>
// //       </PersistGate>
// //     </Provider>
// //   );
// // }


import { StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React from 'react'
import ThemeScreen from './src/screens/ThemeScreen'
import FileUploadScreen from './src/screens/FileUploadScreen'
import PlacePickerScreen from './src/screens/PlacePickerScreen'
import ColorScreen from './src/screens/ColorScreen'
import AppleInvites from './src/screens/AppleInvites'
import ReactNativeAnimation from './src/react-native-animations/ReactNativeAnimation'
import JigsawPuzzle from './src/react-native-animations/jigsaw-puzzlle'
import JigsawPuzzleGrok from './src/react-native-animations/jigsaw-puzzle-grok'
import PicturePuzzleApp from './src/react-native-animations/picture-puzzle'

const App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PicturePuzzleApp />
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})
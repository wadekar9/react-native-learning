import React, {useCallback} from 'react';
import {Button, Text, View, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from './src/redux/actions';
import {
  UPDATE_ADDRESS,
  UPDATE_AGE,
  UPDATE_MAIL,
  UPDATE_NAME,
  FETCH_PRODUCTS,
} from './src/redux/actions/actionTypes';
import {
  handleUpdateAddress,
  handleUpdateAge,
  handleUpdateMail,
  handleUpdateName,
  handleFetchProductAction,
} from './src/redux/actions/actionCreators';
import {FONTS} from './src/utils/theme';
import { RootStateType, AppDispatch } from './src/redux/store'

type ProductItemProps = {
  thumbnail: string;
  brand: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: string;
}

type reduxStateType = {
  name: string;
  age: string;
  address: string;
  mail: string;
  loading: boolean;
  products: ProductItemProps[],
}

const App = () => {
  const reduxState = useSelector<RootStateType>(state => state.demo);
  const dispatch = useDispatch<AppDispatch>();

  const ListContainer = useCallback(
    ({item}: {item: ProductItemProps}) => {
      return (
        <View
          style={{
            height: 150,
            backgroundColor: '#fff',
            elevation: 2,
            shadowColor: '#000',
            margin: 10,
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'stretch',
            overflow: 'hidden',
          }}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: item.thumbnail}}
              style={{width: '98%', height: '98%', borderRadius: 12}}
              resizeMode={'cover'}
            />
          </View>
          <View
            style={{
              flex: 0.65,
              paddingHorizontal: 12,
              justifyContent: 'center',
              gap: 1,
            }}>
            <Text
              style={{fontSize: 25, fontFamily: FONTS.BOLD, color: '#000'}}
              numberOfLines={1}>
              {item.brand}
            </Text>
            <Text
              style={{fontSize: 20, fontFamily: FONTS.SEMI_BOLD}}
              numberOfLines={1}>
              {item.title}
            </Text>
            <Text
              style={{fontSize: 18, fontFamily: FONTS.SEMI_BOLD}}
              numberOfLines={1}>
              {Number(item.price).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
              })}
            </Text>
            <Text
              style={{fontSize: 17, fontFamily: FONTS.MEDIUM}}
              numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.2,
          backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 18,
          alignSelf: 'auto',
        }}>
        <Button
          title={UPDATE_ADDRESS}
          onPress={() => dispatch(handleUpdateAddress('Log Angelses'))}
        />
        <Button
          title={UPDATE_AGE}
          onPress={() => dispatch(handleUpdateAge(19))}
        />
        <Button
          title={UPDATE_MAIL}
          onPress={() =>
            dispatch(handleUpdateMail('bhupendrajogi777@gmail.com'))
          }
        />
        <Button
          title={UPDATE_NAME}
          onPress={() => dispatch(handleUpdateName('Bhupendra Jogi'))}
        />
        <Button
          title={FETCH_PRODUCTS.concat(reduxState?.products.length)}
          onPress={() => dispatch(handleFetchProductAction(reduxState.products.length))}
        />
      </View>
      <View
        style={{
          flex: 0.8,
        }}>
        <FlatList
          data={reduxState?.products}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, width: '100%'}}
          renderItem={({item, index}) => (
            <ListContainer item={item} key={`${index}`} />
          )}
          onEndReached={() => (reduxState?.products.length > 0 && reduxState?.moreLoading) && dispatch(handleFetchProductAction(reduxState?.products.length))}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => {
            return(
              (reduxState?.moreLoading && reduxState?.products.length > 0) ? <View style={{height: 150,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size={'large'} color={'#262626'} />
              </View> : null
            )
          }}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React, { Fragment, useEffect, useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Divider, TextInput } from 'react-native-paper'
import useDebounce from '../hooks/useDebounce';
import NotFound from './NotFound';
import { Colors } from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function AutoComplete({keywords, setKeywords, listToFind, onPress}) {
    const [displayList, setDisplayList] = useState([]);
    
    const debouncedKeywords = useDebounce(keywords, 1000);

    useEffect(() => {
        if (debouncedKeywords) {
            const filteredList = listToFind.filter((item) => item.includes(debouncedKeywords));
            setDisplayList(filteredList);
        } else {
            setDisplayList([]);
        }
    }, [debouncedKeywords]);

    
  return (
    <View>
        <TextInput 
            value={keywords}
            onChangeText={(text) => setKeywords(text)}
            style={{
              marginTop: 10,
              backgroundColor: Colors.WHITE,
            }}
            left={
              <TextInput.Icon
                icon={() => (
                  <FontAwesome name="search" size={15} color={Colors.DARK_GREY} />
                )}
              />
            }
        />
        <ScrollView style={{height: '100%', flexDirection: 'column', gap: 10}}>
        {
            displayList.length > 0 ? displayList.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => onPress(item)}>
                    <View>
                      <Text
                        style={{
                          fontFamily: "open-sans",
                          fontSize: 15,
                          padding: 10,
                        }}
                      >
                        {item}
                      </Text>
                      <Divider />
                    </View>
                  </TouchableOpacity>
                );
            }) : (
                <NotFound text="No Results"/>
            )
        }
        </ScrollView>
    </View>
  )
}

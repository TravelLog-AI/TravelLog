import React, { Fragment, useEffect, useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Divider, TextInput } from 'react-native-paper'
import useDebounce from '../hooks/useDebounce';
import NotFound from './NotFound';

export default function AutoComplete({keywords, setKeywords, listToFind}) {
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
        />
        <ScrollView style={{height: '100%', flexDirection: 'column', gap: 10}}>
        {
            displayList.length > 0 ? displayList.map((item, index) => {
                return (
                  <View key={index}>
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
                );
            }) : (
                <NotFound text="No Results"/>
            )
        }
        </ScrollView>
    </View>
  )
}

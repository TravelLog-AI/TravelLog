import { View, Text } from 'react-native'
import React from 'react'
import BlogPost from '../BlogPost'
import { Divider } from 'react-native-paper'

export default function MyBlogs() {
  return (
    <View style={{gap: 20}}>
      <BlogPost />
      <Divider />
      <BlogPost />
    </View>
  )
}
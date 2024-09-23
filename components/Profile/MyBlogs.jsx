import { View, Text } from 'react-native'
import React from 'react'
import BlogPost from '../BlogPost'
import { Divider } from 'react-native-paper'
import NotFound from '../NotFound';

export default function MyBlogs({blogs}) {
  return (
    <View style={{ gap: 20, marginHorizontal: 20 }}>
      {blogs.length !== 0 ?
        blogs.map((blog) => {
          return (
            <>
              <BlogPost blog={blog}/>
              <Divider />
            </>
          );
        }) : (
          <NotFound text="No Blogs Found" />
        )
      }
    </View>
  );
}
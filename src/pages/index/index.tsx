import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      {/* iconify collection: lucide */}
      <Text className='i-lucide-binary'></Text>
      {/* custom local SVGs: src/assets/icons/*.svg → i-custom-<name> */}
      <Text className='i-custom-github'></Text>
      <Text className='i-custom-wechat'></Text>
      <Text className='i-custom-alipay'></Text>
    </View>
  )
}

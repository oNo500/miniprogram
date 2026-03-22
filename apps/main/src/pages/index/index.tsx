export const config = definePageConfig({
  navigationBarTitleText: '首页',
})

import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Cell } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.css'

const Arrow = () => <Text className='i-lucide-chevron-right text-gray-400' />

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View>
      <Cell
        title='基础组件'
        description='Icon、Button 等 NutUI 组件示例'
        extra={<Arrow />}
        clickable
        onClick={() => Taro.navigateTo({ url: '/pages/components/index' })}
      />
      <Cell
        title='TDesign Chat'
        description='腾讯 TDesign 聊天组件示例'
        extra={<Arrow />}
        clickable
        onClick={() => Taro.navigateTo({ url: '/pages/tdesign-chat/index' })}
      />
      <Cell
        title='Chat 独立分包'
        description='weapp-vite 独立分包示例'
        extra={<Arrow />}
        clickable
        onClick={() => Taro.navigateTo({ url: '/packages/chat/pages/index/index' })}
      />
    </View>
  )
}

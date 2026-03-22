import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { Cell } from '@nutui/nutui-react-taro'


export const config = definePageConfig({
  navigationBarTitleText: 'Chat 分包',
})

const Arrow = () => <Text className='i-lucide-chevron-right text-gray-400' />

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View>
      <Text>Chat 子包页面</Text>
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
      {/* <Cell
        title='Chat 独立分包'
        description='weapp-vite 独立分包示例'
        extra={<Arrow />}
        clickable
        onClick={() => Taro.navigateTo({ url: '/packages/chat/pages/index/index' })}
      /> */}
    </View>
  )
}

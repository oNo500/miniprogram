export const config = definePageConfig({
  navigationBarTitleText: '基础组件',
})

import { View, Text } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className='flex flex-col gap-2'>
      <Text className='text-xs text-gray-400'>{title}</Text>
      {children}
    </View>
  )
}

export default function Components() {
  return (
    <View className='p-4 flex flex-col gap-6'>

      <Section title='Icons — lucide + custom SVG'>
        <View className='flex gap-3 items-center text-xl'>
          <Text className='i-lucide-binary text-red-400' />
          <Text className='i-lucide-heart text-pink-500' />
          <Text className='i-lucide-star text-yellow-400' />
          <Text className='i-custom-github text-gray-800' />
          <Text className='i-custom-wechat text-green-500' />
          <Text className='i-custom-alipay text-blue-500' />
        </View>
      </Section>

      <Section title='Button — primary (themed via CSS vars)'>
        <View className='flex gap-2 flex-wrap'>
          <Button type='primary'>Primary</Button>
          <Button type='default' plain>Outlined</Button>
          <Button type='primary' disabled>Disabled</Button>
        </View>
      </Section>

      <Section title='Button — types'>
        <View className='flex gap-2 flex-wrap'>
          <Button type='primary'>primary</Button>
          <Button type='default'>default</Button>
          <Button type='danger'>danger</Button>
          <Button type='success'>success</Button>
          <Button type='warning'>warning</Button>
          <Button type='info'>info</Button>
        </View>
      </Section>

    </View>
  )
}

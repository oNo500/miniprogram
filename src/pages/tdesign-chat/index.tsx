import { useState } from 'react'
import { View } from '@tarojs/components'
import './index.css'

export const config = definePageConfig({
  navigationBarTitleText: 'TDesign Chat',
  usingComponents: {
    't-chat-list': '../../tdesign-miniprogram/chat-list/chat-list',
    't-chat-message': '../../tdesign-miniprogram/chat-message/chat-message',
    't-chat-sender': '../../tdesign-miniprogram/chat-sender/chat-sender',
  },
})

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: Array<{ type: 'text'; data: string }>
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: [{ type: 'text', data: '你好！有什么可以帮你的吗？' }],
  },
  {
    id: 2,
    role: 'user',
    content: [{ type: 'text', data: 'TDesign Chat 组件好用吗？' }],
  },
  {
    id: 3,
    role: 'assistant',
    content: [{ type: 'text', data: '非常好用！支持流式输出、Markdown 渲染、自定义 actions 等功能。' }],
  },
]

export default function TDesignChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)

  const handleSend = (e: any) => {
    const text: string = e.detail?.value
    if (!text?.trim()) return

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        role: 'user',
        content: [{ type: 'text', data: text }],
      },
      {
        id: Date.now() + 1,
        role: 'assistant',
        content: [{ type: 'text', data: `你说的是：「${text}」，我收到了！` }],
      },
    ])
  }

  return (
    <View style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* @ts-ignore — native miniprogram component via usingComponents */}
      <t-chat-list layout='single' data={JSON.stringify(messages)} reverse={false} style={{ flex: 1, minHeight: 0 }}>
        {/* @ts-ignore */}
        <View slot='footer'>
          {/* @ts-ignore */}
          <t-chat-sender onSend={handleSend} />
        </View>
      </t-chat-list>
    </View>
  )
}

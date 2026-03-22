import Toast from 'tdesign-miniprogram/toast/index'

let uniqueId = 0
function getUniqueKey() {
  uniqueId += 1
  return `key-${uniqueId}`
}

const MOCK_DATA = `南极的自动提款机并没有一个特定的专属名称，但历史上确实有一台ATM机曾短暂存在于南极的**麦克默多站**（McMurdo Station）。这台ATM由美国**富兰克林国家银行**（Wells Fargo）于1998年安装，主要供驻扎在该站的科研人员使用。不过，由于南极的极端环境和极低的人口密度，这台ATM机并未长期运行，最终被移除。

**背景补充：**
- **麦克默多站**是美国在南极最大的科研基地，夏季人口可达约1,000人，冬季约200人。
- 该ATM机更多是作为一种象征性服务存在，实际使用频率极低，因为南极科考人员通常依靠预支资金或电子支付。
- 目前南极已无长期运行的ATM机，现代科考站更多依赖非现金交易方式。

南极作为非主权领土，其基础设施以科研和生活支持为主，商业金融服务非常有限。若有类似设施，通常是临时或实验性质的。`

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchStream(str: string, options: {
  success: (char: string) => void
  complete: () => void
  delay?: number
}) {
  const { success, complete, delay = 50 } = options
  for (const char of str.split('')) {
    await sleep(delay)
    success(char)
  }
  complete()
}

Page({
  data: {
    renderPresets: [{ name: 'send', type: 'icon' }],
    chatList: [
      {
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        role: 'assistant',
        status: 'complete',
        content: [{ type: 'text', data: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。' }],
        chatId: getUniqueKey(),
        comment: '',
      },
      {
        role: 'user',
        content: [{ type: 'text', data: '牛顿第一定律是否适用于所有参考系？' }],
        chatId: getUniqueKey(),
      },
    ] as any[],
    inputValue: '',
    loading: false,
    contentHeight: '100vh',
    longPressPosition: null as any,
    activePopoverId: '',
  },

  onLoad() {
    try {
      const res = wx.getWindowInfo()
      const statusBarHeight = res.statusBarHeight || 0
      // navigationBar = statusBar + 44px title bar
      const navBarHeight = statusBarHeight + 44
      const contentHeight = `calc(100vh - ${navBarHeight}px)`
      this.setData({ contentHeight })
    }
    catch {
      this.setData({ contentHeight: 'calc(100vh - 88px)' })
    }
  },

  scrollToBottom() {
    const chatList = this.selectComponent('#chatList') as any
    chatList?.scrollToBottom?.()
  },

  onScroll(e: WechatMiniprogram.CustomEvent) {
    console.log('scroll', e)
  },

  onSend(e: WechatMiniprogram.CustomEvent) {
    const value: string = e.detail?.value?.trim()
    if (!value || this.data.loading) return

    const userMsg = {
      role: 'user',
      content: [{ type: 'text', data: value }],
      chatId: getUniqueKey(),
    }

    this.setData({
      chatList: [userMsg, ...this.data.chatList],
      inputValue: '',
    })

    this.simulateAssistantReply()
  },

  onStop() {
    this.setData({ loading: false })
  },

  simulateAssistantReply() {
    this.setData({ loading: true })

    const assistantMsg = {
      role: 'assistant',
      avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
      status: 'pending',
      content: [{ type: 'markdown', data: '' }],
      chatId: getUniqueKey(),
      comment: '',
    }

    this.setData({ chatList: [assistantMsg, ...this.data.chatList] })

    wx.nextTick(() => {
      fetchStream(MOCK_DATA, {
        success: (char) => {
          if (!this.data.loading) return
          this.setData({
            'chatList[0].status': 'streaming',
            'chatList[0].content[0].data': this.data.chatList[0].content[0].data + char,
          })
        },
        complete: () => {
          this.setData({
            'chatList[0].status': 'complete',
            loading: false,
          })
        },
      })
    })
  },

  handleAction(e: WechatMiniprogram.CustomEvent) {
    const { name, active, chatId } = e.detail

    const messages: Record<string, string> = {
      replay: '重新生成',
      copy: '复制成功',
      good: active ? '点赞成功' : '取消点赞',
      bad: active ? '点踩成功' : '取消点踩',
      share: '分享功能',
    }

    Toast({
      context: this,
      selector: '#t-toast',
      message: messages[name] ?? `执行了 ${name} 操作`,
      theme: 'success',
    })

    if (name === 'good' || name === 'bad') {
      const updated = this.data.chatList.map((item: any) =>
        item.chatId === chatId ? { ...item, comment: active ? name : '' } : item,
      )
      this.setData({ chatList: updated })
    }
  },

  showPopover(e: WechatMiniprogram.CustomEvent) {
    const { id, longPressPosition } = e.detail
    const item = this.data.chatList.find((m: any) => m.chatId === id)
    if (item?.role !== 'user') return
    this.setData({ activePopoverId: id, longPressPosition })
  },

  handlePopoverAction(e: WechatMiniprogram.CustomEvent) {
    this.handleAction({ ...e, detail: { ...e.detail, chatId: this.data.activePopoverId } })
  },
})

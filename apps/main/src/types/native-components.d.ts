declare namespace JSX {
  interface IntrinsicElements {
    't-chat-list': React.HTMLAttributes<HTMLElement> & {
      layout?: 'single' | 'both'
      data?: string
      reverse?: boolean
    }
    't-chat-message': React.HTMLAttributes<HTMLElement> & {
      key?: React.Key
      role?: 'user' | 'assistant'
      content?: string
      avatar?: string
      name?: string
    }
    't-chat-sender': React.HTMLAttributes<HTMLElement> & {
      onSend?: (e: any) => void
      placeholder?: string
    }
  }
}

import type { DirectiveBinding } from 'vue'

interface IBinding extends DirectiveBinding {
  value: {
    type: string
    fn: <T>(arg: T) => T
    delay?: number
    immediate?: boolean
    params?: any
  }
}

export default function (el: HTMLElement, binding: IBinding) {
  const { type, fn, delay, immediate, params } = binding.value
  if (!type || !fn) return
  let timeFlag: number | null = null
  let isInvoke = false

  el.addEventListener(type, (e) => {
    if (timeFlag !== null) clearTimeout(timeFlag)
    if (immediate && !isInvoke) {
      fn(params)
      isInvoke = true
    } else {
      timeFlag = window.setTimeout(() => {
        isInvoke = false
        timeFlag = null
        fn(params)
      }, delay)
    }
  })
}

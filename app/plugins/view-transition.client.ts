export default defineNuxtPlugin((nuxtApp) => {
  console.log('View Transition 插件已加载')

  // 监听页面变化
  nuxtApp.hook('page:start', () => {
    console.log('页面开始加载')
  })

  nuxtApp.hook('page:finish', () => {
    console.log('页面加载完成')
  })

  // 在应用挂载时启用 View Transition
  nuxtApp.hook('app:mounted', () => {
    console.log('应用已挂载')

    // 检查浏览器支持
    if ('startViewTransition' in document) {
      console.log('浏览器支持 View Transition')

      // 添加全局样式
      const style = document.createElement('style')
      style.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.3s;
          animation-timing-function: ease-in-out;
        }
      `
      document.head.appendChild(style)
    }
  })
})

// 区分开发环境和生产环境
// 方式一：手动切换
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 方式二：逻辑判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) //是否开发环境
// console.log(import.meta.env.PROD) //是否生产环境
// console.log(import.meta.env.SSR) //是否服务器端渲染
let BASE_URL = ''
if (import.meta.env.PROD) {
    // 生产环境
    BASE_URL = 'http://152.136.185.210:4000'
} else {
    BASE_URL = 'http://152.136.185.210:5000'
}

// 方式三：通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
export { BASE_URL }

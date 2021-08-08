import axios from "axios"
//1. 实例
const instance = axios.create({
    baseURL: "http://httpbin.org",
    // timeout: 1000,
    // headers: { "X-Custom-Header": "foobar" },
});
//2. 拦截器
// instance.interceptors.request.use(
//     config => {
//         // 根据条件加入token-安全携带
//         if (config.url != '/login')  // 不等于登录页面就带上token
//             config.headers['AccessToken'] = ''; // 让每个请求携带token
//         return config;
//     },
//     error => Promise.reject(error) // 请求错误处理
// )
// instance.interceptors.response.use(
//     response => {            
//         const res = response.data; // 统一处理状态
//         if (res.statuscode != 1) { // 需自定义
//             // 返回异常
//             return Promise.reject({
//                 status: res.statuscode,
//                 message: res.message
//             });
//         } else {
//             return response.data;
//         }
//     },
//     // 处理处理
//     error => {
//         if (error && error.response) {
//             switch (error.response.status) {
//                 case 400:
//                     error.message = '错误请求';
//                     break;
//                 default:
//                     error.message = `未知错误${error.response.status}`;
//             }
//         } else {
//             error.message = "连接到服务器失败";
//         }
//         return Promise.reject(error);
//     }
// )

//3. 网络请求
export function request(config) {
    return instance(config);
}
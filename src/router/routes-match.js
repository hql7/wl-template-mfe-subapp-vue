import { DataType } from "wl-core"
import nextRoutes from "@/router/next-routes"

/**
 * 根据路由匹配地址
 * @param {*} data 路由数据
 * @param {*} base 路由前缀
 * @param {*} options 粗略的配置项
 */
function routeMatch(
  data,
  base,
  options = { url: "route", name: "name", id: "id", permissions: "permissions" }
) {
  if (!DataType.isArray(data)) return [];
  // 创建路由盒子
  let routerBox = [];

  routerMapFile(data);
  /**
* @name 路由映射真实视图路径
*/
  function routerMapFile(data) {
    data.forEach(item => {
      if (/^http:/.test(item[options.url])) return;
      // 处理子集
      if (DataType.isArray(item.children) && item.children.length) {
        routerMapFile(item.children);
      } else if (item[options.url]) {
        let _url = item[options.url].replace(base, "");
        let component = null;
        try {
          component = () => import(/* webpackChunkName: "[request]" */`@/views${_url}/index.vue`) // 路由映射真实视图路径
        } catch (err) {
          console.log(err);
        }
        if (!component) return;
        let routerItem = {
          path: _url, // 路由路径名
          component: component
        };
        routerBox.push(routerItem); 
      }
    });
  }

  return routerBox.concat(nextRoutes);
}

export default routeMatch;

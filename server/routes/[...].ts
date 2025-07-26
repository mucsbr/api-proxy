// server/routes/index.ts

/**
 * 代理配置接口
 * @property path - 匹配的路径，例如 /gemini
 * @property target - 目标 URL
 */
interface ProxyTarget {
  path: string;
  target: string;
}

/**
 * 代理配置表
 */
const proxyTargets: ProxyTarget[] = [
  {
    path: "/gemini",
    target: "https://generativelanguage.googleapis.com",
  },
  // 在这里添加更多代理配置
];

export default defineEventHandler(async (event) => {
  const path = event.path;

  // 寻找匹配的代理目标
  const target = proxyTargets.find((item) => path.startsWith(item.path));

  if (target) {
    // 构造目标 URL，并正确处理路径和查询参数
    const requestUrl = getRequestURL(event);
    const remainingPath = requestUrl.pathname.replace(target.path, "");
    const targetUrl = new URL(remainingPath, target.target);
    targetUrl.search = requestUrl.search;

    // 移除客户端 IP 相关 headers，保护隐私
    const headers = getRequestHeaders(event);
    delete headers["x-forwarded-for"];
    delete headers["x-real-ip"];

    // 转发请求到目标 API
    return proxyRequest(event, targetUrl.toString(), {
      headers,
    });
  }

  // 如果没有找到匹配的路由，返回 404
  setResponseStatus(event, 404);
  return "404 Not Found";
});

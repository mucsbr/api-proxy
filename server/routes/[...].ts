// server/routes/[...].ts

/**
 * 从环境变量中解析代理配置
 * @returns { {path: string, target: string}[] }
 */
function getProxyTargets() {
  const env = process.env;
  const targets = [];

  for (const key in env) {
    if (key.startsWith("PROXY_") && key.endsWith("_TARGET")) {
      const path = `/${key.replace("PROXY_", "").replace("_TARGET", "").toLowerCase()}`;
      const target = env[key];
      if (target) {
        targets.push({ path, target });
      }
    }
  }
  
  return targets;
}

export default defineEventHandler(async (event) => {
  const path = event.path;
  const proxyTargets = getProxyTargets();

  // 寻找匹配的代理目标
  const targetConfig = proxyTargets.find((item) => path.startsWith(item.path));

  if (targetConfig) {
    // 构造目标 URL，并正确处理路径和查询参数
    const requestUrl = getRequestURL(event);
    const remainingPath = requestUrl.pathname.replace(targetConfig.path, "");
    const targetUrl = new URL(remainingPath, targetConfig.target);
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

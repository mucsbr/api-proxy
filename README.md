# API 代理服务

这是一个基于 Nitro 构建的轻量级 API 代理服务，可以轻松部署在 Vercel、Netlify、Cloudflare Workers 等无服务器平台上，用于代理和转发 API 请求。

## 项目概述

本项目旨在构建一个简单高效的 API 代理服务 MVP（最小可行产品），专注于核心的请求转发功能。

## 核心功能

### 请求转发机制

- **1:1 请求转发**：完整转发用户的 HTTP 请求（包括请求头、请求体、查询参数等）到目标 API 服务
- **隐私保护**：在转发过程中自动过滤用户真实 IP 等敏感信息，保护用户隐私
- **1:1 响应返回**：将目标 API 的响应原样返回给客户端，保持数据完整性

### 配置管理

- **结构化配置**：采用配置结构体数组的方式管理 API 端点映射关系
- **易于扩展**：支持快速添加新的 API 端点代理配置文件
- **集中管理**：所有代理配置统一维护，便于管理和更新

## 代理配置表

| API 端点 | 目标地址                                  | 说明              |
| -------- | ----------------------------------------- | ----------------- |
| /gemini  | https://generativelanguage.googleapis.com | Google Gemini API |
| ...      | ...                                       | 可扩展            |

## 如何扩展

要添加新的代理路由，请编辑 `server/routes/index.ts` 文件中的 `proxyTargets` 数组。

例如，要添加一个新的代理，使其将 `/my-api` 的请求转发到 `https://api.example.com`，您可以这样修改：

```typescript
const proxyTargets: ProxyTarget[] = [
  {
    path: "/gemini",
    target: "https://generativelanguage.googleapis.com",
  },
  {
    path: "/my-api",
    target: "https://api.example.com",
  },
  // 在这里添加更多代理配置
];
```

## 技术架构

- **框架**：Nitro - 现代化的全栈 Web 框架
- **部署**：支持多种无服务器平台
- **性能**：轻量级设计，快速冷启动
- **维护**：使用统一的配置文件进行管理。

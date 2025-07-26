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

- **环境变量配置**：通过环境变量动态配置和管理 API 代理规则，提高安全性和灵活性。
- **易于扩展**：可以轻松通过添加新的环境变量来支持更多的 API 服务。
- **环境分离**：不同部署环境（如开发、生产）可以使用不同的配置。

## 代理配置表

| API 端点 | 目标地址 | 环境变量 (示例) | 说明 |
| --- | --- | --- | --- |
| `/gemini/**` | `https://generativelanguage.googleapis.com` | `PROXY_GEMINI_TARGET=https://generativelanguage.googleapis.com` | Google Gemini API |
| `/openai/**` | `https://api.openai.com` | `PROXY_OPENAI_TARGET=https://api.openai.com` | OpenAI API |
| `/anthropic/**` | `https://api.anthropic.com` | `PROXY_ANTHROPIC_TARGET=https://api.anthropic.com` | Anthropic API |

## 如何扩展

通过在项目根目录创建 `.env` 文件并添加环境变量来配置代理。

例如，要添加一个新的代理，将 `/my-api/**` 的请求转发到 `https://api.example.com`，您可以在 `.env` 文件中添加以下行：

```
PROXY_MYAPI_TARGET=https://api.example.com
```

### .env 示例

[.env.example](./.env.example)

## 技术架构

- **框架**：Nitro - 现代化的全栈 Web 框架
- **部署**：支持多种无服务器平台
- **性能**：轻量级设计，快速冷启动
- **维护**：通过环境变量进行统一管理，无需修改代码即可更新代理目标。

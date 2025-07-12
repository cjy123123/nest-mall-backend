# Mall Backend

## 项目简介

Mall Backend 是一个基于 NestJS 框架开发的电商系统后端，提供了用户管理、商品分类、商品管理、购物车等核心功能的 API 接口。

## 技术栈

- **框架**: [NestJS](https://nestjs.com/) v11
- **ORM**: [Prisma](https://www.prisma.io/) v6
- **API 文档**: [Swagger](https://swagger.io/)
- **数据验证**: class-validator, class-transformer
- **HTTP 客户端**: axios
- **工具库**: dayjs, nanoid, faker-js

## 项目结构

```
mall-backend/
├── prisma/                 # Prisma 相关文件
│   ├── migrations/         # 数据库迁移文件
│   ├── mock/               # 模拟数据
│   └── schema.prisma       # 数据库模型定义
├── src/
│   ├── common/             # 通用模块
│   ├── modules/            # 功能模块
│   │   ├── cart/           # 购物车模块
│   │   ├── category/       # 分类模块
│   │   ├── goods/          # 商品模块
│   │   ├── prisma/         # Prisma 服务模块
│   │   ├── upload/         # 文件上传模块
│   │   └── user/           # 用户模块
│   ├── utils/              # 工具函数
│   ├── app.module.ts       # 应用程序主模块
│   └── main.ts             # 应用程序入口
├── uploads/                # 上传文件存储目录
└── .env                    # 环境变量配置
```

## 核心功能模块

- **用户模块**: 用户注册、登录、信息管理
- **分类模块**: 商品分类管理
- **商品模块**: 商品信息管理
- **购物车模块**: 购物车及购物车项管理
- **上传模块**: 文件上传功能

## 数据库模型

项目使用 Prisma ORM 管理数据库，主要模型包括：

- **User**: 用户信息
- **Category**: 商品分类
- **Goods**: 商品信息
- **Cart**: 购物车
- **CartItem**: 购物车项

## 安装与运行

### 环境要求

- Node.js v18+
- PNPM v8+
- MySQL/PostgreSQL 数据库

### 安装依赖

```bash
pnpm install
```

### 数据库配置

1. 在 `.env` 文件中配置数据库连接信息
2. 执行数据库迁移

```bash
npx prisma migrate dev
```

3. 生成 Prisma 客户端

```bash
npx prisma generate
```

4. 填充测试数据

```bash
npx prisma db seed
```

### 运行项目

```bash
# 开发模式
pnpm run dev

# 生产模式
pnpm run build
pnpm run prod
```

## API 文档

项目集成了 Swagger 文档，启动服务后访问：

```
http://localhost:3000/api/docs
```

## 环境变量

项目支持不同环境的配置：

- `.env`: 默认环境配置
- `.env.development`: 开发环境配置
- `.env.production`: 生产环境配置

## 项目脚本

- `pnpm run build`: 构建项目
- `pnpm run start`: 启动项目（监视模式）
- `pnpm run dev`: 开发模式启动
- `pnpm run prod`: 生产模式启动
- `pnpm run lint`: 代码检查
- `pnpm run test`: 运行测试
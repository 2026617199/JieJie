# 构建阶段
FROM node:24-alpine AS builder

WORKDIR /app

# 复制 package.json 和 package-lock.json(如果存在)
COPY package.json ./

# 安装依赖
RUN npm install

# 复制所有源代码
COPY . .

# 构建项目
RUN npm run build

# 生产阶段 - 使用 Nginx 提供静态文件服务
FROM nginx:stable-alpine

# 复制自定义 nginx 配置(如果有的话)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 将构建产物复制到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]

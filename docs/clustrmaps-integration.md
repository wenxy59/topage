# ClustrMaps 集成说明

## 概述

已成功将 ClustrMaps 访客地球仪插件集成到网站的左侧栏下方。

## 修改的文件

### 1. 新建文件
- `src/components/home/ClustrMaps.tsx` - ClustrMaps 组件

### 2. 修改的文件
- `src/app/page.tsx` - 在首页左侧栏添加 ClustrMaps 组件
- `src/components/home/Profile.tsx` - 移除 sticky 定位，改为由父容器控制

## 功能特性

### 智能加载
- ✅ 仅在生产域名（`wenxy.pages.dev`）和 localhost 上加载脚本
- ✅ 避免在其他环境下加载，节省资源
- ✅ 使用 useRef 防止重复加载

### 响应式设计
- ✅ 在左侧栏下方显示，与 Profile 卡片保持一致的设计风格
- ✅ 带有 hover 效果和动画
- ✅ 适配深色模式

### 布局优化
- ✅ 左侧栏使用 sticky 定位，随页面滚动
- ✅ Profile 和 ClustrMaps 作为一个整体进行定位
- ✅ 在移动端自动调整布局

## 使用说明

插件会在访客访问网站时自动加载，无需手动配置。地球仪会显示：
- 访客的地理位置分布
- 访问统计信息
- 实时更新的访客数据

## 自定义配置

如果需要修改 ClustrMaps 的配置，请：

1. 访问 [ClustrMaps 官网](https://clustrmaps.com/)
2. 获取新的脚本代码
3. 更新 `src/components/home/ClustrMaps.tsx` 文件中的脚本 URL：

```typescript
script.src = '//clustrmaps.com/globe.js?d=YOUR_NEW_ID_HERE';
```

## 样式调整

可以在 `ClustrMaps.tsx` 中修改以下样式：

- **容器样式**：修改 `motion.div` 的 className
- **最小高度**：修改 `min-h-[200px]` 值
- **最大宽度**：修改 `maxWidth: '280px'` 值
- **标题文本**：修改 `<h3>` 标签内容

## 注意事项

1. **脚本加载**：ClustrMaps 脚本需要一些时间加载，首次访问可能需要等待几秒钟
2. **数据更新**：访客数据由 ClustrMaps 服务器统计，可能有延迟
3. **隐私考虑**：ClustrMaps 会收集访客的地理位置信息，请确保符合隐私政策

## 部署

修改已包含在代码中，只需：

```bash
npm run build
```

然后将 `out/` 目录部署到 Cloudflare Pages 即可。

## 故障排除

### 地球仪不显示
- 检查是否在正确的域名下访问
- 打开浏览器控制台查看是否有错误信息
- 确认 ClustrMaps 服务正常运行

### 样式问题
- 检查深色模式下的显示效果
- 调整容器的最大宽度适应不同屏幕尺寸

## 技术细节

- **框架**：Next.js 15 with App Router
- **动画**：Framer Motion
- **加载策略**：客户端动态加载
- **性能**：异步加载，不阻塞页面渲染


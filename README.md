# 前置声明

Better HOJ 27 采用 **CC BY-NC-SA** 作为协议。

- BY 表示署名——如果已提供，您必须提供创作者和署名者的姓名或名称、版权标识、许可协议标识、免责标识和作品链接。
- SA 表示以相同方式共享——如果您再混合、转换或者基于本作品进行创作，您必须基于与原先许可协议相同的许可协议分发您贡献的作品。
- NC 表示非商业化——不应将项目内容打包销售，基于项目开发商业产品以及用于盈利性活动。

# 如何使用

首先打开浏览器，进入插件设置，然后打开“开发者模式”，拖拽 tampermonkey.crx 到插件列表里。

然后，打开油猴配置页面，点击“实用工具”-> “导入”-> 在弹出的文件列表中选择 `/dist/betterhoj.user.js`。

# 介绍

## 在线下载最新的 Better HOJ 27：[betterhoj.zip](/api/public/file/9000681f98d8491dba5aa038130f2f96.zip) [link2](https://pan.rkcd.me/s/rh96u9vs)

## 什么是 Better HOJ？

这是一个使用 Userscripts 为 HOJ 添加丰富功能，以提升 HOJ 用户体验的项目。

### 什么是 HOJ？

> Hcode Online Judge（HOJ）：一个基于前后端分离与分布式架构的在线测评平台。前端使用 Vue，后端主要使用 Spring Boot、Redis、MySQL、Nacos 等技术。
>
> 摘自 docs.hdoi.cn

## Better HOJ 的起源

> 时间实际上是人的积极存在。它不仅是人的生命的尺度，而且是人的发展的空间。
>
> ——马克思

### HOJTool

2025 年 6 月，我在研究 HOJ API 时，非常幸运地**发现**了大量漏洞。我和罗及恩对此感到十分震惊，于是决定利用这些漏洞。

当时 AI 还十分落后，我自己的水平也很有限。在罗及恩的建议下，我使用 Python 的 Tkinter 实现了一个只包含 HOJ 少量功能的程序。

### Smart HOJ Vue

最初由于速度等原因，它在 Deeplearning 上实现，并尝试尽可能减少美化对性能的影响，但缺点也有很多：第一，几乎全靠手工编写，进展极慢；第二，几乎无法适配学校的 HOJ（HTTP 甚至影响了 Better HOJ）。

最终，我决定使用**反向代理**来解决这个问题。但这也意味着我能看到所有请求，这比 HTTP 危险太多了！而这确实也与我有关，我向所有密码曾被非法获取的用户道歉。

作为一个**重装系统大师**，我在一次重装系统时弄丢了源码，导致我无法再改进和发展它。

### 第三方题面

2025 年 10 月，我和罗及恩决定维护第三方题面，但当时只有潦草的 UserScript 和 Python Flask 版本在维护，因此后来便不了了之。

### Better HOJ

开学后，我体会到 [Competitive Companion](https://github.com/jmerle/competitive-companion#readme) 和 [cph-ng](https://github.com/langningchen/cph-ng) 的便利，于是决定制作一个脚本。最初的核心目标就是支持：导入到 CPH。

AI 的发展日新月异。在 DeepSeek 的“神力”加持下，第一天就完成了 $1500$ 行代码，包含 Smart HOJ 与导入到 CPH 的功能。此后半个月里，我们不断完善功能。如今，它已有接近 $8000$ 行代码。

借鉴 Smart HOJ 的做法，Better HOJ 决定以年份命名。

## 功能介绍

> 头抬起，请坐和放宽，好东西就要来了
>
> —— 微软

Better HOJ 27 在保留 Smart HOJ 全貌的前提下，补齐了**片段、推荐、签到、标签、可配置菜单栏、可拖拽组件、云端同步与配置迁移**这些原版没有或不够方便的功能，并把几乎所有视觉与交互细节都做成了可配置项。

### 完美复刻 Smart HOJ

基于 OIerZhang 的 Smart HOJ 27 Beta 4.6，完美复刻其美观、流畅的使用体验。

### Smart HOJ JS

支持一系列由 JavaScript 驱动的特色美化。目前已实现：深色模式鼠标光晕、基于时间的动态壁纸。

### 灵活迁移

- **收藏导出 / 导入**：题单以 JSON 导出，导入时自动跳过重复。
- **配置导出 / 导入**：开关、外观、颜色、片段、菜单栏布局一网打尽。导入前会做**版本比较、字段白名单校验和预览确认**，避免脏数据污染。

### 趣味功能

- **自定义标签**：为你的账号设置显示在排行榜与个人主页的标签。
- **每日签到**：每天签到可领取随机运势，签到状态会自动同步。
- **桌面组件**：按键显示、今日使用时长、时钟，均可拖拽摆放并记忆位置。

### 做题工具

- **一键跳转**：快速前往 Codeforces、洛谷、LibreOJ、AtCoder 等原题页面。
- **导入 CPH**：将题面样例直接推送到 VSCode 插件 cph 和 cph-ng。
- **复制题面**：快速复制题目 Markdown，便于整理与记录。
- **代码片段**：维护自己的片段库，按分类检索，一键插入到光标处；还能绑定快捷键，`Ctrl+Alt+S`  一键唤起。
- **快速评测**：一键评测所有数据，无需反复点击。

### 高效使用

- **自动登录**：配置用户名密码后自动保持登录态，并提供"清除本地登录态"按钮。
- **自动重定向**：在 `ssf.hdoi.cn`、`oi.cnuschool.org.cn`、`172.16.21.199` 之间任意配置一个为目标，将自动改写站内链接。
- **菜单栏自定义**：Logo、各导航项、通知、Better HOJ、签到等全部可**拖拽重排**和**显隐**，改动即时生效。用户信息区作为固定锚点不受影响。
- **Vditor 编辑器**: HOJ 使用的 maven-editor 已经落后，你将使用先进的 Vditor，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式，以及更多 [Vditor 特性](https://gitee.com/mirrors/Vditor)。
- **新版前端适配**：在 `/new` 路径下自动注入"Better HOJ"和"返回旧前端"按钮。
- **monaco-editor 代码编辑器**：覆盖了原版没用的 CodeMirror，而是 VSCode 同款的编辑器。

### 安全的代码

基于原版 HOJ 开发，代码清晰可读，保障个人信息安全，绝不会重蹈覆辙。

### 您是最新的

支持自动更新，让您时刻保持最新版本。

## 选择 Better HOJ

Better HOJ 从各个方面都领先于当前的 HOJ 优化：


| 特性                                  | Better HOJ 27            | Smart HOJ 27 Beta 4.6    | Smart HOJ 27 JS Alpha 2  | Better HOJ（AC_OIKonjac）[^0] | HOJ                      |
| ------------------------------------- | ------------------------ | ------------------------ | ------------------------ | ----------------------------- | ------------------------ |
| 界面美化与主题                        | $\color{brown}{-}$ [^5]  | $\color{green}{\sqrt{}}$ | $\color{green}{\sqrt{}}$ | $\color{red}{\times}$         | $\color{red}{\times}$    |
| 动态壁纸                              | $\color{green}{\sqrt{}}$ | $\color{red}{\times}$    | $\color{red}{\times}$    | $\color{red}{\times}$         | $\color{red}{\times}$    |
| 自定义设置与配置迁移                  | $\color{green}{\sqrt{}}$ | $\color{brown}{-}$ [^1]  | $\color{brown}{-}$ [^3]  | $\color{brown}{-}$            | $\color{red}{\times}$    |
| 做题辅助（收藏 / 推荐 / 片段 / 跳转） | $\color{green}{\sqrt{}}$ | $\color{red}{\times}$    | $\color{brown}{-}$ [^7]  | $\color{brown}{-}$            | $\color{red}{\times}$    |
| 趣味扩展（签到 / 标签 / 小组件）      | $\color{green}{\sqrt{}}$ | $\color{red}{\times}$    | $\color{red}{\times}$    | $\color{red}{\times}$         | $\color{red}{\times}$    |
| 菜单栏布局自定义                      | $\color{green}{\sqrt{}}$ | $\color{red}{\times}$    | $\color{red}{\times}$    | $\color{red}{\times}$         | $\color{red}{\times}$    |
| 及时的更新                            | $\color{green}{\sqrt{}}$ | $\color{green}{\sqrt{}}$ | $\color{red}{\times}$    | $\color{red}{\times}$         | $\color{green}{\sqrt{}}$ |
| 兼容性广                              | $\color{green}{\sqrt{}}$ | $\color{green}{\sqrt{}}$ | $\color{red}{\times}$    | $\color{green}{\sqrt{}}$      | $\color{green}{\sqrt{}}$ |
| 国际化                                | $\color{green}{\sqrt{}}$ | $\color{red}{\times}$    | $\color{red}{\times}$    | $\color{red}{\times}$         | $\color{green}{\sqrt{}}$ |

[^0]: 用来指 @王奕淳1 制作的 Better HOJ，后文同。
    
[^1]: Smart HOJ 27 支持面板化自定义，但**不提供配置导入导出**。
    
[^3]: Smart HOJ 27 JS 的面板化自定义不完全可用，而且**不提供配置导入导出**。
    
[^4]: Smart HOJ 27 JS 是张书瑞最近所研究和更新的，但是截至现在不支持自动更新。
    
[^5]: Better HOJ 27 的 CSS 美化部分**并不完全**等于 Smart HOJ，所以部分美化可能没有完全覆盖。
    
[^7]: Smart HOJ 27 JS 支持复制题目 Markdown 和导入到 CPH 和一键评测所有样例，仅此而已。

# 文件介绍

## 油猴插件

提供较旧版本的 Tampermonkey，也可以选择从浏览器插件市场下载最新的插件，均可运行本脚本。

## 脚本本体

`/dist/betterhoj.user.js`

这是编译出来的脚本文件，可以直接导入，但是可读性较低。

## 源代码

`/src`

在 Better HOJ 27.4.0 之后，我们拆分了脚本使其更易于维护。

如果你想要编译，需要先安装先进的 npm，然后：

```bash
# dev
npm run build
# prod
npm run build:prod
```

## 配色

为了更灵活的实现 OIerZhang 的主题功能，我将其改成了配色方案，位于 `/style`。

$8$ 个 Smart HOJ 27 Beta 4.6 配色方案，可以通过设置导入。

# 感谢

感谢使用并参与了 Better HOJ 27 的测试，你的建议将成为 Better HOJ 27 前进的动力。

Better HOJ 27 的作者：longStone，写于 2026-11-21。

## 贡献者

参与 Better HOJ 27 贡献的人，以下名称为乱序排列。

- Zzzsh：首师附 HOJ 和深学 HOJ 的维护者，HOJ 的贡献者，首师附信息学教师。
- 朱梓萌：使用了 Better HOJ 27 并提出修改建议。
- 张书瑞：Smart HOJ 的开发者，提出发展建议。
- 黄家琪：未使用，但是提出修改建议。
- 王奕淳1：同行（bushi），提供有关 Better HOJ（AC_OIKonjac）的信息。
- 罗及恩

$\color{white}{没有公开信息表明李雪晨是杨森林的学生}$ 
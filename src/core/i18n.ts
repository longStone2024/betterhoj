/**
 * Internationalization module
 * Provides translation lookup, language detection, and DOM application
 */

// ============================================================
// Translation Data
// ============================================================
export const I18N = {
  'zh-CN': {
    'api.networkError': '网络错误：{msg}',
    'api.httpError': 'HTTP 错误：{code}',
    'api.jsonError': '响应不是合法 JSON',
    'api.bizError': '请求失败（{code}）',

    // ---- 面板头 ----
    'panel.title': 'Better HOJ',
    'panel.importExport': '导入导出',
    'panel.close': '关闭',
    'panel.lang': '语言',

    // ---- Better HOJ ----
    'better.title': 'Better HOJ 27 设置 by longStone',
    'better.login': '自动登录',
    'login.enable': '启用自动登录',
    'login.username': '默认用户名',
    'login.password': '默认密码',
    'login.manual': '手动登录',
    'login.clear': '清除登录状态',

    'better.problemTools': '题目工具',
    'fav.clear': '清空所有收藏',
    'autosave.enable': '启用自动保存',
    'autosave.interval': '保存频率',
    'autosave.15': '15 秒',
    'autosave.30': '30 秒',
    'autosave.60': '1 分钟',
    'autosave.120': '2 分钟',
    'autosave.300': '5 分钟',
    'cph.realurl': 'CPH：使用真链接（CF）',

    'better.redirect': '重定向',
    'redirect.enable': '启用重定向',
    'redirect.target': '重定向目标',
    'redirect.host1': 'ssf.hdoi.cn（外网）',
    'redirect.host2': 'oi.cnuschool.org.cn（内网）',
    'redirect.host3': '172.16.21.199（内网 IP）',

    'better.checkin': '每日签到',
    'checkin.enable': '启用签到',
    'checkin.popup': '签到后自动弹窗',
    'checkin.luck': '今日运势',
    'checkin.do': '立即签到',
    'checkin.refresh': '刷新状态',

    'better.tag': '个人标签',
    'tag.text': '标签文字',
    'tag.color': '标签颜色',
    'tag.refresh': '刷新云端标签',
    'tag.push': '重新上传当前标签',
    'tag.delete': '清除云端标签',

    'better.tools': '小组件',
    'tools.enable': '启用小组件',
    'tools.keystroke': '按键显示',
    'tools.time': '今日使用时长',
    'tools.clock': '时钟',

    'better.rec': '题目推荐',
    'rec.cfname': 'Codeforces 用户名',

    'better.navbar': '菜单栏',
    'navbar.config': '配置菜单栏布局',

    'better.snippet': '片段',
    'snippet.hotkey': '唤出面板快捷键',
    'snippet.manage': '管理片段',
    'snippet.open': '打开片段面板',

    'better.about': '关于',
    'about.showVersion': '显示版本信息',
    'about.version': '版本',
    'perf.enable': '高性能模式',
    'perf.hint': '关闭弹窗淡出动画与背景模糊，低性能设备上更流畅',
    'about.copyVersionHint': '点击复制版本信息',
    'about.copied': '已复制：{v}',
    'about.copyFailed': '复制失败',

    'panel.fullscreen': '全屏显示',

    // ---- Smart HOJ ----
    'smart.title': 'Smart HOJ 27 设置 by OIerZhang',
    'smart.enable': '启用 Smart HOJ',

    'smart.general': '通用',
    'general.smoothScroll': '平滑滚动',
    'general.smoothSwitch': '平滑的页面过渡',
    'general.dark': '深色模式',
    'general.mouseGlow': '鼠标光晕（需要重新加载）',
    'general.liquidGlass': '液态玻璃 UI',
    'general.better404': '更好的 404 页面',
    'general.hideNew': '隐藏体验新版',

    'smart.background': '背景',
    'bg.source': '内置背景来源',
    'bg.builtin': '内置背景',
    'bg.custom': '自定义背景 URL',

    'smart.card': '卡片',
    'card.bg': '卡片背景',
    'card.blur': '卡片模糊',
    'card.radius': '卡片圆角',

    'smart.list': '列表',
    'list.bg': '列表背景',
    'list.bgGreen': '列表背景绿',
    'list.bgHover': '列表 hover',

    'smart.code': '代码块',
    'code.bg': '代码块背景',
    'code.radius': '代码块圆角',

    'smart.input': '输入框',
    'input.bg': '输入框背景',
    'input.radius': '输入框圆角',

    'smart.button': '按钮',
    'button.bg': '按钮背景',
    'button.hover': '按钮 hover',
    'button.active': '按钮 active',
    'button.radius': '按钮圆角',

    'smart.misc': '其他',
    'misc.tagRadius': 'Tag 圆角',
    'misc.tooltipBg': '提示框背景',
    'misc.tooltipRadius': '提示框圆角',
    'misc.judgeRadius': '评测色块圆角',

    'smart.text': '文字',
    'text.dark': '深色文字',
    'text.darkDisabled': '禁用文字',
    'text.light': '浅色文字',
    'text.blue': '蓝色文字',
    'text.link': '链接颜色',
    'text.select': '选中文字背景',

    'smart.font': '字体',
    'font.memorizing': '易于记忆的字体',
    'font.sans': '无衬线字体',
    'font.mono': '等宽字体',

    // ---- 菜单栏布局 ----
    'navbar.title': '菜单栏布局',
    'navbar.hint': '拖动行来调整顺序，勾选控制是否显示。改动实时生效。',
    'navbar.reset': '恢复默认',
    'navbar.reset.confirm.title': '确认恢复默认？',
    'navbar.reset.confirm.body': '将重置菜单栏的顺序与显示状态。',
    'navbar.reset.confirm.ok': '确认',
    'navbar.resetConfirm.title': '确认恢复默认？',
    'navbar.resetConfirm.body': '将重置菜单栏的顺序与显示状态。',

    'nav.item.logo': 'Logo',
    'nav.item.home': '首页',
    'nav.item.problems': '题目',
    'nav.item.training': '训练',
    'nav.item.contest': '比赛',
    'nav.item.submission': '评测',
    'nav.item.rank': '排名',
    'nav.item.discussion': '讨论',
    'nav.item.team': '团队',
    'nav.item.about': '关于',
    'nav.item.newui': '体验新版',

    // ============ 通用对话框 ============
    'dialog.tip': '提示',
    'dialog.confirm': '确定',
    'dialog.cancel': '取消',
    'dialog.close': '关闭',
    'dialog.warning': '警告',
    'dialog.error': '错误',
    'dialog.success': '成功',
    'dialog.info': '信息',

    // ============ 通用动作 ============
    'action.delete': '删除',
    'action.remove': '移除',
    'action.add': '添加',
    'action.edit': '编辑',
    'action.save': '保存',
    'action.ok': '确定',
    'action.cancel': '取消',
    'action.retry': '重试',
    'action.yes': '是',
    'action.no': '否',

    // ============ 登录 ============
    'login.autoSuccess': '已自动登录，页面将重新加载',
    'login.autoFailed': '自动登录失败，请手动登录',
    'login.manualLogging': '正在登录',
    'login.clearConfirm': '将清除当前登录信息，是否继续？',
    'login.cleared': '已清除本地登录态',

    // ============ 收藏 ============
    'fav.clearConfirm.title': '确认操作',
    'fav.clearConfirm.body': '确定要清空所有收藏吗？',
    'fav.cleared': '已清空所有收藏',
    'fav.added': '已收藏：',
    'fav.removed': '已取消收藏：',

    // ============ 标签 ============
    'tag.refreshed': '已刷新：{name}',
    'tag.noRemote': '云端无标签或请求失败',
    'tag.needText': '请先填写标签文字',
    'tag.uploaded': '已上传标签',
    'tag.clearConfirm.title': '确认清除',
    'tag.clearConfirm.body': '将同时删除云端记录和本地配置，确定继续？',
    'tag.cleared': '已清除标签',
    'tag.clearFailed': '清除失败：{msg}',

    // ============ 签到 ============
    'checkin.disabled': '签到功能已禁用',
    'checkin.queryFailed': '查询签到状态失败',
    'checkin.failed': '签到失败，请稍后再试',
    'checkin.notChecked': '今日尚未签到',
    'checkin.alreadyChecked': '今日已签到：{luck} —— {result}',
    'checkin.resultTitle': '签到成功',
    'checkin.alreadyTitle': '今日已签到',
    'checkin.acceptGoodLuck': '收下好运',

    // ============ 导入导出 ============
    'ie.importTitle': '导入 / 导出',
    'ie.tabExport': '导出',
    'ie.tabImport': '导入',
    'ie.presetAll': '全部',
    'ie.presetSmart': '仅 Smart HOJ',
    'ie.presetBetter': '仅 Better HOJ',
    'ie.presetFavorites': '仅收藏',
    'ie.presetSnippet': '仅代码片段',
    'ie.exportBtn': '导出',
    'ie.importBtn': '导入',
    'ie.pickFile': '选择文件…',
    'ie.resetDefaults': '恢复默认配置',
    'ie.backToPick': '← 重新选择',
    'ie.selectAtLeastOne': '请至少选择一项',
    'ie.importSuccess': '已导入：{details}',
    'ie.exportSuccess': '已导出：{details}',
    'ie.parseFailed': '文件解析失败：{msg}',
    'ie.noContent': '文件中没有可用的内容',
    'ie.fileFormatError': '文件格式不正确',
    'ie.pickHint': '选择一个由 Better HOJ 导出的 JSON 文件。',
    'ie.favorites': '题目收藏',
    'ie.snippets': '代码片段',
    'ie.sensitiveHidden': '已设置（导出时将包含原值）',
    'ie.sensitiveEmpty': '未设置',

    'ie.pickHintTitle': '选择一个由 Better HOJ 支持的配置文件。',
    'ie.pickHintDetail': '导入会覆盖当前对应配置项；题目收藏会按题目 ID 去重合并。',

    'ie.chosenFile': '已选择：{name}',

    'ie.fileKindDefaults': '默认配置',
    'ie.fileKindSettings': '旧版配置文件',
    'ie.fileKindFavorites': '收藏列表文件',
    'ie.fileKindMixed': '新版配置文件',
    'ie.fileKindUnknown': '无法识别',

    'ie.versionOld': '⚠️ 该文件来自旧版本 {v}（当前 {cur}）',
    'ie.versionNew': '⚠️ 该文件来自新版本 {v}（当前 {cur}）',
    'ie.versionSame': '✔ 版本一致（{cur}）',
    'ie.versionMissing': '该文件未包含版本信息',
    'ie.ignoredCount': '忽略了 {n} 项无法识别的设置',

    'ie.favCount': '{n} 条',
    'ie.favCountNew': '{n} 条（新增 {added}）',

    'ie.snippetMergeTip': '代码片段将合并导入：现有 {exist} 条，将新增 {add} 条、更新 {upd} 条。',

    'ie.exportedSummary': '已导出：{keys} 项配置{extra}',
    'ie.exportedExtraFav': '，{n} 条收藏',

    'ie.importedSummary': '已导入：{parts}',
    'ie.importedKeysPart': '{n} 项配置',
    'ie.importedSnippetPart': '代码片段（{seg}）',
    'ie.importedSnippetAdd': '新增 {n}',
    'ie.importedSnippetUpd': '更新 {n}',
    'ie.importedFavPart': '新增 {n} 条收藏',

    'snippet.applyFailed': '未找到输入位置',
    'snippet.inserted': '已插入：{name}',
    'snippet.nameRequired': '请填写名称',
    'snippet.contentRequired': '请填写内容',
    'snippet.hotkeyConflict': '快捷键与「{name}」冲突',
    'snippet.hotkeyConflictPanel': '快捷键与「唤出面板」冲突',
    'snippet.saved': '已保存',
    'snippet.deleteConfirm': '确定删除片段「{name}」？',

    'update.available': '发现新版本',
    'update.current': '当前版本',
    'update.latest': '最新版本',
    'update.date': '发布日期',
    'update.changelog': '更新内容',
    'update.noChangelog': '无更新日志',
    'update.gotoDownload': '前往下载',
    'update.later': '稍后再说',
    'update.urgent': '❌ 重要更新，请尽快更新以获取最新功能与修复。',
    'update.normal': '⚠️ 新版推出，建议尽快更新。',

    'group.general': '通用开关',
    'group.background': '背景',
    'group.card': '卡片',
    'group.list': '列表',
    'group.code': '代码块',
    'group.codeBlock': '代码块',
    'group.input': '输入框',
    'group.button': '按钮',
    'group.misc': '其他样式',
    'group.text': '文字颜色',
    'group.font': '字体',
    'group.version': '版本信息',
    'group.perf': '性能',
    'group.login': '登录',
    'group.checkin': '签到',
    'group.redirect': '重定向',
    'group.tag': '自定义标签',
    'group.cph': 'CPH',
    'group.tools': '小组件',
    'group.vscode': 'VS Code 编辑器',
    'group.recommend': '题目推荐',
    'group.navbar': '菜单栏布局',
    'group.snippet': '代码片段',
    'group.other': '其他',

    'checkin.btn': '签到',
    'checkin.btnDone': '已签到',
    'checkin.btnTitle': '每日签到',

    // ============ 油猴菜单 ============
    'menu.openSettings': 'Better HOJ · 打开设置面板',
    'menu.toggleDarkMode': 'Better HOJ · 切换深色模式',
    'menu.darkOn': '深色模式已开启',
    'menu.darkOff': '深色模式已关闭',
    'menu.toggleSmartHoj': 'Better HOJ · 切换 Smart HOJ 总开关',
    'menu.smartOn': 'Smart HOJ 已启用',
    'menu.smartOff': 'Smart HOJ 已禁用',
    'menu.openSnippetPanel': 'Better HOJ · 打开片段面板',
    'menu.manageSnippets': 'Better HOJ · 管理片段',
    'menu.importExport': 'Better HOJ · 导入 / 导出',
    'menu.togglePanelFullscreen': 'Better HOJ · 切换设置面板全屏',

    // ============ 讨论 ============
    'discussion.new': '发布讨论',
    'discussion.category': '分类',
    'discussion.title': '标题',
    'discussion.titlePlaceholder': '请输入标题',
    'discussion.content': '内容',
    'discussion.contentPlaceholder': '支持 Markdown，可插入代码块、表格、公式…',
    'discussion.publish': '发布',
    'discussion.publishing': '发布中…',
    'discussion.categoryRequired': '请选择分类',
    'discussion.titleRequired': '请填写标题',
    'discussion.contentRequired': '请填写内容',
    'discussion.publishSuccess': '发布成功',
    'discussion.publishFailed': '发布失败：{msg}',
    'discussion.loadCategoriesFailed': '无法获取讨论分类',
    'discussion.loadEditorFailed': '编辑器加载失败，请检查网络',
    'discussion.initEditorFailed': '编辑器初始化失败',
    'discussion.editorNotReady': '编辑器尚未就绪',
    'discussion.description': '简介',
    'discussion.descriptionPlaceholder': '一句话概括帖子内容（将显示在列表页）',
    'discussion.descriptionRequired': '请填写简介',
    'discussion.advanced': '高级选项',
    'discussion.advancedHint': '以下字段通常不需要修改，如需调试再展开。',
    'discussion.role': '角色',
    'discussion.viewNum': '浏览量',
    'discussion.likeNum': '点赞数',
    'discussion.commentNum': '评论数',
    'discussion.topPriority': '置顶',
    'discussion.roleUser': 'user',
    'discussion.roleAdmin': 'admin',
    'discussion.roleRoot': 'root',
    'discussion.edit': '编辑讨论',
    'discussion.delete': '删除',
    'discussion.deleteConfirmTitle': '确认删除',
    'discussion.deleteConfirmBody': '确定要删除该讨论吗？此操作不可撤销。',
    'discussion.deleteSuccess': '删除成功',
    'discussion.deleteFailed': '删除失败：{msg}',
    'discussion.save': '保存',
    'discussion.saving': '保存中…',
    'discussion.saveSuccess': '保存成功',
    'discussion.saveFailed': '保存失败：{msg}',
    'discussion.loadDetailFailed': '无法获取讨论详情',
    'discussion.forceUpdate': '强制更新',
    'discussion.forceUpdateHint': '默认更新不会覆盖原作者，点赞数等信息，启用后会',
    'discussion.bindProblem': '绑定题目',
    'discussion.bindProblemPlaceholder': '选填，输入题目 ID（如 A001）',

    // ---- 创建团队 ----
    'group.createTitle': '创建团队',
    'group.name': '团队名称',
    'group.namePlaceholder': '不超过 10 个字符',
    'group.nameRequired': '请填写团队名称',
    'group.nameTooLong': '团队名称不超过 25 个字符',
    'group.shortName': '团队简称',
    'group.shortNamePlaceholder': '选填，不超过 10 个字符',
    'group.shortNameTooLong': '团队简称不超过 10 个字符',
    'group.brief': '团队简介',
    'group.briefPlaceholder': '选填，一句话概括（不超过 50 字）',
    'group.briefTooLong': '团队简介不超过 50 个字符',
    'group.description': '团队介绍',
    'group.descriptionPlaceholder': '支持 Markdown，可写团队规则、活动计划等',
    'group.descriptionRequired': '请填写团队介绍',
    'group.auth': '加入权限',
    'group.auth.public': '公开团队',
    'group.auth.publicTip': '加入无需申请',
    'group.auth.protected': '保护团队',
    'group.auth.protectedTip': '加入需要申请',
    'group.auth.private': '私有团队',
    'group.auth.privateTip': '需要邀请码才能申请',
    'group.inviteCode': '邀请码',
    'group.codePlaceholder': '私有团队可选填，用户申请时需提供',
    'group.visible': '公开可见',
    'group.visibleHint': '关闭后团队不会出现在团队列表中',
    'group.create': '创建',
    'group.creating': '创建中…',
    'group.createSuccess': '团队创建成功',
    'group.createFailed': '团队创建失败：{msg}',
    'group.visiblePublic': '公开',
    'group.visibleHidden': '隐藏',
    'group.visibleHintPublic': '团队将在团队列表中公开可见',
    'group.visibleHintHidden': '团队将从团队列表中隐藏，仅成员可通过链接访问',

    'better.vditor': 'Vditor',
    'better.vscode': 'VS Code 编辑器',
    'vscode.enable': '启用 VS Code 编辑器',
    'vscode.theme': '主题',
    'vscode.fontSize': '字体大小',
    'vscode.tabSize': 'Tab 长度',
    'vscode.openDialog': '打开编辑器设置',
    'vditor.publishOverride': '讨论发布覆盖',
    'vditor.editOverride': '讨论编辑覆盖',
    'vditor.groupCreateOverride': '创建团队覆盖',
    'vditor.uploadMode': '图片 / 文件上传',
    'vditor.uploadModeDisabled': '不启用',
    'vditor.uploadModeAdmin': '网站管理员',
    'vditor.uploadModeGroup': '团队管理员',
    'vditor.uploadGid': '团队 ID',
    'vditor.uploadImage': '上传图片',
    'vditor.uploadFile': '上传文件',
    'vditor.uploadDisabled': '未启用上传功能',
    'vditor.uploadNoGid': '请先在设置中填写团队 ID',
    'vditor.uploadFailed': '上传失败：{msg}',
    'vditor.uploadNoLink': '服务器未返回文件链接',

    'testjudge.runAll': '全部自测',
    'testjudge.running': '全部自测中…',
    'testjudge.progress': '进度 {done} / {total}',
    'testjudge.noSamples': '该题目没有可用的示例',
    'testjudge.noCode': '请先编写代码',
    'testjudge.noEditor': '未找到编辑器',
    'testjudge.noProblem': '题目信息尚未加载',
    'testjudge.submitFailed': '提交失败：{msg}',
    'testjudge.pollTimeout': '等待结果超时',
    'testjudge.result': '结果',
    'testjudge.time': '时间',
    'testjudge.memory': '内存',
    'testjudge.input': '输入',
    'testjudge.expected': '预期输出',
    'testjudge.actual': '实际输出',
    'testjudge.stderr': '错误输出',
    'testjudge.pending': '等待中',
    'testjudge.runningOne': '评测中',
    'testjudge.pass': '通过',
    'testjudge.fail': '失败',
    'testjudge.error': '错误',
    'testjudge.summary': '通过 {pass} / {total}',
    'testjudge.cancel': '停止',
    'testjudge.compileError': '编译错误，已停止后续测试',
    'testjudge.skipped': '已跳过',
    'testjudge.alertStopped': '已停止测试',
    'testjudge.alertCompileError': '编译错误，已停止后续测试',
    'testjudge.alertDetail': '已通过 {pass} / {total}（跑完 {done} 个）',

    'submit.chooseLang': '选择语言',
    'submit.noCode': '请先编写代码',
    'submit.submitting': '提交中…',
    'submit.success': '提交成功',
    'submit.failed': '提交失败：{msg}',

    'resubmit.success': '已发起重测',
    'resubmit.failed': '重测失败：{msg}',
  },

  'en-US': {
    'api.networkError': 'Network error: {msg}',
    'api.httpError': 'HTTP error: {code}',
    'api.jsonError': 'Response is not valid JSON',
    'api.bizError': 'Request failed ({code})',

    'panel.title': 'Better HOJ',
    'panel.importExport': 'Import / Export',
    'panel.close': 'Close',
    'panel.lang': 'Language',

    'better.title': 'Better HOJ 27 Settings by longStone',
    'better.login': 'Auto Login',
    'login.enable': 'Enable auto login',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.manual': 'Login now',
    'login.clear': 'Clear login state',

    'better.problemTools': 'Problem Tools',
    'fav.clear': 'Clear all favorites',
    'autosave.enable': 'Enable auto save',
    'autosave.interval': 'Interval',
    'autosave.15': '15 seconds',
    'autosave.30': '30 seconds',
    'autosave.60': '1 minute',
    'autosave.120': '2 minutes',
    'autosave.300': '5 minutes',
    'cph.realurl': 'CPH: Use real link (CF)',

    'better.redirect': 'Redirect',
    'redirect.enable': 'Enable redirect',
    'redirect.target': 'Redirect target',
    'redirect.host1': 'ssf.hdoi.cn (public)',
    'redirect.host2': 'oi.cnuschool.org.cn (intranet)',
    'redirect.host3': '172.16.21.199 (intranet IP)',

    'better.checkin': 'Daily Check-in',
    'checkin.enable': 'Enable check-in',
    'checkin.popup': 'Popup after check-in',
    'checkin.luck': "Today's fortune",
    'checkin.do': 'Check in',
    'checkin.refresh': 'Refresh',

    'better.tag': 'Personal Tag',
    'tag.text': 'Tag text',
    'tag.color': 'Tag color',
    'tag.refresh': 'Refresh cloud tag',
    'tag.push': 'Re-upload tag',
    'tag.delete': 'Delete cloud tag',

    'better.tools': 'Desktop Widgets',
    'tools.enable': 'Enable widgets',
    'tools.keystroke': 'Keystroke display',
    'tools.time': 'Usage time today',
    'tools.clock': 'Clock',

    'better.rec': 'Problem Recommend',
    'rec.cfname': 'Codeforces username',

    'better.navbar': 'Navbar',
    'navbar.config': 'Configure navbar layout',

    'better.snippet': 'Snippets',
    'snippet.hotkey': 'Panel hotkey',
    'snippet.manage': 'Manage snippets',
    'snippet.open': 'Open snippet panel',

    'better.about': 'About',
    'about.showVersion': 'Show version info',
    'about.version': 'Version',
    'perf.enable': 'Performance mode',
    'perf.hint': 'Disable dialog fade-out and background blur for smoother rendering on low-end devices',
    'about.copyVersionHint': 'Click to copy version info',
    'about.copied': 'Copied: {v}',
    'about.copyFailed': 'Copy failed',

    'panel.fullscreen': 'Fullscreen',

    'smart.title': 'Smart HOJ 27 Settings by OIerZhang',
    'smart.enable': 'Enable Smart HOJ',

    'smart.general': 'General',
    'general.smoothScroll': 'Smooth scroll',
    'general.smoothSwitch': 'Smooth page transitions',
    'general.dark': 'Dark mode',
    'general.mouseGlow': 'Mouse glow (requires reload)',
    'general.liquidGlass': 'Liquid Glass UI',
    'general.better404': 'Better 404 page',
    'general.hideNew': 'Hide "体验新版"',

    'smart.background': 'Background',
    'bg.source': 'Background source',
    'bg.builtin': 'Builtin background',
    'bg.custom': 'Custom background URL',

    'smart.card': 'Card',
    'card.bg': 'Card background',
    'card.blur': 'Card blur',
    'card.radius': 'Card radius',

    'smart.list': 'List',
    'list.bg': 'List background',
    'list.bgGreen': 'List green background',
    'list.bgHover': 'List hover',

    'smart.code': 'Code Block',
    'code.bg': 'Code background',
    'code.radius': 'Code radius',

    'smart.input': 'Input',
    'input.bg': 'Input background',
    'input.radius': 'Input radius',

    'smart.button': 'Button',
    'button.bg': 'Button background',
    'button.hover': 'Button hover',
    'button.active': 'Button active',
    'button.radius': 'Button radius',

    'smart.misc': 'Misc',
    'misc.tagRadius': 'Tag radius',
    'misc.tooltipBg': 'Tooltip background',
    'misc.tooltipRadius': 'Tooltip radius',
    'misc.judgeRadius': 'Judge block radius',

    'smart.text': 'Text',
    'text.dark': 'Dark text',
    'text.darkDisabled': 'Disabled text',
    'text.light': 'Light text',
    'text.blue': 'Blue text',
    'text.link': 'Link color',
    'text.select': 'Selection background',

    'smart.font': 'Font',
    'font.memorizing': 'Memorizing font',
    'font.sans': 'Sans-serif font',
    'font.mono': 'Mono font',

    'navbar.title': 'Navbar Layout',
    'navbar.hint': 'Drag to reorder, uncheck to hide. Changes take effect immediately.',
    'navbar.reset': 'Reset to default',
    'navbar.reset.confirm.title': 'Reset to default?',
    'navbar.reset.confirm.body': 'This will reset the order and visibility of the navbar.',
    'navbar.reset.confirm.ok': 'Confirm',
    'navbar.resetConfirm.title': 'Reset to default?',
    'navbar.resetConfirm.body': 'This will reset the order and visibility of the navbar.',

    'nav.item.logo': 'Logo',
    'nav.item.home': 'Home',
    'nav.item.problems': 'Problem',
    'nav.item.training': 'Training',
    'nav.item.contest': 'Contest',
    'nav.item.submission': 'Status',
    'nav.item.rank': 'Rank',
    'nav.item.discussion': 'Discussion',
    'nav.item.team': 'Group',
    'nav.item.about': 'About',
    'nav.item.newui': '体验新版',

    'dialog.tip': 'Notice',
    'dialog.confirm': 'OK',
    'dialog.cancel': 'Cancel',
    'dialog.close': 'Close',
    'dialog.warning': 'Warning',
    'dialog.error': 'Error',
    'dialog.success': 'Success',
    'dialog.info': 'Info',

    'action.delete': 'Delete',
    'action.remove': 'Remove',
    'action.add': 'Add',
    'action.edit': 'Edit',
    'action.save': 'Save',
    'action.ok': 'OK',
    'action.cancel': 'Cancel',
    'action.retry': 'Retry',
    'action.yes': 'Yes',
    'action.no': 'No',

    'login.autoSuccess': 'Auto-login successful, reloading…',
    'login.autoFailed': 'Auto-login failed, please sign in manually',
    'login.manualLogging': 'Signing in…',
    'login.clearConfirm': 'This will clear your current login state. Continue?',
    'login.cleared': 'Local login state cleared',

    'fav.clearConfirm.title': 'Confirm',
    'fav.clearConfirm.body': 'Clear all favorites?',
    'fav.cleared': 'All favorites cleared',
    'fav.added': 'Added to favorites: ',
    'fav.removed': 'Removed from favorites: ',

    'tag.refreshed': 'Refreshed: {name}',
    'tag.noRemote': 'No remote tag or request failed',
    'tag.needText': 'Please enter tag text first',
    'tag.uploaded': 'Tag uploaded',
    'tag.clearConfirm.title': 'Confirm deletion',
    'tag.clearConfirm.body': 'This will delete both the cloud record and the local config. Continue?',
    'tag.cleared': 'Tag cleared',
    'tag.clearFailed': 'Clear failed: {msg}',

    'checkin.disabled': 'Check-in is disabled',
    'checkin.queryFailed': 'Failed to query check-in status',
    'checkin.failed': 'Check-in failed, please try again later',
    'checkin.notChecked': 'Not checked in today',
    'checkin.alreadyChecked': 'Checked in today: {luck} — {result}',
    'checkin.resultTitle': 'Check-in successful',
    'checkin.alreadyTitle': 'Already checked in today',
    'checkin.acceptGoodLuck': 'Got it',

    'ie.importTitle': 'Import / Export',
    'ie.tabExport': 'Export',
    'ie.tabImport': 'Import',
    'ie.presetAll': 'All',
    'ie.presetSmart': 'Smart HOJ only',
    'ie.presetBetter': 'Better HOJ only',
    'ie.presetFavorites': 'Favorites only',
    'ie.presetSnippet': 'Snippets only',
    'ie.exportBtn': 'Export',
    'ie.importBtn': 'Import',
    'ie.pickFile': 'Choose file…',
    'ie.resetDefaults': 'Reset to defaults',
    'ie.backToPick': '← Choose another',
    'ie.selectAtLeastOne': 'Please select at least one item',
    'ie.importSuccess': 'Imported: {details}',
    'ie.exportSuccess': 'Exported: {details}',
    'ie.parseFailed': 'File parse failed: {msg}',
    'ie.noContent': 'No valid content in file',
    'ie.fileFormatError': 'Invalid file format',
    'ie.pickHint': 'Choose a JSON file exported by Better HOJ.',
    'ie.favorites': 'Favorites',
    'ie.snippets': 'Snippets',
    'ie.sensitiveHidden': 'Set (real value will be exported)',
    'ie.sensitiveEmpty': 'Not set',

    'ie.pickHintTitle': 'Choose a config file exported by Better HOJ.',
    'ie.pickHintDetail': 'Importing will overwrite the corresponding config items; favorites are merged by problem ID.',

    'ie.chosenFile': 'Selected: {name}',

    'ie.fileKindDefaults': 'Default config',
    'ie.fileKindSettings': 'Legacy settings file',
    'ie.fileKindFavorites': 'Favorites file',
    'ie.fileKindMixed': 'Settings + favorites file',
    'ie.fileKindUnknown': 'Unrecognized',

    'ie.versionOld': '⚠️ File is from an older version {v} (current {cur})',
    'ie.versionNew': '⚠️ File is from a newer version {v} (current {cur})',
    'ie.versionSame': '✔ Version matches ({cur})',
    'ie.versionMissing': 'File does not contain version info',
    'ie.ignoredCount': 'Ignored {n} unrecognized setting(s)',

    'ie.favCount': '{n} items',
    'ie.favCountNew': '{n} items ({added} new)',

    'ie.snippetMergeTip': 'Snippets will be merged: {exist} existing, {add} new, {upd} updated.',

    'ie.exportedSummary': 'Exported: {keys} config item(s){extra}',
    'ie.exportedExtraFav': ', {n} favorite(s)',

    'ie.importedSummary': 'Imported: {parts}',
    'ie.importedKeysPart': '{n} config item(s)',
    'ie.importedSnippetPart': 'snippets ({seg})',
    'ie.importedSnippetAdd': '{n} new',
    'ie.importedSnippetUpd': '{n} updated',
    'ie.importedFavPart': '{n} favorite(s) added',

    'snippet.applyFailed': 'No input position found',
    'snippet.inserted': 'Inserted: {name}',
    'snippet.nameRequired': 'Name is required',
    'snippet.contentRequired': 'Content is required',
    'snippet.hotkeyConflict': 'Hotkey conflicts with "{name}"',
    'snippet.hotkeyConflictPanel': 'Hotkey conflicts with the panel hotkey',
    'snippet.saved': 'Saved',
    'snippet.deleteConfirm': 'Delete snippet "{name}"?',

    'update.available': 'New version available',
    'update.current': 'Current version',
    'update.latest': 'Latest version',
    'update.date': 'Release date',
    'update.changelog': 'Changelog',
    'update.noChangelog': 'No changelog',
    'update.gotoDownload': 'Download',
    'update.later': 'Later',
    'update.urgent': '❌ Critical update. Please update as soon as possible.',
    'update.normal': '⚠️ A new version is available. We recommend updating.',

    'group.general': 'General',
    'group.background': 'Background',
    'group.card': 'Card',
    'group.list': 'List',
    'group.code': 'Code Block',
    'group.codeBlock': 'Code Block',
    'group.input': 'Input',
    'group.button': 'Button',
    'group.misc': 'Misc Styles',
    'group.text': 'Text Colors',
    'group.font': 'Font',
    'group.version': 'Version Info',
    'group.perf': 'Performance',
    'group.login': 'Login',
    'group.checkin': 'Check-in',
    'group.redirect': 'Redirect',
    'group.tag': 'Custom Tag',
    'group.cph': 'CPH',
    'group.tools': 'Widgets',
    'group.vscode': 'VS Code Editor',
    'group.recommend': 'Problem Recommend',
    'group.navbar': 'Navbar Layout',
    'group.snippet': 'Snippets',
    'group.other': 'Other',

    'checkin.btn': 'Check in',
    'checkin.btnDone': 'Checked in',
    'checkin.btnTitle': 'Daily check-in',

    'menu.openSettings': 'Better HOJ · Open settings',
    'menu.toggleDarkMode': 'Better HOJ · Toggle dark mode',
    'menu.darkOn': 'Dark mode enabled',
    'menu.darkOff': 'Dark mode disabled',
    'menu.toggleSmartHoj': 'Better HOJ · Toggle Smart HOJ master switch',
    'menu.smartOn': 'Smart HOJ enabled',
    'menu.smartOff': 'Smart HOJ disabled',
    'menu.openSnippetPanel': 'Better HOJ · Open snippet panel',
    'menu.manageSnippets': 'Better HOJ · Manage snippets',
    'menu.importExport': 'Better HOJ · Import / Export',
    'menu.togglePanelFullscreen': 'Better HOJ · Toggle settings panel fullscreen',

    'discussion.new': 'New Discussion',
    'discussion.category': 'Category',
    'discussion.title': 'Title',
    'discussion.titlePlaceholder': 'Enter a title',
    'discussion.content': 'Content',
    'discussion.contentPlaceholder': 'Markdown supported — code blocks, tables, formulas…',
    'discussion.publish': 'Publish',
    'discussion.publishing': 'Publishing…',
    'discussion.categoryRequired': 'Please select a category',
    'discussion.titleRequired': 'Please enter a title',
    'discussion.contentRequired': 'Please enter content',
    'discussion.publishSuccess': 'Published successfully',
    'discussion.publishFailed': 'Publish failed: {msg}',
    'discussion.loadCategoriesFailed': 'Failed to load discussion categories',
    'discussion.loadEditorFailed': 'Failed to load editor',
    'discussion.initEditorFailed': 'Failed to initialize editor',
    'discussion.editorNotReady': 'Editor is not ready',
    'discussion.description': 'Summary',
    'discussion.descriptionPlaceholder': 'One-line summary shown in the list',
    'discussion.descriptionRequired': 'Please enter a summary',
    'discussion.advanced': 'Advanced options',
    'discussion.advancedHint': 'Usually no need to change. Expand only for debugging.',
    'discussion.role': 'Role',
    'discussion.viewNum': 'Views',
    'discussion.likeNum': 'Likes',
    'discussion.commentNum': 'Comments',
    'discussion.topPriority': 'Pinned',
    'discussion.roleUser': 'user',
    'discussion.roleAdmin': 'admin',
    'discussion.roleRoot': 'root',
    'discussion.edit': 'Edit Discussion',
    'discussion.delete': 'Delete',
    'discussion.deleteConfirmTitle': 'Confirm delete',
    'discussion.deleteConfirmBody': 'Delete this discussion? This cannot be undone.',
    'discussion.deleteSuccess': 'Deleted',
    'discussion.deleteFailed': 'Delete failed: {msg}',
    'discussion.save': 'Save',
    'discussion.saving': 'Saving…',
    'discussion.saveSuccess': 'Saved successfully',
    'discussion.saveFailed': 'Save failed: {msg}',
    'discussion.loadDetailFailed': 'Failed to load discussion',
    'discussion.forceUpdate': 'ForceUpdate',
    'discussion.forceUpdateHint': 'Uses PUT by default; check to use POST (for debugging)',
    'discussion.bindProblem': 'Bind Problem',
    'discussion.bindProblemPlaceholder': 'Optional, problem ID (e.g. A001)',

    'group.createTitle': 'Create Group',
    'group.name': 'Group name',
    'group.namePlaceholder': 'Up to 10 characters',
    'group.nameRequired': 'Group name is required',
    'group.nameTooLong': 'Group name must be at most 25 characters',
    'group.shortName': 'Short name',
    'group.shortNamePlaceholder': 'Optional, up to 10 characters',
    'group.shortNameTooLong': 'Short name must be at most 10 characters',
    'group.brief': 'Summary',
    'group.briefPlaceholder': 'Optional, one-line summary (max 50 chars)',
    'group.briefTooLong': 'Summary must be at most 50 characters',
    'group.description': 'Description',
    'group.descriptionPlaceholder': 'Markdown supported — rules, plans, etc.',
    'group.descriptionRequired': 'Description is required',
    'group.auth': 'Join policy',
    'group.auth.public': 'Public',
    'group.auth.publicTip': 'Join without approval',
    'group.auth.protected': 'Protected',
    'group.auth.protectedTip': 'Approval required',
    'group.auth.private': 'Private',
    'group.auth.privateTip': 'Invite code required',
    'group.inviteCode': 'Invite code',
    'group.codePlaceholder': 'Optional for private groups',
    'group.visible': 'Publicly visible',
    'group.visibleHint': 'If off, the group is hidden from the group list',
    'group.create': 'Create',
    'group.creating': 'Creating…',
    'group.createSuccess': 'Group created',
    'group.createFailed': 'Group creation failed: {msg}',
    'group.visiblePublic': 'Public',
    'group.visibleHidden': 'Hidden',
    'group.visibleHintPublic': 'The group will be listed publicly',
    'group.visibleHintHidden': 'The group will be hidden from the list; only members can access via link',

    'better.vditor': 'Vditor',
    'better.vscode': 'VS Code Editor',
    'vscode.enable': 'Enable VS Code editor',
    'vscode.theme': 'Theme',
    'vscode.fontSize': 'Font size',
    'vscode.tabSize': 'Tab size',
    'vscode.openDialog': 'Open editor settings',
    'vditor.publishOverride': 'Override discussion publish',
    'vditor.editOverride': 'Override discussion edit',
    'vditor.groupCreateOverride': 'Override create group',
    'vditor.uploadMode': 'Image / File upload',
    'vditor.uploadModeDisabled': 'Disabled',
    'vditor.uploadModeAdmin': 'Site admin',
    'vditor.uploadModeGroup': 'Group admin',
    'vditor.uploadGid': 'Group ID',
    'vditor.uploadImage': 'Upload image',
    'vditor.uploadFile': 'Upload file',
    'vditor.uploadDisabled': 'Upload is not enabled',
    'vditor.uploadNoGid': 'Please set the group ID in settings first',
    'vditor.uploadFailed': 'Upload failed: {msg}',
    'vditor.uploadNoLink': 'Server returned no link',

    'testjudge.runAll': 'Test All',
    'testjudge.running': 'Running all tests…',
    'testjudge.progress': 'Progress {done} / {total}',
    'testjudge.noSamples': 'This problem has no samples',
    'testjudge.noCode': 'Please write some code first',
    'testjudge.noEditor': 'Editor not found',
    'testjudge.noProblem': 'Problem info not loaded',
    'testjudge.submitFailed': 'Submit failed: {msg}',
    'testjudge.pollTimeout': 'Timed out waiting for result',
    'testjudge.result': 'Result',
    'testjudge.time': 'Time',
    'testjudge.memory': 'Memory',
    'testjudge.input': 'Input',
    'testjudge.expected': 'Expected',
    'testjudge.actual': 'Actual',
    'testjudge.stderr': 'stderr',
    'testjudge.pending': 'Pending',
    'testjudge.runningOne': 'Running',
    'testjudge.pass': 'Pass',
    'testjudge.fail': 'Fail',
    'testjudge.error': 'Error',
    'testjudge.summary': '{pass} / {total} passed',
    'testjudge.cancel': 'Stop',
    'testjudge.compileError': 'Compile error — remaining tests stopped',
    'testjudge.skipped': 'Skipped',
    'testjudge.alertStopped': 'Testing stopped',
    'testjudge.alertCompileError': 'Compile error — remaining tests stopped',
    'testjudge.alertDetail': 'Passed {pass} / {total} ({done} tried)',

    'submit.chooseLang': 'Choose Language',
    'submit.noCode': 'Please write some code first',
    'submit.submitting': 'Submitting…',
    'submit.success': 'Submitted',
    'submit.failed': 'Submit failed: {msg}',

    'resubmit.success': 'Resubmit triggered',
    'resubmit.failed': 'Resubmit failed: {msg}',
  }
};

// ============================================================
// I18n Module
// ============================================================
const KEY = 'Web_Language';
const SUPPORTED = ['zh-CN', 'en-US'];
const DEFAULT_LANG = 'zh-CN';
const POLL_MS = 500;

const listeners = new Set();
let currentLang: string | null = null;
let pollTimer: number | null = null;

function normalizeLang(raw: string | null): string | null {
  if (typeof raw !== 'string') return null;
  let s = raw.trim();
  if (!s) return null;

  for (let i = 0; i < 2; i++) {
    if ((s.startsWith('"') && s.endsWith('"')) ||
        (s.startsWith("'") && s.endsWith("'"))) {
      s = s.slice(1, -1);
    }
  }
  s = s.trim();

  if (SUPPORTED.includes(s)) return s;

  const lower = s.toLowerCase();
  for (const lang of SUPPORTED) {
    if (lang.toLowerCase() === lower) return lang;
  }
  return null;
}

function readLang(): string {
  try {
    const v = localStorage.getItem(KEY);
    return normalizeLang(v) || DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function notify(lang: string): void {
  listeners.forEach(fn => {
    try { fn(lang); } catch (e) { console.warn('[i18n] listener error:', e); }
  });
}

function check(): void {
  const next = readLang();
  if (next !== currentLang) {
    currentLang = next;
    console.log('[i18n] 语言切换 →', next);
    notify(next);
  }
}

function start(): void {
  currentLang = readLang();
  console.log('[i18n] ' + currentLang);

  if (!pollTimer) pollTimer = window.setInterval(check, POLL_MS);

  window.addEventListener('storage', (e) => {
    if (e.key === KEY) check();
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) check();
  });
}

export const WebI18n = {
  start,
  get lang(): string { return currentLang || readLang(); },
  refresh: check,
  onChange(fn: (lang: string) => void): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  t(key: string, vars?: Record<string, string>): string {
    const lang = currentLang || readLang();
    let s = (I18N[lang] && I18N[lang][key])
      || (I18N[DEFAULT_LANG] && I18N[DEFAULT_LANG][key])
      || key;
    if (vars) {
      s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
    }
    return s;
  },
  apply(root?: Element | Document): void {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach(el => {
      (el as HTMLElement).textContent = this.t(el.getAttribute('data-i18n')!);
    });
    scope.querySelectorAll('[data-i18n-html]').forEach(el => {
      (el as HTMLElement).innerHTML = this.t(el.getAttribute('data-i18n-html')!);
    });
    scope.querySelectorAll('[data-i18n-ph]').forEach(el => {
      (el as HTMLInputElement).placeholder = this.t(el.getAttribute('data-i18n-ph')!);
    });
    scope.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.setAttribute('title', this.t(el.getAttribute('data-i18n-title')!));
    });
  }
};

export function t(key: string, vars?: Record<string, string>): string {
  return WebI18n.t(key, vars);
}

export function _i18nResolve(input: string | undefined | null): string {
  if (typeof input === 'string' && input.startsWith('@')) {
    return WebI18n.t(input.slice(1));
  }
  return input == null ? '' : String(input);
}
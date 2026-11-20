// ==UserScript==
// @name         Better HOJ
// @namespace    http://tampermonkey.net/
// @icon         https://docs.hdoi.cn/logo.png
// @version      27.3.7
// @description  优化了 HOJ。
// @author       longStone
// @license      CC BY-NC-SA
// @match        *://ssf.hdoi.cn/*
// @match        *://deeplearning.org.cn/*
// @match        *://oi.cnuschool.org.cn/*
// @match        *://172.16.21.199/*
// @match        *://vpn.cnuschool.org.cn/http/77726476706e69737468656265737421a1a013d2766626022f46d8f5c1/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @run-at       document-body
// @require      https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/highlight.js/11.9.0/highlight.min.js
// @resource     hoj-font-forgetica   https://db.onlinewebfonts.com/c/eb08ac6d35598e6ced424eb52373a55a?family=Sans+Forgetica+Regular
// @resource     hoj-font-google      https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=JetBrains+Mono&family=Fira+Code:wght@300..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap
// @connect      mirrors.sustech.edu.cn
// @connect      localhost
// @connect      127.0.0.1
// @connect      hojcode.rkcd.me
// @connect      hojtag.rkcd.me
// @connect      ssf.hdoi.cn
// @connect      172.16.21.199
// @connect      smart-hoj.is-great.org
// @connect      fonts.googleapis.com
// @connect      db.onlinewebfonts.com
// ==/UserScript==

/* ============================================================
 * 基础定义
 * ============================================================ */
/* ============================================================
 * i18n
 * ============================================================ */
const I18N = {
    'zh-CN': {
        'api.networkError': '网络错误：{msg}',
        'api.httpError':    'HTTP 错误：{code}',
        'api.jsonError':    '响应不是合法 JSON',
        'api.bizError':     '请求失败（{code}）',

        // ---- 面板头 ----
        'panel.title':      'Better HOJ',
        'panel.importExport': '导入导出',
        'panel.close':      '关闭',
        'panel.lang':       '语言',

        // ---- Better HOJ ----
        'better.title':     'Better HOJ 27 设置 by longStone',
        'better.login':     '自动登录',
        'login.enable':     '启用自动登录',
        'login.username':   '默认用户名',
        'login.password':   '默认密码',
        'login.manual':     '手动登录',
        'login.clear':      '清除登录状态',

        'better.problemTools': '题目工具',
        'fav.clear':        '清空所有收藏',
        'autosave.enable':  '启用自动保存',
        'autosave.interval':'保存频率',
        'autosave.15':      '15 秒',
        'autosave.30':      '30 秒',
        'autosave.60':      '1 分钟',
        'autosave.120':     '2 分钟',
        'autosave.300':     '5 分钟',
        'cph.realurl':      'CPH：使用真链接（CF）',

        'better.redirect':  '重定向',
        'redirect.enable':  '启用重定向',
        'redirect.target':  '重定向目标',
        'redirect.host1':   'ssf.hdoi.cn（外网）',
        'redirect.host2':   'oi.cnuschool.org.cn（内网）',
        'redirect.host3':   '172.16.21.199（内网 IP）',

        'better.checkin':   '每日签到',
        'checkin.enable':   '启用签到',
        'checkin.popup':    '签到后自动弹窗',
        'checkin.luck':     '今日运势',
        'checkin.do':       '立即签到',
        'checkin.refresh':  '刷新状态',

        'better.tag':       '个人标签',
        'tag.text':         '标签文字',
        'tag.color':        '标签颜色',
        'tag.refresh':      '刷新云端标签',
        'tag.push':         '重新上传当前标签',
        'tag.delete':       '清除云端标签',

        'better.tools':     '小组件',
        'tools.enable':     '启用小组件',
        'tools.keystroke':  '按键显示',
        'tools.time':       '今日使用时长',
        'tools.clock':      '时钟',

        'better.rec':       '题目推荐',
        'rec.cfname':       'Codeforces 用户名',

        'better.navbar':    '菜单栏',
        'navbar.config':    '配置菜单栏布局',

        'better.snippet':   '片段',
        'snippet.hotkey':   '唤出面板快捷键',
        'snippet.manage':   '管理片段',
        'snippet.open':     '打开片段面板',

        'better.about':     '关于',
        'about.showVersion':'显示版本信息',
        'about.version':    '版本',
        'about.copyVersionHint': '点击复制版本信息',
        'about.copied':          '已复制：{v}',
        'about.copyFailed':      '复制失败',

        'panel.fullscreen': '全屏显示',
        // ---- Smart HOJ ----
        'smart.title':      'Smart HOJ 27 设置 by OIerZhang',
        'smart.enable':     '启用 Smart HOJ',

        'smart.general':    '通用',
        'general.smoothScroll': '平滑滚动',
        'general.smoothSwitch': '平滑的页面过渡',
        'general.dark':     '深色模式',
        'general.mouseGlow':'鼠标光晕（需要重新加载）',
        'general.liquidGlass':'液态玻璃 UI',
        'general.better404':'更好的 404 页面',
        'general.hideNew':  '隐藏体验新版',

        'smart.background': '背景',
        'bg.source':        '内置背景来源',
        'bg.builtin':       '内置背景',
        'bg.custom':        '自定义背景 URL',

        'smart.card':       '卡片',
        'card.bg':          '卡片背景',
        'card.blur':        '卡片模糊',
        'card.radius':      '卡片圆角',

        'smart.list':       '列表',
        'list.bg':          '列表背景',
        'list.bgGreen':     '列表背景绿',
        'list.bgHover':     '列表 hover',

        'smart.code':       '代码块',
        'code.bg':          '代码块背景',
        'code.radius':      '代码块圆角',

        'smart.input':      '输入框',
        'input.bg':         '输入框背景',
        'input.radius':     '输入框圆角',

        'smart.button':     '按钮',
        'button.bg':        '按钮背景',
        'button.hover':     '按钮 hover',
        'button.active':    '按钮 active',
        'button.radius':    '按钮圆角',

        'smart.misc':       '其他',
        'misc.tagRadius':   'Tag 圆角',
        'misc.tooltipBg':   '提示框背景',
        'misc.tooltipRadius':'提示框圆角',
        'misc.judgeRadius': '评测色块圆角',

        'smart.text':       '文字',
        'text.dark':        '深色文字',
        'text.darkDisabled':'禁用文字',
        'text.light':       '浅色文字',
        'text.blue':        '蓝色文字',
        'text.link':        '链接颜色',
        'text.select':      '选中文字背景',

        'smart.font':       '字体',
        'font.memorizing':  '易于记忆的字体',
        'font.sans':        '无衬线字体',
        'font.mono':        '等宽字体',
        // ---- 菜单栏布局 ----
        'navbar.title':     '菜单栏布局',
        'navbar.hint':      '拖动行来调整顺序，勾选控制是否显示。改动实时生效。',
        'navbar.reset':     '恢复默认',
        'navbar.reset.confirm.title': '确认恢复默认？',
        'navbar.reset.confirm.body':  '将重置菜单栏的顺序与显示状态。',
        'navbar.reset.confirm.ok':    '确认',

        'nav.item.logo':       'Logo',
        'nav.item.home':       '首页',
        'nav.item.problems':   '题目',
        'nav.item.training':   '训练',
        'nav.item.contest':    '比赛',
        'nav.item.submission': '评测',
        'nav.item.rank':       '排名',
        'nav.item.discussion': '讨论',
        'nav.item.team':       '团队',
        'nav.item.about':      '关于',
        'nav.item.newui':      '体验新版',

        // ============ 通用对话框 ============
        'dialog.tip':       '提示',
        'dialog.confirm':   '确定',
        'dialog.cancel':    '取消',
        'dialog.close':     '关闭',
        'dialog.warning':   '警告',
        'dialog.error':     '错误',
        'dialog.success':   '成功',
        'dialog.info':      '信息',

        // ============ 通用动作 ============
        'action.delete':    '删除',
        'action.remove':    '移除',
        'action.add':       '添加',
        'action.edit':      '编辑',
        'action.save':      '保存',
        'action.ok':        '确定',
        'action.cancel':    '取消',
        'action.retry':     '重试',
        'action.yes':       '是',
        'action.no':        '否',

        // ============ 登录 ============
        'login.autoSuccess':    '已自动登录，页面将重新加载',
        'login.autoFailed':     '自动登录失败，请手动登录',
        'login.manualLogging':  '正在登录',
        'login.clearConfirm':   '将清除当前登录信息，是否继续？',
        'login.cleared':        '已清除本地登录态',

        // ============ 收藏 ============
        'fav.clearConfirm.title': '确认操作',
        'fav.clearConfirm.body':  '确定要清空所有收藏吗？',
        'fav.cleared':            '已清空所有收藏',
        'fav.added':              '已收藏：',
        'fav.removed':            '已取消收藏：',

        // ============ 标签 ============
        'tag.refreshed':        '已刷新：{name}',
        'tag.noRemote':         '云端无标签或请求失败',
        'tag.needText':         '请先填写标签文字',
        'tag.uploaded':         '已上传标签',
        'tag.clearConfirm.title': '确认清除',
        'tag.clearConfirm.body':  '将同时删除云端记录和本地配置，确定继续？',
        'tag.cleared':          '已清除标签',
        'tag.clearFailed':      '清除失败：{msg}',

        // ============ 签到 ============
        'checkin.disabled':     '签到功能已禁用',
        'checkin.queryFailed':  '查询签到状态失败',
        'checkin.failed':       '签到失败，请稍后再试',
        'checkin.notChecked':   '今日尚未签到',
        'checkin.alreadyChecked':'今日已签到：{luck} —— {result}',
        'checkin.resultTitle':  '签到成功',
        'checkin.alreadyTitle': '今日已签到',
        'checkin.acceptGoodLuck':'收下好运',

        // ============ 导入导出 ============
        'ie.importTitle':       '导入 / 导出',
        'ie.tabExport':         '导出',
        'ie.tabImport':         '导入',
        'ie.presetAll':         '全部',
        'ie.presetSmart':       '仅 Smart HOJ',
        'ie.presetBetter':      '仅 Better HOJ',
        'ie.presetFavorites':   '仅收藏',
        'ie.presetSnippet':     '仅代码片段',
        'ie.exportBtn':         '导出',
        'ie.importBtn':         '导入',
        'ie.pickFile':          '选择文件…',
        'ie.resetDefaults':     '恢复默认配置',
        'ie.backToPick':        '← 重新选择',
        'ie.selectAtLeastOne':  '请至少选择一项',
        'ie.importSuccess':     '已导入：{details}',
        'ie.exportSuccess':     '已导出：{details}',
        'ie.parseFailed':       '文件解析失败：{msg}',
        'ie.noContent':         '文件中没有可用的内容',
        'ie.fileFormatError':   '文件格式不正确',
        'ie.pickHint':          '选择一个由 Better HOJ 导出的 JSON 文件。',
        'ie.favorites':         '题目收藏',
        'ie.snippets':          '代码片段',
        'ie.sensitiveHidden': '已设置（导出时将包含原值）',
        'ie.sensitiveEmpty':  '未设置',

        // ============ 菜单栏布局 ============
        'navbar.resetConfirm.title': '确认恢复默认？',
        'navbar.resetConfirm.body':  '将重置菜单栏的顺序与显示状态。',

        // ============ 片段 ============
        'snippet.applyFailed':  '未找到输入位置',
        'snippet.inserted':     '已插入：{name}',
        'snippet.nameRequired':'请填写名称',
        'snippet.contentRequired':'请填写内容',
        'snippet.hotkeyConflict':'快捷键与「{name}」冲突',
        'snippet.hotkeyConflictPanel':'快捷键与「唤出面板」冲突',
        'snippet.saved':        '已保存',
        'snippet.deleteConfirm': '确定删除片段「{name}」？',

        // ============ 更新 ============
        'update.available':     '发现新版本',
        'update.current':       '当前版本',
        'update.latest':        '最新版本',
        'update.date':          '发布日期',
        'update.changelog':     '更新内容',
        'update.noChangelog':   '无更新日志',
        'update.gotoDownload':  '前往下载',
        'update.later':         '稍后再说',
        'update.urgent':        '❌ 重要更新，请尽快更新以获取最新功能与修复。',
        'update.normal':        '⚠️ 新版推出，建议尽快更新。',

        // ============ 导入 / 导出 ============
        'ie.pickHintTitle':     '选择一个由 Better HOJ 支持的配置文件。',
        'ie.pickHintDetail':    '导入会覆盖当前对应配置项；题目收藏会按题目 ID 去重合并。',

        'ie.chosenFile':        '已选择：{name}',

        'ie.fileKindDefaults':  '默认配置',
        'ie.fileKindSettings':  '旧版配置文件',
        'ie.fileKindFavorites': '收藏列表文件',
        'ie.fileKindMixed':     '新版配置文件',
        'ie.fileKindUnknown':   '无法识别',

        'ie.versionOld':        '⚠️ 该文件来自旧版本 {v}（当前 {cur}）',
        'ie.versionNew':        '⚠️ 该文件来自新版本 {v}（当前 {cur}）',
        'ie.versionSame':       '✔ 版本一致（{cur}）',
        'ie.versionMissing':    '该文件未包含版本信息',
        'ie.ignoredCount':      '忽略了 {n} 项无法识别的设置',

        'ie.favCount':          '{n} 条',
        'ie.favCountNew':       '{n} 条（新增 {added}）',

        'ie.snippetMergeTip':   '代码片段将合并导入：现有 {exist} 条，将新增 {add} 条、更新 {upd} 条。',

        'ie.exportedSummary':   '已导出：{keys} 项配置{extra}',
        'ie.exportedExtraFav':  '，{n} 条收藏',

        'ie.importedSummary':   '已导入：{parts}',
        'ie.importedKeysPart':  '{n} 项配置',
        'ie.importedSnippetPart':'代码片段（{seg}）',
        'ie.importedSnippetAdd':'新增 {n}',
        'ie.importedSnippetUpd':'更新 {n}',
        'ie.importedFavPart':   '新增 {n} 条收藏',

        'group.general':    '通用开关',
        'group.background': '背景',
        'group.card':       '卡片',
        'group.list':       '列表',
        'group.code':       '代码块',
        'group.input':      '输入框',
        'group.button':     '按钮',
        'group.misc':       '其他样式',
        'group.text':       '文字颜色',
        'group.font':       '字体',
        'group.version':    '版本信息',
        'group.login':      '登录',
        'group.checkin':    '签到',
        'group.redirect':   '重定向',
        'group.tag':        '自定义标签',
        'group.cph':        'CPH',
        'group.tools':      '小组件',
        'group.recommend':  '题目推荐',
        'group.navbar':     '菜单栏布局',
        'group.snippet':    '代码片段',
        'group.other':      '其他',

        'checkin.btn':      '签到',
        'checkin.btnDone':  '已签到',
        'checkin.btnTitle': '每日签到',

        // ============ 油猴菜单 ============
        'menu.openSettings':         'Better HOJ · 打开设置面板',
        'menu.toggleDarkMode':       'Better HOJ · 切换深色模式',
        'menu.darkOn':               '深色模式已开启',
        'menu.darkOff':              '深色模式已关闭',
        'menu.toggleSmartHoj':       'Better HOJ · 切换 Smart HOJ 总开关',
        'menu.smartOn':              'Smart HOJ 已启用',
        'menu.smartOff':             'Smart HOJ 已禁用',
        'menu.openSnippetPanel':     'Better HOJ · 打开片段面板',
        'menu.manageSnippets':       'Better HOJ · 管理片段',
        'menu.importExport':         'Better HOJ · 导入 / 导出',
        'menu.togglePanelFullscreen':'Better HOJ · 切换设置面板全屏',

        // ============ 讨论 ============
        'discussion.new':                '发布讨论',
        'discussion.category':           '分类',
        'discussion.title':              '标题',
        'discussion.titlePlaceholder':   '请输入标题',
        'discussion.content':            '内容',
        'discussion.contentPlaceholder': '支持 Markdown，可插入代码块、表格、公式…',
        'discussion.publish':            '发布',
        'discussion.publishing':         '发布中…',
        'discussion.categoryRequired':   '请选择分类',
        'discussion.titleRequired':      '请填写标题',
        'discussion.contentRequired':    '请填写内容',
        'discussion.publishSuccess':     '发布成功',
        'discussion.publishFailed':      '发布失败：{msg}',
        'discussion.loadCategoriesFailed':'无法获取讨论分类',
        'discussion.loadEditorFailed':   '编辑器加载失败，请检查网络',
        'discussion.initEditorFailed':   '编辑器初始化失败',
        'discussion.editorNotReady':     '编辑器尚未就绪',
        'discussion.description':           '简介',
        'discussion.descriptionPlaceholder':'一句话概括帖子内容（将显示在列表页）',
        'discussion.descriptionRequired':   '请填写简介',
        'discussion.advanced':              '高级选项',
        'discussion.advancedHint':          '以下字段通常不需要修改，如需调试再展开。',
        'discussion.role':                  '角色',
        'discussion.viewNum':               '浏览量',
        'discussion.likeNum':               '点赞数',
        'discussion.commentNum':            '评论数',
        'discussion.topPriority':           '置顶',
        'discussion.roleUser':              'user',
        'discussion.roleAdmin':             'admin',
        'discussion.roleRoot':              'root',
        'discussion.edit':           '编辑讨论',
        'discussion.delete':            '删除',
        'discussion.deleteConfirmTitle':'确认删除',
        'discussion.deleteConfirmBody': '确定要删除该讨论吗？此操作不可撤销。',
        'discussion.deleteSuccess':     '删除成功',
        'discussion.deleteFailed':      '删除失败：{msg}',
        'discussion.save':           '保存',
        'discussion.saving':         '保存中…',
        'discussion.saveSuccess':    '保存成功',
        'discussion.saveFailed':     '保存失败：{msg}',
        'discussion.loadDetailFailed':'无法获取讨论详情',
        'discussion.forceUpdate':    '强制更新',
        'discussion.forceUpdateHint':'默认更新不会覆盖原作者，点赞数等信息，启用后会',
        'discussion.bindProblem':            '绑定题目',
        'discussion.bindProblemPlaceholder': '选填，输入题目 ID（如 A001）',
        // ---- 创建团队 ----
        'group.createTitle':         '创建团队',
        'group.name':                '团队名称',
        'group.namePlaceholder':     '不超过 10 个字符',
        'group.nameRequired':        '请填写团队名称',
        'group.nameTooLong':         '团队名称不超过 25 个字符',
        'group.shortName':           '团队简称',
        'group.shortNamePlaceholder':'选填，不超过 10 个字符',
        'group.shortNameTooLong':    '团队简称不超过 10 个字符',
        'group.brief':               '团队简介',
        'group.briefPlaceholder':    '选填，一句话概括（不超过 50 字）',
        'group.briefTooLong':        '团队简介不超过 50 个字符',
        'group.description':         '团队介绍',
        'group.descriptionPlaceholder':'支持 Markdown，可写团队规则、活动计划等',
        'group.descriptionRequired': '请填写团队介绍',
        'group.auth':                '加入权限',
        'group.auth.public':         '公开团队',
        'group.auth.publicTip':      '加入无需申请',
        'group.auth.protected':      '保护团队',
        'group.auth.protectedTip':   '加入需要申请',
        'group.auth.private':        '私有团队',
        'group.auth.privateTip':     '需要邀请码才能申请',
        'group.code':                '邀请码',
        'group.codePlaceholder':     '私有团队可选填，用户申请时需提供',
        'group.visible':             '公开可见',
        'group.visibleHint':         '关闭后团队不会出现在团队列表中',
        'group.create':              '创建',
        'group.creating':            '创建中…',
        'group.createSuccess':       '团队创建成功',
        'group.visiblePublic':       '公开',
        'group.visibleHidden':       '隐藏',
        'group.visibleHintPublic':   '团队将在团队列表中公开可见',
        'group.visibleHintHidden':   '团队将从团队列表中隐藏，仅成员可通过链接访问',
        'better.vditor':            'Vditor',
        'vditor.publishOverride':   '讨论发布覆盖',
        'vditor.editOverride':      '讨论编辑覆盖',
        'vditor.groupCreateOverride': '创建团队覆盖',
        'vditor.uploadMode':         '图片 / 文件上传',
        'vditor.uploadModeDisabled': '不启用',
        'vditor.uploadModeAdmin':    '网站管理员',
        'vditor.uploadModeGroup':    '团队管理员',
        'vditor.uploadGid':          '团队 ID',
        'vditor.uploadImage':        '上传图片',
        'vditor.uploadFile':         '上传文件',
        'vditor.uploadDisabled':     '未启用上传功能',
        'vditor.uploadNoGid':        '请先在设置中填写团队 ID',
        'vditor.uploadFailed':       '上传失败：{msg}',
        'vditor.uploadNoLink':       '服务器未返回文件链接',

        'testjudge.runAll':       '全部自测',
        'testjudge.running':      '全部自测中…',
        'testjudge.progress':     '进度 {done} / {total}',
        'testjudge.noSamples':    '该题目没有可用的示例',
        'testjudge.noCode':       '请先编写代码',
        'testjudge.noEditor':     '未找到编辑器',
        'testjudge.noProblem':    '题目信息尚未加载',
        'testjudge.submitFailed': '提交失败：{msg}',
        'testjudge.pollTimeout':  '等待结果超时',
        'testjudge.result':       '结果',
        'testjudge.time':         '时间',
        'testjudge.memory':       '内存',
        'testjudge.input':        '输入',
        'testjudge.expected':     '预期输出',
        'testjudge.actual':       '实际输出',
        'testjudge.stderr':       '错误输出',
        'testjudge.pending':      '等待中',
        'testjudge.runningOne':   '评测中',
        'testjudge.pass':         '通过',
        'testjudge.fail':         '失败',
        'testjudge.error':        '错误',
        'testjudge.summary':      '通过 {pass} / {total}',
        'testjudge.cancel':       '停止',
        'testjudge.compileError': '编译错误，已停止后续测试',
        'testjudge.skipped':      '已跳过',
        'testjudge.alertStopped':       '已停止测试',
        'testjudge.alertCompileError':  '编译错误，已停止后续测试',
        'testjudge.alertDetail':        '已通过 {pass} / {total}（跑完 {done} 个）',

        'submit.chooseLang': '选择语言',
        'submit.noCode':     '请先编写代码',
        'submit.submitting': '提交中…',
        'submit.success':    '提交成功',
        'submit.failed':     '提交失败：{msg}',

        'resubmit.success':   '已发起重测',
        'resubmit.failed':    '重测失败：{msg}',
    },

    'en-US': {
        'api.networkError': 'Network error: {msg}',
        'api.httpError':    'HTTP error: {code}',
        'api.jsonError':    'Response is not valid JSON',
        'api.bizError':     'Request failed ({code})',

        'panel.title':      'Better HOJ',
        'panel.importExport':'Import / Export',
        'panel.close':      'Close',
        'panel.lang':       'Language',

        'better.title':     'Better HOJ 27 Settings by longStone',
        'better.login':     'Auto Login',
        'login.enable':     'Enable auto login',
        'login.username':   'Username',
        'login.password':   'Password',
        'login.manual':     'Login now',
        'login.clear':      'Clear login state',

        'better.problemTools': 'Problem Tools',
        'fav.clear':        'Clear all favorites',
        'autosave.enable':  'Enable auto save',
        'autosave.interval':'Interval',
        'autosave.15':      '15 seconds',
        'autosave.30':      '30 seconds',
        'autosave.60':      '1 minute',
        'autosave.120':     '2 minutes',
        'autosave.300':     '5 minutes',
        'cph.realurl':      'CPH: Use real link (CF)',

        'better.redirect':  'Redirect',
        'redirect.enable':  'Enable redirect',
        'redirect.target':  'Redirect target',
        'redirect.host1':   'ssf.hdoi.cn (public)',
        'redirect.host2':   'oi.cnuschool.org.cn (intranet)',
        'redirect.host3':   '172.16.21.199 (intranet IP)',

        'better.checkin':   'Daily Check-in',
        'checkin.enable':   'Enable check-in',
        'checkin.popup':    'Popup after check-in',
        'checkin.luck':     "Today's fortune",
        'checkin.do':       'Check in',
        'checkin.refresh':  'Refresh',

        'better.tag':       'Personal Tag',
        'tag.text':         'Tag text',
        'tag.color':        'Tag color',
        'tag.refresh':      'Refresh cloud tag',
        'tag.push':         'Re-upload tag',
        'tag.delete':       'Delete cloud tag',

        'better.tools':     'Desktop Widgets',
        'tools.enable':     'Enable widgets',
        'tools.keystroke':  'Keystroke display',
        'tools.time':       'Usage time today',
        'tools.clock':      'Clock',

        'better.rec':       'Problem Recommend',
        'rec.cfname':       'Codeforces username',

        'better.navbar':    'Navbar',
        'navbar.config':    'Configure navbar layout',

        'better.snippet':   'Snippets',
        'snippet.hotkey':   'Panel hotkey',
        'snippet.manage':   'Manage snippets',
        'snippet.open':     'Open snippet panel',

        'better.about':     'About',
        'about.showVersion':'Show version info',
        'about.version':    'Version',
        'about.copyVersionHint': 'Click to copy version info',
        'about.copied':          'Copied: {v}',
        'about.copyFailed':      'Copy failed',

        'panel.fullscreen': 'Fullscreen',

        'smart.title':      'Smart HOJ 27 Settings by OIerZhang',
        'smart.enable':     'Enable Smart HOJ',

        'smart.general':    'General',
        'general.smoothScroll': 'Smooth scroll',
        'general.smoothSwitch': 'Smooth page transitions',
        'general.dark':     'Dark mode',
        'general.mouseGlow':'Mouse glow (requires reload)',
        'general.liquidGlass':'Liquid Glass UI',
        'general.better404':'Better 404 page',
        'general.hideNew':  'Hide "体验新版"',

        'smart.background': 'Background',
        'bg.source':        'Background source',
        'bg.builtin':       'Builtin background',
        'bg.custom':        'Custom background URL',

        'smart.card':       'Card',
        'card.bg':          'Card background',
        'card.blur':        'Card blur',
        'card.radius':      'Card radius',

        'smart.list':       'List',
        'list.bg':          'List background',
        'list.bgGreen':     'List green background',
        'list.bgHover':     'List hover',

        'smart.code':       'Code Block',
        'code.bg':          'Code background',
        'code.radius':      'Code radius',

        'smart.input':      'Input',
        'input.bg':         'Input background',
        'input.radius':     'Input radius',

        'smart.button':     'Button',
        'button.bg':        'Button background',
        'button.hover':     'Button hover',
        'button.active':    'Button active',
        'button.radius':    'Button radius',

        'smart.misc':       'Misc',
        'misc.tagRadius':   'Tag radius',
        'misc.tooltipBg':   'Tooltip background',
        'misc.tooltipRadius':'Tooltip radius',
        'misc.judgeRadius': 'Judge block radius',

        'smart.text':       'Text',
        'text.dark':        'Dark text',
        'text.darkDisabled':'Disabled text',
        'text.light':       'Light text',
        'text.blue':        'Blue text',
        'text.link':        'Link color',
        'text.select':      'Selection background',

        'smart.font':       'Font',
        'font.memorizing':  'Memorizing font',
        'font.sans':        'Sans-serif font',
        'font.mono':        'Mono font',

        'navbar.title':     'Navbar Layout',
        'navbar.hint':      'Drag to reorder, uncheck to hide. Changes take effect immediately.',
        'navbar.reset':     'Reset to default',
        'navbar.reset.confirm.title': 'Reset to default?',
        'navbar.reset.confirm.body':  'This will reset the order and visibility of the navbar.',
        'navbar.reset.confirm.ok':    'Confirm',

        'nav.item.logo':       'Logo',
        'nav.item.home':       'Home',
        'nav.item.problems':   'Problem',
        'nav.item.training':   'Training',
        'nav.item.contest':    'Contest',
        'nav.item.submission': 'Status',
        'nav.item.rank':       'Rank',
        'nav.item.discussion': 'Discussion',
        'nav.item.team':       'Group',
        'nav.item.about':      'About',
        'nav.item.newui':      '体验新版', // 是的，我们不需要英文

        'dialog.tip':       'Notice',
        'dialog.confirm':   'OK',
        'dialog.cancel':    'Cancel',
        'dialog.close':     'Close',
        'dialog.warning':   'Warning',
        'dialog.error':     'Error',
        'dialog.success':   'Success',
        'dialog.info':      'Info',

        'action.delete':    'Delete',
        'action.remove':    'Remove',
        'action.add':       'Add',
        'action.edit':      'Edit',
        'action.save':      'Save',
        'action.ok':        'OK',
        'action.cancel':    'Cancel',
        'action.retry':     'Retry',
        'action.yes':       'Yes',
        'action.no':        'No',

        'login.autoSuccess':    'Auto-login successful, reloading…',
        'login.autoFailed':     'Auto-login failed, please sign in manually',
        'login.manualLogging':  'Signing in…',
        'login.clearConfirm':   'This will clear your current login state. Continue?',
        'login.cleared':        'Local login state cleared',

        'fav.clearConfirm.title': 'Confirm',
        'fav.clearConfirm.body':  'Clear all favorites?',
        'fav.cleared':            'All favorites cleared',
        'fav.added':              'Added to favorites: ',
        'fav.removed':            'Removed from favorites: ',

        'tag.refreshed':        'Refreshed: {name}',
        'tag.noRemote':         'No remote tag or request failed',
        'tag.needText':         'Please enter tag text first',
        'tag.uploaded':         'Tag uploaded',
        'tag.clearConfirm.title': 'Confirm deletion',
        'tag.clearConfirm.body':  'This will delete both the cloud record and the local config. Continue?',
        'tag.cleared':          'Tag cleared',
        'tag.clearFailed':      'Clear failed: {msg}',

        'checkin.disabled':     'Check-in is disabled',
        'checkin.queryFailed':  'Failed to query check-in status',
        'checkin.failed':       'Check-in failed, please try again later',
        'checkin.notChecked':   'Not checked in today',
        'checkin.alreadyChecked':'Checked in today: {luck} — {result}',
        'checkin.resultTitle':  'Check-in successful',
        'checkin.alreadyTitle': 'Already checked in today',
        'checkin.acceptGoodLuck':'Got it',

        'ie.importTitle':       'Import / Export',
        'ie.tabExport':         'Export',
        'ie.tabImport':         'Import',
        'ie.presetAll':         'All',
        'ie.presetSmart':       'Smart HOJ only',
        'ie.presetBetter':      'Better HOJ only',
        'ie.presetFavorites':   'Favorites only',
        'ie.presetSnippet':     'Snippets only',
        'ie.exportBtn':         'Export',
        'ie.importBtn':         'Import',
        'ie.pickFile':          'Choose file…',
        'ie.resetDefaults':     'Reset to defaults',
        'ie.backToPick':        '← Choose another',
        'ie.selectAtLeastOne':  'Please select at least one item',
        'ie.importSuccess':     'Imported: {details}',
        'ie.exportSuccess':     'Exported: {details}',
        'ie.parseFailed':       'File parse failed: {msg}',
        'ie.noContent':         'No valid content in file',
        'ie.fileFormatError':   'Invalid file format',
        'ie.pickHint':          'Choose a JSON file exported by Better HOJ.',
        'ie.favorites':         'Favorites',
        'ie.snippets':          'Snippets',
        'ie.sensitiveHidden': 'Set (real value will be exported)',
        'ie.sensitiveEmpty':  'Not set',

        'navbar.resetConfirm.title': 'Reset to default?',
        'navbar.resetConfirm.body':  'This will reset the order and visibility of the navbar.',

        'snippet.applyFailed':  'No input position found',
        'snippet.inserted':     'Inserted: {name}',
        'snippet.nameRequired':'Name is required',
        'snippet.contentRequired':'Content is required',
        'snippet.hotkeyConflict':'Hotkey conflicts with "{name}"',
        'snippet.hotkeyConflictPanel':'Hotkey conflicts with the panel hotkey',
        'snippet.saved':        'Saved',
        'snippet.deleteConfirm': 'Delete snippet "{name}"?',

        'update.available':     'New version available',
        'update.current':       'Current version',
        'update.latest':        'Latest version',
        'update.date':          'Release date',
        'update.changelog':     'Changelog',
        'update.noChangelog':   'No changelog',
        'update.gotoDownload':  'Download',
        'update.later':         'Later',
        'update.urgent':        '❌ Critical update. Please update as soon as possible.',
        'update.normal':        '⚠️ A new version is available. We recommend updating.',

        'ie.pickHintTitle':     'Choose a config file exported by Better HOJ.',
        'ie.pickHintDetail':    'Importing will overwrite the corresponding config items; favorites are merged by problem ID.',

        'ie.chosenFile':        'Selected: {name}',

        'ie.fileKindDefaults':  'Default config',
        'ie.fileKindSettings':  'Legacy settings file',
        'ie.fileKindFavorites': 'Favorites file',
        'ie.fileKindMixed':     'Settings + favorites file',
        'ie.fileKindUnknown':   'Unrecognized',

        'ie.versionOld':        '⚠️ File is from an older version {v} (current {cur})',
        'ie.versionNew':        '⚠️ File is from a newer version {v} (current {cur})',
        'ie.versionSame':       '✔ Version matches ({cur})',
        'ie.versionMissing':    'File does not contain version info',
        'ie.ignoredCount':      'Ignored {n} unrecognized setting(s)',

        'ie.favCount':          '{n} items',
        'ie.favCountNew':       '{n} items ({added} new)',

        'ie.snippetMergeTip':   'Snippets will be merged: {exist} existing, {add} new, {upd} updated.',

        'ie.exportedSummary':   'Exported: {keys} config item(s){extra}',
        'ie.exportedExtraFav':  ', {n} favorite(s)',

        'ie.importedSummary':   'Imported: {parts}',
        'ie.importedKeysPart':  '{n} config item(s)',
        'ie.importedSnippetPart':'snippets ({seg})',
        'ie.importedSnippetAdd':'{n} new',
        'ie.importedSnippetUpd':'{n} updated',
        'ie.importedFavPart':   '{n} favorite(s) added',

        'group.general':    'General',
        'group.background': 'Background',
        'group.card':       'Card',
        'group.list':       'List',
        'group.code':       'Code Block',
        'group.input':      'Input',
        'group.button':     'Button',
        'group.misc':       'Misc Styles',
        'group.text':       'Text Colors',
        'group.font':       'Font',
        'group.version':    'Version Info',
        'group.login':      'Login',
        'group.checkin':    'Check-in',
        'group.redirect':   'Redirect',
        'group.tag':        'Custom Tag',
        'group.cph':        'CPH',
        'group.tools':      'Widgets',
        'group.recommend':  'Problem Recommend',
        'group.navbar':     'Navbar Layout',
        'group.snippet':    'Snippets',
        'group.other':      'Other',

        'checkin.btn':      'Check in',
        'checkin.btnDone':  'Checked in',
        'checkin.btnTitle': 'Daily check-in',

        'menu.openSettings':         'Better HOJ · Open settings',
        'menu.toggleDarkMode':       'Better HOJ · Toggle dark mode',
        'menu.darkOn':               'Dark mode enabled',
        'menu.darkOff':              'Dark mode disabled',
        'menu.toggleSmartHoj':       'Better HOJ · Toggle Smart HOJ master switch',
        'menu.smartOn':              'Smart HOJ enabled',
        'menu.smartOff':             'Smart HOJ disabled',
        'menu.openSnippetPanel':     'Better HOJ · Open snippet panel',
        'menu.manageSnippets':       'Better HOJ · Manage snippets',
        'menu.importExport':         'Better HOJ · Import / Export',
        'menu.togglePanelFullscreen':'Better HOJ · Toggle settings panel fullscreen',

        'discussion.new':                'New Discussion',
        'discussion.category':           'Category',
        'discussion.title':              'Title',
        'discussion.titlePlaceholder':   'Enter a title',
        'discussion.content':            'Content',
        'discussion.contentPlaceholder': 'Markdown supported — code blocks, tables, formulas…',
        'discussion.publish':            'Publish',
        'discussion.publishing':         'Publishing…',
        'discussion.categoryRequired':   'Please select a category',
        'discussion.titleRequired':      'Please enter a title',
        'discussion.contentRequired':    'Please enter content',
        'discussion.publishSuccess':     'Published successfully',
        'discussion.publishFailed':      'Publish failed: {msg}',
        'discussion.loadCategoriesFailed':'Failed to load discussion categories',
        'discussion.loadEditorFailed':   'Failed to load editor',
        'discussion.initEditorFailed':   'Failed to initialize editor',
        'discussion.editorNotReady':     'Editor is not ready',
        'discussion.description':           'Summary',
        'discussion.descriptionPlaceholder':'One-line summary shown in the list',
        'discussion.descriptionRequired':   'Please enter a summary',
        'discussion.advanced':              'Advanced options',
        'discussion.advancedHint':          'Usually no need to change. Expand only for debugging.',
        'discussion.role':                  'Role',
        'discussion.viewNum':               'Views',
        'discussion.likeNum':               'Likes',
        'discussion.commentNum':            'Comments',
        'discussion.topPriority':           'Pinned',
        'discussion.roleUser':              'user',
        'discussion.roleAdmin':             'admin',
        'discussion.roleRoot':              'root',
        'discussion.edit':           'Edit Discussion',
        'discussion.save':           'Save',
        'discussion.saving':         'Saving…',
        'discussion.saveSuccess':    'Saved successfully',
        'discussion.saveFailed':     'Save failed: {msg}',
        'discussion.loadDetailFailed':'Failed to load discussion',
        'discussion.forceUpdate':    'ForceUpdate',
        'discussion.forceUpdateHint':'Uses PUT by default; check to use POST (for debugging)',
        'discussion.bindProblem':            'Bind Problem',
        'discussion.bindProblemPlaceholder': 'Optional, problem ID (e.g. A001)',
        'discussion.delete':            'Delete',
        'discussion.deleteConfirmTitle':'Confirm delete',
        'discussion.deleteConfirmBody': 'Delete this discussion? This cannot be undone.',
        'discussion.deleteSuccess':     'Deleted',
        'discussion.deleteFailed':      'Delete failed: {msg}',
        'group.createTitle':         'Create Group',
        'group.name':                'Group name',
        'group.namePlaceholder':     'Up to 10 characters',
        'group.nameRequired':        'Group name is required',
        'group.nameTooLong':         'Group name must be at most 25 characters',
        'group.shortName':           'Short name',
        'group.shortNamePlaceholder':'Optional, up to 10 characters',
        'group.shortNameTooLong':    'Short name must be at most 10 characters',
        'group.brief':               'Summary',
        'group.briefPlaceholder':    'Optional, one-line summary (max 50 chars)',
        'group.briefTooLong':        'Summary must be at most 50 characters',
        'group.description':         'Description',
        'group.descriptionPlaceholder':'Markdown supported — rules, plans, etc.',
        'group.descriptionRequired': 'Description is required',
        'group.auth':                'Join policy',
        'group.auth.public':         'Public',
        'group.auth.publicTip':      'Join without approval',
        'group.auth.protected':      'Protected',
        'group.auth.protectedTip':   'Approval required',
        'group.auth.private':        'Private',
        'group.auth.privateTip':     'Invite code required',
        'group.code':                'Invite code',
        'group.codePlaceholder':     'Optional for private groups',
        'group.visible':             'Publicly visible',
        'group.visibleHint':         'If off, the group is hidden from the group list',
        'group.create':              'Create',
        'group.creating':            'Creating…',
        'group.createSuccess':       'Group created',
        'group.visiblePublic':       'Public',
        'group.visibleHidden':       'Hidden',
        'group.visibleHintPublic':   'The group will be listed publicly',
        'group.visibleHintHidden':   'The group will be hidden from the list; only members can access via link',
        'better.vditor':            'Vditor',
        'vditor.publishOverride':   'Override discussion publish',
        'vditor.editOverride':      'Override discussion edit',
        'vditor.groupCreateOverride': 'Override create group',
        'vditor.uploadMode':         'Image / File upload',
        'vditor.uploadModeDisabled': 'Disabled',
        'vditor.uploadModeAdmin':    'Site admin',
        'vditor.uploadModeGroup':    'Group admin',
        'vditor.uploadGid':          'Group ID',
        'vditor.uploadImage':        'Upload image',
        'vditor.uploadFile':         'Upload file',
        'vditor.uploadDisabled':     'Upload is not enabled',
        'vditor.uploadNoGid':        'Please set the group ID in settings first',
        'vditor.uploadFailed':       'Upload failed: {msg}',
        'vditor.uploadNoLink':       'Server returned no link',

        'testjudge.runAll':       'Test All',
        'testjudge.running':      'Running all tests…',
        'testjudge.progress':     'Progress {done} / {total}',
        'testjudge.noSamples':    'This problem has no samples',
        'testjudge.noCode':       'Please write some code first',
        'testjudge.noEditor':     'Editor not found',
        'testjudge.noProblem':    'Problem info not loaded',
        'testjudge.submitFailed': 'Submit failed: {msg}',
        'testjudge.pollTimeout':  'Timed out waiting for result',
        'testjudge.result':       'Result',
        'testjudge.time':         'Time',
        'testjudge.memory':       'Memory',
        'testjudge.input':        'Input',
        'testjudge.expected':     'Expected',
        'testjudge.actual':       'Actual',
        'testjudge.stderr':       'stderr',
        'testjudge.pending':      'Pending',
        'testjudge.runningOne':   'Running',
        'testjudge.pass':         'Pass',
        'testjudge.fail':         'Fail',
        'testjudge.error':        'Error',
        'testjudge.summary':      '{pass} / {total} passed',
        'testjudge.cancel':       'Stop',
        'testjudge.compileError': 'Compile error — remaining tests stopped',
        'testjudge.skipped':      'Skipped',
        'testjudge.alertStopped':       'Testing stopped',
        'testjudge.alertCompileError':  'Compile error — remaining tests stopped',
        'testjudge.alertDetail':        'Passed {pass} / {total} ({done} tried)',

        'submit.chooseLang': 'Choose Language',
        'submit.noCode':     'Please write some code first',
        'submit.submitting': 'Submitting…',
        'submit.success':    'Submitted',
        'submit.failed':     'Submit failed: {msg}',

        'resubmit.success':   'Resubmit triggered',
        'resubmit.failed':    'Resubmit failed: {msg}',
    }
};
/* ============================================================
 * i18n 模块
 * 对外接口：i18n.t(key) / i18n.apply(root) / i18n.onChange(fn) / i18n.lang
 * ============================================================ */
const WebI18n = (() => {
    const KEY = 'Web_Language';
    const SUPPORTED = ['zh-CN', 'en-US'];
    const DEFAULT_LANG = 'zh-CN';
    const POLL_MS = 500;   // 轮询间隔；localStorage.getItem 极轻，500ms 开销可忽略

    const listeners = new Set();
    let currentLang = null;
    let pollTimer = null;

    /** 归一化：兼容 `en-US`、`"en-US"`、`'en-US'`、带空白等形式 */
    function normalizeLang(raw) {
        if (typeof raw !== 'string') return null;
        let s = raw.trim();
        if (!s) return null;

        // 反复剥引号（有些框架会双重序列化）
        for (let i = 0; i < 2; i++) {
            if ((s.startsWith('"') && s.endsWith('"')) ||
                (s.startsWith("'") && s.endsWith("'"))) {
                s = s.slice(1, -1);
            }
        }
        s = s.trim();

        if (SUPPORTED.includes(s)) return s;

        // 大小写容错：EN-us → en-US
        const lower = s.toLowerCase();
        for (const lang of SUPPORTED) {
            if (lang.toLowerCase() === lower) return lang;
        }
        return null;
    }

    function readLang() {
        try {
            const v = localStorage.getItem(KEY);
            return normalizeLang(v) || DEFAULT_LANG;
        } catch (_) {
            return DEFAULT_LANG;
        }
    }
    function notify(lang) {
        listeners.forEach(fn => {
            try { fn(lang); } catch (e) { console.warn('[i18n] listener error:', e); }
        });
    }

    function check() {
        const next = readLang();
        if (next !== currentLang) {
            currentLang = next;
            console.log('[i18n] 语言切换 →', next);
            notify(next);
        }
    }

    function start() {
        currentLang = readLang();
        console.log('[i18n] ' + currentLang);
        // 同标签页：轮询
        if (!pollTimer) pollTimer = setInterval(check, POLL_MS);

        // 跨标签页
        window.addEventListener('storage', (e) => {
            if (e.key === KEY) check();
        });

        // 从其他标签页切回来时立刻检查一次
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) check();
        });
    }

    return {
        start,
        get lang() { return currentLang || readLang(); },
        /** 手动触发一次检查（比如页面导航后） */
        refresh: check,
        /** 订阅语言变化；返回取消订阅函数 */
        onChange(fn) {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },
        /** 取翻译；支持 {name} 形式的变量替换 */
        t(key, vars) {
            const lang = currentLang || readLang();
            let s = (I18N[lang] && I18N[lang][key])
            || (I18N[DEFAULT_LANG] && I18N[DEFAULT_LANG][key])
            || key;
            if (vars) {
                s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
            }
            return s;
        },
        /**
         * 把 i18n 应用到 DOM 子树
         * 支持属性：
         *   data-i18n          → textContent
         *   data-i18n-html     → innerHTML（内容需自行确保安全）
         *   data-i18n-ph       → placeholder
         *   data-i18n-title    → title
         */
        apply(root) {
            const scope = root || document;
            scope.querySelectorAll('[data-i18n]').forEach(el => {
                el.textContent = this.t(el.dataset.i18n);
            });
            scope.querySelectorAll('[data-i18n-html]').forEach(el => {
                el.innerHTML = this.t(el.dataset.i18nHtml);
            });
            scope.querySelectorAll('[data-i18n-ph]').forEach(el => {
                el.placeholder = this.t(el.dataset.i18nPh);
            });
            scope.querySelectorAll('[data-i18n-title]').forEach(el => {
                el.title = this.t(el.dataset.i18nTitle);
            });
        }
    };
})();

/** 便捷别名，脚本里任何地方都可以直接用 */
function t(key, vars) { return WebI18n.t(key, vars); }
/**
 * 解析文本：如果字符串以 `@` 开头则视为 i18n key，自动翻译
 * @param {string|undefined|null} input
 * @returns {string}
 */
function _i18nResolve(input) {
    if (typeof input === 'string' && input.startsWith('@')) {
        return WebI18n.t(input.slice(1));
    }
    return input == null ? '' : String(input);
}
/* ============================================================
 * 通用 API 请求
 * 约定：
 *   - HTTP 非 200 → 直接 NewAlert 后抛错
 *   - JSON.status ≠ 200 → NewAlert(msg, 'error') 后抛错
 *   - 成功 → 返回 data
 * ============================================================ */
/**
 * @param {string}  url            完整路径或相对路径
 * @param {object}  [opts]
 * @param {string}  [opts.method]  默认 'GET'
 * @param {object}  [opts.body]    JSON 序列化后作为 body
 * @param {object}  [opts.headers] 额外请求头
 * @param {boolean} [opts.silent]  为 true 时不弹 Alert（调用方自己处理）
 * @param {boolean} [opts.raw]     为 true 时返回完整 JSON（含 status/msg）
 * @returns {Promise<any>}         默认返回 data；raw=true 时返回整个响应
 */
async function hojApi(url, opts = {}) {
    const {
        method = 'GET',
        body   = undefined,
        headers = {},
        silent = false,
        raw    = false
    } = opts;

    const fullUrl = /^https?:\/\//i.test(url)
    ? url
    : `${window.location.origin}${url}`;

    const token = localStorage.getItem('token') || '';
    const init = {
        method,
        headers: {
            'Authorization': token,
            ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
            ...headers
        },
        credentials: 'include'
    };
    if (body !== undefined) init.body = JSON.stringify(body);

    let resp;
    try {
        resp = await fetch(fullUrl, init);
    } catch (e) {
        if (!silent) NewAlert(WebI18n.t('api.networkError', { msg: e.message }), 'error');
        throw e;
    }

    /* ---- HTTP 状态 ---- */
    if (resp.status !== 200) {
        const msg = WebI18n.t('api.httpError', { code: resp.status });
        if (!silent) NewAlert(msg, 'error');
        const err = new Error(msg);
        err.httpStatus = resp.status;
        throw err;
    }

    /* ---- 解析 JSON ---- */
    let data;
    try {
        data = await resp.json();
    } catch (e) {
        const msg = WebI18n.t('api.jsonError');
        if (!silent) NewAlert(msg, 'error');
        const err = new Error(msg);
        err.cause = e;
        throw err;
    }

    /* ---- 业务状态 ---- */
    const bizStatus = data && typeof data.status !== 'undefined' ? data.status : 200;
    if (bizStatus !== 200) {
        const msg = data?.msg || data?.message || WebI18n.t('api.bizError', { code: bizStatus });
        if (!silent) NewAlert(msg, 'error');
        const err = new Error(msg);
        err.bizStatus = bizStatus;
        err.response = data;
        throw err;
    }

    return raw ? data : (data ? data.data : null);
}
/**
 * 通用消息提示，替代 alert()
 * @param {string} message  显示的消息内容
 * @param {'success'|'error'|'warning'|'info'} [type='success']  消息类型
 * @param {number} [duration=2500]  显示时长（毫秒），设为 0 则不自动关闭
 */
function NewAlert(message, type = 'success', duration = 2500) {
    let container = document.getElementById('hoj-alert-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'hoj-alert-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 2147483640;
            display: flex;
            flex-direction: column;
            gap: 8px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    const msg = document.createElement('div');
    msg.className = `m-message m-message--${type}`;
    msg.style.cssText = `
        pointer-events: auto;
        min-width: 220px;
        max-width: 360px;
        animation: hojAlertIn .25s ease-out;
    `;
    msg.innerHTML = `
        <div class="m-message-content">
            <div class="m-message--description"></div>
        </div>
        <div class="m-message--control">
            <i class="m-message--close el-icon-close" style="cursor:pointer;"></i>
        </div>
    `;
    // 用 _i18nResolve 替代 String(message)
    msg.querySelector('.m-message--description').textContent = _i18nResolve(message);

    let closed = false;
    const remove = () => {
        if (closed) return;
        closed = true;
        msg.style.animation = 'hojAlertOut .2s ease-in forwards';
        setTimeout(() => msg.remove(), 300);
    };
    msg.querySelector('.m-message--close').addEventListener('click', remove);

    container.appendChild(msg);

    if (duration > 0) setTimeout(remove, duration);

    return remove;
}
// 动画 & 基础样式（只需注入一次）
(function injectAlertStyle() {
    if (document.getElementById('hoj-alert-style')) return;
    const style = document.createElement('style');
    style.id = 'hoj-alert-style';
    style.textContent = `
        @keyframes hojAlertIn {
            from { opacity: 0; transform: translateX(20px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes hojAlertOut {
            from { opacity: 1; transform: translateX(0); }
            to   { opacity: 0; transform: translateX(20px); }
        }

        /* ============ 基础（浅色） ============ */
        #hoj-alert-container .m-message {
            display: flex;
            align-items: center;
            padding: 10px 14px;
            border-radius: 8px;
            background: #FFFFFF;
            box-shadow: 0 2px 12px rgba(0,0,0,.15);
            font-size: 13px;
            color: #24292E !important;
            font-family: var(--hoj-sans-font, "Noto Sans SC", sans-serif);
        }
        #hoj-alert-container .m-message--description {
            color: inherit !important;
        }
        #hoj-alert-container .m-message--description {
            line-height: 1.4;
            word-break: break-all;
        }
        #hoj-alert-container .m-message--control {
            margin-left: 10px;
            opacity: .5;
        }
        #hoj-alert-container .m-message--control:hover {
            opacity: 1;
        }
        #hoj-alert-container .m-message--control i {
            color: inherit !important;
        }

        /* 色条 */
        #hoj-alert-container .m-message--success { border-left: 3px solid #19BE6B; }
        #hoj-alert-container .m-message--error   { border-left: 3px solid #ED4014; }
        #hoj-alert-container .m-message--warning { border-left: 3px solid #FF9900; }
        #hoj-alert-container .m-message--info    { border-left: 3px solid #2DB7F5; }

        /* ============ 深色模式 ============ */
        html.hoj-dark-mode #hoj-alert-container .m-message {
            background: #37373FE0 !important;
            color: #FFFFFF !important;
            box-shadow: 0 2px 12px rgba(0,0,0,.45);
        }

        /* ============ 液态玻璃（浅色） ============ */
        html.hoj-lg-active:not(.hoj-dark-mode) #hoj-alert-container .m-message {
            background: rgba(255, 255, 255, .65) !important;
            backdrop-filter: blur(20px) saturate(1.5) !important;
            -webkit-backdrop-filter: blur(20px) saturate(1.5) !important;
            color: #24292E !important;
        }

        /* ============ 液态玻璃（深色） ============ */
        html.hoj-lg-active.hoj-dark-mode #hoj-alert-container .m-message {
            background: rgba(55, 55, 63, .75) !important;
            backdrop-filter: blur(20px) saturate(1.5) !important;
            -webkit-backdrop-filter: blur(20px) saturate(1.5) !important;
            color: #FFFFFF !important;
        }
    `;
    document.head.appendChild(style);
})();
/* ============================================================
 * 滚动锁：Dialog 打开时隐藏外部网页滚动条
 * 用引用计数处理多个 Dialog 叠加
 * ============================================================ */
let _scrollLockCount = 0;
let _scrollLockPrev = null;

function lockPageScroll() {
    _scrollLockCount++;
    if (_scrollLockCount !== 1) return;   // 已经锁了，跳过

    const body = document.body;
    const html = document.documentElement;

    // 记录原始值，close 时还原
    _scrollLockPrev = {
        bodyOverflow: body.style.overflow,
        bodyPaddingRight: body.style.paddingRight,
        htmlOverflow: html.style.overflow
    };

    // 计算滚动条宽度，用 padding-right 补偿，避免页面抖动
    const sbw = window.innerWidth - html.clientWidth;
    if (sbw > 0) {
        const cur = parseFloat(getComputedStyle(body).paddingRight) || 0;
        body.style.paddingRight = `${cur + sbw}px`;
    }

    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    document.documentElement.classList.add('hoj-scroll-locked');
}

function unlockPageScroll() {
    if (_scrollLockCount === 0) return;
    _scrollLockCount--;
    if (_scrollLockCount !== 0) return;   // 还有其它 Dialog 在打开

    const body = document.body;
    const html = document.documentElement;

    if (_scrollLockPrev) {
        body.style.overflow = _scrollLockPrev.bodyOverflow || '';
        body.style.paddingRight = _scrollLockPrev.bodyPaddingRight || '';
        html.style.overflow = _scrollLockPrev.htmlOverflow || '';
        _scrollLockPrev = null;
    } else {
        body.style.overflow = '';
        body.style.paddingRight = '';
        html.style.overflow = '';
    }

    document.documentElement.classList.remove('hoj-scroll-locked');
}
/**
 * 通用对话框，替代 confirm() / 自定义弹窗
 * @param {object} opts
 * @param {string}   opts.title        标题
 * @param {string}   opts.content      内容（纯文本，安全；如需 HTML 用 opts.html）
 * @param {string}   [opts.html]       内容的 HTML（优先级高于 content，注意 XSS 风险）
 * @param {string}   [opts.confirmText='确定']
 * @param {string}   [opts.cancelText='取消']
 * @param {boolean}  [opts.showCancel=true]  是否显示取消按钮
 * @param {'success'|'error'|'warning'|'info'} [opts.type]  左侧色条 + 顶部小图标
 * @param {boolean}  [opts.closeOnMask=true] 点击遮罩是否关闭
 * @param {Function} [opts.onConfirm]  点击确定时的回调（返回 false 可阻止关闭）
 * @returns {Promise<boolean>}  确定 → true，取消/关闭 → false
 */
function NewDialog(opts = {}) {
    const raw = {
        title: '@dialog.tip',
        content: '',
        html: '',
        confirmText: '@dialog.confirm',
        cancelText: '@dialog.cancel',
        showCancel: true,
        type: '',
        closeOnMask: true,
        onConfirm: null,
        ...opts
    };

    // 解析 i18n：opts 里所有字符串字段都走 _i18nResolve
    const title       = _i18nResolve(raw.title);
    const content     = _i18nResolve(raw.content);
    const html        = raw.html;   // html 走原文，不自动翻译（防 XSS / 保留富文本）
    const confirmText = _i18nResolve(raw.confirmText);
    const cancelText  = _i18nResolve(raw.cancelText);
    const showCancel  = !!raw.showCancel;
    const type        = raw.type;
    const closeOnMask = raw.closeOnMask !== false;
    const onConfirm   = raw.onConfirm;

    return new Promise((resolve) => {
        const mask = document.createElement('div');
        mask.className = 'hoj-dialog-mask';
        mask.style.zIndex = '2147483600';

        const dialog = document.createElement('div');
        dialog.className = 'hoj-dialog';
        if (type) dialog.classList.add(`hoj-dialog--${type}`);

        // 头部
        const header = document.createElement('div');
        header.className = 'hoj-dialog__header';
        header.textContent = title;

        const closeBtn = document.createElement('i');
        closeBtn.className = 'hoj-dialog__close el-icon-close';
        closeBtn.style.zIndex = '2';
        closeBtn.addEventListener('click', () => close(false));
        header.appendChild(closeBtn);

        // 内容
        const body = document.createElement('div');
        body.className = 'hoj-dialog__body';
        if (html) body.innerHTML = html;
        else body.textContent = content;

        // 底部
        const footer = document.createElement('div');
        footer.className = 'hoj-dialog__footer';

        if (showCancel) {
            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'hoj-dialog__btn hoj-dialog__btn--cancel';
            cancelBtn.textContent = cancelText;
            cancelBtn.addEventListener('click', () => close(false));
            footer.appendChild(cancelBtn);
        }

        const confirmBtn = document.createElement('button');
        confirmBtn.type = 'button';
        confirmBtn.className = 'hoj-dialog__btn hoj-dialog__btn--confirm';
        confirmBtn.textContent = confirmText;
        confirmBtn.addEventListener('click', async () => {
            if (typeof onConfirm === 'function') {
                try {
                    const ret = await onConfirm();
                    if (ret === false) return;
                } catch (e) {
                    console.error('[NewDialog] onConfirm 出错:', e);
                }
            }
            close(true);
        });
        footer.appendChild(confirmBtn);

        dialog.append(header, body, footer);
        mask.appendChild(dialog);
        document.body.appendChild(mask);

        let closed = false;
        function close(result) {
            if (closed) return;
            closed = true;
            mask.style.animation = 'hojDialogMaskOut .18s ease-in forwards';
            dialog.style.animation = 'hojDialogOut .18s ease-in forwards';
            setTimeout(() => {
                mask.remove();
                resolve(result);
            }, 180);
        }

        if (closeOnMask) {
            mask.addEventListener('click', (e) => {
                if (e.target === mask) close(false);
            });
        }

        const onKey = (e) => {
            if (e.key === 'Escape') {
                document.removeEventListener('keydown', onKey);
                close(false);
            }
        };
        document.addEventListener('keydown', onKey);

        setTimeout(() => confirmBtn.focus(), 50);
    });
}
(function injectDialogStyle() {
    if (document.getElementById('hoj-dialog-style')) return;
    const style = document.createElement('style');
    style.id = 'hoj-dialog-style';
    style.textContent = `
        @keyframes hojDialogMaskIn {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        @keyframes hojDialogMaskOut {
            from { opacity: 1; }
            to   { opacity: 0; }
        }
        @keyframes hojDialogIn {
            from { opacity: 0; transform: translateY(12px) scale(.98); }
            to   { opacity: 1; transform: translateY(0)    scale(1);   }
        }
        @keyframes hojDialogOut {
            from { opacity: 1; transform: translateY(0)    scale(1);   }
            to   { opacity: 0; transform: translateY(12px) scale(.98); }
        }

        /* ============ 遮罩层 ============ */
        .hoj-dialog-mask {
            position: fixed;
            inset: 0;
            z-index: 2147483600 !important;
            background: rgba(0, 0, 0, .35);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: hojDialogMaskIn .2s ease-out;
        }

        /* ============ 对话框主体 ============ */
        .hoj-dialog {
            min-width: 320px;
            max-width: 520px;
            max-height: 80vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            border-radius: var(--hoj-card-radius, 12px);
            background: #FFFFFF;
            box-shadow: 0 8px 24px rgba(0,0,0,.2);
            font-family: var(--hoj-sans-font, "Noto Sans SC", sans-serif);
            color: #24292E;
            animation: hojDialogIn .25s cubic-bezier(.2,.8,.2,1);
        }

        /* ============ 深色模式 ============ */
        html.hoj-dark-mode .hoj-dialog {
            background: #37373FE0;
            color: #FFFFFF;
        }
        html.hoj-dark-mode .hoj-dialog__header,
        html.hoj-dark-mode .hoj-dialog__footer {
            border-color: rgba(255, 255, 255, .08);
        }

        /* ============ 液态玻璃（浅色） ============ */
        html.hoj-lg-active:not(.hoj-dark-mode) .hoj-dialog {
            background: rgba(255, 255, 255, .65);
            backdrop-filter: blur(20px) saturate(1.5);
            -webkit-backdrop-filter: blur(20px) saturate(1.5);
            box-shadow: var(--hoj-lg-shadow, 0 8px 24px rgba(0,0,0,.2));
        }

        /* ============ 液态玻璃（深色） ============ */
        html.hoj-lg-active.hoj-dark-mode .hoj-dialog {
            background: rgba(55, 55, 63, .75);
            backdrop-filter: blur(20px) saturate(1.5);
            -webkit-backdrop-filter: blur(20px) saturate(1.5);
            box-shadow: var(--hoj-lg-shadow, 0 8px 24px rgba(0,0,0,.2));
        }

        /* ============ 头部 ============ */
        .hoj-dialog__header {
            display: flex;
            align-items: center;
            padding: 14px 18px 10px;
            font-size: 15px;
            font-weight: 600;
            z-index: 1;
            border-bottom: 1px solid rgba(0, 0, 0, .06);
        }
        .hoj-dialog__close {
            margin-left: auto;
            cursor: pointer;
            opacity: .5;
            font-size: 16px;
            transition: opacity .15s;
        }
        .hoj-dialog__close:hover {
            opacity: 1;
        }

        /* ============ 内容 ============ */
        .hoj-dialog__body {
            padding: 16px 18px;
            font-size: 13px;
            line-height: 1.6;
            overflow-y: auto;
            word-break: break-all;
            white-space: pre-wrap;
        }

        /* ============ 底部 ============ */
        .hoj-dialog__footer {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 10px 18px 14px;
            border-top: 1px solid rgba(0, 0, 0, .06);
        }

        /* ============ 按钮 ============ */
        .hoj-dialog__btn {
            padding: 6px 14px;
            border-radius: 6px;
            border: 1px solid rgba(0, 0, 0, .1);
            cursor: pointer;
            font-size: 13px;
            font-family: inherit;
            transition: background .15s, border-color .15s, color .15s;
        }
        .hoj-dialog__btn--cancel {
            background: transparent;
            color: #24292E;
        }
        .hoj-dialog__btn--cancel:hover {
            background: rgba(0, 0, 0, .06);
        }
        .hoj-dialog__btn--confirm {
            background: #409EFF;
            color: #FFFFFF;
            border-color: #409EFF;
        }
        .hoj-dialog__btn--confirm:hover {
            background: #66B1FF;
        }

        /* 深色模式按钮 */
        html.hoj-dark-mode .hoj-dialog__btn--cancel {
            color: #FFFFFF;
            border-color: rgba(255, 255, 255, .1);
        }
        html.hoj-dark-mode .hoj-dialog__btn--cancel:hover {
            background: rgba(255, 255, 255, .08);
        }

        /* 色条 */
        .hoj-dialog--success { border: 3px solid #19BE6B; }
        .hoj-dialog--error   { border: 3px solid #ED4014; }
        .hoj-dialog--warning { border: 3px solid #FF9900; }
        .hoj-dialog--info    { border: 3px solid #2DB7F5; }
        /* ============ 自定义 Dialog · 手动全屏 ============ */
.hoj-dialog.hoj-dialog--fullscreen {
    position: fixed !important;
    inset: 0 !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    min-width: 100vw !important;
    max-width: 100vw !important;
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    border-radius: 0 !important;
    transform: none !important;
    animation: none !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    box-shadow: none !important;
}

.hoj-dialog.hoj-dialog--fullscreen > .hoj-dialog__header {
    flex: 0 0 auto;
    padding: 14px 18px;
    font-size: 16px;
    border-radius: 0;
}

.hoj-dialog.hoj-dialog--fullscreen > .hoj-dialog__body {
    flex: 1 1 auto;
    min-height: 0;
    max-height: none !important;
    padding: 16px 18px;
    border-radius: 0;
    overflow-y: auto;
}

/* 深色模式 */
html.hoj-dark-mode .hoj-dialog.hoj-dialog--fullscreen {
    background: var(--hoj-card-bg, #37373FE0);
}
        /* ============ 小屏全屏（< 768px） ============ */
@media (max-width: 767px) {
    .hoj-dialog-mask {
        align-items: stretch;
        justify-content: stretch;
    }
    .hoj-dialog {
        width: 100vw !important;
        max-width: 100vw !important;
        min-width: 0 !important;
        height: 100vh !important;
        max-height: 100vh !important;
        border-radius: 0 !important;
        box-shadow: none !important;
    }
    .hoj-dialog__header {
        padding: 14px 16px 12px;
        font-size: 16px;
    }
    .hoj-dialog__body {
        padding: 16px 16px;
        font-size: 14px;
        flex: 1 1 auto;
        min-height: 0;
    }
    .hoj-dialog__footer {
        padding: 12px 16px 16px;
    }
    .hoj-dialog__btn {
        padding: 8px 18px;
        font-size: 14px;
    }
    .hoj-dialog__close {
        font-size: 20px;
        padding: 4px;
    }
}
    `;
    document.head.appendChild(style);
})();
/* ============================================================
 * NewTool：通用小组件容器（拖拽 / 缩放 / 持久化）
 * ============================================================ */
class NewTool {
    constructor(opts = {}) {
        if (!opts.id) throw new Error('NewTool: id required');
        this.id = opts.id;
        this.title = opts.title || this.id;
        this.icon = opts.icon || '';
        this.width  = opts.width  || 220;
        this.height = opts.height || 120;
        this.minWidth  = opts.minWidth  || 140;
        this.minHeight = opts.minHeight || 60;
        this.left = opts.left ?? (window.innerWidth - this.width - 20);
        this.top  = opts.top  ?? 80;
        this.onClick = opts.onClick || null;
        this.onResize = opts.onResize || null;
        this.hideCloseButton = !!opts.hideCloseButton;
        this.onClose = opts.onClose || null;   // 关闭时回调
        // 存默认值用于复位
        this._defaultWidth  = this.width;
        this._defaultHeight = this.height;
        this._defaultLeft = this.left;
        this._defaultTop  = this.top;

        this._loadState();
        this._build();
        this._mount();
    }

    _key(k) { return `hoj_tool_${this.id}_${k}`; }

    _loadState() {
        try {
            const raw = GM_getValue(this._key('state'), null);
            if (!raw) return;
            const s = typeof raw === 'string' ? JSON.parse(raw) : raw;
            if (typeof s.left === 'number')   this.left = s.left;
            if (typeof s.top === 'number')    this.top = s.top;
            if (typeof s.width === 'number')  this.width = s.width;
            if (typeof s.height === 'number') this.height = s.height;
        } catch (e) {}
    }

    _saveState() {
        try {
            GM_setValue(this._key('state'), JSON.stringify({
                left: this.left, top: this.top,
                width: this.width, height: this.height
            }));
        } catch (e) {}
    }

    _build() {
        const el = document.createElement('div');
        el.id = `hoj-tool-${this.id}`;
        el.className = 'hoj-tool';
        el.style.left = this.left + 'px';
        el.style.top = this.top + 'px';
        el.style.width = this.width + 'px';
        el.style.height = this.height + 'px';

        const header = document.createElement('div');
        header.className = 'hoj-tool__header';
        header.innerHTML = `
            <span class="hoj-tool__title">${this.icon} ${this.title}</span>
            <span class="hoj-tool__actions">
                <i class="hoj-tool__btn hoj-tool__reset el-icon-refresh-right" title="复位"></i>
                ${this.hideCloseButton ? '' : '<i class="hoj-tool__btn hoj-tool__close el-icon-close" title="隐藏"></i>'}
            </span>
        `;
        const body = document.createElement('div');
        body.className = 'hoj-tool__body';
        const handle = document.createElement('div');
        handle.className = 'hoj-tool__resize';
        el.append(header, body, handle);

        this.el = el;
        this.headerEl = header;
        this.bodyEl = body;
        this.handleEl = handle;

        this._bindDrag();
        this._bindResize();
        this._bindClick();
    }

    _bindDrag() {
        let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
        const onDown = (e) => {
            if (e.button !== 0) return;
            if (e.target.closest('.hoj-tool__btn')) return;
            e.preventDefault();
            this._dragMoved = false;
            dragging = true;
            sx = e.clientX; sy = e.clientY;
            sl = this.left; st = this.top;
            document.addEventListener('mousemove', onMove, true);
            document.addEventListener('mouseup', onUp, true);
        };
        const onMove = (e) => {
            if (!dragging) return;
            const dx = e.clientX - sx, dy = e.clientY - sy;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) this._dragMoved = true;
            this.left = Math.max(0, Math.min(sl + dx, window.innerWidth  - this.width));
            this.top  = Math.max(0, Math.min(st + dy, window.innerHeight - 40));
            this.el.style.left = this.left + 'px';
            this.el.style.top  = this.top + 'px';
        };
        const onUp = () => {
            dragging = false;
            document.removeEventListener('mousemove', onMove, true);
            document.removeEventListener('mouseup', onUp, true);
            this._saveState();
            setTimeout(() => { this._dragMoved = false; }, 0);
        };
        this.headerEl.addEventListener('mousedown', onDown);
    }

    _bindResize() {
        let resizing = false, sx = 0, sy = 0, sw = 0, sh = 0;
        const onDown = (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            e.stopPropagation();
            resizing = true;
            sx = e.clientX; sy = e.clientY;
            sw = this.width; sh = this.height;
            document.addEventListener('mousemove', onMove, true);
            document.addEventListener('mouseup', onUp, true);
        };
        const onMove = (e) => {
            if (!resizing) return;
            this.width  = Math.max(this.minWidth,  sw + e.clientX - sx);
            this.height = Math.max(this.minHeight, sh + e.clientY - sy);
            this.el.style.width  = this.width  + 'px';
            this.el.style.height = this.height + 'px';
            if (this.onResize) this.onResize(this.bodyEl, this.width, this.height);
        };
        const onUp = () => {
            resizing = false;
            document.removeEventListener('mousemove', onMove, true);
            document.removeEventListener('mouseup', onUp, true);
            this._saveState();
        };
        this.handleEl.addEventListener('mousedown', onDown);
    }

    _bindClick() {
        this.headerEl.addEventListener('click', (e) => {
            if (e.target.closest('.hoj-tool__btn')) return;
            if (this._dragMoved) return;
            if (this.onClick) this.onClick(this);
        });
        const resetBtn = this.headerEl.querySelector('.hoj-tool__reset');
        if (resetBtn) resetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.resetPosition();
        });
        const closeBtn = this.headerEl.querySelector('.hoj-tool__close');
        if (closeBtn) closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hide();
            if (this.onClose) {
                try { this.onClose(this); } catch (err) { console.warn('[NewTool] onClose 出错:', err); }
            }
        });
    }

    resetPosition() {
        this.width  = this._defaultWidth;
        this.height = this._defaultHeight;
        this.left = window.innerWidth - this.width - 20;
        this.top  = 80;
        this.el.style.left = this.left + 'px';
        this.el.style.top  = this.top + 'px';
        this.el.style.width  = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this._saveState();
        if (this.onResize) this.onResize(this.bodyEl, this.width, this.height);
    }

    _mount() {
        if (!document.body.contains(this.el)) document.body.appendChild(this.el);
    }

    hide() {
        if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
    }

    show() { this._mount(); }

    destroy() {
        if (this._cleanup) this._cleanup();
        if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
    }
}
/**
 * 自定义 Dialog：直接接收 DOM 节点做 body，保留内部事件
 * @param {object} opts
 * @param {string}   [opts.title]
 * @param {HTMLElement} opts.bodyEl
 * @param {string}   [opts.width]       宽屏下的宽度，默认 '600px'
 * @param {string}   [opts.maxHeight]   宽屏下的最大高度，默认 '80vh'
 * @param {boolean}  [opts.fullscreen]  桌面端强制全屏（移动端始终全屏）
 * @param {Function} [opts.onClose]
 * @returns {Function} close
 */
function openCustomDialog(opts = {}) {
    const {
        title = '提示',
        bodyEl,
        width = '600px',
        maxHeight = '80vh',
        fullscreen = false,
        onClose = null
    } = opts;
    if (!bodyEl) return () => {};

    // 是否走全屏：显式指定 fullscreen=true 或移动端
    const isMobile = window.innerWidth < 768;
    const useFullscreen = fullscreen === true || isMobile;

    /* ---------- 容器 ---------- */
    const mask = document.createElement('div');
    mask.className = 'hoj-dialog-mask';
    mask.style.zIndex = '2147483600';

    const dialog = document.createElement('div');
    dialog.className = 'hoj-dialog';
    if (useFullscreen) dialog.classList.add('hoj-dialog--fullscreen');

    // 内联样式只在"非全屏"时设置，避免覆盖 CSS 类的全屏样式
    if (!useFullscreen) {
        if (width)     dialog.style.width    = width;
        dialog.style.maxWidth = 'calc(100vw - 40px)';
    }

    /* ---------- header ---------- */
    const header = document.createElement('div');
    header.className = 'hoj-dialog__header';
    header.textContent = _i18nResolve(title);

    const closeBtn = document.createElement('i');
    closeBtn.className = 'hoj-dialog__close el-icon-close';
    closeBtn.style.cssText = 'cursor: pointer; padding: 6px; margin: -6px 0 0 auto;';
    closeBtn.addEventListener('click', () => close());
    header.appendChild(closeBtn);

    /* ---------- body ---------- */
    const body = document.createElement('div');
    body.className = 'hoj-dialog__body';
    if (!useFullscreen && maxHeight) {
        body.style.maxHeight = maxHeight;
    }
    body.style.overflowY = 'auto';
    body.style.whiteSpace = 'normal';
    body.appendChild(bodyEl);

    dialog.append(header, body);
    mask.appendChild(dialog);
    document.body.appendChild(mask);
    lockPageScroll();

    /* ---------- 关闭 ---------- */
    let closed = false;
    const close = () => {
        if (closed) return;
        closed = true;
        document.removeEventListener('keydown', onKey);
        mask.style.animation = 'hojDialogMaskOut .18s ease-in forwards';
        dialog.style.animation = 'hojDialogOut .18s ease-in forwards';
        setTimeout(() => {
            mask.remove();
            unlockPageScroll();
            if (typeof onClose === 'function') {
                try { onClose(); } catch (e) { console.warn('[CustomDialog] onClose 出错:', e); }
            }
        }, 180);
    };

    mask.addEventListener('click', (e) => { if (e.target === mask) close(); });

    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);

    return close;
}
(function () {
    'use strict';
    const VERSION_INFO = {
        version: "27.3.7",
        name: "Better HOJ 27",
        count: 120,
        "date": "2026-10-15"
    }
    const STORAGE_KEY = 'smart_hoj_cfg_v2';
    const DEFAULT_CONFIG = {
        Open: false,
        // ============ 开关 ============
        SmoothScroll: true,
        SmoothSwitch: true,
        BetterNotFound: true,
        LiquidGlassUI: false,
        DarkMode: false,
        MouseGlow: true,
        HideNewHOJ: true,

        // ============ 背景 ============
        ImageSource: 'Source1',
        BuiltinBackground: 'Custom',
        CustomBackground: 'None',

        // ============ 卡片 ============
        CardBackground: 'Default',
        CardBlurRadius: 'Default',
        CardRadius: 'Default',

        // ============ 列表 ============
        ListBackground: 'Default',
        ListBackgroundGreen: 'Default',
        ListBackgroundHover: 'Default',

        // ============ 代码块 ============
        CodeBlockBackground: 'Default',
        CodeBlockRadius: 'Default',

        // ============ 输入框 ============
        InputAreaBackground: 'Default',
        InputAreaRadius: 'Default',

        // ============ 按钮 ============
        ButtonBackground: 'Default',
        ButtonBackgroundHover: 'Default',
        ButtonBackgroundActive: 'Default',
        ButtonRadius: 'Default',

        // ============ 标签 ============
        TagRadius: 'Default',

        // ============ 提示框 ============
        TooltipBackground: 'Default',
        TooltipRadius: 'Default',

        // ============ 评测色块 ============
        JudgeDetailBlockRadius: 'Default',

        // ============ 文字颜色 ============
        TextDark: 'Default',
        TextDarkDisabled: 'Default',
        TextLight: 'Default',
        TextBlue: 'Default',
        TextLink: 'Default',

        // ============ 选中文字 ============
        SelectText: 'Default',

        // ============ 字体 ============
        MemorizingFont: false,
        SansFont: 'Default',
        MonoFont: 'Default',
        // ============ 登录 ============
        AutoLogin: false,
        DefaultUsername: '',
        DefaultPassword: '',
        // ============ 签到 ============
        CheckInEnabled: true,
        CheckInAutoPopup: true,
        // ============ 重定向 ============
        EnableRedirect: false,
        AutoRedirectHost: 'ssf.hdoi.cn',
        // ============ 自定义标签 ============
        CustomRankTag: '',
        CustomRankTagColor: '#18BE6A',
        // ============ 使用真链接 ============
        realCPHurl: true,
        // ============ 小组件 ============
        ToolsEnabled: true,
        ToolsKeystroke: false,
        ToolsPageTime: false,
        ToolsClock: false,
        // ============ 题目推荐 ============
        hdnoipCFName: '',
        // ============ 菜单栏布局 ============
        NavbarLayout: null,
        // ============ 片段 ============
        SnippetPanelHotkey: 'Ctrl+Alt+S',
        Snippets: [],
        // ============ 自动保存代码 ============
        AutoSaveCode: false,
        AutoSaveCodeInterval: '30',
        // ============ 设置面板 ============
        SettingsFullscreen: false,
        // ============ Vditor ============
        VditorDiscussionPublish: true,   // 讨论发布覆盖
        VditorDiscussionEdit:    true,   // 讨论编辑覆盖
        VditorGroupCreate:       true,   // 创建团队覆盖
        VditorUploadMode: 'disabled',   // 'disabled' | 'admin' | 'group'
        VditorUploadGid: '',            // 仅 group 模式使用
        // ============ 版本 ============
        ShowVersion: false
    };
    const HOJTAG_BASE = 'https://hojtag.rkcd.me'; // 已有

    const CHECKIN_KEYS = {
        date:     'hoj_checkin_lastCheckInDate',
        luck:     'hoj_checkin_checkInFortuneLuck',
        result:   'hoj_checkin_checkInFortuneResult',
        username: 'hoj_checkin_username'
    };

    function getTodayDateStr() {
        const d = new Date();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${m}-${day}`;
    }

    const LUCK_COLOR = {
        '大吉': '#FF4D4F',
        '中吉': '#FA8C16',
        '小吉': '#FADB14',
        '吉':   '#52C41A',
        '半吉': '#13C2C2',
        '平':   '#909399'
    };
    function loadConfig() {
        try {
            // 优先从 GM 存储读取（不受网站 localStorage.clear() 影响）
            let raw = GM_getValue(STORAGE_KEY, null);
            // 兼容：如果 GM 里没有，尝试从 localStorage 迁移一次旧数据
            if (raw === null) {
                const legacy = localStorage.getItem(STORAGE_KEY);
                if (legacy) {
                    raw = legacy;
                    // 迁移到 GM 存储
                    GM_setValue(STORAGE_KEY, legacy);
                }
            }
            if (!raw) return { ...DEFAULT_CONFIG };
            const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            return { ...DEFAULT_CONFIG, ...parsed };
        } catch (e) {
            return { ...DEFAULT_CONFIG };
        }
    }

    function saveConfig(c) {
        try {
            GM_setValue(STORAGE_KEY, JSON.stringify(c));
            // 可选：同时写一份到 localStorage 作为冗余备份
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch (e) {}
        } catch (e) {
            console.error('[BetterHOJ] 保存配置失败:', e);
        }
    }
    let config = loadConfig();
    /* ============================================================
 * 导入 / 导出
 * ============================================================ */
    // 分组定义
    const CONFIG_GROUPS = [
        // ---------- Smart HOJ 组 ----------
        { id: 'general',    name: '通用开关',   scope: 'smart',
         keys: ['Open','SmoothScroll','SmoothSwitch','BetterNotFound',
                'LiquidGlassUI','DarkMode','MouseGlow','HideNewHOJ'] },
        { id: 'background', name: '背景',       scope: 'smart',
         keys: ['ImageSource','BuiltinBackground','CustomBackground'] },
        { id: 'card',       name: '卡片',       scope: 'smart',
         keys: ['CardBackground','CardBlurRadius','CardRadius'] },
        { id: 'list',       name: '列表',       scope: 'smart',
         keys: ['ListBackground','ListBackgroundGreen','ListBackgroundHover'] },
        { id: 'code',       name: '代码块',     scope: 'smart',
         keys: ['CodeBlockBackground','CodeBlockRadius'] },
        { id: 'input',      name: '输入框',     scope: 'smart',
         keys: ['InputAreaBackground','InputAreaRadius'] },
        { id: 'button',     name: '按钮',       scope: 'smart',
         keys: ['ButtonBackground','ButtonBackgroundHover',
                'ButtonBackgroundActive','ButtonRadius'] },
        { id: 'misc',       name: '其他样式',   scope: 'smart',
         keys: ['TagRadius','TooltipBackground','TooltipRadius','JudgeDetailBlockRadius'] },
        { id: 'text',       name: '文字颜色',   scope: 'smart',
         keys: ['TextDark','TextDarkDisabled','TextLight','TextBlue','TextLink','SelectText'] },
        { id: 'font',       name: '字体',       scope: 'smart',
         keys: ['MemorizingFont','SansFont','MonoFont'] },
        { id: 'version',    name: '版本信息',   scope: 'smart',
         keys: ['ShowVersion'] },

        // ---------- Better HOJ 组 ----------
        { id: 'login',      name: '登录',       scope: 'better',
         keys: ['AutoLogin','DefaultUsername','DefaultPassword'] },
        { id: 'checkin',    name: '签到',       scope: 'better',
         keys: ['CheckInEnabled','CheckInAutoPopup'] },
        { id: 'redirect',   name: '重定向',     scope: 'better',
         keys: ['EnableRedirect','AutoRedirectHost'] },
        { id: 'tag',        name: '自定义标签', scope: 'better',
         keys: ['CustomRankTag','CustomRankTagColor'] },
        { id: 'cph',        name: 'CPH',        scope: 'better',
         keys: ['realCPHurl'] },
        { id: 'tools',      name: '小组件',     scope: 'better',
         keys: ['ToolsEnabled','ToolsKeystroke','ToolsPageTime','ToolsClock'] },
        { id: 'recommend',  name: '题目推荐',   scope: 'better',
         keys: ['hdnoipCFName'] },
        { id: 'navbar',     name: '菜单栏布局', scope: 'better',
         keys: ['NavbarLayout'] },
        { id: 'snippet',    name: '代码片段',   scope: 'better',
         keys: ['SnippetPanelHotkey','Snippets'] },
    ];
    const IE_SENSITIVE_KEYS = new Set([
        'DefaultPassword',
    ]);
    /** key → 分组 */
    function findGroupByKey(key) {
        return CONFIG_GROUPS.find(g => g.keys.includes(key)) || null;
    }

    /** 某预设对应的 key 集合 */
    function presetToKeys(preset, availableKeys) {
        const keys = new Set();
        if (preset === 'favorites') return keys;

        availableKeys.forEach(k => {
            if (preset === 'all') { keys.add(k); return; }
            if (preset === 'snippet') {
                if (k === 'Snippets' || k === 'SnippetPanelHotkey') keys.add(k);
                return;
            }
            const g = findGroupByKey(k);
            if (!g) { if (preset === 'all') keys.add(k); return; }
            if (preset === 'smart'  && g.scope === 'smart')  keys.add(k);
            if (preset === 'better' && g.scope === 'better') keys.add(k);
        });
        return keys;
    }

    /** 某预设是否包含收藏 */
    function presetIncludesFavorites(preset) {
        return preset === 'all'
        || preset === 'better'
        || preset === 'favorites';
    }

    /** 值 → 单行可读字符串 */
    function _fmtVal(v) {
        if (v === null) return 'null';
        if (v === undefined) return 'undefined';
        if (typeof v === 'object') {
            try { return JSON.stringify(v); } catch { return String(v); }
        }
        return String(v);
    }

    /**
 * 构建一个配置分组 DOM
 * @param {string} name
 * @param {string[]} keys
 * @param {Set<string>} selected
 * @param {Function} rerender
 * @param {object} [valueSource] 传值来源（导入时传文件的值）；不传用 config
 */
    function _buildConfigGroup(name, keys, selected, rerender, valueSource) {
        const groupEl = document.createElement('div');
        groupEl.className = 'hoj-ie-group';
        const src = valueSource || config;

        const allChecked  = keys.every(k => selected.has(k));
        const someChecked = keys.some(k => selected.has(k));

        const header = document.createElement('div');
        header.className = 'hoj-ie-group-header';
        header.innerHTML = `
        <label class="hoj-ie-group-check"><input type="checkbox" ${allChecked ? 'checked' : ''}></label>
        <span class="hoj-ie-group-name">${escapeHtml(name)}</span>
        <span class="hoj-ie-group-count">${keys.filter(k => selected.has(k)).length}/${keys.length}</span>
        <span class="hoj-ie-group-toggle">▾</span>
    `;
        const cb = header.querySelector('input');
        if (someChecked && !allChecked) cb.indeterminate = true;
        cb.addEventListener('change', (e) => {
            if (e.target.checked) keys.forEach(k => selected.add(k));
            else                  keys.forEach(k => selected.delete(k));
            rerender();
        });
        groupEl.appendChild(header);

        const itemsEl = document.createElement('div');
        itemsEl.className = 'hoj-ie-items';
        keys.forEach(k => {
            const itemEl = document.createElement('label');
            itemEl.className = 'hoj-ie-item';

            const rawVal = src[k];
            const isSensitive = IE_SENSITIVE_KEYS.has(k);

            let val, title;
            if (isSensitive) {
                // 有值 → 显示遮罩；无值 → 显示空
                const hasValue = rawVal !== undefined && rawVal !== null && String(rawVal) !== '';
                val = hasValue ? '••••••••' : '';
                title = hasValue
                    ? WebI18n.t('ie.sensitiveHidden')
                : WebI18n.t('ie.sensitiveEmpty');
            } else {
                val = _fmtVal(rawVal);
                title = val;
            }

            const isNew = !!valueSource;
            itemEl.innerHTML = `
        <input type="checkbox" ${selected.has(k) ? 'checked' : ''}>
        <span class="hoj-ie-item-name">${escapeHtml(k)}</span>
        <span class="hoj-ie-item-value${isNew ? ' hoj-ie-item-value--new' : ''}${isSensitive ? ' hoj-ie-item-value--masked' : ''}"
              title="${escapeHtml(title)}">${escapeHtml(val)}</span>
    `;

            itemEl.querySelector('input').addEventListener('change', (e) => {
                if (e.target.checked) selected.add(k);
                else                  selected.delete(k);
                const countEl = header.querySelector('.hoj-ie-group-count');
                if (countEl) countEl.textContent =
                    `${keys.filter(x => selected.has(x)).length}/${keys.length}`;
                const allC  = keys.every(x => selected.has(x));
                const someC = keys.some(x => selected.has(x));
                cb.checked = allC;
                cb.indeterminate = someC && !allC;
            });
            itemsEl.appendChild(itemEl);
        });
        groupEl.appendChild(itemsEl);

        const toggle = header.querySelector('.hoj-ie-group-toggle');
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            itemsEl.classList.toggle('collapsed');
            toggle.textContent = itemsEl.classList.contains('collapsed') ? '▸' : '▾';
        });

        return groupEl;
    }
    // 主入口
    function openImportExportDialog() {
        const dialog = { close: () => {} };

        const wrap = document.createElement('div');
        wrap.className = 'hoj-ie-panel';

        const tabs = document.createElement('div');
        tabs.className = 'hoj-ie-tabs';
        tabs.innerHTML = `
        <button type="button" class="hoj-ie-tab active" data-tab="export"></button>
        <button type="button" class="hoj-ie-tab" data-tab="import"></button>
    `;
        tabs.querySelector('[data-tab="export"]').textContent = WebI18n.t('ie.tabExport');
        tabs.querySelector('[data-tab="import"]').textContent = WebI18n.t('ie.tabImport');
        wrap.appendChild(tabs);

        const body = document.createElement('div');
        body.className = 'hoj-ie-body';
        wrap.appendChild(body);

        let activeTab = 'export';

        const render = () => {
            body.innerHTML = '';
            if (activeTab === 'export') renderExportPane(body, dialog);
            else                        renderImportPane(body, dialog);
        };

        tabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.hoj-ie-tab');
            if (!btn || btn.dataset.tab === activeTab) return;
            tabs.querySelectorAll('.hoj-ie-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTab = btn.dataset.tab;
            render();
        });

        render();

        dialog.close = openCustomDialog({
            title: WebI18n.t('ie.importTitle'),
            bodyEl: wrap,
            width: '640px',
            maxHeight: '80vh'
        });
    }

    /* ============================================================
 * 导出面板
 * ============================================================ */
    function renderExportPane(root, dialog) {
        const state = {
            keys: new Set(Object.keys(DEFAULT_CONFIG)),
            favorites: true
        };

        /* ---------- 预设 ---------- */
        const presetRow = document.createElement('div');
        presetRow.className = 'hoj-ie-presets';
        presetRow.innerHTML = `
        <button type="button" class="hoj-ie-preset active" data-preset="all"></button>
        <button type="button" class="hoj-ie-preset" data-preset="smart"></button>
        <button type="button" class="hoj-ie-preset" data-preset="better"></button>
        <button type="button" class="hoj-ie-preset" data-preset="favorites"></button>
        <button type="button" class="hoj-ie-preset" data-preset="snippet"></button>
    `;
        presetRow.querySelector('[data-preset="all"]').textContent       = WebI18n.t('ie.presetAll');
        presetRow.querySelector('[data-preset="smart"]').textContent     = WebI18n.t('ie.presetSmart');
        presetRow.querySelector('[data-preset="better"]').textContent    = WebI18n.t('ie.presetBetter');
        presetRow.querySelector('[data-preset="favorites"]').textContent = WebI18n.t('ie.presetFavorites');
        presetRow.querySelector('[data-preset="snippet"]').textContent   = WebI18n.t('ie.presetSnippet');
        root.appendChild(presetRow);

        /* ---------- 列表 ---------- */
        const listEl = document.createElement('div');
        listEl.className = 'hoj-ie-list';
        root.appendChild(listEl);

        /* ---------- 底部 ---------- */
        const footer = document.createElement('div');
        footer.className = 'hoj-ie-footer';
        const exportBtn = document.createElement('button');
        exportBtn.type = 'button';
        exportBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
        exportBtn.textContent = WebI18n.t('ie.exportBtn');
        footer.appendChild(exportBtn);
        root.appendChild(footer);

        const renderList = () => {
            listEl.innerHTML = '';
            CONFIG_GROUPS.forEach(g => {
                const keys = g.keys.filter(k => Object.prototype.hasOwnProperty.call(DEFAULT_CONFIG, k));
                if (!keys.length) return;
                // 分组名走 i18n：约定 key 为 `group.<id>`
                const groupTitle = WebI18n.t(`group.${g.id}`);
                listEl.appendChild(_buildConfigGroup(groupTitle, keys, state.keys, renderList));
            });

            /* ---------- 收藏（虚拟项） ---------- */
            const favCount = getFavorites().length;
            const favEl = document.createElement('div');
            favEl.className = 'hoj-ie-group';
            favEl.innerHTML = `
            <div class="hoj-ie-group-header">
                <label class="hoj-ie-group-check">
                    <input type="checkbox" ${state.favorites ? 'checked' : ''}>
                </label>
                <span class="hoj-ie-group-name"></span>
                <span class="hoj-ie-group-count"></span>
            </div>
        `;
            favEl.querySelector('.hoj-ie-group-name').textContent  = WebI18n.t('ie.favorites');
            favEl.querySelector('.hoj-ie-group-count').textContent = WebI18n.t('ie.favCount', { n: favCount });
            favEl.querySelector('input').addEventListener('change', (e) => {
                state.favorites = e.target.checked;
            });
            listEl.appendChild(favEl);
        };

        presetRow.addEventListener('click', (e) => {
            const btn = e.target.closest('.hoj-ie-preset');
            if (!btn) return;
            presetRow.querySelectorAll('.hoj-ie-preset').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.keys = presetToKeys(btn.dataset.preset, Object.keys(DEFAULT_CONFIG));
            state.favorites = presetIncludesFavorites(btn.dataset.preset);
            renderList();
        });

        exportBtn.addEventListener('click', () => {
            if (!state.keys.size && !state.favorites) {
                NewAlert('@ie.selectAtLeastOne', 'warning');
                return;
            }

            const payload = {
                type: 'hoj-settings',
                version: VERSION_INFO.version,
                exportedAt: new Date().toISOString(),
                config: {},
                favorites: []
            };
            state.keys.forEach(k => { payload.config[k] = config[k]; });
            if (state.favorites) payload.favorites = getFavorites();

            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const stamp = new Date().toISOString().slice(0, 10);
            a.href = url;
            a.download = `hoj-backup-${stamp}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            const extra = state.favorites
            ? WebI18n.t('ie.exportedExtraFav', { n: payload.favorites.length })
            : '';
            NewAlert(WebI18n.t('ie.exportedSummary', { keys: state.keys.size, extra }), 'success', 2500);
        });

        renderList();
    }

    /* ============================================================
 * 导入面板
 * ============================================================ */
    function renderImportPane(root, dialog) {
        root.innerHTML = '';

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'application/json,.json';
        fileInput.style.display = 'none';
        root.appendChild(fileInput);

        const stage = document.createElement('div');
        root.appendChild(stage);

        /* ---------- 阶段 1：选择文件 + 恢复默认 ---------- */
        const showStage1 = () => {
            stage.innerHTML = `
            <div class="hoj-ie-hint">
                <div class="hoj-ie-hint-title"></div>
                <div class="hoj-ie-hint-detail"></div>
            </div>
        `;
            stage.querySelector('.hoj-ie-hint-title').textContent  = WebI18n.t('ie.pickHintTitle');
            stage.querySelector('.hoj-ie-hint-detail').textContent = WebI18n.t('ie.pickHintDetail');

            const btnRow = document.createElement('div');
            btnRow.className = 'hoj-ie-actions';

            const pickBtn = document.createElement('button');
            pickBtn.type = 'button';
            pickBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
            pickBtn.textContent = WebI18n.t('ie.pickFile');
            pickBtn.addEventListener('click', () => fileInput.click());

            const resetBtn = document.createElement('button');
            resetBtn.type = 'button';
            resetBtn.className = 'hoj-snippet-btn';
            resetBtn.textContent = WebI18n.t('ie.resetDefaults');
            resetBtn.title = WebI18n.t('ie.resetDefaults');
            resetBtn.addEventListener('click', () => {
                const defaultData = {
                    type: 'hoj-settings',
                    version: VERSION_INFO.version,
                    exportedAt: new Date().toISOString(),
                    config: { ...DEFAULT_CONFIG }
                };
                showStage2(defaultData, WebI18n.t('ie.fileKindDefaults'));
            });

            btnRow.append(pickBtn, resetBtn);
            stage.appendChild(btnRow);
        };

        /* ---------- 阶段 2：预览 + 选择 + 导入 ---------- */
        const showStage2 = (data, fileName) => {
            const RESERVED = ['type','version','exportedAt','config','favorites','count','name'];

            let rawConfig = {};
            let incomingFavorites = [];
            let fileKind = 'unknown';

            if (data && typeof data === 'object') {
                const type = data.type;

                if (type === 'hoj-favorites') {
                    incomingFavorites = Array.isArray(data.favorites) ? data.favorites : [];
                    fileKind = 'favorites';
                } else if (type === 'hoj-settings') {
                    rawConfig = (data.config && typeof data.config === 'object') ? data.config : {};
                    if (Array.isArray(data.favorites)) {
                        incomingFavorites = data.favorites;
                        fileKind = 'mixed';
                    } else {
                        fileKind = 'settings';
                    }
                } else if (Array.isArray(data)) {
                    incomingFavorites = data;
                    fileKind = 'favorites';
                } else if (data.config && typeof data.config === 'object') {
                    rawConfig = data.config;
                    if (Array.isArray(data.favorites)) {
                        incomingFavorites = data.favorites;
                        fileKind = 'mixed';
                    } else {
                        fileKind = 'settings';
                    }
                } else if (Array.isArray(data.favorites)) {
                    incomingFavorites = data.favorites;
                    fileKind = 'favorites';
                } else {
                    rawConfig = data;
                    fileKind = 'settings';
                }
            }

            const accepted = {};
            let ignored = 0;
            Object.keys(rawConfig).forEach(k => {
                if (RESERVED.includes(k)) return;
                if (!Object.prototype.hasOwnProperty.call(DEFAULT_CONFIG, k)) { ignored++; return; }
                if (typeof DEFAULT_CONFIG[k] !== typeof rawConfig[k]) { ignored++; return; }
                if (Array.isArray(DEFAULT_CONFIG[k]) !== Array.isArray(rawConfig[k])) { ignored++; return; }
                accepted[k] = rawConfig[k];
            });

            if (!Object.keys(accepted).length && !incomingFavorites.length) {
                NewAlert('@ie.noContent', 'warning');
                return;
            }

            stage.innerHTML = '';

            /* ---------- 顶部：返回 + 文件名 ---------- */
            const topRow = document.createElement('div');
            topRow.className = 'hoj-ie-toprow';

            const backBtn = document.createElement('button');
            backBtn.type = 'button';
            backBtn.className = 'hoj-ie-back';
            backBtn.textContent = WebI18n.t('ie.backToPick');
            backBtn.addEventListener('click', () => {
                fileInput.value = '';
                showStage1();
            });

            const fnEl = document.createElement('div');
            fnEl.className = 'hoj-ie-filename';
            fnEl.textContent = WebI18n.t('ie.chosenFile', { name: fileName });

            topRow.append(backBtn, fnEl);
            stage.appendChild(topRow);

            /* ---------- 文件类型 ---------- */
            const kindKey = {
                'settings':  fileName === WebI18n.t('ie.fileKindDefaults')
                ? 'ie.fileKindDefaults' : 'ie.fileKindSettings',
                'favorites': 'ie.fileKindFavorites',
                'mixed':     'ie.fileKindMixed',
                'unknown':   'ie.fileKindUnknown'
            }[fileKind];
            if (kindKey) {
                const kindEl = document.createElement('div');
                kindEl.className = 'hoj-ie-version';
                kindEl.innerHTML = `<span style="font-size:12px;opacity:.7;">📄 ${escapeHtml(WebI18n.t(kindKey))}</span>`;
                stage.appendChild(kindEl);
            }

            /* ---------- 版本比对 ---------- */
            const importVersion = data?.version || null;
            const myVersion = VERSION_INFO.version;
            if (importVersion) {
                const vEl = document.createElement('div');
                vEl.className = 'hoj-ie-version';
                let color, text;
                if (cmpVersion(importVersion, myVersion) < 0) {
                    color = '#ED4014';
                    text  = WebI18n.t('ie.versionOld', { v: importVersion, cur: myVersion });
                } else if (cmpVersion(importVersion, myVersion) > 0) {
                    color = '#E6A23C';
                    text  = WebI18n.t('ie.versionNew', { v: importVersion, cur: myVersion });
                } else {
                    color = '#67C23A';
                    text  = WebI18n.t('ie.versionSame', { cur: myVersion });
                }
                vEl.innerHTML = `<span style="color:${color};font-size:12px;">${escapeHtml(text)}</span>`;
                stage.appendChild(vEl);
            }

            /* ---------- 忽略项 ---------- */
            if (ignored > 0) {
                const iEl = document.createElement('div');
                iEl.className = 'hoj-ie-version';
                iEl.innerHTML = `<span style="font-size:12px;opacity:.6;">${escapeHtml(WebI18n.t('ie.ignoredCount', { n: ignored }))}</span>`;
                stage.appendChild(iEl);
            }

            const state = {
                keys: new Set(Object.keys(accepted)),
                favorites: incomingFavorites.length > 0
            };

            /* ---------- 预设 ---------- */
            const presetRow = document.createElement('div');
            presetRow.className = 'hoj-ie-presets';
            presetRow.innerHTML = `
            <button type="button" class="hoj-ie-preset active" data-preset="all"></button>
            <button type="button" class="hoj-ie-preset" data-preset="smart"></button>
            <button type="button" class="hoj-ie-preset" data-preset="better"></button>
            <button type="button" class="hoj-ie-preset" data-preset="favorites"></button>
            <button type="button" class="hoj-ie-preset" data-preset="snippet"></button>
        `;
            presetRow.querySelector('[data-preset="all"]').textContent       = WebI18n.t('ie.presetAll');
            presetRow.querySelector('[data-preset="smart"]').textContent     = WebI18n.t('ie.presetSmart');
            presetRow.querySelector('[data-preset="better"]').textContent    = WebI18n.t('ie.presetBetter');
            presetRow.querySelector('[data-preset="favorites"]').textContent = WebI18n.t('ie.presetFavorites');
            presetRow.querySelector('[data-preset="snippet"]').textContent   = WebI18n.t('ie.presetSnippet');
            stage.appendChild(presetRow);

            /* ---------- 列表 ---------- */
            const listEl = document.createElement('div');
            listEl.className = 'hoj-ie-list';
            stage.appendChild(listEl);

            /* ---------- 底部 ---------- */
            const footer = document.createElement('div');
            footer.className = 'hoj-ie-footer';
            const importBtn = document.createElement('button');
            importBtn.type = 'button';
            importBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
            importBtn.textContent = WebI18n.t('ie.importBtn');
            footer.appendChild(importBtn);
            stage.appendChild(footer);

            const renderList = () => {
                listEl.innerHTML = '';
                const acceptedKeys = Object.keys(accepted);

                const grouped = new Map();
                const ungrouped = [];
                acceptedKeys.forEach(k => {
                    const g = findGroupByKey(k);
                    if (g) {
                        if (!grouped.has(g.id)) grouped.set(g.id, []);
                        grouped.get(g.id).push(k);
                    } else ungrouped.push(k);
                });

                CONFIG_GROUPS.forEach(g => {
                    const keys = grouped.get(g.id);
                    if (!keys || !keys.length) return;

                    if (g.id === 'snippet' && keys.includes('Snippets')) {
                        const tipEl = document.createElement('div');
                        tipEl.className = 'hoj-ie-note';
                        const existingCount = getSnippets().length;
                        const incomingCount = Array.isArray(accepted.Snippets) ? accepted.Snippets.length : 0;
                        const existingIds = new Set(getSnippets().map(s => s && s.id).filter(Boolean));
                        const newCount = (accepted.Snippets || [])
                        .filter(s => s && s.id && !existingIds.has(s.id)).length;
                        tipEl.textContent = WebI18n.t('ie.snippetMergeTip', {
                            exist: existingCount,
                            add: newCount,
                            upd: incomingCount - newCount
                        });
                        listEl.appendChild(tipEl);
                    }

                    const groupTitle = WebI18n.t(`group.${g.id}`);
                    listEl.appendChild(_buildConfigGroup(groupTitle, keys, state.keys, renderList, accepted));
                });
                if (ungrouped.length) {
                    listEl.appendChild(_buildConfigGroup(WebI18n.t('group.other'), ungrouped, state.keys, renderList, accepted));
                }

                /* ---------- 收藏 ---------- */
                if (incomingFavorites.length) {
                    const existingIds = new Set(getFavorites().map(f => String(f.problemId)));
                    const newCount = incomingFavorites.filter(
                        f => f && f.problemId !== undefined && f.problemId !== null
                        && !existingIds.has(String(f.problemId))
                    ).length;

                    const favEl = document.createElement('div');
                    favEl.className = 'hoj-ie-group';
                    favEl.innerHTML = `
                    <div class="hoj-ie-group-header">
                        <label class="hoj-ie-group-check">
                            <input type="checkbox" ${state.favorites ? 'checked' : ''}>
                        </label>
                        <span class="hoj-ie-group-name"></span>
                        <span class="hoj-ie-group-count"></span>
                    </div>
                `;
                    favEl.querySelector('.hoj-ie-group-name').textContent  = WebI18n.t('ie.favorites');
                    favEl.querySelector('.hoj-ie-group-count').textContent = WebI18n.t('ie.favCountNew', {
                        n: incomingFavorites.length,
                        added: newCount
                    });
                    favEl.querySelector('input').addEventListener('change', (e) => {
                        state.favorites = e.target.checked;
                    });
                    listEl.appendChild(favEl);
                }
            };

            presetRow.addEventListener('click', (e) => {
                const btn = e.target.closest('.hoj-ie-preset');
                if (!btn) return;
                presetRow.querySelectorAll('.hoj-ie-preset').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const preset = btn.dataset.preset;
                state.keys = presetToKeys(preset, Object.keys(accepted));
                state.favorites = presetIncludesFavorites(preset) && incomingFavorites.length > 0;
                renderList();
            });

            importBtn.addEventListener('click', () => {
                if (!state.keys.size && !state.favorites) {
                    NewAlert('@ie.selectAtLeastOne', 'warning');
                    return;
                }

                let applied = 0;
                let snippetAdded = 0, snippetUpdated = 0;
                state.keys.forEach(k => {
                    if (k === 'Snippets') {
                        const r = mergeSnippetsInto(getSnippets(), accepted[k]);
                        config[k] = r.list;
                        snippetAdded = r.added;
                        snippetUpdated = r.updated;
                    } else {
                        config[k] = accepted[k];
                    }
                    applied++;
                });
                saveConfig(config);

                let favAdded = 0;
                if (state.favorites && incomingFavorites.length) {
                    const cur = getFavorites();
                    const existingIds = new Set(cur.map(f => String(f.problemId)));
                    incomingFavorites.forEach(f => {
                        if (!f || f.problemId === undefined || f.problemId === null) return;
                        const pid = String(f.problemId).trim();
                        if (!pid || existingIds.has(pid)) return;
                        cur.push({
                            problemId: pid,
                            title: typeof f.title === 'string' ? f.title : pid,
                            href:  typeof f.href  === 'string' ? f.href  : `/problem/${pid}`,
                            addedAt: typeof f.addedAt === 'number' ? f.addedAt : Date.now()
                        });
                        existingIds.add(pid);
                        favAdded++;
                    });
                    saveFavorites(cur);
                }

                try {
                    injectCss();
                    applyBackground(config);
                    applySmoothClasses();
                    syncMemorizingFont();
                    initCardGlow();
                    initAllTools();
                } catch (e) {
                    console.warn('[Import] 应用配置出错:', e);
                }

                if (settingsPanel) {
                    settingsPanel.querySelectorAll('[data-key]').forEach(el => {
                        const key = el.dataset.key;
                        if (el.type === 'checkbox') el.checked = !!config[key];
                        else el.value = config[key] ?? '';
                        el.dispatchEvent(new Event('input'));
                    });
                }

                const parts = [];
                parts.push(WebI18n.t('ie.importedKeysPart', { n: applied }));
                if (snippetAdded || snippetUpdated) {
                    const seg = [];
                    if (snippetAdded)   seg.push(WebI18n.t('ie.importedSnippetAdd', { n: snippetAdded }));
                    if (snippetUpdated) seg.push(WebI18n.t('ie.importedSnippetUpd', { n: snippetUpdated }));
                    parts.push(WebI18n.t('ie.importedSnippetPart', { seg: seg.join(' / ') }));
                }
                if (favAdded > 0) parts.push(WebI18n.t('ie.importedFavPart', { n: favAdded }));

                NewAlert(WebI18n.t('ie.importedSummary', { parts: parts.join(', ') }), 'success', 3500);
                scheduleApplyNavbarLayout(100);
                getTagfromRemote();
                dialog.close();
            });

            renderList();
        };

        /* ---------- 文件读取 ---------- */
        fileInput.addEventListener('change', async () => {
            const file = fileInput.files && fileInput.files[0];
            if (!file) return;
            fileInput.value = '';
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                showStage2(data, file.name);
            } catch (e) {
                NewAlert(WebI18n.t('ie.parseFailed', { msg: e.message }), 'error');
            }
        });

        showStage1();
    }
    // New: Auto Update
    function cmpVersion(a, b) {
        const pa = String(a).split('.').map(n => parseInt(n, 10) || 0);
        const pb = String(b).split('.').map(n => parseInt(n, 10) || 0);
        const len = Math.max(pa.length, pb.length);
        for (let i = 0; i < len; i++) {
            const va = pa[i] ?? 0;
            const vb = pb[i] ?? 0;
            if (va !== vb) return va < vb ? -1 : 1;
        }
        return 0;
    }
    async function checkScriptUpdate() {
        const LOCAL = VERSION_INFO;
        try {
            const resp = await fetch('https://betterhoj.rkcd.me/latest', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!resp.ok) {
                console.warn('[Update] 获取远程版本失败:', resp.status);
                return;
            }
            const remote = await resp.json();
            if (!remote || !remote.version) return;

            // 版本没变化 → 跳过
            if (cmpVersion(remote.version, LOCAL.version) <= 0) {
                console.log('[Update] 当前已是最新版本:', LOCAL.version);
                return;
            }

            // 计算 count 差值
            const countDiff = Math.abs((remote.count ?? 0) - (LOCAL.count ?? 0));

            // 根据差值决定弹窗类型
            const dialogType = countDiff < 3 ? 'warning' : 'error';

            // 拼接 changelog HTML
            let changelogHtml = '';
            if (Array.isArray(remote.changelog) && remote.changelog.length) {
                changelogHtml = '<ul style="margin:8px 0 0 18px;padding:0;">'
                    + remote.changelog.map(item => `<li>${item}</li>`).join('')
                    + '</ul>';
            }


            const html = `
    <div>${WebI18n.t('update.current')}：<b>${LOCAL.version}</b>（${LOCAL.name}）</div>
    <div>${WebI18n.t('update.latest')}：<b>${remote.version}</b>（${remote.name}）</div>
    <div>${WebI18n.t('update.date')}：${remote.date || '-'}</div>
    <div>${WebI18n.t('update.changelog')}：</div>
    ${changelogHtml || `<div>${WebI18n.t('update.noChangelog')}</div>`}
    <div style="color:...">
        ${countDiff < 3
            ? WebI18n.t('update.normal')
            : WebI18n.t('update.urgent')}
    </div>
`;

            const ok = await NewDialog({
                title: '@update.available',
                html,
                type: dialogType,
                confirmText: '@update.gotoDownload',
                cancelText: '@update.later',
                closeOnMask: false
            });

            if (ok && remote.downloadUrl) {
                console.log('[Update] 跳转到下载页面:', remote.downloadUrl);
                unsafeWindow.open(remote.downloadUrl, '_blank');
            }
        } catch (e) {
            console.warn('[Update] 检查更新出错:', e);
        }
    }

    /** 安全绑定：元素存在才绑定，避免 querySelector 返回 null 抛错 */
    function bindClick(panel, selector, handler) {
        const el = panel.querySelector(selector);
        if (el) el.addEventListener('click', handler);
        return el;
    }
    /* =========================================================
     * 构建 CSS 变量
     * BuiltinStyle=Default, DarkMode=off 时的默认预设
     * ========================================================= */
    function buildVars(cfg) {
        const enabled = !!cfg.Open;
        const isDark   = enabled && !!cfg.DarkMode;
        const isLG     = enabled && !!cfg.LiquidGlassUI;
        const isDarkLG = isDark && isLG;

        // 模式键：普通=N，液态玻璃=L，深色=D，深色+玻璃=DL
        const mode = isDarkLG ? 'DL' : isDark ? 'D' : isLG ? 'L' : 'N';

        // 每个变量的四套默认值
        const T = {
            cardBg:           { N:'#FFFFFFB0', L:'#FFFFFF4A', D:'#37373FB0', DL:'#37373F6A' },
            cardBlur:         { N:'20px',      L:'10px',      D:'20px',      DL:'10px' },
            cardRadius:       { N:'15px',      L:'15px',      D:'15px',      DL:'15px' },

            listBg:           { N:'transparent', L:'transparent', D:'transparent', DL:'transparent' },
            listBgGreen:      { N:'#E6FFDF60', L:'#E6FFDF60', D:'#E6FFDF60', DL:'#E6FFDF60' },
            listBgHover:      { N:'#FFFFFF60', L:'#FFFFFF60', D:'#37373F60', DL:'#37373F60' },

            codeBg:           { N:'#FFFFFFB0', L:'#FFFFFF4A', D:'#37373FB0', DL:'#37373F6A' },
            codeRadius:       { N:'10px',      L:'10px',      D:'10px',      DL:'10px' },

            inputBg:          { N:'#FFFFFFB0', L:'#FFFFFF4A', D:'#37373FB0', DL:'#37373F6A' },
            inputRadius:      { N:'10px',      L:'10px',      D:'10px',      DL:'10px' },

            btnBg:            { N:'#FFFFFFB0', L:'#FFFFFF4A', D:'#37373FB0', DL:'#37373F6A' },
            btnBgHover:       { N:'#FFFFFFD0', L:'#FFFFFF4A', D:'#37373FD0', DL:'#37373F6A' },
            btnBgActive:      { N:'#409EFF',   L:'#409EFF',   D:'#409EFF',   DL:'#409EFF' },
            btnRadius:        { N:'6px',       L:'6px',       D:'6px',       DL:'6px' },

            tagRadius:        { N:'6px',       L:'6px',       D:'6px',       DL:'6px' },
            tooltipBg:        { N:'#FFFFFFB0', L:'#FFFFFF4A', D:'#37373FB0', DL:'#37373F6A' },
            tooltipRadius:    { N:'10px',      L:'10px',      D:'10px',      DL:'10px' },
            judgeRadius:      { N:'10px',      L:'10px',      D:'10px',      DL:'10px' },

            textDark:         { N:'#24292E',   L:'#24292E',   D:'#FFFFFF',   DL:'#FFFFFF' },
            textDarkDisabled: { N:'#24292EB0', L:'#24292EB0', D:'#FFFFFFB0', DL:'#FFFFFFB0' },
            textLight:        { N:'#FFFFFF',   L:'#FFFFFF',   D:'#24292E',   DL:'#24292E' },
            textBlue:         { N:'#0B459B',   L:'#0B459B',   D:'#409EFF',   DL:'#409EFF' },
            textLink:         { N:'#0B459B',   L:'#0B459B',   D:'#409EFF',   DL:'#409EFF' },
            selectText:       { N:'#3498DB60', L:'#3498DB60', D:'#3498DB60', DL:'#3498DB60' },
        };

        // 用户明确设置了值 → 用用户值；否则按当前模式从表里取
        const pick = (user, key) =>
        (user && user !== 'Default') ? user : T[key][mode];

        const v = {
            '--hoj-card-bg':            pick(cfg.CardBackground,       'cardBg'),
            '--hoj-card-blur':          pick(cfg.CardBlurRadius,       'cardBlur'),
            '--hoj-card-radius':        pick(cfg.CardRadius,           'cardRadius'),

            '--hoj-list-bg':            pick(cfg.ListBackground,       'listBg'),
            '--hoj-list-bg-green':      pick(cfg.ListBackgroundGreen,  'listBgGreen'),
            '--hoj-list-bg-hover':      pick(cfg.ListBackgroundHover,  'listBgHover'),

            '--hoj-code-bg':            pick(cfg.CodeBlockBackground,  'codeBg'),
            '--hoj-code-radius':        pick(cfg.CodeBlockRadius,      'codeRadius'),

            '--hoj-input-bg':           pick(cfg.InputAreaBackground,  'inputBg'),
            '--hoj-input-radius':       pick(cfg.InputAreaRadius,      'inputRadius'),

            '--hoj-button-bg':          pick(cfg.ButtonBackground,         'btnBg'),
            '--hoj-button-bg-hover':    pick(cfg.ButtonBackgroundHover,    'btnBgHover'),
            '--hoj-button-bg-active':   pick(cfg.ButtonBackgroundActive,   'btnBgActive'),
            '--hoj-button-radius':      pick(cfg.ButtonRadius,             'btnRadius'),

            '--hoj-tag-radius':         pick(cfg.TagRadius,                'tagRadius'),
            '--hoj-tooltip-bg':         pick(cfg.TooltipBackground,        'tooltipBg'),
            '--hoj-tooltip-radius':     pick(cfg.TooltipRadius,            'tooltipRadius'),
            '--hoj-judge-radius':       pick(cfg.JudgeDetailBlockRadius,   'judgeRadius'),

            '--hoj-text-dark':          pick(cfg.TextDark,          'textDark'),
            '--hoj-text-dark-disabled': pick(cfg.TextDarkDisabled,  'textDarkDisabled'),
            '--hoj-text-light':         pick(cfg.TextLight,         'textLight'),
            '--hoj-text-blue':          pick(cfg.TextBlue,          'textBlue'),
            '--hoj-text-link':          pick(cfg.TextLink,          'textLink'),
            '--hoj-select-text':        pick(cfg.SelectText,        'selectText'),

            '--hoj-sans-font': (cfg.SansFont && cfg.SansFont !== 'Default')
            ? cfg.SansFont : '"Noto Sans SC", sans-serif',
            '--hoj-mono-font': (cfg.MonoFont && cfg.MonoFont !== 'Default')
            ? cfg.MonoFont : '"Fira Code", monospace',

            // 以下变量不在用户配置里，按模式自动切换
            '--hoj-bg-color':           isDark ? '#27272F' : '#F8F8F9',
            '--hoj-lg-card-bg':         pick(cfg.CardBackground,       'cardBg'),
            '--hoj-hpm-card-bg':        isDark ? '#373747EE' : '#FFFFFFEE',
            '--hoj-scrollbar-bg':       isDark ? '#444' : '#BBB',
            '--hoj-scrollbar-bg-hover': isDark ? '#666' : '#999',
        };

        return v;
    }

    /* =========================================================
     * 三、核心 CSS（完整复刻 UserCSS）
     * ========================================================= */
    const CORE_CSS = `
/* ============ 全局背景 ============ */
body {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: var(--hoj-bg-color) !important;
}

/* ============ 主体容器 ============ */
div#oj-content { height: 100%; }
div#oj-content:not(:has(.problem-body)) { margin: 35px 7% 0 7%; padding: 0; }

/* ============ 卡片 ============ */
div.el-card, .el-tabs--border-card, *[class*="bg-white"],.glass-card {
  border: 0;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background: none;
  border-radius: var(--hoj-card-radius);
}
div.el-card::before, .el-tabs--border-card::before, *[class*="bg-white"]::before, .glass-card::before {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: -1;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1.35);
  border-radius: inherit;
}
@layer hoj-fallback {
  div.el-card, .el-tabs--border-card, .glass-card, *[class*="bg-white"] {
    position: relative;
  }
}

/* ============ iframe ============ */
iframe {
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 0;
}
iframe[src="https://oi-wiki.org/"] { height: 100%; }

/* ============ echarts 图表信息框 ============ */
.echarts > div:nth-child(2):not(.el-loading-mask):not(:empty) {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  color: var(--hoj-text-dark) !important;
  border-radius: var(--hoj-card-radius);
  padding: 5px 8px !important;
}

/* ============ 全局字体 ============ */
*:not(pre, pre *, code, code *, .CodeMirror *, textarea, i, .katex, .katex *, [class*=" el-icon-"], [class^="el-icon-"], [class^="example-"] pre, .tex-formula, .tex-span) {
  font-family: var(--hoj-sans-font) !important;
}
pre, pre *, code, code *, .CodeMirror *, textarea, [class^="example-"] pre {
  font-family: var(--hoj-mono-font) !important;
}

/* ============ 链接 ============ */
a[href^='http'], a[href^='/'] { color: var(--hoj-text-link) !important; }
a[href^='http']:hover, a[href^='/']:hover, a.entry:hover { color: var(--hoj-text-link) !important; }

/* ============ 下划线动画 ============ */
a[href^='http'], a[href^='/'], a.entry {
  position: relative;
  border: 0 !important;
}
a[href^='http']::before, a[href^='/']::before, a.entry::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  height: 1px;
  background-color: var(--hoj-text-blue);
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
a[href^='http']:hover, a[href^='/']:hover, a.entry:hover {
  border: 0 !important;
  text-decoration: none;
}
a[href^='http']:hover::before, a[href^='/']:hover::before, a.entry:hover::before {
  left: 0; right: 0;
}

/* ============ 加载框 ============ */
.el-loading-mask {
  background: transparent;
}
.el-loading-mask::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background: transparent;
  backdrop-filter: blur(var(--hoj-card-blur));
}

/* ============ 表格边框 ============ */
.vxe-table.border--default .vxe-body--column, .vxe-table.border--default .vxe-footer--column,
.vxe-table.border--default .vxe-header--column, .vxe-table.border--inner .vxe-body--column,
.vxe-table.border--inner .vxe-footer--column, .vxe-table.border--inner .vxe-header--column {
  background-image: linear-gradient(#E8EAEC80, #E8EAEC80);
  background-size: 100% 1px;
}

/* ============ 提示框 ============ */
.el-tooltip__popper div.popper__arrow, .el-tooltip__popper .vxe-table--tooltip-arrow,
.vxe-table--tooltip-wrapper div.popper__arrow, .vxe-table--tooltip-wrapper .vxe-table--tooltip-arrow {
  display: none !important;
}
.el-tooltip__popper, .vxe-table--tooltip-wrapper {
  background: var(--hoj-tooltip-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  color: var(--hoj-text-dark) !important;
  border: none !important;
  border-radius: var(--hoj-tooltip-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

/* ============ 滚动条 ============ */
::-webkit-scrollbar { background: transparent; width: 8px; height: 8px; box-shadow: none; }
::-webkit-scrollbar-thumb {
  background: var(--hoj-scrollbar-bg); border-radius: 8px;
  border: 2px solid transparent; background-clip: padding-box;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--hoj-scrollbar-bg-hover); border-radius: 8px;
  border: 2px solid transparent; background-clip: padding-box;
}
::-webkit-scrollbar-corner { background: transparent; }

/* ============ 选中文字 ============ */
::selection { background: var(--hoj-select-text); }

/* ============ 平滑滚动 ============ */
html.hoj-smooth-scroll, html.hoj-smooth-scroll body { scroll-behavior: smooth; }

/* ============ 平滑页面过渡 ============ */
@view-transition { navigation: auto; }
html.hoj-smooth-switch::view-transition-group(*) {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

/* ============ 导航栏 ============ */
div#header[data-v-35116184], div#header[data-v-4a46c6f6] {
  background: transparent;
  box-shadow: none;
}
.el-menu.el-menu--horizontal {
  margin: 15px 7% 10px 7%;
  background: none !important;
  border: 0;
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  position: relative;
}
.el-menu.el-menu--horizontal::before {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: -1;
  inset: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: inherit;
}
.el-menu .el-menu-item[data-v-35116184]:hover, .el-menu .el-menu-item i[data-v-35116184]:hover,
.el-menu--horizontal .el-menu .el-menu-item[data-v-35116184]:hover,
.el-submenu[data-v-35116184] .el-submenu__title:hover,
.el-submenu.is-active[data-v-35116184], .el-menu .el-menu-item.is-active[data-v-35116184],
.el-menu .el-menu-item.is-active i[data-v-35116184],
.el-menu.el-menu--popup.el-menu--popup-bottom-start li,
.el-menu .el-menu-item[data-v-4a46c6f6]:hover, .el-menu .el-menu-item i[data-v-4a46c6f6]:hover,
.el-menu--horizontal .el-menu .el-menu-item[data-v-4a46c6f6]:hover,
.el-submenu[data-v-4a46c6f6] .el-submenu__title:hover,
.el-submenu.is-active[data-v-4a46c6f6], .el-menu .el-menu-item.is-active[data-v-4a46c6f6],
.el-menu .el-menu-item.is-active i[data-v-4a46c6f6],
.el-menu.el-menu--popup.el-menu--popup-bottom-start li, .el-submenu .el-submenu__title:hover i[data-v-35116184] {
  background: 0 !important;
}
.el-menu .el-menu-item[data-v-35116184] i, .el-menu .el-menu-item[data-v-4a46c6f6] i {
  background: 0 !important;
}
.el-menu.el-menu--popup.el-menu--popup-bottom-start {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin-top: 0;
}
.el-menu--horizontal, .el-zoom-in-top-enter-active, .el-zoom-in-top-leave-active {
  border-radius: var(--hoj-card-radius);
}
/* 下划线动画（导航栏） */
.el-menu-item[data-v-35116184]:not(.is-active), .el-menu-item[data-v-4a46c6f6]:not(.is-active) {
  position: relative;
  border: 0 !important;
}
.el-menu-item[data-v-35116184]:not(.is-active)::before,
.el-menu-item[data-v-4a46c6f6]:not(.is-active)::before {
  content: '';
  position: absolute; bottom: 0; left: 50%; right: 50%; height: 2px;
  background-color: #409EFF;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.el-menu-item[data-v-35116184]:not(.is-active):hover,
.el-menu-item[data-v-4a46c6f6]:not(.is-active):hover { border: 0 !important; }
.el-menu-item[data-v-35116184]:not(.is-active):hover::before,
.el-menu-item[data-v-4a46c6f6]:not(.is-active):hover::before { left: 0; right: 0; }
.el-menu--horizontal > * > .el-dropdown-link { color: var(--hoj-text-blue) !important; }
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover { color: var(--hoj-text-blue); }
.el-tabs__item { transition: color 0.2s ease-out; }
.mobile-nav, .mu-popover { background: var(--hoj-card-bg); backdrop-filter: blur(var(--hoj-card-blur)); color: var(--hoj-text-dark); }
.mu-paper { background: var(--hoj-card-bg); backdrop-filter: blur(var(--hoj-card-blur)); }
.mu-appbar { background: none; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.mu-paper { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.mu-popover { border-radius: var(--hoj-card-radius); box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }

/* ============ 主页 ============ */
.panel-title { color: var(--hoj-text-dark); }
img.el-image__inner { border-radius: var(--hoj-card-radius); }
.el-carousel__item { border-radius: var(--hoj-card-radius); display: flex; justify-content: center; align-items: center; }
.vxe-table.border--inner .vxe-table--header-wrapper,
.vxe-table.border--none .vxe-table--header-wrapper,
.vxe-table--body-wrapper.body--wrapper,
.vxe-table .vxe-body--row.row--stripe,
.vxe-table--header-wrapper.body--wrapper,
.vxe-table.border--default .vxe-table--header-wrapper,
.vxe-table.border--full .vxe-table--header-wrapper,
.vxe-table.border--outer .vxe-table--header-wrapper { background: 0 !important; }
.vxe-table[data-v-74461b8a], .vxe-table[data-v-4401646e], .vxe-table[data-v-51e8bf1a], .vxe-table[data-v-7a1f5b36], .vxe-table[data-v-01aa6788], .vxe-table[data-v-113ebaae] {
  border: none !important;
  background: var(--hoj-list-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
span.rank-tag { border-radius: var(--hoj-tag-radius); }
span.rank-tag:not(.no1, .no2, .no3) {
  background: var(--hoj-button-bg);
  color: var(--hoj-text-dark);
}
span.cite { display: none !important; }
.announcements-container li[data-v-931546ae] {
  background: var(--hoj-card-bg); border: 0;
  border-radius: var(--hoj-card-radius);
}
canvas { background: transparent; }
[data-v-35116184] .el-dialog, [data-v-4a46c6f6] .el-dialog {
  border-radius: var(--hoj-card-radius);
}
.el-backtop {
  z-index: 1501; border-radius: 50%;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
}
.el-backtop:hover { background: var(--hoj-button-bg-hover) !important; backdrop-filter: blur(var(--hoj-card-blur)); }

/* ============ 题目 ============ */
input.vxe-input--inner {
  border: 0 !important;
  background: var(--hoj-input-bg) !important;
  border-radius: var(--hoj-input-radius);
}
.el-collapse-item__header, .el-collapse { border: 0; border-radius: var(--hoj-button-radius); }
.el-collapse-item__header { padding-left: 10px; }
button#pick-one { border-radius: var(--hoj-button-radius); border: 0; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.el-pagination__total { color: var(--hoj-text-light); }
.el-pagination__jump { color: var(--hoj-text-light); }
.el-input.el-pagination__editor.is-in-pagination > .el-input__inner {
  border: 0;
  background: var(--hoj-input-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-input-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.btn-prev, .btn-next {
  border: 0;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-button-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.btn-prev .el-icon.el-icon-arrow-left, .btn-next .el-icon.el-icon-arrow-right { color: var(--hoj-text-dark); }
.btn-prev[disabled] .el-icon.el-icon-arrow-left, .btn-next[disabled] .el-icon.el-icon-arrow-right { color: var(--hoj-text-dark-disabled); }
.el-pager > .number:not(.active), .el-pager > .el-icon.more.btn-quicknext,
.el-pager > .el-icon.more.btn-quickprev, .el-pager > .el-icon.more.btn-quicknext:hover,
.el-pager > .el-icon.more.btn-quickprev:hover {
  border: 0;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-button-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  color: var(--hoj-text-dark) !important;
}
.el-pager > .number.active {
  border: 0;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-button-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-input.el-input--mini.el-input--suffix > .el-input__inner {
  border: 0;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-button-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-select__caret.el-input__icon.el-icon-arrow-up { color: var(--hoj-text-dark); }
.el-tabs.el-tabs--top.el-tabs--border-card > .el-tabs__header.is-top,
.el-tabs__nav-wrap.is-top { background: 0 !important; border: 0 !important; backdrop-filter: none !important; }
.el-tabs--border-card > .el-tabs__header .el-tabs__item { border-radius: var(--hoj-card-radius); margin: 0 !important; }
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background: var(--hoj-card-bg); border: 0;
}
.dataNav .dataNavNext, .dataNav .dataNavPrev {
  background: var(--hoj-button-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
}
.dataNav .dataNavNext:hover i, .dataNav .dataNavPrev:hover i {
  color: var(--hoj-button-bg-active); font-weight: 800;
}
.question-intr[data-v-1c61011a], .question-intr[data-v-dbad109e] {
  background: var(--hoj-card-bg) !important;
  border: 0;
  border-radius: var(--hoj-card-radius);
}
.markdown-body img { background: none !important; }
.el-progress-bar__outer {
  background: var(--hoj-card-bg);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1) inset;
}
.filter-item { border-radius: var(--hoj-button-radius); }
.el-tag--plain, .el-tag:not([class*="oi-"]) {
  border: 0;
  margin-bottom: 3px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-tag--dark { border: 0; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.el-popover {
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  background: var(--hoj-card-bg) !important;
  border-radius: var(--hoj-card-radius);
}
.el-popper .popper__arrow { display: none; }
pre[data-v-1c61011a], pre[data-v-dbad109e], .markdown-body code:not(.markdown-body pre code) {
  background: var(--hoj-code-bg) !important;
  border: 0 !important;
  border-radius: var(--hoj-code-radius);
}
.el-button:not(.is-round:not(.el-button--default), #js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-14.el-col-lg-14 > button, .el-button--danger, .el-button--warning, .el-button--success, .el-button--primary, .el-button--text, .el-button--info) {
  background: var(--hoj-button-bg);
  border-radius: var(--hoj-button-radius);
}
.el-button.is-round { border-radius: 100px !important; }
button.right-fold, button.left-fold { border-radius: 50% !important; }
#submit-code.el-card.submit-detail.is-always-shadow { margin-left: 10px; }
.CodeMirror { filter: opacity(0.6); border-radius: var(--hoj-code-radius); }
.el-drawer { background: none; }
.el-drawer__body {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0 !important;
}
.is-light { background: var(--hoj-card-bg) !important; }
.el-input__count { background: transparent !important; }
.el-message-box {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-card-radius);
}
.el-tag.el-tag--medium { border: 0; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10 { margin-top: 1px !important; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10 div > div.el-alert {
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin-bottom: 5px;
}
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10 div > div.el-alert div > p { margin-top: 0; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10:has(> div:nth-child(2):last-child) { display: inline-flex; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10:has(> div:nth-child(2):last-child) > div { margin-right: 10px; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10:has(> div:nth-child(2):last-child) div > div:not(.el-alert--warning) > .el-alert__content { display: none; }
.problem-resize {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 100px;
  width: 6px !important;
  margin-left: 2px;
  margin-right: 2px;
}
.problem-resize span:first-child { opacity: 0; }
.problem-resize span:nth-child(2) > button {
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
}
#problem-left-ProblemDetails { }
@media screen and (max-width: 992px) { #problem-left-ProblemDetails { width: 100% !important; } }
.body[data-v-12264e86] { background: none; }
footer[data-v-12264e86] { background: none; }
footer[data-v-12264e86]:hover { background: var(--hoj-card-bg); }
.el-button--primary.is-plain {
  background: var(--hoj-button-bg) !important;
  border: none;
}
.el-button--primary.is-plain:hover { background: var(--hoj-button-bg-hover) !important; border: none; }
.el-message {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-card-radius);
}

/* ============ 训练 ============ */
.category-item.el-tag {
  border: 0;
  border-radius: var(--hoj-button-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.category-item.el-tag[style*="background-color: rgb(255"][style$="255);"],
.el-tag--plain:not(.active) {
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
}
.row--hover { background: var(--hoj-list-bg-hover) !important; }
#problem-footer[data-v-5cbe8756] { margin: 0; margin-top: 10px; }
.dataNav .dataNavList .dataNavListItem[data-v-5cbe8756] { color: var(--hoj-text-dark); }
.dataNavListItem.is-active[data-v-5cbe8756], .dataNavListItem[data-v-5cbe8756]:hover {
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  background-image: none !important;
}
.el-tabs__header.is-top {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  border: 0;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-tabs__nav-wrap.is-top:after { display: none; }

/* ============ 比赛 ============ */
.el-tabs__nav-wrap.is-top:not(.el-tabs__header.is-top:has(&)) {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
}
.el-tabs__nav-wrap.is-top:not(.el-tabs__header.is-top:has(&)) .el-tabs__item:not(.is-disabled) { color: var(--hoj-text-dark); }
.el-tabs__nav-wrap.is-top:not(.el-tabs__header.is-top:has(&)) .el-tabs__item.is-disabled { color: var(--hoj-text-dark-disabled); }
.el-slider__runway { height: 10px; border-radius: 5px; }
.el-slider__runway > .el-slider__bar { border-radius: 5px; }
.el-slider__runway > .el-slider__button-wrapper > .el-tooltip.el-slider__button { background: 0 !important; border: 0; }
.el-slider__button-wrapper { width: 40px; height: 40px; }
.el-tag[class*="oi-"] { border: 0; border-radius: var(--hoj-button-radius); box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.num-box > span { border-radius: var(--hoj-button-radius); background: var(--hoj-button-bg); backdrop-filter: blur(var(--hoj-card-blur)); }
.el-input-group__append { border: none; background: none; }
.el-input-group__append button {
  margin-top: 0 !important; margin-bottom: 0 !important; border: none;
  border-radius: 0 var(--hoj-input-radius) var(--hoj-input-radius) 0 !important;
}
a.emphasis[data-v-3296db8c], a.emphasis[data-v-41904bfc] { color: var(--hoj-text-dark) !important; }

/* ============ 评测 ============ */
.el-alert[data-v-7a1f5b36] {
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-tooltip__popper.is-dark { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.vxe-table.border--default.show--head.t--animat.t--stripe[data-v-7a1f5b36] {
  padding: 0 !important; border: 0;
  border-radius: var(--hoj-card-radius) !important;
  margin-top: 13px;
}
.el-tooltip.test-detail-item[data-v-2f48b1c2] {
  background: var(--hoj-card-bg);
  border-radius: var(--hoj-judge-radius);
  border-width: 0 0 0 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.own-submit-row { background: var(--hoj-list-bg-green) !important; }

/* ============ 排名 ============ */
.el-card[data-v-74461b8a], .el-card[data-v-4401646e], .el-card[data-v-113ebaae] { margin-bottom: 10px; }
.el-select-dropdown {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-card-radius);
}
.vxe-table .vxe-table--body-wrapper, .vxe-table .vxe-table--footer-wrapper { background: transparent !important; }
.vxe-table[data-v-74461b8a], .vxe-table[data-v-4401646e], .vxe-table[data-v-51e8bf1a], .vxe-table[data-v-7a1f5b36], .vxe-table[data-v-01aa6788], .vxe-table[data-v-113ebaae] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
}
.vue-avatar--wrapper, .user-avatar { transition: transform 0.25s ease-out !important; }
.vue-avatar--wrapper:hover, .user-avatar:hover { transform: scale(1.1); }
.el-select-dropdown > .el-scrollbar > .el-scrollbar__bar.is-horizontal,
.el-select-dropdown > .el-scrollbar > .el-scrollbar__bar.is-vertical { display: none; }
.el-select-dropdown__item.hover { background: transparent; }

/* ============ 讨论 ============ */
.discussion-header[data-v-fce6d0ee] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.category-body[data-v-fce6d0ee] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.category-item[data-v-fce6d0ee]:hover {
  background: var(--hoj-list-bg-hover) !important;
  border-radius: var(--hoj-button-radius);
}
.el-button--primary, .el-button--danger { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); border-radius: var(--hoj-button-radius); }
.title-msg, .title-article .title-msg span a.c999[data-v-13564ee3] { color: var(--hoj-text-dark) !important; }
.container[data-v-13564ee3], .container[data-v-675320b4] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  border: 0;
}
.title-article[data-v-13564ee3], .body-article[data-v-13564ee3] { background: transparent; }
.container[data-v-bbe20b80] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  border: 0;
}
.el-textarea__inner, [data-v-6e9809fa] .el-textarea__inner[readonly] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-input-radius);
}
.loading-text > a { background: 0 !important; color: var(--hoj-text-dark) !important; }
.btn-more:hover { background: 0 !important; color: #007EA8 !important; }
span[title="Super Administrator"], span[title="Administrator"] { border-radius: var(--hoj-tag-radius); box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }

/* ============ 团队 ============ */
.el-input .el-input__count .el-input__count-inner { background: 0; }
.el-input-group__append, .el-input-group__prepend {
  background: var(--hoj-input-bg);
  border: 0;
}
.el-input-group__append { border-radius: var(--hoj-input-radius); }
.el-input-group__prepend { border-radius: var(--hoj-input-radius); }
[data-v-bada3258] .el-card { border-radius: var(--hoj-card-radius) !important; }
.el-col.el-col-17[data-v-bada3258] { padding-left: 5px !important; }
.el-button--mini, .el-button--small { border-radius: var(--hoj-button-radius); box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); border: 0; }
span[data-v-bada3258] { margin-right: 5px; }
.el-dialog {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1.6);
  border-radius: var(--hoj-card-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-dialog.is-fullscreen { margin: 40px; width: calc(100% - 80px); }
.description-body { background: 0 !important; }
.el-card[data-v-3433c614] { background: transparent; }
.list-card { border-radius:  var(--hoj-card-radius) !important; }
.el-pager li.active { color: var(--hoj-text-light); }
.btn-prev, .btn-next { border-radius: var(--hoj-button-radius); }

/* ============ 消息中心 ============ */
.el-tabs.el-tabs--left.el-tabs--border-card { margin-right: 0; }
.el-tabs__header.is-left { background: transparent; border: 0 !important; }
.el-tabs__item.is-left.is-active#tab-DiscussMsg,
.el-tabs__item.is-left.is-active#tab-ReplyMsg,
.el-tabs__item.is-left.is-active#tab-LikeMsg,
.el-tabs__item.is-left.is-active#tab-SysMsg,
.el-tabs__item.is-left.is-active#tab-MineMsg { border-radius: var(--hoj-card-radius); }
.msg-title[data-v-fe517e4e] { border-radius: var(--hoj-card-radius); margin-bottom: 10px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.el-notification, .m-message {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-card-radius);
}

/* ============ 个人主页 ============ */
.el-dropdown-menu {
  border: 0;
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
}
.el-dropdown-menu__item:hover {
  background: var(--hoj-list-bg-hover) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
}
.el-dropdown-menu__item--divided::before { display: none; }
rect[style*="rgb(218"] { fill: rgba(27, 31, 35, 0.1) !important; }
svg.vch__wrapper .vch__days__labels__wrapper text.vch__day__label[data-v-a9cfea66],
svg.vch__wrapper .vch__legend__wrapper text[data-v-a9cfea66],
svg.vch__wrapper .vch__months__labels__wrapper text.vch__month__label[data-v-a9cfea66] { fill: var(--hoj-text-dark); }
.vue-tooltip-theme .tooltip-arrow { display: none; }
.vue-tooltip-theme.tooltip .tooltip-inner {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: var(--hoj-tooltip-radius);
  color: var(--hoj-text-dark);
}
.vue-tooltip-theme.tooltip .tooltip-inner b { color: inherit; }
.signature-body { background: transparent !important; }
.el-tabs__nav.is-top, .el-tabs__item.is-top { border: 0 !important; }
.markdown-body table tr { background: var(--hoj-list-bg) !important; }
.markdown-body[data-v-e762da3c] pre, .markdown-body[data-v-6696830f] pre, .hljs { background: 0 !important; }
.markdown-body pre {
  background: var(--hoj-code-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-code-radius) !important;
  border: 0;
}
.markdown-body pre ol.pre-numbering { background: var(--hoj-code-bg); backdrop-filter: blur(var(--hoj-card-blur)); }
.markdown-body pre i.code-copy { border: 0; border-radius: var(--hoj-button-radius) !important; }
.markdown-body blockquote { background: none; color: var(--hoj-text-dark); border-left-color: #EEE; }
.markdown-body hr { height: 0.1em; }
.markdown-body h2 { border-radius: 0; padding: 0; padding-bottom: .3em; line-height: 1.2; border-bottom: 1px solid #EEE; color: var(--hoj-text-dark); background: none; }
.el-collapse-item__header, .el-card.level-card.is-always-shadow, .el-divider__text.is-center { background: transparent; }
.problem-btn > .el-button--small { box-shadow: none; border: 0; margin: 1px; }
.level-card[data-v-424f832f] { width: calc(55% - .5em); }

/* ============ 个人设置 ============ */
input.el-input__inner, input.vxe-input--inner {
  border: 0;
  background: var(--hoj-input-bg) !important;
  border-radius: var(--hoj-input-radius);
}
input.el-input__inner[disabled], input.vxe-input--inner[disabled] { filter: grayscale(1); }
.el-form-item { margin: 20px; }
[data-v-cab6b016] .el-collapse-item__header { background: transparent; }
.el-collapse-item__wrap { background: transparent; }
[data-v-9109eaf2] .upload-container, .el-upload, .el-upload-dragger { border: 0 !important; }
.el-upload-dragger {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
}

/* ============ Markdown 编辑器 ============ */
.v-note-wrapper, [data-v-6e9809fa] .el-textarea__inner[readonly] {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
}
.v-note-op, .content-input-wrapper, .auto-textarea-wrapper.content-input,
pre.auto-textarea-block, .auto-textarea-input.no-border.no-resize,
.v-show-content.scroll-style.scroll-style-border-radius {
  background: transparent !important;
  backdrop-filter: none !important;
}
.add-image-link-wrapper, .v-show-content-html { background: transparent !important; }
.add-image-link {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  left: 34% !important;
  width: auto !important;
  border-radius: var(--hoj-card-radius) !important;
}
.popup-dropdown {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius) !important;
  border: 0 !important;
}
.dropdown-item { background: var(--hoj-list-bg-hover) !important; }
.op-icon, .op-icon.selected { background: none !important; }
.v-note-help-content { background: var(--hoj-card-bg); backdrop-filter: blur(var(--hoj-card-blur)); border-radius: var(--hoj-card-radius); }
.v-note-help-wrapper .v-note-help-content .v-note-help-show { background: 0; }
.add-image-link-wrapper .add-image-link .input-wrapper[data-v-548e2160] { border: 0; }
.add-image-link-wrapper .add-image-link .input-wrapper input[data-v-548e2160] {
  background: var(--hoj-card-bg);
  border-radius: var(--hoj-card-radius);
  width: 100%;
  margin-left: 0;
  padding: 0 8px;
}
.op-btn { border-radius: var(--hoj-button-radius) !important; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.op-btn.cancel { background: var(--hoj-button-bg); }
.op-header.popup-dropdown {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius:  var(--hoj-card-radius) !important;
}

/* ============ 代码高亮（github 浅色） ============ */
.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}
.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}
.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}
.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}
.hljs-built_in,.hljs-symbol{color:#e36209}
.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}
.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}
.hljs-subst{color:#24292e}
.hljs-section{color:#005cc5;font-weight:700}
.hljs-bullet{color:#735c0f}
.hljs-emphasis{color:#24292e;font-style:italic}
.hljs-strong{color:#24292e;font-weight:700}
.hljs-addition{color:#22863a;background-color:#f0fff4}
.hljs-deletion{color:#b31d28;background-color:#ffeef0}

/* ============ 简介 ============ */
.container .content pre[data-v-69fec1be] {
  background: var(--hoj-code-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-code-radius);
}

/* ============ 后台 ============ */
#admin-content, .admin-container, .breadcrumb-container[data-v-07a5bb4c] { background: 0 !important; }
.login-container {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1) !important;
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius) !important;
  border: none !important;
}
#header {
  background: 0 !important;
}
 .el-menu:not(.el-menu--inline) {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 0;
}
.el-menu--inline { background: 0; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.el-menu-item:hover, .el-submenu__title:hover, .el-menu-item.is-active { background: var(--hoj-list-bg-hover) !important; }
.el-menu .el-menu-item:hover i[data-v-35116184], .el-menu .el-submenu__title i[data-v-35116184]{
   background: 0!important;
}
.el-button.el-button--primary.is-plain:hover {
   color: black !important;
}
/* ============ 复制 markdown 按钮 ============ */
.el-button--primary.is-plain {
  background: var(--hoj-button-bg) !important;
  border: none;
}
.el-button--primary.is-plain:hover {
  background: var(--hoj-button-bg-hover) !important;
  border: none;
  color: var(--hoj-text-dark);
}

/* ============ 颜色拾取器 ============ */
.el-color-picker__panel {
  border: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
}

/* ============ 日期选择 ============ */
.el-picker-panel {
  border: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
}
.el-picker-panel__footer {
  background: 0;
}

/* ============ 标签选择（自动补全） ============ */
.el-autocomplete-suggestion {
  border: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
}
.el-autocomplete-suggestion li.highlighted,
.el-autocomplete-suggestion li:hover {
  background: var(--hoj-list-bg-hover);
}

/* ============ checkbox ============ */
.el-checkbox__inner {
  border: 0;
  background: var(--hoj-button-bg);
  border-radius: 4px;
}

/* ============ betterhoj ============ */
#hoj-settings-panel {
    background: var(--hoj-card-bg, #FFFFFFE0) !important;
    backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
    -webkit-backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
    color: var(--hoj-text-dark, #24292E);
}
.hoj-tool {
  background: var(--hoj-card-bg, #FFFFFFE0) !important;
  backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
  -webkit-backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
  color: var(--hoj-text-dark, #24292E);
}
#hoj-alert-container .m-message {
   background: #FFFFFFE0;
   backdrop-filter: blur(10px) saturate(1.35);
}
.hoj-dialog {
   background: #FFFFFFE0;
   backdrop-filter: blur(10px) saturate(1.35);
   -webkit-backdrop-filter: blur(10px) saturate(1.35);
}
#hoj-settings-panel input[type="text"],
#hoj-settings-panel input[type="password"],
#hoj-settings-panel input[type="number"],
#hoj-settings-panel select {
    background: var(--hoj-input-bg, #fff) !important;
}
/* ---------- 通用按钮 ---------- */
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button) {
    border-radius: var(--hoj-button-radius, 4px)!important;
    background: var(--hoj-button-bg, transparent)!important;
}
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button):hover {
    background: var(--hoj-button-bg-hover, rgba(0, 0, 0, .06))!important;
}

/* ---------- mini 按钮 ---------- */
#hoj-settings-panel .hoj-mini-btn {
    background: var(--hoj-button-bg, transparent)!important;
}
`;
    /* ============================================================
   LiquidGlassUI — Stylus liquidglass() 的纯 CSS 实现
   仅在 config.LiquidGlassUI === true 时注入
   ============================================================ */
    const HOJ_LIQUIDGLASS_CORE_CSS = `
:root {
  --hoj-lg-blur: blur(10px) saturate(1.35);
  --hoj-lg-shadow:
    0 8px 16px #20268833,
    inset 0px 0px 8px #FFFFFF13,
    inset -3px 3px 3px #FFFFFF0A,
    inset -1px 1px 0px #FFFFFF60,
    inset 1px -1px 0px #FFFFFF30;
}

/* ---------- liquidglass(pseudo=true) ---------- */
html.hoj-lg-active :is(
  div.el-card,
  .el-tabs--border-card,
  *[class*="bg-white"],
  .glass-card,
  .el-popover,
  .el-message-box,
  .el-message,
  .el-select-dropdown,
  .el-dropdown-menu,
  .el-notification,
  .m-message,
  .mobile-nav,
  .mu-popover,
  .mu-paper,
  .discussion-header[data-v-fce6d0ee],
  .el-tabs__header.is-top,
  .el-tabs__nav-wrap.is-top,
  .category-body[data-v-fce6d0ee],
  .container[data-v-bbe20b80],
  .container[data-v-13564ee3],
  .container[data-v-675320b4],
  .v-note-wrapper,
  .v-note-help-content,
  .add-image-link,
  .popup-dropdown,
  .op-header.popup-dropdown,
  .el-upload-dragger,
  .problem-resize,
  .submit-detail,
  .vxe-table[data-v-74461b8a], .vxe-table[data-v-4401646e], .vxe-table[data-v-51e8bf1a], .vxe-table[data-v-7a1f5b36], .vxe-table[data-v-01aa6788], .vxe-table[data-v-113ebaae]
) {
  background: none !important;
  box-shadow: var(--hoj-lg-shadow) !important;
  @layer {
    & {
      position: relative;
    }
  }
}

html.hoj-lg-active :is(
  div.el-card,
  .el-tabs--border-card,
  *[class*="bg-white"],
  .glass-card,
  .el-popover,
  .el-message-box,
  .el-message,
  .el-select-dropdown,
  .el-dropdown-menu,
  .el-dialog,
  .el-notification,
  .m-message,
  .mobile-nav,
  .mu-popover,
  .mu-paper,
  .discussion-header[data-v-fce6d0ee],
  .el-tabs__header.is-top,
  .el-tabs__nav-wrap.is-top,
  .category-body[data-v-fce6d0ee],
  .container[data-v-bbe20b80],
  .container[data-v-13564ee3],
  .container[data-v-675320b4],
  .v-note-wrapper,
  .v-note-help-content,
  .add-image-link,
  .popup-dropdown,
  .op-header.popup-dropdown,
  .el-upload-dragger,
  .problem-resize,
  .submit-detail,
  .vxe-table[data-v-74461b8a], .vxe-table[data-v-4401646e], .vxe-table[data-v-51e8bf1a], .vxe-table[data-v-7a1f5b36], .vxe-table[data-v-01aa6788], .vxe-table[data-v-113ebaae]
)::before {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: -1 !important;
  pointer-events: none !important;
  border-radius: inherit !important;
  background: var(--hoj-lg-card-bg) !important;
  backdrop-filter: var(--hoj-lg-blur) !important;
  box-shadow:0 8px 24px #20268833,inset 0px 0px 10px #FFFFFF1A, inset -3px 3px 4px #FFFFFF10,inset -0.5px 0.5px 0px #FFFFFF60 !important;
}

/* ---------- liquidglass(pseudo=false) ---------- */
html.hoj-lg-active :is(
  .el-tooltip__popper,
  .vxe-table--tooltip-wrapper,
  .vue-tooltip-theme.tooltip .tooltip-inner,
  .echarts > div:nth-child(2):not(.el-loading-mask):not(:empty),
  .el-loading-mask,
  .el-backtop,
  .el-backtop:hover,
  span.rank-tag:not(.no1, .no2, .no3),
  .announcements-container li[data-v-931546ae],
  .el-input.el-pagination__editor.is-in-pagination > .el-input__inner,
  .el-input.el-input--mini.el-input--suffix > .el-input__inner,
  .btn-prev,
  .btn-next,
  .el-pager > .number:not(.active),
  .el-pager > .number.active,
  .el-pager > .el-icon.more.btn-quicknext,
  .el-pager > .el-icon.more.btn-quickprev,
  .dataNav .dataNavNext,
  .dataNav .dataNavPrev,
  .question-intr[data-v-1c61011a],
  .question-intr[data-v-dbad109e],
  .el-progress-bar__outer,
  .problem-resize span:nth-child(2) > button,
  .num-box > span,
  html.hoj-admin .login-container,
  html.hoj-admin #header,
  html.hoj-admin .el-menu:not(.el-menu--inline)
) {
  background: var(--hoj-lg-card-bg) !important;
  backdrop-filter: var(--hoj-lg-blur) !important;
  box-shadow: var(--hoj-lg-shadow) !important;
}

/* 禁用旧的 acrylic backdrop-filter */
html.hoj-lg-active .el-button:not(.is-round:not(.el-button--default),
  #js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-14.el-col-lg-14 > button,
  .el-button--danger, .el-button--warning, .el-button--success,
  .el-button--primary, .el-button--text, .el-button--info) {
  backdrop-filter: none !important;
}

html.hoj-lg-active.hoj-admin .el-tag--dark.el-tag--warning {
  backdrop-filter: blur(0px) saturate(1.35) !important;
}

/* echarts 图表信息框 */
html.hoj-lg-active .echarts > div:nth-child(2):not(.el-loading-mask):not(:empty) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* 加载框 */
html.hoj-lg-active .el-loading-mask::before {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* 提示框 */
html.hoj-lg-active :is(.el-tooltip__popper, .vxe-table--tooltip-wrapper) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* 导航栏 & 下拉菜单 */
html.hoj-lg-active .el-menu.el-menu--horizontal::before,
html.hoj-lg-active .el-menu.el-menu--popup.el-menu--popup-bottom-start {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* 移动端 */
html.hoj-lg-active :is(.mobile-nav, .mu-popover, .mu-paper) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* 回到顶部 */
html.hoj-lg-active :is(.el-backtop, .el-backtop:hover) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* 分页按钮 / 输入框 / 题目导航 / 边栏调整 */
html.hoj-lg-active :is(
  .el-input.el-pagination__editor.is-in-pagination > .el-input__inner,
  .el-input.el-input--mini.el-input--suffix > .el-input__inner,
  .btn-prev, .btn-next,
  .el-pager > .number:not(.active),
  .el-pager > .number.active,
  .el-pager > .el-icon.more.btn-quicknext,
  .el-pager > .el-icon.more.btn-quickprev,
  .dataNav .dataNavNext,
  .dataNav .dataNavPrev,
  .problem-resize,
  .problem-resize span:nth-child(2) > button
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* 抽屉 / 消息框 */
html.hoj-lg-active :is(.el-drawer__body, .el-message-box, .el-message) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* 标签 / 列表项 hover */
html.hoj-lg-active :is(
  .category-item.el-tag[style*="background-color: rgb(255"][style$="255);"],
  .el-tag--plain:not(.active),
  .dataNavListItem.is-active[data-v-5cbe8756],
  .dataNavListItem[data-v-5cbe8756]:hover
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* 二级导航栏 / 讨论容器 / 代码块 / 编辑器 / 后台 */
html.hoj-lg-active :is(
  .el-tabs__header.is-top,
  .discussion-header[data-v-fce6d0ee],
  .category-body[data-v-fce6d0ee],
  .container[data-v-13564ee3],
  .container[data-v-675320b4],
  .container[data-v-bbe20b80],
  .el-textarea__inner,
  [data-v-6e9809fa] .el-textarea__inner[readonly],
  .vue-tooltip-theme.tooltip .tooltip-inner,
  .markdown-body pre,
  .markdown-body pre ol.pre-numbering,
  .v-note-wrapper,
  .add-image-link,
  .popup-dropdown,
  .v-note-help-content,
  .op-header.popup-dropdown,
  .login-container,
  .el-menu:not(.el-menu--inline),
  .el-upload-dragger
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* el-dialog 保留更强的饱和度（原本是 saturate(1.6)） */
html.hoj-lg-active .el-dialog {
  backdrop-filter: blur(10px) saturate(1.6) !important;
}

/* 颜色拾取器 / 日期选择 / 自动补全 */
html.hoj-lg-active :is(
  .el-color-picker__panel,
  .el-picker-panel,
  .el-autocomplete-suggestion
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}
`;
    const HOJ_DARKMODE_CORE_CSS = `

/* ---------- 全局常量 ---------- */
:root {
  --hoj-dm-blur: blur(20px) saturate(1.2);
  --hoj-dm-shadow: 0 2px 12px rgba(0,0,0,.45);
}


/* ---------- 全局色调 ---------- */
html.hoj-dark-mode body {
  color: var(--hoj-text-dark);
  background-color: var(--hoj-bg-color);
}

/* ---------- 通用文字调色 ---------- */
*:not(pre, pre *, code, code *, .CodeMirror *, textarea, i, .katex, .katex *, [class*=" el-icon-"], [class^=el-icon-], [class^=example-] pre, .tex-formula, .tex-span), i, .el-submenu__title i[data-v-35116184], .el-submenu__title i[data-v-4a46c6f6], textarea {
  color: var(--hoj-text-dark) !important;
}

html.hoj-dark-mode i,
html.hoj-dark-mode .el-icon-arrow-down,
html.hoj-dark-mode .el-icon-arrow-right,
html.hoj-dark-mode .el-icon-arrow-left,
html.hoj-dark-mode .el-icon-arrow-up {
  color: var(--hoj-text-dark) !important;
}

/* ---------- 图片调暗 ---------- */
html.hoj-dark-mode img { filter: brightness(.85); }

/* ---------- 各种输入框 ---------- */
html.hoj-dark-mode :is(
  input.el-input__inner,
  input.vxe-input--inner,
  textarea.el-textarea__inner,
  .el-input__inner,
  .CodeMirror
) {
  background: var(--hoj-input-bg) !important;
  color: var(--hoj-text-dark) !important;
  border-color: rgba(255,255,255,.08) !important;
}
/* ---------- 代码块 ---------- */
html.hoj-dark-mode :is(
  .markdown-body pre,
  .hljs,
  pre[data-v-1c61011a],
  pre[data-v-dbad109e]
) {
  background: var(--hoj-code-bg) !important;
  color: var(--hoj-text-dark) !important;
}
html.hoj-dark-mode .markdown-body code:not(.markdown-body pre code) {
  background: var(--hoj-code-bg) !important;
  color: var(--hoj-text-dark);
}
/* ---------- 链接 ---------- */
html.hoj-dark-mode a[href^='http'],
html.hoj-dark-mode a[href^='/'],
html.hoj-dark-mode a.entry {
  color: var(--hoj-text-link) !important;
}

/* ---------- 分隔线 / 边框 ---------- */
html.hoj-dark-mode :is(
  .el-divider,
  .el-divider__text,
  .markdown-body hr
) {
  background-color: rgba(255,255,255,.1) !important;
  border-color: rgba(255,255,255,.1) !important;
  color: var(--hoj-text-dark);
}

/* ---------- 代码高亮（github dark） ---------- */
html.hoj-dark-mode .hljs-doctag,html.hoj-dark-mode .hljs-keyword,html.hoj-dark-mode .hljs-meta .hljs-keyword,html.hoj-dark-mode .hljs-template-tag,html.hoj-dark-mode .hljs-template-variable,html.hoj-dark-mode .hljs-type,html.hoj-dark-mode .hljs-variable.language_{color:#ff7b72}
html.hoj-dark-mode .hljs-title,html.hoj-dark-mode .hljs-title.class_,html.hoj-dark-mode .hljs-title.class_.inherited__,html.hoj-dark-mode .hljs-title.function_{color:#d2a8ff}
html.hoj-dark-mode .hljs-attr,html.hoj-dark-mode .hljs-attribute,html.hoj-dark-mode .hljs-literal,html.hoj-dark-mode .hljs-meta,html.hoj-dark-mode .hljs-number,html.hoj-dark-mode .hljs-operator,html.hoj-dark-mode .hljs-selector-attr,html.hoj-dark-mode .hljs-selector-class,html.hoj-dark-mode .hljs-selector-id,html.hoj-dark-mode .hljs-variable{color:#79c0ff}
html.hoj-dark-mode .hljs-meta .hljs-string,html.hoj-dark-mode .hljs-regexp,html.hoj-dark-mode .hljs-string{color:#a5d6ff}
html.hoj-dark-mode .hljs-built_in,html.hoj-dark-mode .hljs-symbol{color:#ffa657}
html.hoj-dark-mode .hljs-code,html.hoj-dark-mode .hljs-comment,html.hoj-dark-mode .hljs-formula{color:#8b949e}
html.hoj-dark-mode .hljs-name,html.hoj-dark-mode .hljs-quote,html.hoj-dark-mode .hljs-selector-pseudo,html.hoj-dark-mode .hljs-selector-tag{color:#7ee787}
html.hoj-dark-mode .hljs-subst{color:#c9d1d9}
html.hoj-dark-mode .hljs-section{color:#1f6feb;font-weight:700}
html.hoj-dark-mode .hljs-bullet{color:#f2cc60}
html.hoj-dark-mode .hljs-emphasis{color:#c9d1d9;font-style:italic}
html.hoj-dark-mode .hljs-strong{color:#c9d1d9;font-weight:700}
html.hoj-dark-mode .hljs-addition{color:#aff5b4;background-color:#033a16}
html.hoj-dark-mode .hljs-deletion{color:#ffdcd7;background-color:#67060c}
/* 让卡片成为定位上下文，并定义光晕半径 + 初始位置 */
html.hoj-dark-mode :is(
  div.el-card,
  .el-tabs--border-card,
  .el-popover,
  .el-message-box
) {
  --hoj-glow-radius: 200px;
  --hoj-glow-mx: 50%;
  --hoj-glow-my: 50%;
  position: relative;
  isolation: isolate;
}
html.hoj-dark-mode :is(
img, div.el-card,.category-body[data-v-fce6d0ee], .announcements-container li[data-v-931546ae],.el-tabs--border-card,.el-popover,.el-message-box,.el-message,.el-select-dropdown,.el-dropdown-menu,.el-notification,.m-message,.mobile-nav,.mu-popover,.mu-paper,.el-tabs__header.is-top,.el-tabs__nav-wrap.is-top,.container[data-v-bbe20b80],.container[data-v-13564ee3],.container[data-v-675320b4],.v-note-wrapper,.v-note-help-content,.add-image-link,.popup-dropdown,.op-header.popup-dropdown,.el-upload-dragger,.problem-resize
)::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 10;                 /* 关键：足够高，避免被内部元素盖住 */
  pointer-events: none;
  border-radius: inherit;

  /* 全部 var() 都带 fallback —— 任一变量缺失也不会让整条声明作废 */
  background-image:
    radial-gradient(
      circle calc(var(--hoj-glow-radius, 200px) * .32)
        at var(--hoj-glow-mx, 50%) var(--hoj-glow-my, 50%),
      rgba(255, 255, 255, .18) 0%,
      rgba(255, 255, 255, .06) 55%,
      rgba(255, 255, 255, 0) 100%
    ),
    radial-gradient(
      circle var(--hoj-glow-radius, 200px)
        at var(--hoj-glow-mx, 50%) var(--hoj-glow-my, 50%),
      rgba(255, 255, 255, .22) 0%,
      rgba(255, 255, 255, .15) 14%,
      rgba(255, 255, 255, .09) 29%,
      rgba(255, 255, 255, .045) 44%,
      rgba(255, 255, 255, .018) 59%,
      rgba(255, 255, 255, .006) 72%,
      rgba(255, 255, 255, 0) 85%
    );
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity .4s ease;
}

html.hoj-dark-mode .hoj-ripple {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, .35) 0%,
    rgba(255, 255, 255, .18) 30%,
    rgba(255, 255, 255, .06) 60%,
    rgba(255, 255, 255, 0) 85%
  );
  opacity: .9;
  animation: hojRippleExpand 700ms cubic-bezier(.2, .7, .2, 1) forwards;
  z-index: 11;
  mix-blend-mode: screen;
}

@keyframes hojRippleExpand {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: .9;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  html.hoj-dark-mode .hoj-ripple {
    animation-duration: 200ms;
  }
}
/* JS 加上 .hoj-glow-on 时点亮 */
html.hoj-dark-mode .hoj-glow-on::after {
  opacity: 1 !important;
}

@media (prefers-reduced-motion: reduce) {
  html.hoj-dark-mode :is(
    div.el-card,
    .el-tabs--border-card,
    *[class*="bg-white"],
    .glass-card,
    .el-popover,
    .el-message-box
  )::after {
    transition: none;
  }
}
`;
    const HOJ_SHOW_VERSION_CSS =
          `
body::after {
  content: "Smart HOJ 27 Beta 4.6 JavaScript Version";
  position: fixed; top: 0; left: 0; z-index: 9999;
  color: #000; background-color: #fff;
  padding: 0 3px 0 3px; opacity: 0.25; font-size: 10px;
}
`;

    const HOJ_BETTER_NOT_FOUND_CSS =
          `
.container-error-404 {
  background-image: url(https://vjudge.net/static/bundle/b3bb0b0cf13cd630088c.jpg);
  background-repeat: no-repeat;
  background-position: top;
  height: 351px !important;
}
.container-error-404 > * { display: none !important; }
.card {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  opacity: 1;
}
`;

    const HOJ_MEMORIZING_FONT = `
*:not(pre, pre *, code, code *, .CodeMirror *, textarea, i, .katex, .katex *, [class*=" el-icon-"], [class^="el-icon-"], [class^="example-"] pre, .tex-formula, .tex-span) {
  font-family: "Sans Forgetica Regular", "Noto Sans SC", sans-serif !important;
}
pre, pre *, code, code *, .CodeMirror *, textarea, [class^="example-"] pre {
  font-family: "Sans Forgetica Regular", "Noto Sans SC", sans-serif !important;
}
`;
    const HOJ_HIDE_NEW_HOJ = `
.el-menu.el-menu--horizontal .el-menu-item[data-v-35116184]:not(:has(~ .el-menu-item[data-v-35116184])) {
  display: none;
}
`;
    const HOJ_SETTING_CSS = `

/* ============================================================
 * 1. 容器与开合
 * ============================================================ */
#hoj-settings-panel {
    position: fixed;
    top: 70px;
    right: 20px;
    width: 380px;
    max-width: calc(100vw - 40px);
    max-height: 80vh;
    z-index: 2147482000;

    display: none;                  /* 默认隐藏，靠 .open 显示 */
    flex-direction: column;
    overflow: hidden;

    background: #FFFFFF;
    border-radius: var(--hoj-card-radius, 15px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2);

    font-family: var(--hoj-sans-font, sans-serif);
    font-size: 13px;
    color: #24292E;
}

#hoj-settings-panel.open {
    display: flex;
}


/* ============================================================
 * 2. 三段式布局
 * ============================================================ */

/* ---------- 2.1 头部 ---------- */
#hoj-settings-panel .hoj-panel-header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    background: rgba(0, 0, 0, .02);
    cursor: move;
    user-select: none;
}

#hoj-settings-panel .hoj-panel-title {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* ---------- 2.2 主体（唯一可滚动区） ---------- */
#hoj-settings-panel .hoj-panel-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 12px 14px;
    font-size: 12px;
}

/* ---------- 2.3 底部（固定） ---------- */
#hoj-settings-panel .hoj-panel-footer {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 8px 14px;
    border-top: 1px solid rgba(0, 0, 0, .06);
    background: rgba(0, 0, 0, .015);
    font-size: 12px;
}

#hoj-settings-panel .hoj-footer-fullscreen {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    user-select: none;
    opacity: .85;
    transition: opacity .15s;
}
#hoj-settings-panel .hoj-footer-fullscreen:hover {
    opacity: 1;
}


/* ============================================================
 * 3. 折叠分组
 * ============================================================ */
#hoj-settings-panel .hoj-section {
    margin: 0 0 8px;
    border-radius: 8px;
    background: rgba(0, 0, 0, .025);
    border: 1px solid rgba(0, 0, 0, .06);
    overflow: hidden;
}

#hoj-settings-panel .hoj-section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    background: transparent;
    border: 0;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    letter-spacing: .3px;
    user-select: none;
    transition: background .15s;
}
#hoj-settings-panel .hoj-section-header:hover {
    background: rgba(64, 158, 255, .08);
}

#hoj-settings-panel .hoj-section-arrow {
    flex-shrink: 0;
    font-size: 12px;
    opacity: .55;
    transition: transform .2s;
}
#hoj-settings-panel .hoj-section.collapsed .hoj-section-arrow {
    transform: rotate(-90deg);
}

#hoj-settings-panel .hoj-section-title {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

#hoj-settings-panel .hoj-section-body {
    padding: 6px 10px 10px;
}
#hoj-settings-panel .hoj-section.collapsed > .hoj-section-body {
    display: none;
}

/* ---------- 一级分组强调 ---------- */
#hoj-settings-panel .hoj-section[data-level="1"] > .hoj-section-header {
    padding: 9px 12px;
    font-size: 13px;
    color: #409EFF;
    background: rgba(64, 158, 255, .07);
}
#hoj-settings-panel .hoj-section[data-level="1"] > .hoj-section-header:hover {
    background: rgba(64, 158, 255, .14);
}

/* ---------- 二级分组更紧凑 ---------- */
#hoj-settings-panel .hoj-section[data-level="2"] {
    margin: 0 0 2px;
    background: transparent;
    border: 0;
    border-radius: 0;
    overflow: visible;
}
#hoj-settings-panel .hoj-section[data-level="2"] > .hoj-section-header {
    padding: 6px 8px;
    font-size: 12px;
    color: inherit;
    opacity: .9;
    background: transparent;
    border-radius: 5px;
}
#hoj-settings-panel .hoj-section[data-level="2"] > .hoj-section-header:hover {
    background: rgba(64, 158, 255, .07);
    opacity: 1;
}
#hoj-settings-panel .hoj-section[data-level="2"] > .hoj-section-body {
    padding: 2px 4px 4px 20px;
}
/* 二级里的二级不再缩进 */
#hoj-settings-panel .hoj-section[data-level="2"] .hoj-section[data-level="2"] > .hoj-section-body {
    padding-left: 0;
}


/* ============================================================
 * 4. 行与控件
 * ============================================================ */
#hoj-settings-panel .hoj-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 2px 0;
    padding: 4px 6px;
    border-radius: 5px;
    font-size: 12px;
    line-height: 1.4;
    transition: background .12s;
}
#hoj-settings-panel .hoj-row:hover {
    background: rgba(0, 0, 0, .025);
}
#hoj-settings-panel .hoj-row > span:first-child {
    flex: 1 1 auto;
    min-width: 0;
    opacity: .88;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* 行内多按钮 → 左对齐 */
#hoj-settings-panel .hoj-row[style*="flex-wrap"] {
    justify-content: flex-start;
}

/* ---------- 输入控件 ---------- */
#hoj-settings-panel input[type="text"],
#hoj-settings-panel input[type="password"],
#hoj-settings-panel input[type="number"],
#hoj-settings-panel select {
    width: 130px;
    max-width: 130px;
    box-sizing: border-box;
    padding: 3px 6px;
    font-family: inherit;
    font-size: 12px;
    color: inherit;
    border: 1px solid rgba(0, 0, 0, .12);
    border-radius: 4px;
    background: #fff;
    outline: none;
    transition: border-color .15s;
}
#hoj-settings-panel input[type="text"]:focus,
#hoj-settings-panel input[type="password"]:focus,
#hoj-settings-panel input[type="number"]:focus,
#hoj-settings-panel select:focus {
    border-color: #409EFF;
}


/* ============================================================
 * 5. 按钮
 * ============================================================ */

/* ---------- 通用按钮 ---------- */
#hoj-settings-panel button {
    font-family: inherit;
    cursor: pointer;
    color: inherit;
    transition: background .15s, border-color .15s, color .15s;
}
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button) {
    padding: 4px 10px;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
}
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button):hover {
    background: rgba(0, 0, 0, .06);
}

/* ---------- mini 按钮 ---------- */
#hoj-settings-panel .hoj-mini-btn {
    padding: 3px 10px;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
}
#hoj-settings-panel .hoj-mini-btn:hover {
    background: rgba(0, 0, 0, .06);
    border-color: #409EFF;
    color: #409EFF;
}

/* ---------- 头部按钮 ---------- */
#hoj-settings-panel .hoj-panel-header #hoj-import-export-btn,
#hoj-settings-panel .hoj-panel-header #hoj-close {
    padding: 3px 10px;
    font-size: 11px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
}
#hoj-settings-panel .hoj-panel-header #hoj-import-export-btn:hover,
#hoj-settings-panel .hoj-panel-header #hoj-close:hover {
    background: rgba(64, 158, 255, .08);
    border-color: #409EFF;
    color: #409EFF;
}


/* ============================================================
 * 6. 颜色预览
 * ============================================================ */
#hoj-settings-panel .hoj-input-with-preview {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 130px;
    flex-shrink: 0;
}
#hoj-settings-panel .hoj-input-with-preview > input {
    width: 100%;
    padding-right: 24px;
    box-sizing: border-box;
}
#hoj-settings-panel .hoj-color-preview {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, .15);
    background-clip: padding-box;
    pointer-events: none;
    flex-shrink: 0;
    box-sizing: border-box;
}


/* ============================================================
 * 7. 开关（checkbox 重绘）
 * ============================================================ */
#hoj-settings-panel input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    flex-shrink: 0;
    width: 46px;
    height: 26px;
    margin: 0;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, .08);
    border-radius: 13px;
    background: rgba(120, 120, 128, .18);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .06);
    outline: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: background .22s ease, border-color .22s ease, box-shadow .22s ease;
}
#hoj-settings-panel input[type="checkbox"]::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .25), 0 1px 1px rgba(0, 0, 0, .1);
    transform: translateY(-50%);
    transition: left .22s cubic-bezier(.25, .1, .25, 1), background .22s;
}
#hoj-settings-panel input[type="checkbox"]:hover {
    background: rgba(120, 120, 128, .26);
}
#hoj-settings-panel input[type="checkbox"]:checked {
    background: #34C759;
    border-color: #34C759;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .08);
}
#hoj-settings-panel input[type="checkbox"]:checked::before {
    left: calc(100% - 22px);
}
#hoj-settings-panel input[type="checkbox"]:checked:hover {
    background: #2EB84F;
    border-color: #2EB84F;
}
#hoj-settings-panel input[type="checkbox"]:focus-visible {
    box-shadow: 0 0 0 3px rgba(52, 199, 89, .3);
}
#hoj-settings-panel input[type="checkbox"]:disabled {
    opacity: .45;
    cursor: not-allowed;
}

/* 移动端 / 全屏下的开关更大一点，好点 */
#hoj-settings-panel.hoj-fullscreen input[type="checkbox"] {
    width: 50px;
    height: 28px;
    border-radius: 14px;
}
#hoj-settings-panel.hoj-fullscreen input[type="checkbox"]::before {
    width: 22px;
    height: 22px;
}
#hoj-settings-panel.hoj-fullscreen input[type="checkbox"]:checked::before {
    left: calc(100% - 24px);
}


/* ============================================================
 * 8. 全屏（桌面 + 移动端共用一套规则）
 * ============================================================ */
#hoj-settings-panel.hoj-fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: auto !important;
    bottom: auto !important;
    width: 100vw !important;
    min-width: 100vw !important;
    max-width: 100vw !important;
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    transform: none !important;
    border-radius: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    z-index: 2147482100 !important;
}

/* 全屏下：header 不可拖，三按钮变大 */
#hoj-settings-panel.hoj-fullscreen .hoj-panel-header {
    padding: 14px 16px;
    cursor: default;
    touch-action: auto;
}
#hoj-settings-panel.hoj-fullscreen .hoj-panel-title {
    font-size: 16px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-panel-header #hoj-close,
#hoj-settings-panel.hoj-fullscreen .hoj-panel-header #hoj-import-export-btn {
    min-width: 56px;
    min-height: 32px;
    padding: 6px 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    position: relative;
    z-index: 10;
}

/* 全屏下：body 字体略大、行高更友好 */
#hoj-settings-panel.hoj-fullscreen .hoj-panel-body {
    padding: 14px 18px 20px;
    font-size: 13px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-row {
    min-height: 44px;
    padding: 8px 10px;
    gap: 12px;
    font-size: 13px;
    box-sizing: border-box;
}
#hoj-settings-panel.hoj-fullscreen .hoj-row > span:first-child {
    line-height: 1.3;
}
#hoj-settings-panel.hoj-fullscreen .hoj-section-header {
    padding: 10px 14px;
    font-size: 14px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-section[data-level="1"] > .hoj-section-header {
    font-size: 15px;
}
#hoj-settings-panel.hoj-fullscreen input[type="text"],
#hoj-settings-panel.hoj-fullscreen input[type="password"],
#hoj-settings-panel.hoj-fullscreen input[type="number"],
#hoj-settings-panel.hoj-fullscreen select {
    width: 140px;
    max-width: 140px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-mini-btn {
    padding: 6px 14px;
    font-size: 13px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-panel-footer {
    padding: 12px 18px;
    font-size: 13px;
}


/* ============================================================
 * 9. 响应式（窄屏）
 * ============================================================ */
@media (max-width: 480px) {
    #hoj-settings-panel {
        right: 10px;
        max-width: calc(100vw - 20px);
    }
}
/* ============ 题目收藏 ============ */
.hoj-fav-btn {
    cursor: pointer;
    padding-left: 5px;
    font-size: 14px;
    color: #999;
    transition: color 0.2s, transform 0.2s;
    vertical-align: middle;
    flex-shrink: 0;
}
.hoj-fav-btn:hover {
    color: #F7BA2A;
    transform: scale(1.2);
}
.hoj-fav-btn.is-fav {
    color: #F7BA2A;
}

#hoj-favorites-panel .taglist-title {
    font-weight: 600;
    color: var(--hoj-text-dark);
}
.hoj-fav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 320px;
    overflow-y: auto;
}
.hoj-fav-item {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    border-radius: 6px;
    transition: background 0.2s;
    gap: 4px;
}
.hoj-fav-item:hover {
    background: var(--hoj-list-bg-hover);
}
.hoj-fav-link {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 6px;
    text-decoration: none !important;
}
.hoj-fav-link::before { display: none !important; }
.hoj-fav-id {
    font-weight: 600;
    color: var(--hoj-text-blue);
    flex-shrink: 0;
    font-size: 12px;
}
.hoj-fav-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--hoj-text-dark);
    font-size: 12px;
}
.hoj-fav-remove {
    cursor: pointer;
    color: #999;
    padding: 2px 4px;
    opacity: 0;
    transition: opacity 0.2s, color 0.2s;
    flex-shrink: 0;
    font-size: 12px;
}
.hoj-fav-item:hover .hoj-fav-remove { opacity: 1; }
.hoj-fav-remove:hover { color: #F56C6C; }
/* ============ NewTool 通用小组件 ============ */
.hoj-tool {
  position: fixed;
  z-index: 99998;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: var(--hoj-card-radius, 15px);
  box-shadow: 0 2px 12px rgba(0,0,0,.15);
  overflow: hidden;
  font-family: var(--hoj-sans-font, sans-serif);
  color: #24292E;
  font-size: 13px;
}
.hoj-tool__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: move;
  border-bottom: 1px solid rgba(0,0,0,.06);
  user-select: none;
  touch-action: none;
}
.hoj-tool__title { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hoj-tool__actions { display: flex; gap: 6px; }
.hoj-tool__btn {
  cursor: pointer;
  opacity: .5;
  transition: opacity .15s;
  font-size: 14px;
}
.hoj-tool__btn:hover { opacity: 1; }
.hoj-tool__body {
  flex: 1;
  overflow: auto;
  padding: 8px 10px;
  font-size: 13px;
  word-break: break-all;
}
.hoj-tool__resize {
  position: absolute;
  right: 0; bottom: 0;
  width: 12px; height: 12px;
  cursor: nwse-resize;
  background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,.18) 50%);
  border-bottom-right-radius: inherit;
}

/* 按键显示 */
.hoj-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;

  /* 背景与卡片一致 */
  background: var(--hoj-card-bg, #FFFFFFE0);
  color: var(--hoj-text-dark, #24292E);
  border: 1px solid rgba(0, 0, 0, .08);
  backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
  -webkit-backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);

  box-shadow: 0 1px 3px rgba(0, 0, 0, .08);
  opacity: 0;
  transform: translateX(20px);
  transition: opacity .3s, transform .3s;
}

.hoj-key--in  {
  opacity: 1;
  transform: translateX(0);
}

.hoj-key--out {
  opacity: 0;
  transform: translateY(-10px) scale(.8);
}

html.hoj-dark-mode .hoj-key {
  border-color: rgba(255, 255, 255, .08);
}

html.hoj-dark-mode .hoj-tool { background: #37373FE0; color: #FFFFFF; }
html.hoj-dark-mode .hoj-tool__header { border-color: rgba(255,255,255,.08); }
/* ============ 题目推荐 Dialog ============ */
.hoj-rec-dialog {
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
}
.hoj-rec-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
    margin-bottom: 10px;
}
.hoj-rec-tab {
    padding: 5px 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: var(--hoj-button-bg, #ffffffb0);
    color: var(--hoj-text-dark, #24292e);
    border-radius: var(--hoj-button-radius, 6px);
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    transition: background .15s, color .15s, border-color .15s;
}
.hoj-rec-tab:hover { background: var(--hoj-button-bg-hover, #ffffffd0); }
.hoj-rec-tab.active {
    background: #409EFF;
    color: #fff;
    border-color: #409EFF;
}
.hoj-rec-meta {
    font-size: 12px;
    color: var(--hoj-text-dark, #24292e);
    opacity: .8;
    margin-bottom: 8px;
}
.hoj-rec-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.hoj-rec-item {
    padding: 6px 10px;
    border-radius: var(--hoj-button-radius, 6px);
    transition: background .15s;
}
.hoj-rec-item:hover { background: var(--hoj-list-bg-hover, rgba(0,0,0,.04)); }
.hoj-rec-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none !important;
    color: inherit;
    font-size: 13px;
}
.hoj-rec-link::before { display: none !important; }
.hoj-rec-id {
    font-weight: 600;
    color: var(--hoj-text-blue, #0b459b);
    min-width: 68px;
    flex-shrink: 0;
}
.hoj-rec-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--hoj-text-dark, #24292e);
}
.hoj-rec-rating {
    font-size: 12px;
    color: #e6a23c;
    flex-shrink: 0;
}
.hoj-rec-weight {
    font-size: 11px;
    color: #909399;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
}

/* 深色模式微调 */
html.hoj-dark-mode .hoj-rec-tab {
    border-color: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode .hoj-rec-tabs {
    border-bottom-color: rgba(255, 255, 255, .08);
}
/* ============ 菜单栏布局配置 ============ */
.hoj-navbar-layout {
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
}
.hoj-navbar-hint {
    font-size: 12px;
    opacity: .65;
    margin-bottom: 10px;
}
.hoj-navbar-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.hoj-navbar-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: var(--hoj-button-radius, 6px);
    background: var(--hoj-list-bg-hover, rgba(0, 0, 0, .03));
    border: 1px solid transparent;
    cursor: grab;
    user-select: none;
    transition: background .15s, border-color .15s;
}
.hoj-navbar-item:active { cursor: grabbing; }
.hoj-navbar-item:hover { background: var(--hoj-list-bg-hover, rgba(0, 0, 0, .06)); }
.hoj-navbar-item.hoj-navbar-dragging { opacity: .4; }
.hoj-navbar-item.hoj-navbar-drop-before { border-top: 2px solid #409EFF; }
.hoj-navbar-item.hoj-navbar-drop-after  { border-bottom: 2px solid #409EFF; }
.hoj-navbar-drag {
    cursor: grab;
    opacity: .4;
    font-size: 14px;
    letter-spacing: -2px;
    line-height: 1;
}
.hoj-navbar-check { display: inline-flex; align-items: center; }
.hoj-navbar-check input { cursor: pointer; width: 14px; height: 14px; }
.hoj-navbar-label {
    flex: 1; min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.hoj-navbar-arrows { display: inline-flex; gap: 2px; }
.hoj-navbar-arrows button {
    width: 22px; height: 22px;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 10px;
    line-height: 1;
}
.hoj-navbar-arrows button:hover:not(:disabled) {
    background: var(--hoj-button-bg-hover, rgba(0, 0, 0, .06));
}
.hoj-navbar-arrows button:disabled { opacity: .3; cursor: not-allowed; }
.hoj-navbar-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}
.hoj-navbar-footer button {
    padding: 5px 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: var(--hoj-button-radius, 6px);
    background: var(--hoj-button-bg, transparent);
    color: inherit;
    cursor: pointer;
    font-size: 12px;
}
.hoj-navbar-footer button:hover {
    background: var(--hoj-button-bg-hover, rgba(0, 0, 0, .06));
}
html.hoj-dark-mode .hoj-navbar-arrows button,
html.hoj-dark-mode .hoj-navbar-footer button {
    border-color: rgba(255, 255, 255, .1);
}
/* ============ 片段面板 ============ */
.hoj-snippet-panel { font-size: 13px; color: var(--hoj-text-dark, #24292e); }
.hoj-snippet-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
    margin-bottom: 8px;
}
.hoj-snippet-cat {
    padding: 4px 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: var(--hoj-button-bg, #ffffffb0);
    color: var(--hoj-text-dark, #24292e);
    border-radius: var(--hoj-button-radius, 6px);
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    transition: background .12s, color .12s, border-color .12s;
}
.hoj-snippet-cat:hover { background: var(--hoj-button-bg-hover, #ffffffd0); }
.hoj-snippet-cat.active {
    background: #409EFF;
    color: #fff;
    border-color: #409EFF;
}

/* 提示条 */
.hoj-snippet-tip {
    font-size: 11px;
    opacity: .55;
    margin-right: auto;
}
.hoj-snippet-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}

html.hoj-dark-mode .hoj-snippet-cat { border-color: rgba(255, 255, 255, .1); }
html.hoj-dark-mode .hoj-snippet-cats { border-bottom-color: rgba(255, 255, 255, .08); }
.hoj-snippet-list { list-style: none; padding: 0; margin: 0; max-height: 50vh; overflow-y: auto; }
.hoj-snippet-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: 6px; cursor: pointer;
    transition: background .12s;
}
.hoj-snippet-item:hover, .hoj-snippet-item.active {
    background: var(--hoj-list-bg-hover, rgba(64,158,255,.08));
}
.hoj-snippet-item-main { flex: 1; min-width: 0; }
.hoj-snippet-item-name { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hoj-snippet-item-desc {
    font-size: 12px; opacity: .6; margin-top: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.hoj-snippet-item-hotkey {
    font-size: 11px; padding: 2px 6px; border-radius: 4px;
    background: rgba(64,158,255,.1); color: #409EFF; flex-shrink: 0;
    font-variant-numeric: tabular-nums;
}
.hoj-snippet-empty { text-align: center; padding: 20px 0; opacity: .5; }
.hoj-snippet-footer {
    display: flex; justify-content: flex-end; gap: 8px;
    margin-top: 10px; padding-top: 10px;
    border-top: 1px solid rgba(0,0,0,.06);
}

/* ============ 片段管理 ============ */
.hoj-snippet-mgr { font-size: 13px; color: var(--hoj-text-dark, #24292e); }
.hoj-snippet-mgr-list {
    max-height: 220px; overflow-y: auto;
    border: 1px solid rgba(0,0,0,.08); border-radius: 6px; padding: 4px;
}
.hoj-snippet-mgr-item {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 8px; border-radius: 4px; cursor: pointer;
}
.hoj-snippet-mgr-item:hover { background: rgba(0,0,0,.04); }
.hoj-snippet-mgr-item.active { background: rgba(64,158,255,.1); }
.hoj-snippet-mgr-item-main { flex: 1; min-width: 0; }
.hoj-snippet-mgr-item-name { font-weight: 600; }
.hoj-snippet-mgr-item-desc { font-size: 11px; opacity: .6; margin-top: 1px; }
.hoj-snippet-mgr-item-right { display: flex; align-items: center; gap: 6px; }
.hoj-snippet-mgr-item-hotkey {
    font-size: 11px; padding: 1px 5px; border-radius: 3px;
    background: rgba(64,158,255,.1); color: #409EFF;
}
.hoj-snippet-mgr-del {
    border: 0; background: transparent; cursor: pointer;
    color: #999; font-size: 16px; line-height: 1; padding: 0 4px;
}
.hoj-snippet-mgr-del:hover { color: #F56C6C; }
.hoj-snippet-mgr-empty { text-align: center; padding: 20px 0; opacity: .5; }
.hoj-snippet-mgr-actions { margin-top: 8px; display: flex; justify-content: flex-end; }
.hoj-snippet-mgr-editor {
    margin-top: 12px; padding-top: 12px;
    border-top: 1px solid rgba(0,0,0,.06);
}
.hoj-snippet-field { margin-bottom: 10px; }
.hoj-snippet-field > label { display: block; font-size: 12px; opacity: .7; margin-bottom: 4px; }
.hoj-snippet-input, .hoj-snippet-textarea {
    width: 100%; box-sizing: border-box;
    padding: 6px 10px; font-family: inherit; font-size: 13px;
    border: 1px solid rgba(0,0,0,.12); border-radius: 6px;
    background: var(--hoj-input-bg, #fff); color: inherit; outline: none;
    resize: vertical;
}
.hoj-snippet-input:focus, .hoj-snippet-textarea:focus { border-color: #409EFF; }
.hoj-snippet-textarea {
    font-family: var(--hoj-mono-font, monospace); font-size: 12px; min-height: 100px;
}
.hoj-snippet-hotkey-input { cursor: pointer; }
.hoj-snippet-editor-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.hoj-snippet-btn {
    padding: 5px 12px; cursor: pointer; font-size: 12px; font-family: inherit;
    border: 1px solid rgba(0,0,0,.1); border-radius: var(--hoj-button-radius, 6px);
    background: var(--hoj-button-bg, transparent); color: inherit;
}
.hoj-snippet-btn:hover { background: var(--hoj-button-bg-hover, rgba(0,0,0,.06)); }
.hoj-snippet-btn--primary { background: #409EFF; color: #fff; border-color: #409EFF; }
.hoj-snippet-btn--primary:hover { background: #66B1FF; }

/* ============ 导入 / 导出 ============ */
.hoj-ie-panel { font-size: 13px; color: var(--hoj-text-dark, #24292e); }
.hoj-ie-tabs {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    margin-bottom: 12px;
}
.hoj-ie-tab {
    padding: 6px 16px;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    border-bottom: 2px solid transparent;
    opacity: .6;
}
.hoj-ie-tab.active {
    opacity: 1;
    border-bottom-color: #409EFF;
    color: #409EFF;
    font-weight: 600;
}
.hoj-ie-hint {
    font-size: 12px;
    opacity: .65;
    line-height: 1.6;
    margin-bottom: 12px;
}
.hoj-ie-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed rgba(0, 0, 0, .08);
}
.hoj-ie-preset {
    padding: 3px 10px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: var(--hoj-button-bg, transparent);
    color: inherit;
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    border-radius: var(--hoj-button-radius, 6px);
}
.hoj-ie-preset.active {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
}
.hoj-ie-list {
    max-height: 45vh;
    overflow-y: auto;
    border: 1px solid rgba(0, 0, 0, .08);
    border-radius: 6px;
    padding: 4px;
}
.hoj-ie-group { margin-bottom: 2px; }
.hoj-ie-group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    background: rgba(0, 0, 0, .02);
}
.hoj-ie-group-header:hover { background: rgba(0, 0, 0, .05); }
.hoj-ie-group-check input { cursor: pointer; }
.hoj-ie-group-name { flex: 1; }
.hoj-ie-group-count { font-size: 11px; opacity: .55; font-weight: normal; }
.hoj-ie-group-toggle { font-size: 11px; opacity: .5; width: 14px; text-align: center; }
.hoj-ie-items { padding: 2px 0 2px 28px; }
.hoj-ie-items.collapsed { display: none; }
.hoj-ie-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
}
.hoj-ie-item:hover { background: rgba(64, 158, 255, .06); }
.hoj-ie-item input[type="checkbox"] { cursor: pointer; flex-shrink: 0; }
.hoj-ie-item-name { flex-shrink: 0; min-width: 130px; color: inherit; }
.hoj-ie-item-value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: .55;
    font-family: var(--hoj-mono-font, monospace);
    font-size: 11px;
}
.hoj-ie-item-value--new { color: #67C23A; opacity: .85; }
.hoj-ie-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}
.hoj-ie-status { text-align: center; padding: 20px 0; }
.hoj-ie-filename {
    font-size: 12px;
    opacity: .65;
    margin-bottom: 10px;
}
.hoj-ie-version {
    margin-bottom: 10px;
    padding: 6px 10px;
    border-radius: 4px;
    background: rgba(0, 0, 0, .03);
}
.hoj-ie-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.hoj-ie-actions .hoj-snippet-btn--primary {
    /* 让“选择文件”按钮占据主要视觉位置 */
    min-width: 120px;
}
.hoj-ie-toprow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}
.hoj-ie-back {
    flex-shrink: 0;
    padding: 3px 10px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: var(--hoj-button-bg, transparent);
    color: inherit;
    font-size: 12px;
    font-family: inherit;
    border-radius: var(--hoj-button-radius, 6px);
    cursor: pointer;
    transition: background .15s, border-color .15s;
}
.hoj-ie-back:hover {
    background: var(--hoj-button-bg-hover, rgba(0, 0, 0, .06));
    border-color: #409EFF;
    color: #409EFF;
}
.hoj-ie-note {
    font-size: 11px;
    padding: 6px 10px;
    margin: 4px 0;
    border-radius: 4px;
    background: rgba(64, 158, 255, .08);
    color: #409EFF;
    line-height: 1.5;
}
/* ============ 讨论详情 · 点赞接管 ============ */
.hoj-like-box {
    position: absolute;
    top: 25px;
    right: 68px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 4px;   /* 给底部进度条留空间 */
    margin-left: 4px;
}

.hoj-like-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 14px;
    border: 0;
    border-radius: 6px;
    font-size: 13px;
    font-family: inherit;
    font-weight: 500;
    color: #FFFFFF;
    cursor: pointer;
    user-select: none;
    transition: filter .15s ease, transform .1s ease, opacity .15s ease;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
}
.hoj-like-btn i {
    color: #FFFFFF !important;
    font-size: 13px;
}
.hoj-like-btn:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: translateY(-1px);
}
.hoj-like-btn:active:not(:disabled) {
    transform: translateY(0);
    filter: brightness(.96);
}
.hoj-like-btn:disabled {
    cursor: not-allowed;
    opacity: .55;
    transform: none;
    filter: none;
}

.hoj-like-btn--like   { background: #2D8CF0; }   /* 蓝 */
.hoj-like-btn--unlike { background: #ED4014; }   /* 红 */

/* 剩余秒数 */
.hoj-like-cooldown {
    font-size: 12px;
    color: #909399;
    min-width: 22px;
    font-variant-numeric: tabular-nums;
    user-select: none;
}

/* 底部进度条 */
.hoj-like-progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: rgba(0, 0, 0, .06);
    border-radius: 1px;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s;
}
.hoj-like-box.is-cooldown .hoj-like-progress {
    opacity: 1;
}
.hoj-like-progress-inner {
    display: block;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #2D8CF0, #ED4014);
    border-radius: inherit;
}

/* ============ /new 讨论详情 · 点赞接管 ============ */
.hoj-new-like-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 3px;
}

/* 与原生按钮同款尺寸，只换文字颜色 */
.hoj-new-like-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid rgba(0, 0, 0, .05);
    border-radius: 12px;
    background: transparent;
    font-family: inherit;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .2px;
    cursor: pointer;
    user-select: none;
    transition: background .15s, opacity .15s, transform .1s;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
}
.hoj-new-like-btn:hover:not(:disabled) { background: rgba(0, 0, 0, .05); }
.hoj-new-like-btn:active:not(:disabled) { transform: scale(.95); }
.hoj-new-like-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }

.hoj-new-like-icon {
    width: 14px;
    height: 14px;
    stroke-width: 2.5;
    color: inherit;
}

/* 只改文字颜色：点赞蓝、取消点赞红 */
.hoj-new-like-btn--like   { color: #007AFF; border-color: rgba(0, 122, 255, .18); }
.hoj-new-like-btn--unlike { color: #FF3B30; border-color: rgba(255, 59, 48, .18); }

.hoj-new-like-cd {
    font-size: 11px;
    color: #86868B;
    min-width: 22px;
    font-variant-numeric: tabular-nums;
    user-select: none;
}

.hoj-new-like-bar {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 2px;
    background: rgba(0, 0, 0, .06);
    border-radius: 1px;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s;
}
.hoj-new-like-box.is-cooldown .hoj-new-like-bar { opacity: 1; }
.hoj-new-like-bar-inner {
    display: block;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #007AFF, #FF3B30);
    border-radius: inherit;
}
#hoj-settings-panel .hoj-lang-select {
    padding: 2px 4px;
    font-size: 11px;
    font-family: inherit;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    margin-left: auto;
    margin-right: 6px;
}
/* ============ 发布讨论表单 ============ */
.hoj-disc-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
}

.hoj-disc-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.hoj-disc-field > label {
    font-size: 13px;
    font-weight: 600;
    opacity: .85;
}

.hoj-disc-category,
.hoj-disc-title,
.hoj-disc-desc,
.hoj-disc-pid,
.hoj-disc-adv-role{
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
    font-family: inherit;
    font-size: 14px;
    color: inherit;
    background: var(--hoj-input-bg, #fff);
    border: 1px solid rgba(0, 0, 0, .12);
    border-radius: 6px;
    outline: none;
    transition: border-color .15s ease;
}
.hoj-disc-category:focus,
.hoj-disc-title:focus {
    border-color: #409EFF;
}

.hoj-disc-editor {
    /* Vditor 会填入自身容器 */
    min-height: 380px;
}

/* 底部按钮：粘在对话框可滚动区底部 */
.hoj-disc-footer {
    bottom: 0;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 0 0;
    margin-top: 4px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}

/* ============ 发布讨论：高级选项 ============ */
.hoj-disc-advanced {
    border: 1px solid rgba(0, 0, 0, .08);
    border-radius: 6px;
    overflow: hidden;
}
html.hoj-dark-mode .hoj-disc-advanced {
    border-color: rgba(255, 255, 255, .1);
}

.hoj-disc-advanced-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: rgba(0, 0, 0, .02);
    border: 0;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    transition: background .15s ease;
}
html.hoj-dark-mode .hoj-disc-advanced-toggle {
    background: rgba(255, 255, 255, .04);
}
.hoj-disc-advanced-toggle:hover {
    background: rgba(64, 158, 255, .08);
}
.hoj-disc-advanced-toggle i {
    font-size: 12px;
    opacity: .6;
    transition: transform .2s ease;
}
.hoj-disc-advanced-toggle.is-open i {
    transform: rotate(180deg);
}

.hoj-disc-advanced-body {
    padding: 12px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}
html.hoj-dark-mode .hoj-disc-advanced-body {
    border-top-color: rgba(255, 255, 255, .08);
}

.hoj-disc-advanced-hint {
    font-size: 12px;
    opacity: .65;
    margin-bottom: 10px;
    line-height: 1.5;
}

.hoj-disc-adv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px 14px;
}
.hoj-disc-adv-grid .hoj-disc-field > label {
    font-size: 12px;
    font-weight: 500;
    opacity: .75;
}
.hoj-disc-adv-grid input[type="number"] {
    width: 100%;
    box-sizing: border-box;
    padding: 6px 10px;
    font-family: inherit;
    font-size: 13px;
    color: inherit;
    background: var(--hoj-input-bg, #fff);
    border: 1px solid rgba(0, 0, 0, .12);
    border-radius: 6px;
    outline: none;
}
.hoj-disc-adv-grid input[type="number"]:focus {
    border-color: #409EFF;
}

.hoj-disc-adv-field--check {
    justify-content: flex-end;
}
.hoj-disc-adv-check-wrap {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding-top: 22px;   /* 与其它字段的 label 对齐 */
}
.hoj-disc-adv-check-wrap input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}
.hoj-disc-adv-label-top {
    font-size: 13px;
}

/* 全屏对话下：description 与高级选项依然保持正常间距 */
.hoj-dialog--fullscreen .hoj-disc-field--editor {
    flex: 1 1 auto;
    min-height: 0;
}

/* 深色模式微调 */
html.hoj-dark-mode .hoj-disc-category,
html.hoj-dark-mode .hoj-disc-title {
    border-color: rgba(255, 255, 255, .12);
}
html.hoj-dark-mode .hoj-disc-footer {
    border-top-color: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-lang-select {
    border-color: rgba(255, 255, 255, .15);
    background: rgba(255, 255, 255, .04);
}
/* ============ 创建团队：权限单选 ============ */
.hoj-group-auth-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
}
.hoj-group-auth-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 6px;
    cursor: pointer;
    transition: border-color .15s, background .15s, color .15s;
    --auth-color: #909399;
}
.hoj-group-auth-option:hover {
    border-color: var(--auth-color);
    background: color-mix(in srgb, var(--auth-color) 6%, transparent);
}
.hoj-group-auth-option input[type="radio"] {
    width: 16px;
    height: 16px;
    margin: 0;
    cursor: pointer;
    flex-shrink: 0;
    accent-color: var(--auth-color);
}
.hoj-group-auth-option:has(input:checked) {
    border-color: var(--auth-color);
    background: color-mix(in srgb, var(--auth-color) 10%, transparent);
}
.hoj-group-auth-option:has(input:checked) .hoj-group-auth-title {
    color: var(--auth-color);
}
.hoj-group-auth-option[data-auth="1"] { --auth-color: #67c23a; }   /* 公开 */
.hoj-group-auth-option[data-auth="2"] { --auth-color: #e6a23c; }   /* 保护 */
.hoj-group-auth-option[data-auth="3"] { --auth-color: #f56c6c; }   /* 私有 */

.hoj-group-auth-text {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
}
.hoj-group-auth-title {
    font-weight: 600;
    font-size: 13px;
    transition: color .15s;
}
.hoj-group-auth-desc {
    font-size: 12px;
    opacity: .65;
    margin-top: 2px;
}

html.hoj-dark-mode .hoj-group-auth-option {
    border-color: rgba(255, 255, 255, .1);
}

/* ============ 可见性切换（左公开 · 右隐藏） ============ */
.hoj-group-visible-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 8px 0;
    user-select: none;
}
.hoj-group-visible-label {
    font-size: 13px;
    font-weight: 600;
    color: #909399;
    transition: color .2s;
    cursor: pointer;
}
.hoj-group-visible-label.is-active[data-side="public"] {
    color: #67c23a;
}
.hoj-group-visible-label.is-active[data-side="hidden"] {
    color: #f56c6c;
}

.hoj-group-visible-switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 26px;
    border-radius: 13px;
    background: #67c23a;
    cursor: pointer;
    transition: background .22s ease;
    flex-shrink: 0;
    border: 1px solid rgba(0, 0, 0, .06);
}
.hoj-group-visible-switch::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
    transform: translateY(-50%);
    transition: left .22s cubic-bezier(.25, .1, .25, 1);
}
.hoj-group-visible-switch.is-hidden {
    background: #f56c6c;
}
.hoj-group-visible-switch.is-hidden::before {
    left: calc(100% - 22px);
}
html.hoj-dark-mode .hoj-group-visible-switch {
    border-color: rgba(255, 255, 255, .1);
}

.hoj-group-visible-hint {
    text-align: center;
    font-size: 12px;
    opacity: .6;
    margin-top: 2px;
}

/* 让 Vditor 字段贴底、去掉上边框时与其它字段的间距一致 */
.hoj-disc-field--editor-bottom {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
/* ============ 讨论列表 · 内联编辑按钮 ============ */
.hoj-list-edit-btn {
    float: right;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    font-size: 12px;
    font-family: inherit;
    color: #409EFF;
    background: rgba(64, 158, 255, .08);
    border: 1px solid rgba(64, 158, 255, .25);
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none !important;
    transition: background .15s, border-color .15s, color .15s;
    user-select: none;
    margin-left: 8px;
}
.hoj-list-edit-btn::before { display: none !important; }
.hoj-list-edit-btn:hover {
    background: rgba(64, 158, 255, .18);
    border-color: #409EFF;
    color: #409EFF;
}
.hoj-list-edit-btn i {
    font-size: 12px;
    color: inherit !important;
}
/* ============ 讨论列表 · 删除按钮（与编辑按钮同款、红色） ============ */
.hoj-list-del-btn {
    float: right;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    font-size: 12px;
    font-family: inherit;
    color: #F56C6C;
    background: rgba(245, 108, 108, .08);
    border: 1px solid rgba(245, 108, 108, .25);
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none !important;
    transition: background .15s, border-color .15s, color .15s;
    user-select: none;
    margin-left: 8px;
}
.hoj-list-del-btn::before { display: none !important; }
.hoj-list-del-btn:hover {
    background: rgba(245, 108, 108, .18);
    border-color: #F56C6C;
    color: #F56C6C;
}
.hoj-list-del-btn i {
    font-size: 12px;
    color: inherit !important;
}
html.hoj-dark-mode .hoj-list-del-btn {
    color: #F78989;
    background: rgba(245, 108, 108, .15);
    border-color: rgba(245, 108, 108, .35);
}
html.hoj-dark-mode .hoj-list-edit-btn {
    color: #66B1FF;
    background: rgba(64, 158, 255, .15);
    border-color: rgba(64, 158, 255, .35);
}
/* ============ 全部自测 ============ */
.hoj-tj-wrap {
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.hoj-tj-summary {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    background: var(--hoj-card-bg, #fff);
    border: 1px solid rgba(0, 0, 0, .06);
    border-radius: 6px;
}
html.hoj-dark-mode .hoj-tj-summary {
    border-color: rgba(255, 255, 255, .08);
}
.hoj-tj-summary-text {
    font-weight: 600;
}

.hoj-tj-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.hoj-tj-row {
    border: 1px solid rgba(0, 0, 0, .06);
    border-radius: 6px;
    overflow: hidden;
}
html.hoj-dark-mode .hoj-tj-row {
    border-color: rgba(255, 255, 255, .08);
}

.hoj-tj-row-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    cursor: pointer;
    background: rgba(0, 0, 0, .015);
    user-select: none;
}
.hoj-tj-row-head:hover {
    background: rgba(64, 158, 255, .07);
}
html.hoj-dark-mode .hoj-tj-row-head {
    background: rgba(255, 255, 255, .03);
}

.hoj-tj-idx {
    font-weight: 700;
    min-width: 32px;
    color: #409EFF;
}
.hoj-tj-status {
    font-weight: 600;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid transparent;
}
.hoj-tj-status.submitting {
    color: #409EFF;
    border-color: rgba(64, 158, 255, .35);
    background: rgba(64, 158, 255, .06);
}
.hoj-tj-status.running {
    color: #E6A23C;
    border-color: rgba(230, 162, 60, .35);
    background: rgba(230, 162, 60, .06);
}
.hoj-tj-status.pass {
    color: #19BE6B;
    border-color: rgba(25, 190, 107, .45);
    background: rgba(25, 190, 107, .10);
}
.hoj-tj-status.fail {
    color: #ED4014;
    border-color: rgba(237, 64, 20, .45);
    background: rgba(237, 64, 20, .10);
}
.hoj-tj-status.error {
    color: #F56C6C;
    border-color: rgba(245, 108, 108, .45);
    background: rgba(245, 108, 108, .10);
}
/* 更醒目的高亮：AC 用绿色文字加粗，WA 用红色 */
.hoj-tj-row[data-state="pass"] .hoj-tj-idx { color: #19BE6B; }
.hoj-tj-row[data-state="fail"] .hoj-tj-idx { color: #ED4014; }
.hoj-tj-row[data-state="fail"] .hoj-tj-meta { color: #ED4014; }
.hoj-tj-row[data-state="pass"] .hoj-tj-meta { color: #19BE6B; }
.hoj-tj-meta {
    font-size: 12px;
    opacity: .7;
    margin-left: auto;
    font-variant-numeric: tabular-nums;
}

.hoj-tj-row-body {
    padding: 10px 12px;
    border-top: 1px dashed rgba(0, 0, 0, .08);
    display: flex;
    flex-direction: column;
    gap: 8px;
}
html.hoj-dark-mode .hoj-tj-row-body {
    border-top-color: rgba(255, 255, 255, .08);
}
.hoj-tj-block-title {
    font-size: 12px;
    font-weight: 600;
    opacity: .75;
    margin-bottom: 4px;
}
.hoj-tj-pre {
    margin: 0;
    padding: 8px 10px;
    font-family: var(--hoj-mono-font, monospace);
    font-size: 12px;
    line-height: 1.5;
    background: rgba(0, 0, 0, .03);
    border-radius: 4px;
    max-height: 200px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
}
html.hoj-dark-mode .hoj-tj-pre {
    background: rgba(255, 255, 255, .04);
}
.hoj-tj-pre--err {
    color: #ED4014;
    background: rgba(237, 64, 20, .06);
}
.title-msg .el-dropdown.hoj-dropdown-replaced {
    display: none !important;
}
/* 深色模式（/new 也有深色场景） */

html.hoj-dark-mode #hoj-settings-panel .hoj-panel-header {
    background: rgba(255, 255, 255, .04);
    border-bottom-color: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-panel-footer {
    background: rgba(255, 255, 255, .03);
    border-top-color: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-section {
    background: rgba(255, 255, 255, .03);
    border-color: rgba(255, 255, 255, .07);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-section[data-level="1"] > .hoj-section-header {
    background: rgba(64, 158, 255, .14);
    color: #66B1FF;
}
html.hoj-dark-mode #hoj-settings-panel .hoj-row:hover {
    background: rgba(255, 255, 255, .04);
}
html.hoj-dark-mode #hoj-settings-panel input[type="text"],
html.hoj-dark-mode #hoj-settings-panel input[type="password"],
html.hoj-dark-mode #hoj-settings-panel input[type="number"],
html.hoj-dark-mode #hoj-settings-panel select {
    border-color: rgba(255, 255, 255, .12);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-mini-btn,
html.hoj-dark-mode #hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn),
html.hoj-dark-mode #hoj-settings-panel .hoj-panel-header #hoj-import-export-btn,
html.hoj-dark-mode #hoj-settings-panel .hoj-panel-header #hoj-close {
    border-color: rgba(255, 255, 255, .12);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-color-preview {
    border-color: rgba(255, 255, 255, .25);
}
html.hoj-dark-mode #hoj-settings-panel input[type="checkbox"] {
    background: rgba(120, 120, 128, .38);
    border-color: rgba(255, 255, 255, .1);
}
html.hoj-dark-mode #hoj-settings-panel input[type="checkbox"]::before {
    background: #F2F2F7;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
}
html.hoj-dark-mode #hoj-settings-panel input[type="checkbox"]:checked {
    background: #30D158;
    border-color: #30D158;
}
html.hoj-dark-mode .hoj-new-like-btn {
    border-color: rgba(255, 255, 255, .1);
}
html.hoj-dark-mode .hoj-new-like-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, .06);
}
html.hoj-dark-mode .hoj-new-like-cd { color: #A0A0A5; }
html.hoj-dark-mode .hoj-new-like-bar { background: rgba(255, 255, 255, .08); }
/* 深色模式 */
html.hoj-dark-mode .hoj-snippet-mgr-list,
html.hoj-dark-mode .hoj-snippet-input,
html.hoj-dark-mode .hoj-snippet-textarea,
html.hoj-dark-mode .hoj-snippet-search-input { border-color: rgba(255,255,255,.1); }
html.hoj-dark-mode .hoj-snippet-mgr-item:hover { background: rgba(255,255,255,.06); }
html.hoj-dark-mode .hoj-like-cooldown {
    color: #A0A0A5;
}
html.hoj-dark-mode .hoj-like-progress {
    background: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode .hoj-ie-note {
    background: rgba(64, 158, 255, .15);
}

html.hoj-dark-mode .hoj-ie-back { border-color: rgba(255, 255, 255, .12); }
html.hoj-dark-mode .hoj-ie-tabs { border-bottom-color: rgba(255, 255, 255, .08); }
html.hoj-dark-mode .hoj-ie-preset { border-color: rgba(255, 255, 255, .1); }
html.hoj-dark-mode .hoj-ie-list { border-color: rgba(255, 255, 255, .1); }
html.hoj-dark-mode .hoj-ie-footer { border-top-color: rgba(255, 255, 255, .08); }
html.hoj-dark-mode .hoj-ie-group-header { background: rgba(255, 255, 255, .04); }
html.hoj-dark-mode .hoj-ie-group-header:hover { background: rgba(255, 255, 255, .07); }
html.hoj-dark-mode .hoj-ie-version { background: rgba(255, 255, 255, .04); }

/* ============ hoj-el-select ============ */
.hoj-el-select-wrap {
    display: inline-block;
    width: 130px;                /* 与设置面板 input / select 一致 */
    max-width: 130px;
    vertical-align: middle;
}
.hoj-el-select-wrap .el-select {
    width: 100%;
}
.hoj-el-select-wrap .el-input__inner {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 26px 0 10px;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 12px;
    font-family: inherit;
    border-radius: 4px;
}

/* 面板里全屏 / 移动端时宽度更大 */
#hoj-settings-panel.hoj-fullscreen .hoj-el-select-wrap,
#hoj-settings-panel.hoj-fullscreen .hoj-el-select-wrap .el-select {
    width: 140px;
    max-width: 140px;
}

/* 下拉层：脱离文档流，防止被父级 overflow 裁剪 */
.hoj-el-select-dropdown {
    max-height: 260px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, .18);
    border-radius: 6px;
}
.hoj-el-select-dropdown .el-scrollbar {
    max-height: 260px;
    overflow-y: auto;
}
.hoj-el-select-dropdown .el-select-dropdown__item {
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 深色模式补充（站点有部分默认色会冲突） */
html.hoj-dark-mode .hoj-el-select-dropdown {
    background: #2E2E36;
    border-color: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode .hoj-el-select-dropdown .el-select-dropdown__item {
    color: rgba(255, 255, 255, .85);
}
html.hoj-dark-mode .hoj-el-select-dropdown .el-select-dropdown__item.hover,
html.hoj-dark-mode .hoj-el-select-dropdown .el-select-dropdown__item:hover {
    background: rgba(64, 158, 255, .18);
}
html.hoj-dark-mode .hoj-el-select-dropdown .el-select-dropdown__item.selected {
    color: #66B1FF;
    font-weight: 600;
}
/* ============ 关于 · 版本行（可点击复制） ============ */
#hoj-settings-panel .hoj-version-row {
    user-select: none;
}
#hoj-settings-panel .hoj-version-row:hover {
    background: rgba(64, 158, 255, .06) !important;
}
#hoj-settings-panel .hoj-version-row .hoj-version-text {
    opacity: .65;
    transition: opacity .15s, color .15s;
}
#hoj-settings-panel .hoj-version-row:hover .hoj-version-text {
    opacity: 1;
    color: #409EFF;
}
/* ============ 语言触发器 ============ */
#hoj-lang-trigger {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 6px;
    width: 170px;
    font-size: 12px;
    font-family: inherit;
    vertical-align: middle;
}
#hoj-lang-trigger .hoj-lang-trigger__label {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* ============ 语言选择 Dialog ============ */
.hoj-lang-picker {
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
}
.hoj-lang-picker__group {
    margin-bottom: 12px;
}
.hoj-lang-picker__group:last-child {
    margin-bottom: 0;
}
.hoj-lang-picker__title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .5px;
    text-transform: uppercase;
    color: #909399;
    padding-bottom: 6px;
    margin-bottom: 6px;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
}
html.hoj-dark-mode .hoj-lang-picker__title {
    color: rgba(255, 255, 255, .55);
    border-bottom-color: rgba(255, 255, 255, .08);
}

.hoj-lang-picker__items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}
.hoj-lang-picker__item {
    padding: 4px 12px;
    font-size: 12px;
    font-family: inherit;
    border: 1px solid rgba(0, 0, 0, .12);
    background: transparent;
    color: inherit;
    border-radius: 4px;
    cursor: pointer;
    transition: background .12s, border-color .12s, color .12s;
}
.hoj-lang-picker__item:hover {
    background: rgba(64, 158, 255, .08);
    border-color: #409EFF;
    color: #409EFF;
}
.hoj-lang-picker__item.is-selected {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
    font-weight: 600;
}
html.hoj-dark-mode .hoj-lang-picker__item {
    border-color: rgba(255, 255, 255, .12);
}
html.hoj-dark-mode .hoj-lang-picker__item:hover {
    background: rgba(64, 158, 255, .18);
}
html.hoj-dark-mode .hoj-lang-picker__item.is-selected {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
}

`;

    /* =========================================================
     * 四、注入 CSS
    /**
 * 基础字体（Noto Sans SC / Fira Code）——始终加载
 */
    const FONT_LINK_ID = {
        google:    'hoj-font-google',
        forgetica: 'hoj-font-forgetica'
    };

    /**
 * 从 @resource 加载 CSS 文本，注入 <style>
 * @param {string} id       <style> 的 id，用于幂等
 * @param {string} resName  @resource 的名字
 */
    function loadStyleFromResource(id, resName) {
        if (document.getElementById(id)) return;

        let cssText = '';
        try {
            if (typeof GM_getResourceText === 'function') {
                cssText = GM_getResourceText(resName) || '';
            }
        } catch (e) {
            console.warn(`[Font] 读取 @resource "${resName}" 失败:`, e);
        }
        if (!cssText) {
            // 兜底：如果 @resource 不可用（例如脚本管理器不支持），退回 <link>
            console.warn(`[Font] 回退到远程 <link> 加载: ${resName}`);
            const link = document.createElement('link');
            link.id  = id;
            link.rel = 'stylesheet';
            link.href = resName === 'hoj-font-google'
                ? 'https://fonts.googleapis.com/css2?' +
                'family=Noto+Sans+SC:wght@100..900&' +
                'family=JetBrains+Mono&' +
                'family=Fira+Code:wght@300..700&' +
                'family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&' +
                'display=swap'
            : 'https://db.onlinewebfonts.com/c/eb08ac6d35598e6ced424eb52373a55a?family=Sans+Forgetica+Regular';
            (document.head || document.documentElement).appendChild(link);
            return;
        }

        const style = document.createElement('style');
        style.id = id;
        style.textContent = cssText;
        (document.head || document.documentElement).appendChild(style);
        console.log(`[Font] 已从 @resource 加载: ${resName}（${cssText.length} 字符）`);
    }

    /** 基础字体（始终加载） */
    function loadBaseFonts() {
        loadStyleFromResource(FONT_LINK_ID.google, 'hoj-font-google');
    }

    /**
 * 易于记忆的字体（Sans Forgetica）——仅 MemorizingFont 开启时加载
 */
    function syncMemorizingFont() {
        const styleId = 'hoj-smart-style-memorizing-font';
        const old = document.getElementById(styleId);
        if (old) old.remove();

        if (config.MemorizingFont && config.Open) {
            // 1) 先加载 Sans Forgetica 的 @font-face 定义
            loadStyleFromResource(FONT_LINK_ID.forgetica, 'hoj-font-forgetica');

            // 2) 再追加应用该字体的 style
            const s = document.createElement('style');
            s.id = styleId;
            s.textContent = HOJ_MEMORIZING_FONT;
            (document.head || document.documentElement).appendChild(s);
        } else {
            // 关闭时移除，避免无意义开销
            const el = document.getElementById(FONT_LINK_ID.forgetica);
            if (el) el.remove();
        }
    }
    /**
 * 神秘条纹表格
 */
    function removeRowStripe() {
        document.querySelectorAll('.vxe-body--row.row--stripe').forEach(el => {
            el.classList.remove('row--stripe');
        });
    }
    function injectShowVersion() {
        const old = document.getElementById('hoj-smart-style-show-version');
        if (old) old.remove();
        const s = document.createElement('style');
        s.id = 'hoj-smart-style-show-version';
        if(config.ShowVersion)
        {
            s.textContent = HOJ_SHOW_VERSION_CSS;
        }else
        {
            s.textContent = "";
        }
        (document.head || document.documentElement).appendChild(s);
    }
    function injectBetterNotFound() {
        const old = document.getElementById('hoj-smart-style-better-not-found');
        if (old) old.remove();
        const s = document.createElement('style');
        s.id = 'hoj-smart-style-better-not-found';
        if(config.Open && config.BetterNotFound)
        {
            s.textContent = HOJ_BETTER_NOT_FOUND_CSS;
        }else
        {
            s.textContent = "";
        }
        (document.head || document.documentElement).appendChild(s);
    }
    function injectHideNewHOJ() {
        const old = document.getElementById('hoj-smart-style-hide-new-hoj');
        if (old) old.remove();
        const s = document.createElement('style');
        s.id = 'hoj-smart-style-hide-new-hoj';
        if(config.Open && config.HideNewHOJ)
        {
            s.textContent = HOJ_HIDE_NEW_HOJ;
        }else
        {
            s.textContent = "";
        }
        (document.head || document.documentElement).appendChild(s);
    }
    function initCardGlow() {
        if (!config.Open) return;
        if (!config.DarkMode) return;
        if (!config.MouseGlow) return;
        if (initCardGlow._installed) return;
        initCardGlow._installed = true;
        loadBaseFonts();
        const SELECTOR = 'img, div.el-card,.container,.category-body[data-v-fce6d0ee],.el-tabs--border-card, .announcements-container li[data-v-931546ae],.el-popover,.el-message-box,.el-message,.el-select-dropdown,.el-dropdown-menu,.el-notification,.m-message,.mobile-nav,.mu-popover,.mu-paper,.el-tabs__header.is-top,.el-tabs__nav-wrap.is-top,.container[data-v-bbe20b80],.container[data-v-13564ee3],.container[data-v-675320b4],.v-note-wrapper,.v-note-help-content,.add-image-link,.popup-dropdown,.op-header.popup-dropdown,.el-upload-dragger,.problem-resize';
        const EASE = 0.22;
        const SNAP = 0.05;

        const states = new WeakMap();

        function apply(el, s) {
            el.style.setProperty('--hoj-glow-mx', s.cx.toFixed(3) + '%');
            el.style.setProperty('--hoj-glow-my', s.cy.toFixed(3) + '%');
        }

        function tick(el) {
            const s = states.get(el);
            if (!s) return;
            s.cx += (s.tx - s.cx) * EASE;
            s.cy += (s.ty - s.cy) * EASE;
            if (Math.abs(s.tx - s.cx) < SNAP && Math.abs(s.ty - s.cy) < SNAP) {
                s.cx = s.tx; s.cy = s.ty;
                apply(el, s);
                s.raf = null;
                return;
            }
            apply(el, s);
            s.raf = requestAnimationFrame(() => tick(el));
        }

        function play(el) {
            const s = states.get(el);
            if (!s || s.raf !== null) return;
            s.raf = requestAnimationFrame(() => tick(el));
        }
        function findHost(clientX, clientY) {
            // 防御：坐标无效时直接返回 null，避免抛错
            if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return null;
            if (clientX < 0 || clientY < 0 ||
                clientX > window.innerWidth || clientY > window.innerHeight) return null;

            const stack = document.elementsFromPoint(clientX, clientY);
            for (const el of stack) {
                if (el.matches && el.matches(SELECTOR)) return el;
            }
            return null;
        }
        let _lastHost = null;   // 追踪上一次的宿主，只在切换时清理

        document.addEventListener('pointermove', (e) => {
            const host = findHost(e.clientX, e.clientY);

            // 宿主切换时：熄灭所有"不是当前 host、也不是当前 host 的祖先"的已点亮元素
            if (host !== _lastHost) {
                document.querySelectorAll('.hoj-glow-on').forEach(el => {
                    if (el === host) return;
                    // 如果 el 是 host 的祖先（contains），也要熄灭，因为我们只要最内层
                    el.classList.remove('hoj-glow-on');
                    const s = states.get(el);
                    if (s) s.hovering = false;
                });
                _lastHost = host;
            }

            if (!host) return;

            const r = host.getBoundingClientRect();
            if (!r.width || !r.height) return;

            const x = (e.clientX - r.left) / r.width  * 100;
            const y = (e.clientY - r.top)  / r.height * 100;

            let s = states.get(host);
            if (!s) {
                s = { cx: x, cy: y, tx: x, ty: y, raf: null, hovering: false };
                states.set(host, s);
            }
            if (!s.hovering) {
                s.cx = s.tx = x;
                s.cy = s.ty = y;
                apply(host, s);
                s.hovering = true;
                host.classList.add('hoj-glow-on');
            } else {
                s.tx = x; s.ty = y;
                play(host);
            }
        }, { passive: true });
        // 点击波纹
        document.addEventListener('pointerdown', (e) => {
            const host = findHost(e.clientX, e.clientY);
            if (!host) return;

            // 宿主需要有定位上下文
            const cs = getComputedStyle(host);
            if (cs.position === 'static') host.style.position = 'relative';

            const r = host.getBoundingClientRect();
            if (!r.width || !r.height) return;

            // 相对宿主的百分比坐标
            const x = (e.clientX - r.left);
            const y = (e.clientY - r.top);

            // 让波纹足够大，能扩散到卡片四角之外
            const dx = Math.max(x, r.width  - x);
            const dy = Math.max(y, r.height - y);
            const maxR = Math.hypot(dx, dy);   // 到最远角的距离
            const diameter = maxR * 2;

            const ripple = document.createElement('span');
            ripple.className = 'hoj-ripple';
            ripple.style.left = x + 'px';
            ripple.style.top  = y + 'px';
            ripple.style.width  = diameter + 'px';
            ripple.style.height = diameter + 'px';

            host.appendChild(ripple);
            // 动画结束后自动移除
            ripple.addEventListener('animationend', () => ripple.remove());
        }, { passive: true });
        document.addEventListener('pointerout', (e) => {
            const host = findHost(e.clientX, e.clientY);
            if (!host) {
                // 光标已经完全离开所有匹配元素 → 熄灭全部
                document.querySelectorAll('.hoj-glow-on').forEach(el => {
                    el.classList.remove('hoj-glow-on');
                    const s = states.get(el);
                    if (s) s.hovering = false;
                });
                return;
            }
            // 还有匹配元素在光标下 → 只熄灭"不再包含光标"的那些
            document.querySelectorAll('.hoj-glow-on').forEach(el => {
                if (el !== host && !el.contains(host) && !host.contains(el)) {
                    el.classList.remove('hoj-glow-on');
                    const s = states.get(el);
                    if (s) s.hovering = false;
                }
            });
        }, { passive: true });
    }
    function injectCss() {
        const vars = buildVars(config);
        let rootCss = ':root {\n';
        for (const [k, v] of Object.entries(vars)) rootCss += `  ${k}: ${v};\n`;
        rootCss += '}\n';
        const old = document.getElementById('hoj-smart-style');
        if (old) old.remove();
        const s = document.createElement('style');
        s.id = 'hoj-smart-style';
        if(config.Open)
        {
            s.textContent = rootCss + CORE_CSS + HOJ_SETTING_CSS;
            if (config.DarkMode) {
                // 深色模式：注入深色玻璃
                s.textContent += HOJ_DARKMODE_CORE_CSS;
            }
            if (config.LiquidGlassUI) {
                // 浅色液态玻璃
                s.textContent += HOJ_LIQUIDGLASS_CORE_CSS;
            }
            loadBaseFonts();
        }else
        {
            s.textContent = rootCss + HOJ_SETTING_CSS;
        }
        (document.head || document.documentElement).appendChild(s);
        injectShowVersion();
        injectBetterNotFound();
        injectHideNewHOJ();
        initCardGlow();
        syncMemorizingFont();
    }
    /* =========================================================
     * 五、应用背景
     * ========================================================= */
    /** 通用动态壁纸时间表：path 是相对 /api/public/ 的路径 */
    const DYNAMIC_WALLPAPERS = {
        Mojave: [
            { hour: 0,  min: 0,  path: 'file/c446f4fc9daa45a18a76bb70583d2acd.png' }, // 00:00 午夜
            { hour: 3,  min: 0,  path: 'file/75c716a6259f454fadb5113de2231df6.png' }, // 03:00 深夜
            { hour: 6,  min: 0,  path: 'file/c0355dd4d9f24a7c9ae15d86d19bd858.png' }, // 06:00 破晓
            { hour: 7,  min: 30, path: 'file/c5bbf31e96fb483ea14cee6434ef33f5.png' }, // 07:30 日出
            { hour: 9,  min: 0,  path: 'file/4643de510a614ff09ff41c555c2e0731.png' }, // 09:00 晨光
            { hour: 10, min: 30, path: 'file/fb6514b9839e4de0beb118f4657791c7.png' }, // 10:30 上午
            { hour: 12, min: 0,  path: 'file/2598082745c642bab9dfa9226c216ec6.png' }, // 12:00 正午
            { hour: 13, min: 30, path: 'file/8116d00e29aa4e268ffa7685ac8794b0.png' }, // 13:30 午后
            { hour: 15, min: 0,  path: 'file/e141e7fa980f40f99d5308b1f844d51a.png' }, // 15:00 下午
            { hour: 16, min: 30, path: 'file/3e48ea2dffa4420390011fdbc799c6bc.png' }, // 16:30 傍晚前
            { hour: 17, min: 30, path: 'file/ae0e489f2d894a44a4ddef4f6b751c91.png' }, // 17:30 黄金时刻
            { hour: 19, min: 0, path: 'file/8aff674ec1dc4ea7847e02a804c6e153.png' }, // 19:00 日落
            { hour: 20, min: 0,  path: 'file/c40c0516fd224e1cb9415af1fcad247f.png' }, // 20:00 黄昏
            { hour: 21, min: 0, path: 'file/0a86e082d70f488e9b67356b836c1d8d.png' }, // 21:00 入夜
            { hour: 22, min: 30, path: 'file/c446f4fc9daa45a18a76bb70583d2acd.png' }, // 22:30 深夜
        ],
        Catalina: [
            { hour: 0,  min: 0,  path: 'img/513736725fb0405fada79c92cc2b0170.png' }, // 00:00 午夜
            { hour: 6,  min: 0,  path: 'file/ac1e623769a94a409b3db8f84b693af5.png' }, // 06:00 破晓
            { hour: 9,  min: 0,  path: 'img/88c83323ea0041008360b9dc68605d3f.png' }, // 09:00 晨光
            { hour: 12, min: 0,  path: 'img/3763d6a8bc8c41f69bef4f38c242ae59.png' }, // 12:00 正午
            { hour: 15, min: 0,  path: 'img/0c7f7e82b6da4627b64ac69509fc834a.png' }, // 15:00 午后
            { hour: 18, min: 0,  path: 'img/1701dc40763549a6826626715f32cbbb.png' }, // 18:00 傍晚前
            { hour: 19, min: 30, path: 'file/06a10d43d30f42f68c74872f25b2f264.png' }, // 19:30 日落
            { hour: 21, min: 0,  path: 'img/eae9eb8961494e8e8b34a3cd83cad272.png' }, // 21:00 入夜
        ]
    };

    /** 动态壁纸支持的图片源 */
    const DYNAMIC_SUPPORTED_SOURCES = ['Source1', 'Source2'];
    /** 动态壁纸的 base URL（拼上 path） */
    const DYNAMIC_BASE_URL = {
        Source1: 'http://ssf.hdoi.cn/api/public/',
        Source2: 'http://172.16.21.199/api/public/'
    };

    /** 判断某个 BuiltinBackground 值是否是动态壁纸 */
    function isDynamicWallpaper(name) {
        return Object.prototype.hasOwnProperty.call(DYNAMIC_WALLPAPERS, name);
    }

    function isDynamicAvailable() {
        return DYNAMIC_SUPPORTED_SOURCES.includes(config.ImageSource);
    }

    /** 根据当前时间返回对应壁纸的相对路径 */
    function getCurrentDynamicPath(name) {
        const schedule = DYNAMIC_WALLPAPERS[name];
        if (!schedule || !schedule.length) return null;
        const now = new Date();
        const minutes = now.getHours() * 60 + now.getMinutes();
        let current = schedule[schedule.length - 1];
        for (const item of schedule) {
            if (minutes >= item.hour * 60 + item.min) current = item;
            else break;
            console.log("checked:" + item.path);
        }
        return current.path;
    }

    function getDynamicUrl(name) {
        const base = DYNAMIC_BASE_URL[config.ImageSource];
        const path = getCurrentDynamicPath(name);
        if (!base || !path) return null;
        return `${base}${path}`;
    }

    function applyDynamicWallpaper() {
        const url = getDynamicUrl(config.BuiltinBackground);
        if (!url) return;
        document.body.style.backgroundImage = `url("${url}")`;
    }

    let _dynamicWallpaperTimer = null;
    function syncDynamicWallpaperTimer() {
        if (_dynamicWallpaperTimer) {
            clearInterval(_dynamicWallpaperTimer);
            _dynamicWallpaperTimer = null;
        }
        if (!config.Open) return;
        if (!isDynamicWallpaper(config.BuiltinBackground)) return;
        if (!isDynamicAvailable()) return;
        _dynamicWallpaperTimer = setInterval(() => {
            if (!config.Open) return;
            if (!isDynamicWallpaper(config.BuiltinBackground)) return;
            if (!isDynamicAvailable()) return;
            applyDynamicWallpaper();
        }, 60 * 1000);
    }

    /** 重建 BuiltinBackground 的下拉选项（根据 ImageSource 显隐动态壁纸） */
    const BUILTIN_BG_BASE_OPTIONS = [
        ['Custom','Custom'], ['Classic','Classic'], ['BigSur','BigSur'],
        ['Monterey','Monterey'], ['Ventura','Ventura'], ['Sonoma','Sonoma'],
        ['Sequoia','Sequoia'], ['Tahoe','Tahoe'], ['GoldenGate','GoldenGate'],
        ['Twilight','Twilight'], ['Sunset','Sunset']
    ];
    const DYNAMIC_BG_OPTIONS = [
        ['Mojave', 'Mojave（动态壁纸）'],
        ['Catalina', 'Catalina（动态壁纸）']
    ];

    function syncDynamicWallpaperOptions() {
        if (!settingsPanel) return;
        const bgSel = settingsPanel.querySelector('select[data-key="BuiltinBackground"]');
        const imgSel = settingsPanel.querySelector('select[data-key="ImageSource"]');
        if (!bgSel || !imgSel) return;

        const available = DYNAMIC_SUPPORTED_SOURCES.includes(imgSel.value);

        // 若当前配置是动态壁纸但源不支持，回退到 Custom
        if (!available && isDynamicWallpaper(config.BuiltinBackground)) {
            config.BuiltinBackground = 'Custom';
            saveConfig(config);
        }

        const current = config.BuiltinBackground;
        const opts = [...BUILTIN_BG_BASE_OPTIONS];
        if (available) opts.push(...DYNAMIC_BG_OPTIONS);

        bgSel.innerHTML = opts
            .map(([v, label]) => `<option value="${v}">${label}</option>`)
            .join('');
        bgSel.value = current;
        if (bgSel.value !== current) bgSel.value = 'Custom';
    }
    function applyBackground(cfg) {
        const body = document.body;
        if (!body) return;
        if (!config.Open)
        {
            body.style.backgroundImage = 'none';
            return;
        }
        if (cfg.CustomBackground && cfg.CustomBackground !== 'None') {
            body.style.backgroundImage = `url("${cfg.CustomBackground}")`;
            return;
        }
        if (cfg.BuiltinBackground === 'Custom') {
            body.style.backgroundImage = 'none';
            return;
        }
        // 动态壁纸
        if (isDynamicWallpaper(cfg.BuiltinBackground) && isDynamicAvailable()) {
            applyDynamicWallpaper();
            syncDynamicWallpaperTimer();
            return;
        }
        // 清掉定时器
        if (_dynamicWallpaperTimer) {
            clearInterval(_dynamicWallpaperTimer);
            _dynamicWallpaperTimer = null;
        }
        const sourceMap = {
            Source1: 'http://ssf.hdoi.cn/api/public/img',
            Source2: 'http://172.16.21.199/api/public/img',
            Source3: 'https://smart-hoj.is-great.org',
            Source4: 'https://deeplearning.org.cn/api/public/img'
        };

        const SOURCE3_BG_MAP = {
            BigSur:   'BigSur.jpg',
            Monterey: 'Monterey.jpg',
            Ventura:  'Classic.jpeg',   // 注意：Ventura 对应 Classic.jpeg
            Sonoma:   'Sonoma.jpg',
            Sequoia:  'Sequoia.jpg',
            Tahoe:    'Tahoe.jpg'
        };
        const SOURCE4_BG_MAP = {
            Tahoe:    'cba3fb124a324f52bcda7a2348349412.jpg',
            Sequoia:  'f4527d5db707410c861b335dd920d33f.png',
            Sonoma:   '511eb4af7e97491c87e2a381d5ec2f93.jpg',
            Ventura:  '1688b284ab9f4188ad4a553ce262506e.jpeg',
            Monterey: '6dd829c1c6544c14be95a230ef12d9a8.jpeg',
            BigSur:   '21680da2400544b48772d7420b36813b.jpg'
        };
        const bgMap = {
            Classic: '23bb9995eafe4e85972f2695afbc5b31',
            BigSur: '481e1fd621f642a0a300fda663a9d054',
            Monterey: '3ef260075f344ce4b9b64d82b7c04606',
            Ventura: '4bd963a39eb34576b243a81df4d501d5',
            Sonoma: '66db65fa1ac243b288ef5f57a2cbdf74',
            Sequoia: '0df8535fcdab46a08eb27c16f070b264',
            Tahoe: '7d707af0d5fe49c4965828583b5ed20f',
            GoldenGate: '31aa5f0cc0ab41438f65c3f2a5b4c3d0',
            Twilight: '280da21ac62448a8bd82a2b3e1e4b091',
            Sunset: '2e94e3a61cd04ca3a0eb1a3911b847e6'
        };
        const prefix = sourceMap[cfg.ImageSource] || sourceMap.Source1;

        // Source3,4 用独立映射（每个背景带自己的扩展名）
        if (cfg.ImageSource === 'Source4') {
            const file = SOURCE4_BG_MAP[cfg.BuiltinBackground];
            body.style.backgroundImage = file
                ? `url("${prefix}/${file}")`
            : 'none';
            return;
        }
        if (cfg.ImageSource === 'Source3') {
            const file = SOURCE3_BG_MAP[cfg.BuiltinBackground];
            if (file) {
                body.style.backgroundImage = `url("https://smart-hoj.is-great.org/backgrounds/${file}")`;
            } else {
                // 兜底
                body.style.backgroundImage = 'none';
            }
            return;
        }
        // 其它 Source 沿用原有逻辑
        const file = bgMap[cfg.BuiltinBackground] || bgMap.Classic;
        const ext = cfg.BuiltinBackground === 'Classic' ? '.jpeg' : '.jpg';
        body.style.backgroundImage = prefix && file ? `url("${prefix}/${file}${ext}")` : 'none';
    }

    /* =========================================================
     * 六、平滑滚动 / 过渡类
     * ========================================================= */
    function applySmoothClasses() {
        const root = document.documentElement;

        // 总开关：未启用 Smart HOJ 时，不注入任何美化类
        const enabled = !!config.Open;

        root.classList.toggle('hoj-enabled', enabled);

        root.classList.toggle('hoj-smooth-scroll', enabled && !!config.SmoothScroll);
        root.classList.toggle('hoj-smooth-switch', enabled && !!config.SmoothSwitch);

        // 深色 / 液态玻璃 也必须在总开关打开时才生效
        const isDark = enabled && !!config.DarkMode;
        const isLG   = enabled && !!config.LiquidGlassUI;

        root.classList.toggle('hoj-dark-mode',    isDark);
        root.classList.toggle('hoj-lg-active',    isLG);
        root.classList.toggle('hoj-liquid-glass', isLG && !isDark);

        const isAdmin = enabled && /\/admin(\/|$)/.test(window.location.pathname);
        root.classList.toggle('hoj-admin', isAdmin);
    }
    /* =========================================================
     * 七、设置面板
     * ========================================================= */
    /* ============================================================
 * el-select：与站点 Element UI 风格一致的原生实现
 * 保留原 <select> 元素（隐藏），所有读写仍走它 → 无需改调用方
 * ============================================================ */
    function upgradeSelectToElSelect(selectEl) {
        if (!selectEl || selectEl.tagName !== 'SELECT') return null;
        if (selectEl.dataset.hojElSelect === '1') {
            return selectEl.nextElementSibling;   // 已升级
        }
        selectEl.dataset.hojElSelect = '1';
        selectEl.style.display = 'none';

        /* ---------- 结构 ---------- */
        const wrap = document.createElement('div');
        wrap.className = 'hoj-el-select-wrap';
        wrap.innerHTML = `
        <div class="el-select">
            <div class="el-input el-input--suffix">
                <input class="el-input__inner" readonly>
                <span class="el-input__suffix">
                    <span class="el-input__suffix-inner">
                        <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
                    </span>
                </span>
            </div>
        </div>
    `;
        const dropdownEl = document.createElement('div');
        dropdownEl.className = 'el-select-dropdown hoj-el-select-dropdown';
        dropdownEl.style.display = 'none';
        dropdownEl.innerHTML = `
        <div class="el-scrollbar">
            <ul class="el-select-dropdown__list"></ul>
        </div>
    `;
        document.body.appendChild(dropdownEl);

        const inputEl = wrap.querySelector('.el-input__inner');
        const arrowEl = wrap.querySelector('.el-select__caret');
        const listEl  = dropdownEl.querySelector('.el-select-dropdown__list');

        /* ---------- 状态 ---------- */
        const getOptions = () =>
        Array.from(selectEl.options).map(o => ({
            value: o.value,
            label: o.textContent
        }));

        const updateInputText = () => {
            const opts = getOptions();
            const cur = opts.find(o => o.value === selectEl.value);
            inputEl.value = cur ? cur.label : '';
            inputEl.placeholder = selectEl.multiple ? '' : '';
        };

        const renderList = () => {
            listEl.innerHTML = getOptions().map(o => {
                const sel = o.value === selectEl.value ? ' selected' : '';
                return `<li class="el-select-dropdown__item${sel}" data-value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</li>`;
            }).join('');
        };

        /* ---------- 下拉位置 ---------- */
        const positionDropdown = () => {
            const r = wrap.getBoundingClientRect();
            const h = dropdownEl.offsetHeight || 200;
            const below = window.innerHeight - r.bottom;
            const above = r.top;
            dropdownEl.style.position = 'fixed';
            dropdownEl.style.left = r.left + 'px';
            dropdownEl.style.minWidth = r.width + 'px';
            dropdownEl.style.zIndex = '2147483650';
            if (below < h + 8 && above > below) {
                dropdownEl.style.top = 'auto';
                dropdownEl.style.bottom = (window.innerHeight - r.top + 4) + 'px';
            } else {
                dropdownEl.style.bottom = 'auto';
                dropdownEl.style.top = (r.bottom + 4) + 'px';
            }
        };

        /* ---------- 打开 / 关闭 ---------- */
        let onScroll = null;
        const open = () => {
            renderList();
            dropdownEl.style.display = 'block';
            positionDropdown();
            arrowEl.classList.add('is-reverse');
            onScroll = () => positionDropdown();
            window.addEventListener('scroll', onScroll, true);
            window.addEventListener('resize', onScroll, true);
            document.addEventListener('mousedown', onDocClick, true);
            document.addEventListener('keydown', onEsc, true);
        };
        const close = () => {
            dropdownEl.style.display = 'none';
            arrowEl.classList.remove('is-reverse');
            if (onScroll) {
                window.removeEventListener('scroll', onScroll, true);
                window.removeEventListener('resize', onScroll, true);
                onScroll = null;
            }
            document.removeEventListener('mousedown', onDocClick, true);
            document.removeEventListener('keydown', onEsc, true);
        };
        const onDocClick = (e) => {
            if (!wrap.contains(e.target) && !dropdownEl.contains(e.target)) close();
        };
        const onEsc = (e) => {
            if (e.key === 'Escape') { close(); }
        };

        /* ---------- 交互 ---------- */
        wrap.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (dropdownEl.style.display === 'block') close();
            else open();
        });

        listEl.addEventListener('click', (e) => {
            const li = e.target.closest('.el-select-dropdown__item');
            if (!li) return;
            e.preventDefault();
            e.stopPropagation();
            selectEl.value = li.dataset.value;
            selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            selectEl.dispatchEvent(new Event('input',  { bubbles: true }));
            updateInputText();
            close();
        });

        /* ---------- 外部（程序化）修改同步回 UI ---------- */
        selectEl.addEventListener('input',  updateInputText);
        selectEl.addEventListener('change', updateInputText);

        /* ---------- 插入到原 select 之后 ---------- */
        selectEl.parentNode.insertBefore(wrap, selectEl.nextSibling);
        updateInputText();

        /* 对外暴露 refresh（选项动态变化时调用） */
        wrap._hojRefresh = () => { updateInputText(); if (dropdownEl.style.display === 'block') renderList(); };

        return wrap;
    }

    /**
 * 扫描并升级所有未处理的 <select>。
 * @param {Element} [root]
 */
    function upgradeAllSelects(root) {
        const scope = root || document;
        scope.querySelectorAll('select:not([data-hoj-el-select])').forEach(selectEl => {
            // 跳过明显不需要升级的（例如极窄场景）
            if (selectEl.closest('#hoj-favorites-panel')) return;
            upgradeSelectToElSelect(selectEl);
        });
    }
    let settingsPanel = null;
    /* ---------- 颜色预览 ---------- */
    // 需要预览的颜色配置项
    const COLOR_PREVIEW_KEYS = [
        'CardBackground', 'ListBackground', 'ListBackgroundGreen', 'ListBackgroundHover',
        'CodeBlockBackground', 'InputAreaBackground',
        'ButtonBackground', 'ButtonBackgroundHover', 'ButtonBackgroundActive',
        'TooltipBackground',
        'TextDark', 'TextDarkDisabled', 'TextLight', 'TextBlue', 'TextLink',
        'SelectText'
    ];

    // key → CSS 变量名
    const COLOR_KEY_TO_VAR = {
        CardBackground:         '--hoj-card-bg',
        ListBackground:         '--hoj-list-bg',
        ListBackgroundGreen:    '--hoj-list-bg-green',
        ListBackgroundHover:    '--hoj-list-bg-hover',
        CodeBlockBackground:    '--hoj-code-bg',
        InputAreaBackground:    '--hoj-input-bg',
        ButtonBackground:       '--hoj-button-bg',
        ButtonBackgroundHover:  '--hoj-button-bg-hover',
        ButtonBackgroundActive: '--hoj-button-bg-active',
        TooltipBackground:      '--hoj-tooltip-bg',
        TextDark:               '--hoj-text-dark',
        TextDarkDisabled:       '--hoj-text-dark-disabled',
        TextLight:              '--hoj-text-light',
        TextBlue:               '--hoj-text-blue',
        TextLink:               '--hoj-text-link',
        SelectText:             '--hoj-select-text'
    };

    /** 判断一个值是否是合法颜色 */
    function isColorValue(v) {
        if (!v || typeof v !== 'string') return false;
        v = v.trim();
        if (v === '' || v === 'Default') return false;
        if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)) return true;
        if (/^(rgb|rgba|hsl|hsla)\(/i.test(v)) return true;
        if (/^[a-z]+$/i.test(v)) return true;
        return false;
    }

    /**
 * 计算某个 key 在 "Default" 下实际生效的颜色
 * 会随 LiquidGlassUI / DarkMode 等联动
 */
    function getDefaultColorFor(key) {
        const varName = COLOR_KEY_TO_VAR[key];
        if (!varName) return '';
        try {
            // 用一份"该 key = Default"的临时配置走一遍 buildVars
            const temp = { ...config, [key]: 'Default' };
            const vars = buildVars(temp);
            return (vars[varName] || '').trim();
        } catch (e) {
            console.warn('[SmartHOJ] 计算 Default 颜色失败:', e);
            return '';
        }
    }

    /**
 * 为所有颜色输入框追加一个预览方块
 * @param {HTMLElement} panel 设置面板根节点
 */
    function attachColorPreviews(panel) {
        COLOR_PREVIEW_KEYS.forEach(key => {
            const input = panel.querySelector(`[data-key="${key}"]`);
            if (!input) return;
            if (input.parentElement.classList.contains('hoj-input-with-preview')) return;

            // 用 wrapper 把 input 包起来
            const wrapper = document.createElement('div');
            wrapper.className = 'hoj-input-with-preview';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);

            // 预览方块
            const preview = document.createElement('span');
            preview.className = 'hoj-color-preview';
            preview.dataset.previewFor = key;
            wrapper.appendChild(preview);

            // 更新预览
            const update = () => {
                const val = input.value.trim();
                let color = '';
                let title = '';

                if (isColorValue(val)) {
                    color = val;
                    title = val;
                } else if (val === '' || val === 'Default') {
                    // 关键：Default 时显示"实际生效的默认色"
                    color = getDefaultColorFor(key);
                    title = color ? `Default → ${color}` : 'Default';
                } else {
                    title = `无效值：${val}`;
                }

                if (color) {
                    preview.style.background = color;
                    preview.style.opacity = '1';
                } else {
                    preview.style.background =
                        'repeating-conic-gradient(#ccc 0 25%, #fff 0 50%) 50% / 8px 8px';
                    preview.style.opacity = '0.6';
                }
                preview.title = title;
            };

            update();
            input.addEventListener('input', update);
            input.addEventListener('change', update);
        });
    }

    /**
 * 刷新所有预览方块
 * 当影响 Default 颜色的开关（液态玻璃 / 深色模式等）变化时调用
 */
    function refreshAllColorPreviews() {
        if (!settingsPanel) return;
        settingsPanel.querySelectorAll('.hoj-color-preview').forEach(preview => {
            const key = preview.dataset.previewFor;
            const input = settingsPanel.querySelector(`[data-key="${key}"]`);
            if (!input) return;
            input.dispatchEvent(new Event('input'));   // 触发 update
        });
    }
    function createSettingsPanel() {
        const p = document.createElement('div');
        p.id = 'hoj-settings-panel';
        p.innerHTML = `
<div class="hoj-panel-header">
    <span class="hoj-panel-title" data-i18n="panel.title">Better HOJ</span>
    <button id="hoj-import-export-btn" type="button" class="hoj-mini-btn" data-i18n="panel.importExport">导入导出</button>
    <button id="hoj-close" type="button" class="hoj-mini-btn" data-i18n="panel.close">关闭</button>
</div>
<div class="hoj-panel-body">

<!-- ==================== Better HOJ 27 ==================== -->
<div class="hoj-section" data-level="1">
    <button type="button" class="hoj-section-header">
        <i class="hoj-section-arrow el-icon-arrow-down"></i>
        <span class="hoj-section-title" data-i18n="better.title">Better HOJ 27 设置 by longStone</span>
    </button>
    <div class="hoj-section-body">

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.login">自动登录</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="login.enable">启用自动登录</span><input type="checkbox" data-key="AutoLogin"></div>
                <div class="hoj-row"><span data-i18n="login.username">默认用户名</span><input type="text" data-key="DefaultUsername"></div>
                <div class="hoj-row"><span data-i18n="login.password">默认密码</span><input type="password" data-key="DefaultPassword"></div>
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-login-manual" type="button" class="hoj-mini-btn" data-i18n="login.manual">手动登录</button>
                    <button id="hoj-logout-manual" type="button" class="hoj-mini-btn" data-i18n="login.clear">清除登录状态</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.problemTools">题目工具</span>
            </button>
            <div class="hoj-section-body">

                <div class="hoj-row">
                    <span data-i18n="cph.realurl">使用真链接（CF）</span>
                    <input type="checkbox" data-key="realCPHurl">
                </div>

                <div class="hoj-row">
                    <span data-i18n="autosave.enable">启用自动保存</span>
                    <input type="checkbox" data-key="AutoSaveCode">
                </div>

                <div class="hoj-row">
                    <span data-i18n="autosave.interval">保存频率</span>
                    <select data-key="AutoSaveCodeInterval">
                        <option value="15"  data-i18n="autosave.15">15 秒</option>
                        <option value="30"  data-i18n="autosave.30">30 秒</option>
                        <option value="60"  data-i18n="autosave.60">1 分钟</option>
                        <option value="120" data-i18n="autosave.120">2 分钟</option>
                        <option value="300" data-i18n="autosave.300">5 分钟</option>
                    </select>
                </div>

                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-clear-favorites" type="button" class="hoj-mini-btn" data-i18n="fav.clear">清空所有收藏</button>
                </div>

            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.redirect">重定向</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="redirect.enable">启用重定向</span><input type="checkbox" data-key="EnableRedirect"></div>
                <div class="hoj-row"><span data-i18n="redirect.target">重定向目标</span>
                    <select data-key="AutoRedirectHost">
                        <option value="ssf.hdoi.cn" data-i18n="redirect.host1">ssf.hdoi.cn（外网）</option>
                        <option value="oi.cnuschool.org.cn" data-i18n="redirect.host2">oi.cnuschool.org.cn（内网）</option>
                        <option value="172.16.21.199" data-i18n="redirect.host3">172.16.21.199（内网 IP）</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.checkin">每日签到</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="checkin.enable">启用签到</span><input type="checkbox" data-key="CheckInEnabled"></div>
                <div class="hoj-row"><span data-i18n="checkin.popup">签到后自动弹窗</span><input type="checkbox" data-key="CheckInAutoPopup"></div>
                <div class="hoj-row"><span data-i18n="checkin.luck">今日运势</span><span id="hoj-checkin-luck" style="font-weight:600;">…</span></div>
                <div class="hoj-row" style="flex-wrap:wrap;">
                    <button id="hoj-checkin-do" type="button" class="hoj-mini-btn" data-i18n="checkin.do">立即签到</button>
                    <button id="hoj-checkin-refresh" type="button" class="hoj-mini-btn" data-i18n="checkin.refresh">刷新状态</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.tag">个人标签</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="tag.text">标签文字</span><input type="text" data-key="CustomRankTag"></div>
                <div class="hoj-row"><span data-i18n="tag.color">标签颜色</span><input type="text" data-key="CustomRankTagColor" placeholder="#18BE6A"></div>
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-tag-refresh" type="button" class="hoj-mini-btn" data-i18n="tag.refresh">刷新云端标签</button>
                    <button id="hoj-tag-push" type="button" class="hoj-mini-btn" data-i18n="tag.push">重新上传当前标签</button>
                    <button id="hoj-tag-delete" type="button" class="hoj-mini-btn" data-i18n="tag.delete">清除云端标签</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.tools">小组件</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="tools.enable">启用小组件</span><input type="checkbox" data-key="ToolsEnabled"></div>
                <div class="hoj-row"><span data-i18n="tools.keystroke">按键显示</span><input type="checkbox" data-key="ToolsKeystroke"></div>
                <div class="hoj-row"><span data-i18n="tools.time">今日使用时长</span><input type="checkbox" data-key="ToolsPageTime"></div>
                <div class="hoj-row"><span data-i18n="tools.clock">时钟</span><input type="checkbox" data-key="ToolsClock"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.rec">题目推荐</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="rec.cfname">Codeforces 用户名</span><input type="text" data-key="hdnoipCFName"></div>
            </div>
        </div>
        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.vditor">Vditor</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row">
                    <span data-i18n="vditor.publishOverride">讨论发布覆盖</span>
                    <input type="checkbox" data-key="VditorDiscussionPublish">
                </div>
                <div class="hoj-row">
                    <span data-i18n="vditor.editOverride">讨论编辑覆盖</span>
                    <input type="checkbox" data-key="VditorDiscussionEdit">
                </div>
                <div class="hoj-row">
                    <span data-i18n="vditor.groupCreateOverride">创建团队覆盖</span>
                    <input type="checkbox" data-key="VditorGroupCreate">
                </div>
                <div class="hoj-row">
                    <span data-i18n="vditor.uploadMode">图片 / 文件上传</span>
                    <select data-key="VditorUploadMode">
                        <option value="disabled" data-i18n="vditor.uploadModeDisabled"></option>
                        <option value="admin"    data-i18n="vditor.uploadModeAdmin"></option>
                        <option value="group"    data-i18n="vditor.uploadModeGroup"></option>
                    </select>
                </div>
                <div class="hoj-row" id="hoj-vditor-gid-row" style="display:none;">
                    <span data-i18n="vditor.uploadGid">团队 ID</span>
                    <input type="text" data-key="VditorUploadGid" placeholder="114514">
                </div>
            </div>
        </div>
        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.navbar">菜单栏</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-navbar-layout-btn" type="button" class="hoj-mini-btn" data-i18n="navbar.config">配置菜单栏布局</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.snippet">片段</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row">
                    <span data-i18n="snippet.hotkey">唤出面板快捷键</span>
                    <input type="text" data-key="SnippetPanelHotkey" readonly style="cursor:pointer;">
                </div>
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-snippet-manage-btn" type="button" class="hoj-mini-btn" data-i18n="snippet.manage">管理片段</button>
                    <button id="hoj-snippet-open-btn" type="button" class="hoj-mini-btn" data-i18n="snippet.open">打开片段面板</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.about">关于</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="about.showVersion">显示版本信息</span><input type="checkbox" data-key="ShowVersion"></div>
                <div class="hoj-row hoj-version-row" id="hoj-version-row" title="">
                    <span data-i18n="about.version">版本</span>
                    <span class="hoj-version-text">${VERSION_INFO.name} (${VERSION_INFO.version})</span>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- ==================== Smart HOJ 27 ==================== -->
<div class="hoj-section" data-level="1">
    <button type="button" class="hoj-section-header">
        <i class="hoj-section-arrow el-icon-arrow-down"></i>
        <span class="hoj-section-title" data-i18n="smart.title">Smart HOJ 27 设置 by OIerZhang</span>
    </button>
    <div class="hoj-section-body">
        <div class="hoj-row"><span data-i18n="smart.enable">启用 Smart HOJ</span><input type="checkbox" data-key="Open"></div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.general">通用</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="general.smoothScroll">平滑滚动</span><input type="checkbox" data-key="SmoothScroll"></div>
                <div class="hoj-row"><span data-i18n="general.smoothSwitch">平滑的页面过渡</span><input type="checkbox" data-key="SmoothSwitch"></div>
                <div class="hoj-row"><span data-i18n="general.dark">深色模式</span><input type="checkbox" data-key="DarkMode"></div>
                <div class="hoj-row" id="hoj-mouse-glow-row" style="display:none;"><span data-i18n="general.mouseGlow">鼠标光晕（需要重新加载）</span><input type="checkbox" data-key="MouseGlow"></div>
                <div class="hoj-row"><span data-i18n="general.liquidGlass">液态玻璃 UI</span><input type="checkbox" data-key="LiquidGlassUI"></div>
                <div class="hoj-row"><span data-i18n="general.better404">更好的 404 页面</span><input type="checkbox" data-key="BetterNotFound"></div>
                <div class="hoj-row"><span data-i18n="general.hideNew">隐藏体验新版</span><input type="checkbox" data-key="HideNewHOJ"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.background">背景</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="bg.source">内置背景来源</span>
                    <select data-key="ImageSource">
                        <option value="Source1">Source1</option>
                        <option value="Source2">Source2</option>
                        <option value="Source3">Source3</option>
                        <option value="Source4">Source4</option>
                    </select>
                </div>
                <div class="hoj-row"><span data-i18n="bg.builtin">内置背景</span>
                    <select data-key="BuiltinBackground">
                        <option value="Custom">Custom</option>
                        <option value="Classic">Classic</option>
                        <option value="BigSur">BigSur</option>
                        <option value="Monterey">Monterey</option>
                        <option value="Ventura">Ventura</option>
                        <option value="Sonoma">Sonoma</option>
                        <option value="Sequoia">Sequoia</option>
                        <option value="Tahoe">Tahoe</option>
                        <option value="GoldenGate">GoldenGate</option>
                        <option value="Twilight">Twilight</option>
                        <option value="Sunset">Sunset</option>
                        <option value="Mojave">Mojave</option>
                        <option value="Catalina">Catalina</option>
                    </select>
                </div>
                <div class="hoj-row"><span data-i18n="bg.custom">自定义背景 URL</span><input type="text" data-key="CustomBackground" placeholder="None"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.card">卡片</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="card.bg">卡片背景</span><input type="text" data-key="CardBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="card.blur">卡片模糊</span><input type="text" data-key="CardBlurRadius" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="card.radius">卡片圆角</span><input type="text" data-key="CardRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.list">列表</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="list.bg">列表背景</span><input type="text" data-key="ListBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="list.bgGreen">列表背景绿</span><input type="text" data-key="ListBackgroundGreen" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="list.bgHover">列表 hover</span><input type="text" data-key="ListBackgroundHover" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.code">代码块</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="code.bg">代码块背景</span><input type="text" data-key="CodeBlockBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="code.radius">代码块圆角</span><input type="text" data-key="CodeBlockRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.input">输入框</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="input.bg">输入框背景</span><input type="text" data-key="InputAreaBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="input.radius">输入框圆角</span><input type="text" data-key="InputAreaRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.button">按钮</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="button.bg">按钮背景</span><input type="text" data-key="ButtonBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="button.hover">按钮 hover</span><input type="text" data-key="ButtonBackgroundHover" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="button.active">按钮 active</span><input type="text" data-key="ButtonBackgroundActive" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="button.radius">按钮圆角</span><input type="text" data-key="ButtonRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.misc">其他</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="misc.tagRadius">Tag 圆角</span><input type="text" data-key="TagRadius" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="misc.tooltipBg">提示框背景</span><input type="text" data-key="TooltipBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="misc.tooltipRadius">提示框圆角</span><input type="text" data-key="TooltipRadius" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="misc.judgeRadius">评测色块圆角</span><input type="text" data-key="JudgeDetailBlockRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.text">文字</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="text.dark">深色文字</span><input type="text" data-key="TextDark" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.darkDisabled">禁用文字</span><input type="text" data-key="TextDarkDisabled" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.light">浅色文字</span><input type="text" data-key="TextLight" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.blue">蓝色文字</span><input type="text" data-key="TextBlue" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.link">链接颜色</span><input type="text" data-key="TextLink" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.select">选中文字背景</span><input type="text" data-key="SelectText" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.font">字体</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="font.memorizing">易于记忆的字体</span><input type="checkbox" data-key="MemorizingFont"></div>
                <div class="hoj-row"><span data-i18n="font.sans">无衬线字体</span><input type="text" data-key="SansFont" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="font.mono">等宽字体</span><input type="text" data-key="MonoFont" placeholder="Default"></div>
            </div>
        </div>

    </div>
</div>

</div>

<div class="hoj-panel-footer">
    <label class="hoj-footer-fullscreen">
        <input type="checkbox" id="hoj-fullscreen-toggle">
        <span data-i18n="panel.fullscreen">全屏显示</span>
    </label>
</div>
`;
        /* ---------- 全屏开关 ---------- */
        const fsToggle = p.querySelector('#hoj-fullscreen-toggle');
        if (fsToggle) {
            fsToggle.checked = !!config.SettingsFullscreen;
            fsToggle.addEventListener('change', () => {
                config.SettingsFullscreen = fsToggle.checked;
                saveConfig(config);
                applySettingsPanelFullscreen();
            });
        }
        document.body.appendChild(p);
        upgradeAllSelects(p);
        // 首次应用
        WebI18n.apply(p);

        // 语言变化时刷新
        WebI18n.onChange(() => {
            if (p.isConnected) WebI18n.apply(p);
        });
        /* ---------- 关于 · 版本：点击复制版本信息 ---------- */
        (function initVersionCopy() {
            const row = p.querySelector('#hoj-version-row');
            if (!row) return;

            const textEl = row.querySelector('.hoj-version-text');

            // i18n 提示（标题 + 点击反馈）
            const setTitle = () => {
                row.title = WebI18n.t('about.copyVersionHint');
            };
            setTitle();

            // 语言变化时同步 title
            WebI18n.onChange(() => {
                if (row.isConnected) setTitle();
            });

            row.style.cursor = 'pointer';
            row.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const versionStr = `${VERSION_INFO.name} (${VERSION_INFO.version})`;

                // 优先 GM_setClipboard，回退到 navigator.clipboard / execCommand
                const done = () => {
                    NewAlert(WebI18n.t('about.copied', { v: versionStr }), 'success', 1500);
                    // 视觉反馈：短暂高亮
                    const oldBg = row.style.background;
                    row.style.transition = 'background .15s';
                    row.style.background = 'rgba(64, 158, 255, .12)';
                    setTimeout(() => { row.style.background = oldBg; }, 300);
                };

                try {
                    if (typeof GM_setClipboard === 'function') {
                        GM_setClipboard(versionStr);
                        done();
                        return;
                    }
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(versionStr).then(done).catch(() => {
                            // 兜底
                            _fallbackCopy(versionStr, done);
                        });
                        return;
                    }
                } catch (_) {}
                _fallbackCopy(versionStr, done);
            });

            function _fallbackCopy(str, cb) {
                const ta = document.createElement('textarea');
                ta.value = str;
                ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
                document.body.appendChild(ta);
                ta.select();
                try {
                    document.execCommand('copy');
                    cb();
                } catch (err) {
                    NewAlert(WebI18n.t('about.copyFailed'), 'error');
                } finally {
                    document.body.removeChild(ta);
                }
            }
        })();
        p.querySelectorAll('[data-key]').forEach(el => {
            const key = el.dataset.key;
            if (el.type === 'checkbox') el.checked = !!config[key];
            else el.value = config[key] ?? '';
            el.addEventListener('change', () => {
                if (el.readOnly) return;    // 只读输入框走各自专用逻辑
                if (el.type === 'checkbox') config[key] = el.checked;
                else config[key] = el.value;
                saveConfig(config);
                injectCss();
                applyBackground(config);
                applySmoothClasses();
                if (key === 'Open') {
                    // 关掉总开关时，撤销深色相关的运行时副作用
                    if (!config.Open) {
                        // 移除鼠标光晕的全局监听（如果有保存引用）
                        if (typeof destroyCardGlow === 'function') destroyCardGlow();
                        // 清掉 html 上的类
                        document.documentElement.classList.remove('hoj-dark-mode', 'hoj-lg-active');
                    }
                    // 重新应用所有类（会让 DarkMode 等一并走总开关逻辑）
                    applySmoothClasses();
                    injectCss();
                }
                if (key === 'ImageSource') syncDynamicWallpaperOptions();
                if (key === 'hdnoipCFName') {
                    // 移除旧按钮，让下一次 observer 重新注入
                    const oldBtn = document.getElementById('hoj-rec-btn');
                    if (oldBtn) oldBtn.remove();
                    if (document.getElementById('pick-one')) {
                        setTimeout(injectRecommendButton, 100);
                    }
                }

                // 深色模式切换时，同步"鼠标光晕"行的显隐
                if (key === 'DarkMode') {
                    const glowRow = p.querySelector('#hoj-mouse-glow-row');
                    if (glowRow) {
                        // 只在总开关开启时才允许鼠标光晕
                        glowRow.style.display = (config.Open && config.DarkMode) ? 'flex' : 'none';
                    }
                    if (config.Open && config.DarkMode) initCardGlow();
                }
                let _rankTagDebounce = null;
                function scheduleRankTag() {
                    if (_rankTagDebounce) clearTimeout(_rankTagDebounce);
                    _rankTagDebounce = setTimeout(() => {
                        _rankTagDebounce = null;
                        injectRankTag();
                    }, 500);
                }
                if (key === 'CustomRankTag' || key === 'CustomRankTagColor') {
                    clearTagCache();          // 清缓存，因为自己的标签变了
                    pushMyTag();              // 推送到云端
                    clearRankTags();
                    scheduleRankTag();        // 立即重新注入
                    if (isUserHomePage()) {
                        document.querySelectorAll('.hoj-userhome-tag').forEach(el => el.remove());
                        setTimeout(injectUserHomeTag, 100);
                    }
                }
                if (key === 'AutoSaveCode' || key === 'AutoSaveCodeInterval') {
                    syncAutoSaveCode();
                }
                if (key === 'ToolsEnabled' || key === 'ToolsKeystroke' || key === 'ToolsPageTime' ||
                    key === 'ToolsClock') {
                    initAllTools();
                }
                if (key === 'VditorDiscussionPublish'
                    || key === 'VditorDiscussionEdit'
                    || key === 'VditorGroupCreate') {

                    // 清掉所有拦截标记，让下次 observer / 手动调用按新配置重新评估
                    document.querySelectorAll('[data-hoj-disc-intercepted]').forEach(b => {
                        delete b.dataset.hojDiscIntercepted;
                    });
                    document.querySelectorAll('[data-hoj-edit-intercepted]').forEach(a => {
                        delete a.dataset.hojEditIntercepted;
                    });
                    document.querySelectorAll('[data-hoj-create-group-intercepted]').forEach(b => {
                        delete b.dataset.hojCreateGroupIntercepted;
                    });

                    // 打开时立即尝试重新注入
                    if (config.VditorDiscussionPublish) injectDiscussionInterceptor();
                    if (config.VditorDiscussionEdit)    injectDiscussionEditInterceptor();
                    if (config.VditorGroupCreate)       injectCreateGroupInterceptor();
                }
                if (key === 'VditorUploadMode') {
                    const row = p.querySelector('#hoj-vditor-gid-row');
                    if (row) row.style.display = config.VditorUploadMode === 'group' ? 'flex' : 'none';
                }
            });
            refreshAllColorPreviews();
        });

        attachColorPreviews(p);

        /* ---------- 折叠交互 ---------- */
        p.querySelectorAll('.hoj-section > .hoj-section-header').forEach(header => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const section = header.parentElement;
                if (section) section.classList.toggle('collapsed');
            });
        });
        p.querySelector('#hoj-clear-favorites').addEventListener('click', async () => {
            const ok = await NewDialog({
                title: '@fav.clearConfirm.title',
                content: '@fav.clearConfirm.body',
                type: 'warning'
            });
            if (!ok) return;
            clearAllFavorites();
        });

        p.querySelector('#hoj-close').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeSettingsPanel();
        });
        syncDynamicWallpaperOptions();
        // 鼠标光晕：仅深色模式时显示
        const glowRow = p.querySelector('#hoj-mouse-glow-row');
        const syncGlowRow = () => {
            glowRow.style.display = config.DarkMode ? 'flex' : 'none';
        };
        syncGlowRow();
        // 展示今日运势
        const luckEl = p.querySelector('#hoj-checkin-luck');
        const syncLuck = async () => {
            if (!config.CheckInEnabled) {
                luckEl.textContent = '已禁用';
                luckEl.style.color = '#909399';
                return;
            }
            luckEl.textContent = '加载中…';
            luckEl.style.color = '#909399';
            const st = await fetchCheckInStatus();
            if (!st) {
                luckEl.textContent = '获取失败';
                return;
            }
            if (st.checkedInToday) {
                luckEl.textContent = st.luck || '未知';
                luckEl.style.color = LUCK_COLOR[st.luck] || '#909399';
            } else {
                luckEl.textContent = '未签到';
                luckEl.style.color = '#909399';
            }
        };
        syncLuck();
        /* Vditor 团队 ID 显隐 */
        const syncGidRow = () => {
            const row = p.querySelector('#hoj-vditor-gid-row');
            if (row) row.style.display = config.VditorUploadMode === 'group' ? 'flex' : 'none';
        };
        syncGidRow();
        bindClick(p, '#hoj-import-export-btn', () => openImportExportDialog());
        // 立即签到
        bindClick(p, '#hoj-checkin-do', async () => {
            if (!config.CheckInEnabled) return NewAlert('@checkin.disabled', 'warning');
            const st = await fetchCheckInStatus();
            if (!st) return NewAlert('查询失败', 'error');
            if (st.checkedInToday) {
                showCheckInResult({ date: st.date, luck: st.luck, result: st.result, alreadyCheckedIn: true });
                return;
            }
            const info = await doDailyCheckIn();
            if (!info) return NewAlert('签到失败', 'error');
            showCheckInResult(info);
            syncLuck();
            // 同步主页按钮样式
            injectCheckInButton();
        });

        // 刷新
        bindClick(p, '#hoj-checkin-refresh', async () => {
            await syncLuck();
            const st = await fetchCheckInStatus();
            if (!st) return NewAlert('查询失败', 'error');
            if (st.checkedInToday) {
                NewAlert(`今日已签到：${st.luck} —— ${st.result}`, 'success', 5000);
            } else {
                NewAlert('今日尚未签到', 'warning');
            }
        });
        // 刷新云端标签 拉远程覆盖本地
        bindClick(p, '#hoj-tag-refresh', async () => {
            await getTagfromRemote();

            // 同步 UI 输入框
            const tagInput = p.querySelector('[data-key="CustomRankTag"]');
            const colorInput = p.querySelector('[data-key="CustomRankTagColor"]');
            if (tagInput) tagInput.value = config.CustomRankTag;
            if (colorInput) colorInput.value = config.CustomRankTagColor;
            NewAlert(`已刷新：${config.CustomRankTag}`, 'success');
        });

        // 上传当前标签 → 把本地配置推到云端
        bindClick(p, '#hoj-tag-push', async () => {
            const tagname = (config.CustomRankTag || '').trim();
            if (!tagname) return NewAlert('请先填写标签文字', 'warning');
            await pushMyTag();
            NewAlert('已上传标签', 'success');
        });

        // 清除云端标签
        bindClick(p, '#hoj-tag-delete', async () => {
            const ok = await NewDialog({
                title: '@tag.clearConfirm.title',
                content: '@tag.clearConfirm.body',
                type: 'warning'
            });
            if (!ok) return;

            const r = await deleteMyTag();
            if (r.success) {
                // 同步 UI 输入框
                const tagInput = p.querySelector('[data-key="CustomRankTag"]');
                const colorInput = p.querySelector('[data-key="CustomRankTagColor"]');
                if (tagInput) tagInput.value = '';
                if (colorInput) colorInput.value = '#18BE6A';
                NewAlert('@tag.cleared', 'success');
            } else {
                NewAlert('清除失败：' + r.message, 'error');
            }

        });

        bindClick(p, '#hoj-login-manual', async () => {

            const username = config.DefaultUsername;
            const password = config.DefaultPassword;
            NewAlert('@login.manualLogging', 'success');
            const ok = await doLogin(username, password);
            if (ok) {
                console.log('[AutoLogin] 自动登录成功');
                NewAlert('@login.autoSuccess', 'success');
                location.reload();
            } else {
                console.warn('[AutoLogin] 自动登录失败');
                NewAlert('@login.autoFailed', 'error');
            }
        });
        bindClick(p, '#hoj-logout-manual', () => {
            NewDialog({
                title: '确认清除',
                content: '将清除当前登录信息，是否继续',
                type: 'warning'
            }).then((ok) => {
                if (ok) {
                    clearLocalLogin();
                    location.reload();
                }
            });
        });
        bindClick(p, '#hoj-navbar-layout-btn', () => {
            openNavbarLayoutDialog();
        });
        // 唤出面板快捷键捕获
        (function initSnippetHotkeyInput() {
            const hkInput = p.querySelector('[data-key="SnippetPanelHotkey"]');
            if (!hkInput) return;
            hkInput.value = config.SnippetPanelHotkey
                ? formatHotkeyDisplay(config.SnippetPanelHotkey) : '';
            hkInput.addEventListener('keydown', (e) => {
                console.log('[Hotkey] keydown',
                            { key: e.key, code: e.code, ctrl: e.ctrlKey, alt: e.altKey, shift: e.shiftKey, meta: e.metaKey,
                             target: e.target && e.target.tagName, prevented: e.defaultPrevented });
                // 1) 纯修饰键
                if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                // 2) 其它键
                e.preventDefault();
                e.stopPropagation();
                // 3) 清空
                if (['Escape', 'Backspace', 'Delete'].includes(e.key)) {
                    config.SnippetPanelHotkey = '';
                    saveConfig(config);
                    hkInput.value = '';
                    return;
                }
                // 4) 归一化
                const hk = normalizeHotkey(e);
                if (hk) {
                    config.SnippetPanelHotkey = hk;
                    saveConfig(config);
                    hkInput.value = formatHotkeyDisplay(hk);
                } else {
                    hkInput.value = '需包含 Ctrl/Alt/Win 修饰键';
                    setTimeout(() => {
                        hkInput.value = config.SnippetPanelHotkey
                            ? formatHotkeyDisplay(config.SnippetPanelHotkey) : '';
                    }, 700);
                }
            });
            hkInput.addEventListener('focus', () => hkInput.select());
        })();

        bindClick(p, '#hoj-snippet-manage-btn', () => openSnippetManager());
        bindClick(p, '#hoj-snippet-open-btn',   () => openSnippetPanel());
        // 启用拖拽
        enablePanelDrag(p);
        return p;
    }
    let _outsideClickHandler = null;
    /**
 * 给设置面板加拖拽：拖 h3 标题移动，关闭时复位
 */
    function enablePanelDrag(panel) {
        const handle = panel.querySelector('.hoj-panel-header');
        if (!handle) return;

        handle.style.cursor = 'move';
        handle.style.userSelect = 'none';
        handle.style.touchAction = 'none';

        let dragging = false;
        let startX = 0, startY = 0;
        let startLeft = 0, startTop = 0;

        const onMouseDown = (e) => {
            if (panel.classList.contains('hoj-fullscreen')) return;   // 移动端不能拖
            if (e.button !== 0) return;              // 只响应左键
            if (e.target.closest('button')) return;   // 点在按钮上不拖
            e.preventDefault();

            dragging = true;
            const rect = panel.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            startLeft = rect.left;
            startTop = rect.top;

            // 从 right 定位切到 left 定位
            panel.style.right = 'auto';
            panel.style.left = rect.left + 'px';
            panel.style.top  = rect.top + 'px';

            document.addEventListener('mousemove', onMouseMove, true);
            document.addEventListener('mouseup', onMouseUp, true);
        };

        const onMouseMove = (e) => {
            if (!dragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newLeft = startLeft + dx;
            let newTop  = startTop  + dy;

            // 边界限制，别拖出视口
            const w = panel.offsetWidth;
            const h = panel.offsetHeight;
            newLeft = Math.max(0, Math.min(newLeft, window.innerWidth  - w));
            newTop  = Math.max(0, Math.min(newTop,  window.innerHeight - h));

            panel.style.left = newLeft + 'px';
            panel.style.top  = newTop  + 'px';
        };

        const onMouseUp = () => {
            dragging = false;
            document.removeEventListener('mousemove', onMouseMove, true);
            document.removeEventListener('mouseup', onMouseUp, true);
        };

        handle.addEventListener('mousedown', onMouseDown);
    }
    function toggleSettingsPanel() {
        if (!settingsPanel) settingsPanel = createSettingsPanel();
        const willOpen = !settingsPanel.classList.contains('open');
        settingsPanel.classList.toggle('open');
        if (willOpen) {
            applySettingsPanelFullscreen();
            setTimeout(() => {
                syncDynamicWallpaperOptions();
                _outsideClickHandler = (ev) => {
                    const target = ev.target;

                    // 1. 点在设置面板内 → 不关闭
                    if (settingsPanel.contains(target)) return;

                    // 2. 点在触发按钮上 → 交给按钮自己处理
                    const trigger = document.getElementById('hoj-settings-btn');
                    if (trigger && trigger.contains(target)) return;

                    // 3. 点在 Dialog（含遮罩）内 → 不关闭设置面板
                    if (
                        target.closest('.hoj-dialog') ||
                        target.closest('.hoj-dialog-mask')
                    ) return;

                    // ★ 4. 点在 el-select 的下拉层 / 触发器内 → 不关闭面板
                    if (
                        target.closest('.hoj-el-select-dropdown') ||
                        target.closest('.hoj-el-select-wrap')
                    ) return;

                    // 5. 其它情况 → 关闭
                    closeSettingsPanel();
                };
                document.addEventListener('mousedown', _outsideClickHandler, true);
            }, 0);
        } else {
            removeOutsideListener();
        }
    }

    function closeSettingsPanel() {
        if (!settingsPanel) return;
        settingsPanel.classList.remove('open');
        settingsPanel.classList.remove('hoj-fullscreen');
        settingsPanel.style.left = '';
        settingsPanel.style.top = '';
        settingsPanel.style.right = '';
        settingsPanel.style.width = '';

        document.querySelectorAll('.hoj-el-select-dropdown').forEach(dd => {
            dd.style.display = 'none';
        });
        document.querySelectorAll('.hoj-el-select-wrap .el-select__caret.is-reverse').forEach(el => {
            el.classList.remove('is-reverse');
        });

        removeOutsideListener();

        const btn = document.getElementById('hoj-settings-btn');
        if (btn) btn.classList.remove('is-active');

        const newBtn = document.getElementById('hoj-new-settings-btn');
        if (newBtn) {
            newBtn.classList.remove('animate-active-breath');
            newBtn.style.color = '#86868B';
            newBtn.style.fontWeight = '';
        }
    }

    function removeOutsideListener() {
        if (_outsideClickHandler) {
            document.removeEventListener('mousedown', _outsideClickHandler, true);
            _outsideClickHandler = null;
        }
    }

    /* =========================================================
     * 八、注入设置按钮到菜单栏
     * ========================================================= */
    /* ============================================================
 * 新前端：注入 Better HOJ 配置按钮
 * ============================================================ */
    function injectNewHeaderButton() {
        const path = window.location.pathname;

        // 只在新前端路径下生效
        if (!path.startsWith('/new')) {
            const old = document.getElementById('hoj-new-settings-btn');
            if (old) old.remove();
            return false;
        }

        if (document.getElementById('hoj-new-settings-btn')) return true;

        // 定位新前端左侧 nav（Vue scope 属性）
        const nav = document.querySelector('nav[data-v-7b0404d0]')
        || document.querySelector('nav[data-v-9dacc850]');
        if (!nav) return false;

        // 用现有 gear-item 当模板
        const firstGear = nav.querySelector('button.gear-item');
        if (!firstGear) return false;
        const container = firstGear.parentElement;

        const btn = document.createElement('button');
        btn.id = 'hoj-new-settings-btn';
        btn.className = firstGear.className;
        btn.style.color = '#86868B';
        btn.innerHTML = `
        <span class="w-4 h-4 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
        </span>
        <span class="truncate">Better HOJ</span>
    `;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // 复用旧的设置面板逻辑
            // 旧面板定位于右上角，和 new 前端不冲突，直接复用
            toggleSettingsPanel();

            // 同步激活态
            const opened = settingsPanel && settingsPanel.classList.contains('open');
            btn.classList.toggle('animate-active-breath', !!opened);
            btn.style.color = opened ? '#007AFF' : '#86868B';
            btn.style.fontWeight = opened ? 'bold' : '';
        });

        container.appendChild(btn);
        scheduleApplyNavbarLayout(100);
        console.log('[NewHeader] Better HOJ 按钮已注入');
        return true;
    }
    /* ============================================================
 * 移动端：在 mu-drawer 末尾注入 Better HOJ 入口
 * ============================================================ */
    function closeMobileDrawer() {
        /* ---------- 1. 尝试用 Vue 正常路径关（可选，成功最好） ---------- */
        document.querySelectorAll('.mu-overlay').forEach(overlay => {
            ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'].forEach(type => {
                try {
                    const ev = type.startsWith('touch')
                    ? new TouchEvent(type, { bubbles: true, cancelable: true })
                    : new MouseEvent(type, { bubbles: true, cancelable: true, view: window });
                    overlay.dispatchEvent(ev);
                } catch (_) {}
            });
        });

        /* ---------- 2. 无条件的强制隐藏（多次重试，防止 Vue 覆盖回来） ---------- */
        const hideAll = () => {
            // 抽屉可能有多个；顺带清掉可能的内部开合标记
            document.querySelectorAll('.mu-drawer').forEach(d => {
                d.classList.remove('is-open');
            });

            // 遮罩可能有多个；一起处理
            document.querySelectorAll('.mu-overlay').forEach(o => {
                o.dataset.hojHidden = '1';
                o.style.display = 'none';
                o.style.pointerEvents = 'none';
                o.style.opacity = '0';
            });
        };

        // 立即执行 + 分多个时间点重试，覆盖 Vue 的异步渲染
        hideAll();
        [16, 50, 120, 300, 600].forEach(t => setTimeout(hideAll, t));
    }

    /**
 * 只装一次
 */
    function installDrawerOverlaySync() {
        if (installDrawerOverlaySync._done) return;
        installDrawerOverlaySync._done = true;

        const restoreOverlayIfNeeded = () => {
            const drawers  = document.querySelectorAll('.mu-drawer');
            const overlays = document.querySelectorAll('.mu-overlay');
            if (!drawers.length || !overlays.length) return;

            const anyOpen = [...drawers].some(d => d.classList.contains('is-open'));
            if (!anyOpen) return;

            overlays.forEach(o => {
                if (o.dataset.hojHidden === '1') {
                    o.style.display = '';
                    o.style.pointerEvents = '';
                    o.style.opacity = '';
                    delete o.dataset.hojHidden;
                }
            });
        };

        new MutationObserver(restoreOverlayIfNeeded).observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }
    function injectMobileMenuButton() {
        const drawer = document.querySelector('.mu-drawer');
        if (!drawer) return false;   // 非移动端，直接返回

        // 已注入
        if (drawer.querySelector('#hoj-mobile-settings-btn')) return true;

        const list = drawer.querySelector('ul.mu-list');
        if (!list) return false;

        const li = document.createElement('li');
        li.id = 'hoj-mobile-settings-btn';
        li.className = 'hoj-mobile-menu-item';

        li.innerHTML = `
        <a class="mu-item-wrapper">
            <div class="mu-item">
                <div class="mu-ripple-wrapper"></div>
                <div class="mu-item-action">
                    <i class="mu-icon el-icon-setting"
                       style="user-select:none;font-size:24px;width:24px;height:24px;"></i>
                </div>
                <div class="mu-item-title">Better HOJ</div>
            </div>
        </a>
    `;
        li.querySelector('.mu-item-wrapper').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileDrawer();               // 统一关闭
            openSettingsPanelFullscreen();
        });

        list.appendChild(li);
        console.log('[MobileMenu] Better HOJ 入口已注入');
        return true;
    }

    /** 打开设置面板并进入全屏模式 */
    function openSettingsPanelFullscreen() {
        if (!settingsPanel) settingsPanel = createSettingsPanel();

        settingsPanel.style.left = '';
        settingsPanel.style.top = '';
        settingsPanel.style.right = '';
        settingsPanel.style.width = '';

        settingsPanel.classList.add('open');
        applySettingsPanelFullscreen(true);

        const header = settingsPanel.querySelector('.hoj-panel-header');
        if (header) header.style.touchAction = 'auto';

        requestAnimationFrame(() => {
            const r = settingsPanel.getBoundingClientRect();
            console.log('[MobileMenu] 全屏面板 rect:', r.width, r.height);
        });
    }
    /**
 * 应用设置面板的全屏状态
 * @param {boolean} [force]
 *   不传：按 config.SettingsFullscreen 应用
 *   传 true：本次强制全屏（不写入 config）
 *   传 false：本次强制非全屏（不写入 config）
 */
    function applySettingsPanelFullscreen(force) {
        if (!settingsPanel) return;

        const on = (force === undefined)
        ? !!config.SettingsFullscreen
        : !!force;

        if (on) {
            // 复位拖拽残留
            settingsPanel.style.left = '';
            settingsPanel.style.top = '';
            settingsPanel.style.right = '';
            settingsPanel.style.width = '';
            settingsPanel.classList.add('hoj-fullscreen');
        } else {
            settingsPanel.classList.remove('hoj-fullscreen');
            settingsPanel.style.left = '';
            settingsPanel.style.top = '';
            settingsPanel.style.right = '';
            settingsPanel.style.width = '';
        }

        // footer checkbox 始终反映"实际视觉状态"
        const t = settingsPanel.querySelector('#hoj-fullscreen-toggle');
        if (t) t.checked = on;
    }
    function injectSettingsButton() {
        const menu = document.querySelector('#header ul.el-menu.el-menu--horizontal, #header ul.el-menu--horizontal');
        if (!menu) return false;

        let li = document.getElementById('hoj-settings-btn');
        if (!li) {
            li = document.createElement('li');
            li.id = 'hoj-settings-btn';
            li.className = 'el-menu-item';
            li.setAttribute('role', 'menuitem');
            li.setAttribute('tabindex', '0');
            li.innerHTML = '<i class="el-icon-setting"></i>Better HOJ';
            li.style.cursor = 'pointer';
            li.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSettingsPanel();

                // 同步 is-active 类，与导航栏其它激活项保持一致
                const opened = settingsPanel && settingsPanel.classList.contains('open');
                li.classList.toggle('is-active', !!opened);
            });
            menu.appendChild(li);
        }
        return true;
    }
    /* ============================================================
 * Tampermonkey 菜单命令
 * ============================================================ */
    let _menuCommandIds = [];   // 保存返回的 id，方便注销/重建

    function _unregisterMenuCommands() {
        if (typeof GM_unregisterMenuCommand !== 'function') return;
        _menuCommandIds.forEach(id => {
            try { GM_unregisterMenuCommand(id); } catch (_) {}
        });
        _menuCommandIds = [];
    }

    function _addMenuCommand(label, fn) {
        if (typeof GM_registerMenuCommand !== 'function') return;
        try {
            const id = GM_registerMenuCommand(label, fn);
            if (id != null) _menuCommandIds.push(id);
        } catch (e) {
            console.warn('[MenuCommand] 注册失败:', label, e);
        }
    }

    function registerMenuCommands() {
        if (typeof GM_registerMenuCommand !== 'function') return;

        // 先清空旧的，避免热重载 / 重入时菜单重复
        _unregisterMenuCommands();

        // 文案走 WebI18n，与其它 UI 保持一致
        _addMenuCommand(WebI18n.t('menu.openSettings'), () => {
            toggleSettingsPanel();
        });

        _addMenuCommand(WebI18n.t('menu.toggleDarkMode'), () => {
            config.DarkMode = !config.DarkMode;
            saveConfig(config);
            injectCss();
            applySmoothClasses();
            if (config.DarkMode) initCardGlow();
            NewAlert(
                config.DarkMode ? '@menu.darkOn' : '@menu.darkOff',
                'success', 1500
            );
        });

        _addMenuCommand(WebI18n.t('menu.toggleSmartHoj'), () => {
            config.Open = !config.Open;
            saveConfig(config);
            // 更新设置面板里的开关（如果已创建）
            if (settingsPanel) {
                const cb = settingsPanel.querySelector('[data-key="Open"]');
                if (cb) cb.checked = config.Open;
            }
            injectCss();
            applyBackground(config);
            applySmoothClasses();
            syncMemorizingFont();
            initAllTools();
            scheduleApplyNavbarLayout(0);
            NewAlert(
                config.Open ? '@menu.smartOn' : '@menu.smartOff',
                'success', 1500
            );
        });

        _addMenuCommand(WebI18n.t('menu.openSnippetPanel'), () => {
            openSnippetPanel();
        });

        _addMenuCommand(WebI18n.t('menu.manageSnippets'), () => {
            openSnippetManager();
        });

        _addMenuCommand(WebI18n.t('menu.importExport'), () => {
            openImportExportDialog();
        });

        _addMenuCommand(WebI18n.t('menu.togglePanelFullscreen'), () => {
            if (!settingsPanel) settingsPanel = createSettingsPanel();
            const cur = settingsPanel.classList.contains('hoj-fullscreen');
            applySettingsPanelFullscreen(!cur);
        });

        console.log('[MenuCommand] 已注册', _menuCommandIds.length, '项命令');
    }
    /* =========================================================
     * 九、工具集
     * ========================================================= */
    function checkInRemote(username) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'POST',
                url: `${HOJTAG_BASE}/checkin`,
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({ username }),
                onload: (r) => {
                    if (r.status === 200) {
                        try {
                            const data = JSON.parse(r.responseText);
                            if (data.success && data.data) return resolve(data.data);
                        } catch (e) {}
                    }
                    console.warn('[CheckIn] 签到失败:', r.status, r.responseText);
                    resolve(null);
                },
                onerror: () => { console.warn('[CheckIn] 网络错误'); resolve(null); },
                ontimeout: () => { console.warn('[CheckIn] 超时'); resolve(null); }
            });
        });
    }

    /** GET /checkin?username=xxx — 查询签到状态 */
    function queryCheckInRemote(username) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `${HOJTAG_BASE}/checkin?username=${encodeURIComponent(username)}`,
                onload: (r) => {
                    if (r.status === 200) {
                        try {
                            const data = JSON.parse(r.responseText);
                            if (data.success && data.data) return resolve(data.data);
                        } catch (e) {}
                    }
                    resolve(null);
                },
                onerror: () => resolve(null),
                ontimeout: () => resolve(null)
            });
        });
    }
    /**
 * 每日签到
 */
    function saveCheckInToLocalStorage(info) {
        if (!info) return;
        try {
            if (info.date)   localStorage.setItem('lastCheckInDate', info.date);
            if (info.luck)   localStorage.setItem('checkInFortuneLuck', info.luck);
            if (info.result) localStorage.setItem('checkInFortuneResult', info.result);
            console.log('[CheckIn] 已写入 localStorage:', info.date, info.luck);
        } catch (e) {
            console.warn('[CheckIn] 写入 localStorage 失败:', e);
        }
    }
    async function doDailyCheckIn() {
        if (!config.CheckInEnabled) return null;

        const username = await getCurrentUsername();
        if (!username) {
            console.log('[CheckIn] 未获取到用户名，跳过');
            return null;
        }

        const data = await checkInRemote(username);
        if (!data) return null;

        const info = {
            username: data.username || username,
            date: data.lastCheckInDate || '',
            luck: data.checkInFortuneLuck || '',
            result: data.checkInFortuneResult || '',
            alreadyCheckedIn: !!data.alreadyCheckedIn
        };

        saveCheckInToLocalStorage(info);

        console.log('[CheckIn] 接口返回:', info);
        return info;
    }

    /** 纯查询（不签到）—— 用于设置面板刷新 */
    async function fetchCheckInStatus() {
        if (!config.CheckInEnabled) return null;
        const username = await getCurrentUsername();
        if (!username) return null;
        const data = await queryCheckInRemote(username);
        if (!data) return null;

        const st = {
            username: data.username,
            checkedInToday: !!data.checkedInToday,
            date: data.lastCheckInDate,
            luck: data.checkInFortuneLuck,
            result: data.checkInFortuneResult
        };

        // 只要今日已签到就同步写入 localStorage
        if (st.checkedInToday) {
            saveCheckInToLocalStorage({
                date: st.date,
                luck: st.luck,
                result: st.result
            });
        }

        return st;
    }
    function showCheckInResult(info) {
        if (!info) return;
        const color = LUCK_COLOR[info.luck] || '#18BE6A';
        const html = `
        <div style="font-size:15px;font-weight:600;color:${color};margin-bottom:6px;">
            🎋 今日运势：${info.luck}
        </div>
        <div style="line-height:1.7;color:#24292E;">${info.result}</div>
        <div style="margin-top:8px;color:#909399;font-size:12px;">—— ${info.date}</div>
    `;
        if (typeof NewDialog === 'function') {
            NewDialog({
                title: info.alreadyCheckedIn ? '今日已签到' : '签到成功',
                html,
                confirmText: '收下好运',
                showCancel: false,
                type: 'info'
            });

            NewAlert(`今日已签到：${info.luck} —— ${info.result}`, 'success', 5000);
        } else if (typeof NewAlert === 'function') {
            NewAlert(`【${info.luck}】${info.result}`, 'success', 5000);
        } else {
            console.log(`【${info.luck}】${info.result}`);
        }
    }
    /** 从云端查询当前用户状态（不走本地缓存） */
    async function fetchCheckInStatusFromRemote() {
        const username = await getCurrentUsername();
        if (!username) return null;
        const data = await queryCheckInRemote(username);
        if (!data) return null;
        return {
            username: data.username,
            checkedInToday: !!data.checkedInToday,
            date: data.lastCheckInDate,
            luck: data.checkInFortuneLuck,
            result: data.checkInFortuneResult
        };
    }
    async function updateRankTags() {
        // 从远程获取当前用户自己的 tag
        const username = await getCurrentUsername();
        if (!username) return null;

        // 强制刷新缓存，不用旧的
        _tagCache.delete(username);
        const remote = await fetchUserTag(username);
        if (!remote || !remote.tagname) {
            console.log('[HOJTag] 云端没有当前用户的标签');
            return null;
        }

        // 更新本地配置
        config.CustomRankTag = remote.tagname;
        config.CustomRankTagColor = remote.tagcolor || '#18BE6A';
        saveConfig(config);

        console.log('[HOJTag] 已更新当前用户标签:', remote);
        return remote;
    }

    /** 本地缓存状态（设置面板快速读取） */
    function getCheckInStatus() {
        updateRankTags();
        return {
            date:   GM_getValue(CHECKIN_KEYS.date, ''),
            luck:   GM_getValue(CHECKIN_KEYS.luck, ''),
            result: GM_getValue(CHECKIN_KEYS.result, ''),
            today:  getTodayDateStr()
        };
    }

    function resetCheckIn() {
        GM_setValue(CHECKIN_KEYS.date, '');
        GM_setValue(CHECKIN_KEYS.luck, '');
        GM_setValue(CHECKIN_KEYS.result, '');
        GM_setValue(CHECKIN_KEYS.username, '');
        console.log('[CheckIn] 已重置本地缓存');
    }
    /* ============================================================
 * 主页「签到」按钮
 * ============================================================ */
    function injectCheckInButton() {
        if (!config.CheckInEnabled) return false;

        const menu = document.querySelector('#header ul.el-menu.el-menu--horizontal, #header ul.el-menu--horizontal');
        if (!menu) return false;
        if (document.getElementById('hoj-checkin-btn')) return true;

        const li = document.createElement('li');
        li.id = 'hoj-checkin-btn';
        li.className = 'el-menu-item';
        li.setAttribute('role', 'menuitem');
        li.setAttribute('tabindex', '0');
        li.style.cursor = 'pointer';

        /* ---------- 状态：未签到 / 已签到 ---------- */
        li.dataset.checkedState = 'no';   // 'yes' | 'no'

        const renderText = () => {
            const done = li.dataset.checkedState === 'yes';
            const icon = done ? 'el-icon-check' : 'el-icon-magic-stick';
            const textKey = done ? 'checkin.btnDone' : 'checkin.btn';

            li.innerHTML = `<i class="${icon}"></i>${WebI18n.t(textKey)}`;
            li.title = WebI18n.t('checkin.btnTitle');
            li.style.color = done ? '#909399' : '';
            li.style.fontWeight = done ? 'normal' : '';
        };

        /* ---------- 初次渲染 ---------- */
        renderText();

        /* ---------- 语言切换：就地刷新文案 ---------- */
        const offI18n = WebI18n.onChange(() => {
            if (!li.isConnected) { offI18n(); return; }
            renderText();
        });

        /* ---------- 状态同步 ---------- */
        const refreshStyle = async () => {
            if (!config.CheckInEnabled) return;
            const st = await fetchCheckInStatus();
            if (!st) return;
            li.dataset.checkedState = st.checkedInToday ? 'yes' : 'no';
            renderText();
        };

        /* ---------- 点击 ---------- */
        li.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!config.CheckInEnabled) return NewAlert('@checkin.disabled', 'warning');

            const st = await fetchCheckInStatus();
            if (!st) return NewAlert('@checkin.queryFailed', 'error');

            if (st.checkedInToday) {
                showCheckInResult({
                    date: st.date,
                    luck: st.luck,
                    result: st.result,
                    alreadyCheckedIn: true
                });
                return;
            }

            const info = await doDailyCheckIn();
            if (!info) return NewAlert('@checkin.failed', 'error');

            showCheckInResult(info);
            refreshStyle();
        });

        menu.appendChild(li);

        // 启动时刷一次状态（异步更新 dataset 与文案）
        refreshStyle();
        return true;
    }
    /* ============================================================
 * HOJTag 云端标签（hojtag.rkcd.me）
 * ============================================================ */

    /** 校验十六进制颜色 */
    function isValidHexColor(c) {
        return typeof c === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c.trim());
    }

    /** 把当前用户的标签推送到云端 */
    async function pushMyTag() {
        const tagname = (config.CustomRankTag || '').trim();
        const tagcolor = (config.CustomRankTagColor || '').trim();
        if (!tagname) return;               // 没有标签就不推送
        if (!isValidHexColor(tagcolor)) {
            console.warn('[HOJTag] tagcolor 非法，跳过推送:', tagcolor);
            return;
        }

        const username = await getCurrentUsername();
        if (!username) return;

        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'POST',
                url: `${HOJTAG_BASE}/update`,
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({ username, tagname, tagcolor }),
                onload: r => {
                    try {
                        const data = JSON.parse(r.responseText);
                        if (data.success) {
                            console.log('[HOJTag] 云端标签已更新:', data.data);
                        } else {
                            console.warn('[HOJTag] 更新失败:', data.error);
                        }
                    } catch (e) {
                        console.warn('[HOJTag] 解析失败:', e);
                    }
                    resolve();
                },
                onerror: () => { console.warn('[HOJTag] 网络错误'); resolve(); },
                ontimeout: () => { console.warn('[HOJTag] 超时'); resolve(); }
            });
        });
    }

    async function deleteMyTag() {
        const username = await getCurrentUsername();
        if (!username) return { success: false, message: '未获取到用户名' };

        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'POST',
                url: `${HOJTAG_BASE}/delete`,
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({ username }),
                onload: (r) => {
                    let ok = false;
                    let msg = '';
                    try {
                        const data = JSON.parse(r.responseText);
                        ok = !!data.success;
                        msg = data.message || data.error || '';
                    } catch (e) {}

                    if (r.status === 200 && ok) {
                        // 清空本地配置
                        config.CustomRankTag = '';
                        config.CustomRankTagColor = '#18BE6A';
                        saveConfig(config);

                        // 清缓存 + 重新注入
                        clearTagCache();
                        clearRankTags();
                        clearUserHomeTags();
                        if (isRankPage()) scheduleRankTag();
                        if (isUserHomePage()) injectUserHomeTag();

                        console.log('[HOJTag] 已删除云端标签:', username);
                        resolve({ success: true, message: '已清除标签' });
                    } else {
                        console.warn('[HOJTag] 删除失败:', r.status, r.responseText);
                        resolve({ success: false, message: msg || `HTTP ${r.status}` });
                    }
                },
                onerror: () => resolve({ success: false, message: '网络错误' }),
                ontimeout: () => resolve({ success: false, message: '请求超时' })
            });
        });
    }
    /** 云端标签缓存：Map<username, {tagname, tagcolor}|null> */
    const _tagCache = new Map();

    /** 查询指定用户的云端标签（带缓存） */
    function fetchUserTag(username) {
        if (_tagCache.has(username)) {
            return Promise.resolve(_tagCache.get(username));
        }
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `${HOJTAG_BASE}/query?username=${encodeURIComponent(username)}`,
                onload: r => {
                    if (r.status === 200) {
                        try {
                            const data = JSON.parse(r.responseText);
                            if (data.success && data.data) {
                                _tagCache.set(username, data.data);
                                resolve(data.data);
                                return;
                            }
                        } catch (e) {}
                    }
                    _tagCache.set(username, null);   // 404 或解析失败 → 缓存 null
                    resolve(null);
                },
                onerror: () => { _tagCache.set(username, null); resolve(null); },
                ontimeout: () => { _tagCache.set(username, null); resolve(null); }
            });
        });
    }

    /** 清空缓存（切换用户 / 更新配置时用） */
    function clearTagCache() {
        _tagCache.clear();
    }
    /* ============================================================
 * 排行榜自定义标签
 * ============================================================ */
    const CUSTOM_RANK_TAG_CLASS = 'hoj-custom-rank-tag';
    let _currentUsername = null;
    let _rankTagTimer = null;

    function isRankPage() {
        const p = window.location.pathname;
        return /\/(oi-rank|acm-rank)(\/|$)/.test(p)
        || /\/home(\/|$)/.test(p);
    }

    function isUserHomePage() {
        const p = window.location.pathname;
        // 支持 /user-home?uid=xxx
        return /^\/(user-home)(\/|$)/.test(p);
    }
    /** 获取当前登录用户名 */
    async function getCurrentUsername() {
        if (_currentUsername) return _currentUsername;
        try {
            const raw = localStorage.getItem('userInfo');
            if (raw) {
                const info = typeof raw === 'string' ? JSON.parse(raw) : raw;
                if (info && info.username) {
                    _currentUsername = info.username;
                    return _currentUsername;
                }
            }
        } catch (e) {}
        try {
            const token = localStorage.getItem('token') || '';
            const resp = await fetch(`${window.location.origin}/api/get-user-home-info`, {
                method: 'GET',
                headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const data = await resp.json();
            if (data?.status === 200 && data?.data?.username) {
                _currentUsername = data.data.username;
                return _currentUsername;
            }
        } catch (e) {}
        return null;
    }
    // 远程获取 Tag
    async function getTagfromRemote() {
        const remote = await updateRankTags();
        if (!remote) {
            NewAlert('云端无标签或请求失败', 'warning');
            return;
        }
        console.log('[RankTag] 已刷新：' + remote.tagname);
    }
    /** 判断是否为排行榜列表接口 */
    function isRankListApi(url) {
        return typeof url === 'string' && (
            url.includes('/api/get-rank-list') ||
            url.includes('/api/get-group-rank-list')
        );
    }
    /** 用户主页 tag 注入（带轮询） */
    let _userHomeTimer = null;
    async function injectUserHomeTag() {
        if (!isUserHomePage()) return;

        // 清掉之前的定时器（防止叠加）
        if (_userHomeTimer) {
            clearTimeout(_userHomeTimer);
            _userHomeTimer = null;
        }

        const MAX_TRIES = 40;   // 40 × 250ms = 10 秒
        let tries = 0;

        const poll = async () => {
            tries++;

            const infoEl = document.querySelector('.user-info');
            const nameEl = infoEl ? infoEl.querySelector('.emphasis') : null;

            console.log(`[UserHome Tag] 轮询 ${tries}: user-info=${!!infoEl}, name=${nameEl ? nameEl.textContent.trim() : 'null'}`);

            // 等两个都出现
            if (!infoEl || !nameEl) {
                if (tries < MAX_TRIES) {
                    _userHomeTimer = setTimeout(poll, 250);
                } else {
                    console.warn('[UserHome Tag] 轮询超时，未找到 .user-info');
                }
                return;
            }

            const username = nameEl.textContent.trim();
            if (!username) {
                if (tries < MAX_TRIES) {
                    _userHomeTimer = setTimeout(poll, 250);
                }
                return;
            }

            // 页面已有 tag
            if (infoEl.querySelector('.hoj-userhome-tag')) {
                console.log('[UserHome Tag] 已注入过，跳过');
                return;
            }

            const userP = nameEl.closest('p');
            if (!userP) {
                if (tries < MAX_TRIES) {
                    _userHomeTimer = setTimeout(poll, 250);
                }
                return;
            }

            let tagname = '';
            let tagcolor = '#18BE6A';

            const myName = await getCurrentUsername();
            if (myName && username === myName) {
                tagname = (config.CustomRankTag || '').trim();
                tagcolor = (config.CustomRankTagColor || '').trim() || '#18BE6A';
            } else {
                const remote = await fetchUserTag(username);
                if (remote && remote.tagname) {
                    tagname = remote.tagname;
                    tagcolor = remote.tagcolor || '#18BE6A';
                }
            }

            if (!tagname) {
                console.log('[UserHome Tag] 无 tag 可注入');
                return;
            }

            // 注入结构
            const wrapper = document.createElement('p');
            wrapper.className = 'hoj-userhome-tag';
            const outerSpan = document.createElement('span');
            const tagEl = document.createElement('span');
            tagEl.className = 'el-tag el-tag--small el-tag--dark';
            tagEl.style.backgroundColor = tagcolor;
            tagEl.textContent = ' ' + tagname + ' ';
            outerSpan.appendChild(tagEl);
            wrapper.appendChild(outerSpan);

            userP.insertAdjacentElement('afterend', wrapper);
            console.log('[UserHome Tag] 已注入:', tagname, '用户:', username);
        };

        poll();
    }

    /** 清理用户主页 tag */
    function clearUserHomeTags() {
        if (_userHomeTimer) {
            clearTimeout(_userHomeTimer);
            _userHomeTimer = null;
        }
        document.querySelectorAll('.hoj-userhome-tag').forEach(el => el.remove());
    }
    /** 排行榜标签：入口，带轮询等待表格渲染 */
    async function injectRankTag() {
        if (!isRankPage()) return;

        // 清旧标签
        document.querySelectorAll('.' + CUSTOM_RANK_TAG_CLASS).forEach(el => el.remove());

        const username = await getCurrentUsername();
        if (!username) return;
        const name = String(username).trim();

        // 重新读一次配置（updateRankTags 可能已改）
        const tagText = (config.CustomRankTag || '').trim();

        let tries = 0;
        const MAX_TRIES = 20;
        const poll = async () => {
            tries++;
            let rows = document.querySelectorAll('.vxe-table tbody tr.vxe-body--row');
            if (rows.length === 0) {
                rows = document.querySelectorAll('tr.vxe-body--row');
            }
            console.log(`[RankTag] 第 ${tries} 次轮询: 行数=${rows.length}`);
            if (rows.length > 0) {
                await doInjectRankTag(rows, name, tagText);
                return;
            }
            if (tries < MAX_TRIES) {
                _rankTagTimer = setTimeout(poll, 250);
            } else {
                console.warn('[RankTag] 轮询超时');
            }
        };
        if (_rankTagTimer) clearTimeout(_rankTagTimer);
        await poll();
    }
    /** 真正的注入逻辑：对每一行用户，查询云端标签（或本机配置）后注入 */
    async function doInjectRankTag(rows, myName, myTagText) {
        // 先把所有用户名收集起来，去重后并发查询（除自己外）
        const usernames = new Set();
        rows.forEach(row => {
            const a = row.querySelector('a');
            if (a) usernames.add(a.textContent.trim());
        });

        // 并发查询他人标签（自己用本机配置，无需查询）
        const others = [...usernames].filter(u => u && u !== myName);
        await Promise.all(others.map(u => fetchUserTag(u)));

        let matched = 0;
        rows.forEach(row => {
            const a = row.querySelector('a');
            if (!a) return;
            const rowName = a.textContent.trim();
            if (!rowName) return;

            // 防重复
            const next = a.nextElementSibling;
            if (next && next.classList.contains(CUSTOM_RANK_TAG_CLASS)) return;

            let tagname = '';
            let tagcolor = '#18BE6A';

            if (rowName === myName) {
                // 本人：用本机配置
                if (!myTagText) return;         // 本机没配置则不显示
                tagname = myTagText;
                tagcolor = (config.CustomRankTagColor || '').trim() || '#18BE6A';
            } else {
                // 他人：用云端数据
                const remote = _tagCache.get(rowName);
                if (!remote || !remote.tagname) return;
                tagname = remote.tagname;
                tagcolor = remote.tagcolor || '#18BE6A';
            }

            // 注入
            const wrapper = document.createElement('span');
            wrapper.className = CUSTOM_RANK_TAG_CLASS;
            wrapper.style.marginLeft = '2px';

            const tagEl = document.createElement('span');
            tagEl.className = 'el-tag el-tag--small el-tag--dark';
            tagEl.style.backgroundColor = tagcolor;
            tagEl.textContent = ' ' + tagname + ' ';

            wrapper.appendChild(tagEl);
            a.insertAdjacentElement('afterend', wrapper);
            matched++;
        });

        console.log(`[HOJTag] 共注入 ${matched} 处标签`);
    }

    function clearRankTags() {
        if (_rankTagTimer) { clearTimeout(_rankTagTimer); _rankTagTimer = null; }
        document.querySelectorAll('.' + CUSTOM_RANK_TAG_CLASS).forEach(el => el.remove());
    }
    /* ============================================================
 * 排行榜标签：监听搜索按钮点击后重新注入
 * ============================================================ */
    let _rankSearchHandler = null;

    function startRankTableObserver() {
        if (_rankSearchHandler) return;

        _rankSearchHandler = (ev) => {
            // 扩大到：搜索按钮 + 分页控件（上一页/下一页/页码/每页数量）
            const target = ev.target;
            const btn = target.closest?.(
                'button.search-btn, button.btn-prev, button.btn-next, ' +
                '.el-pager .number, .el-select-dropdown__item'
            );
            if (!btn) return;
            if (!isRankPage()) return;

            // 关键：先同步清掉旧标签，避免翻页瞬间旧标签“粘”在错误行上
            clearRankTags();

            console.log('[RankTag] 检测到搜索/分页操作，准备重新注入');
            // 之后由 injectRankTag 轮询等待新表格渲染

            let _rankTagDebounce = null;
            function scheduleRankTag() {
                if (_rankTagDebounce) clearTimeout(_rankTagDebounce);
                _rankTagDebounce = setTimeout(() => {
                    _rankTagDebounce = null;
                    injectRankTag();
                }, 500);
            }
            scheduleRankTag();
        };

        document.addEventListener('click', _rankSearchHandler, true);
        console.log('[RankTag] 已监听搜索按钮与分页控件');
    }

    function stopRankTableObserver() {
        if (_rankSearchHandler) {
            document.removeEventListener('click', _rankSearchHandler, true);
            _rankSearchHandler = null;
        }
    }
    /* ============================================================
 * 注入题目
 * ============================================================ */
    const BUTTON_CPH_ID = 'import-to-cph-btn';
    const BUTTON_DOWNLOAD_ID = 'download-testcase-btn';
    const COPY_BUTTON_CLASS = 'custom-copy-btn';
    const FORCE_UPDATE_CHECKBOX_ID = 'force-update-discussion-checkbox';
    const FORCE_FIELDS_CONTAINER_ID = 'force-fields-container';

    let currentProblemData = null;
    let currentProblemId = null;
    let currentProblemCode = null;
    let forceUpdate = false;

    Object.defineProperty(unsafeWindow, '__forceDiscussionUpdate__', {
        get: () => forceUpdate,
        set: (v) => { forceUpdate = !!v; syncForceCheckbox(); },
        configurable: true
    });

    function randomUUID() {
        if (crypto?.randomUUID) return crypto.randomUUID();
        if (crypto?.getRandomValues) {
            const b = new Uint8Array(16); crypto.getRandomValues(b);
            b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
            const h = Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
            return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function sendToCPH(data, port) {
        return new Promise(res => {
            GM_xmlhttpRequest({
                method: 'POST',
                url: `http://localhost:${port}/`,
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(data),
                onload: r => res(r.status === 200 ? { message: '发送成功', success: true, status: 200 } : { message: `错误：CPH 返回状态码 ${r.status}`, success: false, status: r.status }),
                onerror: () => res({ message: `连接失败\n请确认 CPH 插件已启动，且端口为 ${port}`, success: false, status: 502 }),
                ontimeout: () => res({ message: '连接超时，请检查插件状态', success: false, status: 504 })
            });
        });
    }

    /* ============================================================
 * 题目收藏
 * ============================================================ */
    const FAVORITES_KEY = 'hoj_problem_favorites';

    function getFavorites() {
        try {
            const raw = GM_getValue(FAVORITES_KEY, '[]');
            const arr = typeof raw === 'string' ? JSON.parse(raw) : raw;
            return Array.isArray(arr) ? arr : [];
        } catch (e) { return []; }
    }
    function saveFavorites(list) {
        try { GM_setValue(FAVORITES_KEY, JSON.stringify(list)); } catch (e) {}
    }
    function isFavorite(problemId) {
        return getFavorites().some(f => f.problemId === problemId);
    }
    function addFavorite(problemId, title, href) {
        const list = getFavorites();
        if (list.some(f => f.problemId === problemId)) return;
        list.push({ problemId, title, href, addedAt: Date.now() });
        saveFavorites(list);
    }
    function removeFavorite(problemId) {
        saveFavorites(getFavorites().filter(f => f.problemId !== problemId));
    }
    function toggleFavorite(problemId, title, href) {
        if (isFavorite(problemId)) { removeFavorite(problemId); return false; }
        addFavorite(problemId, title, href);
        return true;
    }
    function escapeHtml(s) {
        const div = document.createElement('div');
        div.textContent = String(s ?? '');
        return div.innerHTML;
    }

    /** 找到题目列表表格（通过表头关键字判断，避免依赖 tid 号） */
    function getProblemListTable() {
        const tables = document.querySelectorAll('.vxe-table');
        for (const t of tables) {
            const titles = Array.from(t.querySelectorAll('thead th .vxe-cell--title'))
            .map(h => h.textContent.trim());
            if (titles.includes('题目ID') && titles.includes('题目') && titles.includes('难度')) {
                return t;
            }
        }
        return null;
    }
    /** 通过表头文字找到列索引（返回 0-based，找不到返回 -1） */
    function findColumnIndexByTitle(table, titleText) {
        const ths = Array.from(table.querySelectorAll('thead th'));
        return ths.findIndex(th => {
            const t = th.querySelector('.vxe-cell--title');
            return t && t.textContent.trim() === titleText;
        });
    }

    /** 往表格每一行注入星标收藏按钮（放在第一列） */
    function injectFavoriteButtonsIntoTable(table) {
        if (!table) return;

        const ths = Array.from(table.querySelectorAll('thead th'));
        let idColIdx = -1, titleColIdx = -1;
        ths.forEach((th, i) => {
            const t = th.querySelector('.vxe-cell--title');
            if (!t) return;
            const txt = t.textContent.trim();
            if (txt === '题目ID') idColIdx = i;
            else if (txt === '题目') titleColIdx = i;
        });
        if (idColIdx === -1 || titleColIdx === -1) return;

        const firstColIdx = 0;

        table.querySelectorAll('tbody tr.vxe-body--row').forEach(row => {
            const tds = Array.from(row.querySelectorAll('td.vxe-body--column'));
            if (tds.length <= Math.max(idColIdx, titleColIdx, firstColIdx)) return;

            const idTd = tds[idColIdx];
            const titleTd = tds[titleColIdx];
            const firstTd = tds[firstColIdx];

            const idEl = idTd.querySelector('.vxe-cell--label');
            const titleEl = titleTd.querySelector('.title-a');
            if (!idEl || !titleEl) return;

            const problemId = idEl.textContent.trim();
            const title = titleEl.textContent.trim();
            const href = titleEl.getAttribute('href') || `/problem/${problemId}`;

            let btn = firstTd.querySelector('.hoj-fav-btn');

            if (!btn) {
                btn = document.createElement('i');
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    // 从 dataset 读取当前值，而不是闭包
                    const curId = btn.dataset.problemId;
                    const curTitle = btn.dataset.title || curId;
                    const curHref = btn.dataset.href || `/problem/${curId}`;
                    const nowFav = toggleFavorite(curId, curTitle, curHref);

                    // 同步所有同 problemId 的按钮（列表行 + 其他位置）
                    document.querySelectorAll('.hoj-fav-btn').forEach(el => {
                        if (el.dataset.problemId === curId) {
                            el.className = `hoj-fav-btn ${nowFav ? 'el-icon-star-on is-fav' : 'el-icon-star-off'}`;
                            el.title = nowFav ? '取消收藏' : '收藏';
                        }
                    });

                    NewAlert((nowFav ? '已收藏：' : '已取消收藏：') + curId,
                             nowFav ? 'success' : 'info');
                    renderFavoritePanel();
                });

                const cellDiv = firstTd.querySelector('.vxe-cell') || firstTd;
                cellDiv.style.display = 'flex';
                cellDiv.style.alignItems = 'center';
                cellDiv.style.justifyContent = 'center';
                cellDiv.appendChild(btn);
            }

            //  关键修复：无论按钮是否已存在，都同步它与当前行
            const fav = isFavorite(problemId);
            btn.dataset.problemId = problemId;
            btn.dataset.title = title;
            btn.dataset.href = href;
            btn.className = `hoj-fav-btn ${fav ? 'el-icon-star-on is-fav' : 'el-icon-star-off'}`;
            btn.title = fav ? '取消收藏' : '收藏';
        });
    }

    function getRightColumn() {
        const table = getProblemListTable();
        if (!table) return null;
        const row = table.closest('.el-row');
        if (!row) return null;
        // 优先精确 md-6 / lg-6，其次取最后一个 el-col
        return row.querySelector(':scope > .el-col:last-child');
    }
    function renderFavoritePanel() {
        if (!getProblemListTable()) return;

        let panel = document.getElementById('hoj-favorites-panel');

        const rightCol = getRightColumn();
        if (!rightCol) return;

        if (!panel || panel.parentElement !== rightCol) {
            if (panel) panel.remove();
            panel = document.createElement('div');
            panel.id = 'hoj-favorites-panel';
            panel.className = 'el-card is-always-shadow';
            panel.style.marginBottom = '10px';
            rightCol.insertBefore(panel, rightCol.firstChild);
        }

        const favorites = getFavorites().sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));

        panel.innerHTML = `
        <div class="el-card__header">
            <div style="text-align:center;">
                <span class="taglist-title" data-v-83ac00a2=""> 我的收藏 (${favorites.length})</span>
            </div>
        </div>
        <div class="el-card__body">
            ${favorites.length === 0
            ? '<div style="text-align:center;color:#999;padding:10px 0;font-size:13px;">暂无收藏题目</div>'
        : `<ul class="hoj-fav-list">
                    ${favorites.map(f => `
                        <li class="hoj-fav-item" data-id="${escapeHtml(f.problemId)}">
                            <a href="${escapeHtml(f.href)}" class="hoj-fav-link" title="${escapeHtml(f.title)}">
                                <span class="hoj-fav-id">${escapeHtml(f.problemId)}</span>
                                <span class="hoj-fav-title">${escapeHtml(f.title)}</span>
                            </a>
                            <i class="el-icon-close hoj-fav-remove" title="移除"></i>
                        </li>
                    `).join('')}
                </ul>`
    }
        </div>
    `;

        // 绑定移除
        panel.querySelectorAll('.hoj-fav-remove').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const li = el.closest('.hoj-fav-item');
                const id = li.dataset.id;
                removeFavorite(id);
                const star = document.querySelector(`.hoj-fav-btn[data-problem-id="${id}"]`);
                if (star) { star.className = 'hoj-fav-btn el-icon-star-off'; star.title = '收藏'; }
                renderFavoritePanel();
            });
        });
    }
    function updateFavoriteDetailButton() {
        const btn = document.getElementById('hoj-fav-detail-btn');
        if (!btn) return;
        const problemId = currentProblemCode || currentProblemId;
        if (!problemId) return;
        const fav = isFavorite(String(problemId));
        btn.innerHTML = `<i class="${fav ? 'el-icon-star-on' : 'el-icon-star-off'}"></i> ${fav ? '已收藏' : '收藏'}`;
        btn.style.color = fav ? '#F7BA2A' : '';
    }
    /** 详情页：在 .question-intr 内注入收藏按钮 */
    function addFavoriteButtonToDetail() {
        const c = document.querySelector('.question-intr');
        if (!c) return;

        // 只在题目详情页生效：路径包含 /problem/ 且不是题目列表
        if (!/\/problem\/[^\/?#]+/.test(window.location.pathname)) return;
        // 若列表页也有 .question-intr（不会），用表格判断排除
        if (getProblemListTable()) return;

        // 用外部 problemId（如 A002 / CF-207A1）作为收藏 key，跟列表页保持一致
        const problemId = currentProblemCode || currentProblemId;
        if (!problemId) return;

        // 已注入则只更新状态
        let btn = document.getElementById('hoj-fav-detail-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'hoj-fav-detail-btn';
            btn.type = 'button';
            btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
            btn.style.cssText = 'padding:5px 10px;margin-left:8px;cursor:pointer;';

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const title = document.querySelector('.panel-title > span[data-v-1c61011a]')
                ?.textContent?.trim() || String(problemId);
                const href = window.location.href;
                const nowFav = toggleFavorite(String(problemId), title, href);
                updateFavoriteDetailButton();
                NewAlert(nowFav ? '已收藏：' + problemId : '已取消收藏：' + problemId,
                         nowFav ? 'success' : 'info');
            });

            c.appendChild(btn);
        }
        updateFavoriteDetailButton();
    }
    function clearAllFavorites() {
        saveFavorites([]);
        // 更新所有已注入的星标按钮
        document.querySelectorAll('.hoj-fav-btn').forEach(btn => {
            btn.className = 'hoj-fav-btn el-icon-star-off';
            btn.title = '收藏';
        });
        // 刷新右侧收藏面板
        renderFavoritePanel();
        // 刷新详情页按钮
        updateFavoriteDetailButton();
        NewAlert('已清空所有收藏', 'warning');
    }
    /** 入口：根据页面情况调用 */
    function setupFavorites() {
        const table = getProblemListTable();
        if (!table)
        {
            console.log("Not Found Table");
            return;
        }
        console.log("Found Table");
        injectFavoriteButtonsIntoTable(table);
        renderFavoritePanel();
    }
    /* ============================================================
 * 菜单栏布局：可配置元素清单
 * ============================================================ */
    const NAVBAR_ELEMENTS = [
        { key: 'logo',       labelKey: 'nav.item.logo',       selector: '.logo' },
        { key: 'home',       labelKey: 'nav.item.home',       matchText: ['首页', 'Home'] },
        { key: 'problems',   labelKey: 'nav.item.problems',   matchText: ['题目', 'Problem'] },
        { key: 'training',   labelKey: 'nav.item.training',   matchText: ['训练', 'Training'] },
        { key: 'contest',    labelKey: 'nav.item.contest',    matchText: ['比赛', 'Contest'] },
        { key: 'submission', labelKey: 'nav.item.submission', matchText: ['评测', 'Status'] },
        { key: 'rank',       labelKey: 'nav.item.rank',       matchText: ['排名', 'Rank'] },
        { key: 'discussion', labelKey: 'nav.item.discussion', matchText: ['讨论', 'Discussion'] },
        { key: 'team',       labelKey: 'nav.item.team',       matchText: ['团队', 'Group'] },
        { key: 'about',      labelKey: 'nav.item.about',      matchText: ['关于', 'About'] },
        { key: 'newui',      labelKey: 'nav.item.newui',      matchText: ['体验新版', 'Try New'] },
    ];

    const MOBILE_NAV_ICON_MAP = {
        home:       'el-icon-s-home',
        problems:   'el-icon-s-grid',
        training:   'el-icon-s-claim',
        contest:    'el-icon-trophy',
        submission: 'el-icon-s-marketing',
        rank:       'el-icon-s-data',
        discussion: 'fa-comments',
        team:       'fa-users',
        about:      'el-icon-info',
        newui:      'el-icon-star-on',
    };

    const NEW_FRONT_TEXT_MAP = {
        home:       '首页',
        problems:   '题库',
        submission: '评测',
        training:   '题单',
        contest:    '比赛',
        team:       '团队',
        discussion: '讨论',
        rank:       '排名',
        newui:      '体验新版',
    };

    const NAVBAR_USER_SELECTORS = ['.drop-menu', '.drop-avatar'];

    /* ---------- 布局读取 ---------- */
    function getNavbarLayout() {
        const defaults = NAVBAR_ELEMENTS.map(e => ({ key: e.key, visible: true }));
        const saved = config.NavbarLayout;
        if (!Array.isArray(saved) || !saved.length) return defaults;

        const valid = new Set(NAVBAR_ELEMENTS.map(e => e.key));
        const seen = new Set();
        const out = [];
        saved.forEach(item => {
            if (!item || typeof item !== 'object') return;
            if (!valid.has(item.key) || seen.has(item.key)) return;
            out.push({ key: item.key, visible: item.visible !== false });
            seen.add(item.key);
        });
        defaults.forEach(d => { if (!seen.has(d.key)) out.push(d); });
        return out;
    }

    /* ---------- 旧前端（桌面端） ---------- */
    function collectNavbarElements(menu) {
        const map = new Map();

        NAVBAR_ELEMENTS.forEach(def => {
            if (!def.selector) return;
            const el = menu.querySelector(def.selector);
            if (el) map.set(def.key, el);
        });

        const textDefs = NAVBAR_ELEMENTS.filter(d => d.matchText);
        menu.querySelectorAll(':scope > li.el-menu-item, :scope > li.el-submenu').forEach(li => {
            if (li.id === 'hoj-settings-btn' || li.id === 'hoj-checkin-btn') return;

            const titleEl = li.querySelector(':scope > .el-submenu__title');
            const ownText = (titleEl ? titleEl.textContent : li.textContent || '').trim();

            for (const def of textDefs) {
                if (map.has(def.key)) continue;
                const texts = Array.isArray(def.matchText) ? def.matchText : [def.matchText];
                if (texts.some(tx => tx && ownText.includes(tx))) {
                    map.set(def.key, li);
                    break;
                }
            }
        });

        return map;
    }

    function applyNavbarLayout() {
        const menu = document.querySelector('#header ul.el-menu.el-menu--horizontal, #header ul.el-menu--horizontal');
        if (!menu) return;

        const layout = getNavbarLayout();
        const elMap  = collectNavbarElements(menu);

        const expected = [];
        layout.forEach(item => {
            const el = elMap.get(item.key);
            if (el) expected.push({ el, visible: item.visible });
        });
        if (!expected.length) return;

        let needsRebuild = false;
        const expectedEls = new Set(expected.map(x => x.el));
        const domOrder = [];
        for (const child of menu.children) {
            if (expectedEls.has(child)) domOrder.push(child);
        }

        if (domOrder.length !== expected.length) {
            needsRebuild = true;
        } else {
            for (let i = 0; i < expected.length; i++) {
                if (domOrder[i] !== expected[i].el) { needsRebuild = true; break; }
            }
        }
        if (!needsRebuild) {
            for (const { el, visible } of expected) {
                const wantHidden = visible ? '0' : '1';
                const curHidden  = el.dataset.hojNavHidden || '0';
                if (wantHidden !== curHidden) { needsRebuild = true; break; }
            }
        }
        if (!needsRebuild) return;

        let anchor = null;
        for (const sel of NAVBAR_USER_SELECTORS) {
            const el = menu.querySelector(sel);
            if (el && el.parentNode === menu) { anchor = el; break; }
        }

        expected.forEach(({ el }) => {
            if (el.parentNode === menu) menu.removeChild(el);
        });

        if (anchor) {
            let ref = anchor;
            for (let i = expected.length - 1; i >= 0; i--) {
                const { el, visible } = expected[i];
                el.style.display = visible ? '' : 'none';
                el.dataset.hojNavHidden = visible ? '0' : '1';
                menu.insertBefore(el, ref);
                ref = el;
            }
        } else {
            expected.forEach(({ el, visible }) => {
                el.style.display = visible ? '' : 'none';
                el.dataset.hojNavHidden = visible ? '0' : '1';
                menu.appendChild(el);
            });
        }

        console.log('[NavbarLayout] 已应用布局:', layout.map(x => `${x.visible ? '+' : '-'}${x.key}`).join(' '));
    }

    /* ---------- 移动端抽屉 ---------- */
    function collectMobileDrawerElements() {
        const map = new Map();
        const drawer = document.querySelector('.mu-drawer');
        if (!drawer) return map;

        let list = null;
        for (const child of drawer.children) {
            if (child.tagName === 'UL' && child.classList.contains('mu-list')) { list = child; break; }
        }
        if (!list) return map;

        const settingsBtn = list.querySelector(':scope > #hoj-mobile-settings-btn');
        if (settingsBtn) map.set('settings', settingsBtn);

        list.querySelectorAll(':scope > li').forEach(li => {
            if (li.id === 'hoj-mobile-settings-btn') return;
            for (const [key, iconClass] of Object.entries(MOBILE_NAV_ICON_MAP)) {
                if (map.has(key)) continue;
                const hit = [...li.querySelectorAll('i')]
                .some(i => i.classList && i.classList.contains(iconClass));
                if (hit) { map.set(key, li); break; }
            }
        });

        return map;
    }

    function applyMobileDrawerLayout() {
        const drawer = document.querySelector('.mu-drawer');
        if (!drawer) return;

        let list = null;
        for (const child of drawer.children) {
            if (child.tagName === 'UL' && child.classList.contains('mu-list')) { list = child; break; }
        }
        if (!list) return;

        const layout = getNavbarLayout();
        const elMap = collectMobileDrawerElements();
        if (!elMap.size) return;

        const expected = [];
        layout.forEach(item => {
            const el = elMap.get(item.key);
            if (el) expected.push({ el, visible: item.visible });
        });
        if (!expected.length) return;

        let needsRebuild = false;
        const expectedEls = new Set(expected.map(x => x.el));
        const domOrder = [];
        for (const child of list.children) {
            if (expectedEls.has(child)) domOrder.push(child);
        }
        if (domOrder.length !== expected.length) {
            needsRebuild = true;
        } else {
            for (let i = 0; i < expected.length; i++) {
                if (domOrder[i] !== expected[i].el) { needsRebuild = true; break; }
            }
        }
        if (!needsRebuild) {
            for (const { el, visible } of expected) {
                const wantHidden = visible ? '0' : '1';
                const curHidden  = el.dataset.hojNavHidden || '0';
                if (wantHidden !== curHidden) { needsRebuild = true; break; }
            }
        }
        if (!needsRebuild) return;

        expected.forEach(({ el }) => {
            if (el.parentNode === list) list.removeChild(el);
        });
        expected.forEach(({ el, visible }) => {
            el.style.display = visible ? '' : 'none';
            el.dataset.hojNavHidden = visible ? '0' : '1';
            list.appendChild(el);
        });

        console.log('[NavbarLayout] 移动端布局已应用');
    }

    /* ---------- /new 前端 ---------- */
    function _findNewNavContainer() {
        const nav = document.querySelector('nav[data-v-9dacc850]')
        || document.querySelector('nav[data-v-7b0404d0]');
        if (!nav) return null;
        return nav.querySelector('div.flex.flex-row') || null;
    }

    function _collectNewFrontElements() {
        const map = new Map();
        const wrap = _findNewNavContainer();
        if (!wrap) return map;

        const settingsBtn = wrap.querySelector('#hoj-new-settings-btn');
        if (settingsBtn) map.set('settings', settingsBtn);

        const backOldBtn = wrap.querySelector('#hoj-back-old-btn');
        if (backOldBtn) map.set('backold', backOldBtn);

        wrap.querySelectorAll(':scope > button.gear-item').forEach(btn => {
            if (btn.id === 'hoj-new-settings-btn' || btn.id === 'hoj-back-old-btn') return;
            for (const v of map.values()) if (v === btn) return;

            const textEl = btn.querySelector('.truncate');
            const text = textEl ? textEl.textContent.trim() : (btn.textContent || '').trim();

            for (const [key, label] of Object.entries(NEW_FRONT_TEXT_MAP)) {
                if (map.has(key)) continue;
                if (text.includes(label)) { map.set(key, btn); break; }
            }
        });

        return map;
    }

    function applyNewFrontendLayout() {
        const wrap = _findNewNavContainer();
        if (!wrap) return;

        const layout = getNavbarLayout();
        const elMap = _collectNewFrontElements();
        if (!elMap.size) return;

        /* expected：按 layout 顺序排列的可配置按钮 */
        const expected = [];
        layout.forEach(item => {
            const el = elMap.get(item.key);
            if (el) expected.push({ el, visible: item.visible });
        });

        /* settings / backold 不在 layout 里，固定放最后 */
        const tailEls = [elMap.get('settings'), elMap.get('backold')].filter(Boolean);
        const allEls  = new Set([...expected.map(x => x.el), ...tailEls]);
        if (!allEls.size) return;

        /* --- 判断是否需要重建 --- */
        let needsRebuild = false;
        const domOrder = [];
        for (const child of wrap.children) {
            if (allEls.has(child)) domOrder.push(child);
        }

        if (domOrder.length !== allEls.size) {
            needsRebuild = true;
        } else {
            for (let i = 0; i < expected.length; i++) {
                if (domOrder[i] !== expected[i].el) { needsRebuild = true; break; }
            }
            if (!needsRebuild) {
                for (let i = 0; i < tailEls.length; i++) {
                    if (domOrder[expected.length + i] !== tailEls[i]) {
                        needsRebuild = true; break;
                    }
                }
            }
        }
        if (!needsRebuild) {
            for (const { el, visible } of expected) {
                const wantHidden = visible ? '0' : '1';
                const curHidden  = el.dataset.hojNavHidden || '0';
                if (wantHidden !== curHidden) { needsRebuild = true; break; }
            }
        }
        if (!needsRebuild) return;

        /* --- 重建 --- */
        allEls.forEach(el => {
            if (el.parentNode === wrap) wrap.removeChild(el);
        });

        expected.forEach(({ el, visible }) => {
            el.style.display = visible ? '' : 'none';
            el.dataset.hojNavHidden = visible ? '0' : '1';
            wrap.appendChild(el);
        });

        tailEls.forEach(el => {
            el.style.display = '';
            delete el.dataset.hojNavHidden;
            wrap.appendChild(el);
        });

        console.log('[NavbarLayout] /new 前端布局已应用');
    }

    /* ---------- 统一调度器 ---------- */
    let _navbarApplyTimer = null;
    function scheduleApplyNavbarLayout(delay = 200) {
        if (_navbarApplyTimer) clearTimeout(_navbarApplyTimer);
        _navbarApplyTimer = setTimeout(() => {
            _navbarApplyTimer = null;
            try { applyNavbarLayout(); }       catch (e) { console.warn('[NavbarLayout] 旧前端:', e); }
            try { applyMobileDrawerLayout(); } catch (e) { console.warn('[NavbarLayout] 移动端:', e); }
            try { applyNewFrontendLayout(); }  catch (e) { console.warn('[NavbarLayout] 新前端:', e); }
        }, delay);
    }
    /* ============================================================
 * 菜单栏布局配置 Dialog
 * ============================================================ */
    function openNavbarLayoutDialog() {
        let layout = getNavbarLayout();

        const wrap = document.createElement('div');
        wrap.className = 'hoj-navbar-layout';

        const hint = document.createElement('div');
        hint.className = 'hoj-navbar-hint';
        wrap.appendChild(hint);

        const list = document.createElement('ul');
        list.className = 'hoj-navbar-list';
        wrap.appendChild(list);

        const persist = () => {
            config.NavbarLayout = layout.map(x => ({ key: x.key, visible: !!x.visible }));
            saveConfig(config);
            scheduleApplyNavbarLayout(0);
        };

        const renderList = () => {
            list.innerHTML = '';
            layout.forEach((item, idx) => {
                const def = NAVBAR_ELEMENTS.find(e => e.key === item.key);
                const label = def ? WebI18n.t(def.labelKey) : item.key;

                const li = document.createElement('li');
                li.className = 'hoj-navbar-item';
                li.draggable = true;
                li.dataset.key = item.key;
                li.dataset.idx = String(idx);

                li.innerHTML = `
                <span class="hoj-navbar-drag">⋮⋮</span>
                <label class="hoj-navbar-check">
                    <input type="checkbox" ${item.visible ? 'checked' : ''}>
                </label>
                <span class="hoj-navbar-label"></span>
                <span class="hoj-navbar-arrows">
                    <button type="button" data-act="up"   ${idx === 0 ? 'disabled' : ''}>▲</button>
                    <button type="button" data-act="down" ${idx === layout.length - 1 ? 'disabled' : ''}>▼</button>
                </span>
            `;
                // 用 textContent 写入，避免翻译里的特殊字符触发注入
                li.querySelector('.hoj-navbar-label').textContent = label;

                li.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
                    item.visible = e.target.checked;
                    persist();
                });

                li.querySelector('[data-act="up"]').addEventListener('click', () => {
                    if (idx === 0) return;
                    [layout[idx - 1], layout[idx]] = [layout[idx], layout[idx - 1]];
                    persist();
                    renderList();
                });
                li.querySelector('[data-act="down"]').addEventListener('click', () => {
                    if (idx === layout.length - 1) return;
                    [layout[idx + 1], layout[idx]] = [layout[idx], layout[idx + 1]];
                    persist();
                    renderList();
                });

                list.appendChild(li);
            });
        };

        /* ---------- 拖拽 ---------- */
        let dragSrcIdx = null;

        list.addEventListener('dragstart', (e) => {
            const li = e.target.closest('.hoj-navbar-item');
            if (!li) return;
            dragSrcIdx = Number(li.dataset.idx);
            li.classList.add('hoj-navbar-dragging');
            e.dataTransfer.effectAllowed = 'move';
            try { e.dataTransfer.setData('text/plain', li.dataset.key); } catch (_) {}
        });

        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            const li = e.target.closest('.hoj-navbar-item');
            if (!li || dragSrcIdx === null) return;
            if (Number(li.dataset.idx) === dragSrcIdx) return;
            list.querySelectorAll('.hoj-navbar-drop-before, .hoj-navbar-drop-after')
                .forEach(el => el.classList.remove('hoj-navbar-drop-before', 'hoj-navbar-drop-after'));
            const rect = li.getBoundingClientRect();
            const isAfter = (e.clientY - rect.top) > rect.height / 2;
            li.classList.add(isAfter ? 'hoj-navbar-drop-after' : 'hoj-navbar-drop-before');
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();
            if (dragSrcIdx === null) return;
            const li = e.target.closest('.hoj-navbar-item');
            if (!li) return;

            let targetIdx = Number(li.dataset.idx);
            const rect = li.getBoundingClientRect();
            if ((e.clientY - rect.top) > rect.height / 2) targetIdx++;

            const [moved] = layout.splice(dragSrcIdx, 1);
            let insertAt = targetIdx;
            if (dragSrcIdx < targetIdx) insertAt--;
            insertAt = Math.max(0, Math.min(insertAt, layout.length));
            layout.splice(insertAt, 0, moved);

            persist();
            renderList();
        });

        list.addEventListener('dragend', () => {
            list.querySelectorAll('.hoj-navbar-drop-before, .hoj-navbar-drop-after, .hoj-navbar-dragging')
                .forEach(el => el.classList.remove('hoj-navbar-drop-before', 'hoj-navbar-drop-after', 'hoj-navbar-dragging'));
            dragSrcIdx = null;
        });

        /* ---------- 底部：恢复默认 ---------- */
        const footer = document.createElement('div');
        footer.className = 'hoj-navbar-footer';
        const resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.addEventListener('click', async () => {
            const ok = await NewDialog({
                title: WebI18n.t('navbar.reset.confirm.title'),
                content: WebI18n.t('navbar.reset.confirm.body'),
                confirmText: WebI18n.t('navbar.reset.confirm.ok'),
                type: 'warning'
            });
            if (!ok) return;
            config.NavbarLayout = null;
            saveConfig(config);
            layout = getNavbarLayout();
            applyNavbarLayout();
            applyMobileDrawerLayout();
            applyNewFrontendLayout();
            renderList();
        });
        footer.appendChild(resetBtn);
        wrap.appendChild(footer);

        /* ---------- 语言联动 ---------- */
        const refreshTexts = () => {
            hint.textContent = WebI18n.t('navbar.hint');
            resetBtn.textContent = WebI18n.t('navbar.reset');
        };

        const offI18n = WebI18n.onChange(() => {
            if (!wrap.isConnected) { offI18n(); return; }
            refreshTexts();
            renderList();
        });

        refreshTexts();
        renderList();

        openCustomDialog({
            title: WebI18n.t('navbar.title'),
            bodyEl: wrap,
            width: '440px',
            maxHeight: '75vh',
            onClose: () => {
                // 面板销毁时取消订阅，避免内存泄漏
                offI18n();
            }
        });
    }
    /* ============================================================
 * 推荐题目 Dialog
 * ============================================================ */
    const REC_CATEGORY_LABELS = {
        basic:    '基础算法',
        thinking: '思维构造',
        dp:       '动态规划',
        ds:       '数据结构',
        graph:    '图论算法',
        math:     '数学数论',
        string:   '字符串'
    };

    /**
 * 打开推荐题目 Dialog
 * 内部使用 tabs 切换分类，tabs 内容按需渲染，避免一次性 DOM 过多
 */
    async function openRecommendDialog() {
        const cfname = (config.hdnoipCFName || '').trim();
        if (!cfname) {
            NewAlert('请先在 Better HOJ 设置中填写 Codeforces 用户名', 'warning');
            return;
        }

        // 1) 拉数据
        const data = await fetchHdnoipData(cfname);
        const recs = data?.recommendations;
        if (!recs || typeof recs !== 'object') {
            NewAlert('未获取到推荐数据，请检查 CF 用户名', 'error');
            return;
        }

        // 2) 只保留有题目的分类，按固定顺序排列
        const cats = Object.keys(REC_CATEGORY_LABELS).filter(k =>
                                                             recs[k] && Array.isArray(recs[k].problems) && recs[k].problems.length > 0
                                                            );
        if (!cats.length) {
            NewAlert('暂无推荐题目', 'warning');
            return;
        }

        // 3) 先建容器（内容在 tabs 建立后填充）
        const wrap = document.createElement('div');
        wrap.className = 'hoj-rec-dialog';
        wrap.innerHTML = `
        <div class="hoj-rec-meta">
            <span>CF 用户名：<b>${escapeHtml(cfname)}</b></span>
            <span style="opacity:.6;margin-left:10px;">共 ${cats.length} 个分类</span>
        </div>
        <div class="hoj-rec-tabs" role="tablist"></div>
        <div class="hoj-rec-content" role="tabpanel"></div>
    `;
        const tabsEl = wrap.querySelector('.hoj-rec-tabs');
        const contentEl = wrap.querySelector('.hoj-rec-content');

        // 4) 渲染某个分类的题目
        const renderCategory = (cat) => {
            const catInfo = recs[cat];
            const problems = catInfo.problems || [];
            const target = catInfo.target_rating ?? '-';
            const range  = catInfo.rating_range || '';

            contentEl.innerHTML = `
            <div class="hoj-rec-meta">
                <span>目标难度 <b>${escapeHtml(String(target))}</b></span>
                ${range ? `<span style="opacity:.6;margin-left:10px;">推荐区间 ${escapeHtml(range)}</span>` : ''}
                <span style="opacity:.6;margin-left:10px;">${problems.length} 道</span>
            </div>
            <ul class="hoj-rec-list">
                ${problems.map(p => {
                const pId    = escapeHtml(p.problem_id || p.id || '');
                const pName  = escapeHtml(p.name || pId);
                const rawId  = String(p.problem_id || p.id || '').trim();
                const link   = rawId ? `/problem/CF-${encodeURIComponent(rawId)}` : '#';
                const rating = p.rating ?? '';
                const weight = typeof p.weight === 'number' ? p.weight.toFixed(3) : '';
                return `<li class="hoj-rec-item">
                        <a href="${link}" target="_blank" rel="noopener" class="hoj-rec-link">
                            <span class="hoj-rec-id">${pId}</span>
                            <span class="hoj-rec-name">${pName}</span>
                            <span class="hoj-rec-rating">CF ${rating}</span>
                            ${weight ? `<span class="hoj-rec-weight">w=${weight}</span>` : ''}
                        </a>
                    </li>`;
            }).join('')}
            </ul>
        `;
        };

        // 5) 建立 tabs（只注册事件，切换时才渲染）
        cats.forEach((cat, i) => {
            const tab = document.createElement('button');
            tab.type = 'button';
            tab.className = 'hoj-rec-tab' + (i === 0 ? ' active' : '');
            tab.dataset.cat = cat;
            tab.setAttribute('role', 'tab');
            tab.textContent = `${REC_CATEGORY_LABELS[cat]} (${recs[cat].problems.length})`;
            tab.addEventListener('click', () => {
                tabsEl.querySelectorAll('.hoj-rec-tab')
                    .forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderCategory(cat);
            });
            tabsEl.appendChild(tab);
        });

        renderCategory(cats[0]);

        // 6) 用 NewDialog 弹出（不显示取消按钮，只留“关闭”）
        //    用 html 方式承载，注意 wrap 里的内容已是构建好的 DOM，
        //    这里转换成字符串会丢失事件，因此改用自定义 dialog：
        openCustomDialog({
            title: `题目推荐 · ${cfname}`,
            bodyEl: wrap,
            width: '640px',
            maxHeight: '80vh'
        });
    }

    /* ============================================================
 * 推荐一题按钮（注入到 #pick-one 后方）
 * ============================================================ */

    /** 拉取 hdnoip 学生能力数据 */
    async function fetchHdnoipData(cfname) {
        if (!cfname) return null;
        try {
            const resp = await fetch(
                `https://hdnoip.com/api/ability/student/${encodeURIComponent(cfname)}`,
                { method: 'GET', credentials: 'omit' }
            );
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const json = await resp.json();
            return json?.data || null;
        } catch (e) {
            console.warn('[Hdnoip] 请求失败:', e);
            return null;
        }
    }

    /** 把 recommendations 内所有分类的题目展平成一个数组 */
    function flattenRecommendedProblems(data) {
        const recs = data?.recommendations;
        if (!recs || typeof recs !== 'object') return [];
        const out = [];
        Object.values(recs).forEach(cat => {
            if (cat && Array.isArray(cat.problems)) {
                cat.problems.forEach(p => {
                    if (p && p.link) out.push(p);
                });
            }
        });
        return out;
    }
    /* ============================================================
 * 在 #pick-one 之后注入「题目推荐」按钮
 * ============================================================ */
    function injectRecommendButton() {
        if (document.getElementById('hoj-rec-btn')) return;

        const cfname = (config.hdnoipCFName || '').trim();
        if (!cfname) return;   // 没配 CF 用户名就不显示

        const pickOne = document.getElementById('pick-one');
        if (!pickOne) return;

        // 克隆原按钮，保留 class / data-v 作用域属性 / 样式
        const btn = pickOne.cloneNode(true);
        btn.id = 'hoj-rec-btn';
        btn.removeAttribute('long');
        btn.style.marginLeft = '8px';

        // 文案替换（保留 <i> 图标节点）
        const span = btn.querySelector('span');
        if (span) {
            span.childNodes.forEach(n => {
                if (n.nodeType === Node.TEXT_NODE) {
                    n.textContent = ' 题目推荐 ';
                }
            });
        }

        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (btn.dataset.loading === '1') return;

            btn.dataset.loading = '1';
            const oldHtml = span ? span.innerHTML : '';
            if (span) span.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 加载中...';

            try {
                await openRecommendDialog();
            } catch (err) {
                console.error('[RecDialog] 出错:', err);
                NewAlert('打开推荐列表失败', 'error');
            } finally {
                btn.dataset.loading = '0';
                if (span) span.innerHTML = oldHtml;
            }
        });

        pickOne.insertAdjacentElement('afterend', btn);
        console.log('[RecDialog] 题目推荐按钮已注入');
    }
    /* ============================================================
 * 片段系统
 * ============================================================ */

    /* ---------- 快捷键工具 ---------- */
    const HOTKEY_DISPLAY_MAP = {
        ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
        Meta: 'Win'
    };

    function _normMainKey(e) {
        const code = e.code || '';
        if (/^Key[A-Z]$/.test(code)) return code.slice(3);
        if (/^Digit[0-9]$/.test(code)) return code.slice(5);
        if (/^F([1-9]|1[0-9]|2[0-4])$/.test(code)) return code;
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(code)) return code;
        if (['Escape','Backspace','Delete','Enter','Tab','Home','End','PageUp','PageDown'].includes(code)) return code;
        return null;
    }

    /** 把 keydown 事件归一化成 "Ctrl+Alt+A" 这样的字符串；无法识别返回 null */
    function normalizeHotkey(e) {
        const main = _normMainKey(e);
        if (!main) return null;
        const parts = [];
        if (e.ctrlKey)  parts.push('Ctrl');
        if (e.altKey)   parts.push('Alt');
        if (e.shiftKey) parts.push('Shift');
        if (e.metaKey)  parts.push('Meta');
        // 没有修饰键时，仅允许 F1~F24
        if (parts.length === 0 && !/^F\d+$/.test(main)) return null;
        parts.push(main);
        return parts.join('+');
    }

    function formatHotkeyDisplay(hk) {
        if (!hk) return '';
        return hk.split('+').map(p => HOTKEY_DISPLAY_MAP[p] || p).join(' + ');
    }

    function matchHotkey(e, hk) {
        if (!hk) return false;
        return normalizeHotkey(e) === hk;
    }

    /* ---------- 插入到当前输入位置 ---------- */
    /**
 * 往指定输入元素插入文本；不传 target 时用 document.activeElement
 * @param {string} text
 * @param {HTMLElement} [target]
 * @param {{start:number,end:number}} [sel]
 * @returns {boolean}
 */
    function insertSnippetText(text, target, sel) {
        if (typeof text !== 'string' || !text) return false;
        const el = target || document.activeElement;
        if (!el) return false;

        // CodeMirror 5
        const cmWrap = el.closest ? el.closest('.CodeMirror') : null;
        if (cmWrap && cmWrap.CodeMirror) {
            try { cmWrap.CodeMirror.focus(); } catch (_) {}
            if (sel && typeof sel.start === 'number') {
                try { cmWrap.CodeMirror.setSelection(
                    cmWrap.CodeMirror.posFromIndex(sel.start),
                    cmWrap.CodeMirror.posFromIndex(sel.end ?? sel.start)
                ); } catch (_) {}
            }
            cmWrap.CodeMirror.replaceSelection(text);
            cmWrap.CodeMirror.focus();
            return true;
        }

        // textarea / input
        if (el.tagName === 'TEXTAREA' ||
            (el.tagName === 'INPUT' &&
             !['checkbox','radio','submit','button','file','range','color'].includes((el.type || '').toLowerCase()))) {
            try { el.focus(); } catch (_) {}
            const s = (sel && typeof sel.start === 'number') ? sel.start
            : (el.selectionStart ?? el.value.length);
            const e2 = (sel && typeof sel.end === 'number') ? sel.end
            : (el.selectionEnd ?? s);
            try {
                el.setRangeText(text, s, e2, 'end');
            } catch {
                el.value = el.value.slice(0, s) + text + el.value.slice(e2);
                el.selectionStart = el.selectionEnd = s + text.length;
            }
            el.dispatchEvent(new Event('input',  { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
        }

        // contenteditable
        if (el.isContentEditable) {
            try { el.focus(); } catch (_) {}
            if (sel && typeof sel.start === 'number' && window.getSelection) {
                try {
                    const range = document.createRange();
                    const textNode = el.firstChild || el;
                    const max = textNode.textContent?.length ?? 0;
                    const off = Math.min(sel.start, max);
                    range.setStart(textNode, off);
                    range.setEnd(textNode, Math.min(sel.end ?? off, max));
                    const gs = window.getSelection();
                    gs.removeAllRanges();
                    gs.addRange(range);
                } catch (_) {}
            }
            document.execCommand('insertText', false, text);
            return true;
        }
        return false;
    }
    let _snippetHotkeyInstalled = false;
    function initSnippetHotkeys() {
        if (_snippetHotkeyInstalled) return;
        _snippetHotkeyInstalled = true;

        const DEBUG = false;   // 需要排查时临时改成 true

        const handler = (e) => {

            // 只处理 keydown，忽略重复触发
            if (e.repeat) return;

            // 忽略纯修饰键（避免按下 Ctrl 就走完全部逻辑）
            if (['Control', 'Shift', 'Alt', 'Meta', 'OS'].includes(e.key)) return;

            const t = e.target;
            const inOwnUI = t && t.closest &&
                  t.closest('#hoj-settings-panel, .hoj-dialog, .hoj-dialog-mask, .hoj-tool, #hoj-like-box, #hoj-new-like-box');

            if (DEBUG) {
                console.log('[Hotkey]',
                            { key: e.key, code: e.code,
                             c: e.ctrlKey, a: e.altKey, s: e.shiftKey, m: e.metaKey,
                             inOwnUI, panelHotkey: config.SnippetPanelHotkey,
                             normalized: normalizeHotkey(e),
                             prevented: e.defaultPrevented });
            }

            // 在脚本自身的 UI 里不响应，避免误触
            if (inOwnUI) return;

            /* ---------- 1) 唤出片段面板 ---------- */
            const panelHk = config.SnippetPanelHotkey;
            if (panelHk && !_snippetPanelOpen && matchHotkey(e, panelHk)) {
                e.preventDefault();
                e.stopPropagation();
                openSnippetPanel();
                return;
            }

            /* ---------- 2) 片段快捷键 ---------- */
            const list = getSnippets();
            for (const s of list) {
                if (!s.hotkey) continue;
                if (matchHotkey(e, s.hotkey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    const ok = insertSnippetText(s.content || '');
                    if (ok) NewAlert(WebI18n.t('snippet.inserted', { name: s.name || '' }), 'success', 1200);
                    else    NewAlert('@snippet.applyFailed', 'warning', 1200);
                    return;
                }
            }
        };

        // 同时绑 window 和 document（capture 阶段），双保险
        // 某些框架/库会在 window 阶段 stopPropagation，导致 document 收不到
        window.addEventListener('keydown', handler, true);
        document.addEventListener('keydown', handler, true);

        // 可选：保存 handler 便于销毁
        initSnippetHotkeys._handler = handler;

        console.log('[Hotkey] 全局快捷键监听已安装');
    }

    /** 卸载（便于调试） */
    function destroySnippetHotkeys() {
        if (initSnippetHotkeys._handler) {
            window.removeEventListener('keydown', initSnippetHotkeys._handler, true);
            document.removeEventListener('keydown', initSnippetHotkeys._handler, true);
            initSnippetHotkeys._handler = null;
        }
        _snippetHotkeyInstalled = false;
        console.log('[Hotkey] 全局快捷键监听已卸载');
    }
    /* ---------- 存储 ---------- */
    function getSnippets() {
        return Array.isArray(config.Snippets) ? config.Snippets : [];
    }
    function mergeSnippetsInto(existing, incoming) {
        if (!Array.isArray(incoming)) return { list: existing, added: 0, updated: 0 };
        const map = new Map();
        existing.forEach(s => { if (s && s.id) map.set(s.id, s); });
        let added = 0, updated = 0;
        incoming.forEach(s => {
            if (!s || !s.id) return;
            if (map.has(s.id)) updated++;
            else               added++;
            map.set(s.id, s);
        });
        return { list: [...map.values()], added, updated };
    }
    function saveSnippets(list) {
        config.Snippets = Array.isArray(list) ? list : [];
        saveConfig(config);
    }
    function newSnippetId() {
        return 'snip_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    }
    /* ---------- 片段管理 ---------- */
    let _snippetPanelOpen = false;
    // 快照：记录原焦点元素与选区
    const _snapshot = (() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;

        // CodeMirror
        const cmWrap = el.closest && el.closest('.CodeMirror');
        if (cmWrap && cmWrap.CodeMirror) {
            const cm = cmWrap.CodeMirror;
            const cur = cm.getCursor();
            return {
                el: cmWrap,
                isCM: true,
                cm,
                sel: { start: cm.indexFromPos(cm.getCursor('from')),
                      end:   cm.indexFromPos(cm.getCursor('to')) },
                _cur: cur
            };
        }

        // textarea / input
        if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
            return {
                el,
                sel: { start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0 }
            };
        }

        // contenteditable
        if (el.isContentEditable) {
            const gs = window.getSelection && window.getSelection();
            let off = 0, end = 0;
            if (gs && gs.rangeCount) {
                const r = gs.getRangeAt(0);
                const pre = document.createRange();
                pre.selectNodeContents(el);
                pre.setEnd(r.startContainer, r.startOffset);
                off = pre.toString().length;
                end = off + r.toString().length;
            }
            return { el, sel: { start: off, end } };
        }

        // 其它元素（例如按钮）→ 无可用位置
        return { el, sel: null };
    })();
    function openSnippetPanel() {
        if (_snippetPanelOpen) return;
        _snippetPanelOpen = true;

        const wrap = document.createElement('div');
        wrap.className = 'hoj-snippet-panel';

        const tabsEl = document.createElement('div');
        tabsEl.className = 'hoj-snippet-cats';

        const listEl = document.createElement('ul');
        listEl.className = 'hoj-snippet-list';

        const footer = document.createElement('div');
        footer.className = 'hoj-snippet-footer';
        footer.innerHTML = `<span class="hoj-snippet-tip">↑↓ 选择 · ←→ 切换分类 · Enter 插入 · Esc 关闭</span>
        <button type="button" class="hoj-snippet-btn" data-act="manage">管理片段</button>`;

        wrap.append(tabsEl, listEl, footer);

        // 不抢焦点
        wrap.addEventListener('mousedown', (e) => {
            if (e.target.closest('input, textarea, [contenteditable]')) return;
            e.preventDefault();
        });

        const all = getSnippets();
        // 分类聚合
        const catSet = new Set();
        all.forEach(s => catSet.add((s.category || '').trim() || '未分类'));
        const cats = ['全部', ...[...catSet].sort()];

        let activeCat = '全部';
        let activeIdx = 0;
        let visible = [];

        const computeVisible = () => {
            if (activeCat === '全部') visible = all.slice();
            else visible = all.filter(s => ((s.category || '').trim() || '未分类') === activeCat);
            if (activeIdx >= visible.length) activeIdx = Math.max(0, visible.length - 1);
        };

        const renderTabs = () => {
            tabsEl.innerHTML = cats.map(c =>
                                        `<button type="button" tabindex="-1" class="hoj-snippet-cat${c === activeCat ? ' active' : ''}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`
                                       ).join('');
        };

        const renderList = () => {
            if (!visible.length) {
                listEl.innerHTML = '<li class="hoj-snippet-empty">该分类下暂无片段</li>';
                return;
            }
            listEl.innerHTML = visible.map((s, i) => `
            <li class="hoj-snippet-item${i === activeIdx ? ' active' : ''}" data-idx="${i}">
                <div class="hoj-snippet-item-main">
                    <div class="hoj-snippet-item-name">${escapeHtml(s.name || '(未命名)')}</div>
                    ${s.desc ? `<div class="hoj-snippet-item-desc">${escapeHtml(s.desc)}</div>` : ''}
                </div>
                ${s.hotkey ? `<div class="hoj-snippet-item-hotkey">${escapeHtml(formatHotkeyDisplay(s.hotkey))}</div>` : ''}
            </li>
        `).join('');
        };

        const refresh = () => {
            computeVisible();
            renderTabs();
            renderList();
        };

        const applySnippet = (s) => {
            if (!s) return;
            if (typeof closeDialog === 'function') closeDialog();
            const ok = insertSnippetText(s.content || '');
            if (ok) NewAlert(WebI18n.t('snippet.inserted', { name: s.name || '' }), 'success', 1200);
            else    NewAlert(WebI18n.t('snippet.applyFailed', { name: s.name || '' }), 'warning', 1200);
        };

        // 点击
        tabsEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.hoj-snippet-cat');
            if (!btn) return;
            activeCat = btn.dataset.cat;
            activeIdx = 0;
            refresh();
        });
        listEl.addEventListener('click', (e) => {
            const li = e.target.closest('.hoj-snippet-item');
            if (!li) return;
            applySnippet(visible[Number(li.dataset.idx)]);
        });
        footer.addEventListener('click', (e) => {
            if (e.target.closest('[data-act="manage"]')) {
                closeDialog();
                setTimeout(openSnippetManager, 200);
            }
        });

        // 键盘导航（global keydown，但只在本面板打开时响应）
        const onKey = (e) => {
            if (!_snippetPanelOpen) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault(); e.stopPropagation();
                if (visible.length) { activeIdx = (activeIdx + 1) % visible.length; renderList(); }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault(); e.stopPropagation();
                if (visible.length) { activeIdx = (activeIdx - 1 + visible.length) % visible.length; renderList(); }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault(); e.stopPropagation();
                const i = cats.indexOf(activeCat);
                activeCat = cats[(i + 1) % cats.length];
                activeIdx = 0; refresh();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault(); e.stopPropagation();
                const i = cats.indexOf(activeCat);
                activeCat = cats[(i - 1 + cats.length) % cats.length];
                activeIdx = 0; refresh();
            } else if (e.key === 'Home') {
                e.preventDefault(); activeIdx = 0; renderList();
            } else if (e.key === 'End') {
                e.preventDefault(); activeIdx = visible.length - 1; renderList();
            } else if (e.key === 'Enter') {
                e.preventDefault(); e.stopPropagation();
                applySnippet(visible[activeIdx]);
            } else if (e.key === 'Escape') {
                e.preventDefault(); e.stopPropagation();
                closeDialog();
            }
        };
        document.addEventListener('keydown', onKey, true);

        refresh();

        let closeDialog = null;

        closeDialog = openCustomDialog({
            title: '代码片段',
            bodyEl: wrap,
            width: '560px',
            maxHeight: '70vh',
            onClose: () => {
                _snippetPanelOpen = false;
                document.removeEventListener('keydown', onKey, true);
            }
        });
    }
    function openSnippetManager() {
        const wrap = document.createElement('div');
        wrap.className = 'hoj-snippet-mgr';

        const listEl = document.createElement('div');
        listEl.className = 'hoj-snippet-mgr-list';
        wrap.appendChild(listEl);

        const actions = document.createElement('div');
        actions.className = 'hoj-snippet-mgr-actions';
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
        addBtn.textContent = '+ 新建片段';
        actions.appendChild(addBtn);
        wrap.appendChild(actions);

        const editor = document.createElement('div');
        editor.className = 'hoj-snippet-mgr-editor';
        editor.style.display = 'none';
        wrap.appendChild(editor);

        let editingId = null;

        /* ---------- 列表渲染：注意这里参数是 s，不是 snippet ---------- */
        const renderList = () => {
            const list = getSnippets();
            if (!list.length) {
                listEl.innerHTML = '<div class="hoj-snippet-mgr-empty">暂无片段</div>';
                return;
            }
            listEl.innerHTML = list.map(s => `
            <div class="hoj-snippet-mgr-item${s.id === editingId ? ' active' : ''}" data-id="${escapeHtml(s.id)}">
                <div class="hoj-snippet-mgr-item-main">
                    <div class="hoj-snippet-mgr-item-name">${escapeHtml(s.name || '(未命名)')}</div>
                    ${s.desc ? `<div class="hoj-snippet-mgr-item-desc">${escapeHtml(s.desc)}</div>` : ''}
                </div>
                <div class="hoj-snippet-mgr-item-right">
                    ${s.category ? `<span class="hoj-snippet-mgr-item-cat">${escapeHtml(s.category)}</span>` : ''}
                    ${s.hotkey ? `<span class="hoj-snippet-mgr-item-hotkey">${escapeHtml(formatHotkeyDisplay(s.hotkey))}</span>` : ''}
                    <button type="button" class="hoj-snippet-mgr-del" data-del="${escapeHtml(s.id)}" title="删除">×</button>
                </div>
            </div>
        `).join('');
        };

        /* ---------- 编辑器渲染：参数名是 snippet ---------- */
        const renderEditor = (snippet) => {
            editingId = snippet ? snippet.id : null;
            editor.style.display = 'block';

            const vName = escapeHtml(snippet ? (snippet.name || '') : '');
            const vDesc = escapeHtml(snippet ? (snippet.desc || '') : '');
            const vCat  = escapeHtml(snippet ? (snippet.category || '') : '');
            const vCont = escapeHtml(snippet ? (snippet.content || '') : '');
            const vHot  = escapeHtml(snippet && snippet.hotkey ? formatHotkeyDisplay(snippet.hotkey) : '');

            editor.innerHTML = `
            <div class="hoj-snippet-field">
                <label>名称</label>
                <input type="text" class="hoj-snippet-input" data-field="name"
                       placeholder="例如：快读模板" value="${vName}">
            </div>
            <div class="hoj-snippet-field">
                <label>介绍</label>
                <input type="text" class="hoj-snippet-input" data-field="desc"
                       placeholder="简短说明（用于搜索）" value="${vDesc}">
            </div>
            <div class="hoj-snippet-field">
                <label>分类（可选，相同分类会归为一组）</label>
                <input type="text" class="hoj-snippet-input" data-field="category"
                       placeholder="例如：算法模板" value="${vCat}">
            </div>
            <div class="hoj-snippet-field">
                <label>快捷键（点击后按下组合键；Esc / 退格清空）</label>
                <input type="text" class="hoj-snippet-input hoj-snippet-hotkey-input" data-field="hotkey" readonly
                       placeholder="例如 Ctrl+Alt+1" value="${vHot}">
            </div>
            <div class="hoj-snippet-field">
                <label>内容</label>
                <textarea class="hoj-snippet-textarea" data-field="content" rows="8"
                          placeholder="插入的文本内容">${vCont}</textarea>
            </div>
            <div class="hoj-snippet-editor-actions">
                <button type="button" class="hoj-snippet-btn" data-act="cancel">取消</button>
                <button type="button" class="hoj-snippet-btn hoj-snippet-btn--primary" data-act="save">保存</button>
            </div>
        `;

            const $f = (k) => editor.querySelector(`[data-field="${k}"]`);
            const hotkeyEl = $f('hotkey');
            let pendingHotkey = snippet ? (snippet.hotkey || '') : '';

            hotkeyEl.addEventListener('keydown', (e) => {
                if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
                    e.preventDefault(); e.stopPropagation();
                    return;
                }
                e.preventDefault(); e.stopPropagation();

                if (['Escape', 'Backspace', 'Delete'].includes(e.key)) {
                    pendingHotkey = '';
                    hotkeyEl.value = '';
                    return;
                }

                const hk = normalizeHotkey(e);
                if (hk) {
                    pendingHotkey = hk;
                    hotkeyEl.value = formatHotkeyDisplay(hk);
                } else {
                    hotkeyEl.value = '需包含 Ctrl/Alt/Win 修饰键';
                    setTimeout(() => {
                        hotkeyEl.value = pendingHotkey ? formatHotkeyDisplay(pendingHotkey) : '';
                    }, 700);
                }
            });
            hotkeyEl.addEventListener('focus', () => hotkeyEl.select());

            editor.querySelector('[data-act="cancel"]').addEventListener('click', () => {
                editor.style.display = 'none';
                editingId = null;
                renderList();
            });

            editor.querySelector('[data-act="save"]').addEventListener('click', () => {
                const name     = $f('name').value.trim();
                const desc     = $f('desc').value.trim();
                const category = $f('category').value.trim();
                const content  = $f('content').value;
                if (!name)    return NewAlert('请填写名称', 'warning');
                if (!content) return NewAlert('请填写内容', 'warning');

                if (pendingHotkey) {
                    const conflict = getSnippets().find(x => x.id !== (snippet ? snippet.id : null) && x.hotkey === pendingHotkey);
                    if (conflict) return NewAlert(`快捷键与「${conflict.name}」冲突`, 'error');
                    if (config.SnippetPanelHotkey === pendingHotkey)
                        return NewAlert('快捷键与「唤出面板」冲突', 'error');
                }

                const list = getSnippets();
                if (snippet) {
                    const idx = list.findIndex(x => x.id === snippet.id);
                    if (idx >= 0) list[idx] = { ...list[idx], name, desc, category, content, hotkey: pendingHotkey || '' };
                } else {
                    list.push({ id: newSnippetId(), name, desc, category, content, hotkey: pendingHotkey || '' });
                }
                saveSnippets(list);
                NewAlert('已保存', 'success', 1200);
                editor.style.display = 'none';
                editingId = null;
                renderList();
            });
        };

        /* ---------- 列表点击：进入编辑 / 删除 ---------- */
        listEl.addEventListener('click', (e) => {
            const del = e.target.closest('[data-del]');
            if (del) {
                e.stopPropagation();
                const id = del.dataset.del;
                const s = getSnippets().find(x => x.id === id);
                if (!s) return;
                NewDialog({
                    title: '@action.delete',
                    content: WebI18n.t('snippet.deleteConfirm', { name: s.name }),
                    type: 'warning'
                }).then(ok => {
                    if (!ok) return;
                    saveSnippets(getSnippets().filter(x => x.id !== id));
                    if (editingId === id) { editor.style.display = 'none'; editingId = null; }
                    renderList();
                });
                return;
            }
            const item = e.target.closest('.hoj-snippet-mgr-item');
            if (!item) return;
            const s = getSnippets().find(x => x.id === item.dataset.id);
            if (s) { renderEditor(s); renderList(); }
        });

        addBtn.addEventListener('click', () => { renderEditor(null); renderList(); });

        renderList();

        openCustomDialog({
            title: '片段管理',
            bodyEl: wrap,
            width: '620px',
            maxHeight: '80vh'
        });
    }
    /**
     * 解析当前 URL，判断是比赛题目还是普通题目
     * @returns {{type:'contest',cid:string,displayId:string} | {type:'problem',problemId:string} | null}
     */
    function parseProblemContext() {
        const path = window.location.pathname;

        // 1) 比赛题目：/contest/{cid}/problem/{displayId}
        let m = path.match(/\/contest\/(\d+)\/problem\/([^\/?#]+)/);
        if (m) return { type: 'contest', cid: m[1], displayId: m[2] };

        // 2) 训练题目：/training/{tid}/problem/{displayId}
        m = path.match(/\/training\/(\d+)\/problem\/([^\/?#]+)/);
        if (m) return { type: 'training', tid: m[1], displayId: m[2] };

        // 3) 团队题目：/group/{gid}/problem/{problemId}/...
        m = path.match(/\/group\/(\d+)\/problem\/([^\/?#]+)/);
        if (m) return { type: 'problem', problemId: m[2], gid: m[1] };

        // 4) 普通题目：/problem/{problemId}
        m = path.match(/\/problem\/([^\/?#]+)/);
        if (m) return { type: 'problem', problemId: m[1] };

        return null;
    }

    /** 兼容旧调用：返回当前题目的标识 */
    function getProblemIdFromUrl() {
        const ctx = parseProblemContext();
        if (!ctx) return '';
        return ctx.type === 'contest' ? ctx.displayId : ctx.problemId;
    }

    function fetchProblemDetail() {
        const token = localStorage.getItem('token') || '';
        const ctx = parseProblemContext();
        if (!ctx) return Promise.reject(new Error('无法从 URL 中识别题目'));

        let url;
        if (ctx.type === 'contest') {
            url = `${window.location.origin}/api/get-contest-problem-details`
                + `?displayId=${encodeURIComponent(ctx.displayId)}`
                + `&cid=${encodeURIComponent(ctx.cid)}`
                + `&containsEnd=true`;
        } else {
            url = `${window.location.origin}/api/get-problem-detail`
                + `?problemId=${encodeURIComponent(ctx.problemId)}`;
            if (ctx.gid) url += `&gid=${encodeURIComponent(ctx.gid)}`;
        }

        console.log('[BetterHOJ] fetchProblemDetail →', url);

        return fetch(url, {
            method: 'GET',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)));
    }

    /** HTML 实体解码（&nbsp; / &lt; / &gt; ...） */
    function _decodeHtmlEntities(s) {
        if (!s || typeof s !== 'string') return s || '';
        if (!s.includes('&')) return s;
        const ta = document.createElement('textarea');
        ta.innerHTML = s;
        return ta.value;
    }

    /**
 * 解析 <input>...</input><output>...</output>
 * 保留 output 每行的前导空格（图案、对齐输出依赖它），只去掉尾部换行
 * input 只做首尾 trim（"无" 之类不受影响）
 */
    function parseExamples(str) {
        const tests = [];
        if (!str || typeof str !== 'string') return tests;

        const re = /<input>([\s\S]*?)<\/input>\s*<output>([\s\S]*?)<\/output>/g;
        let m;
        while ((m = re.exec(str)) !== null) {
            const input = _decodeHtmlEntities(m[1]).replace(/^\s+|\s+$/g, '');
            //  只去掉末尾的换行；前导空格一律保留
            let output = _decodeHtmlEntities(m[2]).replace(/[\r\n]+$/, '');
            tests.push({ input, output });
        }
        return tests;
    }
    function getProblemUrlForCPH(problemId) {
        if (!problemId) return window.location.href;

        // CF-{contest}{index} → codeforces.com/problemset/problem/{contest}/{index}
        const m = String(problemId).match(/^CF-(\d+)(.+)$/i);
        if (m) {
            const contest = m[1];
            const index = m[2];
            return `https://codeforces.com/problemset/problem/${contest}/${index}`;
        }

        return window.location.href;
    }
    function buildCPHData(data) {
        const p = data?.data?.problem || data?.data?.problems?.[0];
        if (!p) return null;
        const rawTests = parseExamples(p.examples); if (!rawTests.length) return null;

        const problemId = p.problemId || getProblemIdFromUrl();
        var problemUrl = window.location.href;
        if(config.realCPHurl) {
            problemUrl = getProblemUrlForCPH(problemId);
        }
        return {
            name: `HOJ - ${problemId}`,
            url: problemUrl,
            memoryLimit: p.memoryLimit || 0, timeLimit: p.timeLimit || 0, group: 'HOJ',
            tests: rawTests.map((t, i) => ({ input: t.input, output: t.output, id: i })),
            testType: 'single', input: { type: 'stdin' }, output: { type: 'stdout' },
            languages: { java: { mainClass: 'Main', taskClass: '' } },
            batch: { id: randomUUID(), size: 1 }
        };
    }

    function copyText(t) {
        NewAlert("复制成功", 'success');
        if (typeof GM_setClipboard !== 'undefined') { GM_setClipboard(t); return Promise.resolve(); }
        if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(t);
        return new Promise((res, rej) => {
            const ta = document.createElement('textarea');
            ta.value = t; ta.style.cssText = 'position:fixed;left:-9999px;';
            document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy') ? res() : rej(new Error('fail')); }
            catch (e) { rej(e); } finally { document.body.removeChild(ta); }
        });
    }

    function addCopyButtons(data) {
        const p = data?.data?.problem || data?.data?.problems?.[0];
        if (!p) return;
        const map = [['题目描述','description'],['输入描述','input'],['输出描述','output'],['提示','hint']];
        document.querySelectorAll('.question-intr p.title, #problem-content p.title').forEach(tEl => {
            const txt = tEl.textContent.trim();
            const hit = map.find(([t]) => t === txt); if (!hit) return;
            let btn = tEl.querySelector(`.${COPY_BUTTON_CLASS}`); if (btn) btn.remove();
            btn = document.createElement('a');
            btn.className = `copy ${COPY_BUTTON_CLASS}`;
            btn.style.cssText = 'cursor:pointer;margin-left:8px;';
            btn.title = '复制内容';
            btn.innerHTML = '<i class="el-icon-document-copy"></i>';
            btn.addEventListener('click', e => {
                e.preventDefault(); e.stopPropagation();
                copyText(p[hit[1]] || '').then(() => { btn.style.color = '#67C23A'; setTimeout(() => btn.style.color = '', 1000); });
            });
            tEl.appendChild(btn);
        });
    }

    function downloadTestcase() {
        if (!currentProblemId) return NewAlert('题目ID尚未获取', 'warning');
        const token = localStorage.getItem('token') || '';
        GM_xmlhttpRequest({
            method: 'GET',
            url: `${window.location.origin}/api/file/download-testcase?pid=${currentProblemId}`,
            headers: { 'Authorization': token },
            responseType: 'blob',
            onload: r => {
                if (r.status === 200) {
                    const url = URL.createObjectURL(r.response);
                    const a = document.createElement('a');
                    a.href = url; a.download = `${currentProblemId}-testcase.zip`;
                    document.body.appendChild(a); a.click(); document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } else NewAlert(`下载失败，状态码：${r.status}`, 'error');
            },
            onerror: () => NewAlert('下载请求出错', 'error')
        });
    }

    function getForceFields() {
        const out = {}; const g = id => document.getElementById(id);
        const role = g('force-role-input'), vn = g('force-viewNum-input'), ln = g('force-likeNum-input'), cn = g('force-commentNum-input');
        if (role && role.value.trim()) out.role = role.value.trim();
        if (vn && vn.value.trim()) out.viewNum = Number(vn.value);
        if (ln && ln.value.trim()) out.likeNum = Number(ln.value);
        if (cn && cn.value.trim()) out.commentNum = Number(cn.value);
        return out;
    }
    // 远程代码
    /** hojcode 返回的 language 字段映射到 hljs 语言名 */
    function mapToHljsLang(language) {
        if (!language) return '';

        // 1. 归一化：小写、去空白、去特殊符号
        let s = String(language).toLowerCase().trim();

        // 2. 剥离常见后缀/修饰词
        s = s.replace(/\s*with\s*o2\b/g, '')    // "With O2"
            .replace(/\s*\bo2\b/g, '')          // 单独的 O2
            .replace(/\s*\d+(\.\d+)*\s*$/g, '') // 尾部的版本号 1.8.0_241 / 20 / 17 ...
            .replace(/[_\-]+/g, '')
            .replace(/\s+/g, '');

        // 3. 匹配
        const table = {
            // C / C++
            'c': 'c',
            'cpp': 'cpp', 'c++': 'cpp', 'cxx': 'cpp', 'cc': 'cpp',
            'gnug++': 'cpp', 'gnuc++': 'cpp', 'gnugcc': 'cpp', 'gcc': 'cpp',
            'c++20': 'cpp', 'c++17': 'cpp', 'c++14': 'cpp', 'c++11': 'cpp',
            // Python 系
            'python': 'python', 'python3': 'python', 'python2': 'python',
            'py3': 'python', 'py2': 'python', 'pypy': 'python', 'pypy3': 'python', 'pypy2': 'python',
            // Java
            'java': 'java', 'java18': 'java', 'javajdk': 'java',
            // JavaScript
            'javascript': 'javascript', 'js': 'javascript',
            'javascriptnode': 'javascript', 'javascriptv8': 'javascript',
            'node': 'javascript', 'nodejs': 'javascript',
            // Go
            'go': 'go', 'golang': 'go',
            // Rust
            'rust': 'rust', 'rs': 'rust',
            // C#
            'c#': 'csharp', 'csharp': 'csharp',
            // 其它
            'kotlin': 'kotlin', 'swift': 'swift',
            'php': 'php', 'ruby': 'ruby', 'perl': 'perl',
            'lua': 'lua', 'r': 'r', 'scala': 'scala',
            'pascal': 'pascal', 'delphi': 'pascal',
            'bash': 'bash', 'shell': 'bash', 'sh': 'bash',
            'sql': 'sql', 'json': 'json', 'xml': 'xml', 'html': 'xml',
            'css': 'css', 'markdown': 'markdown', 'md': 'markdown',
            'plaintext': 'plaintext', 'text': 'plaintext'
        };

        if (table[s]) return table[s];

        // 4. 兜底：包含关系匹配
        if (s.includes('python') || s.includes('pypy')) return 'python';
        if (s.includes('c++') || s.includes('cpp') || s.includes('g++')) return 'cpp';
        if (s.includes('java') && !s.includes('javascript')) return 'java';
        if (s.includes('javascript') || s.includes('node')) return 'javascript';
        if (s.includes('golang') || s === 'go') return 'go';
        if (s.includes('rust')) return 'rust';
        if (s.includes('csharp') || s.includes('c#')) return 'csharp';

        return '';   // 未知语言 → 让调用方走 highlightAuto
    }

    function buildCodeBlockHtml(code, language) {
        const w = document.createElement('div');
        w.className = 'el-col el-col-24';
        w.style.marginTop = '13px';

        const b = document.createElement('div');
        b.className = 'markdown-body submission-detail';

        const pre = document.createElement('pre');
        pre.style.borderLeft = '3px solid rgb(25, 190, 107)';

        const c = document.createElement('code');
        c.textContent = code;

        const lang = mapToHljsLang(language);
        if (lang) c.className = `hljs language-${lang}`;
        else      c.className = 'hljs';

        //  用刚加载的 highlight.js 渲染
        try {
            if (typeof hljs !== 'undefined') {
                if (lang && hljs.getLanguage(lang)) {
                    // 指定语言高亮
                    c.innerHTML = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
                } else {
                    // 未知语言 → 自动检测
                    const r = hljs.highlightAuto(code);
                    c.innerHTML = r.value;
                    if (r.language) c.classList.add(`language-${r.language}`);
                }
            }
        } catch (e) {
            console.warn('[CodeBlock] hljs 高亮失败:', e);
            c.textContent = code;   // 回退到纯文本
        }

        // 复制按钮
        const i = document.createElement('i');
        i.title = 'copy';
        i.className = 'el-icon-document-copy code-copy';
        i.textContent = ' COPY';
        i.style.cursor = 'pointer';
        i.addEventListener('click', () => copyText(code));

        pre.append(c, i);
        b.appendChild(pre);
        w.appendChild(b);
        return w;
    }
    function fetchRemoteSubmissionData(id) {
        return new Promise(res => {
            GM_xmlhttpRequest({
                method: 'GET', url: `https://hojcode.rkcd.me/${id}`,
                onload: r => { if (r.status === 200) { try { res(JSON.parse(r.responseText)?.data || null); } catch { res(null); } } else res(null); },
                onerror: () => res(null)
            });
        });
    }

    function findInjectionTarget() {
        const row = document.querySelector('.el-row.is-justify-space-around.el-row--flex');
        if (row) return row;
        const cols = document.querySelectorAll('.el-col.el-col-24');
        return cols.length ? (cols[cols.length - 1].parentElement || cols[cols.length - 1]) : null;
    }

    async function injectCodeButtonIntoStatus() {

        const m = window.location.pathname.match(/\/submission-detail\/([^\/?#]+)/);
        const submitId = m[1];

        if (document.getElementById('hoj-show-code-btn')) return;

        const statusEl = document.getElementById('status');
        if (!statusEl) return;

        const inTarget = document.querySelector('.markdown-body.submission-detail');
        if (inTarget) return;

        const btn = document.createElement('button');
        btn.id = 'hoj-show-code-btn';
        btn.type = 'button';
        btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
        btn.textContent = '查看代码';
        btn.style.cssText = 'margin-left:10px;padding:4px 10px;cursor:pointer;vertical-align:middle;';
        let remoteData;
        btn.addEventListener('click', (e) => {
            if (!remoteData?.code) {
                NewAlert('远程无代码', 'error');
            }
            e.preventDefault();
            e.stopPropagation();
            injectCodeBlockToBottom(remoteData.code, remoteData.language || null);
            if (remoteData?.code) {
                btn.style.cssText = 'margin-left:10px;padding:4px 10px;cursor:pointer;vertical-align:middle;display:none;';
                NewAlert('代码获取成功', 'success');
            }
        });
        const content = statusEl.querySelector('.el-alert__content');
        const target = content || statusEl;
        target.appendChild(btn);
        remoteData = await fetchRemoteSubmissionData(submitId);
    }

    function injectCodeBlockToBottom(code, language) {
        const target = findInjectionTarget();
        if (!target) return;

        // 清理错位旧块
        document.querySelectorAll('.markdown-body.submission-detail').forEach(b => {
            if (!target.contains(b)) {
                const wrap = b.closest('.el-col.el-col-24');
                (wrap && wrap.querySelector('.markdown-body.submission-detail')) ? wrap.remove() : b.remove();
            }
        });

        // 已有目标块 → 只更新内容 + 重新高亮
        const inTarget = target.querySelector('.markdown-body.submission-detail');
        if (inTarget) {
            const c = inTarget.querySelector('pre code');
            if (c) {
                const lang = mapToHljsLang(language);
                c.className = 'hljs' + (lang ? ` language-${lang}` : '');
                try {
                    if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
                        c.innerHTML = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
                    } else if (typeof hljs !== 'undefined') {
                        const r = hljs.highlightAuto(code);
                        c.innerHTML = r.value;
                        if (r.language) c.classList.add(`language-${r.language}`);
                    } else {
                        c.textContent = code;
                    }
                } catch (e) {
                    c.textContent = code;
                }
                return;
            }
        }

        target.appendChild(buildCodeBlockHtml(code, language));
    }

    function removeInjectedCodeBlock() {
        const target = findInjectionTarget();
        if (!target) return;
        target.querySelectorAll('.markdown-body.submission-detail').forEach(b => {
            const wrap = b.closest('.el-col.el-col-24');
            (wrap && wrap.querySelector('.markdown-body.submission-detail') && wrap.children.length === 1)
                ? wrap.remove()
            : b.remove();
        });
    }

    const origFetch = unsafeWindow.fetch;
    unsafeWindow.fetch = function (input, init = {}) {
        let url = typeof input === 'string' ? input : input.url;
        let method = (init.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
        if (forceUpdate && url.includes('/api/discussion')) {
            if (method === 'PUT') { method = 'POST'; if (init.method) init.method = method; else if (input instanceof Request) input = new Request(input, { method }); }
            if (init.body) { try { const o = JSON.parse(init.body); Object.assign(o, getForceFields()); init.body = JSON.stringify(o); } catch {} }
        }
        if (isRankListApi(url)) {
            return origFetch.call(this, input, init).then((resp) => {
                // 数据已返回，等 Vue 完成 DOM 渲染后再注入
                setTimeout(() => {
                    if (isRankPage()) {
                        console.log('[RankTag] 排行榜接口已完成，重新注入');
                        injectRankTag();
                    }
                }, 150);   // 给 Vue 微小的渲染时间
                return resp;
            });
        }
        return origFetch.call(this, input, init);
    };
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, ...r) {
        this._fuUrl = url;
        this._fuMethod = method.toUpperCase();

        // 原有 ForceUpdate 逻辑
        if (forceUpdate && url.includes('/api/discussion') && this._fuMethod === 'PUT') {
            this._fuMethod = 'POST';
            method = 'POST';
        }

        // —— 新增：标记排行榜列表接口 ——
        this._isRankListApi = isRankListApi(url);

        return origOpen.call(this, method, url, ...r);
    };

    XMLHttpRequest.prototype.send = function (body) {
        // 原有 ForceUpdate 逻辑
        if (forceUpdate && this._fuUrl?.includes('/api/discussion') && body) {
            try {
                const o = JSON.parse(body);
                Object.assign(o, getForceFields());
                body = JSON.stringify(o);
            } catch {}
        }

        // —— 新增：排行榜列表接口完成后触发标签注入 ——
        if (this._isRankListApi) {
            this.addEventListener('load', () => {
                setTimeout(() => {
                    if (isRankPage()) {
                        console.log('[RankTag] 排行榜接口已完成（XHR），重新注入');
                        injectRankTag();
                    }
                }, 150);
            }, { once: true });
        }

        return origSend.call(this, body);
    };

    function syncForceCheckbox() {
        const cb = document.getElementById(FORCE_UPDATE_CHECKBOX_ID); if (cb) cb.checked = forceUpdate;
        const c = document.getElementById(FORCE_FIELDS_CONTAINER_ID); if (c) c.style.display = forceUpdate ? 'block' : 'none';
    }

    function injectForceOption() {
        if (!window.location.pathname.endsWith('/discussion')) return false;
        const f = document.querySelector('.el-dialog__footer .dialog-footer'); if (!f) return false;
        if (document.getElementById(FORCE_UPDATE_CHECKBOX_ID)) return true;
        const lb = document.createElement('label');
        lb.style.cssText = 'margin-right:15px;display:inline-flex;align-items:center;cursor:pointer;';
        lb.title = '启用 ForceUpdate';
        const cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = FORCE_UPDATE_CHECKBOX_ID;
        cb.style.marginRight = '5px'; cb.checked = forceUpdate;
        cb.addEventListener('change', e => { forceUpdate = e.target.checked; try { unsafeWindow.__forceDiscussionUpdate__ = forceUpdate; } catch {} syncForceCheckbox(); });
        const sp = document.createElement('span'); sp.textContent = 'ForceUpdate';
        lb.append(cb, sp); f.insertBefore(lb, f.firstChild);
        const fc = document.createElement('div');
        fc.id = FORCE_FIELDS_CONTAINER_ID;
        fc.style.cssText = `display:${forceUpdate ? 'block' : 'none'};margin-top:10px;text-align:left;`;
        fc.innerHTML = `
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">role</label><input id="force-role-input" type="text" placeholder="user/admin/root" style="width:100px;padding:4px;"></div>
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">viewNum</label><input id="force-viewNum-input" type="number" placeholder="0" style="width:80px;padding:4px;"></div>
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">likeNum</label><input id="force-likeNum-input" type="number" placeholder="0" style="width:80px;padding:4px;"></div>
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">commentNum</label><input id="force-commentNum-input" type="number" placeholder="0" style="width:80px;padding:4px;"></div>`;
        f.insertBefore(fc, lb.nextSibling); return true;
    }

    function startDiscussionObserver() {
        new MutationObserver(() => {
            if (window.location.pathname.endsWith('/discussion') && document.querySelector('.el-dialog__footer .dialog-footer')) injectForceOption();
        }).observe(document.body, { childList: true, subtree: true });
    }

    /* ---------- 跳转按钮 ---------- */
    function getJumpUrls(problemCode) {
        const urls = [];
        if (!problemCode) return urls;

        // CF-207A1 → contest=207, index=A1
        let m = problemCode.match(/^CF-(\d+)(.+)$/i);
        if (m) {
            const contest = m[1];
            const index = m[2];
            urls.push({
                name: 'Codeforces',
                id: 'hoj-jump-cf',
                url: `https://codeforces.com/problemset/problem/${contest}/${index}`
            });
            urls.push({
                name: '洛谷',
                id: 'hoj-jump-lg-cf',
                url: `https://www.luogu.com.cn/problem/CF${contest}${index}`
            });
            return urls;
        }

        // AC-abc123_1 → prefix=abc, number=123, index=1
        m = problemCode.match(/^AC-(abc|arc|agc)(\d+)_(.+)$/i);
        if (m) {
            const prefix = m[1].toLowerCase();
            const num = m[2];
            const idx = m[3];
            const contest = `${prefix}${num}`;
            urls.push({
                name: 'AtCoder',
                id: 'hoj-jump-atcoder',
                url: `https://atcoder.jp/contests/${contest}/tasks/${contest}_${idx}`
            });
            urls.push({
                name: '洛谷',
                id: 'hoj-jump-lg-atcoder',
                url: `https://www.luogu.com.cn/problem/AT_${contest}_${idx}`
            });
            return urls;
        }

        // LIBRE-100 → LibreOJ
        m = problemCode.match(/^LIBRE-(\d+)$/i);
        if (m) {
            urls.push({
                name: 'LibreOJ',
                id: 'hoj-jump-libreoj',
                url: `https://loj.ac/p/${m[1]}`
            });
            return urls;
        }

        return urls;
    }

    function addJumpButtons() {
        if (!currentProblemCode) return;

        const c = document.querySelector('.question-intr');
        if (!c) return;

        const urls = getJumpUrls(currentProblemCode);
        if (!urls.length) return;

        urls.forEach(({ name, id, url }) => {
            if (document.getElementById(id)) return;
            const btn = document.createElement('button');
            btn.id = id;
            btn.type = 'button';
            btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
            btn.textContent = name;
            btn.style.cssText = 'padding:5px 10px;margin-left:8px;cursor:pointer;';
            btn.addEventListener('click', () => window.open(url, '_blank'));
            c.appendChild(btn);
        });
    }

    function clearJumpButtons() {
        ['hoj-jump-cf', 'hoj-jump-lg-cf', 'hoj-jump-atcoder', 'hoj-jump-lg-atcoder', 'hoj-jump-libreoj']
            .forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });
    }

    /* ---------- CPH / 下载按钮 ---------- */
    function addImportButton() {
        if (document.getElementById(BUTTON_CPH_ID)) return;
        const c = document.querySelector('.question-intr'); if (!c) return;
        const btn = document.createElement('button');
        btn.id = BUTTON_CPH_ID;
        btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
        btn.textContent = '导入到 CPH';
        btn.style.cssText = 'padding:5px 10px;margin-left:8px;cursor:pointer;';
        btn.addEventListener('click', async () => {
            if (!currentProblemData) return NewAlert('题目信息尚未加载', 'warning');
            const r = await sendToCPH(currentProblemData, 27121);
            NewAlert(r.success ? '题目已成功导入到 CPH！' : '导入失败：' + r.message,
                     r.success ? 'success' : 'error');
        });
        c.appendChild(btn);
    }

    function removeImportButton() {
        const btn = document.getElementById(BUTTON_CPH_ID);
        if (btn) btn.remove();
    }

    function addDownloadButton() {
        if (document.getElementById(BUTTON_DOWNLOAD_ID)) return;
        const c = document.querySelector('.question-intr'); if (!c) return;
        const btn = document.createElement('button');
        btn.id = BUTTON_DOWNLOAD_ID;
        btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
        btn.textContent = '下载数据';
        btn.style.cssText = 'padding:5px 10px;margin-left:8px;cursor:pointer;';
        btn.addEventListener('click', downloadTestcase);
        c.appendChild(btn);
    }

    function removeDownloadButton() {
        const btn = document.getElementById(BUTTON_DOWNLOAD_ID);
        if (btn) btn.remove();
    }

    /* ---------- 自动获取题目信息（替代原按钮） ---------- */
    /**
     * 自动获取当前题目信息：
     *  - 普通题目 → /api/get-problem-detail?problemId=xxx
     *  - 比赛题目 → /api/get-contest-problem-details?displayId=x&cid=y&containsEnd=true
     */
    async function autoFetchProblemInfo() {
        const ctx = parseProblemContext();
        if (!ctx) return;
        console.log(ctx);
        // 用 URL 作为去重 key，避免重复请求同一道题
        const key = ctx.type === 'contest'
        ? `contest:${ctx.cid}/${ctx.displayId}`
        : `problem:${ctx.problemId}`;
        if (autoFetchProblemInfo._lastKey === key) return;
        autoFetchProblemInfo._lastKey = key;

        // 切换题目时先清理旧状态与按钮
        clearJumpButtons();
        removeImportButton();
        removeDownloadButton();
        currentProblemData = null;
        currentProblemId = null;
        currentProblemCode = null;

        try {
            const d = await fetchProblemDetail();
            console.log('[SmartHOJ] autoFetchProblemInfo 结果:', d);

            const p = d?.data?.problem || d?.data?.problems?.[0] || null;
            if (p?.id) currentProblemId = p.id;
            if (p?.problemId) currentProblemCode = p.problemId;

            const cph = buildCPHData(d);
            if (cph) {
                currentProblemData = cph;
                addImportButton();
            }
            addCopyButtons(d);
            // 下载数据仅限于团队
            if(ctx.gid) {
                addDownloadButton();
            }
            addJumpButtons();
            addFavoriteButtonToDetail();
        } catch (e) {
            console.error('[SmartHOJ] 自动获取题目失败:', e);
        }
    }

    /* ---------- 自动登录 ---------- */
    async function checkLoginAndAutoLogin() {
        const username = config.DefaultUsername;
        const password = config.DefaultPassword;
        if (!config.AutoLogin) return;
        try {
            const resp = await fetch(`${window.location.origin}/api/get-user-home-info`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const data = await resp.json();
            console.log('Got:', data);

            if (data?.status === 200) {
                console.log('[AutoLogin] 已登录，跳过自动登录');
                return;
            }

            console.log('[AutoLogin] 登录状态已失效，尝试自动登录…');
            const ok = await doLogin(username, password);
            if (ok) {
                console.log('[AutoLogin] 自动登录成功');
                NewAlert('已自动登录，页面将重新加载', 'success');
                location.reload();
            } else {
                console.warn('[AutoLogin] 自动登录失败');
                NewAlert('自动登录失败，请手动登录', 'error');
            }
        } catch (e) {
            console.error('[AutoLogin] 检查登录状态出错:', e);
        }
    }
    function clearLocalLogin() {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            console.log('[ManualLogin] 已清除本地 token / userInfo');
            NewAlert('已清除本地登录态', 'warning');
        } catch (e) {
            console.warn('[ManualLogin] 清除失败:', e);
            NewAlert('清除失败：' + e.message, 'error');
        }
    }
    async function doLogin(username, password) {
        if (!config.AutoLogin) return;
        try {
            const resp = await fetch(`${window.location.origin}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });

            const authHeader = resp.headers.get('Authorization');
            const data = await resp.json();
            const userInfo = data?.data;
            if (!authHeader) {
                console.warn('[AutoLogin] 响应头中没有 Authorization');
                return false;
            }

            const token = authHeader;

            let ok = resp.ok;
            try {
                if (data && data.status && data.status !== 200) ok = false;
            } catch { /* 响应体可能不是 JSON，忽略 */ }

            if (!ok) {
                console.warn('[AutoLogin] 登录失败，状态码:', resp.status);
                return false;
            }

            localStorage.setItem('token', token);
            if (userInfo !== undefined && userInfo !== null) {
                try {
                    localStorage.setItem('userInfo', typeof userInfo === 'string' ? userInfo : JSON.stringify(userInfo));
                } catch (e) {
                    console.warn('[AutoLogin] 写入 userInfo 失败:', e);
                }
            }
            console.log('[AutoLogin] token 已写入 localStorage');
            return true;
        } catch (e) {
            console.error('[AutoLogin] 登录请求失败:', e);
            return false;
        }
    }
    /** 自动跳转：
    判断当前 host 是否属于已知的 HOJ 域名集合 */
    /**
 * 把单个 URL 中的已知 HOJ host 替换为配置的目标 host
 * 只处理 http/https 绝对 URL 和 "//host/..." 协议相对 URL
 * 相对路径（如 "/problem/A001"）不动，因为浏览器会沿用当前 host
 * @param {string} href
 * @returns {string} 重写后的 href（无需改动时原样返回）
 */
    function rewriteHojUrl(href) {
        const target = (config.AutoRedirectHost || '').trim();
        if (!target) return href;
        const pureTarget = target.split(':')[0];

        try {
            // 协议相对：//ssf.hdoi.cn/xxx
            if (href.startsWith('//')) {
                const u = new URL(window.location.protocol + href);
                if (!isKnownHojHost(u.hostname)) return href;
                if (u.hostname === pureTarget) return href;
                u.hostname = pureTarget;
                return u.toString();
            }

            // 绝对 URL：http://... / https://...
            if (/^https?:\/\//i.test(href)) {
                const u = new URL(href);
                if (!isKnownHojHost(u.hostname)) return href;
                if (u.hostname === pureTarget) return href;
                u.hostname = pureTarget;
                return u.toString();
            }

            // 其它（相对路径、mailto、javascript 等）不动
            return href;
        } catch {
            return href;
        }
    }

    /**
 * 遍历页面上所有 <a href>，把指向已知 HOJ 域名的链接改写为目标域名
 */
    function rewriteAllHojLinks() {
        if (!config.AutoRedirectHost) return;
        const anchors = document.querySelectorAll('a[href]');
        let changed = 0;
        anchors.forEach(a => {
            // 已经处理过且没变化，跳过
            const original = a.getAttribute('href');
            if (!original) return;
            const rewritten = rewriteHojUrl(original);
            if (rewritten !== original) {
                a.setAttribute('href', rewritten);
                changed++;
            }
        });
        if (changed > 0) {
            console.log(`[AutoRedirect] 已改写 ${changed} 个链接`);
        }
    }
    function isKnownHojHost(host) {
        const known = [
            'ssf.hdoi.cn',
            'oi.cnuschool.org.cn',
            '172.16.21.199'
        ];
        // 去掉端口
        const pureHost = host.split(':')[0];
        return known.includes(pureHost);
    }

    /**
 * 若配置了 AutoRedirectHost，且当前 host 与目标 host 不同，则跳转
 * 保留 path / search / hash
 */
    function autoRedirect() {
        const target = (config.AutoRedirectHost || '').trim();
        if (!target || !config.EnableRedirect) return;
        const currentHost = window.location.hostname;
        const pureTarget = target.split(':')[0];

        // 已经处于目标 host，不跳转（避免死循环）
        if (currentHost === pureTarget) return;

        // 只在已知 HOJ 域名之间跳转，避免意外影响其它站点
        if (!isKnownHojHost(currentHost)) return;

        const protocol = (config.AutoRedirectProtocol || '').trim() || window.location.protocol.replace(':', '');
        const newUrl = `${protocol}://${target}${window.location.pathname}${window.location.search}${window.location.hash}`;

        console.log(`[AutoRedirect] ${window.location.host} → ${pureTarget}`);
        // 用 replace 避免污染历史记录
        window.location.replace(newUrl);
    }
    /* ============================================================
 * 新前端：返回旧前端按钮
 * ============================================================ */
    function injectBackToOldBtn() {
        const path = window.location.pathname;

        // 只在 /new 路径下注入
        if (!path.startsWith('/new')) {
            // 离开 /new 时清掉旧按钮
            const old = document.getElementById('hoj-back-old-btn');
            if (old) old.remove();
            return false;
        }

        // 已存在则跳过
        if (document.getElementById('hoj-back-old-btn')) return true;

        // 定位新前端的左侧 nav（Vue scope）
        const nav = document.querySelector('nav[data-v-7b0404d0]')
        || document.querySelector('nav[data-v-9dacc850]');
        if (!nav) return false;

        // 找到已有导航按钮里的第一个，用它作为模板
        const firstGear = nav.querySelector('button.gear-item');
        if (!firstGear) return false;
        const container = firstGear.parentElement;

        // 复用样式，只换图标 + 文字
        const btn = document.createElement('button');
        btn.id = 'hoj-back-old-btn';
        btn.className = firstGear.className;
        btn.style.color = '#86868B';   // 保持非激活的灰色
        btn.innerHTML = `
        <span class="w-4 h-4 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
        </span>
        <span class="truncate">返回旧前端</span>
    `;
        btn.addEventListener('click', () => {
            window.location.href = '/home';
        });

        container.appendChild(btn);
        scheduleApplyNavbarLayout(100);
        console.log('[BackOld] 已注入返回旧前端按钮');
        return true;
    }
    /* ============================================================
 * 代码自动保存
 * ============================================================ */
    let _autoSaveTimer = null;

    /** 从 URL 提取当前题目 ID */
    function _getAutoSaveProblemId() {
        const m = window.location.pathname.match(/^\/problem\/([^\/?#]+)/);
        return m ? decodeURIComponent(m[1]) : null;
    }

    /** 找到当前题目页的 CodeMirror 实例 */
    function _findCodeMirror() {
        const cmEl = document.querySelector('.vue-codemirror-wrap .CodeMirror')
        || document.querySelector('.CodeMirror');
        if (cmEl && cmEl.CodeMirror && typeof cmEl.CodeMirror.getValue === 'function') {
            return cmEl.CodeMirror;
        }
        // 兜底：扫描所有 textarea
        for (const ta of document.querySelectorAll('textarea')) {
            if (ta.CodeMirror && typeof ta.CodeMirror.getValue === 'function') {
                return ta.CodeMirror;
            }
        }
        return null;
    }

    /** 从右侧语言选择框读当前语言 */
    function _getCurrentLanguage() {
        // 语言选择框在 #js-right-header 的第一个 .select-row 里
        const el = document.querySelector('#js-right-header .select-row .el-select .el-input__inner');
        if (el && el.value) return el.value.trim();
        return null;
    }

    /** 读现有 localStorage（兼容缺失 / 脏数据） */
    function _readStoredSetting(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? (JSON.parse(raw) || {}) : {};
        } catch {
            return {};
        }
    }

    /** 单次保存 */
    function _autoSaveTick() {
        const pid = _getAutoSaveProblemId();
        if (!pid) return;

        const cm = _findCodeMirror();
        if (!cm) return;

        const key = `hojProblemCodeAndSetting_NoContest_${pid}`;
        const stored = _readStoredSetting(key);

        stored.code = cm.getValue();
        const lang = readStoredLanguage() || _getCurrentLanguage();
        if (lang) stored.language = lang;

        // 补齐 HOJ 约定的字段，避免写入残缺数据
        if (typeof stored.language !== 'string') stored.language = 'C++';
        if (typeof stored.theme    !== 'string') stored.theme    = 'solarized';
        if (typeof stored.fontSize !== 'string') stored.fontSize = '14px';
        if (typeof stored.tabSize  !== 'number') stored.tabSize  = 4;

        try {
            localStorage.setItem(key, JSON.stringify(stored));
            console.log(`[AutoSave] 已保存 ${key}（${stored.code.length} 字符）`);
        } catch (e) {
            console.warn('[AutoSave] 保存失败:', e);
        }
    }

    /** 停止定时器 */
    function stopAutoSaveCode() {
        if (_autoSaveTimer) {
            clearInterval(_autoSaveTimer);
            _autoSaveTimer = null;
            console.log('[AutoSave] 已停止');
        }
    }

    /** 根据 config 与当前 URL 重新同步定时器 */
    function syncAutoSaveCode() {
        stopAutoSaveCode();
        if (!config.AutoSaveCode) return;

        const pid = _getAutoSaveProblemId();
        if (!pid) return;

        const interval = Math.max(5, Number(config.AutoSaveCodeInterval) || 30);
        _autoSaveTimer = setInterval(_autoSaveTick, interval * 1000);
        console.log(`[AutoSave] 已启动，题目 ${pid}，间隔 ${interval} 秒`);

        // 离开页面前再存一次，避免最后一次编辑丢失
        if (!syncAutoSaveCode._leaveBound) {
            syncAutoSaveCode._leaveBound = true;

            const saveOnLeave = () => {
                if (config.AutoSaveCode) _autoSaveTick();
            };

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) saveOnLeave();
            });
            window.addEventListener('pagehide', saveOnLeave);
            window.addEventListener('beforeunload', saveOnLeave);
        }
    }
    /* ============================================================
 * 讨论详情页：接管点赞 / 取消点赞 按钮
 * ============================================================ */
    const HOJ_LIKE_COOLDOWN_MS = 10 * 1000;

    let _hojLikeCoolEnd = 0;
    let _hojLikeCoolRaf = null;

    function isDiscussionDetailPage() {
        const p = window.location.pathname;
        return /^\/discussion-detail\/[^\/?#]+/.test(p)
        || /^\/group\/[^\/]+\/discussion-detail\/[^\/?#]+/.test(p);
    }

    function getDiscussionIdFromUrl() {
        const p = window.location.pathname;
        let m = p.match(/^\/discussion-detail\/([^\/?#]+)/);
        if (m) return decodeURIComponent(m[1]);
        m = p.match(/^\/group\/[^\/]+\/discussion-detail\/([^\/?#]+)/);
        return m ? decodeURIComponent(m[1]) : null;
    }

    function injectDiscussionLikeButtons() {
        if (!isDiscussionDetailPage()) return false;

        const did = getDiscussionIdFromUrl();
        if (!did) return false;

        // 已经注入过 → 直接返回
        if (document.getElementById('hoj-like-box')) return true;

        // 找原生按钮，隐藏它们
        const nativeLike = document.querySelector('a.like[data-v-13564ee3], a.like');
        if (!nativeLike) return false;

        const parent = nativeLike.parentElement;
        if (!parent) return false;

        parent.querySelectorAll('a.like').forEach(a => {
            a.style.display = 'none';
        });

        /* ---------- 构造我们的按钮 ---------- */
        const box = document.createElement('div');
        box.id = 'hoj-like-box';
        box.className = 'hoj-like-box';
        box.innerHTML = `
        <button type="button" class="hoj-like-btn hoj-like-btn--like">
            <i class="fa fa-thumbs-o-up"></i><span>点赞</span>
        </button>
        <button type="button" class="hoj-like-btn hoj-like-btn--unlike">
            <i class="fa fa-thumbs-down"></i><span>取消点赞</span>
        </button>
        <span class="hoj-like-cooldown" aria-live="polite"></span>
        <span class="hoj-like-progress"><span class="hoj-like-progress-inner"></span></span>
    `;
        // 插到第一个原生 a.like 的位置（保持原视觉顺序）
        const firstLike = parent.querySelector('a.like');
        if (firstLike && firstLike.parentNode === parent) {
            parent.insertBefore(box, firstLike);
        } else {
            parent.appendChild(box);   // 兜底
        }

        const likeBtn   = box.querySelector('.hoj-like-btn--like');
        const unlikeBtn = box.querySelector('.hoj-like-btn--unlike');
        const cdEl      = box.querySelector('.hoj-like-cooldown');
        const barInner  = box.querySelector('.hoj-like-progress-inner');

        /* ---------- 冷却控制 ---------- */
        const setButtonsDisabled = (disabled) => {
            likeBtn.disabled = disabled;
            unlikeBtn.disabled = disabled;
        };

        const endCooldown = () => {
            _hojLikeCoolEnd = 0;
            if (_hojLikeCoolRaf) {
                cancelAnimationFrame(_hojLikeCoolRaf);
                _hojLikeCoolRaf = null;
            }
            box.classList.remove('is-cooldown');
            setButtonsDisabled(false);
            cdEl.textContent = '';
            barInner.style.width = '100%';
        };

        const startCooldown = () => {
            _hojLikeCoolEnd = Date.now() + HOJ_LIKE_COOLDOWN_MS;
            box.classList.add('is-cooldown');
            setButtonsDisabled(true);

            // 进度条动画（重启动画需要 reflow）
            barInner.style.transition = 'none';
            barInner.style.width = '100%';
            // eslint-disable-next-line no-unused-expressions
            barInner.offsetHeight;
            barInner.style.transition = `width ${HOJ_LIKE_COOLDOWN_MS}ms linear`;
            requestAnimationFrame(() => {
                barInner.style.width = '0%';
            });

            const tick = () => {
                const remain = _hojLikeCoolEnd - Date.now();
                if (remain <= 0) {
                    endCooldown();
                    return;
                }
                cdEl.textContent = Math.ceil(remain / 1000) + 's';
                _hojLikeCoolRaf = requestAnimationFrame(tick);
            };
            if (_hojLikeCoolRaf) cancelAnimationFrame(_hojLikeCoolRaf);
            _hojLikeCoolRaf = requestAnimationFrame(tick);
        };

        const sendLike = async (toLike) => {
            if (box.classList.contains('is-cooldown')) return;

            startCooldown();   // 立即进入冷却，防止连点

            try {
                const token = localStorage.getItem('token') || '';
                const url = `${window.location.origin}/api/discussion-like`
                + `?did=${encodeURIComponent(did)}`
                + `&toLike=${toLike ? 'true' : 'false'}`;
                const resp = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                let data = null;
                try { data = await resp.json(); } catch (_) { data = null; }

                const bizStatus = data && typeof data.status !== 'undefined' ? data.status : 200;
                const ok = resp.ok && bizStatus === 200;

                if (ok) {
                    NewAlert(toLike ? '点赞成功' : '已取消点赞', 'success', 1500);
                    return;
                }

                endCooldown();

                const reason =
                      (data && (data.msg || data.message || data.error)) ||
                      (resp.status === 401 || bizStatus === 401 ? '请先登录后再操作' : '') ||
                      (resp.status === 403 || bizStatus === 403 ? '没有权限执行此操作' : '') ||
                      (resp.status === 429 || bizStatus === 429 ? '操作过于频繁，请稍后再试' : '') ||
                      (resp.status >= 500 ? '服务器错误，请稍后再试' : '') ||
                      (toLike ? '点赞失败' : '取消失败');

                NewAlert(reason, 'error', 2500);
            } catch (e) {
                console.error('[DiscussionLike] 请求失败:', e);
                endCooldown();
                NewAlert('网络错误，请稍后重试', 'error', 2000);
            }
        };

        likeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sendLike(true);
        });

        unlikeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sendLike(false);
        });

        console.log('[DiscussionLike] 已接管点赞按钮 did=' + did);
        return true;
    }

    /* 离开页面时清理 */
    function cleanupDiscussionLikeButtons() {
        if (_hojLikeCoolRaf) {
            cancelAnimationFrame(_hojLikeCoolRaf);
            _hojLikeCoolRaf = null;
        }
        _hojLikeCoolEnd = 0;
        const box = document.getElementById('hoj-like-box');
        if (box) box.remove();
    }
    /* ============================================================
 * 新前端 /new/discussion/{did}：接管点赞 / 取消点赞
 * ============================================================ */
    function isNewDiscussionPage() {
        return /^\/new\/discussion\/[^\/?#]+/.test(window.location.pathname);
    }

    function getNewDiscussionId() {
        const m = window.location.pathname.match(/^\/new\/discussion\/([^\/?#]+)/);
        return m ? decodeURIComponent(m[1]) : null;
    }

    let _hojNewLikeCoolEnd = 0;
    let _hojNewLikeCoolRaf = null;
    let _hojNewLikeCoolBox = null;   // 当前绑定冷却的 box

    function injectNewDiscussionLikeButtons() {
        if (!isNewDiscussionPage()) return false;
        const did = getNewDiscussionId();
        if (!did) return false;

        if (document.getElementById('hoj-new-like-box')) return true;

        // 找到原生点赞按钮：class 含 "text-[#34C759]" 或 "text-[#86868B]"，
        // 且里面有一个 <span> 文本以 "点赞" 开头
        const allBtns = document.querySelectorAll('button[data-v-cf7f5c93], button');
        let nativeLike = null;
        for (const btn of allBtns) {
            const span = btn.querySelector('span');
            if (!span) continue;
            const t = (span.textContent || '').trim();
            if (/^点赞(\s|$|\d)/.test(t)) { nativeLike = btn; break; }
        }
        if (!nativeLike) return false;

        const parent = nativeLike.parentElement;
        if (!parent) return false;

        // 隐藏所有原生的"点赞 ..."按钮（可能有两个：未点赞态 + 已点赞态）
        parent.querySelectorAll('button').forEach(btn => {
            const span = btn.querySelector('span');
            if (span && /^点赞(\s|$|\d)/.test((span.textContent || '').trim())) {
                btn.style.display = 'none';
            }
        });

        /* ---------- 构造我们的按钮（文字颜色不同，样式与原生相近） ---------- */
        const box = document.createElement('div');
        box.id = 'hoj-new-like-box';
        box.className = 'hoj-new-like-box';
        box.innerHTML = `
        <button type="button" class="hoj-new-like-btn hoj-new-like-btn--like">
            <svg class="hoj-new-like-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                      d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"></path>
            </svg>
            <span>点赞</span>
        </button>
        <button type="button" class="hoj-new-like-btn hoj-new-like-btn--unlike">
            <svg class="hoj-new-like-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                      d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"></path>
            </svg>
            <span>取消点赞</span>
        </button>
        <span class="hoj-new-like-cd" aria-live="polite"></span>
        <span class="hoj-new-like-bar"><span class="hoj-new-like-bar-inner"></span></span>
    `;

        // 插到第一个被隐藏的原生按钮位置（保持视觉顺序）
        const firstHidden = [...parent.querySelectorAll('button')].find(
            b => b.style.display === 'none'
        );
        if (firstHidden && firstHidden.parentNode === parent) {
            parent.insertBefore(box, firstHidden);
        } else {
            parent.appendChild(box);
        }

        const likeBtn   = box.querySelector('.hoj-new-like-btn--like');
        const unlikeBtn = box.querySelector('.hoj-new-like-btn--unlike');
        const cdEl      = box.querySelector('.hoj-new-like-cd');
        const barInner  = box.querySelector('.hoj-new-like-bar-inner');

        /* ---------- 冷却控制（独立于旧前端） ---------- */
        const endCooldown = () => {
            _hojNewLikeCoolEnd = 0;
            if (_hojNewLikeCoolRaf) { cancelAnimationFrame(_hojNewLikeCoolRaf); _hojNewLikeCoolRaf = null; }
            box.classList.remove('is-cooldown');
            likeBtn.disabled = false;
            unlikeBtn.disabled = false;
            cdEl.textContent = '';
            barInner.style.width = '100%';
        };

        const startCooldown = () => {
            _hojNewLikeCoolEnd = Date.now() + HOJ_LIKE_COOLDOWN_MS;
            _hojNewLikeCoolBox = box;
            box.classList.add('is-cooldown');
            likeBtn.disabled = true;
            unlikeBtn.disabled = true;

            barInner.style.transition = 'none';
            barInner.style.width = '100%';
            void barInner.offsetHeight;
            barInner.style.transition = `width ${HOJ_LIKE_COOLDOWN_MS}ms linear`;
            requestAnimationFrame(() => { barInner.style.width = '0%'; });

            const tick = () => {
                const remain = _hojNewLikeCoolEnd - Date.now();
                if (remain <= 0) { endCooldown(); return; }
                cdEl.textContent = Math.ceil(remain / 1000) + 's';
                _hojNewLikeCoolRaf = requestAnimationFrame(tick);
            };
            if (_hojNewLikeCoolRaf) cancelAnimationFrame(_hojNewLikeCoolRaf);
            _hojNewLikeCoolRaf = requestAnimationFrame(tick);
        };

        /* ---------- 请求 ---------- */
        const sendLike = async (toLike) => {
            if (box.classList.contains('is-cooldown')) return;
            startCooldown();

            try {
                const token = localStorage.getItem('token') || '';
                const url = `${window.location.origin}/api/discussion-like`
                + `?did=${encodeURIComponent(did)}`
                + `&toLike=${toLike ? 'true' : 'false'}`;
                const resp = await fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                let data = null;
                try { data = await resp.json(); } catch (_) {}

                const bizStatus = data && typeof data.status !== 'undefined' ? data.status : 200;
                const ok = resp.ok && bizStatus === 200;

                if (ok) {
                    NewAlert(toLike ? '点赞成功' : '已取消点赞', 'success', 1500);
                    return;
                }

                endCooldown();

                const reason =
                      (data && (data.msg || data.message || data.error)) ||
                      (resp.status === 401 || bizStatus === 401 ? '请先登录后再操作' : '') ||
                      (resp.status === 403 || bizStatus === 403 ? '没有权限执行此操作' : '') ||
                      (resp.status === 429 || bizStatus === 429 ? '操作过于频繁，请稍后再试' : '') ||
                      (resp.status >= 500 ? '服务器错误，请稍后再试' : '') ||
                      (toLike ? '点赞失败' : '取消失败');
                NewAlert(reason, 'error', 2500);
            } catch (e) {
                console.error('[DiscussionLike/new] 请求失败:', e);
                endCooldown();
                NewAlert('网络错误，请稍后重试', 'error', 2000);
            }
        };

        likeBtn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            sendLike(true);
        });
        unlikeBtn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            sendLike(false);
        });

        console.log('[DiscussionLike/new] 已接管 did=' + did);
        return true;
    }

    function cleanupNewDiscussionLikeButtons() {
        if (_hojNewLikeCoolRaf) { cancelAnimationFrame(_hojNewLikeCoolRaf); _hojNewLikeCoolRaf = null; }
        _hojNewLikeCoolEnd = 0;
        _hojNewLikeCoolBox = null;
        const box = document.getElementById('hoj-new-like-box');
        if (box) box.remove();
    }
    /* ============================================================
 * 讨论：Vditor 编辑器 + Better HOJ 弹窗发布
 * ============================================================ */
    const VDITOR_CDN = 'https://unpkg.com/vditor@3.10.4';
    let _vditorLoading = null;

    /** 沙箱环境下取页面真正的 window */
    function _pageWindow() {
        return (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
    }

    /**
 * Vditor 主题判定：只有在 Smart HOJ 启用且用户选择深色时，才走 dark
 * @returns {{ editorTheme: 'classic'|'dark', contentTheme: 'light'|'dark', hljsStyle: string }}
 */
    function getVditorTheme() {
        const useDark = !!config.Open && !!config.DarkMode;
        return {
            editorTheme:  useDark ? 'dark'    : 'classic',
            contentTheme: useDark ? 'dark'    : 'light',
            hljsStyle:    useDark ? 'github-dark' : 'github'
        };
    }
    /** 按需加载 Vditor（从页面上下文加载，从 unsafeWindow 读） */
    function ensureVditor() {
        const w = _pageWindow();

        // 已经加载过
        if (w.Vditor) return Promise.resolve(w.Vditor);
        if (_vditorLoading) return _vditorLoading;

        _vditorLoading = new Promise((resolve, reject) => {
            // 1) 样式（幂等）
            if (!document.getElementById('hoj-vditor-css')) {
                const link = document.createElement('link');
                link.id  = 'hoj-vditor-css';
                link.rel = 'stylesheet';
                link.href = `${VDITOR_CDN}/dist/index.css`;
                (document.head || document.documentElement).appendChild(link);
            }

            // 2) 脚本
            const s = document.createElement('script');
            s.src = `${VDITOR_CDN}/dist/index.min.js`;
            s.async = true;
            s.onload = () => {
                //  从页面 window 读，而不是沙箱 window
                if (w.Vditor) {
                    console.log('[Vditor] 已加载:', typeof w.Vditor);
                    resolve(w.Vditor);
                } else {
                    reject(new Error('Vditor 未挂载到 unsafeWindow'));
                }
            };
            s.onerror = () => reject(new Error('Vditor 脚本加载失败'));
            (document.head || document.documentElement).appendChild(s);
        });

        return _vditorLoading;
    }
    /** 获取讨论分类 */
    async function fetchDiscussionCategories(gid) {
        try {
            const token = localStorage.getItem('token') || '';
            let url = `${window.location.origin}/api/discussion-category`;
            if (gid !== undefined && gid !== null && String(gid) !== '') {
                url += `?gid=${encodeURIComponent(gid)}`;
            }
            const resp = await fetch(url, {
                headers: { 'Authorization': token },
                credentials: 'include'
            });
            const data = await resp.json();
            return Array.isArray(data?.data) ? data.data : [];
        } catch (e) {
            console.warn('[Discussion] 获取分类失败:', e);
            return [];
        }
    }
    /* ============================================================
 * Vditor 上传（图片 / 文件）
 * ============================================================ */

    /** 读取当前上传配置；未启用时返回 null */
    function getVditorUploadConfig() {
        const mode = config.VditorUploadMode || 'disabled';
        if (mode === 'disabled') return null;
        const gid = mode === 'group' ? String(config.VditorUploadGid || '').trim() : '';
        return { mode, gid, valid: mode !== 'group' || !!gid };
    }

    /**
 * 上传文件 / 图片
 * @param {File}   file
 * @param {'image'|'file'} kind
 * @param {string} gid  团队 ID（'' 表示不带 gid）
 * @returns {Promise<{link:string, fileId:number}>}
 */
    async function uploadVditorAttachment(file, kind, gid) {
        const token = localStorage.getItem('token') || '';
        const url = kind === 'image'
        ? `${window.location.origin}/api/file/upload-md-img`
        : `${window.location.origin}/api/file/upload-md-file`;

        const fd = new FormData();
        fd.append(kind === 'image' ? 'image' : 'file', file);
        if (gid) fd.append('gid', gid);

        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Authorization': token },
            credentials: 'include',
            body: fd
        });

        if (resp.status !== 200) throw new Error(`HTTP ${resp.status}`);

        const data = await resp.json().catch(() => null);
        if (!data) throw new Error(WebI18n.t('api.jsonError'));
        if (data.status !== 200) throw new Error(data.msg || `Status ${data.status}`);
        if (!data.data || !data.data.link) throw new Error(WebI18n.t('vditor.uploadNoLink'));
        return data.data;
    }

    /**
 * 生成 Vditor 自定义工具栏项
 * @param {Function} getEditor  返回 Vditor 实例的 getter
 * @param {'image'|'file'} kind
 */
    /* Vditor 规范图标：viewBox 32×32，fill 走 currentColor，尺寸交给 Vditor CSS */
    const VDITOR_ICON_IMAGE = '<svg viewBox="0 0 32 32"><path fill="currentColor" d="M27 5H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 2v12.59l-6.29-6.3-6.3 6.3-3.41-3.41L5 22.18V7h22zM10 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>';
    const VDITOR_ICON_FILE = '<svg viewBox="0 0 32 32"><path fill="currentColor" d="M20 4H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10l-6-6zm-1 7V6l5 5h-5zM12 15h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h5v2h-5v-2z"/></svg>';

    function makeVditorUploadToolbarItem(getEditor, kind) {
        const isImage = kind === 'image';
        return {
            name: isImage ? 'hoj-upload-image' : 'hoj-upload-file',
            tip: WebI18n.t(isImage ? 'vditor.uploadImage' : 'vditor.uploadFile'),
            className: '',

            icon: isImage ? VDITOR_ICON_IMAGE : VDITOR_ICON_FILE,
            click: () => {
                const cfg = getVditorUploadConfig();
                if (!cfg) { NewAlert('@vditor.uploadDisabled', 'warning'); return; }
                if (!cfg.valid) { NewAlert('@vditor.uploadNoGid', 'warning'); return; }

                const input = document.createElement('input');
                input.type = 'file';
                if (isImage) input.accept = 'image/*';
                input.style.display = 'none';

                input.addEventListener('change', async () => {
                    const f = input.files && input.files[0];
                    if (!f) return;
                    try {
                        const res = await uploadVditorAttachment(f, kind, cfg.gid);
                        const ed = getEditor();
                        if (!ed || typeof ed.insertValue !== 'function') return;
                        const name = (f.name || '').replace(/[\[\]]/g, '_');
                        const md = isImage
                        ? `![${name}](${res.link})`
                        : `[${name}](${res.link})`;
                        ed.insertValue(md, true);
                    } catch (e) {
                        console.warn('[Vditor Upload] 失败:', e);
                        NewAlert(WebI18n.t('vditor.uploadFailed', { msg: e.message || String(e) }), 'error');
                    } finally {
                        input.remove();
                    }
                });

                document.body.appendChild(input);
                input.click();
            }
        };
    }

    /**
 * 根据配置构建 Vditor 工具栏（无上传时与原行为一致）
 * @param {Function} getEditor
 * @returns {Array}
 */
    function buildVditorToolbar(getEditor) {
        const base = [
            'headings', 'bold', 'italic', 'strike', 'link', '|',
            'list', 'ordered-list', 'check', 'outdent', 'indent', '|',
            'quote', 'line', 'code', 'inline-code', '|',
            'table', '|',
            'undo', 'redo', '|',
            'edit-mode', 'both', 'preview', 'fullscreen'
        ];

        const cfg = getVditorUploadConfig();
        if (!cfg) return base;

        // 在 "redo" 之后插入上传按钮（视觉上在撤销/重做附近）
        const items = [];
        base.forEach(item => {
            items.push(item);
            if (item === 'redo') {
                items.push(makeVditorUploadToolbarItem(getEditor, 'image'));
                items.push(makeVditorUploadToolbarItem(getEditor, 'file'));
                items.push('|');
            }
        });
        return items;
    }
    /**
 * 提交讨论
 * @param {object} payload  已包含所有必填字段
 * @param {string|number} [gid]  如果在团队内发布，附加 ?gid=xxx
 */
    async function submitDiscussion(payload, gid) {
        const token = localStorage.getItem('token') || '';

        const body = {
            description: '',
            role: 'user',
            viewNum: 0,
            likeNum: 0,
            commentNum: 0,
            topPriority: false,
            ...payload
        };

        // 判断是否团队场景
        const hasGid = gid !== undefined && gid !== null && String(gid).trim() !== '';

        let url = `${window.location.origin}/api/discussion`;
        if (hasGid) {
            url = `${window.location.origin}/api/group/discussion`;
            const n = Number(gid);
            body.gid = Number.isNaN(n) ? gid : n;   // 数字优先，非数字保留原值
        }

        try {
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });
            const data = await resp.json().catch(() => null);
            return data;
        } catch (e) {
            return { status: 0, msg: e.message };
        }
    }
    /* ============================================================
 * 讨论详情页：编辑
 * ============================================================ */

    /** 从 URL 解析 did 与可选 gid */
    function parseDiscussionEditContext() {
        const path = window.location.pathname;
        let m = path.match(/^\/group\/([^\/]+)\/discussion-detail\/([^\/?#]+)/);
        if (m) return { gid: m[1], did: m[2] };
        m = path.match(/^\/discussion-detail\/([^\/?#]+)/);
        if (m) return { gid: undefined, did: m[1] };
        return null;
    }

    /** 获取讨论详情 */
    async function fetchDiscussionDetail(did) {
        try {
            const token = localStorage.getItem('token') || '';
            const url = `${window.location.origin}/api/get-discussion-detail?did=${encodeURIComponent(did)}`;
            const resp = await fetch(url, {
                headers: { 'Authorization': token },
                credentials: 'include'
            });
            const data = await resp.json();
            return data?.data || null;
        } catch (e) {
            console.warn('[Discussion] 获取详情失败:', e);
            return null;
        }
    }

    /** 打开编辑对话框 */
    async function openEditDiscussionDialog(ctx) {
        const { gid, did } = ctx;

        /* 1. 拉详情 */
        const detail = await fetchDiscussionDetail(did);
        if (!detail) {
            NewAlert('@discussion.loadDetailFailed', 'error');
            return;
        }

        /* 2. 拉分类 */
        let categories = await fetchDiscussionCategories(gid);
        if (!categories.length && gid) categories = await fetchDiscussionCategories();
        if (!categories.length) {
            NewAlert('@discussion.loadCategoriesFailed', 'error');
            return;
        }

        /* 3. 加载 Vditor */
        let VditorCtor;
        try { VditorCtor = await ensureVditor(); }
        catch (e) {
            console.error('[Discussion] Vditor 加载失败:', e);
            NewAlert('@discussion.loadEditorFailed', 'error');
            return;
        }

        /* 4. 构建表单 */
        const wrap = document.createElement('div');
        wrap.className = 'hoj-disc-form';

        // 分类
        const catField = document.createElement('div');
        catField.className = 'hoj-disc-field';
        const catLabel = document.createElement('label');
        catLabel.textContent = WebI18n.t('discussion.category');
        const catSel = document.createElement('select');
        catSel.className = 'hoj-disc-category';
        categories.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.name;
            if (Number(c.id) === Number(detail.categoryId)) opt.selected = true;
            catSel.appendChild(opt);
        });
        catField.append(catLabel, catSel);

        // 标题
        const titleField = document.createElement('div');
        titleField.className = 'hoj-disc-field';
        const titleLabel = document.createElement('label');
        titleLabel.innerHTML = `${escapeHtml(WebI18n.t('discussion.title'))} <span style="color:#F56C6C;">*</span>`;
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.className = 'hoj-disc-title';
        titleInput.placeholder = WebI18n.t('discussion.titlePlaceholder');
        titleInput.maxLength = 200;
        titleInput.value = detail.title || '';
        titleField.append(titleLabel, titleInput);

        // 简介
        const descField = document.createElement('div');
        descField.className = 'hoj-disc-field';
        const descLabel = document.createElement('label');
        descLabel.innerHTML = `${escapeHtml(WebI18n.t('discussion.description'))} <span style="color:#F56C6C;">*</span>`;
        const descInput = document.createElement('input');
        descInput.type = 'text';
        descInput.className = 'hoj-disc-desc';
        descInput.placeholder = WebI18n.t('discussion.descriptionPlaceholder');
        descInput.maxLength = 200;
        descInput.value = detail.description || '';
        descField.append(descLabel, descInput);

        // 内容
        const contentField = document.createElement('div');
        contentField.className = 'hoj-disc-field hoj-disc-field--editor';
        const contentLabel = document.createElement('label');
        contentLabel.textContent = WebI18n.t('discussion.content');
        const editorHost = document.createElement('div');
        editorHost.className = 'hoj-disc-editor';
        contentField.append(contentLabel, editorHost);

        // 高级选项（含 ForceUpdate）
        const advSection = document.createElement('div');
        advSection.className = 'hoj-disc-advanced';
        advSection.innerHTML = `
        <button type="button" class="hoj-disc-advanced-toggle">
            <i class="el-icon-arrow-down"></i>
            <span class="hoj-disc-advanced-title"></span>
        </button>
        <div class="hoj-disc-advanced-body" style="display:none;">
            <div class="hoj-disc-advanced-hint"></div>
            <div class="hoj-disc-adv-grid">
                <div class="hoj-disc-field">
                    <label class="hoj-disc-adv-label-role"></label>
                    <select class="hoj-disc-adv-role">
                        <option value="user"></option>
                        <option value="admin"></option>
                        <option value="root"></option>
                    </select>
                </div>
                <div class="hoj-disc-field">
                    <label class="hoj-disc-adv-label-views"></label>
                    <input type="number" class="hoj-disc-adv-viewNum" min="0" value="0">
                </div>
                <div class="hoj-disc-field">
                    <label class="hoj-disc-adv-label-likes"></label>
                    <input type="number" class="hoj-disc-adv-likeNum" min="0" value="0">
                </div>
                <div class="hoj-disc-field">
                    <label class="hoj-disc-adv-label-comments"></label>
                    <input type="number" class="hoj-disc-adv-commentNum" min="0" value="0">
                </div>
                <div class="hoj-disc-field hoj-disc-adv-field--check">
                    <label class="hoj-disc-adv-check-wrap">
                        <input type="checkbox" class="hoj-disc-adv-topPriority">
                        <span class="hoj-disc-adv-label-top"></span>
                    </label>
                </div>
                <div class="hoj-disc-field hoj-disc-adv-field--check">
                    <label class="hoj-disc-adv-check-wrap" title="">
                        <input type="checkbox" class="hoj-disc-adv-forceUpdate">
                        <span class="hoj-disc-adv-label-forceUpdate"></span>
                    </label>
                </div>
            </div>
        </div>
    `;

        // i18n
        advSection.querySelector('.hoj-disc-advanced-title').textContent = WebI18n.t('discussion.advanced');
        advSection.querySelector('.hoj-disc-advanced-hint').textContent  = WebI18n.t('discussion.advancedHint');
        advSection.querySelector('.hoj-disc-adv-label-role').textContent = WebI18n.t('discussion.role');
        advSection.querySelector('.hoj-disc-adv-label-views').textContent= WebI18n.t('discussion.viewNum');
        advSection.querySelector('.hoj-disc-adv-label-likes').textContent= WebI18n.t('discussion.likeNum');
        advSection.querySelector('.hoj-disc-adv-label-comments').textContent = WebI18n.t('discussion.commentNum');
        advSection.querySelector('.hoj-disc-adv-label-top').textContent  = WebI18n.t('discussion.topPriority');
        advSection.querySelector('.hoj-disc-adv-label-forceUpdate').textContent = WebI18n.t('discussion.forceUpdate');
        advSection.querySelector('.hoj-disc-adv-role option[value="user"]').textContent  = WebI18n.t('discussion.roleUser');
        advSection.querySelector('.hoj-disc-adv-role option[value="admin"]').textContent = WebI18n.t('discussion.roleAdmin');
        advSection.querySelector('.hoj-disc-adv-role option[value="root"]').textContent  = WebI18n.t('discussion.roleRoot');

        // 预填高级选项
        advSection.querySelector('.hoj-disc-adv-role').value       = detail.role || 'user';
        advSection.querySelector('.hoj-disc-adv-viewNum').value    = detail.viewNum ?? 0;
        advSection.querySelector('.hoj-disc-adv-likeNum').value    = detail.likeNum ?? 0;
        advSection.querySelector('.hoj-disc-adv-commentNum').value = detail.commentNum ?? 0;
        advSection.querySelector('.hoj-disc-adv-topPriority').checked = !!detail.topPriority;
        advSection.querySelector('.hoj-disc-adv-forceUpdate').parentElement.title = WebI18n.t('discussion.forceUpdateHint');

        // 折叠
        const advToggle = advSection.querySelector('.hoj-disc-advanced-toggle');
        const advBody   = advSection.querySelector('.hoj-disc-advanced-body');
        advToggle.addEventListener('click', () => {
            const open = advBody.style.display !== 'none';
            advBody.style.display = open ? 'none' : 'block';
            advToggle.classList.toggle('is-open', !open);
        });

        // 底部
        const footer = document.createElement('div');
        footer.className = 'hoj-disc-footer';
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'hoj-snippet-btn';
        cancelBtn.textContent = WebI18n.t('dialog.cancel');
        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
        submitBtn.textContent = WebI18n.t('discussion.save');
        footer.append(cancelBtn, submitBtn);

        wrap.append(titleField, descField, catField, contentField, advSection, footer);

        /* 5. 打开对话框 */
        let editor = null;
        let destroyed = false;

        const closeDialog = openCustomDialog({
            title: WebI18n.t('discussion.edit'),
            bodyEl: wrap,
            width: '760px',
            maxHeight: '85vh',
            fullscreen: true,
            onClose: () => {
                destroyed = true;
                if (editor) {
                    try { editor.destroy(); } catch (_) {}
                    editor = null;
                }
            }
        });

        cancelBtn.addEventListener('click', () => closeDialog());

        /* 6. 初始化 Vditor */
        const getEditor = () => editor;
        requestAnimationFrame(() => {
            if (destroyed) return;
            try {
                editor = new VditorCtor(editorHost, {
                    cdn: VDITOR_CDN,
                    height: '100%',
                    width: '100%',
                    theme: getVditorTheme().editorTheme,
                    icon: 'ant',
                    mode: 'ir',
                    value: detail.content || '',
                    placeholder: WebI18n.t('discussion.contentPlaceholder'),
                    tab: '  ',
                    counter: { enable: true, type: 'markdown' },
                    cache: { enable: false },
                    preview: {
                        theme: { current: 'light', path: `${VDITOR_CDN}/dist/css/content-theme` },
                        hljs: { style: 'github', lineNumber: true },
                        math: { engine: 'KaTeX', inlineDigit: true },
                        markdown: { toc: true }
                    },
                    toolbar: buildVditorToolbar(getEditor)
                });
            } catch (e) {
                console.error('[Discussion] Vditor 初始化失败:', e);
                NewAlert('@discussion.initEditorFailed', 'error');
            }
        });

        /* 7. 提交 */
        submitBtn.addEventListener('click', async () => {
            if (!editor) return NewAlert('@discussion.editorNotReady', 'warning');

            const categoryId  = Number(catSel.value);
            const title       = titleInput.value.trim();
            const description = descInput.value.trim();
            const content     = editor.getValue().trim();

            if (!categoryId)  return NewAlert('@discussion.categoryRequired', 'warning');
            if (!title)       return NewAlert('@discussion.titleRequired', 'warning');
            if (!description) return NewAlert('@discussion.descriptionRequired', 'warning');
            if (!content)     return NewAlert('@discussion.contentRequired', 'warning');

            const role        = advSection.querySelector('.hoj-disc-adv-role').value || 'user';
            const viewNum     = Math.max(0, Number(advSection.querySelector('.hoj-disc-adv-viewNum').value) || 0);
            const likeNum     = Math.max(0, Number(advSection.querySelector('.hoj-disc-adv-likeNum').value) || 0);
            const commentNum  = Math.max(0, Number(advSection.querySelector('.hoj-disc-adv-commentNum').value) || 0);
            const topPriority = advSection.querySelector('.hoj-disc-adv-topPriority').checked;
            const forceUpdate = advSection.querySelector('.hoj-disc-adv-forceUpdate').checked;

            submitBtn.disabled = true;
            const oldText = submitBtn.textContent;
            submitBtn.textContent = WebI18n.t('discussion.saving');

            try {
                /* ---- 请求体 ---- */
                const payload = {
                    id: Number(did),   //  编辑：用 id = did
                    categoryId,
                    title,
                    description,
                    content,
                    role,
                    viewNum,
                    likeNum,
                    commentNum,
                    topPriority,
                    status: 0
                };

                /* ---- 端点 ---- */
                let url = `${window.location.origin}/api/discussion`;
                if (gid) {
                    url = `${window.location.origin}/api/group/discussion`;
                    const n = Number(gid);
                    payload.gid = Number.isNaN(n) ? gid : n;
                }

                /* ---- 方法：PUT 优先，forceUpdate 时 POST ---- */
                const method = forceUpdate ? 'POST' : 'PUT';

                const token = localStorage.getItem('token') || '';
                const resp = await fetch(url, {
                    method,
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(payload)
                });
                const data = await resp.json().catch(() => null);

                const ok = data && (data.status === undefined || data.status === 200);
                if (ok) {
                    NewAlert('@discussion.saveSuccess', 'success', 2000);
                    closeDialog();
                    setTimeout(() => location.reload(), 800);
                } else {
                    const msg = data?.msg || data?.message || 'Unknown error';
                    NewAlert(WebI18n.t('discussion.saveFailed', { msg }), 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = oldText;
                }
            } catch (e) {
                console.error('[Discussion] 保存失败:', e);
                NewAlert(WebI18n.t('discussion.saveFailed', { msg: e.message }), 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = oldText;
            }
        });
    }

    /* ---------- 拦截「编辑」按钮 ---------- */
    /* ============================================================
 * 讨论列表响应缓存：优先使用页面自身请求的响应
 * ============================================================ */
    let _discListCache = null;         // { params, data, ts, source }
    let _discListFetching = false;

    const _DISC_LIST_URL_RE = /\/api\/(?:group\/)?get-discussion-list(?:\?|#|$)/;
    const _DISC_LIST_PARAM_WHITELIST = ['keyword', 'cid', 'currentPage', 'limit', 'pid', 'onlyMine', 'gid'];

    function _isDiscussionListUrl(url) {
        return typeof url === 'string' && _DISC_LIST_URL_RE.test(url);
    }

    function _paramsFromUrl(url) {
        try {
            const u = new URL(url, window.location.origin);
            const o = {};
            u.searchParams.forEach((v, k) => { o[k] = v; });
            return o;
        } catch (_) { return {}; }
    }

    function _discListParamsMatch(a, b) {
        for (const k of _DISC_LIST_PARAM_WHITELIST) {
            if (String(a?.[k] ?? '') !== String(b?.[k] ?? '')) return false;
        }
        return true;
    }

    function _recordDiscussionList(url, json, source) {
        if (!json || typeof json !== 'object') return;
        _discListCache = {
            params: _paramsFromUrl(url),
            data: json,
            ts: Date.now(),
            source
        };
        console.log('[DiscussionList] 缓存响应', _discListCache.params, '←', source);
    }
    function hookDiscussionListResponses() {
        if (hookDiscussionListResponses._done) return;
        hookDiscussionListResponses._done = true;

        /* ---------- 1) 页面 fetch ---------- */
        try {
            const prevFetch = unsafeWindow.fetch;
            unsafeWindow.fetch = function (input, init) {
                const url = typeof input === 'string' ? input : (input && input.url) || '';
                const p = prevFetch.call(this, input, init);
                if (_isDiscussionListUrl(url)) {
                    p.then(resp => {
                        try {
                            resp.clone().json()
                                .then(j => _recordDiscussionList(url, j, 'page-fetch'))
                                .catch(() => {});
                        } catch (_) {}
                    }).catch(() => {});
                }
                return p;
            };
        } catch (e) {
            console.warn('[DiscussionList] hook fetch 失败:', e);
        }

        /* ---------- 2) 页面 XHR ---------- */
        try {
            const XHR = unsafeWindow.XMLHttpRequest;
            if (XHR && XHR.prototype) {
                const _open = XHR.prototype.open;
                const _send = XHR.prototype.send;

                XHR.prototype.open = function (method, url, ...rest) {
                    this._hojDiscUrl = url;
                    return _open.call(this, method, url, ...rest);
                };

                XHR.prototype.send = function (body) {
                    if (_isDiscussionListUrl(this._hojDiscUrl)) {
                        this.addEventListener('load', () => {
                            try {
                                const j = JSON.parse(this.responseText);
                                _recordDiscussionList(this._hojDiscUrl, j, 'page-xhr');
                            } catch (_) {}
                        }, { once: true });
                    }
                    return _send.call(this, body);
                };
            }
        } catch (e) {
            console.warn('[DiscussionList] hook XHR 失败:', e);
        }

        console.log('[DiscussionList] 响应监听已挂载');
    }
    function injectDiscussionEditInterceptor() {
        if (!config.VditorDiscussionEdit) return false;
        const ctx = parseDiscussionEditContext();
        if (!ctx) return false;

        // 找“编辑”链接
        const editLink = [...document.querySelectorAll('a')].find(a => {
            const t = (a.textContent || '').trim();
            if (!/编辑|edit/i.test(t)) return false;
            // 优先带 el-icon-edit-outline 的
            return !!a.querySelector('.el-icon-edit-outline') || /^编辑$|^edit$/i.test(t);
        });
        if (!editLink) return false;

        if (editLink.dataset.hojEditIntercepted === '1') return true;
        editLink.dataset.hojEditIntercepted = '1';

        editLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openEditDiscussionDialog(ctx);
        }, true);

        console.log('[Discussion] 已接管「编辑」按钮', ctx);
        return true;
    }
    /** 打开「发布讨论」对话框 */
    async function openNewDiscussionDialog(opts = {}) {
        const gid = opts.gid;
        /* ---------- 1. 加载 Vditor ---------- */
        let Vditor;
        try {
            Vditor = await ensureVditor();
        } catch (e) {
            console.error('[Discussion] Vditor 加载失败:', e);
            NewAlert('@discussion.loadEditorFailed', 'error');
            return;
        }

        /* ---------- 2. 拉分类 ---------- */
        const categories = await fetchDiscussionCategories(gid);
        if (!categories.length) {
            NewAlert('@discussion.loadCategoriesFailed', 'error');
            return;
        }

        /* ---------- 3. 构建表单 ---------- */
        const wrap = document.createElement('div');
        wrap.className = 'hoj-disc-form';

        /* 标题（必填） */
        const titleField = document.createElement('div');
        titleField.className = 'hoj-disc-field';
        const titleLabel = document.createElement('label');
        titleLabel.innerHTML = `${escapeHtml(WebI18n.t('discussion.title'))} <span style="color:#F56C6C;">*</span>`;
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.className = 'hoj-disc-title';
        titleInput.placeholder = WebI18n.t('discussion.titlePlaceholder');
        titleInput.maxLength = 200;
        titleField.append(titleLabel, titleInput);

        /* 简介（必填） */
        const descField = document.createElement('div');
        descField.className = 'hoj-disc-field';
        const descLabel = document.createElement('label');
        descLabel.innerHTML = `${escapeHtml(WebI18n.t('discussion.description'))} <span style="color:#F56C6C;">*</span>`;
        const descInput = document.createElement('input');
        descInput.type = 'text';
        descInput.className = 'hoj-disc-desc';
        descInput.placeholder = WebI18n.t('discussion.descriptionPlaceholder');
        descInput.maxLength = 200;
        descField.append(descLabel, descInput);

        /* 分类 */
        const catField = document.createElement('div');
        catField.className = 'hoj-disc-field';
        const catLabel = document.createElement('label');
        catLabel.textContent = WebI18n.t('discussion.category');
        const catSel = document.createElement('select');
        catSel.className = 'hoj-disc-category';
        categories.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.name;
            catSel.appendChild(opt);
        });
        catField.append(catLabel, catSel);

        /* ---------- 绑定题目（可选） ---------- */
        const pidField = document.createElement('div');
        pidField.className = 'hoj-disc-field';
        const pidLabel = document.createElement('label');
        pidLabel.innerHTML = `${escapeHtml(WebI18n.t('discussion.bindProblem'))}<span class="hoj-field-optional">(optional)</span>`;
        const pidInput = document.createElement('input');
        pidInput.type = 'text';
        pidInput.className = 'hoj-disc-pid';
        pidInput.placeholder = WebI18n.t('discussion.bindProblemPlaceholder');
        pidInput.maxLength = 100;
        pidField.append(pidLabel, pidInput);

        //  若 URL 形如 /discussion/{pid}，自动填充
        const pidFromUrl = (() => {
            const m = window.location.pathname.match(/^\/discussion\/([^\/?#]+)/);
            return m ? decodeURIComponent(m[1]) : '';
        })();
        if (pidFromUrl) pidInput.value = pidFromUrl;

        /* 正文 */
        const contentField = document.createElement('div');
        contentField.className = 'hoj-disc-field hoj-disc-field--editor';
        const contentLabel = document.createElement('label');
        contentLabel.textContent = WebI18n.t('discussion.content');
        const editorHost = document.createElement('div');
        editorHost.className = 'hoj-disc-editor';
        contentField.append(contentLabel, editorHost);

        /* ---------- 高级选项（折叠） ---------- */
        const advSection = document.createElement('div');
        advSection.className = 'hoj-disc-advanced';
        advSection.innerHTML = `
        <button type="button" class="hoj-disc-advanced-toggle">
            <i class="el-icon-arrow-down"></i>
            <span class="hoj-disc-advanced-title"></span>
        </button>
        <div class="hoj-disc-advanced-body" style="display:none;">
            <div class="hoj-disc-advanced-hint"></div>
            <div class="hoj-disc-adv-grid">
                <div class="hoj-disc-field">
                    <label class="hoj-disc-adv-label-role"></label>
                    <select class="hoj-disc-adv-role">
                        <option value="user"></option>
                        <option value="admin"></option>
                        <option value="root"></option>
                    </select>
                </div>
                <div class="hoj-disc-field">
                    <label class="hoj-disc-adv-label-views"></label>
                    <input type="number" class="hoj-disc-adv-viewNum" min="0" value="0">
                </div>
                <div class="hoj-disc-field">
                    <label class="hoj-disc-adv-label-likes"></label>
                    <input type="number" class="hoj-disc-adv-likeNum" min="0" value="0">
                </div>
                <div class="hoj-disc-field">
                    <label class="hoj-disc-adv-label-comments"></label>
                    <input type="number" class="hoj-disc-adv-commentNum" min="0" value="0">
                </div>
                <div class="hoj-disc-field hoj-disc-adv-field--check">
                    <label class="hoj-disc-adv-check-wrap">
                        <input type="checkbox" class="hoj-disc-adv-topPriority">
                        <span class="hoj-disc-adv-label-top"></span>
                    </label>
                </div>
            </div>
        </div>
    `;
        advSection.querySelector('.hoj-disc-advanced-title').textContent = WebI18n.t('discussion.advanced');
        advSection.querySelector('.hoj-disc-advanced-hint').textContent  = WebI18n.t('discussion.advancedHint');
        advSection.querySelector('.hoj-disc-adv-label-role').textContent = WebI18n.t('discussion.role');
        advSection.querySelector('.hoj-disc-adv-label-views').textContent= WebI18n.t('discussion.viewNum');
        advSection.querySelector('.hoj-disc-adv-label-likes').textContent= WebI18n.t('discussion.likeNum');
        advSection.querySelector('.hoj-disc-adv-label-comments').textContent = WebI18n.t('discussion.commentNum');
        advSection.querySelector('.hoj-disc-adv-label-top').textContent  = WebI18n.t('discussion.topPriority');
        advSection.querySelector('.hoj-disc-adv-role option[value="user"]').textContent  = WebI18n.t('discussion.roleUser');
        advSection.querySelector('.hoj-disc-adv-role option[value="admin"]').textContent = WebI18n.t('discussion.roleAdmin');
        advSection.querySelector('.hoj-disc-adv-role option[value="root"]').textContent  = WebI18n.t('discussion.roleRoot');

        const advToggle = advSection.querySelector('.hoj-disc-advanced-toggle');
        const advBody   = advSection.querySelector('.hoj-disc-advanced-body');
        advToggle.addEventListener('click', () => {
            const open = advBody.style.display !== 'none';
            advBody.style.display = open ? 'none' : 'block';
            advToggle.classList.toggle('is-open', !open);
        });

        /* footer */
        const footer = document.createElement('div');
        footer.className = 'hoj-disc-footer';
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'hoj-snippet-btn';
        cancelBtn.textContent = WebI18n.t('dialog.cancel');
        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
        submitBtn.textContent = WebI18n.t('discussion.publish');
        footer.append(cancelBtn, submitBtn);

        /* 组装：标题 → 简介 → 分类 → 绑定题目 → 正文 → 高级 → footer */
        wrap.append(titleField, descField, catField, pidField, contentField, advSection, footer);

        /* ---------- 4. 打开对话框 ---------- */
        let editor = null;
        let destroyed = false;

        const closeDialog = openCustomDialog({
            title: WebI18n.t('discussion.new'),
            bodyEl: wrap,
            width: '760px',
            maxHeight: '85vh',
            fullscreen: true,
            onClose: () => {
                destroyed = true;
                if (editor) {
                    try { editor.destroy(); } catch (_) {}
                    editor = null;
                }
            }
        });

        cancelBtn.addEventListener('click', () => closeDialog());

        /* ---------- 5. 初始化 Vditor ---------- */
        const getEditor = () => editor;
        requestAnimationFrame(() => {
            if (destroyed) return;
            try {
                editor = new Vditor(editorHost, {
                    cdn: VDITOR_CDN,
                    height: 380,
                    width: '100%',
                    theme: getVditorTheme().editorTheme,
                    icon: 'ant',
                    mode: 'ir',
                    value: '',
                    placeholder: WebI18n.t('discussion.contentPlaceholder'),
                    tab: '  ',
                    counter: { enable: true, type: 'markdown' },
                    cache: { enable: false },
                    preview: {
                        theme: { current: 'light', path: `${VDITOR_CDN}/dist/css/content-theme` },
                        hljs: { style: 'github', lineNumber: true },
                        math: { engine: 'KaTeX', inlineDigit: true },
                        markdown: { toc: true }
                    },
                    toolbar: buildVditorToolbar(getEditor)
                });
            } catch (e) {
                console.error('[Discussion] Vditor 初始化失败:', e);
                NewAlert('@discussion.initEditorFailed', 'error');
            }
        });

        /* ---------- 6. 提交 ---------- */
        submitBtn.addEventListener('click', async () => {
            if (!editor) return NewAlert('@discussion.editorNotReady', 'warning');

            const categoryId  = Number(catSel.value);
            const title       = titleInput.value.trim();
            const description = descInput.value.trim();
            const content     = editor.getValue().trim();
            const pidText     = pidInput.value.trim();   //  绑定题目（可选）

            if (!categoryId)   return NewAlert('@discussion.categoryRequired', 'warning');
            if (!title)        return NewAlert('@discussion.titleRequired', 'warning');
            if (!description)  return NewAlert('@discussion.descriptionRequired', 'warning');
            if (!content)      return NewAlert('@discussion.contentRequired', 'warning');

            const role        = advSection.querySelector('.hoj-disc-adv-role').value || 'user';
            const viewNum     = Math.max(0, Number(advSection.querySelector('.hoj-disc-adv-viewNum').value) || 0);
            const likeNum     = Math.max(0, Number(advSection.querySelector('.hoj-disc-adv-likeNum').value) || 0);
            const commentNum  = Math.max(0, Number(advSection.querySelector('.hoj-disc-adv-commentNum').value) || 0);
            const topPriority = advSection.querySelector('.hoj-disc-adv-topPriority').checked;

            submitBtn.disabled = true;
            const oldText = submitBtn.textContent;
            submitBtn.textContent = WebI18n.t('discussion.publishing');

            /* ---------- 构造请求 ---------- */
            const payload = {
                categoryId,
                title,
                description,
                content,
                role,
                viewNum,
                likeNum,
                commentNum,
                topPriority
            };
            //  pid：仅当有值时携带；类型为字符串
            if (pidText) payload.pid = String(pidText);
            // 团队场景附加 gid（数字优先）
            if (gid !== undefined && gid !== null && String(gid).trim() !== '') {
                const n = Number(gid);
                payload.gid = Number.isNaN(n) ? gid : n;
            }

            const url = (payload.gid !== undefined)
            ? '/api/group/discussion'
            : '/api/discussion';

            try {
                // 使用通用 API 函数：内部会处理 HTTP / biz status
                await hojApi(url, { method: 'POST', body: payload });

                NewAlert('@discussion.publishSuccess', 'success', 2000);f
                closeDialog();
                setTimeout(() => location.reload(), 800);
            } catch (e) {
                // hojApi 已经 Alert 过；只需恢复按钮
                submitBtn.disabled = false;
                submitBtn.textContent = oldText;
            }
        });
    }
    /* ============================================================
 * 讨论列表：把 API 返回的记录与页面卡片匹配，为自己的帖子注入编辑/删除按钮
 * 支持：
 *   /discussion
 *   /group/{gid}/discussion
 * ============================================================ */
    async function injectDiscussionListEditButtons() {
        if (!config.VditorDiscussionEdit) return false;

        const path = window.location.pathname;
        let gid = null;
        if (/^\/discussion\/?$/.test(path)) {
            gid = null;
        } else {
            const m = path.match(/^\/group\/([^\/]+)\/discussion\/?$/);
            if (!m) return false;
            gid = m[1];
        }

        /* ---------- 卡片已全处理过 → 跳过 ---------- */
        const allCards = [...document.querySelectorAll('.title-article > .el-card.list-card')];
        if (!allCards.length) return false;
        const allDone = allCards.every(c =>
                                       c.querySelector('.hoj-list-edit-btn') &&
                                       c.querySelector('.hoj-list-del-btn') &&
                                       [...c.querySelectorAll('.title-msg .el-dropdown')]
                                       .filter(dd => dd.querySelector('.el-icon-more'))
                                       .every(dd => dd.classList.contains('hoj-dropdown-replaced'))
                                      );
        if (allDone) return true;

        /* ---------- 1. 期望参数 ---------- */
        const sp = new URLSearchParams(window.location.search);
        const wantParams = {
            keyword:     sp.get('keyword')     ?? '',
            cid:         sp.get('cid')         ?? '',
            currentPage: sp.get('currentPage') ?? '1',
            limit:       sp.get('limit')       ?? '10',
            pid:         sp.get('pid')         ?? '',
            onlyMine:    sp.get('onlyMine')    ?? 'false'
        };
        if (gid !== null) wantParams.gid = gid;

        /* ---------- 2. 优先读页面自身请求的缓存 ---------- */
        let listData = null;

        if (_discListCache && _discListParamsMatch(_discListCache.params, wantParams)) {
            listData = _discListCache.data?.data;
            // console.log('[DiscussionList] 命中缓存，跳过请求');
        } else if (!_discListFetching) {
            /* ---------- 3. 兜底：主动请求一次（带并发锁） ---------- */
            _discListFetching = true;
            try {
                const qs = new URLSearchParams(wantParams).toString();
                const urlPath = gid !== null
                ? `/api/group/get-discussion-list?${qs}`
                : `/api/get-discussion-list?${qs}`;
                const data = await hojApi(urlPath, { silent: true });
                // 记录成与页面响应一致的结构
                _recordDiscussionList(
                    `${window.location.origin}${urlPath}`,
                    { status: 200, data, msg: 'success' },
                    'self'
                );
                listData = data;
            } catch (e) {
                console.warn('[DiscussionList] 主动请求失败:', e);
            } finally {
                _discListFetching = false;
            }
        } else {
            // 已有请求在飞 → 等下一轮 MutationObserver
            return false;
        }

        const records = Array.isArray(listData?.records) ? listData.records : [];
        if (!records.length) return false;

        /* ---------- 4. 按 API 顺序一一匹配 ---------- */

        const cardInfo = (card) => {
            const titleEl  = card.querySelector('.article-hlink > a');
            const descEl   = card.querySelector('.article-hlink2 > p');
            const authorEl = card.querySelector('.title-msg .pl');
            return {
                title:       titleEl  ? titleEl.textContent.trim()  : '',
                description: descEl   ? descEl.textContent.trim()   : '',
                author:      authorEl ? authorEl.textContent.trim() : ''
            };
        };
        const usedCards = new Set();
        const matches = [];

        for (const record of records) {
            for (const card of allCards) {
                if (usedCards.has(card)) continue;
                const info = cardInfo(card);
                if (info.title       === (record.title || '')
                    && info.description === (record.description || '')
                    && info.author      === (record.author || '')) {
                    usedCards.add(card);
                    matches.push({ record, card });
                    break;
                }
            }
        }
        if (!matches.length) return false;

        /* ---------- 5. 给"自己的帖子"注入编辑 / 删除 ---------- */
        let injected = 0;

        for (const { record, card } of matches) {
            // content 为 null 视为"不是自己的/不可编辑"
            if (record.content === null || record.content === undefined) continue;

            const titleMsg = card.querySelector('.title-msg');
            if (!titleMsg) continue;

            /* ---------- 5.1 编辑按钮 ---------- */
            if (!card.querySelector('.hoj-list-edit-btn')) {
                const editBtn = document.createElement('a');
                editBtn.className = 'hoj-list-edit-btn';
                editBtn.href = 'javascript:void(0)';
                editBtn.innerHTML = '<i class="el-icon-edit-outline"></i><span></span>';
                editBtn.querySelector('span').textContent = WebI18n.t('discussion.edit');
                editBtn.title = WebI18n.t('discussion.edit');
                editBtn.dataset.did = String(record.id);

                editBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // 传 gid 供编辑对话框决定端点和 body 字段
                    openEditDiscussionDialog({ did: record.id, gid });
                });

                titleMsg.appendChild(editBtn);
            }

            /* ---------- 5.2 删除按钮：隐藏三点下拉，在旁边插入独立删除按钮 ---------- */

            /* 1) 无论如何，先把该卡片上所有"更多"下拉隐藏掉（幂等） */
            card.querySelectorAll('.title-msg .el-dropdown').forEach(dd => {
                if (dd.querySelector('.el-icon-more')) {
                    // 用 class 隐藏（配合 CSS !important），Vue 恢复 inline style 也无效
                    dd.classList.add('hoj-dropdown-replaced');
                }
            });

            /* 2) 若还没插入删除按钮，则插入 */
            const existingDel = card.querySelector(`.hoj-list-del-btn[data-did="${record.id}"]`);
            if (!existingDel) {
                const delBtn = document.createElement('a');
                delBtn.className = 'hoj-list-del-btn';
                delBtn.href = 'javascript:void(0)';
                delBtn.dataset.did = String(record.id);
                delBtn.innerHTML = '<i class="el-icon-delete"></i><span></span>';
                delBtn.querySelector('span').textContent = WebI18n.t('discussion.delete');
                delBtn.title = WebI18n.t('discussion.delete');

                delBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const ok = await NewDialog({
                        title: '@discussion.deleteConfirmTitle',
                        content: '@discussion.deleteConfirmBody',
                        type: 'warning'
                    });
                    if (!ok) return;

                    const qs = new URLSearchParams({ did: String(record.id) });
                    if (gid !== null) qs.set('gid', gid);
                    const url = gid
                    ? `/api/group/discussion?${qs.toString()}`
                    : `/api/discussion?${qs.toString()}`;

                    try {
                        await hojApi(url, { method: 'DELETE' });
                        NewAlert('@discussion.deleteSuccess', 'success', 1800);

                        const cardEl = delBtn.closest('.title-article');
                        if (cardEl) {
                            cardEl.style.transition = 'opacity .25s';
                            cardEl.style.opacity = '0';
                            setTimeout(() => cardEl.remove(), 260);
                        }
                    } catch (err) {
                        console.warn('[Discussion List] 删除失败:', err);
                    }
                });

                // 优先插在"更多"下拉之前（DOM 里就在同一层，样式一致）
                const anchor =
                      card.querySelector('.title-msg .el-dropdown.hidden-xs-only') ||
                      card.querySelector('.title-msg .el-dropdown') ||
                      card.querySelector('.title-msg');
                if (anchor && anchor.parentNode) {
                    anchor.insertAdjacentElement('beforebegin', delBtn);
                }
            }

            injected++;
        }

        console.log(
            `[Discussion List] ${gid ? `group=${gid} ` : ''}` +
            `匹配 ${matches.length} 张卡片，注入 ${injected} 处按钮`
        );
        return injected > 0;
    }
    function clearDiscussionListButtons() {
        document.querySelectorAll('.hoj-list-edit-btn, .hoj-list-del-btn').forEach(el => el.remove());
        // 同时清掉占位标记，让下一次 tryInject 能重新评估
        document.querySelectorAll('[data-hoj-disc-intercepted]').forEach(b => {
            delete b.dataset.hojDiscIntercepted;
        });
    }
    /**
 * 拦截「发布讨论 / 创建」按钮
 * 支持路径：
 *   /discussion                        → 无 gid
 *   /discussion-detail/xxx             （详情页里的转发/引用按钮一般不是这个）
 *   /group/{gid}/discussion            → 带 gid
 */
    function injectDiscussionInterceptor() {
        if (!config.VditorDiscussionPublish) return false;
        const path = window.location.pathname;

        // 1) 普通讨论列表
        const isTopLevel = /^\/discussion(\/|$)/.test(path);
        // 2) 团队讨论列表
        const groupMatch = path.match(/^\/group\/([^\/]+)\/discussion(\/|$)/);
        const isGroup = !!groupMatch;

        if (!isTopLevel && !isGroup) return false;

        const gid = isGroup ? groupMatch[1] : undefined;

        // 找按钮（两种形态）
        //   普通：<button class="el-button--primary">... 发布一个讨论~</button>
        //   团队：<button class="el-button--primary el-button--small"><i class="el-icon-plus"></i> 创建</button>
        const btn = [...document.querySelectorAll('button.el-button--primary')].find(b => {
            const t = (b.textContent || '').trim();
            return /发布一个讨论|发布讨论|创建|new discussion|create discussion|create/i.test(t);
        });
        if (!btn) return false;

        // 用 gid 区分不同来源（避免同一按钮被重复绑定而拿错 gid）
        const marker = gid ? `group:${gid}` : 'top';
        if (btn.dataset.hojDiscIntercepted === marker) return true;
        btn.dataset.hojDiscIntercepted = marker;

        // capture 阶段拦截，阻止站点自身弹窗
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openNewDiscussionDialog({ gid });
        }, true);

        console.log(`[Discussion] 已接管「发布 / 创建」按钮 (${gid ? 'group ' + gid : 'top level'})`);
        return true;
    }
    /* ============================================================
 * 创建团队
 * ============================================================ */
    async function openCreateGroupDialog() {
        /* ---- 加载 Vditor ---- */
        let VditorCtor;
        try { VditorCtor = await ensureVditor(); }
        catch (e) {
            console.error('[Group] Vditor 加载失败:', e);
            NewAlert('@discussion.loadEditorFailed', 'error');
            return;
        }

        const _t = WebI18n.t.bind(WebI18n);

        /* ---- 表单结构 ---- */
        const wrap = document.createElement('div');
        wrap.className = 'hoj-disc-form';

        /* ---------- 1. 名称（必填，≤25） ---------- */
        const nameField = document.createElement('div');
        nameField.className = 'hoj-disc-field';
        nameField.innerHTML = `<label>${escapeHtml(_t('group.name'))} <span style="color:#F56C6C;">*</span></label>`;
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'hoj-disc-title';
        nameInput.placeholder = _t('group.namePlaceholder');
        nameInput.maxLength = 25;
        nameField.appendChild(nameInput);

        /* ---------- 2. 简称（可选，≤10） ---------- */
        const shortField = document.createElement('div');
        shortField.className = 'hoj-disc-field';
        shortField.innerHTML = `<label>${escapeHtml(_t('group.shortName'))}<span class="hoj-field-optional">(optional)</span></label>`;
        const shortInput = document.createElement('input');
        shortInput.type = 'text';
        shortInput.className = 'hoj-disc-title';
        shortInput.placeholder = _t('group.shortNamePlaceholder');
        shortInput.maxLength = 10;
        shortField.appendChild(shortInput);

        /* ---------- 3. 简介（可选，≤50） ---------- */
        const briefField = document.createElement('div');
        briefField.className = 'hoj-disc-field';
        briefField.innerHTML = `<label>${escapeHtml(_t('group.brief'))}<span class="hoj-field-optional">(optional)</span></label>`;
        const briefInput = document.createElement('input');
        briefInput.type = 'text';
        briefInput.className = 'hoj-disc-desc';
        briefInput.placeholder = _t('group.briefPlaceholder');
        briefInput.maxLength = 50;
        briefField.appendChild(briefInput);

        /* ---------- 4. 加入权限（带颜色） ---------- */
        const authField = document.createElement('div');
        authField.className = 'hoj-disc-field';
        authField.innerHTML = `
        <label>${escapeHtml(_t('group.auth'))}</label>
        <div class="hoj-group-auth-group">
            <label class="hoj-group-auth-option" data-auth="1">
                <input type="radio" name="hoj-group-auth" value="1" checked>
                <span class="hoj-group-auth-text">
                    <span class="hoj-group-auth-title"></span>
                    <span class="hoj-group-auth-desc"></span>
                </span>
            </label>
            <label class="hoj-group-auth-option" data-auth="2">
                <input type="radio" name="hoj-group-auth" value="2">
                <span class="hoj-group-auth-text">
                    <span class="hoj-group-auth-title"></span>
                    <span class="hoj-group-auth-desc"></span>
                </span>
            </label>
            <label class="hoj-group-auth-option" data-auth="3">
                <input type="radio" name="hoj-group-auth" value="3">
                <span class="hoj-group-auth-text">
                    <span class="hoj-group-auth-title"></span>
                    <span class="hoj-group-auth-desc"></span>
                </span>
            </label>
        </div>
    `;
        const authOptions = authField.querySelectorAll('.hoj-group-auth-option');
        const setText = (el, txt) => { el.textContent = txt; };
        setText(authOptions[0].querySelector('.hoj-group-auth-title'), _t('group.auth.public'));
        setText(authOptions[0].querySelector('.hoj-group-auth-desc'),  _t('group.auth.publicTip'));
        setText(authOptions[1].querySelector('.hoj-group-auth-title'), _t('group.auth.protected'));
        setText(authOptions[1].querySelector('.hoj-group-auth-desc'),  _t('group.auth.protectedTip'));
        setText(authOptions[2].querySelector('.hoj-group-auth-title'), _t('group.auth.private'));
        setText(authOptions[2].querySelector('.hoj-group-auth-desc'),  _t('group.auth.privateTip'));

        /* ---------- 5. 邀请码（仅私有显示） ---------- */
        const codeField = document.createElement('div');
        codeField.className = 'hoj-disc-field';
        codeField.style.display = 'none';
        codeField.innerHTML = `<label>${escapeHtml(_t('group.code'))}<span class="hoj-field-optional">(optional)</span></label>`;
        const codeInput = document.createElement('input');
        codeInput.type = 'text';
        codeInput.className = 'hoj-disc-title';
        codeInput.placeholder = _t('group.codePlaceholder');
        codeInput.maxLength = 64;
        codeField.appendChild(codeInput);

        // auth 变化 → 切换 code 显隐
        authField.addEventListener('change', (e) => {
            if (e.target.name !== 'hoj-group-auth') return;
            codeField.style.display = e.target.value === '3' ? '' : 'none';
        });

        /* ---------- 6. 可见性（左公开 · 右隐藏） ---------- */
        const visibleField = document.createElement('div');
        visibleField.className = 'hoj-disc-field';
        visibleField.innerHTML = `
        <label>${escapeHtml(_t('group.visible'))}</label>
        <div class="hoj-group-visible-row">
            <span class="hoj-group-visible-label is-active" data-side="public"></span>
            <div class="hoj-group-visible-switch" role="switch" aria-checked="true" tabindex="0"></div>
            <span class="hoj-group-visible-label" data-side="hidden"></span>
        </div>
        <div class="hoj-group-visible-hint"></div>
    `;
        const labelPublic = visibleField.querySelector('[data-side="public"]');
        const labelHidden = visibleField.querySelector('[data-side="hidden"]');
        const switchEl    = visibleField.querySelector('.hoj-group-visible-switch');
        const visibleHint = visibleField.querySelector('.hoj-group-visible-hint');
        labelPublic.textContent = _t('group.visiblePublic');
        labelHidden.textContent = _t('group.visibleHidden');
        visibleHint.textContent = _t('group.visibleHint');

        // 状态：true = 公开可见
        let visible = true;

        const renderVisible = () => {
            labelPublic.classList.toggle('is-active', visible);
            labelHidden.classList.toggle('is-active', !visible);
            switchEl.classList.toggle('is-hidden', !visible);
            switchEl.setAttribute('aria-checked', String(visible));
            visibleHint.textContent = visible
                ? _t('group.visibleHintPublic')
            : _t('group.visibleHintHidden');
        };

        const toggleVisible = () => { visible = !visible; renderVisible(); };

        switchEl.addEventListener('click', toggleVisible);
        labelPublic.addEventListener('click', () => { if (!visible) toggleVisible(); });
        labelHidden.addEventListener('click', () => { if (visible)  toggleVisible(); });
        switchEl.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleVisible(); }
        });

        renderVisible();   // 初始：公开

        /* ---------- 7. 团队介绍（Vditor，置底） ---------- */
        const descField = document.createElement('div');
        descField.className = 'hoj-disc-field hoj-disc-field--editor hoj-disc-field--editor-bottom';
        descField.innerHTML = `<label>${escapeHtml(_t('group.description'))} <span style="color:#F56C6C;">*</span></label>`;
        const editorHost = document.createElement('div');
        editorHost.className = 'hoj-disc-editor';
        descField.appendChild(editorHost);

        /* ---------- 底部 ---------- */
        const footer = document.createElement('div');
        footer.className = 'hoj-disc-footer';
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'hoj-snippet-btn';
        cancelBtn.textContent = _t('dialog.cancel');
        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
        submitBtn.textContent = _t('group.create');
        footer.append(cancelBtn, submitBtn);

        /* ---------- 按新顺序组装 ---------- */
        //  名称 → 简称 → 简介 → 权限 → 邀请码 → 可见性 → 团队介绍(Vditor) → footer
        wrap.append(nameField, shortField, briefField, authField, codeField, visibleField, descField, footer);

        /* ---------- 打开 Dialog ---------- */
        let editor = null;
        let destroyed = false;

        const closeDialog = openCustomDialog({
            title: _t('group.createTitle'),
            bodyEl: wrap,
            width: '760px',
            maxHeight: '85vh',
            fullscreen: true,
            onClose: () => {
                destroyed = true;
                if (editor) {
                    try { editor.destroy(); } catch (_) {}
                    editor = null;
                }
            }
        });

        cancelBtn.addEventListener('click', () => closeDialog());

        /* ---------- 初始化 Vditor ---------- */
        const getEditor = () => editor;
        requestAnimationFrame(() => {
            if (destroyed) return;
            try {
                editor = new VditorCtor(editorHost, {
                    cdn: VDITOR_CDN,
                    height: '100%',
                    width: '100%',
                    theme: getVditorTheme().editorTheme,
                    icon: 'ant',
                    mode: 'ir',
                    value: '',
                    placeholder: _t('group.descriptionPlaceholder'),
                    tab: '  ',
                    counter: { enable: true, type: 'markdown' },
                    cache: { enable: false },
                    preview: {
                        theme: { current: 'light', path: `${VDITOR_CDN}/dist/css/content-theme` },
                        hljs: { style: 'github', lineNumber: true },
                        math: { engine: 'KaTeX', inlineDigit: true },
                        markdown: { toc: true }
                    },
                    toolbar: buildVditorToolbar(getEditor)
                });
            } catch (e) {
                console.error('[Group] Vditor 初始化失败:', e);
                NewAlert('@discussion.initEditorFailed', 'error');
            }
        });

        /* ---------- 提交 ---------- */
        submitBtn.addEventListener('click', async () => {
            if (!editor) return NewAlert('@discussion.editorNotReady', 'warning');

            const name        = nameInput.value.trim();
            const shortName   = shortInput.value.trim();
            const brief       = briefInput.value.trim();
            const description = editor.getValue().trim();
            const authEl      = authField.querySelector('input[name="hoj-group-auth"]:checked');
            const auth        = authEl ? Number(authEl.value) : 1;
            const code        = auth === 3 ? codeInput.value.trim() : '';
            const visibleVal  = visible;   // 当前 toggle 状态

            /* 校验 */
            if (!name)                 return NewAlert('@group.nameRequired', 'warning');
            if (name.length > 25)      return NewAlert('@group.nameTooLong', 'warning');
            if (shortName.length > 10) return NewAlert('@group.shortNameTooLong', 'warning');
            if (brief.length > 50)     return NewAlert('@group.briefTooLong', 'warning');
            if (!description)          return NewAlert('@group.descriptionRequired', 'warning');

            submitBtn.disabled = true;
            const oldText = submitBtn.textContent;
            submitBtn.textContent = _t('group.creating');

            try {
                await hojApi('/api/group', {
                    method: 'POST',
                    body: { name, shortName, brief, description, auth, code, visible: visibleVal }
                });

                NewAlert('@group.createSuccess', 'success', 2000);
                closeDialog();
                setTimeout(() => location.reload(), 800);
            } catch (e) {
                submitBtn.disabled = false;
                submitBtn.textContent = oldText;
            }
        });
    }
    /* ============================================================
 * /group 页面：接管「创建团队」按钮
 * ============================================================ */
    function injectCreateGroupInterceptor() {
        if (!config.VditorGroupCreate) return false;
        // 只在顶层 /group 生效（团队详情页 /group/{gid} 不拦）
        if (!/^\/group\/?$/.test(window.location.pathname)) return false;

        // 找按钮：文本匹配
        const btns = document.querySelectorAll('button.el-button--primary');
        let target = null;
        for (const b of btns) {
            const t = (b.textContent || '').trim();
            if (/创建团队|create\s+group|new\s+group/i.test(t)) { target = b; break; }
        }
        if (!target) return false;

        if (target.dataset.hojCreateGroupIntercepted === '1') return true;
        target.dataset.hojCreateGroupIntercepted = '1';

        target.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openCreateGroupDialog();
        }, true);

        console.log('[Group] 已接管「创建团队」按钮');
        return true;
    }
    /* ============================================================
 * 全部自测
 * ============================================================ */
    /* 20 种规范语言名 —— 所有原始语言都归一到这里之一 */
    const LANG_CANONICAL = [
        'C++', 'C++ With O2', 'C++ 17', 'C++ 17 With O2',
        'C++ 20', 'C++ 20 With O2', 'C', 'C With O2',
        'Python3', 'Python2', 'Java', 'Golang', 'C#', 'PHP',
        'PyPy2', 'PyPy3', 'JavaScript Node', 'JavaScript V8',
        'Ruby', 'Rust'
    ];

    /* 归一化规则：从上往下依次匹配，先命中先返回 */
    const LANG_NORMALIZE_RULES = [
        { canonical: 'C++ 20 With O2', match: /c\+\+\s*20\s*with\s*o2/i },
        { canonical: 'C++ 17 With O2', match: /c\+\+\s*17\s*with\s*o2/i },
        { canonical: 'C++ With O2',    match: /^c\+\+\s*with\s*o2/i },
        { canonical: 'C++ 20',         match: /c\+\+\s*20/i },
        { canonical: 'C++ 17',         match: /c\+\+\s*17/i },
        { canonical: 'C++',            match: /^c\+\+\s*$/i },
        { canonical: 'C With O2',      match: /^c\s+with\s*o2/i },
        { canonical: 'C',              match: /^c\s*$/i },
        { canonical: 'PyPy3',          match: /^pypy\s*3/i },
        { canonical: 'PyPy2',          match: /^pypy\s*2/i },
        { canonical: 'Python3',        match: /^python\s*3|^py3/i },
        { canonical: 'Python2',        match: /^python\s*2|^py2/i },
        { canonical: 'Golang',         match: /^go(lang)?\s*$/i },
        { canonical: 'Java',           match: /^java\s*$/i },
        { canonical: 'C#',             match: /^c#|csharp/i },
        { canonical: 'PHP',            match: /^php/i },
        { canonical: 'JavaScript Node',match: /javascript.*node|node.*js/i },
        { canonical: 'JavaScript V8',  match: /javascript|v8/i },
        { canonical: 'Ruby',           match: /^ruby/i },
        { canonical: 'Rust',           match: /^rust/i }
    ];

    /** 将任意语言名归一化到 20 种规范之一；无法识别回退 C++ */
    function normalizeLanguage(lang) {
        if (!lang) return 'C++';
        const s = String(lang).trim();
        if (!s) return 'C++';
        // 已经是规范名则直接返回（避免重复匹配）
        if (LANG_CANONICAL.includes(s)) return s;
        for (const { canonical, match } of LANG_NORMALIZE_RULES) {
            if (match.test(s)) return canonical;
        }
        return 'C++';
    }

    /* 规范语言名 → CodeMirror MIME */
    const LANG_TO_MODE = {
        'C++':              'text/x-c++src',
        'C++ With O2':      'text/x-c++src',
        'C++ 17':           'text/x-c++src',
        'C++ 17 With O2':   'text/x-c++src',
        'C++ 20':           'text/x-c++src',
        'C++ 20 With O2':   'text/x-c++src',
        'C':                'text/x-csrc',
        'C With O2':        'text/x-csrc',
        'Python3':          'text/x-python',
        'Python2':          'text/x-python',
        'PyPy3':            'text/x-python',
        'PyPy2':            'text/x-python',
        'Java':             'text/x-java',
        'Golang':           'text/x-go',
        'C#':               'text/x-csharp',
        'PHP':              'text/x-php',
        'JavaScript Node':  'text/javascript',
        'JavaScript V8':    'text/javascript',
        'Ruby':             'text/x-ruby',
        'Rust':             'text/x-rustsrc'
    };

    function getTestJudgeMode(lang) {
        const canonical = normalizeLanguage(lang);
        if (LANG_TO_MODE[canonical]) return LANG_TO_MODE[canonical];

        // CF 语言兜底
        const s = String(lang || '').toLowerCase();
        if (/^gnu\s*g\+\+|^clang\+\+|visual\s*c\+\+/.test(s)) return 'text/x-c++src';
        if (/^c#/.test(s))                                     return 'text/x-csharp';
        if (/^d\s|^dmd/.test(s))                               return 'text/x-d';
        if (/^go\s/.test(s))                                   return 'text/x-go';
        if (/^haskell/.test(s))                                return 'text/x-haskell';
        if (/^java\s/.test(s))                                 return 'text/x-java';
        if (/^kotlin/.test(s))                                 return 'text/x-kotlin';
        if (/^ocaml/.test(s))                                  return 'text/x-ocaml';
        if (/^delphi|^free\s*pascal|^pascal/.test(s))          return 'text/x-pascal';
        if (/^perl/.test(s))                                   return 'text/x-perl';
        if (/^php/.test(s))                                    return 'text/x-php';
        if (/^python\s*2/.test(s))                             return 'text/x-python';
        if (/^python\s*3/.test(s))                             return 'text/x-python';
        if (/^pypy\s*2/.test(s))                               return 'text/x-python';
        if (/^pypy\s*3/.test(s))                               return 'text/x-python';
        if (/^ruby/.test(s))                                   return 'text/x-ruby';
        if (/^rust/.test(s))                                   return 'text/x-rustsrc';
        if (/^scala/.test(s))                                  return 'text/x-scala';
        if (/^javascript/.test(s))                             return 'text/javascript';
        if (/^node/.test(s))                                   return 'text/javascript';

        return 'text/x-c++src';
    }

    /** 当前题是否用 CF 语言（基于触发器上打的标记） */
    function _hojCurrentIsCFLang() {
        const t = document.getElementById('hoj-lang-trigger');
        return t && t.dataset.mode === 'cf';
    }

    /** 取当前题的"用户选中语言" */
    function _hojCurrentSelectedLang() {
        if (_hojCurrentIsCFLang()) {
            return _hojSelectedCFLang || readStoredCFLanguage() || CF_DEFAULT_LANG;
        }
        return _hojSelectedLang || readStoredLanguage() || HOJ_DEFAULT_LANG;
    }


    function _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    function _extractTestJudgeKey(resp) {
        if (!resp) return null;
        const d = resp.data;
        if (typeof d === 'string') return d;
        if (d && typeof d === 'object') {
            return d.testJudgeKey || d.key || d.testJudgeId || null;
        }
        return resp.testJudgeKey || resp.key || null;
    }

    async function _submitOneTest(payload) {
        const token = localStorage.getItem('token') || '';
        const resp = await fetch(`${window.location.origin}/api/submit-problem-test-judge`, {
            method: 'POST',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload)
        });
        return resp.json();
    }

    async function _pollTestResult(key, signal) {
        const token = localStorage.getItem('token') || '';
        const maxAttempts = 150;   // 约 2 分钟（含 800ms 间隔）
        for (let i = 0; i < maxAttempts; i++) {
            if (signal && signal.aborted) throw new Error('ABORTED');
            await _sleep(800);
            const r = await fetch(
                `${window.location.origin}/api/get-test-judge-result?testJudgeKey=${encodeURIComponent(key)}`,
                { headers: { 'Authorization': token }, credentials: 'include' }
            );
            const data = await r.json();
            if (!data || data.status !== 200) continue;
            const st = data.data && data.data.status;
            // 5=待定 6=编译中 7=评测中 —— 继续等
            if (st === 5 || st === 6 || st === 7) continue;
            if (st === undefined) continue;
            return data.data;
        }
        throw new Error('POLL_TIMEOUT');
    }

    /** 获取当前题目的所有示例 */
    async function _getSamplesForCurrentProblem() {
        if (currentProblemData
            && Array.isArray(currentProblemData.tests)
            && currentProblemData.tests.length) {
            return currentProblemData.tests;
        }
        const d = await fetchProblemDetail();
        const p = d?.data?.problem || d?.data?.problems?.[0];
        if (!p) return [];
        return parseExamples(p.examples || '').map((t, i) => ({ input: t.input, output: t.output, id: i }));
    }
    const TEST_JUDGE_COOLDOWN = 3000;   // 每 3 秒最多 1 次提交
    let _lastTestJudgeSubmitAt = 0;

    /** 冷却感知的提交：自动等待 + 403 限流重试 */
    async function _rateLimitedSubmit(payload, controller) {
        let attempt = 0;
        while (attempt < 20) {
            attempt++;
            if (controller.signal.aborted) throw new Error('ABORTED');

            // —— 冷却 ——
            const since = Date.now() - _lastTestJudgeSubmitAt;
            if (since < TEST_JUDGE_COOLDOWN) {
                await _sleep(TEST_JUDGE_COOLDOWN - since);
            }
            if (controller.signal.aborted) throw new Error('ABORTED');
            _lastTestJudgeSubmitAt = Date.now();

            // —— 提交 ——
            let resp;
            try {
                resp = await _submitOneTest(payload);
            } catch (e) {
                await _sleep(1000);
                continue;
            }

            // —— 限流检测 ——
            const msg = resp?.msg || '';
            const limited =
                  resp?.status === 403 ||
                  /过于频繁|太频繁|too\s*frequent|rate\s*limit/i.test(msg);
            if (limited) {
                // 等下一个 3 秒周期再试
                await _sleep(TEST_JUDGE_COOLDOWN);
                continue;
            }

            return resp;
        }
        throw new Error('RATE_LIMITED');
    }
    /** 展开第一个 fail/error 行并滚动到可见 */
    function expandFirstFailure(rows) {
        let firstBadRow = null;
        for (const r of rows) {
            const st = r.querySelector('.hoj-tj-status');
            if (st && (st.classList.contains('fail') || st.classList.contains('error'))) {
                firstBadRow = r;
                break;
            }
        }
        if (!firstBadRow) return;

        const body = firstBadRow.querySelector('.hoj-tj-row-body');
        if (body) body.style.display = '';

        try {
            firstBadRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (_) {
            firstBadRow.scrollIntoView();
        }
    }
    /**
 * 结束一整轮测试
 * @param {object}   opts
 * @param {HTMLElement[]} opts.rows      所有行
 * @param {number}   opts.currentIdx     当前处理到第几行（未处理的从此开始）
 * @param {string}   opts.reason         'user-stop' | 'compile-error'
 * @param {Function} opts.setStatus      setStatus(row, text, cls)
 * @param {number}   opts.total          总用例数
 * @param {number}   opts.pass           已通过数
 */
    function finalizeTestRun(opts) {
        const { rows, currentIdx, reason, setStatus, total, pass } = opts;

        // 1) 剩余未处理的行标记为 Skipped
        for (let k = currentIdx; k < rows.length; k++) {
            const r = rows[k];
            const st = r.querySelector('.hoj-tj-status');
            if (st && (st.classList.contains('pass')
                       || st.classList.contains('fail')
                       || st.classList.contains('error'))) {
                continue;
            }
            setStatus(r, WebI18n.t('testjudge.skipped'), 'skipped');
        }

        // 2) 展开第一个失败用例
        expandFirstFailure(rows);

        // 3) Alert
        const alertKey = reason === 'compile-error'
        ? 'testjudge.alertCompileError'
        : 'testjudge.alertStopped';
        const details = WebI18n.t('testjudge.alertDetail', {
            pass, total, done: currentIdx
        });
        NewAlert(
            WebI18n.t(alertKey) + ' — ' + details,
            reason === 'compile-error' ? 'error' : 'warning',
            3500
        );
    }async function runAllTestJudge() {
        /* ---------- 前置校验 ---------- */
        const cm = _findCodeMirror();
        if (!cm) return NewAlert('@testjudge.noEditor', 'warning');

        const code = (cm.getValue() || '').trim();
        if (!code) return NewAlert('@testjudge.noCode', 'warning');

        /* ---------- 语言与远程判题标志 ---------- */
        // CF 远程题走 CF 语言列表（isRemoteJudge = true）；否则走 HOJ 语言并归一化
        const isCFLang      = _hojCurrentIsCFLang();
        const rawLang       = _hojCurrentSelectedLang();
        const language      = isCFLang ? rawLang : normalizeLanguage(rawLang);
        const mode          = getTestJudgeMode(language);
        const isRemoteJudge = isCFLang;

        /* ---------- 同步到原生 select（仅 HOJ 本地题，让站点自己的「在线自测」也用同一语言） ---------- */
        if (!isCFLang && document.getElementById('hoj-lang-trigger')) {
            try {
                const nativeLang = _getCurrentLanguage();
                if (nativeLang !== language) {
                    console.log('[TestJudge] 同步语言到原生 select：', nativeLang, '→', language);
                    _hojSyncNativeSelect(language);
                    const input = document.querySelector('#js-right-header .el-select .el-input__inner');
                    if (input && input.value !== language) {
                        input.value = language;
                        try {
                            input.dispatchEvent(new Event('input',  { bubbles: true }));
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                        } catch (_) {}
                    }
                }
            } catch (e) {
                console.warn('[TestJudge] 同步语言失败:', e);
            }
        }

        /* ---------- 拉题目详情 ---------- */
        let detail;
        try {
            detail = await fetchProblemDetail();
        } catch (e) {
            console.warn('[TestJudge] 获取题目失败:', e);
            return NewAlert('@testjudge.noProblem', 'warning');
        }
        const p = detail?.data?.problem || detail?.data?.problems?.[0];
        if (!p) return NewAlert('@testjudge.noProblem', 'warning');

        const pid = p.id;
        if (!pid) return NewAlert('@testjudge.noProblem', 'warning');

        /* ---------- 样例 ---------- */
        let samples;
        if (currentProblemData
            && Array.isArray(currentProblemData.tests)
            && currentProblemData.tests.length) {
            samples = currentProblemData.tests;
        } else {
            samples = parseExamples(p.examples || '')
                .map((t, i) => ({ input: t.input, output: t.output, id: i }));
        }
        if (!samples.length) return NewAlert('@testjudge.noSamples', 'warning');

        /* ---------- 构建 UI ---------- */
        const wrap = document.createElement('div');
        wrap.className = 'hoj-tj-wrap';

        const summaryBar = document.createElement('div');
        summaryBar.className = 'hoj-tj-summary';
        const summaryText = document.createElement('div');
        summaryText.className = 'hoj-tj-summary-text';
        const stopBtn = document.createElement('button');
        stopBtn.type = 'button';
        stopBtn.className = 'hoj-snippet-btn';
        stopBtn.textContent = WebI18n.t('testjudge.cancel');
        summaryBar.append(summaryText, stopBtn);
        wrap.appendChild(summaryBar);

        const list = document.createElement('div');
        list.className = 'hoj-tj-list';
        wrap.appendChild(list);

        const rows = samples.map((s, i) => {
            const row = document.createElement('div');
            row.className = 'hoj-tj-row';
            row.dataset.idx = String(i);
            row.innerHTML = `
            <div class="hoj-tj-row-head">
                <span class="hoj-tj-idx">#${i + 1}</span>
                <span class="hoj-tj-status"></span>
                <span class="hoj-tj-meta"></span>
            </div>
            <div class="hoj-tj-row-body" style="display:none;">
                <div class="hoj-tj-block">
                    <div class="hoj-tj-block-title"></div>
                    <pre class="hoj-tj-pre"></pre>
                </div>
                <div class="hoj-tj-block">
                    <div class="hoj-tj-block-title"></div>
                    <pre class="hoj-tj-pre"></pre>
                </div>
                <div class="hoj-tj-block">
                    <div class="hoj-tj-block-title"></div>
                    <pre class="hoj-tj-pre"></pre>
                </div>
                <div class="hoj-tj-block hoj-tj-stderr-block" style="display:none;">
                    <div class="hoj-tj-block-title"></div>
                    <pre class="hoj-tj-pre hoj-tj-pre--err"></pre>
                </div>
            </div>
        `;

            const titles = row.querySelectorAll('.hoj-tj-block-title');
            titles[0].textContent = WebI18n.t('testjudge.input');
            titles[1].textContent = WebI18n.t('testjudge.expected');
            titles[2].textContent = WebI18n.t('testjudge.actual');
            titles[3].textContent = WebI18n.t('testjudge.stderr');

            row.querySelector('.hoj-tj-row-head').addEventListener('click', () => {
                const b = row.querySelector('.hoj-tj-row-body');
                b.style.display = b.style.display === 'none' ? '' : 'none';
            });

            const pres = row.querySelectorAll('.hoj-tj-pre');
            pres[0].textContent = s.input  ?? '';
            pres[1].textContent = s.output ?? '';

            list.appendChild(row);
            return row;
        });

        /* ---------- 状态辅助 ---------- */
        const setStatus = (row, text, cls) => {
            const el = row.querySelector('.hoj-tj-status');
            el.textContent = text;
            el.className = 'hoj-tj-status ' + (cls || '');
            if (cls && /^(pass|fail|error|running|submitting|skipped)$/.test(cls)) {
                row.dataset.state = cls;
            } else {
                delete row.dataset.state;
            }
        };
        const setMeta = (row, text) => {
            row.querySelector('.hoj-tj-meta').textContent = text || '';
        };
        const setActual = (row, text) => {
            row.querySelectorAll('.hoj-tj-pre')[2].textContent = text ?? '';
        };
        const setStderr = (row, text) => {
            const blk = row.querySelector('.hoj-tj-stderr-block');
            if (!text) { blk.style.display = 'none'; return; }
            blk.style.display = '';
            row.querySelector('.hoj-tj-pre--err').textContent = text;
        };

        rows.forEach(row => setStatus(row, WebI18n.t('testjudge.submitting'), 'submitting'));

        let completed = 0, passCount = 0;
        const updateSummary = () => {
            summaryText.textContent =
                WebI18n.t('testjudge.progress', { done: completed, total: samples.length })
                + ' · '
                + WebI18n.t('testjudge.summary', { pass: passCount, total: samples.length });
        };
        updateSummary();

        /* ---------- 中止控制 ---------- */
        const controller = new AbortController();
        let _stopped    = false;
        let _ceHappened = false;
        let _nextIdx    = 0;

        stopBtn.addEventListener('click', () => {
            if (_stopped) return;
            _stopped = true;
            stopBtn.disabled = true;
            controller.abort();
        });

        openCustomDialog({
            title: WebI18n.t('testjudge.runAll'),
            bodyEl: wrap,
            width: '820px',
            maxHeight: '85vh',
            fullscreen: true,
            onClose: () => controller.abort()
        });

        _lastTestJudgeSubmitAt = 0;

        /* ---------- 主循环 ---------- */
        try {
            for (let i = 0; i < samples.length; i++) {
                _nextIdx = i;

                if (controller.signal.aborted) break;

                const row = rows[i];
                const s   = samples[i];

                setStatus(row, WebI18n.t('testjudge.runningOne'), 'running');

                try {
                    const resp = await _rateLimitedSubmit({
                        pid,
                        language,
                        code,
                        type: 'public',
                        userInput: s.input ?? '',
                        expectedOutput: s.output ?? '',
                        mode,
                        isRemoteJudge
                    }, controller);

                    let result = null;
                    const st = resp?.data?.status;
                    if (st !== undefined && st !== 5 && st !== 6 && st !== 7) {
                        result = resp.data;
                    } else {
                        const key = _extractTestJudgeKey(resp);
                        if (!key) throw new Error(resp?.msg || 'No testJudgeKey');
                        result = await _pollTestResult(key, controller.signal);
                    }

                    const rstatus = result?.status;
                    const rname = (typeof JUDGE_STATUS !== 'undefined'
                                   && JUDGE_STATUS[String(rstatus)]?.name) || String(rstatus);

                    const isAC = Number(rstatus) === 0;
                    const isCE = Number(rstatus) === -2;

                    setStatus(row,
                              isAC ? WebI18n.t('testjudge.pass') : WebI18n.t('testjudge.fail'),
                              isAC ? 'pass' : 'fail');
                    setMeta(row,
                            `${WebI18n.t('testjudge.time')}: ${result?.time ?? '-'}ms · `
                            + `${WebI18n.t('testjudge.memory')}: ${result?.memory ?? '-'}KB · `
                            + rname);
                    setActual(row, result?.userOutput ?? '');
                    setStderr(row, result?.stderr || '');

                    if (isAC) passCount++;

                    completed++;
                    updateSummary();

                    if (isCE) {
                        _ceHappened = true;
                        _nextIdx = i + 1;
                        break;
                    }
                } catch (e) {
                    if (e?.message === 'ABORTED' || controller.signal.aborted) {
                        break;
                    }
                    setStatus(row, WebI18n.t('testjudge.error'), 'error');
                    setMeta(row, e.message || String(e));
                    completed++;
                    updateSummary();
                }
            }
        } finally {
            if (_stopped || _ceHappened) {
                completed = Math.max(completed, _nextIdx);
                updateSummary();
                finalizeTestRun({
                    rows,
                    currentIdx: _nextIdx,
                    reason: _ceHappened ? 'compile-error' : 'user-stop',
                    setStatus,
                    total: samples.length,
                    pass: passCount
                });
            } else {
                expandFirstFailure(rows);
            }
        }
    }
    function injectRunAllTestButton() {
        if (document.getElementById('hoj-tj-all-btn')) return true;

        const path = window.location.pathname;
        const isNormal  = /^\/problem\/[^\/?#]+/.test(path);
        const isContest = /^\/contest\/[^\/]+\/problem\/[^\/?#]+/.test(path);
        const isGroup   = /^\/group\/[^\/]+\/problem\/[^\/?#]+/.test(path);
        if (!isNormal && !isContest && !isGroup) return false;

        /* ---- 关键：只在「自测抽屉」里注入 ---- */
        const drawerBody = document.querySelector('.el-drawer__body');
        if (!drawerBody) return false;   // 抽屉还没挂载，等 MutationObserver 下次

        const nav = drawerBody.querySelector('.el-tabs__nav.is-top');
        if (!nav) return false;

        /* ---- 找“运行自测”tab：优先 #tab-2，其次文本匹配 ---- */
        let runTestTab = drawerBody.querySelector('#tab-2');
        if (!runTestTab) {
            for (const item of nav.querySelectorAll('.el-tabs__item')) {
                const t = (item.textContent || '').trim();
                if (t.includes('运行自测') || t.includes('在线自测')
                    || /run\s*test/i.test(t)) {
                    runTestTab = item;
                    break;
                }
            }
        }
        if (!runTestTab) return false;

        /* ---- 构造 tab 项 ---- */
        const tabItem = document.createElement('div');
        tabItem.id = 'hoj-tj-all-btn';
        tabItem.className = 'el-tabs__item is-top hoj-tj-tab';
        tabItem.setAttribute('role', 'tab');
        tabItem.setAttribute('tabindex', '0');
        tabItem.style.cursor = 'pointer';
        tabItem.innerHTML = `
        <span data-v-6e9809fa class="tj-btn el-tag el-tag--warning el-tag--plain" style="cursor:pointer;">
            <i class="el-icon-video-play"></i> <span></span>
        </span>
    `;
        tabItem.querySelector('.tj-btn > span').textContent = WebI18n.t('testjudge.runAll');

        tabItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            runAllTestJudge();
        });

        // 插到“运行自测”后面
        runTestTab.insertAdjacentElement('afterend', tabItem);

        console.log('[TestJudge] 已注入「全部自测」到自测抽屉 tab 栏');
        return true;
    }

    /* ============================================================
 * /problem 页面：语言选择 + 提交覆盖
 * 只在 URL 切题时注入一次，isRemote=true 时完全不注入
 * ============================================================ */
    const HOJ_ALL_LANGS_GROUPED = [
        { name: 'C++',        langs: ['C++', 'C++ With O2', 'C++ 17', 'C++ 17 With O2', 'C++ 20', 'C++ 20 With O2'] },
        { name: 'C',          langs: ['C', 'C With O2'] },
        { name: 'Python',     langs: ['Python3', 'Python2', 'PyPy3', 'PyPy2'] },
        { name: 'Java',       langs: ['Java'] },
        { name: 'Golang',     langs: ['Golang'] },
        { name: 'C#',         langs: ['C#'] },
        { name: 'PHP',        langs: ['PHP'] },
        { name: 'JavaScript', langs: ['JavaScript Node', 'JavaScript V8'] },
        { name: 'Ruby',       langs: ['Ruby'] },
        { name: 'Rust',       langs: ['Rust'] }
    ];
    const HOJ_LANG_STORAGE_KEY = 'hojIndividualLanguageAndSetting';
    const HOJ_DEFAULT_LANG = 'C++';
    /* ============================================================
 * Codeforces 远程题语言列表（isRemote=true 且 pid 以 CF- 开头时使用）
 * ============================================================ */
    const CF_LANG_GROUPED = [
        { name: 'C++',        langs: ['GNU G++17', 'GNU G++20', 'GNU G++23',
                                      'Clang++17 Diagnostics',
                                      'Microsoft Visual C++ 2017'] },
        { name: 'C#',         langs: ['C# Mono 6.8', 'C# 8, .NET Core 3.1'] },
        { name: 'D',          langs: ['D DMD32 v2.091.0'] },
        { name: 'Go',         langs: ['Go 1.15.6'] },
        { name: 'Haskell',    langs: ['Haskell GHC 8.10.1'] },
        { name: 'Java',       langs: ['Java 1.8.0_241', 'Java 11.0.6'] },
        { name: 'Kotlin',     langs: ['Kotlin 1.4.0'] },
        { name: 'OCaml',      langs: ['OCaml 4.02.1'] },
        { name: 'Pascal',     langs: ['Delphi 7', 'Free Pascal 3.0.2',
                                      'PascalABC.NET 3.4.2'] },
        { name: 'Perl',       langs: ['Perl 5.20.1'] },
        { name: 'PHP',        langs: ['PHP 7.2.13'] },
        { name: 'Python',     langs: ['Python 2.7.18', 'Python 3.9.1',
                                      'PyPy 2.7 (7.3.0)', 'PyPy 3.7 (7.3.0)'] },
        { name: 'Ruby',       langs: ['Ruby 3.0.0'] },
        { name: 'Rust',       langs: ['Rust 1.49.0'] },
        { name: 'Scala',      langs: ['Scala 2.12.8'] },
        { name: 'JavaScript', langs: ['JavaScript V8 4.8.0', 'Node.js 12.6.3'] }
    ];

    const CF_DEFAULT_LANG = 'GNU G++17';

    let _hojSelectedCFLang   = null;   // CF 语言（与 _hojSelectedLang 分开存）
    let _hojUseCFLang        = false;  // 当前题是否走 CF 语言列表
    /** 20 种规范语言平铺集合，用于匹配判断 */
    const HOJ_ALL_LANGS_FLAT = HOJ_ALL_LANGS_GROUPED.flatMap(g => g.langs);

    /**
 * 把任意语言名匹配到 20 种规范语言之一
 * @param {string} raw
 * @returns {string|null} 匹配结果，未匹配返回 null
 */
    function matchKnownLanguage(raw) {
        if (!raw) return null;
        const s = String(raw).trim();
        if (!s) return null;

        // 1) 精确匹配
        if (HOJ_ALL_LANGS_FLAT.includes(s)) return s;

        // 2) 归一化匹配（去空格、去版本号、小写）
        const norm = (x) => x.toLowerCase().replace(/\s+/g, '').replace(/[\d.]+$/, '');
        const key = norm(s);
        for (const l of HOJ_ALL_LANGS_FLAT) {
            if (norm(l) === key) return l;
        }

        // 3) 模糊匹配：Python 3.9.1 → Python3
        for (const l of HOJ_ALL_LANGS_FLAT) {
            if (s.toLowerCase().startsWith(l.toLowerCase())) return l;
            if (l.toLowerCase().startsWith(s.toLowerCase())) return l;
        }

        // 4) 特殊映射
        if (/^python/i.test(s))   return /^python\s*2/i.test(s) ? 'Python2' : 'Python3';
        if (/^pypy/i.test(s))     return /3/.test(s) ? 'PyPy3' : 'PyPy2';
        if (/^c\+\+/i.test(s))    return 'C++';
        if (/^gnug\+\+|^g\+\+/i.test(s)) return 'C++';
        if (/^gcc|^c\s*$/i.test(s)) return 'C';
        if (/^java/i.test(s))     return 'Java';
        if (/^go/i.test(s))       return 'Golang';
        if (/^rust/i.test(s))     return 'Rust';
        if (/^node/i.test(s))     return 'JavaScript Node';
        if (/^javascript|v8/i.test(s)) return 'JavaScript V8';
        if (/^ruby/i.test(s))     return 'Ruby';
        if (/^c#|csharp/i.test(s)) return 'C#';
        if (/^php/i.test(s))      return 'PHP';

        return null;
    }

    /** 从 localStorage 读取语言；不匹配则返回 null */
    function readStoredLanguage() {
        try {
            const raw = localStorage.getItem(HOJ_LANG_STORAGE_KEY);
            if (!raw) return null;
            const obj = JSON.parse(raw);
            return matchKnownLanguage(obj && obj.language);
        } catch (e) {
            return null;
        }
    }

    /** 写入语言到 localStorage（保留其它字段） */
    function writeStoredLanguage(lang) {
        try {
            let obj = {};
            const raw = localStorage.getItem(HOJ_LANG_STORAGE_KEY);
            if (raw) {
                try { obj = JSON.parse(raw) || {}; } catch (_) {}
            }
            obj.language = lang;
            if (!obj.theme)    obj.theme    = 'solarized';
            if (!obj.fontSize) obj.fontSize = '14px';
            if (typeof obj.tabSize !== 'number') obj.tabSize = 4;
            localStorage.setItem(HOJ_LANG_STORAGE_KEY, JSON.stringify(obj));
        } catch (e) {
            console.warn('[SubmitOverride] 写入语言失败:', e);
        }
    }
    /** 从 localStorage 读 CF 语言；不匹配则 null */
    function readStoredCFLanguage() {
        try {
            const raw = localStorage.getItem(HOJ_LANG_STORAGE_KEY);
            if (!raw) return null;
            const obj = JSON.parse(raw);
            const lang = obj && obj.cfLanguage;
            if (!lang) return null;
            // 校验仍在列表中
            const flat = CF_LANG_GROUPED.flatMap(g => g.langs);
            return flat.includes(lang) ? lang : null;
        } catch (e) { return null; }
    }

    /** 写入 CF 语言（保留其它字段） */
    function writeStoredCFLanguage(lang) {
        try {
            let obj = {};
            const raw = localStorage.getItem(HOJ_LANG_STORAGE_KEY);
            if (raw) { try { obj = JSON.parse(raw) || {}; } catch (_) {} }
            obj.cfLanguage = lang;
            if (!obj.language) obj.language = 'C++';
            if (!obj.theme)    obj.theme    = 'solarized';
            if (!obj.fontSize) obj.fontSize = '14px';
            if (typeof obj.tabSize !== 'number') obj.tabSize = 4;
            localStorage.setItem(HOJ_LANG_STORAGE_KEY, JSON.stringify(obj));
        } catch (e) {
            console.warn('[SubmitOverride] 写入 CF 语言失败:', e);
        }
    }

    let _hojSelectedLang = null;   // 用户当前选择，跨题保留
    /**
 * 打开语言选择对话框
 * @param {Array}  groups   语言分组（HOJ 或 CF）
 * @param {boolean} isCF    是否 CF 模式
 */
    function openLanguagePicker(groups, isCF) {
        const current = isCF
        ? (_hojSelectedCFLang || CF_DEFAULT_LANG)
        : (_hojSelectedLang   || HOJ_DEFAULT_LANG);

        const wrap = document.createElement('div');
        wrap.className = 'hoj-lang-picker';

        groups.forEach(group => {
            const groupEl = document.createElement('div');
            groupEl.className = 'hoj-lang-picker__group';

            const titleEl = document.createElement('div');
            titleEl.className = 'hoj-lang-picker__title';
            titleEl.textContent = group.name;
            groupEl.appendChild(titleEl);

            const itemsEl = document.createElement('div');
            itemsEl.className = 'hoj-lang-picker__items';

            group.langs.forEach(lang => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'hoj-lang-picker__item';
                if (lang === current) btn.classList.add('is-selected');
                btn.dataset.lang = lang;
                btn.textContent = lang;
                itemsEl.appendChild(btn);
            });

            groupEl.appendChild(itemsEl);
            wrap.appendChild(groupEl);
        });

        const close = openCustomDialog({
            title: WebI18n.t('submit.chooseLang'),
            bodyEl: wrap,
            width: '620px',
            maxHeight: '70vh'
        });

        wrap.addEventListener('click', (e) => {
            const item = e.target.closest('.hoj-lang-picker__item');
            if (!item) return;
            e.preventDefault();
            e.stopPropagation();

            const lang = item.dataset.lang;

            if (isCF) {
                _hojSelectedCFLang = lang;
                writeStoredCFLanguage(lang);
            } else {
                _hojSelectedLang = lang;
                writeStoredLanguage(lang);
            }

            const label = document.querySelector('#hoj-lang-trigger .hoj-lang-trigger__label');
            if (label) label.textContent = lang;

            close();
        });

        return close;
    }

    /** 把语言同步到站点原生 select（best-effort） */
    function _hojSyncNativeSelect(lang) {
        writeStoredLanguage(lang);
    }

    /**
 * 从当前 URL 解析题目上下文
 * 支持：
 *   /problem/{displayPid}                       → { cid:0, tid:null, displayPid }
 *   /training/{tid}/problem/{displayPid}        → { cid:0, tid:<tid>, displayPid }
 *   /contest/{cid}/problem/{displayPid}         → { cid:<cid>, tid:null, displayPid }
 * @returns {{cid:number, tid:(number|null), displayPid:string}|null}
 */
    function parseProblemSubmitContext() {
        const p = window.location.pathname;

        // 比赛题：/contest/{cid}/problem/{displayPid}
        let m = p.match(/^\/contest\/([^\/]+)\/problem\/([^\/?#]+)/);
        if (m) {
            const cid = Number(m[1]);
            return {
                cid: Number.isNaN(cid) ? m[1] : cid,
                tid: null,
                displayPid: decodeURIComponent(m[2])
            };
        }

        // 训练题：/training/{tid}/problem/{displayPid}
        m = p.match(/^\/training\/([^\/]+)\/problem\/([^\/?#]+)/);
        if (m) {
            const tid = Number(m[1]);
            return {
                cid: 0,
                tid: Number.isNaN(tid) ? m[1] : tid,
                displayPid: decodeURIComponent(m[2])
            };
        }

        // 团队题：/group/{gid}/problem/{displayPid}/...
        m = p.match(/^\/group\/([^\/]+)\/problem\/([^\/?#]+)/);
        if (m) {
            return {
                cid: 0,
                tid: null,
                gid: m[1],
                displayPid: decodeURIComponent(m[2])
            };
        }


        // 普通题：/problem/{displayPid}
        m = p.match(/^\/problem\/([^\/?#]+)/);
        if (m) {
            return { cid: 0, tid: null, displayPid: decodeURIComponent(m[1]) };
        }

        return null;
    }

    let _hojInjectingProblem = false;
    let _hojLastInjectedUrl = '';   // 上次成功注入的 URL

    async function injectProblemSubmitOverride() {
        const ctx = parseProblemSubmitContext();
        if (!ctx) return false;
        const { cid, tid, gid, displayPid } = ctx;

        const currentUrl = window.location.href;
        if (_hojLastInjectedUrl === currentUrl) return true;
        if (_hojInjectingProblem) return false;
        _hojInjectingProblem = true;

        try {
            /* ---------- 1. 拉详情 ---------- */
            let detail;
            try {
                const d = await fetchProblemDetail();
                const p = d?.data?.problem || d?.data?.problems?.[0];
                if (!p) return false;
                detail = {
                    isRemote:  !!p.isRemote,
                    problemId: String(p.problemId || displayPid)
                };
            } catch (e) {
                console.warn('[SubmitOverride] 获取详情失败:', e);
                return false;
            }

            /* ---------- 2. 决定是否注入 ---------- */
            const isCFRemote = detail.isRemote && /^CF-/i.test(detail.problemId);
            _hojUseCFLang = isCFRemote;

            // 远程题但不是 CF- 前缀 → 完全不注入
            if (detail.isRemote && !isCFRemote) {
                _hojLastInjectedUrl = currentUrl;
                console.log('[SubmitOverride] isRemote=true 且非 CF 题，跳过注入');
                return false;
            }

            const langGroups = isCFRemote ? CF_LANG_GROUPED : HOJ_ALL_LANGS_GROUPED;

            /* ---------- 3. 等 DOM 就绪 ---------- */
            const langSelect = document.querySelector('#js-right-header .el-select');
            const submitBtn  = [...document.querySelectorAll('button')].find(b => {
                const t = (b.textContent || '').trim();
                return t === '提交评测' || /^submit$/i.test(t);
            });
            if (!langSelect || !submitBtn) return false;

            /* ---------- 4. 注入语言触发器 ---------- */
            if (!document.getElementById('hoj-lang-trigger')) {
                langSelect.style.display = 'none';

                if (isCFRemote) {
                    if (!_hojSelectedCFLang) {
                        _hojSelectedCFLang = readStoredCFLanguage() || CF_DEFAULT_LANG;
                        writeStoredCFLanguage(_hojSelectedCFLang);
                    }
                } else {
                    if (!_hojSelectedLang) {
                        _hojSelectedLang = readStoredLanguage() || HOJ_DEFAULT_LANG;
                        writeStoredLanguage(_hojSelectedLang);
                    }
                }

                const trigger = document.createElement('button');
                trigger.id = 'hoj-lang-trigger';
                trigger.type = 'button';
                trigger.className = 'el-button el-button--default el-button--small';
                trigger.dataset.mode = isCFRemote ? 'cf' : 'hoj';
                trigger.innerHTML = `<i class="el-icon-arrow-down"></i><span class="hoj-lang-trigger__label"></span>`;
                trigger.querySelector('.hoj-lang-trigger__label').textContent =
                    isCFRemote ? _hojSelectedCFLang : _hojSelectedLang;

                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openLanguagePicker(langGroups, isCFRemote);
                });

                langSelect.parentElement.appendChild(trigger);
            }

            /* ---------- 5. 覆盖提交按钮 ---------- */
            if (submitBtn.dataset.hojSubmitOverridden !== '1') {
                submitBtn.dataset.hojSubmitOverridden = '1';

                submitBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();

                    const code = (_findCodeMirror() || { getValue: () => '' }).getValue().trim();
                    if (!code) return NewAlert('@submit.noCode', 'warning');

                    const language = isCFRemote
                    ? (_hojSelectedCFLang || CF_DEFAULT_LANG)
                    : (_hojSelectedLang   || HOJ_DEFAULT_LANG);

                    const origHtml = submitBtn.innerHTML;
                    submitBtn.disabled = true;
                    submitBtn.innerHTML =
                        '<i class="el-icon-loading"></i><span> ' +
                        WebI18n.t('submit.submitting') + '</span>';

                    try {
                        const resp = await hojApi('/api/submit-problem-judge', {
                            method: 'POST',
                            body: {
                                pid:      displayPid,
                                language: language,
                                code:     code,
                                cid:      cid,
                                tid:      tid,
                                gid:      gid,
                                isRemote: isCFRemote
                            }
                        });

                        NewAlert('@submit.success', 'success', 1500);

                        let submitId = null;
                        if (typeof resp === 'string') submitId = resp;
                        else if (resp && typeof resp === 'object') {
                            submitId = resp.submitId || resp.id
                            || (resp.data && (resp.data.submitId || resp.data.id))
                            || null;
                        }

                        setTimeout(() => {
                            if (submitId) window.location.href = `/submission-detail/${submitId}`;
                            else          window.location.href = '/status';
                        }, 800);

                    } catch (err) {
                        console.warn('[SubmitOverride] 提交失败:', err);
                        NewAlert(WebI18n.t('submit.failed', { msg: err?.message || String(err) }), 'error');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = origHtml;
                    }
                }, true);
            }

            _hojLastInjectedUrl = currentUrl;
            console.log(
                `[SubmitOverride] 已接管 ${displayPid}` +
                `（${isCFRemote ? 'CF 远程' : '普通'}，cid=${cid}, tid=${tid}，` +
                `语言=${isCFRemote ? _hojSelectedCFLang : _hojSelectedLang}）`
            );
            return true;

        } finally {
            _hojInjectingProblem = false;
        }
    }

    function _hojReadNativeLang() {
        const sel = document.querySelector('#js-right-header .el-select .el-select-dropdown__item.selected');
        if (sel) return sel.textContent.trim();
        const input = document.querySelector('#js-right-header .el-select .el-input__inner');
        return input && input.value ? input.value.trim() : null;
    }
    /* ============================================================
 * 拦截 submit-problem-test-judge：强制 language 与用户选择一致
 * ============================================================ */
    const _TEST_JUDGE_URL_RE = /\/api\/submit-problem-test-judge(?:\?|#|$)/;

    function hookTestJudgeLanguage() {
        if (hookTestJudgeLanguage._done) return;
        hookTestJudgeLanguage._done = true;

        /* ---------- 工具：若需改写就返回新的 body 字符串；否则返回 null ---------- */
        const maybeRewrite = (url, bodyStr) => {
            if (!_TEST_JUDGE_URL_RE.test(url)) return null;
            if (!document.getElementById('hoj-lang-trigger')) return null;

            /* 当前题的"用户选中语言"与是否远程 */
            const isCFLang = _hojCurrentIsCFLang();
            const target   = _hojCurrentSelectedLang();
            if (!target) return null;

            let obj;
            try { obj = JSON.parse(bodyStr); }
            catch (_) { return null; }
            if (!obj || typeof obj !== 'object') return null;

            const targetMode = getTestJudgeMode(target);
            // CF 语言的 mode 在 HOJ 侧可能不生效；但接口能接受就发过去
            const targetIsRemote = isCFLang ? true
            : (obj.isRemoteJudge === true ? true : false);

            const needLangChange   = obj.language !== target;
            const needModeChange   = obj.mode !== targetMode;
            const needRemoteChange = obj.isRemoteJudge !== targetIsRemote;

            if (!needLangChange && !needModeChange && !needRemoteChange) return null;

            obj.language = target;
            obj.mode     = targetMode;
            // 只有远程题或请求本身已标记远程时才改 isRemoteJudge，
            // 避免把 HOJ 本地题的 isRemoteJudge 从 false 错改成 true
            if (isCFLang || obj.isRemoteJudge === true) {
                obj.isRemoteJudge = targetIsRemote;
            }

            console.log('[TestJudge Hook] 改写 →',
                        { language: obj.language, mode: obj.mode, isRemoteJudge: obj.isRemoteJudge });
            return JSON.stringify(obj);
        };

        /* ---------- 1) fetch ---------- */
        try {
            const prevFetch = unsafeWindow.fetch;
            unsafeWindow.fetch = function (input, init) {
                try {
                    const url = typeof input === 'string' ? input : (input && input.url) || '';

                    // 情况 A：init.body 是字符串
                    if (init && typeof init.body === 'string' && _TEST_JUDGE_URL_RE.test(url)) {
                        const nv = maybeRewrite(url, init.body);
                        if (nv !== null) {
                            init = { ...init, body: nv };
                            return prevFetch.call(this, input, init);
                        }
                    }

                    // 情况 B：input 是 Request 且带 body
                    if (typeof input !== 'string' && input instanceof unsafeWindow.Request) {
                        const reqBody = input._bodyInit ?? input.body;
                        if (typeof reqBody === 'string' && _TEST_JUDGE_URL_RE.test(input.url)) {
                            const nv = maybeRewrite(input.url, reqBody);
                            if (nv !== null) {
                                const newReq = new unsafeWindow.Request(input, { body: nv });
                                return prevFetch.call(this, newReq, init);
                            }
                        }
                    }

                    // 情况 C：init.body 是 URLSearchParams / FormData（一般不用于 JSON，跳过）
                    // 自测接口是 JSON，基本不会走到这里
                } catch (e) {
                    console.warn('[TestJudge Hook] fetch 改写失败:', e);
                }
                return prevFetch.call(this, input, init);
            };
        } catch (e) {
            console.warn('[TestJudge Hook] hook fetch 失败:', e);
        }

        /* ---------- 2) XHR ---------- */
        try {
            const XHR = unsafeWindow.XMLHttpRequest;
            if (XHR && XHR.prototype) {
                const _open = XHR.prototype.open;
                const _send = XHR.prototype.send;

                XHR.prototype.open = function (method, url, ...rest) {
                    this._hojTJUrl = url;
                    this._hojTJMethod = String(method || '').toUpperCase();
                    return _open.call(this, method, url, ...rest);
                };

                XHR.prototype.send = function (body) {
                    try {
                        if (_TEST_JUDGE_URL_RE.test(this._hojTJUrl || '') && typeof body === 'string') {
                            const nv = maybeRewrite(this._hojTJUrl, body);
                            if (nv !== null) body = nv;
                        }
                    } catch (e) {
                        console.warn('[TestJudge Hook] XHR 改写失败:', e);
                    }
                    return _send.call(this, body);
                };
            }
        } catch (e) {
            console.warn('[TestJudge Hook] hook XHR 失败:', e);
        }

        console.log('[TestJudge Hook] 语言强制一致已挂载');
    }
    /* ============================================================
 * /status 页面：Submitted Failed 一键重测
 * ============================================================ */
    async function injectResubmitButtons() {
        if (!/^\/status(\/|$)/.test(window.location.pathname)
            && !/^\/group\/[^\/]+\/status(\/|$)/.test(window.location.pathname)) {
            return false;
        }

        /* ---------- 1. 找主表格 ---------- */
        const tables = [...document.querySelectorAll('.vxe-table')];
        let table = null;
        for (const t of tables) {
            const titles = [...t.querySelectorAll('thead th .vxe-cell--title')]
            .map(el => el.textContent.trim());
            // 中英双语兼容
            const hasId = titles.some(x => /^(Run\s*ID|运行\s*ID)$/i.test(x));
            const hasSt = titles.some(x => /^(Status|状态)$/i.test(x));
            const hasAu = titles.some(x => /^(Author|作者)$/i.test(x));
            if (hasId && hasSt && hasAu) { table = t; break; }
        }
        if (!table) return false;

        /* ---------- 2. 列索引：中英双语匹配 ---------- */
        const ths = [...table.querySelectorAll('thead th')];
        const matchBy = (patterns) => ths.findIndex(th => {
            const el = th.querySelector('.vxe-cell--title');
            if (!el) return false;
            const txt = el.textContent.trim();
            return patterns.some(p => p.test(txt));
        });
        const idIdx     = matchBy([/^(Run\s*ID|运行\s*ID)$/i, /^ID$/i]);
        const statusIdx = matchBy([/^(Status|状态)$/i]);
        const authorIdx = matchBy([/^(Author|作者)$/i]);
        if (idIdx < 0 || statusIdx < 0 || authorIdx < 0) {
            console.warn('[Resubmit] 无法识别列索引:', { idIdx, statusIdx, authorIdx });
            return false;
        }

        /* ---------- 3. 当前用户 ---------- */
        const me = await getCurrentUsername();
        if (!me) return false;
        const meName = String(me).trim();

        const tbody = table.querySelector('tbody');
        if (!tbody) return false;

        let injected = 0;

        tbody.querySelectorAll('tr.vxe-body--row').forEach(row => {
            const cells = row.querySelectorAll('td.vxe-body--column');
            if (cells.length <= Math.max(idIdx, statusIdx, authorIdx)) return;

            const idCell     = cells[idIdx];
            const statusCell = cells[statusIdx];
            const authorCell = cells[authorIdx];

            const submitId = (idCell.querySelector('.vxe-cell--label') || idCell).textContent.trim();
            if (!submitId) return;

            // 状态：Submitted Failed（不区分语言，因为这是 API 原值）
            const statusTxt = statusCell.textContent.replace(/\s+/g, ' ').trim();
            if (!/Submitted\s*Failed/i.test(statusTxt)) return;

            // 作者：优先 a 标签
            const authorTxt = (authorCell.querySelector('a') || authorCell).textContent.trim();
            if (authorTxt !== meName) return;

            /* ---------- 4. 在 .el-tag 内部注入图标 ---------- */
            const tag = statusCell.querySelector('.el-tag');
            if (!tag) return;

            // 站点原生已开启重测（标签内已有刷新图标）→ 跳过
            if (tag.querySelector('i.el-icon-refresh:not([data-hoj-resubmit])')) return;
            // 我们已注入 → 跳过
            if (tag.querySelector('[data-hoj-resubmit]')) return;

            const icon = document.createElement('i');
            icon.setAttribute('data-hoj-resubmit', submitId);
            icon.className = 'el-icon-refresh';
            icon.title = WebI18n.t('resubmit.tooltip');
            icon.style.cursor = 'pointer';
            icon.style.marginRight = '4px';

            icon.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                if (icon.dataset.loading === '1') return;
                icon.dataset.loading = '1';
                const oldCls = icon.className;
                icon.className = 'el-icon-loading';

                try {
                    await hojApi(
                        `/api/resubmit?submitId=${encodeURIComponent(submitId)}`,
                        { silent: true }
                    );
                    NewAlert('@resubmit.success', 'success', 1500);

                    const refreshBtn =
                          document.querySelector('.hidden-xs-only button .el-icon-refresh')?.closest('button') ||
                          document.querySelector('.hidden-sm-and-up button .el-icon-refresh')?.closest('button');
                    if (refreshBtn) refreshBtn.click();
                    else setTimeout(() => location.reload(), 500);
                } catch (err) {
                    NewAlert(
                        WebI18n.t('resubmit.failed', { msg: err?.message || String(err) }),
                        'error'
                    );
                    icon.className = oldCls;
                } finally {
                    icon.dataset.loading = '0';
                }
            });

            // 插到 el-tag 内部最前面
            tag.insertBefore(icon, tag.firstChild);
            injected++;
        });

        if (injected) console.log(`[Resubmit] 已注入 ${injected} 个重测图标`);
        return injected > 0;
    }
    /* =========================================================
     * 十.好用的工具
     * ========================================================= */
    /**
/* ============================================================
 * 1. 按键显示
 * ============================================================ */
    function initKeystrokeTool() {
        const tool = new NewTool({
            id: 'keystroke', title: '按键显示', icon: '⌨️',
            width: 240, height: 90, minWidth: 140, minHeight: 60,
            left: 20, top: window.innerHeight - 200,
            onClose: () => closeToolAndSync('ToolsKeystroke')
        });
        const body = tool.bodyEl;
        body.style.cssText += 'display:flex;flex-direction:row;align-items:center;gap:6px;padding-top:10px;overflow:hidden;';

        const MAX_ALIVE    = 5;
        const LIFETIME     = 5000;
        const OUT_DURATION = 400;

        const aliveKeys = [];   // 索引 0 为最旧（视觉最左），末尾为最新（视觉最右）

        const fmt = (e) => {
            const k = e.key;
            if (['Control','Shift','Alt','Meta','CapsLock'].includes(k)) return null;
            if (k === ' ') return 'Space';
            if (k === 'Enter') return '↵';
            if (k === 'Tab') return 'Tab';
            if (k === 'Backspace') return '⌫';
            if (k === 'Escape') return 'Esc';
            return k;
        };

        const fadeOutAndRemove = (el) => {
            if (!el || !el.parentNode) return;
            if (el._hojTimer) { clearTimeout(el._hojTimer); el._hojTimer = null; }

            const idx = aliveKeys.indexOf(el);
            if (idx >= 0) aliveKeys.splice(idx, 1);

            el.classList.remove('hoj-key--in');
            el.classList.add('hoj-key--out');
            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, OUT_DURATION);
        };

        const onKey = (e) => {
            const t = fmt(e);
            if (!t) return;

            const el = document.createElement('span');
            el.className = 'hoj-key';
            el.textContent = t;

            // 追加到末尾（视觉最右）
            body.appendChild(el);
            aliveKeys.push(el);

            requestAnimationFrame(() => el.classList.add('hoj-key--in'));

            el._hojTimer = setTimeout(() => {
                el._hojTimer = null;
                fadeOutAndRemove(el);
            }, LIFETIME);

            // 超限时挤出最旧的（队首，视觉最左）
            while (aliveKeys.length > MAX_ALIVE) {
                fadeOutAndRemove(aliveKeys[0]);
            }
        };

        document.addEventListener('keydown', onKey, true);
        tool._cleanup = () => document.removeEventListener('keydown', onKey, true);
        return tool;
    }
    /* ============================================================
 * 2. 今日使用时间
 * ============================================================ */
    // 独立计时器
    let _pageTimeTimer = null;
    let _pageTimeVisible = !document.hidden;
    let _pageTimeLast = Date.now();

    function getPageTimeKey() {
        return `hoj_pagetime_${getTodayDateStr()}`;
    }

    function startPageTimeTracker() {
        if (_pageTimeTimer) return;   // 已启动

        const tick = () => {
            const now = Date.now();
            if (_pageTimeVisible) {
                const delta = Math.floor((now - _pageTimeLast) / 1000);
                if (delta > 0) {
                    const total = (GM_getValue(getPageTimeKey(), 0) | 0) + delta;
                    GM_setValue(getPageTimeKey(), total);
                }
            }
            _pageTimeLast = now;
        };

        const onVis = () => {
            // 状态切换前先把这一段时间结清
            tick();
            _pageTimeVisible = !document.hidden;
            _pageTimeLast = Date.now();
        };

        document.addEventListener('visibilitychange', onVis);
        // 切窗口也算离开
        window.addEventListener('blur',  () => { tick(); _pageTimeVisible = false; _pageTimeLast = Date.now(); });
        window.addEventListener('focus', () => { tick(); _pageTimeVisible = true;  _pageTimeLast = Date.now(); });

        _pageTimeTimer = setInterval(tick, 1000);

        // 页面关闭前把最后一段时间结清
        window.addEventListener('beforeunload', tick);

        // 暴露停止方法（备用）
        startPageTimeTracker._stop = () => {
            clearInterval(_pageTimeTimer);
            _pageTimeTimer = null;
            document.removeEventListener('visibilitychange', onVis);
        };
    }
    function initPageTimeTool() {
        const tool = new NewTool({
            id: 'pagetime', title: '今日使用时长', icon: '⏱️',
            width: 200, height: 90, minWidth: 140, minHeight: 70,
            left: 20, top: window.innerHeight - 330,
            onClose: () => closeToolAndSync('ToolsPageTime')
        });
        const body = tool.bodyEl;
        body.style.cssText += 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;';

        const timeEl = document.createElement('div');
        timeEl.style.cssText = 'font-size:22px;font-weight:700;font-variant-numeric:tabular-nums;';
        const labelEl = document.createElement('div');
        labelEl.style.cssText = 'font-size:11px;opacity:.6;';
        labelEl.textContent = '页面活跃时长';
        body.append(timeEl, labelEl);

        const render = (t) => {
            const h = String(Math.floor(t / 3600)).padStart(2, '0');
            const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
            const s = String(t % 60).padStart(2, '0');
            timeEl.textContent = `${h}:${m}:${s}`;
        };

        render(GM_getValue(getPageTimeKey(), 0) | 0);

        // 只读显示，每秒从 GM 拉一次值（因为计时器在别处跑）
        const timer = setInterval(() => {
            render(GM_getValue(getPageTimeKey(), 0) | 0);
        }, 1000);

        tool._cleanup = () => clearInterval(timer);
        return tool;
    }

    /* ============================================================
 * 3. 时钟
 * ============================================================ */
    function initClockTool() {
        const tool = new NewTool({
            id: 'clock', title: '时钟', icon: '🕐',
            width: 200, height: 100, minWidth: 140, minHeight: 70,
            left: 20, top: 80,
            onClose: () => closeToolAndSync('ToolsClock')
        });
        const body = tool.bodyEl;
        body.style.cssText += 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;';
        const timeEl = document.createElement('div');
        timeEl.style.cssText = 'font-size:26px;font-weight:700;font-variant-numeric:tabular-nums;';
        const dateEl = document.createElement('div');
        dateEl.style.cssText = 'font-size:12px;opacity:.65;';
        body.append(timeEl, dateEl);

        const week = ['周日','周一','周二','周三','周四','周五','周六'];
        const tick = () => {
            const d = new Date();
            timeEl.textContent = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
            dateEl.textContent = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${week[d.getDay()]}`;
        };
        tick();
        const timer = setInterval(tick, 1000);
        tool._cleanup = () => clearInterval(timer);
        return tool;
    }

    /** 把设置面板塞进指定容器*/
    function mountSettingsInto(container) {
        if (!settingsPanel) settingsPanel = createSettingsPanel();
        const p = settingsPanel;

        // 内联定位覆盖：脱离 fixed 右上角，融入小组件
        p.style.position   = 'static';
        p.style.top        = 'auto';
        p.style.right      = 'auto';
        p.style.left       = 'auto';
        p.style.width      = '100%';
        p.style.height     = 'auto';
        p.style.maxHeight  = 'none';
        p.style.overflowY  = 'visible';
        p.style.boxShadow  = 'none';
        p.style.background = 'transparent';
        p.style.backdropFilter = 'none';
        p.style.display    = 'block';

        if (p.parentNode !== container) {
            container.innerHTML = '';
            container.appendChild(p);
        }
    }
    /* =========================================================
     * 十一.初始化
     * ========================================================= */
    /**
 * 等待某个选择器在 DOM 中出现，出现后立即执行 callback
 * 若 timeout 毫秒内未出现则放弃
 */
    function waitForSelector(selector, callback, timeout = 15000) {
        const existing = document.querySelector(selector);
        if (existing) { callback(existing); return; }

        const start = Date.now();
        const obs = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                obs.disconnect();
                callback(el);
            } else if (Date.now() - start > timeout) {
                obs.disconnect();
            }
        });
        obs.observe(document.body, { childList: true, subtree: true });
    }
    const _tools = {};
    function initAllTools() {
        if (!config.ToolsEnabled) {
            // 全部销毁
            Object.keys(_tools).forEach(k => { if (_tools[k]) { _tools[k].destroy(); _tools[k] = null; } });
            return;
        }

        const want = {
            keystroke: !!config.ToolsKeystroke,
            pagetime:  !!config.ToolsPageTime,
            clock:     !!config.ToolsClock,
        };
        const factories = {
            keystroke: initKeystrokeTool,
            pagetime:  initPageTimeTool,
            clock:     initClockTool,
        };

        Object.keys(want).forEach(k => {
            if (want[k] && !_tools[k]) _tools[k] = factories[k]();
            if (!want[k] && _tools[k]) { _tools[k].destroy(); _tools[k] = null; }
        });
    }

    function closeToolAndSync(configKey) {
        config[configKey] = false;
        saveConfig(config);

        // 同步设置面板里的复选框
        if (settingsPanel) {
            const checkbox = settingsPanel.querySelector(`[data-key="${configKey}"]`);
            if (checkbox) checkbox.checked = false;
        }

        // 让组件管理逻辑把对应实例销毁
        initAllTools();
    }
    function init() {

        WebI18n.start();
        // 检查脚本更新
        checkScriptUpdate();
        // 站内链接改写
        autoRedirect();
        rewriteAllHojLinks();
        const linkObserver = new MutationObserver(() => {
            rewriteAllHojLinks();
        });
        linkObserver.observe(document.body, { childList: true, subtree: true });
        checkLoginAndAutoLogin();
        injectCss();
        applyBackground(config);
        applySmoothClasses();
        // 注入按钮
        initAllTools();
        startPageTimeTracker();
        const tryInject = () => {
            injectNewHeaderButton(); // 新前端
            injectMobileMenuButton(); // 移动版本
            injectSettingsButton();
            injectCheckInButton();
            injectDiscussionLikeButtons();
            injectNewDiscussionLikeButtons();
            injectDiscussionInterceptor(); // 添加讨论
            injectDiscussionEditInterceptor(); // 修改讨论
            injectRunAllTestButton();
            injectCreateGroupInterceptor();
            injectDiscussionListEditButtons();
            injectResubmitButtons();
        };
        tryInject();
        new MutationObserver(tryInject).observe(document.documentElement, { childList: true, subtree: true });
        // API 监听
        hookDiscussionListResponses();
        hookTestJudgeLanguage();
        // 题目收藏：注入星标 + 收藏面板
        let _favTimer = null;
        const scheduleFavSetup = () => {
            if (_favTimer) return;
            _favTimer = setTimeout(() => {
                _favTimer = null;
                setupFavorites();
            }, 400);
        };
        // 神秘的条纹表格
        removeRowStripe();
        const stripeObserver = new MutationObserver(removeRowStripe);
        stripeObserver.observe(document.body, { childList: true, subtree: true });
        scheduleFavSetup();
        new MutationObserver(scheduleFavSetup).observe(document.body, { childList: true, subtree: true });
        startDiscussionObserver();
        let _rankTagDebounce = null;
        function scheduleRankTag() {
            if (_rankTagDebounce) clearTimeout(_rankTagDebounce);
            _rankTagDebounce = setTimeout(() => {
                _rankTagDebounce = null;
                injectRankTag();
            }, 500);
        }
        injectBackToOldBtn();
        new MutationObserver(() => {
            injectBackToOldBtn();
        }).observe(document.body, { childList: true, subtree: true });

        // 主题库卡片渲染出 #pick-one 后 → 注入「题目推荐」按钮
        new MutationObserver(() => {
            if (document.getElementById('pick-one')) {
                injectRecommendButton();
            }
        }).observe(document.body, { childList: true, subtree: true });
        // 菜单栏布局：初次 + 兜底轮询
        scheduleApplyNavbarLayout(300);
        setInterval(() => {
            scheduleApplyNavbarLayout(0);
        }, 3000);
        initSnippetHotkeys();
        syncAutoSaveCode();
        getTagfromRemote();
        // 油猴指令
        registerMenuCommands();
        WebI18n.onChange(() => {
            registerMenuCommands();
        });
        // URL 变化监听
        let lastUrl = '';
        const onUrlChange = () => {
            if (window.location.href === lastUrl) return;
            lastUrl = window.location.href;

            const isProblemPage =
                  /^\/problem\/[^\/?#]+/.test(window.location.pathname) ||
                  /^\/training\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname) ||
                  /^\/contest\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname) ||
                  /^\/group\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname);

            if (isProblemPage) {
                setTimeout(autoFetchProblemInfo, 800);
                // 推荐按钮：注入到 #pick-one 之后（题库页）
                if (document.getElementById('pick-one')) {
                    setTimeout(injectRecommendButton, 1200);
                }
                setTimeout(syncAutoSaveCode, 1200);
            } else {
                const old = document.getElementById('hoj-recommendations-panel');
                if (old) old.remove();
                stopAutoSaveCode();
            }
            /* ---------- 题目页：注入 submit override ---------- */
            if (isProblemPage) {
                injectProblemSubmitOverride();
                setTimeout(injectProblemSubmitOverride, 800);
            } else {
                // 离开题目页 → 重置标记，下次回来重新注入
                _hojLastInjectedUrl = '';
            }
            // 提交详情页 注入"查看代码"按钮
            if (/\/submission-detail\/[^\/?#]+/.test(window.location.pathname)) {
                setTimeout(injectCodeButtonIntoStatus, 800);
            }
            /* 讨论列表页 一变化就立刻清掉旧的编辑/删除按钮 */
            if (/^\/discussion(\/|$|\?)/.test(window.location.pathname)
                || /^\/group\/[^\/]+\/discussion(\/|$)/.test(window.location.pathname)) {
                clearDiscussionListButtons();
            }

            if (isRankPage()) {
                _currentUsername = null;
                clearTagCache();
                scheduleRankTag();
                startRankTableObserver();
            } else if (isUserHomePage()) {
                clearTagCache();
                clearUserHomeTags();
                setTimeout(injectUserHomeTag, 500);
            } else {
                clearRankTags();
                stopRankTableObserver();
            }

            if (!isDiscussionDetailPage()) {
                cleanupDiscussionLikeButtons();
            }
            if (!isNewDiscussionPage()) {
                cleanupNewDiscussionLikeButtons();
            }
        };
        onUrlChange();
        setInterval(onUrlChange, 1000);
        // Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSettingsPanel();
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
    console.log('[BetterHOJ] 脚本已启动');
})();

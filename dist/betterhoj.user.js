// ==UserScript==
// @name          Better HOJ
// @namespace     http://tampermonkey.net/
// @icon          https://docs.hdoi.cn/logo.png
// @version       27.3.7
// @description   优化了 HOJ。
// @author        longStone
// @license       CC BY-NC-SA
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
// @run-at        document-body
// @require      https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/highlight.js/11.9.0/highlight.min.js
// @resource     hoj-font-forgetica   https://db.onlinewebfonts.com/c/eb08ac6d35598e6ced424eb52373a55a?family=Sans+Forgetica+Regular
// @resource     hoj-font-google   https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=JetBrains+Mono&family=Fira+Code:wght@300..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap
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
"use strict";var BetterHOJ=(()=>{var Gr=Object.defineProperty;var a=(e,t)=>Gr(e,"name",{value:t,configurable:!0});var O=(e,t)=>()=>(e&&(t=e(e=0)),t);var Z=(e,t)=>{for(var o in t)Gr(e,o,{get:t[o],enumerable:!0})};function ms(e){if(typeof e!="string")return null;let t=e.trim();if(!t)return null;for(let n=0;n<2;n++)(t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'"))&&(t=t.slice(1,-1));if(t=t.trim(),Ur.includes(t))return t;let o=t.toLowerCase();for(let n of Ur)if(n.toLowerCase()===o)return n;return null}function so(){try{let e=localStorage.getItem(Jr);return ms(e)||io}catch{return io}}function gs(e){bn.forEach(t=>{try{t(e)}catch(o){console.warn("[i18n] listener error:",o)}})}function ao(){let e=so();e!==Qe&&(Qe=e,console.log("[i18n] 语言切换 →",e),gs(e))}function bs(){Qe=so(),console.log("[i18n] "+Qe),Vr||(Vr=window.setInterval(ao,hs)),window.addEventListener("storage",e=>{e.key===Jr&&ao()}),document.addEventListener("visibilitychange",()=>{document.hidden||ao()})}function E(e,t){return f.t(e,t)}function De(e){return typeof e=="string"&&e.startsWith("@")?f.t(e.slice(1)):e==null?"":String(e)}var ro,Jr,Ur,io,hs,bn,Qe,Vr,f,K=O(()=>{"use strict";ro={"zh-CN":{"api.networkError":"网络错误：{msg}","api.httpError":"HTTP 错误：{code}","api.jsonError":"响应不是合法 JSON","api.bizError":"请求失败（{code}）","panel.title":"Better HOJ","panel.importExport":"导入导出","panel.close":"关闭","panel.lang":"语言","better.title":"Better HOJ 27 设置 by longStone","better.login":"自动登录","login.enable":"启用自动登录","login.username":"默认用户名","login.password":"默认密码","login.manual":"手动登录","login.clear":"清除登录状态","better.problemTools":"题目工具","fav.clear":"清空所有收藏","autosave.enable":"启用自动保存","autosave.interval":"保存频率","autosave.15":"15 秒","autosave.30":"30 秒","autosave.60":"1 分钟","autosave.120":"2 分钟","autosave.300":"5 分钟","cph.realurl":"CPH：使用真链接（CF）","better.redirect":"重定向","redirect.enable":"启用重定向","redirect.target":"重定向目标","redirect.host1":"ssf.hdoi.cn（外网）","redirect.host2":"oi.cnuschool.org.cn（内网）","redirect.host3":"172.16.21.199（内网 IP）","better.checkin":"每日签到","checkin.enable":"启用签到","checkin.popup":"签到后自动弹窗","checkin.luck":"今日运势","checkin.do":"立即签到","checkin.refresh":"刷新状态","better.tag":"个人标签","tag.text":"标签文字","tag.color":"标签颜色","tag.refresh":"刷新云端标签","tag.push":"重新上传当前标签","tag.delete":"清除云端标签","better.tools":"小组件","tools.enable":"启用小组件","tools.keystroke":"按键显示","tools.time":"今日使用时长","tools.clock":"时钟","better.rec":"题目推荐","rec.cfname":"Codeforces 用户名","better.navbar":"菜单栏","navbar.config":"配置菜单栏布局","better.snippet":"片段","snippet.hotkey":"唤出面板快捷键","snippet.manage":"管理片段","snippet.open":"打开片段面板","better.about":"关于","about.showVersion":"显示版本信息","about.version":"版本","perf.enable":"高性能模式","perf.hint":"关闭弹窗淡出动画与背景模糊，低性能设备上更流畅","about.copyVersionHint":"点击复制版本信息","about.copied":"已复制：{v}","about.copyFailed":"复制失败","panel.fullscreen":"全屏显示","smart.title":"Smart HOJ 27 设置 by OIerZhang","smart.enable":"启用 Smart HOJ","smart.general":"通用","general.smoothScroll":"平滑滚动","general.smoothSwitch":"平滑的页面过渡","general.dark":"深色模式","general.mouseGlow":"鼠标光晕（需要重新加载）","general.liquidGlass":"液态玻璃 UI","general.better404":"更好的 404 页面","general.hideNew":"隐藏体验新版","smart.background":"背景","bg.source":"内置背景来源","bg.builtin":"内置背景","bg.custom":"自定义背景 URL","smart.card":"卡片","card.bg":"卡片背景","card.blur":"卡片模糊","card.radius":"卡片圆角","smart.list":"列表","list.bg":"列表背景","list.bgGreen":"列表背景绿","list.bgHover":"列表 hover","smart.code":"代码块","code.bg":"代码块背景","code.radius":"代码块圆角","smart.input":"输入框","input.bg":"输入框背景","input.radius":"输入框圆角","smart.button":"按钮","button.bg":"按钮背景","button.hover":"按钮 hover","button.active":"按钮 active","button.radius":"按钮圆角","smart.misc":"其他","misc.tagRadius":"Tag 圆角","misc.tooltipBg":"提示框背景","misc.tooltipRadius":"提示框圆角","misc.judgeRadius":"评测色块圆角","smart.text":"文字","text.dark":"深色文字","text.darkDisabled":"禁用文字","text.light":"浅色文字","text.blue":"蓝色文字","text.link":"链接颜色","text.select":"选中文字背景","smart.font":"字体","font.memorizing":"易于记忆的字体","font.sans":"无衬线字体","font.mono":"等宽字体","navbar.title":"菜单栏布局","navbar.hint":"拖动行来调整顺序，勾选控制是否显示。改动实时生效。","navbar.reset":"恢复默认","navbar.reset.confirm.title":"确认恢复默认？","navbar.reset.confirm.body":"将重置菜单栏的顺序与显示状态。","navbar.reset.confirm.ok":"确认","navbar.resetConfirm.title":"确认恢复默认？","navbar.resetConfirm.body":"将重置菜单栏的顺序与显示状态。","nav.item.logo":"Logo","nav.item.home":"首页","nav.item.problems":"题目","nav.item.training":"训练","nav.item.contest":"比赛","nav.item.submission":"评测","nav.item.rank":"排名","nav.item.discussion":"讨论","nav.item.team":"团队","nav.item.about":"关于","nav.item.newui":"体验新版","dialog.tip":"提示","dialog.confirm":"确定","dialog.cancel":"取消","dialog.close":"关闭","dialog.warning":"警告","dialog.error":"错误","dialog.success":"成功","dialog.info":"信息","action.delete":"删除","action.remove":"移除","action.add":"添加","action.edit":"编辑","action.save":"保存","action.ok":"确定","action.cancel":"取消","action.retry":"重试","action.yes":"是","action.no":"否","login.autoSuccess":"已自动登录，页面将重新加载","login.autoFailed":"自动登录失败，请手动登录","login.manualLogging":"正在登录","login.clearConfirm":"将清除当前登录信息，是否继续？","login.cleared":"已清除本地登录态","fav.clearConfirm.title":"确认操作","fav.clearConfirm.body":"确定要清空所有收藏吗？","fav.cleared":"已清空所有收藏","fav.added":"已收藏：","fav.removed":"已取消收藏：","tag.refreshed":"已刷新：{name}","tag.noRemote":"云端无标签或请求失败","tag.needText":"请先填写标签文字","tag.uploaded":"已上传标签","tag.clearConfirm.title":"确认清除","tag.clearConfirm.body":"将同时删除云端记录和本地配置，确定继续？","tag.cleared":"已清除标签","tag.clearFailed":"清除失败：{msg}","checkin.disabled":"签到功能已禁用","checkin.queryFailed":"查询签到状态失败","checkin.failed":"签到失败，请稍后再试","checkin.notChecked":"今日尚未签到","checkin.alreadyChecked":"今日已签到：{luck} —— {result}","checkin.resultTitle":"签到成功","checkin.alreadyTitle":"今日已签到","checkin.acceptGoodLuck":"收下好运","ie.importTitle":"导入 / 导出","ie.tabExport":"导出","ie.tabImport":"导入","ie.presetAll":"全部","ie.presetSmart":"仅 Smart HOJ","ie.presetBetter":"仅 Better HOJ","ie.presetFavorites":"仅收藏","ie.presetSnippet":"仅代码片段","ie.exportBtn":"导出","ie.importBtn":"导入","ie.pickFile":"选择文件…","ie.resetDefaults":"恢复默认配置","ie.backToPick":"← 重新选择","ie.selectAtLeastOne":"请至少选择一项","ie.importSuccess":"已导入：{details}","ie.exportSuccess":"已导出：{details}","ie.parseFailed":"文件解析失败：{msg}","ie.noContent":"文件中没有可用的内容","ie.fileFormatError":"文件格式不正确","ie.pickHint":"选择一个由 Better HOJ 导出的 JSON 文件。","ie.favorites":"题目收藏","ie.snippets":"代码片段","ie.sensitiveHidden":"已设置（导出时将包含原值）","ie.sensitiveEmpty":"未设置","ie.pickHintTitle":"选择一个由 Better HOJ 支持的配置文件。","ie.pickHintDetail":"导入会覆盖当前对应配置项；题目收藏会按题目 ID 去重合并。","ie.chosenFile":"已选择：{name}","ie.fileKindDefaults":"默认配置","ie.fileKindSettings":"旧版配置文件","ie.fileKindFavorites":"收藏列表文件","ie.fileKindMixed":"新版配置文件","ie.fileKindUnknown":"无法识别","ie.versionOld":"⚠️ 该文件来自旧版本 {v}（当前 {cur}）","ie.versionNew":"⚠️ 该文件来自新版本 {v}（当前 {cur}）","ie.versionSame":"✔ 版本一致（{cur}）","ie.versionMissing":"该文件未包含版本信息","ie.ignoredCount":"忽略了 {n} 项无法识别的设置","ie.favCount":"{n} 条","ie.favCountNew":"{n} 条（新增 {added}）","ie.snippetMergeTip":"代码片段将合并导入：现有 {exist} 条，将新增 {add} 条、更新 {upd} 条。","ie.exportedSummary":"已导出：{keys} 项配置{extra}","ie.exportedExtraFav":"，{n} 条收藏","ie.importedSummary":"已导入：{parts}","ie.importedKeysPart":"{n} 项配置","ie.importedSnippetPart":"代码片段（{seg}）","ie.importedSnippetAdd":"新增 {n}","ie.importedSnippetUpd":"更新 {n}","ie.importedFavPart":"新增 {n} 条收藏","snippet.applyFailed":"未找到输入位置","snippet.inserted":"已插入：{name}","snippet.nameRequired":"请填写名称","snippet.contentRequired":"请填写内容","snippet.hotkeyConflict":"快捷键与「{name}」冲突","snippet.hotkeyConflictPanel":"快捷键与「唤出面板」冲突","snippet.saved":"已保存","snippet.deleteConfirm":"确定删除片段「{name}」？","update.available":"发现新版本","update.current":"当前版本","update.latest":"最新版本","update.date":"发布日期","update.changelog":"更新内容","update.noChangelog":"无更新日志","update.gotoDownload":"前往下载","update.later":"稍后再说","update.urgent":"❌ 重要更新，请尽快更新以获取最新功能与修复。","update.normal":"⚠️ 新版推出，建议尽快更新。","group.general":"通用开关","group.background":"背景","group.card":"卡片","group.list":"列表","group.code":"代码块","group.codeBlock":"代码块","group.input":"输入框","group.button":"按钮","group.misc":"其他样式","group.text":"文字颜色","group.font":"字体","group.version":"版本信息","group.perf":"性能","group.login":"登录","group.checkin":"签到","group.redirect":"重定向","group.tag":"自定义标签","group.cph":"CPH","group.tools":"小组件","group.vscode":"VS Code 编辑器","group.recommend":"题目推荐","group.navbar":"菜单栏布局","group.snippet":"代码片段","group.other":"其他","checkin.btn":"签到","checkin.btnDone":"已签到","checkin.btnTitle":"每日签到","menu.openSettings":"Better HOJ · 打开设置面板","menu.toggleDarkMode":"Better HOJ · 切换深色模式","menu.darkOn":"深色模式已开启","menu.darkOff":"深色模式已关闭","menu.toggleSmartHoj":"Better HOJ · 切换 Smart HOJ 总开关","menu.smartOn":"Smart HOJ 已启用","menu.smartOff":"Smart HOJ 已禁用","menu.openSnippetPanel":"Better HOJ · 打开片段面板","menu.manageSnippets":"Better HOJ · 管理片段","menu.importExport":"Better HOJ · 导入 / 导出","menu.togglePanelFullscreen":"Better HOJ · 切换设置面板全屏","discussion.new":"发布讨论","discussion.category":"分类","discussion.title":"标题","discussion.titlePlaceholder":"请输入标题","discussion.content":"内容","discussion.contentPlaceholder":"支持 Markdown，可插入代码块、表格、公式…","discussion.publish":"发布","discussion.publishing":"发布中…","discussion.categoryRequired":"请选择分类","discussion.titleRequired":"请填写标题","discussion.contentRequired":"请填写内容","discussion.publishSuccess":"发布成功","discussion.publishFailed":"发布失败：{msg}","discussion.loadCategoriesFailed":"无法获取讨论分类","discussion.loadEditorFailed":"编辑器加载失败，请检查网络","discussion.initEditorFailed":"编辑器初始化失败","discussion.editorNotReady":"编辑器尚未就绪","discussion.description":"简介","discussion.descriptionPlaceholder":"一句话概括帖子内容（将显示在列表页）","discussion.descriptionRequired":"请填写简介","discussion.advanced":"高级选项","discussion.advancedHint":"以下字段通常不需要修改，如需调试再展开。","discussion.role":"角色","discussion.viewNum":"浏览量","discussion.likeNum":"点赞数","discussion.commentNum":"评论数","discussion.topPriority":"置顶","discussion.roleUser":"user","discussion.roleAdmin":"admin","discussion.roleRoot":"root","discussion.edit":"编辑讨论","discussion.delete":"删除","discussion.deleteConfirmTitle":"确认删除","discussion.deleteConfirmBody":"确定要删除该讨论吗？此操作不可撤销。","discussion.deleteSuccess":"删除成功","discussion.deleteFailed":"删除失败：{msg}","discussion.save":"保存","discussion.saving":"保存中…","discussion.saveSuccess":"保存成功","discussion.saveFailed":"保存失败：{msg}","discussion.loadDetailFailed":"无法获取讨论详情","discussion.forceUpdate":"强制更新","discussion.forceUpdateHint":"默认更新不会覆盖原作者，点赞数等信息，启用后会","discussion.bindProblem":"绑定题目","discussion.bindProblemPlaceholder":"选填，输入题目 ID（如 A001）","group.createTitle":"创建团队","group.name":"团队名称","group.namePlaceholder":"不超过 10 个字符","group.nameRequired":"请填写团队名称","group.nameTooLong":"团队名称不超过 25 个字符","group.shortName":"团队简称","group.shortNamePlaceholder":"选填，不超过 10 个字符","group.shortNameTooLong":"团队简称不超过 10 个字符","group.brief":"团队简介","group.briefPlaceholder":"选填，一句话概括（不超过 50 字）","group.briefTooLong":"团队简介不超过 50 个字符","group.description":"团队介绍","group.descriptionPlaceholder":"支持 Markdown，可写团队规则、活动计划等","group.descriptionRequired":"请填写团队介绍","group.auth":"加入权限","group.auth.public":"公开团队","group.auth.publicTip":"加入无需申请","group.auth.protected":"保护团队","group.auth.protectedTip":"加入需要申请","group.auth.private":"私有团队","group.auth.privateTip":"需要邀请码才能申请","group.inviteCode":"邀请码","group.codePlaceholder":"私有团队可选填，用户申请时需提供","group.visible":"公开可见","group.visibleHint":"关闭后团队不会出现在团队列表中","group.create":"创建","group.creating":"创建中…","group.createSuccess":"团队创建成功","group.createFailed":"团队创建失败：{msg}","group.visiblePublic":"公开","group.visibleHidden":"隐藏","group.visibleHintPublic":"团队将在团队列表中公开可见","group.visibleHintHidden":"团队将从团队列表中隐藏，仅成员可通过链接访问","better.vditor":"Vditor","better.vscode":"VS Code 编辑器","vscode.enable":"启用 VS Code 编辑器","vscode.theme":"主题","vscode.fontSize":"字体大小","vscode.tabSize":"Tab 长度","vscode.openDialog":"打开编辑器设置","vditor.publishOverride":"讨论发布覆盖","vditor.editOverride":"讨论编辑覆盖","vditor.groupCreateOverride":"创建团队覆盖","vditor.uploadMode":"图片 / 文件上传","vditor.uploadModeDisabled":"不启用","vditor.uploadModeAdmin":"网站管理员","vditor.uploadModeGroup":"团队管理员","vditor.uploadGid":"团队 ID","vditor.uploadImage":"上传图片","vditor.uploadFile":"上传文件","vditor.uploadDisabled":"未启用上传功能","vditor.uploadNoGid":"请先在设置中填写团队 ID","vditor.uploadFailed":"上传失败：{msg}","vditor.uploadNoLink":"服务器未返回文件链接","testjudge.runAll":"全部自测","testjudge.running":"全部自测中…","testjudge.progress":"进度 {done} / {total}","testjudge.noSamples":"该题目没有可用的示例","testjudge.noCode":"请先编写代码","testjudge.noEditor":"未找到编辑器","testjudge.noProblem":"题目信息尚未加载","testjudge.submitFailed":"提交失败：{msg}","testjudge.pollTimeout":"等待结果超时","testjudge.result":"结果","testjudge.time":"时间","testjudge.memory":"内存","testjudge.input":"输入","testjudge.expected":"预期输出","testjudge.actual":"实际输出","testjudge.stderr":"错误输出","testjudge.pending":"等待中","testjudge.runningOne":"评测中","testjudge.pass":"通过","testjudge.fail":"失败","testjudge.error":"错误","testjudge.summary":"通过 {pass} / {total}","testjudge.cancel":"停止","testjudge.compileError":"编译错误，已停止后续测试","testjudge.skipped":"已跳过","testjudge.alertStopped":"已停止测试","testjudge.alertCompileError":"编译错误，已停止后续测试","testjudge.alertDetail":"已通过 {pass} / {total}（跑完 {done} 个）","submit.chooseLang":"选择语言","submit.noCode":"请先编写代码","submit.submitting":"提交中…","submit.success":"提交成功","submit.failed":"提交失败：{msg}","resubmit.success":"已发起重测","resubmit.failed":"重测失败：{msg}"},"en-US":{"api.networkError":"Network error: {msg}","api.httpError":"HTTP error: {code}","api.jsonError":"Response is not valid JSON","api.bizError":"Request failed ({code})","panel.title":"Better HOJ","panel.importExport":"Import / Export","panel.close":"Close","panel.lang":"Language","better.title":"Better HOJ 27 Settings by longStone","better.login":"Auto Login","login.enable":"Enable auto login","login.username":"Username","login.password":"Password","login.manual":"Login now","login.clear":"Clear login state","better.problemTools":"Problem Tools","fav.clear":"Clear all favorites","autosave.enable":"Enable auto save","autosave.interval":"Interval","autosave.15":"15 seconds","autosave.30":"30 seconds","autosave.60":"1 minute","autosave.120":"2 minutes","autosave.300":"5 minutes","cph.realurl":"CPH: Use real link (CF)","better.redirect":"Redirect","redirect.enable":"Enable redirect","redirect.target":"Redirect target","redirect.host1":"ssf.hdoi.cn (public)","redirect.host2":"oi.cnuschool.org.cn (intranet)","redirect.host3":"172.16.21.199 (intranet IP)","better.checkin":"Daily Check-in","checkin.enable":"Enable check-in","checkin.popup":"Popup after check-in","checkin.luck":"Today's fortune","checkin.do":"Check in","checkin.refresh":"Refresh","better.tag":"Personal Tag","tag.text":"Tag text","tag.color":"Tag color","tag.refresh":"Refresh cloud tag","tag.push":"Re-upload tag","tag.delete":"Delete cloud tag","better.tools":"Desktop Widgets","tools.enable":"Enable widgets","tools.keystroke":"Keystroke display","tools.time":"Usage time today","tools.clock":"Clock","better.rec":"Problem Recommend","rec.cfname":"Codeforces username","better.navbar":"Navbar","navbar.config":"Configure navbar layout","better.snippet":"Snippets","snippet.hotkey":"Panel hotkey","snippet.manage":"Manage snippets","snippet.open":"Open snippet panel","better.about":"About","about.showVersion":"Show version info","about.version":"Version","perf.enable":"Performance mode","perf.hint":"Disable dialog fade-out and background blur for smoother rendering on low-end devices","about.copyVersionHint":"Click to copy version info","about.copied":"Copied: {v}","about.copyFailed":"Copy failed","panel.fullscreen":"Fullscreen","smart.title":"Smart HOJ 27 Settings by OIerZhang","smart.enable":"Enable Smart HOJ","smart.general":"General","general.smoothScroll":"Smooth scroll","general.smoothSwitch":"Smooth page transitions","general.dark":"Dark mode","general.mouseGlow":"Mouse glow (requires reload)","general.liquidGlass":"Liquid Glass UI","general.better404":"Better 404 page","general.hideNew":'Hide "体验新版"',"smart.background":"Background","bg.source":"Background source","bg.builtin":"Builtin background","bg.custom":"Custom background URL","smart.card":"Card","card.bg":"Card background","card.blur":"Card blur","card.radius":"Card radius","smart.list":"List","list.bg":"List background","list.bgGreen":"List green background","list.bgHover":"List hover","smart.code":"Code Block","code.bg":"Code background","code.radius":"Code radius","smart.input":"Input","input.bg":"Input background","input.radius":"Input radius","smart.button":"Button","button.bg":"Button background","button.hover":"Button hover","button.active":"Button active","button.radius":"Button radius","smart.misc":"Misc","misc.tagRadius":"Tag radius","misc.tooltipBg":"Tooltip background","misc.tooltipRadius":"Tooltip radius","misc.judgeRadius":"Judge block radius","smart.text":"Text","text.dark":"Dark text","text.darkDisabled":"Disabled text","text.light":"Light text","text.blue":"Blue text","text.link":"Link color","text.select":"Selection background","smart.font":"Font","font.memorizing":"Memorizing font","font.sans":"Sans-serif font","font.mono":"Mono font","navbar.title":"Navbar Layout","navbar.hint":"Drag to reorder, uncheck to hide. Changes take effect immediately.","navbar.reset":"Reset to default","navbar.reset.confirm.title":"Reset to default?","navbar.reset.confirm.body":"This will reset the order and visibility of the navbar.","navbar.reset.confirm.ok":"Confirm","navbar.resetConfirm.title":"Reset to default?","navbar.resetConfirm.body":"This will reset the order and visibility of the navbar.","nav.item.logo":"Logo","nav.item.home":"Home","nav.item.problems":"Problem","nav.item.training":"Training","nav.item.contest":"Contest","nav.item.submission":"Status","nav.item.rank":"Rank","nav.item.discussion":"Discussion","nav.item.team":"Group","nav.item.about":"About","nav.item.newui":"体验新版","dialog.tip":"Notice","dialog.confirm":"OK","dialog.cancel":"Cancel","dialog.close":"Close","dialog.warning":"Warning","dialog.error":"Error","dialog.success":"Success","dialog.info":"Info","action.delete":"Delete","action.remove":"Remove","action.add":"Add","action.edit":"Edit","action.save":"Save","action.ok":"OK","action.cancel":"Cancel","action.retry":"Retry","action.yes":"Yes","action.no":"No","login.autoSuccess":"Auto-login successful, reloading…","login.autoFailed":"Auto-login failed, please sign in manually","login.manualLogging":"Signing in…","login.clearConfirm":"This will clear your current login state. Continue?","login.cleared":"Local login state cleared","fav.clearConfirm.title":"Confirm","fav.clearConfirm.body":"Clear all favorites?","fav.cleared":"All favorites cleared","fav.added":"Added to favorites: ","fav.removed":"Removed from favorites: ","tag.refreshed":"Refreshed: {name}","tag.noRemote":"No remote tag or request failed","tag.needText":"Please enter tag text first","tag.uploaded":"Tag uploaded","tag.clearConfirm.title":"Confirm deletion","tag.clearConfirm.body":"This will delete both the cloud record and the local config. Continue?","tag.cleared":"Tag cleared","tag.clearFailed":"Clear failed: {msg}","checkin.disabled":"Check-in is disabled","checkin.queryFailed":"Failed to query check-in status","checkin.failed":"Check-in failed, please try again later","checkin.notChecked":"Not checked in today","checkin.alreadyChecked":"Checked in today: {luck} — {result}","checkin.resultTitle":"Check-in successful","checkin.alreadyTitle":"Already checked in today","checkin.acceptGoodLuck":"Got it","ie.importTitle":"Import / Export","ie.tabExport":"Export","ie.tabImport":"Import","ie.presetAll":"All","ie.presetSmart":"Smart HOJ only","ie.presetBetter":"Better HOJ only","ie.presetFavorites":"Favorites only","ie.presetSnippet":"Snippets only","ie.exportBtn":"Export","ie.importBtn":"Import","ie.pickFile":"Choose file…","ie.resetDefaults":"Reset to defaults","ie.backToPick":"← Choose another","ie.selectAtLeastOne":"Please select at least one item","ie.importSuccess":"Imported: {details}","ie.exportSuccess":"Exported: {details}","ie.parseFailed":"File parse failed: {msg}","ie.noContent":"No valid content in file","ie.fileFormatError":"Invalid file format","ie.pickHint":"Choose a JSON file exported by Better HOJ.","ie.favorites":"Favorites","ie.snippets":"Snippets","ie.sensitiveHidden":"Set (real value will be exported)","ie.sensitiveEmpty":"Not set","ie.pickHintTitle":"Choose a config file exported by Better HOJ.","ie.pickHintDetail":"Importing will overwrite the corresponding config items; favorites are merged by problem ID.","ie.chosenFile":"Selected: {name}","ie.fileKindDefaults":"Default config","ie.fileKindSettings":"Legacy settings file","ie.fileKindFavorites":"Favorites file","ie.fileKindMixed":"Settings + favorites file","ie.fileKindUnknown":"Unrecognized","ie.versionOld":"⚠️ File is from an older version {v} (current {cur})","ie.versionNew":"⚠️ File is from a newer version {v} (current {cur})","ie.versionSame":"✔ Version matches ({cur})","ie.versionMissing":"File does not contain version info","ie.ignoredCount":"Ignored {n} unrecognized setting(s)","ie.favCount":"{n} items","ie.favCountNew":"{n} items ({added} new)","ie.snippetMergeTip":"Snippets will be merged: {exist} existing, {add} new, {upd} updated.","ie.exportedSummary":"Exported: {keys} config item(s){extra}","ie.exportedExtraFav":", {n} favorite(s)","ie.importedSummary":"Imported: {parts}","ie.importedKeysPart":"{n} config item(s)","ie.importedSnippetPart":"snippets ({seg})","ie.importedSnippetAdd":"{n} new","ie.importedSnippetUpd":"{n} updated","ie.importedFavPart":"{n} favorite(s) added","snippet.applyFailed":"No input position found","snippet.inserted":"Inserted: {name}","snippet.nameRequired":"Name is required","snippet.contentRequired":"Content is required","snippet.hotkeyConflict":'Hotkey conflicts with "{name}"',"snippet.hotkeyConflictPanel":"Hotkey conflicts with the panel hotkey","snippet.saved":"Saved","snippet.deleteConfirm":'Delete snippet "{name}"?',"update.available":"New version available","update.current":"Current version","update.latest":"Latest version","update.date":"Release date","update.changelog":"Changelog","update.noChangelog":"No changelog","update.gotoDownload":"Download","update.later":"Later","update.urgent":"❌ Critical update. Please update as soon as possible.","update.normal":"⚠️ A new version is available. We recommend updating.","group.general":"General","group.background":"Background","group.card":"Card","group.list":"List","group.code":"Code Block","group.codeBlock":"Code Block","group.input":"Input","group.button":"Button","group.misc":"Misc Styles","group.text":"Text Colors","group.font":"Font","group.version":"Version Info","group.perf":"Performance","group.login":"Login","group.checkin":"Check-in","group.redirect":"Redirect","group.tag":"Custom Tag","group.cph":"CPH","group.tools":"Widgets","group.vscode":"VS Code Editor","group.recommend":"Problem Recommend","group.navbar":"Navbar Layout","group.snippet":"Snippets","group.other":"Other","checkin.btn":"Check in","checkin.btnDone":"Checked in","checkin.btnTitle":"Daily check-in","menu.openSettings":"Better HOJ · Open settings","menu.toggleDarkMode":"Better HOJ · Toggle dark mode","menu.darkOn":"Dark mode enabled","menu.darkOff":"Dark mode disabled","menu.toggleSmartHoj":"Better HOJ · Toggle Smart HOJ master switch","menu.smartOn":"Smart HOJ enabled","menu.smartOff":"Smart HOJ disabled","menu.openSnippetPanel":"Better HOJ · Open snippet panel","menu.manageSnippets":"Better HOJ · Manage snippets","menu.importExport":"Better HOJ · Import / Export","menu.togglePanelFullscreen":"Better HOJ · Toggle settings panel fullscreen","discussion.new":"New Discussion","discussion.category":"Category","discussion.title":"Title","discussion.titlePlaceholder":"Enter a title","discussion.content":"Content","discussion.contentPlaceholder":"Markdown supported — code blocks, tables, formulas…","discussion.publish":"Publish","discussion.publishing":"Publishing…","discussion.categoryRequired":"Please select a category","discussion.titleRequired":"Please enter a title","discussion.contentRequired":"Please enter content","discussion.publishSuccess":"Published successfully","discussion.publishFailed":"Publish failed: {msg}","discussion.loadCategoriesFailed":"Failed to load discussion categories","discussion.loadEditorFailed":"Failed to load editor","discussion.initEditorFailed":"Failed to initialize editor","discussion.editorNotReady":"Editor is not ready","discussion.description":"Summary","discussion.descriptionPlaceholder":"One-line summary shown in the list","discussion.descriptionRequired":"Please enter a summary","discussion.advanced":"Advanced options","discussion.advancedHint":"Usually no need to change. Expand only for debugging.","discussion.role":"Role","discussion.viewNum":"Views","discussion.likeNum":"Likes","discussion.commentNum":"Comments","discussion.topPriority":"Pinned","discussion.roleUser":"user","discussion.roleAdmin":"admin","discussion.roleRoot":"root","discussion.edit":"Edit Discussion","discussion.delete":"Delete","discussion.deleteConfirmTitle":"Confirm delete","discussion.deleteConfirmBody":"Delete this discussion? This cannot be undone.","discussion.deleteSuccess":"Deleted","discussion.deleteFailed":"Delete failed: {msg}","discussion.save":"Save","discussion.saving":"Saving…","discussion.saveSuccess":"Saved successfully","discussion.saveFailed":"Save failed: {msg}","discussion.loadDetailFailed":"Failed to load discussion","discussion.forceUpdate":"ForceUpdate","discussion.forceUpdateHint":"Uses PUT by default; check to use POST (for debugging)","discussion.bindProblem":"Bind Problem","discussion.bindProblemPlaceholder":"Optional, problem ID (e.g. A001)","group.createTitle":"Create Group","group.name":"Group name","group.namePlaceholder":"Up to 10 characters","group.nameRequired":"Group name is required","group.nameTooLong":"Group name must be at most 25 characters","group.shortName":"Short name","group.shortNamePlaceholder":"Optional, up to 10 characters","group.shortNameTooLong":"Short name must be at most 10 characters","group.brief":"Summary","group.briefPlaceholder":"Optional, one-line summary (max 50 chars)","group.briefTooLong":"Summary must be at most 50 characters","group.description":"Description","group.descriptionPlaceholder":"Markdown supported — rules, plans, etc.","group.descriptionRequired":"Description is required","group.auth":"Join policy","group.auth.public":"Public","group.auth.publicTip":"Join without approval","group.auth.protected":"Protected","group.auth.protectedTip":"Approval required","group.auth.private":"Private","group.auth.privateTip":"Invite code required","group.inviteCode":"Invite code","group.codePlaceholder":"Optional for private groups","group.visible":"Publicly visible","group.visibleHint":"If off, the group is hidden from the group list","group.create":"Create","group.creating":"Creating…","group.createSuccess":"Group created","group.createFailed":"Group creation failed: {msg}","group.visiblePublic":"Public","group.visibleHidden":"Hidden","group.visibleHintPublic":"The group will be listed publicly","group.visibleHintHidden":"The group will be hidden from the list; only members can access via link","better.vditor":"Vditor","better.vscode":"VS Code Editor","vscode.enable":"Enable VS Code editor","vscode.theme":"Theme","vscode.fontSize":"Font size","vscode.tabSize":"Tab size","vscode.openDialog":"Open editor settings","vditor.publishOverride":"Override discussion publish","vditor.editOverride":"Override discussion edit","vditor.groupCreateOverride":"Override create group","vditor.uploadMode":"Image / File upload","vditor.uploadModeDisabled":"Disabled","vditor.uploadModeAdmin":"Site admin","vditor.uploadModeGroup":"Group admin","vditor.uploadGid":"Group ID","vditor.uploadImage":"Upload image","vditor.uploadFile":"Upload file","vditor.uploadDisabled":"Upload is not enabled","vditor.uploadNoGid":"Please set the group ID in settings first","vditor.uploadFailed":"Upload failed: {msg}","vditor.uploadNoLink":"Server returned no link","testjudge.runAll":"Test All","testjudge.running":"Running all tests…","testjudge.progress":"Progress {done} / {total}","testjudge.noSamples":"This problem has no samples","testjudge.noCode":"Please write some code first","testjudge.noEditor":"Editor not found","testjudge.noProblem":"Problem info not loaded","testjudge.submitFailed":"Submit failed: {msg}","testjudge.pollTimeout":"Timed out waiting for result","testjudge.result":"Result","testjudge.time":"Time","testjudge.memory":"Memory","testjudge.input":"Input","testjudge.expected":"Expected","testjudge.actual":"Actual","testjudge.stderr":"stderr","testjudge.pending":"Pending","testjudge.runningOne":"Running","testjudge.pass":"Pass","testjudge.fail":"Fail","testjudge.error":"Error","testjudge.summary":"{pass} / {total} passed","testjudge.cancel":"Stop","testjudge.compileError":"Compile error — remaining tests stopped","testjudge.skipped":"Skipped","testjudge.alertStopped":"Testing stopped","testjudge.alertCompileError":"Compile error — remaining tests stopped","testjudge.alertDetail":"Passed {pass} / {total} ({done} tried)","submit.chooseLang":"Choose Language","submit.noCode":"Please write some code first","submit.submitting":"Submitting…","submit.success":"Submitted","submit.failed":"Submit failed: {msg}","resubmit.success":"Resubmit triggered","resubmit.failed":"Resubmit failed: {msg}"}},Jr="Web_Language",Ur=["zh-CN","en-US"],io="zh-CN",hs=500,bn=new Set,Qe=null,Vr=null;a(ms,"normalizeLang");a(so,"readLang");a(gs,"notify");a(ao,"check");a(bs,"start");f={start:bs,get lang(){return Qe||so()},refresh:ao,onChange(e){return bn.add(e),()=>bn.delete(e)},t(e,t){let o=Qe||so(),n=ro[o]&&ro[o][e]||ro[io]&&ro[io][e]||e;return t&&(n=n.replace(/\{(\w+)\}/g,(r,i)=>t[i]??"")),n},apply(e){let t=e||document;t.querySelectorAll("[data-i18n]").forEach(o=>{o.textContent=this.t(o.getAttribute("data-i18n"))}),t.querySelectorAll("[data-i18n-html]").forEach(o=>{o.innerHTML=this.t(o.getAttribute("data-i18n-html"))}),t.querySelectorAll("[data-i18n-ph]").forEach(o=>{o.placeholder=this.t(o.getAttribute("data-i18n-ph"))}),t.querySelectorAll("[data-i18n-title]").forEach(o=>{o.setAttribute("title",this.t(o.getAttribute("data-i18n-title")))})}};a(E,"t");a(De,"_i18nResolve")});var se,he,fn,vn,yn,He=O(()=>{"use strict";se=a((e,t=null)=>typeof window.GM_getValue=="function"?window.GM_getValue(e,t):t,"GM_getValue"),he=a((e,t)=>{typeof window.GM_setValue=="function"&&window.GM_setValue(e,t)},"GM_setValue"),fn=a((e,t)=>{typeof window.GM_setClipboard=="function"&&window.GM_setClipboard(e,t)},"GM_setClipboard"),vn=a((e,t,o)=>typeof window.GM_registerMenuCommand=="function"?window.GM_registerMenuCommand(e,t,o):0,"GM_registerMenuCommand"),yn=a(e=>{typeof window.GM_unregisterMenuCommand=="function"&&window.GM_unregisterMenuCommand(e)},"GM_unregisterMenuCommand");typeof window.GM_getValue>"u"&&console.warn("[BetterHOJ] GM functions not available, using localStorage fallback")});function W(e){return String(e).replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function jn(e,t){let o=String(e).split(".").map(i=>parseInt(i,10)||0),n=String(t).split(".").map(i=>parseInt(i,10)||0),r=Math.max(o.length,n.length);for(let i=0;i<r;i++){let s=o[i]??0,l=n[i]??0;if(s!==l)return s<l?-1:1}return 0}function Wr(e){if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="object")try{return JSON.stringify(e)}catch{return String(e)}return String(e)}function Kr(e){if(!e||typeof e!="string")return!1;let t=e.trim();return t===""||t==="Default"?!1:!!(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(t)||/^(rgb|rgba|hsl|hsla)\(/i.test(t)||/^[a-z]+$/i.test(t))}function lo(e){return JSON.parse(JSON.stringify(e))}async function co(e){if(typeof GM_setClipboard<"u"){GM_setClipboard(e);return}return navigator.clipboard?.writeText?navigator.clipboard.writeText(e):new Promise((t,o)=>{let n=document.createElement("textarea");n.value=e,n.style.cssText="position:fixed;left:-9999px;",document.body.appendChild(n),n.select();try{document.execCommand("copy")?t():o(new Error("copy failed"))}catch(r){o(r)}finally{document.body.removeChild(n)}})}var ke=O(()=>{"use strict";a(W,"escapeHtml");a(jn,"cmpVersion");a(Wr,"fmtVal");a(Kr,"isColorValue");a(lo,"deepClone");a(co,"copyToClipboard")});function xn(e){return et.find(t=>t.keys.includes(e))||null}function kn(e,t){let o=new Set;return e==="favorites"||t.forEach(n=>{if(e==="all"){o.add(n);return}if(e==="snippet"){(n==="Snippets"||n==="SnippetPanelHotkey")&&o.add(n);return}let r=xn(n);if(!r){e==="all"&&o.add(n);return}e==="smart"&&r.scope==="smart"&&o.add(n),e==="better"&&r.scope==="better"&&o.add(n)}),o}function wn(e){return e==="all"||e==="better"||e==="favorites"}function Ie(){try{let e=se(St,null);if(e===null){let o=localStorage.getItem(St);o&&(e=o,he(St,o))}if(!e)return lo(re);let t=typeof e=="string"?JSON.parse(e):e;return{...lo(re),...t}}catch{return lo(re)}}function Y(e){try{he(St,JSON.stringify(e));try{localStorage.setItem(St,JSON.stringify(e))}catch{}}catch(t){console.error("[BetterHOJ] Save config failed:",t)}}var St,re,et,Yr,le=O(()=>{"use strict";He();ke();St="smart_hoj_cfg_v2",re={Open:!1,SmoothScroll:!0,SmoothSwitch:!0,BetterNotFound:!0,LiquidGlassUI:!1,DarkMode:!1,MouseGlow:!0,HideNewHOJ:!0,ImageSource:"Source1",BuiltinBackground:"Custom",CustomBackground:"None",CardBackground:"Default",CardBlurRadius:"Default",CardRadius:"Default",ListBackground:"Default",ListBackgroundGreen:"Default",ListBackgroundHover:"Default",CodeBlockBackground:"Default",CodeBlockRadius:"Default",InputAreaBackground:"Default",InputAreaRadius:"Default",ButtonBackground:"Default",ButtonBackgroundHover:"Default",ButtonBackgroundActive:"Default",ButtonRadius:"Default",TagRadius:"Default",TooltipBackground:"Default",TooltipRadius:"Default",JudgeDetailBlockRadius:"Default",TextDark:"Default",TextDarkDisabled:"Default",TextLight:"Default",TextBlue:"Default",TextLink:"Default",SelectText:"Default",MemorizingFont:!1,SansFont:"Default",MonoFont:"Default",AutoLogin:!1,DefaultUsername:"",DefaultPassword:"",CheckInEnabled:!0,CheckInAutoPopup:!0,EnableRedirect:!1,AutoRedirectHost:"ssf.hdoi.cn",AutoRedirectProtocol:"",CustomRankTag:"",CustomRankTagColor:"#18BE6A",realCPHurl:!0,ToolsEnabled:!0,ToolsKeystroke:!1,ToolsPageTime:!1,ToolsClock:!1,hdnoipCFName:"",NavbarLayout:null,SnippetPanelHotkey:"Ctrl+Alt+S",Snippets:[],AutoSaveCode:!1,AutoSaveCodeInterval:"30",VSCodeEditor:!1,VSCodeTheme:"monokai",VSCodeFontSize:"14",VSCodeTabSize:"4",SettingsFullscreen:!1,VditorDiscussionPublish:!0,VditorDiscussionEdit:!0,VditorGroupCreate:!0,VditorUploadMode:"disabled",VditorUploadGid:"",ShowVersion:!1,PerfMode:!1},et=[{id:"general",name:"group.general",scope:"smart",keys:["Open","SmoothScroll","SmoothSwitch","BetterNotFound","LiquidGlassUI","DarkMode","MouseGlow","HideNewHOJ"]},{id:"background",name:"group.background",scope:"smart",keys:["ImageSource","BuiltinBackground","CustomBackground"]},{id:"card",name:"group.card",scope:"smart",keys:["CardBackground","CardBlurRadius","CardRadius"]},{id:"list",name:"group.list",scope:"smart",keys:["ListBackground","ListBackgroundGreen","ListBackgroundHover"]},{id:"code",name:"group.codeBlock",scope:"smart",keys:["CodeBlockBackground","CodeBlockRadius"]},{id:"input",name:"group.input",scope:"smart",keys:["InputAreaBackground","InputAreaRadius"]},{id:"button",name:"group.button",scope:"smart",keys:["ButtonBackground","ButtonBackgroundHover","ButtonBackgroundActive","ButtonRadius"]},{id:"misc",name:"group.misc",scope:"smart",keys:["TagRadius","TooltipBackground","TooltipRadius","JudgeDetailBlockRadius"]},{id:"text",name:"group.text",scope:"smart",keys:["TextDark","TextDarkDisabled","TextLight","TextBlue","TextLink","SelectText"]},{id:"font",name:"group.font",scope:"smart",keys:["MemorizingFont","SansFont","MonoFont"]},{id:"version",name:"group.version",scope:"smart",keys:["ShowVersion"]},{id:"perf",name:"group.perf",scope:"better",keys:["PerfMode"]},{id:"login",name:"group.login",scope:"better",keys:["AutoLogin","DefaultUsername","DefaultPassword"]},{id:"checkin",name:"group.checkin",scope:"better",keys:["CheckInEnabled","CheckInAutoPopup"]},{id:"redirect",name:"group.redirect",scope:"better",keys:["EnableRedirect","AutoRedirectHost"]},{id:"tag",name:"group.tag",scope:"better",keys:["CustomRankTag","CustomRankTagColor"]},{id:"cph",name:"group.cph",scope:"better",keys:["realCPHurl"]},{id:"tools",name:"group.tools",scope:"better",keys:["ToolsEnabled","ToolsKeystroke","ToolsPageTime","ToolsClock"]},{id:"vscode",name:"group.vscode",scope:"better",keys:["VSCodeEditor","VSCodeTheme","VSCodeFontSize","VSCodeTabSize"]},{id:"recommend",name:"group.recommend",scope:"better",keys:["hdnoipCFName"]},{id:"navbar",name:"group.navbar",scope:"better",keys:["NavbarLayout"]},{id:"snippet",name:"group.snippet",scope:"better",keys:["SnippetPanelHotkey","Snippets"]}],Yr=new Set(["DefaultPassword"]);a(xn,"findGroupByKey");a(kn,"presetToKeys");a(wn,"presetIncludesFavorites");a(Ie,"loadConfig");a(Y,"saveConfig")});var uo={};Z(uo,{NewAlert:()=>v,NewDialog:()=>ie,hojApi:()=>ae,isPerfMode:()=>fs,lockPageScroll:()=>Xr,openCustomDialog:()=>J,setPerfMode:()=>Cn,unlockPageScroll:()=>Zr,unsafeWindow:()=>En});async function ae(e,t={}){let{method:o="GET",body:n=void 0,headers:r={},silent:i=!1,raw:s=!1}=t,l=/^https?:\/\//i.test(e)?e:`${window.location.origin}${e}`,u=localStorage.getItem("token")||"",c={method:o,headers:{Authorization:u,...n!==void 0?{"Content-Type":"application/json"}:{},...r},credentials:"include"};n!==void 0&&(c.body=JSON.stringify(n));let d;try{d=await fetch(l,c)}catch(h){throw i||v(f.t("api.networkError",{msg:h.message}),"error"),h}if(d.status!==200){let h=f.t("api.httpError",{code:d.status});i||v(h,"error");let m=new Error(h);throw m.httpStatus=d.status,m}let p;try{p=await d.json()}catch(h){let m=f.t("api.jsonError");i||v(m,"error");let b=new Error(m);throw b.cause=h,b}let g=p&&typeof p.status<"u"?p.status:200;if(g!==200){let h=p?.msg||p?.message||f.t("api.bizError",{code:g});i||v(h,"error");let m=new Error(h);throw m.bizStatus=g,m.response=p,m}return s?p:p?p.data:null}function Cn(e){Ae=!!e,document.documentElement.classList.toggle("hoj-perf-mode",Ae)}function fs(){return Ae}function v(e,t="success",o=2500){let n=document.getElementById("hoj-alert-container");n||(n=document.createElement("div"),n.id="hoj-alert-container",n.style.cssText=`
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2147483640;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    `,document.body.appendChild(n));let r=document.createElement("div");r.className=`m-message m-message--${t}`,r.style.cssText=["pointer-events: auto","min-width: 220px","max-width: 360px",Ae?"animation: none":"animation: hojAlertIn .25s ease-out"].join(";"),r.innerHTML=`
    <div class="m-message-content">
      <div class="m-message--description"></div>
    </div>
    <div class="m-message--control">
      <i class="m-message--close el-icon-close" style="cursor:pointer;"></i>
    </div>
  `,r.querySelector(".m-message--description").textContent=De(e);let i=!1,s=a(()=>{if(!i){if(i=!0,Ae){r.remove();return}r.style.animation="hojAlertOut .2s ease-in forwards",setTimeout(()=>r.remove(),300)}},"remove");return r.querySelector(".m-message--close").addEventListener("click",s),n.appendChild(r),o>0&&setTimeout(s,o),s}function Xr(){if(Tt++,Tt!==1)return;let e=document.body,t=document.documentElement;tt={bodyOverflow:e.style.overflow,bodyPaddingRight:e.style.paddingRight,htmlOverflow:t.style.overflow};let o=window.innerWidth-t.clientWidth;if(o>0){let n=parseFloat(getComputedStyle(e).paddingRight)||0;e.style.paddingRight=`${n+o}px`}e.style.overflow="hidden",t.style.overflow="hidden",document.documentElement.classList.add("hoj-scroll-locked")}function Zr(){if(Tt===0||(Tt--,Tt!==0))return;let e=document.body,t=document.documentElement;tt?(e.style.overflow=tt.bodyOverflow||"",e.style.paddingRight=tt.bodyPaddingRight||"",t.style.overflow=tt.htmlOverflow||"",tt=null):(e.style.overflow="",e.style.paddingRight="",t.style.overflow=""),document.documentElement.classList.remove("hoj-scroll-locked")}function ie(e={}){let t={title:"@dialog.tip",content:"",html:"",confirmText:"@dialog.confirm",cancelText:"@dialog.cancel",showCancel:!0,type:"",closeOnMask:!0,onConfirm:null,...e},o=De(t.title),n=De(t.content),r=t.html,i=De(t.confirmText),s=De(t.cancelText),l=!!t.showCancel,u=t.type,c=t.closeOnMask!==!1,d=t.onConfirm;return new Promise(p=>{let g=document.createElement("div");g.className="hoj-dialog-mask",g.style.zIndex="2147483600";let h=document.createElement("div");h.className="hoj-dialog",u&&h.classList.add(`hoj-dialog--${u}`);let m=document.createElement("div");m.className="hoj-dialog__header",m.textContent=o;let b=document.createElement("i");b.className="hoj-dialog__close el-icon-close",b.style.zIndex="2",b.addEventListener("click",()=>k(!1)),m.appendChild(b);let j=document.createElement("div");j.className="hoj-dialog__body",r?j.innerHTML=r:j.textContent=n;let x=document.createElement("div");if(x.className="hoj-dialog__footer",l){let w=document.createElement("button");w.type="button",w.className="hoj-dialog__btn hoj-dialog__btn--cancel",w.textContent=s,w.addEventListener("click",()=>k(!1)),x.appendChild(w)}let y=document.createElement("button");y.type="button",y.className="hoj-dialog__btn hoj-dialog__btn--confirm",y.textContent=i,y.addEventListener("click",async()=>{if(typeof d=="function")try{if(await d()===!1)return}catch(w){console.error("[NewDialog] onConfirm error:",w)}k(!0)}),x.appendChild(y),h.append(m,j,x),g.appendChild(h),document.body.appendChild(g);let C=!1;function k(w){if(!C){if(C=!0,Ae){g.remove(),p(w);return}g.style.animation="hojDialogMaskOut .18s ease-in forwards",h.style.animation="hojDialogOut .18s ease-in forwards",setTimeout(()=>{g.remove(),p(w)},180)}}a(k,"close"),c&&g.addEventListener("click",w=>{w.target===g&&k(!1)});let A=a(w=>{w.key==="Escape"&&(document.removeEventListener("keydown",A),k(!1))},"onKey");document.addEventListener("keydown",A),setTimeout(()=>y.focus(),50)})}function J(e){let{title:t="提示",bodyEl:o,width:n="600px",maxHeight:r="80vh",fullscreen:i=!1,onClose:s=null}=e;if(!o)return()=>{};let l=window.innerWidth<768,u=i===!0||l,c=document.createElement("div");c.className="hoj-dialog-mask",c.style.zIndex="2147483600";let d=document.createElement("div");d.className="hoj-dialog",u&&d.classList.add("hoj-dialog--fullscreen"),u||(n&&(d.style.width=n),d.style.maxWidth="calc(100vw - 40px)");let p=document.createElement("div");p.className="hoj-dialog__header",p.textContent=De(t);let g=document.createElement("i");g.className="hoj-dialog__close el-icon-close",g.style.cssText="cursor: pointer; padding: 6px; margin: -6px 0 0 auto;",g.addEventListener("click",()=>b()),p.appendChild(g);let h=document.createElement("div");h.className="hoj-dialog__body",!u&&r&&(h.style.maxHeight=r),h.style.overflowY="auto",h.style.whiteSpace="normal",h.appendChild(o),d.append(p,h),c.appendChild(d),document.body.appendChild(c),Xr();let m=!1,b=a(()=>{if(m)return;m=!0,document.removeEventListener("keydown",j);let x=a(()=>{if(c.remove(),Zr(),typeof s=="function")try{s()}catch(y){console.warn("[CustomDialog] onClose error:",y)}},"finish");if(Ae){x();return}c.style.animation="hojDialogMaskOut .18s ease-in forwards",d.style.animation="hojDialogOut .18s ease-in forwards",setTimeout(x,180)},"close");c.addEventListener("click",x=>{x.target===c&&b()});let j=a(x=>{x.key==="Escape"&&b()},"onKey");return document.addEventListener("keydown",j),b}var En,Ae,Tt,tt,G=O(()=>{"use strict";K();En=window;a(ae,"hojApi");Ae=!1;a(Cn,"setPerfMode");a(fs,"isPerfMode");a(v,"NewAlert");a(function(){if(document.getElementById("hoj-alert-style"))return;let t=document.createElement("style");t.id="hoj-alert-style",t.textContent=`
    @keyframes hojAlertIn {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes hojAlertOut {
      from { opacity: 1; transform: translateX(0); }
      to   { opacity: 0; transform: translateX(20px); }
    }

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
      line-height: 1.4;
      word-break: break-all;
    }
    #hoj-alert-container .m-message--control {
      margin-left: 10px;
      opacity: .5;
    }
    #hoj-alert-container .m-message--control:hover { opacity: 1; }
    #hoj-alert-container .m-message--control i { color: inherit !important; }

    #hoj-alert-container .m-message--success { border-left: 3px solid #19BE6B; }
    #hoj-alert-container .m-message--error   { border-left: 3px solid #ED4014; }
    #hoj-alert-container .m-message--warning { border-left: 3px solid #FF9900; }
    #hoj-alert-container .m-message--info    { border-left: 3px solid #2DB7F5; }

    html.hoj-dark-mode #hoj-alert-container .m-message {
      background: #37373FE0 !important;
      color: #FFFFFF !important;
      box-shadow: 0 2px 12px rgba(0,0,0,.45);
    }

    html.hoj-lg-active:not(.hoj-dark-mode) #hoj-alert-container .m-message {
      background: rgba(255, 255, 255, .65) !important;
      backdrop-filter: blur(20px) saturate(1.5) !important;
      -webkit-backdrop-filter: blur(20px) saturate(1.5) !important;
      color: #24292E !important;
    }

    html.hoj-lg-active.hoj-dark-mode #hoj-alert-container .m-message {
      background: rgba(55, 55, 63, .75) !important;
      backdrop-filter: blur(20px) saturate(1.5) !important;
      -webkit-backdrop-filter: blur(20px) saturate(1.5) !important;
      color: #FFFFFF !important;
    }
  `,document.head.appendChild(t)},"injectAlertStyle")();Tt=0,tt=null;a(Xr,"lockPageScroll");a(Zr,"unlockPageScroll");a(ie,"NewDialog");a(function(){if(document.getElementById("hoj-dialog-style"))return;let t=document.createElement("style");t.id="hoj-dialog-style",t.textContent=`
    @keyframes hojDialogMaskIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes hojDialogMaskOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes hojDialogIn { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes hojDialogOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(12px) scale(.98); } }

    .hoj-dialog-mask {
      position: fixed; inset: 0; z-index: 2147483600 !important;
      background: rgba(0, 0, 0, .35);
      backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
      display: flex; align-items: center; justify-content: center;
      animation: hojDialogMaskIn .2s ease-out;
    }

    .hoj-dialog {
      min-width: 320px; max-width: 520px; max-height: 80vh; overflow: hidden;
      display: flex; flex-direction: column;
      border-radius: var(--hoj-card-radius, 12px);
      background: #FFFFFF; box-shadow: 0 8px 24px rgba(0,0,0,.2);
      font-family: var(--hoj-sans-font, "Noto Sans SC", sans-serif);
      color: #24292E; animation: hojDialogIn .25s cubic-bezier(.2,.8,.2,1);
    }

    html.hoj-dark-mode .hoj-dialog { background: #37373FE0; color: #FFFFFF; }
    html.hoj-dark-mode .hoj-dialog__header,
    html.hoj-dark-mode .hoj-dialog__footer { border-color: rgba(255, 255, 255, .08); }

    html.hoj-lg-active:not(.hoj-dark-mode) .hoj-dialog {
      background: rgba(255, 255, 255, .65);
      backdrop-filter: blur(20px) saturate(1.5);
      -webkit-backdrop-filter: blur(20px) saturate(1.5);
      box-shadow: var(--hoj-lg-shadow, 0 8px 24px rgba(0,0,0,.2));
    }

    html.hoj-lg-active.hoj-dark-mode .hoj-dialog {
      background: rgba(55, 55, 63, .75);
      backdrop-filter: blur(20px) saturate(1.5);
      -webkit-backdrop-filter: blur(20px) saturate(1.5);
      box-shadow: var(--hoj-lg-shadow, 0 8px 24px rgba(0,0,0,.2));
    }

    .hoj-dialog__header {
      display: flex; align-items: center; padding: 14px 18px 10px;
      font-size: 15px; font-weight: 600; z-index: 1;
      border-bottom: 1px solid rgba(0, 0, 0, .06);
    }
    .hoj-dialog__close { margin-left: auto; cursor: pointer; opacity: .5; font-size: 16px; transition: opacity .15s; }
    .hoj-dialog__close:hover { opacity: 1; }

    .hoj-dialog__body { padding: 16px 18px; font-size: 13px; line-height: 1.6; overflow-y: auto; word-break: break-all; white-space: pre-wrap; }

    .hoj-dialog__footer { display: flex; justify-content: flex-end; gap: 8px; padding: 10px 18px 14px; border-top: 1px solid rgba(0, 0, 0, .06); }

    .hoj-dialog__btn { padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(0, 0, 0, .1); cursor: pointer; font-size: 13px; font-family: inherit; transition: background .15s, border-color .15s, color .15s; }
    .hoj-dialog__btn--cancel { background: transparent; color: #24292E; }
    .hoj-dialog__btn--cancel:hover { background: rgba(0, 0, 0, .06); }
    .hoj-dialog__btn--confirm { background: #409EFF; color: #FFFFFF; border-color: #409EFF; }
    .hoj-dialog__btn--confirm:hover { background: #66B1FF; }

    html.hoj-dark-mode .hoj-dialog__btn--cancel { color: #FFFFFF; border-color: rgba(255, 255, 255, .1); }
    html.hoj-dark-mode .hoj-dialog__btn--cancel:hover { background: rgba(255, 255, 255, .08); }

    .hoj-dialog--success { border: 3px solid #19BE6B; }
    .hoj-dialog--error   { border: 3px solid #ED4014; }
    .hoj-dialog--warning { border: 3px solid #FF9900; }
    .hoj-dialog--info    { border: 3px solid #2DB7F5; }

    .hoj-dialog.hoj-dialog--fullscreen {
      position: fixed !important; inset: 0 !important; width: 100vw !important;
      min-width: 100vw !important; max-width: 100vw !important;
      height: 100vh !important; min-height: 100vh !important; max-height: 100vh !important;
      margin: 0 !important; padding: 0 !important; box-sizing: border-box !important;
      border-radius: 0 !important; transform: none !important; animation: none !important;
      display: flex !important; flex-direction: column !important; overflow: hidden !important; box-shadow: none !important;
    }
    .hoj-dialog.hoj-dialog--fullscreen > .hoj-dialog__header { flex: 0 0 auto; padding: 14px 18px; font-size: 16px; border-radius: 0; }
    .hoj-dialog.hoj-dialog--fullscreen > .hoj-dialog__body { flex: 1 1 auto; min-height: 0; max-height: none !important; padding: 16px 18px; border-radius: 0; overflow-y: auto; }
    html.hoj-dark-mode .hoj-dialog.hoj-dialog--fullscreen { background: var(--hoj-card-bg, #37373FE0); }

    /* ---------- 高性能模式 ----------
     * html.hoj-perf-mode 由 setPerfMode() 切换：
     *   - 去掉 Dialog / mask 的进出动画（避免逐帧合成）
     *   - 去掉 mask 的背景模糊（backdrop-filter 是最贵的属性之一）
     */
    html.hoj-perf-mode .hoj-dialog-mask {
      animation: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    html.hoj-perf-mode .hoj-dialog {
      animation: none !important;
      /* 液态玻璃下 dialog 本身也有 20px 模糊，一并去掉 */
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    /* 去掉模糊后需要不透明背景，否则会透出背后的内容 */
    html.hoj-perf-mode.hoj-lg-active:not(.hoj-dark-mode) .hoj-dialog {
      background: #FFFFFF !important;
    }
    html.hoj-perf-mode.hoj-lg-active.hoj-dark-mode .hoj-dialog {
      background: #37373F !important;
    }
    html.hoj-perf-mode .hoj-dialog__btn,
    html.hoj-perf-mode .hoj-dialog__close {
      transition: none !important;
    }

    @media (max-width: 767px) {
      .hoj-dialog-mask { align-items: stretch; justify-content: stretch; }
      .hoj-dialog { width: 100vw !important; max-width: 100vw !important; min-width: 0 !important; height: 100vh !important; max-height: 100vh !important; border-radius: 0 !important; box-shadow: none !important; }
      .hoj-dialog__header { padding: 14px 16px 12px; font-size: 16px; }
      .hoj-dialog__body { padding: 16px 16px; font-size: 14px; flex: 1 1 auto; min-height: 0; }
      .hoj-dialog__footer { padding: 12px 16px 16px; }
      .hoj-dialog__btn { padding: 8px 18px; font-size: 14px; }
      .hoj-dialog__close { font-size: 20px; padding: 4px; }
    }
  `,document.head.appendChild(t)},"injectDialogStyle")();a(J,"openCustomDialog")});function vs(e){if(!e||e.tagName!=="SELECT")return null;if(e.dataset.hojElSelect==="1")return e.nextElementSibling;e.dataset.hojElSelect="1",e.style.display="none";let t=document.createElement("div");t.className="hoj-el-select-wrap",t.innerHTML=`
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
  `;let o=document.createElement("div");o.className="el-select-dropdown hoj-el-select-dropdown",o.style.display="none",o.innerHTML=`
    <div class="el-scrollbar">
      <ul class="el-select-dropdown__list"></ul>
    </div>
  `,document.body.appendChild(o);let n=t.querySelector(".el-input__inner"),r=t.querySelector(".el-select__caret"),i=o.querySelector(".el-select-dropdown__list"),s=a(()=>Array.from(e.options).map(b=>({value:b.value,label:b.textContent||""})),"getOptions"),l=a(()=>{let j=s().find(x=>x.value===e.value);n.value=j?j.label:""},"updateInputText"),u=a(()=>{i.innerHTML=s().map(b=>`<li class="el-select-dropdown__item${b.value===e.value?" selected":""}" data-value="${W(b.value)}">${W(b.label)}</li>`).join("")},"renderList"),c=a(()=>{let b=t.getBoundingClientRect(),j=o.offsetHeight||200,x=window.innerHeight-b.bottom,y=b.top;o.style.position="fixed",o.style.left=b.left+"px",o.style.minWidth=b.width+"px",o.style.zIndex="2147483650",x<j+8&&y>x?(o.style.top="auto",o.style.bottom=window.innerHeight-b.top+4+"px"):(o.style.bottom="auto",o.style.top=b.bottom+4+"px")},"positionDropdown"),d=null,p=a(()=>{u(),o.style.display="block",c(),r.classList.add("is-reverse"),d=a(()=>c(),"onScroll"),window.addEventListener("scroll",d,!0),window.addEventListener("resize",d,!0),document.addEventListener("mousedown",h,!0),document.addEventListener("keydown",m,!0)},"open"),g=a(()=>{o.style.display="none",r.classList.remove("is-reverse"),d&&(window.removeEventListener("scroll",d,!0),window.removeEventListener("resize",d,!0),d=null),document.removeEventListener("mousedown",h,!0),document.removeEventListener("keydown",m,!0)},"close"),h=a(b=>{!t.contains(b.target)&&!o.contains(b.target)&&g()},"onDocClick"),m=a(b=>{b.key==="Escape"&&g()},"onEsc");return t.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),o.style.display==="block"?g():p()}),i.addEventListener("click",b=>{let j=b.target.closest(".el-select-dropdown__item");j&&(b.preventDefault(),b.stopPropagation(),e.value=j.dataset.value||"",e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),l(),g())}),e.addEventListener("input",l),e.addEventListener("change",l),e.parentNode.insertBefore(t,e.nextSibling),l(),t._hojRefresh=()=>{l(),o.style.display==="block"&&u()},t}function Qr(e){(e||document).querySelectorAll('select[data-hoj-el-select="1"]').forEach(o=>{let n=o.nextElementSibling;if(n&&typeof n._hojRefresh=="function")try{n._hojRefresh()}catch{}})}function ea(e){(e||document).querySelectorAll("select:not([data-hoj-el-select])").forEach(o=>{o.closest("#hoj-favorites-panel")||vs(o)})}var ta=O(()=>{"use strict";ke();a(vs,"upgradeSelectToElSelect");a(Qr,"refreshAllSelects");a(ea,"upgradeAllSelects")});var oa,na=O(()=>{"use strict";oa=`
/* ============ Global Background ============ */
body {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: var(--hoj-bg-color) !important;
}

/* ============ Main Container ============ */
div#oj-content { height: 100%; }
div#oj-content:not(:has(.problem-body)) { margin: 35px 7% 0 7%; padding: 0; }

/* ============ Cards ============ */
div.el-card, .el-tabs--border-card, *[class*="bg-white"], .glass-card {
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

/* ============ echarts tooltip ============ */
.echarts > div:nth-child(2):not(.el-loading-mask):not(:empty) {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  color: var(--hoj-text-dark) !important;
  border-radius: var(--hoj-card-radius);
  padding: 5px 8px !important;
}

/* ============ Global Font ============ */
*:not(pre, pre *, code, code *, .CodeMirror *, textarea, i, .katex, .katex *, [class*=" el-icon-"], [class^="el-icon-"], [class^="example-"] pre, .tex-formula, .tex-span) {
  font-family: var(--hoj-sans-font) !important;
}
pre, pre *, code, code *, .CodeMirror *, textarea, [class^="example-"] pre {
  font-family: var(--hoj-mono-font) !important;
}

/* ============ Links ============ */
a[href^='http'], a[href^='/'] { color: var(--hoj-text-link) !important; }
a[href^='http']:hover, a[href^='/']:hover, a.entry:hover { color: var(--hoj-text-link) !important; }

/* ============ Underline Animation ============ */
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

/* ============ Loading Mask ============ */
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

/* ============ Table Borders ============ */
.vxe-table.border--default .vxe-body--column, .vxe-table.border--default .vxe-footer--column,
.vxe-table.border--default .vxe-header--column, .vxe-table.border--inner .vxe-body--column,
.vxe-table.border--inner .vxe-footer--column, .vxe-table.border--inner .vxe-header--column {
  background-image: linear-gradient(#E8EAEC80, #E8EAEC80);
  background-size: 100% 1px;
}

/* ============ Tooltip ============ */
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

/* ============ Scrollbar ============ */
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

/* ============ Text Selection ============ */
::selection { background: var(--hoj-select-text); }

/* ============ Smooth Scroll ============ */
html.hoj-smooth-scroll, html.hoj-smooth-scroll body { scroll-behavior: smooth; }

/* ============ Smooth Page Transition ============ */
@view-transition { navigation: auto; }
html.hoj-smooth-switch::view-transition-group(*) {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

/* ============ Navbar ============ */
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

/* Navbar underline animation */
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

/* ============ Home ============ */
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

/* ============ Problem Page ============ */
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

/* ============ Training ============ */
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

/* ============ Contest ============ */
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

/* ============ Status/Judging ============ */
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

/* ============ Ranking ============ */
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

/* ============ Discussion ============ */
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

/* ============ Team ============ */
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
.list-card { border-radius: var(--hoj-card-radius) !important; }
.el-pager li.active { color: var(--hoj-text-light); }
.btn-prev, .btn-next { border-radius: var(--hoj-button-radius); }

/* ============ Message Center ============ */
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

/* ============ Profile ============ */
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

/* ============ Settings ============ */
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

/* ============ Markdown Editor ============ */
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
  border-radius: var(--hoj-card-radius) !important;
}

/* ============ Code Highlight (GitHub Light) ============ */
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

/* ============ Introduction ============ */
.container .content pre[data-v-69fec1be] {
  background: var(--hoj-code-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-code-radius);
}

/* ============ Admin ============ */
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
.el-menu .el-menu-item:hover i[data-v-35116184], .el-menu .el-submenu__title i[data-v-35116184] {
  background: 0!important;
}
.el-button.el-button--primary.is-plain:hover {
  color: black !important;
}

/* ============ Copy Markdown Button ============ */
.el-button--primary.is-plain {
  background: var(--hoj-button-bg) !important;
  border: none;
}
.el-button--primary.is-plain:hover {
  background: var(--hoj-button-bg-hover) !important;
  border: none;
  color: var(--hoj-text-dark);
}

/* ============ Color Picker ============ */
.el-color-picker__panel {
  border: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
}

/* ============ Date Picker ============ */
.el-picker-panel {
  border: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
}
.el-picker-panel__footer {
  background: 0;
}

/* ============ Autocomplete ============ */
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

/* ============ Checkbox ============ */
.el-checkbox__inner {
  border: 0;
  background: var(--hoj-button-bg);
  border-radius: 4px;
}

/* ============ BetterHOJ Settings Panel ============ */
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

/* ---------- Generic Buttons ---------- */
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button) {
  border-radius: var(--hoj-button-radius, 4px)!important;
  background: var(--hoj-button-bg, transparent)!important;
}
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button):hover {
  background: var(--hoj-button-bg-hover, rgba(0, 0, 0, .06))!important;
}

/* ---------- Mini Buttons ---------- */
#hoj-settings-panel .hoj-mini-btn {
  background: var(--hoj-button-bg, transparent)!important;
}
`});var ra,aa=O(()=>{"use strict";ra=`
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
  box-shadow: 0 8px 24px #20268833, inset 0px 0px 10px #FFFFFF1A, inset -3px 3px 4px #FFFFFF10, inset -0.5px 0.5px 0px #FFFFFF60 !important;
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

/* Disable old acrylic backdrop-filter */
html.hoj-lg-active .el-button:not(.is-round:not(.el-button--default),
  #js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-14.el-col-lg-14 > button,
  .el-button--danger, .el-button--warning, .el-button--success,
  .el-button--primary, .el-button--text, .el-button--info) {
  backdrop-filter: none !important;
}

html.hoj-lg-active.hoj-admin .el-tag--dark.el-tag--warning {
  backdrop-filter: blur(0px) saturate(1.35) !important;
}

/* echarts tooltip */
html.hoj-lg-active .echarts > div:nth-child(2):not(.el-loading-mask):not(:empty) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Loading mask */
html.hoj-lg-active .el-loading-mask::before {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Tooltip */
html.hoj-lg-active :is(.el-tooltip__popper, .vxe-table--tooltip-wrapper) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Navbar & Dropdown */
html.hoj-lg-active .el-menu.el-menu--horizontal::before,
html.hoj-lg-active .el-menu.el-menu--popup.el-menu--popup-bottom-start {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Mobile */
html.hoj-lg-active :is(.mobile-nav, .mu-popover, .mu-paper) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Back to top */
html.hoj-lg-active :is(.el-backtop, .el-backtop:hover) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Pagination / Input / Problem Nav / Sidebar Resize */
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

/* Drawer / Message Box */
html.hoj-lg-active :is(.el-drawer__body, .el-message-box, .el-message) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Tags / List hover */
html.hoj-lg-active :is(
  .category-item.el-tag[style*="background-color: rgb(255"][style$="255);"],
  .el-tag--plain:not(.active),
  .dataNavListItem.is-active[data-v-5cbe8756],
  .dataNavListItem[data-v-5cbe8756]:hover
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Secondary nav / Discussion / Code blocks / Editor / Admin */
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

/* el-dialog keeps stronger saturation (original was saturate(1.6)) */
html.hoj-lg-active .el-dialog {
  backdrop-filter: blur(10px) saturate(1.6) !important;
}

/* Color picker / Date picker / Autocomplete */
html.hoj-lg-active :is(
  .el-color-picker__panel,
  .el-picker-panel,
  .el-autocomplete-suggestion
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}
`});var ia,sa=O(()=>{"use strict";ia=`

/* ---------- Global Constants ---------- */
:root {
  --hoj-dm-blur: blur(20px) saturate(1.2);
  --hoj-dm-shadow: 0 2px 12px rgba(0,0,0,.45);
}


/* ---------- Global Colors ---------- */
html.hoj-dark-mode body {
  color: var(--hoj-text-dark);
  background-color: var(--hoj-bg-color);
}

/* ---------- General Text Colors ---------- */
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

/* ---------- Image Dimming ---------- */
html.hoj-dark-mode img { filter: brightness(.85); }

/* ---------- Inputs ---------- */
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

/* ---------- Code Blocks ---------- */
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

/* ---------- Links ---------- */
html.hoj-dark-mode a[href^='http'],
html.hoj-dark-mode a[href^='/'],
html.hoj-dark-mode a.entry {
  color: var(--hoj-text-link) !important;
}

/* ---------- Dividers / Borders ---------- */
html.hoj-dark-mode :is(
  .el-divider,
  .el-divider__text,
  .markdown-body hr
) {
  background-color: rgba(255,255,255,.1) !important;
  border-color: rgba(255,255,255,.1) !important;
  color: var(--hoj-text-dark);
}

/* ---------- Code Highlight (GitHub Dark) ---------- */
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

/* ---------- Mouse Glow Effect ---------- */
/* Make cards positioning context, define glow radius + initial position */
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
  z-index: 10;
  pointer-events: none;
  border-radius: inherit;

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

/* JS adds .hoj-glow-on to light up */
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
`});var Sn,la=O(()=>{"use strict";Sn=`

/* ============================================================
 * 1. Container & Open/Close
 * ============================================================ */
#hoj-settings-panel {
    position: fixed;
    top: 70px;
    right: 20px;
    width: 380px;
    max-width: calc(100vw - 40px);
    max-height: 80vh;
    z-index: 2147482000;

    display: none;
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
 * 2. Three-section Layout
 * ============================================================ */

/* ---------- 2.1 Header ---------- */
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

/* ---------- 2.2 Body (only scrollable area) ---------- */
#hoj-settings-panel .hoj-panel-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 12px 14px;
    font-size: 12px;
}

/* ---------- 2.3 Footer (fixed) ---------- */
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
 * 3. Collapsible Sections
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

/* ---------- Level 1 sections (emphasized) ---------- */
#hoj-settings-panel .hoj-section[data-level="1"] > .hoj-section-header {
    padding: 9px 12px;
    font-size: 13px;
    color: #409EFF;
    background: rgba(64, 158, 255, .07);
}
#hoj-settings-panel .hoj-section[data-level="1"] > .hoj-section-header:hover {
    background: rgba(64, 158, 255, .14);
}

/* ---------- Level 2 sections (compact) ---------- */
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
/* Level 2 inside level 2 - no extra indent */
#hoj-settings-panel .hoj-section[data-level="2"] .hoj-section[data-level="2"] > .hoj-section-body {
    padding-left: 0;
}


/* ============================================================
 * 4. Rows & Controls
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
/* Row with multiple buttons -> left align */
#hoj-settings-panel .hoj-row[style*="flex-wrap"] {
    justify-content: flex-start;
}

/* ---------- Input Controls ---------- */
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
 * 5. Buttons
 * ============================================================ */

/* ---------- Generic Buttons ---------- */
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

/* ---------- Mini Buttons ---------- */
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

/* ---------- Header Buttons ---------- */
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
 * 6. Color Preview
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
 * 7. Switches (checkbox restyle)
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

/* Mobile / Fullscreen switches slightly larger */
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
 * 8. Fullscreen (desktop + mobile shared rules)
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

/* Fullscreen: header not draggable, buttons larger */
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

/* Fullscreen: body larger font, better line height */
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
 * 9. Responsive (narrow)
 * ============================================================ */
@media (max-width: 480px) {
    #hoj-settings-panel {
        right: 10px;
        max-width: calc(100vw - 20px);
    }
}

/* ============ Favorites ============ */
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

/* ============ NewTool Common Widget ============ */
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

/* Keystroke Display */
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

/* ============ Recommendation Dialog ============ */
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

html.hoj-dark-mode .hoj-rec-tab { border-color: rgba(255, 255, 255, .08); }
html.hoj-dark-mode .hoj-rec-tabs { border-bottom-color: rgba(255, 255, 255, .08); }

/* ============ Navbar Layout Config ============ */
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

/* ============ Snippet Panel ============ */
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

/* ============ Snippet Manager ============ */
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

/* ============ Import / Export ============ */
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

/* ============ Discussion Like Button ============ */
.hoj-like-box {
    position: absolute;
    top: 25px;
    right: 68px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 4px;
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

.hoj-like-btn--like   { background: #2D8CF0; }
.hoj-like-btn--unlike { background: #ED4014; }

.hoj-like-cooldown {
    font-size: 12px;
    color: #909399;
    min-width: 22px;
    font-variant-numeric: tabular-nums;
    user-select: none;
}

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

/* ============ /new Discussion Like ============ */
.hoj-new-like-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 3px;
}

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

/* ============ Discussion Form ============ */
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
    min-height: 380px;
}

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

/* ============ Discussion Advanced ============ */
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
    padding-top: 22px;
}
.hoj-disc-adv-check-wrap input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}
.hoj-disc-adv-label-top {
    font-size: 13px;
}

.hoj-dialog--fullscreen .hoj-disc-field--editor {
    flex: 1 1 auto;
    min-height: 0;
}

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

/* ============ Group Auth Radio ============ */
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
.hoj-group-auth-option[data-auth="1"] { --auth-color: #67c23a; }
.hoj-group-auth-option[data-auth="2"] { --auth-color: #e6a23c; }
.hoj-group-auth-option[data-auth="3"] { --auth-color: #f56c6c; }

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

/* ============ Visibility Toggle ============ */
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

.hoj-disc-field--editor-bottom {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* ============ Discussion List Inline Edit ============ */
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

/* ============ Discussion List Delete ============ */
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

/* ============ All Test (TestJudge) ============ */
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

/* Dark mode for settings panel */
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
    width: 130px;
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

#hoj-settings-panel.hoj-fullscreen .hoj-el-select-wrap,
#hoj-settings-panel.hoj-fullscreen .hoj-el-select-wrap .el-select {
    width: 140px;
    max-width: 140px;
}

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

/* ============ About · Version Row ============ */
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

/* ============ Language Trigger ============ */
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

/* ============ Language Picker Dialog ============ */
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
`});function pa(e,t){if(document.getElementById(e))return;let o="";try{typeof GM_getResourceText=="function"&&(o=GM_getResourceText(t)||"")}catch(r){console.warn(`[Font] Failed to read @resource "${t}":`,r)}if(!o){console.warn(`[Font] Falling back to remote <link>: ${t}`);let r=document.createElement("link");r.id=e,r.rel="stylesheet",r.href=t==="hoj-font-google"?"https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=JetBrains+Mono&family=Fira+Code:wght@300..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap":"https://db.onlinewebfonts.com/c/eb08ac6d35598e6ced424eb52373a55a?family=Sans+Forgetica+Regular",(document.head||document.documentElement).appendChild(r);return}let n=document.createElement("style");n.id=e,n.textContent=o,(document.head||document.documentElement).appendChild(n),console.log(`[Font] Loaded from @resource: ${t} (${o.length} chars)`)}function ha(){pa(Tn.google,"hoj-font-google")}function ma(e){let t="hoj-smart-style-memorizing-font",o=document.getElementById(t);if(o&&o.remove(),e.MemorizingFont&&e.Open){pa(Tn.forgetica,"hoj-font-forgetica");let n=document.createElement("style");n.id=t,n.textContent=ys,(document.head||document.documentElement).appendChild(n)}else{let n=document.getElementById(Tn.forgetica);n&&n.remove()}}var ca,da,ys,ua,Tn,ga=O(()=>{"use strict";ca=`
body::after {
  content: "Smart HOJ 27 Beta 4.6 JavaScript Version";
  position: fixed; top: 0; left: 0; z-index: 9999;
  color: #000; background-color: #fff;
  padding: 0 3px 0 3px; opacity: 0.25; font-size: 10px;
}
`,da=`
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
`,ys=`
*:not(pre, pre *, code, code *, .CodeMirror *, textarea, i, .katex, .katex *, [class*=" el-icon-"], [class^="el-icon-"], [class^="example-"] pre, .tex-formula, .tex-span) {
  font-family: "Sans Forgetica Regular", "Noto Sans SC", sans-serif !important;
}
pre, pre *, code, code *, .CodeMirror *, textarea, [class^="example-"] pre {
  font-family: "Sans Forgetica Regular", "Noto Sans SC", sans-serif !important;
}
`,ua=`
.el-menu.el-menu--horizontal .el-menu-item[data-v-35116184]:not(:has(~ .el-menu-item[data-v-35116184])) {
  display: none;
}
`,Tn={google:"hoj-font-google",forgetica:"hoj-font-forgetica"};a(pa,"loadStyleFromResource");a(ha,"loadBaseFonts");a(ma,"syncMemorizingFont")});var ja={};Z(ja,{applyBackground:()=>ce,closeMobileDrawer:()=>Fn,initCardGlow:()=>we,isDynamicAvailable:()=>ot,isDynamicWallpaper:()=>Be,openSettingsPanelFullscreen:()=>Ft,removeRowStripe:()=>Oe,syncDynamicWallpaperOptions:()=>Ln,syncDynamicWallpaperTimer:()=>_t});function Be(e){return Object.prototype.hasOwnProperty.call(fa,e)}function ot(e){return va.includes(e.ImageSource)}function ws(e){let t=fa[e];if(!t||!t.length)return null;let o=new Date,n=o.getHours()*60+o.getMinutes(),r=t[t.length-1];for(let i of t)if(n>=i.hour*60+i.min)r=i;else break;return r.path}function Es(e){let t=js[e.ImageSource],o=ws(e.BuiltinBackground);return!t||!o?null:`${t}${o}`}function ya(e){let t=Es(e);t&&(document.body.style.backgroundImage=`url("${t}")`)}function _t(e){Pe&&(clearInterval(Pe),Pe=null),e.Open&&Be(e.BuiltinBackground)&&ot(e)&&(Pe=window.setInterval(()=>{e.Open&&Be(e.BuiltinBackground)&&ot(e)&&ya(e)},60*1e3))}function Ln(e,t){if(!t)return;e||(e=Ie());let o=t.querySelector('select[data-key="BuiltinBackground"]'),n=t.querySelector('select[data-key="ImageSource"]');if(!o||!n)return;let r=va.includes(n.value);!r&&Be(e.BuiltinBackground)&&(e.BuiltinBackground="Custom");let i=e.BuiltinBackground,s=[["Custom","Custom"],["Classic","Classic"],["BigSur","BigSur"],["Monterey","Monterey"],["Ventura","Ventura"],["Sonoma","Sonoma"],["Sequoia","Sequoia"],["Tahoe","Tahoe"],["GoldenGate","GoldenGate"],["Twilight","Twilight"],["Sunset","Sunset"]],l=[["Mojave","Mojave（动态壁纸）"],["Catalina","Catalina（动态壁纸）"]],u=[...s];r&&u.push(...l),o.innerHTML=u.map(([c,d])=>`<option value="${c}">${d}</option>`).join(""),o.value=i,o.value!==i&&(o.value="Custom")}function ce(e){let t=document.body;if(!t)return;if(!e.Open){t.style.backgroundImage="none";return}if(e.CustomBackground&&e.CustomBackground!=="None"){t.style.backgroundImage=`url("${e.CustomBackground}")`;return}if(e.BuiltinBackground==="Custom"){t.style.backgroundImage="none";return}if(Be(e.BuiltinBackground)&&ot(e)){ya(e),_t(e);return}if(Pe&&(clearInterval(Pe),Pe=null),e.ImageSource==="Source4"){let i=ks[e.BuiltinBackground];t.style.backgroundImage=i?`url("${_n.Source4}/${i}")`:"none";return}if(e.ImageSource==="Source3"){let i=xs[e.BuiltinBackground];i?t.style.backgroundImage=`url("https://smart-hoj.is-great.org/backgrounds/${i}")`:t.style.backgroundImage="none";return}let o=_n[e.ImageSource]||_n.Source1,n=ba[e.BuiltinBackground]||ba.Classic,r=e.BuiltinBackground==="Classic"?".jpeg":".jpg";t.style.backgroundImage=o&&n?`url("${o}/${n}${r}")`:"none"}function Oe(){document.querySelectorAll(".vxe-body--row.row--stripe").forEach(e=>{e.classList.remove("row--stripe")})}function we(e){if(!e.Open||!e.DarkMode||!e.MouseGlow||we._installed)return;we._installed=!0;let t="img, div.el-card,.container,.category-body[data-v-fce6d0ee],.el-tabs--border-card, .announcements-container li[data-v-931546ae],.el-popover,.el-message-box,.el-message,.el-select-dropdown,.el-dropdown-menu,.el-notification,.m-message,.mobile-nav,.mu-popover,.mu-paper,.el-tabs__header.is-top,.el-tabs__nav-wrap.is-top,.container[data-v-bbe20b80],.container[data-v-13564ee3],.container[data-v-675320b4],.v-note-wrapper,.v-note-help-content,.add-image-link,.popup-dropdown,.op-header.popup-dropdown,.el-upload-dragger,.problem-resize",o=.22,n=.05,r=new WeakMap;function i(d,p){d.style.setProperty("--hoj-glow-mx",p.cx.toFixed(3)+"%"),d.style.setProperty("--hoj-glow-my",p.cy.toFixed(3)+"%")}a(i,"apply");function s(d){let p=r.get(d);if(p){if(p.cx+=(p.tx-p.cx)*o,p.cy+=(p.ty-p.cy)*o,Math.abs(p.tx-p.cx)<n&&Math.abs(p.ty-p.cy)<n){p.cx=p.tx,p.cy=p.ty,i(d,p),p.raf=null;return}i(d,p),p.raf=requestAnimationFrame(()=>s(d))}}a(s,"tick");function l(d){let p=r.get(d);!p||p.raf!==null||(p.raf=requestAnimationFrame(()=>s(d)))}a(l,"play");function u(d,p){if(!Number.isFinite(d)||!Number.isFinite(p)||d<0||p<0||d>window.innerWidth||p>window.innerHeight)return null;let g=document.elementsFromPoint(d,p);for(let h of g)if(h instanceof HTMLElement&&h.matches&&h.matches(t))return h;return null}a(u,"findHost");let c=null;document.addEventListener("pointermove",d=>{let p=u(d.clientX,d.clientY);if(p!==c&&(document.querySelectorAll(".hoj-glow-on").forEach(j=>{if(j!==p&&!(j instanceof HTMLElement&&p instanceof HTMLElement&&j.contains(p))){j.classList.remove("hoj-glow-on");let x=r.get(j);x&&(x.hovering=!1)}}),c=p),!p)return;let g=p.getBoundingClientRect();if(!g.width||!g.height)return;let h=(d.clientX-g.left)/g.width*100,m=(d.clientY-g.top)/g.height*100,b=r.get(p);b||(b={cx:h,cy:m,tx:h,ty:m,raf:null,hovering:!1},r.set(p,b)),b.hovering?(b.tx=h,b.ty=m,l(p)):(b.cx=b.tx=h,b.cy=b.ty=m,i(p,b),b.hovering=!0,p.classList.add("hoj-glow-on"))},{passive:!0}),document.addEventListener("pointerdown",d=>{let p=u(d.clientX,d.clientY);if(!p)return;getComputedStyle(p).position==="static"&&(p.style.position="relative");let h=p.getBoundingClientRect();if(!h.width||!h.height)return;let m=d.clientX-h.left,b=d.clientY-h.top,j=Math.max(m,h.width-m),x=Math.max(b,h.height-b),C=Math.hypot(j,x)*2,k=document.createElement("span");k.className="hoj-ripple",k.style.left=m+"px",k.style.top=b+"px",k.style.width=C+"px",k.style.height=C+"px",p.appendChild(k),k.addEventListener("animationend",()=>k.remove())},{passive:!0}),document.addEventListener("pointerout",d=>{let p=u(d.clientX,d.clientY);if(!p){document.querySelectorAll(".hoj-glow-on").forEach(g=>{g.classList.remove("hoj-glow-on");let h=r.get(g);h&&(h.hovering=!1)});return}document.querySelectorAll(".hoj-glow-on").forEach(g=>{if(g instanceof HTMLElement&&g!==p&&!g.contains(p)&&!p.contains(g)){g.classList.remove("hoj-glow-on");let h=r.get(g);h&&(h.hovering=!1)}})},{passive:!0})}function Fn(){document.querySelectorAll(".mu-overlay").forEach(t=>{["click","mousedown","mouseup","touchstart","touchend"].forEach(o=>{try{let n=o.startsWith("touch")?new TouchEvent(o,{bubbles:!0,cancelable:!0}):new MouseEvent(o,{bubbles:!0,cancelable:!0,view:window});t.dispatchEvent(n)}catch{}})});let e=a(()=>{document.querySelectorAll(".mu-drawer").forEach(t=>{t.classList.remove("is-open")}),document.querySelectorAll(".mu-overlay").forEach(t=>{t.dataset.hojHidden="1",t.style.display="none",t.style.pointerEvents="none",t.style.opacity="0"})},"hideAll");e(),[16,50,120,300,600].forEach(t=>setTimeout(e,t))}var fa,va,js,xs,ks,ba,_n,Pe,Lt=O(()=>{"use strict";le();Mt();fa={Mojave:[{hour:0,min:0,path:"file/c446f4fc9daa45a18a76bb70583d2acd.png"},{hour:3,min:0,path:"file/75c716a6259f454fadb5113de2231df6.png"},{hour:6,min:0,path:"file/c0355dd4d9f24a7c9ae15d86d19bd858.png"},{hour:7,min:30,path:"file/c5bbf31e96fb483ea14cee6434ef33f5.png"},{hour:9,min:0,path:"file/4643de510a614ff09ff41c555c2e0731.png"},{hour:10,min:30,path:"file/fb6514b9839e4de0beb118f4657791c7.png"},{hour:12,min:0,path:"file/2598082745c642bab9dfa9226c216ec6.png"},{hour:13,min:30,path:"file/8116d00e29aa4e268ffa7685ac8794b0.png"},{hour:15,min:0,path:"file/e141e7fa980f40f99d5308b1f844d51a.png"},{hour:16,min:30,path:"file/3e48ea2dffa4420390011fdbc799c6bc.png"},{hour:17,min:30,path:"file/ae0e489f2d894a44a4ddef4f6b751c91.png"},{hour:19,min:0,path:"file/8aff674ec1dc4ea7847e02a804c6e153.png"},{hour:20,min:0,path:"file/c40c0516fd224e1cb9415af1fcad247f.png"},{hour:21,min:0,path:"file/0a86e082d70f488e9b67356b836c1d8d.png"},{hour:22,min:30,path:"file/c446f4fc9daa45a18a76bb70583d2acd.png"}],Catalina:[{hour:0,min:0,path:"img/513736725fb0405fada79c92cc2b0170.png"},{hour:6,min:0,path:"file/ac1e623769a94a409b3db8f84b693af5.png"},{hour:9,min:0,path:"img/88c83323ea0041008360b9dc68605d3f.png"},{hour:12,min:0,path:"img/3763d6a8bc8c41f69bef4f38c242ae59.png"},{hour:15,min:0,path:"img/0c7f7e82b6da4627b64ac69509fc834a.png"},{hour:18,min:0,path:"img/1701dc40763549a6826626715f32cbbb.png"},{hour:19,min:30,path:"file/06a10d43d30f42f68c74872f25b2f264.png"},{hour:21,min:0,path:"img/eae9eb8961494e8e8b34a3cd83cad272.png"}]},va=["Source1","Source2"],js={Source1:"http://ssf.hdoi.cn/api/public/",Source2:"http://172.16.21.199/api/public/"},xs={BigSur:"BigSur.jpg",Monterey:"Monterey.jpg",Ventura:"Classic.jpeg",Sonoma:"Sonoma.jpg",Sequoia:"Sequoia.jpg",Tahoe:"Tahoe.jpg"},ks={Tahoe:"cba3fb124a324f52bcda7a2348349412.jpg",Sequoia:"f4527d5db707410c861b335dd920d33f.png",Sonoma:"511eb4af7e97491c87e2a381d5ec2f93.jpg",Ventura:"1688b284ab9f4188ad4a553ce262506e.jpeg",Monterey:"6dd829c1c6544c14be95a230ef12d9a8.jpeg",BigSur:"21680da2400544b48772d7420b36813b.jpg"},ba={Classic:"23bb9995eafe4e85972f2695afbc5b31",BigSur:"481e1fd621f642a0a300fda663a9d054",Monterey:"3ef260075f344ce4b9b64d82b7c04606",Ventura:"4bd963a39eb34576b243a81df4d501d5",Sonoma:"66db65fa1ac243b288ef5f57a2cbdf74",Sequoia:"0df8535fcdab46a08eb27c16f070b264",Tahoe:"7d707af0d5fe49c4965828583b5ed20f",GoldenGate:"31aa5f0cc0ab41438f65c3f2a5b4c3d0",Twilight:"280da21ac62448a8bd82a2b3e1e4b091",Sunset:"2e94e3a61cd04ca3a0eb1a3911b847e6"},_n={Source1:"http://ssf.hdoi.cn/api/public/img",Source2:"http://172.16.21.199/api/public/img",Source3:"https://smart-hoj.is-great.org",Source4:"https://deeplearning.org.cn/api/public/img"},Pe=null;a(Be,"isDynamicWallpaper");a(ot,"isDynamicAvailable");a(ws,"getCurrentDynamicPath");a(Es,"getDynamicUrl");a(ya,"applyDynamicWallpaper");a(_t,"syncDynamicWallpaperTimer");a(Ln,"syncDynamicWallpaperOptions");a(ce,"applyBackground");a(Oe,"removeRowStripe");a(we,"initCardGlow");a(Fn,"closeMobileDrawer")});var ho={};Z(ho,{applyBackground:()=>ce,applySmoothClasses:()=>Ce,buildVars:()=>po,initCardGlow:()=>we,injectCss:()=>Ee,isDynamicAvailable:()=>ot,isDynamicWallpaper:()=>Be,removeRowStripe:()=>Oe,syncDynamicWallpaperOptions:()=>Ln,syncDynamicWallpaperTimer:()=>_t});function po(e){let t=!!e.Open,o=t&&!!e.DarkMode,n=t&&!!e.LiquidGlassUI,i=o&&n?"DL":o?"D":n?"L":"N",s={cardBg:{N:"#FFFFFFB0",L:"#FFFFFF4A",D:"#37373FB0",DL:"#37373F6A"},cardBlur:{N:"20px",L:"10px",D:"20px",DL:"10px"},cardRadius:{N:"15px",L:"15px",D:"15px",DL:"15px"},listBg:{N:"transparent",L:"transparent",D:"transparent",DL:"transparent"},listBgGreen:{N:"#E6FFDF60",L:"#E6FFDF60",D:"#E6FFDF60",DL:"#E6FFDF60"},listBgHover:{N:"#FFFFFF60",L:"#FFFFFF60",D:"#37373F60",DL:"#37373F60"},codeBg:{N:"#FFFFFFB0",L:"#FFFFFF4A",D:"#37373FB0",DL:"#37373F6A"},codeRadius:{N:"10px",L:"10px",D:"10px",DL:"10px"},inputBg:{N:"#FFFFFFB0",L:"#FFFFFF4A",D:"#37373FB0",DL:"#37373F6A"},inputRadius:{N:"10px",L:"10px",D:"10px",DL:"10px"},btnBg:{N:"#FFFFFFB0",L:"#FFFFFF4A",D:"#37373FB0",DL:"#37373F6A"},btnBgHover:{N:"#FFFFFFD0",L:"#FFFFFF4A",D:"#37373FD0",DL:"#37373F6A"},btnBgActive:{N:"#409EFF",L:"#409EFF",D:"#409EFF",DL:"#409EFF"},btnRadius:{N:"6px",L:"6px",D:"6px",DL:"6px"},tagRadius:{N:"6px",L:"6px",D:"6px",DL:"6px"},tooltipBg:{N:"#FFFFFFB0",L:"#FFFFFF4A",D:"#37373FB0",DL:"#37373F6A"},tooltipRadius:{N:"10px",L:"10px",D:"10px",DL:"10px"},judgeRadius:{N:"10px",L:"10px",D:"10px",DL:"10px"},textDark:{N:"#24292E",L:"#24292E",D:"#FFFFFF",DL:"#FFFFFF"},textDarkDisabled:{N:"#24292EB0",L:"#24292EB0",D:"#FFFFFFB0",DL:"#FFFFFFB0"},textLight:{N:"#FFFFFF",L:"#FFFFFF",D:"#24292E",DL:"#24292E"},textBlue:{N:"#0B459B",L:"#0B459B",D:"#409EFF",DL:"#409EFF"},textLink:{N:"#0B459B",L:"#0B459B",D:"#409EFF",DL:"#409EFF"},selectText:{N:"#3498DB60",L:"#3498DB60",D:"#3498DB60",DL:"#3498DB60"}},l=a((c,d)=>c&&c!=="Default"?c:s[d][i],"pick");return{"--hoj-card-bg":l(e.CardBackground,"cardBg"),"--hoj-card-blur":l(e.CardBlurRadius,"cardBlur"),"--hoj-card-radius":l(e.CardRadius,"cardRadius"),"--hoj-list-bg":l(e.ListBackground,"listBg"),"--hoj-list-bg-green":l(e.ListBackgroundGreen,"listBgGreen"),"--hoj-list-bg-hover":l(e.ListBackgroundHover,"listBgHover"),"--hoj-code-bg":l(e.CodeBlockBackground,"codeBg"),"--hoj-code-radius":l(e.CodeBlockRadius,"codeRadius"),"--hoj-input-bg":l(e.InputAreaBackground,"inputBg"),"--hoj-input-radius":l(e.InputAreaRadius,"inputRadius"),"--hoj-button-bg":l(e.ButtonBackground,"btnBg"),"--hoj-button-bg-hover":l(e.ButtonBackgroundHover,"btnBgHover"),"--hoj-button-bg-active":l(e.ButtonBackgroundActive,"btnBgActive"),"--hoj-button-radius":l(e.ButtonRadius,"btnRadius"),"--hoj-tag-radius":l(e.TagRadius,"tagRadius"),"--hoj-tooltip-bg":l(e.TooltipBackground,"tooltipBg"),"--hoj-tooltip-radius":l(e.TooltipRadius,"tooltipRadius"),"--hoj-judge-radius":l(e.JudgeDetailBlockRadius,"judgeRadius"),"--hoj-text-dark":l(e.TextDark,"textDark"),"--hoj-text-dark-disabled":l(e.TextDarkDisabled,"textDarkDisabled"),"--hoj-text-light":l(e.TextLight,"textLight"),"--hoj-text-blue":l(e.TextBlue,"textBlue"),"--hoj-text-link":l(e.TextLink,"textLink"),"--hoj-select-text":l(e.SelectText,"selectText"),"--hoj-sans-font":e.SansFont&&e.SansFont!=="Default"?e.SansFont:'"Noto Sans SC", sans-serif',"--hoj-mono-font":e.MonoFont&&e.MonoFont!=="Default"?e.MonoFont:'"Fira Code", monospace',"--hoj-bg-color":o?"#27272F":"#F8F8F9","--hoj-lg-card-bg":l(e.CardBackground,"cardBg"),"--hoj-hpm-card-bg":o?"#373747EE":"#FFFFFFEE","--hoj-scrollbar-bg":o?"#444":"#BBB","--hoj-scrollbar-bg-hover":o?"#666":"#999"}}function Ee(e){let t=po(e),o=`:root {
`;for(let[i,s]of Object.entries(t))o+=`  ${i}: ${s};
`;o+=`}
`;let n=document.getElementById(xa);n&&n.remove();let r=document.createElement("style");if(r.id=xa,e.Open){let i=o+oa+Sn;e.DarkMode&&(i+=ia),e.LiquidGlassUI&&(i+=ra),r.textContent=i,ha()}else r.textContent=o+Sn;(document.head||document.documentElement).appendChild(r),Cs(e),Ss(e),Ts(e),ma(e),ce(e),_t(e),Oe(),we(e)}function Cs(e){let t=document.getElementById(ka);t&&t.remove();let o=document.createElement("style");o.id=ka,o.textContent=e.ShowVersion?ca:"",(document.head||document.documentElement).appendChild(o)}function Ss(e){let t=document.getElementById(wa);t&&t.remove();let o=document.createElement("style");o.id=wa,o.textContent=e.Open&&e.BetterNotFound?da:"",(document.head||document.documentElement).appendChild(o)}function Ts(e){let t=document.getElementById(Ea);t&&t.remove();let o=document.createElement("style");o.id=Ea,o.textContent=e.Open&&e.HideNewHOJ?ua:"",(document.head||document.documentElement).appendChild(o)}function Ce(e){let t=document.documentElement,o=!!e.Open;t.classList.toggle("hoj-enabled",o),t.classList.toggle("hoj-smooth-scroll",o&&!!e.SmoothScroll),t.classList.toggle("hoj-smooth-switch",o&&!!e.SmoothSwitch);let n=o&&!!e.DarkMode,r=o&&!!e.LiquidGlassUI;t.classList.toggle("hoj-dark-mode",n),t.classList.toggle("hoj-lg-active",r),t.classList.toggle("hoj-liquid-glass",r&&!n);let i=o&&/\/admin(\/|$)/.test(window.location.pathname);t.classList.toggle("hoj-admin",i)}var xa,ka,wa,Ea,Se=O(()=>{"use strict";na();aa();sa();la();ga();Lt();xa="hoj-smart-style",ka="hoj-smart-style-show-version",wa="hoj-smart-style-better-not-found",Ea="hoj-smart-style-hide-new-hoj";a(po,"buildVars");a(Ee,"injectCss");a(Cs,"injectShowVersion");a(Ss,"injectBetterNotFound");a(Ts,"injectHideNewHOJ");a(Ce,"applySmoothClasses")});function Fs(e,t){let o=Ls[e];if(!o)return"";try{let n={...t,[e]:"Default"};return(po(n)[o]||"").trim()}catch(n){return console.warn("[ColorPreview] Failed to compute default color:",n),""}}function Ca(e,t){_s.forEach(o=>{let n=e.querySelector(`[data-key="${o}"]`);if(!n||n.parentElement?.classList.contains("hoj-input-with-preview"))return;let r=document.createElement("div");r.className="hoj-input-with-preview",n.parentNode.insertBefore(r,n),r.appendChild(n);let i=document.createElement("span");i.className="hoj-color-preview",i.dataset.previewFor=o,r.appendChild(i);let s=a(()=>{let l=n.value.trim(),u="",c="";Kr(l)?(u=l,c=l):l===""||l==="Default"?(u=Fs(o,t),c=u?`Default → ${u}`:"Default"):c=`无效值：${l}`,u?(i.style.background=u,i.style.opacity="1"):(i.style.background="repeating-conic-gradient(#ccc 0 25%, #fff 0 50%) 50% / 8px 8px",i.style.opacity="0.6"),i.title=c},"update");s(),n.addEventListener("input",s),n.addEventListener("change",s)})}function Mn(e){if(!Sa)return;let t=Ms();t&&t.querySelectorAll(".hoj-color-preview").forEach(o=>{let n=o.dataset.previewFor,r=t.querySelector(`[data-key="${n}"]`);r&&r.dispatchEvent(new Event("input"))})}function Ms(){return Sa}var _s,Ls,Sa,Ta=O(()=>{"use strict";ke();Se();_s=["CardBackground","ListBackground","ListBackgroundGreen","ListBackgroundHover","CodeBlockBackground","InputAreaBackground","ButtonBackground","ButtonBackgroundHover","ButtonBackgroundActive","TooltipBackground","TextDark","TextDarkDisabled","TextLight","TextBlue","TextLink","SelectText"],Ls={CardBackground:"--hoj-card-bg",ListBackground:"--hoj-list-bg",ListBackgroundGreen:"--hoj-list-bg-green",ListBackgroundHover:"--hoj-list-bg-hover",CodeBlockBackground:"--hoj-code-bg",InputAreaBackground:"--hoj-input-bg",ButtonBackground:"--hoj-button-bg",ButtonBackgroundHover:"--hoj-button-bg-hover",ButtonBackgroundActive:"--hoj-button-bg-active",TooltipBackground:"--hoj-tooltip-bg",TextDark:"--hoj-text-dark",TextDarkDisabled:"--hoj-text-dark-disabled",TextLight:"--hoj-text-light",TextBlue:"--hoj-text-blue",TextLink:"--hoj-text-link",SelectText:"--hoj-select-text"};a(Fs,"getDefaultColorFor");a(Ca,"attachColorPreviews");a(Mn,"refreshAllColorPreviews");Sa=null;a(Ms,"getSettingsPanel")});function me(){let e=window.location.pathname,t=e.match(/\/contest\/(\d+)\/problem\/([^\/?#]+)/);return t?{type:"contest",cid:t[1],displayId:t[2]}:(t=e.match(/\/training\/(\d+)\/problem\/([^\/?#]+)/),t?{type:"training",tid:t[1],displayId:t[2]}:(t=e.match(/\/group\/(\d+)\/problem\/([^\/?#]+)/),t?{type:"problem",problemId:t[2],gid:t[1]}:(t=e.match(/\/problem[\/:]([^\/?#]+)/),t?{type:"problem",problemId:t[1]}:null)))}async function nt(){let e=localStorage.getItem("token")||"",t=me();if(!t)return Promise.reject(new Error("无法从 URL 中识别题目"));let o;return t.type==="contest"?o=`${window.location.origin}/api/get-contest-problem-details?displayId=${encodeURIComponent(t.displayId)}&cid=${encodeURIComponent(t.cid)}&containsEnd=true`:(o=`${window.location.origin}/api/get-problem-detail?problemId=${encodeURIComponent(t.problemId)}`,t.gid&&(o+=`&gid=${encodeURIComponent(t.gid)}`)),console.log("[BetterHOJ] fetchProblemDetail →",o),fetch(o,{method:"GET",headers:{Authorization:e,"Content-Type":"application/json"},credentials:"include"}).then(n=>n.ok?n.json():Promise.reject(new Error(`HTTP ${n.status}`)))}function _a(e){if(!e||typeof e!="string")return e||"";if(!e.includes("&"))return e;let t=document.createElement("textarea");return t.innerHTML=e,t.value}function mo(e){let t=[];if(!e||typeof e!="string")return t;let o=/<input>([\s\S]*?)<\/input>\s*<output>([\s\S]*?)<\/output>/g,n;for(;(n=o.exec(e))!==null;){let r=_a(n[1]).replace(/^\s+|\s+$/g,""),i=_a(n[2]).replace(/\n+$/,"");t.push({input:r,output:i})}return t}var rt=O(()=>{"use strict";a(me,"parseProblemContext");a(nt,"fetchProblemDetail");a(_a,"decodeHtmlEntities");a(mo,"parseExamples")});var Da={};Z(Da,{addFavoriteButtonToDetail:()=>Dn,clearAllFavorites:()=>Hs,getFavorites:()=>de,injectFavoriteButtonsIntoTable:()=>Na,renderFavoritePanel:()=>Dt,saveFavorites:()=>at,setupFavorites:()=>Hn,updateFavoriteDetailButton:()=>go});function de(){try{let e=se(La,"[]"),t=typeof e=="string"?JSON.parse(e):e;return Array.isArray(t)?t:[]}catch{return[]}}function at(e){try{he(La,JSON.stringify(e))}catch{}}function Nn(e){return de().some(t=>t.problemId===e)}function Ns(e,t,o){let n=de();n.some(r=>r.problemId===e)||(n.push({problemId:e,title:t,href:o,addedAt:Date.now()}),at(n))}function Fa(e){at(de().filter(t=>t.problemId!==e))}function Ma(e,t,o){return Nn(e)?(Fa(e),!1):(Ns(e,t,o),!0)}function Nt(e){let t=document.createElement("div");return t.textContent=String(e??""),t.innerHTML}function bo(){let e=document.querySelectorAll(".vxe-table");for(let t of e){let o=Array.from(t.querySelectorAll("thead th .vxe-cell--title")).map(n=>n.textContent.trim());if(o.includes("题目ID")&&o.includes("题目")&&o.includes("难度"))return t}return null}function Na(e){if(!e)return;let t=Array.from(e.querySelectorAll("thead th")),o=-1,n=-1;if(t.forEach((i,s)=>{let l=i.querySelector(".vxe-cell--title");if(!l)return;let u=l.textContent.trim();u==="题目ID"?o=s:u==="题目"&&(n=s)}),o===-1||n===-1)return;let r=0;e.querySelectorAll("tbody tr.vxe-body--row").forEach(i=>{let s=Array.from(i.querySelectorAll("td.vxe-body--column"));if(s.length<=Math.max(o,n,r))return;let l=s[o],u=s[n],c=s[r],d=l.querySelector(".vxe-cell--label"),p=u.querySelector(".title-a");if(!d||!p)return;let g=d.textContent.trim(),h=p.textContent.trim(),m=p.getAttribute("href")||`/problem/${g}`,b=c.querySelector(".hoj-fav-btn");if(!b){b=document.createElement("i"),b.addEventListener("click",y=>{y.stopPropagation(),y.preventDefault();let C=b.dataset.problemId,k=b.dataset.title||C,A=b.dataset.href||`/problem/${C}`,w=Ma(C,k,A);document.querySelectorAll(".hoj-fav-btn").forEach(P=>{P.dataset.problemId===C&&(P.className=`hoj-fav-btn ${w?"el-icon-star-on is-fav":"el-icon-star-off"}`,P.title=w?"取消收藏":"收藏")}),v((w?"已收藏：":"已取消收藏：")+C,w?"success":"info"),Dt()});let x=c.querySelector(".vxe-cell")||c;x.style.display="flex",x.style.alignItems="center",x.style.justifyContent="center",x.appendChild(b)}let j=Nn(g);b.dataset.problemId=g,b.dataset.title=h,b.dataset.href=m,b.className=`hoj-fav-btn ${j?"el-icon-star-on is-fav":"el-icon-star-off"}`,b.title=j?"取消收藏":"收藏"})}function Ds(){let e=bo();if(!e)return null;let t=e.closest(".el-row");return t?t.querySelector(":scope > .el-col:last-child"):null}function Dt(){if(!bo())return;let e=document.getElementById("hoj-favorites-panel"),t=Ds();if(!t)return;(!e||e.parentElement!==t)&&(e&&e.remove(),e=document.createElement("div"),e.id="hoj-favorites-panel",e.className="el-card is-always-shadow",e.style.marginBottom="10px",t.insertBefore(e,t.firstChild));let o=de().sort((n,r)=>(r.addedAt||0)-(n.addedAt||0));e.innerHTML=`
    <div class="el-card__header">
      <div style="text-align:center;">
        <span class="taglist-title" data-v-83ac00a2=""> 我的收藏 (${o.length})</span>
      </div>
    </div>
    <div class="el-card__body">
      ${o.length===0?'<div style="text-align:center;color:#999;padding:10px 0;font-size:13px;">暂无收藏题目</div>':`<ul class="hoj-fav-list">
              ${o.map(n=>`
                  <li class="hoj-fav-item" data-id="${Nt(n.problemId)}">
                      <a href="${Nt(n.href)}" class="hoj-fav-link" title="${Nt(n.title)}">
                          <span class="hoj-fav-id">${Nt(n.problemId)}</span>
                          <span class="hoj-fav-title">${Nt(n.title)}</span>
                      </a>
                      <i class="el-icon-close hoj-fav-remove" title="移除"></i>
                  </li>
              `).join("")}
            </ul>`}
    </div>
  `,e.querySelectorAll(".hoj-fav-remove").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation(),r.preventDefault();let s=n.closest(".hoj-fav-item")?.dataset.id;if(!s)return;Fa(s);let l=document.querySelector(`.hoj-fav-btn[data-problem-id="${s}"]`);l&&(l.className="hoj-fav-btn el-icon-star-off",l.title="收藏"),Dt()})})}function go(){let e=document.getElementById("hoj-fav-detail-btn");if(!e)return;let t=me(),o=t?.type==="contest"?t.displayId:t?.problemId||"";if(!o)return;let n=Nn(String(o));e.innerHTML=`<i class="${n?"el-icon-star-on":"el-icon-star-off"}"></i> ${n?"已收藏":"收藏"}`,e.style.color=n?"#F7BA2A":""}function Dn(){let e=document.querySelector(".question-intr");if(!e||!/\/problem\/[^\/?#]+/.test(window.location.pathname)||bo())return;let t=me(),o=t?.type==="contest"?t.displayId:t?.problemId||"";if(!o)return;let n=document.getElementById("hoj-fav-detail-btn");n||(n=document.createElement("button"),n.id="hoj-fav-detail-btn",n.type="button",n.className="el-button el-button--primary is-plain bhoj-mini-button",n.style.cssText="padding:5px 10px;margin-left:8px;cursor:pointer;",n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();let i=document.querySelector(".panel-title > span[data-v-1c61011a]")?.textContent?.trim()||String(o),s=window.location.href,l=Ma(String(o),i,s);go(),v(l?"已收藏："+o:"已取消收藏："+o,l?"success":"info")}),e.appendChild(n)),go()}function Hs(){at([]),document.querySelectorAll(".hoj-fav-btn").forEach(e=>{e.className="hoj-fav-btn el-icon-star-off",e.title="收藏"}),Dt(),go(),v("已清空所有收藏","warning")}function Hn(){let e=bo();if(!e){console.log("Not Found Table");return}console.log("Found Table"),Na(e),Dt()}var La,Ht=O(()=>{"use strict";G();He();rt();La="hoj_problem_favorites";a(de,"getFavorites");a(at,"saveFavorites");a(Nn,"isFavorite");a(Ns,"addFavorite");a(Fa,"removeFavorite");a(Ma,"toggleFavorite");a(Nt,"escapeHtml");a(bo,"getProblemListTable");a(Na,"injectFavoriteButtonsIntoTable");a(Ds,"getRightColumn");a(Dt,"renderFavoritePanel");a(go,"updateFavoriteDetailButton");a(Dn,"addFavoriteButtonToDetail");a(Hs,"clearAllFavorites");a(Hn,"setupFavorites")});var Pa={};Z(Pa,{destroySnippetHotkeys:()=>Bs,getSnippets:()=>oe,mergeSnippetsInto:()=>Pn,openSnippetManager:()=>vo,openSnippetPanel:()=>Re,registerSnippetHotkeys:()=>it,saveSnippets:()=>In});function X(e){return String(e).replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function Ia(e){if(typeof e!="string"||!e)return!1;let t=document.activeElement;if(!t)return!1;let o=t.closest?t.closest(".CodeMirror"):null;if(o&&o.CodeMirror){try{o.CodeMirror.focus()}catch{}return o.CodeMirror.replaceSelection(e),o.CodeMirror.focus(),!0}if(t.tagName==="TEXTAREA"||t.tagName==="INPUT"&&!["checkbox","radio","submit","button","file","range","color"].includes((t.type||"").toLowerCase())){try{t.focus()}catch{}let n=t.selectionStart??t.value.length,r=t.selectionEnd??n;try{t.setRangeText(e,n,r,"end")}catch{t.value=t.value.slice(0,n)+e+t.value.slice(r),t.selectionStart=t.selectionEnd=n+e.length}return t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),!0}if(t.isContentEditable){try{t.focus()}catch{}return document.execCommand("insertText",!1,e),!0}return!1}function oe(e){return Array.isArray(e.Snippets)?e.Snippets:[]}function Pn(e,t){if(!Array.isArray(t))return{list:e,added:0,updated:0};let o=new Map;e.forEach(i=>{i&&i.id&&o.set(i.id,i)});let n=0,r=0;return t.forEach(i=>{!i||!i.id||(o.has(i.id)?r++:n++,o.set(i.id,i))}),{list:[...o.values()],added:n,updated:r}}function In(e,t){e.Snippets=Array.isArray(t)?t:[],Y(e)}function Is(){return"snip_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8)}function As(e){let t=e.key;return["Control","Shift","Alt","Meta","OS"].includes(t)?null:t===" "?"Space":t==="Enter"?"Enter":t==="Tab"?"Tab":t==="Backspace"?"Backspace":t==="Escape"?"Escape":t.length===1?t.toUpperCase():t}function Aa(e){let t=As(e);if(!t)return null;let o=[];return e.ctrlKey&&o.push("Ctrl"),e.altKey&&o.push("Alt"),e.shiftKey&&o.push("Shift"),e.metaKey&&o.push("Meta"),o.length===0&&!/^F\d+$/.test(t)?null:(o.push(t),o.join("+"))}function It(e){return e?e.split("+").map(t=>Ps[t]||t).join(" + "):""}function Ha(e,t){return t?Aa(e)===t:!1}function it(e){if(An)return;An=!0;let t=a(o=>{if(o.repeat||["Control","Shift","Alt","Meta","OS"].includes(o.key))return;let n=o.target;if(n&&n.closest&&n.closest("#hoj-settings-panel, .hoj-dialog, .hoj-dialog-mask, .hoj-tool, #hoj-like-box, #hoj-new-like-box"))return;let i=e.SnippetPanelHotkey;if(i&&Ha(o,i)){o.preventDefault(),o.stopPropagation(),Re(e);return}let s=oe(e);for(let l of s)if(l.hotkey&&Ha(o,l.hotkey)){o.preventDefault(),o.stopPropagation(),Ia(l.content||"")?v(f.t("snippet.inserted",{name:l.name||""}),"success",1200):v("@snippet.applyFailed","warning",1200);return}},"handler");window.addEventListener("keydown",t,!0),document.addEventListener("keydown",t,!0),it._handler=t}function Bs(){let e=it._handler;e&&(window.removeEventListener("keydown",e,!0),document.removeEventListener("keydown",e,!0),it._handler=null),An=!1}function Re(e){if(fo)return;fo=!0;let t=document.createElement("div");t.className="hoj-snippet-panel";let o=document.createElement("div");o.className="hoj-snippet-cats";let n=document.createElement("ul");n.className="hoj-snippet-list";let r=document.createElement("div");r.className="hoj-snippet-footer",r.innerHTML=`<span class="hoj-snippet-tip">↑↓ 选择 · ←→ 切换分类 · Enter 插入 · Esc 关闭</span>
  <button type="button" class="hoj-snippet-btn" data-act="manage">${f.t("snippet.manage")}</button>`,t.append(o,n,r),t.addEventListener("mousedown",y=>{y.target.closest("input, textarea, [contenteditable]")||y.preventDefault()});let i=oe(e),s=new Set;i.forEach(y=>s.add((y.category||"").trim()||"未分类"));let l=["全部",...[...s].sort()],u="全部",c=0,d=[],p=a(()=>{u==="全部"?d=i.slice():d=i.filter(y=>((y.category||"").trim()||"未分类")===u),c>=d.length&&(c=Math.max(0,d.length-1))},"computeVisible"),g=a(()=>{o.innerHTML=l.map(y=>`<button type="button" tabindex="-1" class="hoj-snippet-cat${y===u?" active":""}" data-cat="${X(y)}">${X(y)}</button>`).join("")},"renderTabs"),h=a(()=>{if(!d.length){n.innerHTML='<li class="hoj-snippet-empty">该分类下暂无片段</li>';return}n.innerHTML=d.map((y,C)=>`
    <li class="hoj-snippet-item${C===c?" active":""}" data-idx="${C}">
        <div class="hoj-snippet-item-main">
            <div class="hoj-snippet-item-name">${X(y.name||"(未命名)")}</div>
            ${y.description?`<div class="hoj-snippet-item-desc">${X(y.description)}</div>`:""}
        </div>
        ${y.hotkey?`<div class="hoj-snippet-item-hotkey">${X(It(y.hotkey))}</div>`:""}
    </li>
`).join("")},"renderList"),m=a(()=>{p(),g(),h()},"refresh"),b=a(y=>{if(!y)return;Ia(y.content||"")?v(f.t("snippet.inserted",{name:y.name||""}),"success",1200):v(f.t("snippet.applyFailed",{name:y.name||""}),"warning",1200)},"applySnippet");o.addEventListener("click",y=>{let C=y.target.closest(".hoj-snippet-cat");C&&(u=C.dataset.cat,c=0,m())}),n.addEventListener("click",y=>{let C=y.target.closest(".hoj-snippet-item");C&&b(d[Number(C.dataset.idx)])}),r.addEventListener("click",y=>{y.target.closest('[data-act="manage"]')&&(x(),setTimeout(()=>vo(e),200))});let j=a(y=>{if(fo)if(y.key==="ArrowDown")y.preventDefault(),y.stopPropagation(),d.length&&(c=(c+1)%d.length,h());else if(y.key==="ArrowUp")y.preventDefault(),y.stopPropagation(),d.length&&(c=(c-1+d.length)%d.length,h());else if(y.key==="ArrowRight"){y.preventDefault(),y.stopPropagation();let C=l.indexOf(u);u=l[(C+1)%l.length],c=0,m()}else if(y.key==="ArrowLeft"){y.preventDefault(),y.stopPropagation();let C=l.indexOf(u);u=l[(C-1+l.length)%l.length],c=0,m()}else y.key==="Home"?(y.preventDefault(),c=0,h()):y.key==="End"?(y.preventDefault(),c=d.length-1,h()):y.key==="Enter"?(y.preventDefault(),y.stopPropagation(),b(d[c])):y.key==="Escape"&&(y.preventDefault(),y.stopPropagation(),x())},"onKey");document.addEventListener("keydown",j,!0),m();let x=null;x=J({title:"代码片段",bodyEl:t,width:"560px",maxHeight:"70vh",onClose:()=>{fo=!1,document.removeEventListener("keydown",j,!0)}})}function vo(e){let t=document.createElement("div");t.className="hoj-snippet-mgr";let o=document.createElement("div");o.className="hoj-snippet-mgr-list",t.appendChild(o);let n=document.createElement("div");n.className="hoj-snippet-mgr-actions";let r=document.createElement("button");r.type="button",r.className="hoj-snippet-btn hoj-snippet-btn--primary",r.textContent="+ 新建片段",n.appendChild(r),t.appendChild(n);let i=document.createElement("div");i.className="hoj-snippet-mgr-editor",i.style.display="none",t.appendChild(i);let s=null,l=a(()=>{let c=oe(e);if(!c.length){o.innerHTML='<div class="hoj-snippet-mgr-empty">暂无片段</div>';return}o.innerHTML=c.map(d=>`
    <div class="hoj-snippet-mgr-item${d.id===s?.id?" active":""}" data-id="${X(d.id)}">
        <div class="hoj-snippet-mgr-item-main">
            <div class="hoj-snippet-mgr-item-name">${X(d.name||"(未命名)")}</div>
            ${d.description?`<div class="hoj-snippet-mgr-item-desc">${X(d.description)}</div>`:""}
        </div>
        <div class="hoj-snippet-mgr-item-right">
            ${d.category?`<span class="hoj-snippet-mgr-item-cat">${X(d.category)}</span>`:""}
            ${d.hotkey?`<span class="hoj-snippet-mgr-item-hotkey">${X(It(d.hotkey))}</span>`:""}
            <button type="button" class="hoj-snippet-mgr-del" data-del="${X(d.id)}" title="删除">×</button>
        </div>
    </div>
`).join("")},"renderList"),u=a(c=>{if(s=c,i.style.display=c?"block":"none",!c)return;let d=X(c.name||""),p=X(c.description||""),g=X(c.category||""),h=X(c.content||""),m=X(c.hotkey?It(c.hotkey):"");i.innerHTML=`
    <div class="hoj-snippet-field">
        <label>名称</label>
        <input type="text" class="hoj-snippet-input" data-field="name"
               placeholder="例如：快读模板" value="${d}">
    </div>
    <div class="hoj-snippet-field">
        <label>介绍</label>
        <input type="text" class="hoj-snippet-input" data-field="desc"
               placeholder="简短说明（用于搜索）" value="${p}">
    </div>
    <div class="hoj-snippet-field">
        <label>分类（可选，相同分类会归为一组）</label>
        <input type="text" class="hoj-snippet-input" data-field="category"
               placeholder="例如：算法模板" value="${g}">
    </div>
    <div class="hoj-snippet-field">
        <label>快捷键（点击后按下组合键；Esc / 退格清空）</label>
        <input type="text" class="hoj-snippet-input hoj-snippet-hotkey-input" data-field="hotkey" readonly
               placeholder="例如 Ctrl+Alt+1" value="${m}">
    </div>
    <div class="hoj-snippet-field">
        <label>内容</label>
        <textarea class="hoj-snippet-textarea" data-field="content" rows="8"
                  placeholder="插入的文本内容">${h}</textarea>
    </div>
    <div class="hoj-snippet-editor-actions">
        <button type="button" class="hoj-snippet-btn" data-act="cancel">取消</button>
        <button type="button" class="hoj-snippet-btn hoj-snippet-btn--primary" data-act="save">保存</button>
    </div>
`;let b=a(y=>i.querySelector(`[data-field="${y}"]`),"$f"),j=b("hotkey"),x=c.hotkey||"";j.addEventListener("keydown",y=>{if(["Control","Shift","Alt","Meta"].includes(y.key)){y.preventDefault(),y.stopPropagation();return}if(y.preventDefault(),y.stopPropagation(),["Escape","Backspace","Delete"].includes(y.key)){x="",j.value="";return}let C=Aa(y);C?(x=C,j.value=It(C)):(j.value="需包含 Ctrl/Alt/Win 修饰键",setTimeout(()=>{j.value=x?It(x):""},700))}),j.addEventListener("focus",()=>j.select()),i.querySelector('[data-act="cancel"]').addEventListener("click",()=>{i.style.display="none",s=null,l()}),i.querySelector('[data-act="save"]').addEventListener("click",()=>{let y=b("name"),C=b("desc"),k=b("category"),A=b("content");if(!y.value.trim())return v("请填写名称","warning");if(!A.value)return v("请填写内容","warning");if(x){let B=oe(e).find(_=>_.id!==(c?c.id:null)&&_.hotkey===x);if(B)return v(`快捷键与「${B.name}」冲突`,"error");if(e.SnippetPanelHotkey===x)return v("快捷键与「唤出面板」冲突","error")}let w=oe(e),P={id:c.id,name:y.value.trim(),desc:C.value.trim()||void 0,category:k.value.trim()||void 0,content:A.value,hotkey:x||void 0};if(c){let N=w.findIndex(B=>B.id===c.id);N>=0&&(w[N]=P)}else w.push({id:Is(),...P});In(e,w),v("已保存","success",1200),i.style.display="none",s=null,l()})},"renderEditor");o.addEventListener("click",c=>{let d=c.target.closest("[data-del]");if(d){c.stopPropagation();let m=d.dataset.del,b=oe(e),j=b.find(x=>x.id===m);if(!j)return;ie({title:"@action.delete",content:f.t("snippet.deleteConfirm",{name:j.name}),type:"warning"}).then(x=>{x&&(In(e,b.filter(y=>y.id!==m)),s?.id===m&&(i.style.display="none",s=null),l())});return}let p=c.target.closest(".hoj-snippet-mgr-item");if(!p)return;let h=oe(e).find(m=>m.id===p.dataset.id);h&&(u(h),l())}),r.addEventListener("click",()=>{u(null),l()}),l(),J({title:"片段管理",bodyEl:t,width:"620px",maxHeight:"80vh"})}var Ps,An,fo,At=O(()=>{"use strict";G();K();le();a(X,"escapeHtml");a(Ia,"insertSnippetText");a(oe,"getSnippets");a(Pn,"mergeSnippetsInto");a(In,"saveSnippets");a(Is,"newSnippetId");a(As,"_normMainKey");a(Aa,"normalizeHotkey");a(It,"formatHotkeyDisplay");Ps={Ctrl:"Ctrl",Alt:"Alt",Shift:"Shift",Meta:"Meta",Enter:"Enter",Tab:"Tab",Space:"Space",Backspace:"Backspace",Escape:"Esc"};a(Ha,"matchHotkey");An=!1;a(it,"registerSnippetHotkeys");a(Bs,"destroySnippetHotkeys");fo=!1;a(Re,"openSnippetPanel");a(vo,"openSnippetManager")});var Q,Pt=O(()=>{"use strict";Q={version:"27.3.7",name:"Better HOJ 27",count:120,date:"2026-10-15"}});var qe,Ba=O(()=>{"use strict";He();qe=class{constructor(t){this._dragMoved=!1;this._cleanup=null;if(!t.id)throw new Error("NewTool: id required");this.id=t.id,this.title=t.title||this.id,this.icon=t.icon||"",this.width=t.width||220,this.height=t.height||120,this.minWidth=t.minWidth||140,this.minHeight=t.minHeight||60,this.left=t.left??window.innerWidth-this.width-20,this.top=t.top??80,this.onClick=t.onClick||null,this.onResize=t.onResize||null,this.hideCloseButton=!!t.hideCloseButton,this.onClose=t.onClose||null,this._defaultWidth=this.width,this._defaultHeight=this.height,this._defaultLeft=this.left,this._defaultTop=this.top,this._loadState(),this._build(),this._mount()}_key(t){return`hoj_tool_${this.id}_${t}`}_loadState(){try{let t=se(this._key("state"),null);if(!t)return;let o=typeof t=="string"?JSON.parse(t):t;typeof o.left=="number"&&(this.left=o.left),typeof o.top=="number"&&(this.top=o.top),typeof o.width=="number"&&(this.width=o.width),typeof o.height=="number"&&(this.height=o.height)}catch{}}_saveState(){try{he(this._key("state"),JSON.stringify({left:this.left,top:this.top,width:this.width,height:this.height}))}catch{}}_build(){let t=document.createElement("div");t.id=`hoj-tool-${this.id}`,t.className="hoj-tool",t.style.left=this.left+"px",t.style.top=this.top+"px",t.style.width=this.width+"px",t.style.height=this.height+"px";let o=document.createElement("div");o.className="hoj-tool__header",o.innerHTML=`
      <span class="hoj-tool__title">${this.icon} ${this.title}</span>
      <span class="hoj-tool__actions">
        <i class="hoj-tool__btn hoj-tool__reset el-icon-refresh-right" title="${this._t("tool.reset")}"></i>
        ${this.hideCloseButton?"":`<i class="hoj-tool__btn hoj-tool__close el-icon-close" title="${this._t("tool.close")}"></i>`}
      </span>
    `;let n=document.createElement("div");n.className="hoj-tool__body";let r=document.createElement("div");r.className="hoj-tool__resize",t.append(o,n,r),this.el=t,this.headerEl=o,this.bodyEl=n,this.handleEl=r,this._bindDrag(),this._bindResize(),this._bindClick()}_t(t){return`@${t}`}_bindDrag(){let t=!1,o=0,n=0,r=0,i=0,s=a(c=>{c.button===0&&(c.target instanceof Element&&c.target.closest(".hoj-tool__btn")||(c.preventDefault(),this._dragMoved=!1,t=!0,o=c.clientX,n=c.clientY,r=this.left,i=this.top,document.addEventListener("mousemove",l,!0),document.addEventListener("mouseup",u,!0)))},"onDown"),l=a(c=>{if(!t)return;let d=c.clientX-o,p=c.clientY-n;(Math.abs(d)>3||Math.abs(p)>3)&&(this._dragMoved=!0),this.left=Math.max(0,Math.min(r+d,window.innerWidth-this.width)),this.top=Math.max(0,Math.min(i+p,window.innerHeight-40)),this.el.style.left=this.left+"px",this.el.style.top=this.top+"px"},"onMove"),u=a(()=>{t=!1,document.removeEventListener("mousemove",l,!0),document.removeEventListener("mouseup",u,!0),this._saveState(),setTimeout(()=>{this._dragMoved=!1},0)},"onUp");this.headerEl.addEventListener("mousedown",s)}_bindResize(){let t=!1,o=0,n=0,r=0,i=0,s=a(c=>{c.button===0&&(c.preventDefault(),c.stopPropagation(),t=!0,o=c.clientX,n=c.clientY,r=this.width,i=this.height,document.addEventListener("mousemove",l,!0),document.addEventListener("mouseup",u,!0))},"onDown"),l=a(c=>{t&&(this.width=Math.max(this.minWidth,r+c.clientX-o),this.height=Math.max(this.minHeight,i+c.clientY-n),this.el.style.width=this.width+"px",this.el.style.height=this.height+"px",this.onResize&&this.onResize(this.bodyEl,this.width,this.height))},"onMove"),u=a(()=>{t=!1,document.removeEventListener("mousemove",l,!0),document.removeEventListener("mouseup",u,!0),this._saveState()},"onUp");this.handleEl.addEventListener("mousedown",s)}_bindClick(){this.headerEl.addEventListener("click",n=>{n.target instanceof Element&&n.target.closest(".hoj-tool__btn")||this._dragMoved||this.onClick&&this.onClick(this)});let t=this.headerEl.querySelector(".hoj-tool__reset");t&&t.addEventListener("click",n=>{n.stopPropagation(),this.resetPosition()});let o=this.headerEl.querySelector(".hoj-tool__close");o&&o.addEventListener("click",n=>{if(n.stopPropagation(),this.hide(),this.onClose)try{this.onClose(this)}catch(r){console.warn("[NewTool] onClose error:",r)}})}resetPosition(){this.width=this._defaultWidth,this.height=this._defaultHeight,this.left=window.innerWidth-this.width-20,this.top=80,this.el.style.left=this.left+"px",this.el.style.top=this.top+"px",this.el.style.width=this.width+"px",this.el.style.height=this.height+"px",this._saveState(),this.onResize&&this.onResize(this.bodyEl,this.width,this.height)}_mount(){document.body.contains(this.el)||document.body.appendChild(this.el)}hide(){this.el.parentNode&&this.el.parentNode.removeChild(this.el)}show(){this._mount()}destroy(){this._cleanup&&this._cleanup(),this.el.parentNode&&this.el.parentNode.removeChild(this.el)}setCleanup(t){this._cleanup=t}};a(qe,"NewTool");a(function(){if(document.getElementById("hoj-tool-style"))return;let t=document.createElement("style");t.id="hoj-tool-style",t.textContent=`
    .hoj-tool {
      position: fixed;
      z-index: 99998;
      display: flex;
      flex-direction: column;
      background: var(--hoj-card-bg, #FFFFFFE0);
      backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
      -webkit-backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
      color: var(--hoj-text-dark, #24292E);
      border-radius: var(--hoj-card-radius, 15px);
      box-shadow: 0 2px 12px rgba(0,0,0,.15);
      overflow: hidden;
      font-family: var(--hoj-sans-font, sans-serif);
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

    html.hoj-dark-mode .hoj-tool { background: #37373FE0; color: #FFFFFF; }
    html.hoj-dark-mode .hoj-tool__header { border-color: rgba(255,255,255,.08); }
  `,document.head.appendChild(t)},"injectToolStyle")()});var Ra={};Z(Ra,{initAllTools:()=>st,mountSettingsInto:()=>$s,setSettingsPanel:()=>Bn,startPageTimeTracker:()=>xo,waitForSelector:()=>qt});function jo(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`hoj_pagetime_${e.getFullYear()}-${t}-${o}`}function xo(){if(Bt)return;let e=a(()=>{let o=Date.now();if(yo){let n=Math.floor((o-Ot)/1e3);if(n>0){let r=(se(jo(),0)|0)+n;he(jo(),r)}}Ot=o},"tick"),t=a(()=>{e(),yo=!document.hidden,Ot=Date.now()},"onVis");document.addEventListener("visibilitychange",t),window.addEventListener("blur",()=>{e(),yo=!1,Ot=Date.now()}),window.addEventListener("focus",()=>{e(),yo=!0,Ot=Date.now()}),Bt=window.setInterval(e,1e3),window.addEventListener("beforeunload",e),xo._stop=()=>{Bt&&(clearInterval(Bt),Bt=null),document.removeEventListener("visibilitychange",t)}}function Bn(e){Rt=e}function On(e){let t=Oa;if(t){if(t[e]=!1,Y(t),Rt){let o=Rt.querySelector(`[data-key="${e}"]`);o&&(o.checked=!1)}st(t)}}function st(e){if(Oa=e,!e.ToolsEnabled){Object.keys(ge).forEach(n=>{ge[n]&&(ge[n].destroy(),ge[n]=null)});return}let t={keystroke:!!e.ToolsKeystroke,pagetime:!!e.ToolsPageTime,clock:!!e.ToolsClock},o={keystroke:Os,pagetime:Rs,clock:qs};Object.keys(t).forEach(n=>{t[n]&&!ge[n]&&(ge[n]=o[n]()),!t[n]&&ge[n]&&(ge[n].destroy(),ge[n]=null)})}function Os(){let e=new qe({id:"keystroke",title:f.t("tools.keystroke"),icon:"⌨️",width:240,height:90,minWidth:140,minHeight:60,left:20,top:window.innerHeight-200,onClose:()=>On("ToolsKeystroke")}),t=e.bodyEl;t.style.cssText+="display:flex;flex-direction:row;align-items:center;gap:6px;padding-top:10px;overflow:hidden;";let o=5,n=5e3,r=400,i=[],s=a(c=>{let d=c.key;return["Control","Shift","Alt","Meta","CapsLock"].includes(d)?null:d===" "?"Space":d==="Enter"?"↵":d==="Tab"?"Tab":d==="Backspace"?"⌫":d==="Escape"?"Esc":d},"fmt"),l=a(c=>{if(!c||!c.parentNode)return;c._hojTimer&&(clearTimeout(c._hojTimer),c._hojTimer=null);let d=i.indexOf(c);d>=0&&i.splice(d,1),c.classList.remove("hoj-key--in"),c.classList.add("hoj-key--out"),setTimeout(()=>{c.parentNode&&c.parentNode.removeChild(c)},r)},"fadeOutAndRemove"),u=a(c=>{let d=s(c);if(!d)return;let p=document.createElement("span");for(p.className="hoj-key",p.textContent=d,t.appendChild(p),i.push(p),requestAnimationFrame(()=>p.classList.add("hoj-key--in")),p._hojTimer=setTimeout(()=>{p._hojTimer=null,l(p)},n);i.length>o;)l(i[0])},"onKey");return document.addEventListener("keydown",u,!0),e.setCleanup(()=>document.removeEventListener("keydown",u,!0)),e}function Rs(){let e=new qe({id:"pagetime",title:f.t("tools.time"),icon:"⏱️",width:200,height:90,minWidth:140,minHeight:70,left:20,top:window.innerHeight-330,onClose:()=>On("ToolsPageTime")}),t=e.bodyEl;t.style.cssText+="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;";let o=document.createElement("div");o.style.cssText="font-size:22px;font-weight:700;font-variant-numeric:tabular-nums;";let n=document.createElement("div");n.style.cssText="font-size:11px;opacity:.6;",n.textContent="页面活跃时长",t.append(o,n);let r=a(s=>{let l=String(Math.floor(s/3600)).padStart(2,"0"),u=String(Math.floor(s%3600/60)).padStart(2,"0"),c=String(s%60).padStart(2,"0");o.textContent=`${l}:${u}:${c}`},"render");r(se(jo(),0)|0);let i=window.setInterval(()=>{r(se(jo(),0)|0)},1e3);return e.setCleanup(()=>clearInterval(i)),e}function qs(){let e=new qe({id:"clock",title:f.t("tools.clock"),icon:"🕐",width:200,height:100,minWidth:140,minHeight:70,left:20,top:80,onClose:()=>On("ToolsClock")}),t=e.bodyEl;t.style.cssText+="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;";let o=document.createElement("div");o.style.cssText="font-size:26px;font-weight:700;font-variant-numeric:tabular-nums;";let n=document.createElement("div");n.style.cssText="font-size:12px;opacity:.65;",t.append(o,n);let r=["周日","周一","周二","周三","周四","周五","周六"],i=a(()=>{let l=new Date;o.textContent=`${String(l.getHours()).padStart(2,"0")}:${String(l.getMinutes()).padStart(2,"0")}:${String(l.getSeconds()).padStart(2,"0")}`,n.textContent=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} ${r[l.getDay()]}`},"tick");i();let s=window.setInterval(i,1e3);return e.setCleanup(()=>clearInterval(s)),e}function qt(e,t,o=15e3){let n=document.querySelector(e);if(n){t(n);return}let r=Date.now(),i=new MutationObserver(()=>{let s=document.querySelector(e);s?(i.disconnect(),t(s)):Date.now()-r>o&&i.disconnect()});i.observe(document.body,{childList:!0,subtree:!0})}function $s(e){if(!Rt)return;let t=Rt;t.style.position="static",t.style.top="auto",t.style.right="auto",t.style.left="auto",t.style.width="100%",t.style.height="auto",t.style.maxHeight="none",t.style.overflowY="visible",t.style.boxShadow="none",t.style.background="transparent",t.style.backdropFilter="none",t.style.display="block",t.parentNode!==e&&(e.innerHTML="",e.appendChild(t))}var ge,Bt,yo,Ot,Rt,Oa,lt=O(()=>{"use strict";Ba();K();le();He();ge={keystroke:null,pagetime:null,clock:null},Bt=null,yo=!document.hidden,Ot=Date.now();a(jo,"getPageTimeKey");a(xo,"startPageTimeTracker");Rt=null;a(Bn,"setSettingsPanel");Oa=null;a(On,"closeToolAndSync");a(st,"initAllTools");a(Os,"initKeystrokeTool");a(Rs,"initPageTimeTool");a(qs,"initClockTool");a(qt,"waitForSelector");a($s,"mountSettingsInto")});var Va={};Z(Va,{applyNavbarLayout:()=>Ys,openNavbarLayoutDialog:()=>Rn,scheduleApplyNavbarLayout:()=>dt});function Co(e){let t=ct.map(s=>({key:s.key,visible:!0})),o=e.NavbarLayout;if(!Array.isArray(o)||!o.length)return t;let n=new Set(ct.map(s=>s.key)),r=new Set,i=[];return o.forEach(s=>{!s||typeof s!="object"||!n.has(s.key)||r.has(s.key)||(i.push({key:s.key,visible:s.visible!==!1}),r.add(s.key))}),t.forEach(s=>{r.has(s.key)||i.push(s)}),i}function Vs(e,t){e.NavbarLayout=t.map(o=>({key:o.key,visible:!!o.visible}))}function Js(e){let t=new Map;ct.forEach(n=>{if(!n.selector)return;let r=e.querySelector(n.selector);r&&t.set(n.key,r)});let o=ct.filter(n=>n.matchText);return e.querySelectorAll(":scope > li.el-menu-item, :scope > li.el-submenu").forEach(n=>{let r=n.querySelector(":scope > .el-submenu__title"),i=(r?r.textContent:n.textContent||"").trim();for(let s of o){if(t.has(s.key))continue;if((Array.isArray(s.matchText)?s.matchText:[s.matchText]).some(u=>u&&i.includes(u))){t.set(s.key,n);break}}}),t}function qa(e){let t=document.querySelector("#header ul.el-menu.el-menu--horizontal, #header ul.el-menu--horizontal");if(!t)return;let o=Co(e),n=Js(t),r=[];if(o.forEach(c=>{let d=n.get(c.key);d&&r.push({el:d,visible:c.visible})}),!r.length)return;let i=!1,s=new Set(r.map(c=>c.el)),l=[];for(let c of t.children)s.has(c)&&l.push(c);if(l.length!==r.length)i=!0;else for(let c=0;c<r.length;c++)if(l[c]!==r[c].el){i=!0;break}if(!i)for(let{el:c,visible:d}of r){let p=d?"0":"1",g=c.dataset.hojNavHidden||"0";if(p!==g){i=!0;break}}if(!i)return;let u=null;for(let c of Us){let d=t.querySelector(c);if(d&&d.parentNode===t){u=d;break}}if(r.forEach(({el:c})=>{c.parentNode===t&&t.removeChild(c)}),u){let c=u;for(let d=r.length-1;d>=0;d--){let{el:p,visible:g}=r[d];p.style.display=g?"":"none",p.dataset.hojNavHidden=g?"0":"1",t.insertBefore(p,c),c=p}}else r.forEach(({el:c,visible:d})=>{c.style.display=d?"":"none",c.dataset.hojNavHidden=d?"0":"1",t.appendChild(c)});console.log("[NavbarLayout] 已应用布局:",o.map(c=>`${c.visible?"+":"-"}${c.key}`).join(" "))}function Ws(){let e=new Map,t=document.querySelector(".mu-drawer");if(!t)return e;let o=null;for(let r of t.children)if(r.tagName==="UL"&&r.classList.contains("mu-list")){o=r;break}if(!o)return e;let n=o.querySelector(":scope > #hoj-mobile-settings-btn");return n&&e.set("settings",n),o.querySelectorAll(":scope > li").forEach(r=>{if(r.id!=="hoj-mobile-settings-btn")for(let[i,s]of Object.entries(zs)){if(e.has(i))continue;if([...r.querySelectorAll("i")].some(u=>u.classList&&u.classList.contains(s))){e.set(i,r);break}}}),e}function $a(e){let t=document.querySelector(".mu-drawer");if(!t)return;let o=null;for(let c of t.children)if(c.tagName==="UL"&&c.classList.contains("mu-list")){o=c;break}if(!o)return;let n=Co(e),r=Ws();if(!r.size)return;let i=[];if(n.forEach(c=>{let d=r.get(c.key);d&&i.push({el:d,visible:c.visible})}),!i.length)return;let s=!1,l=new Set(i.map(c=>c.el)),u=[];for(let c of o.children)l.has(c)&&u.push(c);if(u.length!==i.length)s=!0;else for(let c=0;c<i.length;c++)if(u[c]!==i[c].el){s=!0;break}if(!s)for(let{el:c,visible:d}of i){let p=d?"0":"1",g=c.dataset.hojNavHidden||"0";if(p!==g){s=!0;break}}s&&(i.forEach(({el:c})=>{c.parentNode===o&&o.removeChild(c)}),i.forEach(({el:c,visible:d})=>{c.style.display=d?"":"none",c.dataset.hojNavHidden=d?"0":"1",o.appendChild(c)}),console.log("[NavbarLayout] 移动端布局已应用"))}function za(){let e=document.querySelector("nav[data-v-9dacc850]")||document.querySelector("nav[data-v-7b0404d0]");return e?e.querySelector("div.flex.flex-row"):null}function Ks(){let e=new Map,t=za();if(!t)return e;let o=t.querySelector("#hoj-new-settings-btn");o&&e.set("settings",o);let n=t.querySelector("#hoj-back-old-btn");return n&&e.set("backold",n),t.querySelectorAll(":scope > button.gear-item").forEach(r=>{if(r.id==="hoj-new-settings-btn"||r.id==="hoj-back-old-btn")return;for(let l of e.values())if(l===r)return;let i=r.querySelector(".truncate"),s=i?i.textContent.trim():(r.textContent||"").trim();for(let[l,u]of Object.entries(Gs))if(!e.has(l)&&s.includes(u)){e.set(l,r);break}}),e}function Ga(e){let t=za();if(!t)return;let o=Co(e),n=Ks();if(!n.size)return;let r=[];o.forEach(c=>{let d=n.get(c.key);d&&r.push({el:d,visible:c.visible})});let i=[n.get("settings"),n.get("backold")].filter(Boolean),s=new Set([...r.map(c=>c.el),...i]);if(!s.size)return;let l=!1,u=[];for(let c of t.children)s.has(c)&&u.push(c);if(u.length!==s.size)l=!0;else{for(let c=0;c<r.length;c++)if(u[c]!==r[c].el){l=!0;break}if(!l){for(let c=0;c<i.length;c++)if(u[r.length+c]!==i[c]){l=!0;break}}}if(!l)for(let{el:c,visible:d}of r){let p=d?"0":"1",g=c.dataset.hojNavHidden||"0";if(p!==g){l=!0;break}}l&&(s.forEach(c=>{c.parentNode===t&&t.removeChild(c)}),r.forEach(({el:c,visible:d})=>{c.style.display=d?"":"none",c.dataset.hojNavHidden=d?"0":"1",t.appendChild(c)}),i.forEach(c=>{c.style.display="",delete c.dataset.hojNavHidden,t.appendChild(c)}),console.log("[NavbarLayout] /new 前端布局已应用"))}function dt(e=200){ko&&clearTimeout(ko),ko=window.setTimeout(()=>{ko=null;try{qa(Eo)}catch(t){console.warn("[NavbarLayout] 旧前端:",t)}try{$a(Eo)}catch(t){console.warn("[NavbarLayout] 移动端:",t)}try{Ga(Eo)}catch(t){console.warn("[NavbarLayout] 新前端:",t)}},e)}function Ua(e){Eo=e}function Ys(e){Ua(e),qa(e),$a(e),Ga(e)}function Rn(e){if(Ua(e),wo){wo();return}let t=Co(e),o=document.createElement("div");o.className="hoj-navbar-layout";let n=document.createElement("div");n.className="hoj-navbar-hint",n.textContent=E("navbar.hint"),o.appendChild(n);let r=document.createElement("ul");r.className="hoj-navbar-list",o.appendChild(r);let i=a(()=>{Vs(e,t),dt(0)},"persist"),s=a(()=>{r.innerHTML="",t.forEach((d,p)=>{let g=ct.find(b=>b.key===d.key),h=g?E(g.labelKey):d.key,m=document.createElement("li");m.className="hoj-navbar-item",m.draggable=!0,m.dataset.key=d.key,m.dataset.idx=String(p),m.innerHTML=`
        <span class="hoj-navbar-drag">⋮⋮</span>
        <label class="hoj-navbar-check">
            <input type="checkbox" ${d.visible?"checked":""}>
        </label>
        <span class="hoj-navbar-label"></span>
        <span class="hoj-navbar-arrows">
            <button type="button" data-act="up"   ${p===0?"disabled":""}>▲</button>
            <button type="button" data-act="down" ${p===t.length-1?"disabled":""}>▼</button>
        </span>
      `,m.querySelector(".hoj-navbar-label").textContent=h,m.querySelector('input[type="checkbox"]').addEventListener("change",b=>{d.visible=b.target.checked,i()}),m.querySelector('[data-act="up"]').addEventListener("click",()=>{p!==0&&([t[p-1],t[p]]=[t[p],t[p-1]],i(),s())}),m.querySelector('[data-act="down"]').addEventListener("click",()=>{p!==t.length-1&&([t[p+1],t[p]]=[t[p],t[p+1]],i(),s())}),r.appendChild(m)})},"renderList"),l=null;r.addEventListener("dragstart",d=>{let p=d.target.closest(".hoj-navbar-item");if(p){l=Number(p.dataset.idx),p.classList.add("hoj-navbar-dragging"),d.dataTransfer.effectAllowed="move";try{d.dataTransfer.setData("text/plain",p.dataset.key)}catch{}}}),r.addEventListener("dragover",d=>{d.preventDefault();let p=d.target.closest(".hoj-navbar-item");if(!p||l===null||Number(p.dataset.idx)===l)return;r.querySelectorAll(".hoj-navbar-drop-before, .hoj-navbar-drop-after").forEach(m=>m.classList.remove("hoj-navbar-drop-before","hoj-navbar-drop-after"));let g=p.getBoundingClientRect(),h=d.clientY-g.top>g.height/2;p.classList.add(h?"hoj-navbar-drop-after":"hoj-navbar-drop-before")}),r.addEventListener("drop",d=>{if(d.preventDefault(),l===null)return;let p=d.target.closest(".hoj-navbar-item");if(!p)return;let g=Number(p.dataset.idx),h=p.getBoundingClientRect();d.clientY-h.top>h.height/2&&g++;let[m]=t.splice(l,1),b=g;l<g&&b--,b=Math.max(0,Math.min(b,t.length)),t.splice(b,0,m),i(),s()}),r.addEventListener("dragend",()=>{r.querySelectorAll(".hoj-navbar-drop-before, .hoj-navbar-drop-after, .hoj-navbar-dragging").forEach(d=>d.classList.remove("hoj-navbar-drop-before","hoj-navbar-drop-after","hoj-navbar-dragging"))});let u=document.createElement("div");u.className="hoj-navbar-footer";let c=document.createElement("button");c.type="button",c.className="hoj-snippet-btn",c.textContent=E("navbar.reset"),c.addEventListener("click",async()=>{await ie({title:"@navbar.reset.confirm.title",content:"@navbar.reset.confirm.body",type:"warning",confirmText:"@navbar.reset.confirm.ok"})&&(t=ct.map(p=>({key:p.key,visible:!0})),i(),s())}),u.appendChild(c),o.appendChild(u),s(),wo=J({title:E("navbar.title"),bodyEl:o,width:"500px",maxHeight:"70vh",onClose:()=>{wo=null}})}var ct,zs,Gs,Us,ko,Eo,wo,So=O(()=>{"use strict";G();K();ct=[{key:"logo",labelKey:"nav.item.logo",selector:".logo"},{key:"home",labelKey:"nav.item.home",matchText:["首页","Home"]},{key:"problems",labelKey:"nav.item.problems",matchText:["题目","Problem"]},{key:"training",labelKey:"nav.item.training",matchText:["训练","Training"]},{key:"contest",labelKey:"nav.item.contest",matchText:["比赛","Contest"]},{key:"submission",labelKey:"nav.item.submission",matchText:["评测","Status"]},{key:"rank",labelKey:"nav.item.rank",matchText:["排名","Rank"]},{key:"discussion",labelKey:"nav.item.discussion",matchText:["讨论","Discussion"]},{key:"team",labelKey:"nav.item.team",matchText:["团队","Group"]},{key:"about",labelKey:"nav.item.about",matchText:["关于","About"]},{key:"newui",labelKey:"nav.item.newui",matchText:["体验新版","Try New"]}],zs={home:"el-icon-s-home",problems:"el-icon-s-grid",training:"el-icon-s-claim",contest:"el-icon-trophy",submission:"el-icon-s-marketing",rank:"el-icon-s-data",discussion:"fa-comments",team:"fa-users",about:"el-icon-info",newui:"el-icon-star-on"},Gs={home:"首页",problems:"题库",submission:"评测",training:"题单",contest:"比赛",team:"团队",discussion:"讨论",rank:"排名",newui:"体验新版"},Us=[".drop-menu",".drop-avatar"];a(Co,"getNavbarLayout");a(Vs,"saveNavbarLayout");a(Js,"collectNavbarElements");a(qa,"applyNavbarLayoutInternal");a(Ws,"collectMobileDrawerElements");a($a,"applyMobileDrawerLayout");a(za,"_findNewNavContainer");a(Ks,"_collectNewFrontElements");a(Ga,"applyNewFrontendLayout");ko=null;a(dt,"scheduleApplyNavbarLayout");a(Ua,"setConfig");a(Ys,"applyNavbarLayout");wo=null;a(Rn,"openNavbarLayoutDialog")});var Gt={};Z(Gt,{clearRankTags:()=>$e,clearTagCache:()=>ht,clearUserHomeTags:()=>Fo,deleteMyTag:()=>Qs,fetchUserTag:()=>zt,getTagfromRemote:()=>Mo,injectRankTag:()=>Gn,injectUserHomeTag:()=>ze,isRankListApi:()=>zn,isRankPage:()=>fe,isUserHomePage:()=>_e,isValidHexColor:()=>Ja,pushMyTag:()=>Jn,refreshTag:()=>el,scheduleRankTag:()=>Le,setRankTagConfig:()=>mt,startRankTableObserver:()=>Un,stopRankTableObserver:()=>Vn});async function $t(){if(ut)return ut;try{let e=localStorage.getItem("userInfo");if(e){let t=typeof e=="string"?JSON.parse(e):e;if(t&&t.username)return ut=t.username,ut}}catch{}try{let e=localStorage.getItem("token")||"",o=await(await fetch(`${window.location.origin}/api/get-user-home-info`,{method:"GET",headers:{Authorization:e,"Content-Type":"application/json"},credentials:"include"})).json();if(o?.status===200&&o?.data?.username)return ut=o.data.username,ut}catch{}return null}function fe(){let e=window.location.pathname;return/\/(oi-rank|acm-rank)(\/|$)/.test(e)||/\/home(\/|$)/.test(e)}function _e(){let e=window.location.pathname;return/^\/(user-home)(\/|$)/.test(e)}function zn(e){return typeof e=="string"&&(e.includes("/api/get-rank-list")||e.includes("/api/get-group-rank-list"))}function zt(e){return Te.has(e)?Promise.resolve(Te.get(e)):new Promise(t=>{GM_xmlhttpRequest({method:"GET",url:`${$n}/query?username=${encodeURIComponent(e)}`,onload:o=>{if(o.status===200)try{let n=JSON.parse(o.responseText);if(n.success&&n.data){Te.set(e,n.data),t(n.data);return}}catch{}Te.set(e,null),t(null)},onerror:()=>{Te.set(e,null),t(null)},ontimeout:()=>{Te.set(e,null),t(null)}})})}function ht(){Te.clear()}async function Gn(e){if(!fe())return;document.querySelectorAll("."+Lo).forEach(c=>c.remove());let t=(e.CustomRankTag||"").trim(),o=await $t(),n=null;!t&&o&&(n=await zt(o));let r=t||n?.tagname||"",i=e.CustomRankTagColor||n?.tagcolor||"#18BE6A",s=40,l=0,u=a(async()=>{if(l++,!fe())return;let c=document.querySelectorAll(".vxe-table, table"),d=[];for(let p of c){let g=[...p.querySelectorAll("tbody tr")];g.length>d.length&&(d=g)}if(d.length===0){l<s&&(_o=window.setTimeout(u,250));return}await Xs(d,o,r,i)},"poll");u()}async function Xs(e,t,o,n){let r=new Set;e.forEach(l=>{let u=l.querySelector("a");u&&r.add((u.textContent||"").trim())});let i=[...r].filter(l=>l&&l!==t);await Promise.all(i.map(l=>zt(l)));let s=0;e.forEach(l=>{let u=l.querySelector("a");if(!u)return;let c=(u.textContent||"").trim();if(!c)return;let d=u.nextElementSibling;if(d&&d.classList.contains(Lo))return;let p="",g="#18BE6A";if(t&&c===t){if(!o)return;p=o,g=(n||"").trim()||"#18BE6A"}else{let b=Te.get(c);if(!b||!b.tagname)return;p=b.tagname,g=b.tagcolor||"#18BE6A"}let h=document.createElement("span");h.className=Lo,h.style.marginLeft="2px";let m=document.createElement("span");m.className="el-tag el-tag--small el-tag--dark",m.style.backgroundColor=g,m.textContent=" "+p+" ",h.appendChild(m),u.insertAdjacentElement("afterend",h),s++}),console.log(`[HOJTag] 共注入 ${s} 处标签`)}function $e(){_o&&(clearTimeout(_o),_o=null),document.querySelectorAll("."+Lo).forEach(e=>e.remove())}function Un(){pt||(pt=a(e=>{e.target?.closest?.("button.search-btn, button.btn-prev, button.btn-next, .el-pager .number, .el-select-dropdown__item")&&fe()&&($e(),console.log("[RankTag] 检测到搜索/分页操作，准备重新注入"),Le())},"_rankSearchHandler"),document.addEventListener("click",pt,!0),console.log("[RankTag] 已监听搜索按钮与分页控件"))}function Vn(){pt&&(document.removeEventListener("click",pt,!0),pt=null)}async function ze(e){if(!_e())return;be&&(clearTimeout(be),be=null);let t=40,o=0,n=a(async()=>{o++;let r=document.querySelector(".user-info"),i=r?r.querySelector(".emphasis"):null;if(console.log(`[UserHome Tag] 轮询 ${o}: user-info=${!!r}, name=${i?(i.textContent||"").trim():"null"}`),!r||!i){o<t?be=window.setTimeout(n,250):console.warn("[UserHome Tag] 轮询超时，未找到 .user-info");return}let s=(i.textContent||"").trim();if(!s){o<t&&(be=window.setTimeout(n,250));return}if(r.querySelector(".hoj-userhome-tag")){console.log("[UserHome Tag] 已注入过，跳过");return}let l=i.closest("p");if(!l){o<t&&(be=window.setTimeout(n,250));return}let u="",c="#18BE6A",d=await $t();if(d&&s===d)u=(e.CustomRankTag||"").trim(),c=(e.CustomRankTagColor||"").trim()||"#18BE6A";else{let m=await zt(s);m&&m.tagname&&(u=m.tagname,c=m.tagcolor||"#18BE6A")}if(!u){console.log("[UserHome Tag] 无 tag 可注入");return}let p=document.createElement("p");p.className="hoj-userhome-tag";let g=document.createElement("span"),h=document.createElement("span");h.className="el-tag el-tag--small el-tag--dark",h.style.backgroundColor=c,h.textContent=" "+u+" ",g.appendChild(h),p.appendChild(g),l.insertAdjacentElement("afterend",p),console.log("[UserHome Tag] 已注入:",u,"用户:",s)},"poll");n()}function Fo(){be&&(clearTimeout(be),be=null),document.querySelectorAll(".hoj-userhome-tag").forEach(e=>e.remove())}function mt(e){qn=e}function Le(){To&&clearTimeout(To),To=window.setTimeout(()=>{To=null,qn&&Gn(qn)},500)}async function Mo(e=!1){let t=null;try{t=await Zs()}catch(o){console.warn("[RankTag] 拉取云端标签失败:",o)}if(!t){e?v("云端无标签或请求失败","warning"):console.log("[RankTag] 云端无标签（静默）");return}console.log("[RankTag] 已刷新："+t.tagname)}async function Zs(){let e=await $t();return e?zt(e):null}function Ja(e){return typeof e=="string"&&/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e.trim())}async function Jn(e){let t=(e.CustomRankTag||"").trim(),o=(e.CustomRankTagColor||"").trim();if(!t)return;if(!Ja(o)){console.warn("[HOJTag] tagcolor 非法，跳过推送:",o);return}let n=await $t();if(n)return new Promise(r=>{GM_xmlhttpRequest({method:"POST",url:`${$n}/update`,headers:{"Content-Type":"application/json"},data:JSON.stringify({username:n,tagname:t,tagcolor:o}),onload:i=>{try{let s=JSON.parse(i.responseText);s.success?console.log("[HOJTag] 云端标签已更新:",s.data):console.warn("[HOJTag] 更新失败:",s.error)}catch(s){console.warn("[HOJTag] 解析失败:",s)}r()},onerror:()=>{console.warn("[HOJTag] 网络错误"),r()},ontimeout:()=>{console.warn("[HOJTag] 超时"),r()}})})}async function Qs(e){let t=await $t();return t?new Promise(o=>{GM_xmlhttpRequest({method:"POST",url:`${$n}/delete`,headers:{"Content-Type":"application/json"},data:JSON.stringify({username:t}),onload:n=>{let r=!1,i="";try{let s=JSON.parse(n.responseText);r=!!s.success,i=s.message||s.error||""}catch{}n.status===200&&r?(e.CustomRankTag="",e.CustomRankTagColor="#18BE6A",Y(e),ht(),$e(),Fo(),mt(e),fe()&&Le(),_e()&&ze(e),console.log("[HOJTag] 已删除云端标签:",t),o({success:!0,message:"已清除标签"})):(console.warn("[HOJTag] 删除失败:",n.status,n.responseText),o({success:!1,message:i||`HTTP ${n.status}`}))},onerror:()=>o({success:!1,message:"网络错误"}),ontimeout:()=>o({success:!1,message:"请求超时"})})}):{success:!1,message:"未获取到用户名"}}async function el(e){ht(),await Mo(),mt(e),fe()&&Gn(e),_e()&&ze(e)}var $n,ut,Lo,Te,_o,be,pt,To,qn,Ge=O(()=>{"use strict";G();le();$n="https://hojtag.rkcd.me";a($t,"getCurrentUsername");ut=null,Lo="hoj-custom-rank-tag",Te=new Map,_o=null,be=null,pt=null,To=null;a(fe,"isRankPage");a(_e,"isUserHomePage");a(zn,"isRankListApi");a(zt,"fetchUserTag");a(ht,"clearTagCache");a(Gn,"injectRankTag");a(Xs,"doInjectRankTag");a($e,"clearRankTags");a(Un,"startRankTableObserver");a(Vn,"stopRankTableObserver");a(ze,"injectUserHomeTag");a(Fo,"clearUserHomeTags");qn=null;a(mt,"setRankTagConfig");a(Le,"scheduleRankTag");a(Mo,"getTagfromRemote");a(Zs,"updateRankTags");a(Ja,"isValidHexColor");a(Jn,"pushMyTag");a(Qs,"deleteMyTag");a(el,"refreshTag")});var Wa={};Z(Wa,{openImportExportDialog:()=>Kn});function Kn(e){if(Ut){Ut();return}let t=document.createElement("div");t.className="hoj-ie-panel";let o=document.createElement("div");o.className="hoj-ie-tabs",o.innerHTML=`
    <button type="button" class="hoj-ie-tab active" data-tab="export">${E("ie.tabExport")}</button>
    <button type="button" class="hoj-ie-tab" data-tab="import">${E("ie.tabImport")}</button>
  `,t.appendChild(o);let n=document.createElement("div");n.className="hoj-ie-body",t.appendChild(n);let r="export",i=a(()=>{n.innerHTML="",r==="export"?tl(n,e):ol(n,e)},"render");o.addEventListener("click",s=>{let l=s.target.closest(".hoj-ie-tab");!l||l.dataset.tab===r||(o.querySelectorAll(".hoj-ie-tab").forEach(u=>u.classList.remove("active")),l.classList.add("active"),r=l.dataset.tab,i())}),i(),Ut=J({title:E("ie.importTitle"),bodyEl:t,width:"640px",maxHeight:"80vh",onClose:()=>{Ut=null}})}function tl(e,t){let o={keys:new Set(Object.keys(re)),favorites:!0},n=document.createElement("div");n.className="hoj-ie-presets",n.innerHTML=`
    <button type="button" class="hoj-ie-preset active" data-preset="all">${E("ie.presetAll")}</button>
    <button type="button" class="hoj-ie-preset" data-preset="smart">${E("ie.presetSmart")}</button>
    <button type="button" class="hoj-ie-preset" data-preset="better">${E("ie.presetBetter")}</button>
    <button type="button" class="hoj-ie-preset" data-preset="favorites">${E("ie.presetFavorites")}</button>
    <button type="button" class="hoj-ie-preset" data-preset="snippet">${E("ie.presetSnippet")}</button>
  `,e.appendChild(n);let r=document.createElement("div");r.className="hoj-ie-list",e.appendChild(r);let i=document.createElement("div");i.className="hoj-ie-footer";let s=document.createElement("button");s.type="button",s.className="hoj-snippet-btn hoj-snippet-btn--primary",s.textContent=E("ie.exportBtn"),i.appendChild(s),e.appendChild(i);let l=a(()=>{r.innerHTML="",et.forEach(d=>{let p=d.keys.filter(h=>Object.prototype.hasOwnProperty.call(re,h));if(!p.length)return;let g=E(d.name);r.appendChild(Wn(g,p,o.keys,l))});let u=de().length,c=document.createElement("div");c.className="hoj-ie-group",c.innerHTML=`
      <div class="hoj-ie-group-header">
        <label class="hoj-ie-group-check"><input type="checkbox" ${o.favorites?"checked":""}></label>
        <span class="hoj-ie-group-name">${E("ie.favorites")}</span>
        <span class="hoj-ie-group-count">${E("ie.favCount",{n:u})}</span>
      </div>
    `,c.querySelector("input").addEventListener("change",d=>{o.favorites=d.target.checked}),r.appendChild(c)},"renderList");n.addEventListener("click",u=>{let c=u.target.closest(".hoj-ie-preset");c&&(n.querySelectorAll(".hoj-ie-preset").forEach(d=>d.classList.remove("active")),c.classList.add("active"),o.keys=kn(c.dataset.preset,Object.keys(re)),o.favorites=wn(c.dataset.preset),l())}),s.addEventListener("click",()=>{if(!o.keys.size&&!o.favorites){v("@ie.selectAtLeastOne","warning");return}let u={type:"hoj-settings",version:Q.version,exportedAt:new Date().toISOString(),config:{},favorites:[]};o.keys.forEach(m=>{u.config[m]=t[m]}),o.favorites&&(u.favorites=de());let c=new Blob([JSON.stringify(u,null,2)],{type:"application/json"}),d=URL.createObjectURL(c),p=document.createElement("a"),g=new Date().toISOString().slice(0,10);p.href=d,p.download=`hoj-backup-${g}.json`,document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(d);let h=o.favorites?E("ie.exportedExtraFav",{n:u.favorites.length}):"";v(E("ie.exportedSummary",{keys:o.keys.size,extra:h}),"success",2500)}),l()}function ol(e,t){e.innerHTML="";let o=document.createElement("input");o.type="file",o.accept="application/json,.json",o.style.display="none",e.appendChild(o);let n=document.createElement("div");e.appendChild(n);let r=a(()=>{n.innerHTML=`
      <div class="hoj-ie-hint">
        <div class="hoj-ie-hint-title">${E("ie.pickHintTitle")}</div>
        <div class="hoj-ie-hint-detail">${E("ie.pickHintDetail")}</div>
      </div>
    `;let s=document.createElement("div");s.className="hoj-ie-actions";let l=document.createElement("button");l.type="button",l.className="hoj-snippet-btn hoj-snippet-btn--primary",l.textContent=E("ie.pickFile"),l.addEventListener("click",()=>o.click());let u=document.createElement("button");u.type="button",u.className="hoj-snippet-btn",u.textContent=E("ie.resetDefaults"),u.addEventListener("click",()=>{let c={type:"hoj-settings",version:Q.version,exportedAt:new Date().toISOString(),config:{...re}};i(c,E("ie.fileKindDefaults"))}),s.append(l,u),n.appendChild(s)},"showStage1"),i=a((s,l)=>{let u=["type","version","exportedAt","config","favorites","count","name"],c={},d=[],p="unknown";if(s&&typeof s=="object"){let _=s.type;_==="hoj-favorites"?(d=Array.isArray(s.favorites)?s.favorites:[],p="favorites"):_==="hoj-settings"?(c=s.config&&typeof s.config=="object"?s.config:{},Array.isArray(s.favorites)?(d=s.favorites,p="mixed"):p="settings"):Array.isArray(s)?(d=s,p="favorites"):s.config&&typeof s.config=="object"?(c=s.config,Array.isArray(s.favorites)?(d=s.favorites,p="mixed"):p="settings"):Array.isArray(s.favorites)?(d=s.favorites,p="favorites"):(c=s,p="settings")}let g={},h=0;if(Object.keys(c).forEach(_=>{if(!u.includes(_)){if(!Object.prototype.hasOwnProperty.call(re,_)){h++;return}if(typeof re[_]!=typeof c[_]){h++;return}if(Array.isArray(re[_])!==Array.isArray(c[_])){h++;return}g[_]=c[_]}}),!Object.keys(g).length&&!d.length){v("@ie.noContent","warning");return}n.innerHTML="";let m=document.createElement("div");m.className="hoj-ie-toprow";let b=document.createElement("button");b.type="button",b.className="hoj-ie-back",b.textContent=E("ie.backToPick"),b.addEventListener("click",()=>{o.value="",r()});let j=document.createElement("div");j.className="hoj-ie-filename",j.textContent=E("ie.chosenFile",{name:l}),m.append(b,j),n.appendChild(m);let x={settings:l===E("ie.fileKindDefaults")?"ie.fileKindDefaults":"ie.fileKindSettings",favorites:"ie.fileKindFavorites",mixed:"ie.fileKindMixed",unknown:"ie.fileKindUnknown"}[p];if(x){let _=document.createElement("div");_.className="hoj-ie-version",_.innerHTML=`<span style="font-size:12px;opacity:.7;">📄 ${W(E(x))}</span>`,n.appendChild(_)}let y=s?.version||null,C=Q.version;if(y){let _=document.createElement("div");_.className="hoj-ie-version";let M,S;jn(y,C)<0?(M="#ED4014",S=E("ie.versionOld",{v:y,cur:C})):jn(y,C)>0?(M="#E6A23C",S=E("ie.versionNew",{v:y,cur:C})):(M="#67C23A",S=E("ie.versionSame",{cur:C})),_.innerHTML=`<span style="color:${M};font-size:12px;">${W(S)}</span>`,n.appendChild(_)}if(h>0){let _=document.createElement("div");_.className="hoj-ie-version",_.innerHTML=`<span style="font-size:12px;opacity:.6;">${W(E("ie.ignoredCount",{n:h}))}</span>`,n.appendChild(_)}let k={keys:new Set(Object.keys(g)),favorites:d.length>0},A=document.createElement("div");A.className="hoj-ie-presets",A.innerHTML=`
      <button type="button" class="hoj-ie-preset active" data-preset="all">${E("ie.presetAll")}</button>
      <button type="button" class="hoj-ie-preset" data-preset="smart">${E("ie.presetSmart")}</button>
      <button type="button" class="hoj-ie-preset" data-preset="better">${E("ie.presetBetter")}</button>
      <button type="button" class="hoj-ie-preset" data-preset="favorites">${E("ie.presetFavorites")}</button>
      <button type="button" class="hoj-ie-preset" data-preset="snippet">${E("ie.presetSnippet")}</button>
    `,n.appendChild(A);let w=document.createElement("div");w.className="hoj-ie-list",n.appendChild(w);let P=document.createElement("div");P.className="hoj-ie-footer";let N=document.createElement("button");N.type="button",N.className="hoj-snippet-btn hoj-snippet-btn--primary",N.textContent=E("ie.importBtn"),P.appendChild(N),n.appendChild(P);let B=a(()=>{w.innerHTML="";let _=Object.keys(g),M=new Map,S=[];if(_.forEach(F=>{let L=xn(F);L?(M.has(L.id)||M.set(L.id,[]),M.get(L.id).push(F)):S.push(F)}),et.forEach(F=>{let L=M.get(F.id);if(!L||!L.length)return;if(F.id==="snippet"&&L.includes("Snippets")){let T=document.createElement("div");T.className="hoj-ie-note";let R=Ie(),I=oe(R).length,U=Array.isArray(g.Snippets)?g.Snippets.length:0,$=new Set(oe(R).map(te=>te.id).filter(Boolean)),V=(g.Snippets||[]).filter(te=>te&&te.id&&!$.has(te.id)).length;T.textContent=E("ie.snippetMergeTip",{exist:I,add:V,upd:U-V}),w.appendChild(T)}let H=E(F.name);w.appendChild(Wn(H,L,k.keys,B,g))}),S.length&&w.appendChild(Wn(E("group.other"),S,k.keys,B,g)),d.length){let F=new Set(de().map(T=>String(T.problemId))),L=d.filter(T=>T&&T.problemId!==void 0&&T.problemId!==null&&!F.has(String(T.problemId))).length,H=document.createElement("div");H.className="hoj-ie-group",H.innerHTML=`
          <div class="hoj-ie-group-header">
            <label class="hoj-ie-group-check"><input type="checkbox" ${k.favorites?"checked":""}></label>
            <span class="hoj-ie-group-name">${E("ie.favorites")}</span>
            <span class="hoj-ie-group-count">${E("ie.favCountNew",{n:d.length,added:L})}</span>
          </div>
        `,H.querySelector("input").addEventListener("change",T=>{k.favorites=T.target.checked}),w.appendChild(H)}},"renderList");A.addEventListener("click",_=>{let M=_.target.closest(".hoj-ie-preset");if(!M)return;A.querySelectorAll(".hoj-ie-preset").forEach(F=>F.classList.remove("active")),M.classList.add("active");let S=M.dataset.preset;k.keys=kn(S,Object.keys(g)),k.favorites=wn(S)&&d.length>0,B()}),N.addEventListener("click",async()=>{if(!k.keys.size&&!k.favorites){v("@ie.selectAtLeastOne","warning");return}let _=0,M=0,S=0;k.keys.forEach(I=>{if(I==="Snippets"){let U=Pn(oe(t),g[I]);t[I]=U.list,M=U.added,S=U.updated}else t[I]=g[I];_++}),Y(t);let F=0;if(k.favorites&&d.length){let I=de(),U=new Set(I.map($=>String($.problemId)));d.forEach($=>{if(!$||$.problemId===void 0||$.problemId===null)return;let V=String($.problemId).trim();!V||U.has(V)||(I.push({problemId:V,title:typeof $.title=="string"?$.title:V,href:typeof $.href=="string"?$.href:`/problem/${V}`,addedAt:typeof $.addedAt=="number"?$.addedAt:Date.now()}),U.add(V),F++)}),at(I)}try{Ee(t),ce(t),Ce(t);let{syncMemorizingFont:I}=await Promise.resolve().then(()=>(Se(),ho));I(t);let{initCardGlow:U}=await Promise.resolve().then(()=>(Se(),ho));U(t);let{initAllTools:$}=await Promise.resolve().then(()=>(lt(),Ra));$(t)}catch(I){console.warn("[Import] Apply config error:",I)}let L=document.getElementById("hoj-settings-panel");L&&L.querySelectorAll("[data-key]").forEach(I=>{let U=I.getAttribute("data-key");I.type==="checkbox"?I.checked=!!t[U]:I.value=t[U]??"",I.dispatchEvent(new Event("input"))});let H=[];if(H.push(E("ie.importedKeysPart",{n:_})),M||S){let I=[];M&&I.push(E("ie.importedSnippetAdd",{n:M})),S&&I.push(E("ie.importedSnippetUpd",{n:S})),H.push(E("ie.importedSnippetPart",{seg:I.join(" / ")}))}F>0&&H.push(E("ie.importedFavPart",{n:F})),v(E("ie.importedSummary",{parts:H.join(", ")}),"success",3500);let{scheduleApplyNavbarLayout:T}=await Promise.resolve().then(()=>(So(),Va));T(100);let{getTagFromRemote:R}=await Promise.resolve().then(()=>(Ge(),Gt));R(t),Ut?.()}),B()},"showStage2");o.addEventListener("change",async()=>{let s=o.files?.[0];if(s){o.value="";try{let l=await s.text(),u=JSON.parse(l);i(u,s.name)}catch(l){v(E("ie.parseFailed",{msg:l.message}),"error")}}}),r()}function Wn(e,t,o,n,r){let i=document.createElement("div");i.className="hoj-ie-group";let s=r||Ie(),l=t.every(h=>o.has(h)),u=t.some(h=>o.has(h)),c=document.createElement("div");c.className="hoj-ie-group-header",c.innerHTML=`
    <label class="hoj-ie-group-check"><input type="checkbox" ${l?"checked":""}></label>
    <span class="hoj-ie-group-name">${W(e)}</span>
    <span class="hoj-ie-group-count">${t.filter(h=>o.has(h)).length}/${t.length}</span>
    <span class="hoj-ie-group-toggle">▾</span>
  `;let d=c.querySelector("input");u&&!l&&(d.indeterminate=!0),d.addEventListener("change",h=>{h.target.checked?t.forEach(m=>o.add(m)):t.forEach(m=>o.delete(m)),n()}),i.appendChild(c);let p=document.createElement("div");p.className="hoj-ie-items",t.forEach(h=>{let m=document.createElement("label");m.className="hoj-ie-item";let b=s[h],j=Yr.has(h),x,y;if(j){let k=b!=null&&String(b)!=="";x=k?"••••••••":"",y=k?E("ie.sensitiveHidden"):E("ie.sensitiveEmpty")}else x=Wr(b),y=x;let C=!!r;m.innerHTML=`
      <input type="checkbox" ${o.has(h)?"checked":""}>
      <span class="hoj-ie-item-name">${W(h)}</span>
      <span class="hoj-ie-item-value${C?" hoj-ie-item-value--new":""}${j?" hoj-ie-item-value--masked":""}" title="${W(y)}">${W(x)}</span>
    `,m.querySelector("input").addEventListener("change",k=>{k.target.checked?o.add(h):o.delete(h);let A=c.querySelector(".hoj-ie-group-count");A&&(A.textContent=`${t.filter(N=>o.has(N)).length}/${t.length}`);let w=t.every(N=>o.has(N)),P=t.some(N=>o.has(N));d.checked=w,d.indeterminate=P&&!w}),p.appendChild(m)}),i.appendChild(p);let g=c.querySelector(".hoj-ie-group-toggle");return g.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),p.classList.toggle("collapsed"),g.textContent=p.classList.contains("collapsed")?"▸":"▾"}),i}var Ut,Yn=O(()=>{"use strict";G();K();ke();le();Ht();At();Se();le();Pt();Ut=null;a(Kn,"openImportExportDialog");a(tl,"renderExportPane");a(ol,"renderImportPane");a(Wn,"buildConfigGroup")});function nl(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Zn(e){let t=!!e.Open&&!!e.DarkMode;return{editorTheme:t?"dark":"classic",contentTheme:t?"dark":"light",hljsStyle:t?"github-dark":"github"}}function Qn(){let e=nl();return e.Vditor?Promise.resolve(e.Vditor):No||(No=new Promise((t,o)=>{if(!document.getElementById("hoj-vditor-css")){let r=document.createElement("link");r.id="hoj-vditor-css",r.rel="stylesheet",r.href=`${Fe}/dist/index.css`,(document.head||document.documentElement).appendChild(r)}let n=document.createElement("script");n.src=`${Fe}/dist/index.min.js`,n.async=!0,n.onload=()=>{e.Vditor?(console.log("[Vditor] 已加载:",typeof e.Vditor),t(e.Vditor)):o(new Error("Vditor 未挂载到 unsafeWindow"))},n.onerror=()=>o(new Error("Vditor 脚本加载失败")),(document.head||document.documentElement).appendChild(n)}),No)}async function Xn(e){try{let t=localStorage.getItem("token")||"",o=`${window.location.origin}/api/discussion-category`;e!=null&&String(e)!==""&&(o+=`?gid=${encodeURIComponent(String(e))}`);let r=await(await fetch(o,{headers:{Authorization:t},credentials:"include"})).json();return Array.isArray(r?.data)?r.data:[]}catch(t){return console.warn("[Discussion] 获取分类失败:",t),[]}}function Ya(e){let t=e.VditorUploadMode||"disabled";if(t==="disabled")return null;let o=t==="group"?String(e.VditorUploadGid||"").trim():"";return{mode:t,gid:o,valid:t!=="group"||!!o}}async function rl(e,t,o){let n=localStorage.getItem("token")||"",r=t==="image"?`${window.location.origin}/api/file/upload-md-img`:`${window.location.origin}/api/file/upload-md-file`,i=new FormData;i.append(t==="image"?"image":"file",e),o&&i.append("gid",o);let s=await fetch(r,{method:"POST",headers:{Authorization:n},credentials:"include",body:i});if(s.status!==200)throw new Error(`HTTP ${s.status}`);let l=await s.json().catch(()=>null);if(!l)throw new Error(f.t("api.jsonError"));if(l.status!==200)throw new Error(l.msg||`Status ${l.status}`);if(!l.data||!l.data.link)throw new Error(f.t("vditor.uploadNoLink"));return l.data}function Ka(e,t,o){let n=t==="image";return{name:n?"hoj-upload-image":"hoj-upload-file",tip:f.t(n?"vditor.uploadImage":"vditor.uploadFile"),className:"",icon:n?al:il,click:()=>{let r=Ya(o);if(!r){v("@vditor.uploadDisabled","warning");return}if(!r.valid){v("@vditor.uploadNoGid","warning");return}let i=document.createElement("input");i.type="file",n&&(i.accept="image/*"),i.style.display="none",i.addEventListener("change",async()=>{let s=i.files&&i.files[0];if(s)try{let l=await rl(s,t,r.gid),u=e();if(!u||typeof u.insertValue!="function")return;let c=(s.name||"").replace(/[\[\]]/g,"_"),d=n?`![${c}](${l.link})`:`[${c}](${l.link})`;u.insertValue(d,!0)}catch(l){console.warn("[Vditor Upload] 失败:",l),v(f.t("vditor.uploadFailed",{msg:l.message||String(l)}),"error")}finally{i.remove()}}),document.body.appendChild(i),i.click()}}}function er(e,t){let o=["headings","bold","italic","strike","link","|","list","ordered-list","check","outdent","indent","|","quote","line","code","inline-code","|","table","|","undo","redo","|","edit-mode","both","preview","fullscreen"];if(!Ya(t))return o;let r=[];return o.forEach(i=>{r.push(i),i==="redo"&&(r.push(Ka(e,"image",t)),r.push(Ka(e,"file",t)),r.push("|"))}),r}function sl(){let e=window.location.pathname,t=e.match(/^\/group\/([^\/]+)\/discussion-detail\/([^\/?#]+)/);return t?{gid:t[1],did:t[2]}:(t=e.match(/^\/discussion-detail\/([^\/?#]+)/),t?{gid:void 0,did:t[1]}:null)}async function ll(e){try{let t=localStorage.getItem("token")||"",o=`${window.location.origin}/api/get-discussion-detail?did=${encodeURIComponent(e)}`;return(await(await fetch(o,{headers:{Authorization:t},credentials:"include"})).json())?.data||null}catch(t){return console.warn("[Discussion] 获取详情失败:",t),null}}async function cl(e,t={}){let{gid:o}=t,n=t.pid,r;try{r=await Qn()}catch(T){console.error("[Discussion] Vditor 加载失败:",T),v("@discussion.loadEditorFailed","error");return}let i=await Xn(o);if(!i.length){v("@discussion.loadCategoriesFailed","error");return}let s=document.createElement("div");s.className="hoj-disc-form";let l=document.createElement("div");l.className="hoj-disc-field";let u=document.createElement("label");u.innerHTML=`${f.t("discussion.title")} <span style="color:#F56C6C;">*</span>`;let c=document.createElement("input");c.type="text",c.className="hoj-disc-title",c.placeholder=f.t("discussion.titlePlaceholder"),c.maxLength=200,l.append(u,c);let d=document.createElement("div");d.className="hoj-disc-field";let p=document.createElement("label");p.innerHTML=`${f.t("discussion.description")} <span style="color:#F56C6C;">*</span>`;let g=document.createElement("input");g.type="text",g.className="hoj-disc-desc",g.placeholder=f.t("discussion.descriptionPlaceholder"),g.maxLength=200,d.append(p,g);let h=document.createElement("div");h.className="hoj-disc-field";let m=document.createElement("label");m.textContent=f.t("discussion.category");let b=document.createElement("select");b.className="hoj-disc-category",i.forEach(T=>{let R=document.createElement("option");R.value=T.id,R.textContent=T.name,b.appendChild(R)}),h.append(m,b);let j=document.createElement("div");j.className="hoj-disc-field";let x=document.createElement("label");x.innerHTML=`${f.t("discussion.bindProblem")}<span class="hoj-field-optional">(optional)</span>`;let y=document.createElement("input");if(y.type="text",y.className="hoj-disc-pid",y.placeholder=f.t("discussion.bindProblemPlaceholder"),y.maxLength=100,j.append(x,y),!n){let T=window.location.pathname.match(/^\/discussion\/([^\/?#]+)/);T&&(n=decodeURIComponent(T[1]))}n&&(y.value=n);let C=document.createElement("div");C.className="hoj-disc-field hoj-disc-field--editor";let k=document.createElement("label");k.textContent=f.t("discussion.content");let A=document.createElement("div");A.className="hoj-disc-editor",C.append(k,A);let w=document.createElement("div");w.className="hoj-disc-advanced",w.innerHTML=`
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
`,w.querySelector(".hoj-disc-advanced-title").textContent=f.t("discussion.advanced"),w.querySelector(".hoj-disc-advanced-hint").textContent=f.t("discussion.advancedHint"),w.querySelector(".hoj-disc-adv-label-role").textContent=f.t("discussion.role"),w.querySelector(".hoj-disc-adv-label-views").textContent=f.t("discussion.viewNum"),w.querySelector(".hoj-disc-adv-label-likes").textContent=f.t("discussion.likeNum"),w.querySelector(".hoj-disc-adv-label-comments").textContent=f.t("discussion.commentNum"),w.querySelector(".hoj-disc-adv-label-top").textContent=f.t("discussion.topPriority"),w.querySelector('.hoj-disc-adv-role option[value="user"]').textContent=f.t("discussion.roleUser"),w.querySelector('.hoj-disc-adv-role option[value="admin"]').textContent=f.t("discussion.roleAdmin"),w.querySelector('.hoj-disc-adv-role option[value="root"]').textContent=f.t("discussion.roleRoot");let P=w.querySelector(".hoj-disc-advanced-toggle"),N=w.querySelector(".hoj-disc-advanced-body");P.addEventListener("click",()=>{let T=N.style.display!=="none";N.style.display=T?"none":"block",P.classList.toggle("is-open",!T)});let B=document.createElement("div");B.className="hoj-disc-footer";let _=document.createElement("button");_.type="button",_.className="hoj-snippet-btn",_.textContent=f.t("dialog.cancel");let M=document.createElement("button");M.type="button",M.className="hoj-snippet-btn hoj-snippet-btn--primary",M.textContent=f.t("discussion.publish"),B.append(_,M),s.append(l,d,h,j,C,w,B);let S=null,F=!1,L=J({title:f.t("discussion.new"),bodyEl:s,width:"760px",maxHeight:"85vh",fullscreen:!0,onClose:()=>{if(F=!0,S){try{S.destroy()}catch{}S=null}}});_.addEventListener("click",()=>L());let H=a(()=>S,"getEditor");requestAnimationFrame(()=>{if(!F)try{S=new r(A,{cdn:Fe,height:380,width:"100%",theme:Zn(e).editorTheme,icon:"ant",mode:"ir",value:"",placeholder:f.t("discussion.contentPlaceholder"),tab:"  ",counter:{enable:!0,type:"markdown"},cache:{enable:!1},preview:{theme:{current:"light",path:`${Fe}/dist/css/content-theme`},hljs:{style:"github",lineNumber:!0},math:{engine:"KaTeX",inlineDigit:!0},markdown:{toc:!0}},toolbar:er(H,e)})}catch(T){console.error("[Discussion] Vditor 初始化失败:",T),v("@discussion.initEditorFailed","error")}}),M.addEventListener("click",async()=>{if(!S)return v("@discussion.editorNotReady","warning");let T=Number(b.value),R=c.value.trim(),I=g.value.trim(),U=S.getValue().trim(),$=y.value.trim();if(!T)return v("@discussion.categoryRequired","warning");if(!R)return v("@discussion.titleRequired","warning");if(!I)return v("@discussion.descriptionRequired","warning");if(!U)return v("@discussion.contentRequired","warning");let V=w.querySelector(".hoj-disc-adv-role").value||"user",te=Math.max(0,Number(w.querySelector(".hoj-disc-adv-viewNum").value)||0),je=Math.max(0,Number(w.querySelector(".hoj-disc-adv-likeNum").value)||0),Xe=Math.max(0,Number(w.querySelector(".hoj-disc-adv-commentNum").value)||0),xe=w.querySelector(".hoj-disc-adv-topPriority").checked;M.disabled=!0;let to=M.textContent;M.textContent=f.t("discussion.publishing");let Ze={categoryId:T,title:R,description:I,content:U,role:V,viewNum:te,likeNum:je,commentNum:Xe,topPriority:xe};if($&&(Ze.pid=String($)),o!=null&&String(o).trim()!==""){let oo=Number(o);Ze.gid=Number.isNaN(oo)?o:oo}let gn=Ze.gid!==void 0?"/api/group/discussion":"/api/discussion";try{await ae(gn,{method:"POST",body:Ze}),v("@discussion.publishSuccess","success",2e3),L(),setTimeout(()=>location.reload(),800)}catch{M.disabled=!1,M.textContent=to}})}async function tr(e,t){let{gid:o,did:n}=t,r=await ll(n);if(!r){v("@discussion.loadDetailFailed","error");return}let i=await Xn(o);if(!i.length&&o&&(i=await Xn()),!i.length){v("@discussion.loadCategoriesFailed","error");return}let s;try{s=await Qn()}catch(L){console.error("[Discussion] Vditor 加载失败:",L),v("@discussion.loadEditorFailed","error");return}let l=document.createElement("div");l.className="hoj-disc-form";let u=document.createElement("div");u.className="hoj-disc-field";let c=document.createElement("label");c.textContent=f.t("discussion.category");let d=document.createElement("select");d.className="hoj-disc-category",i.forEach(L=>{let H=document.createElement("option");H.value=L.id,H.textContent=L.name,Number(L.id)===Number(r.categoryId)&&(H.selected=!0),d.appendChild(H)}),u.append(c,d);let p=document.createElement("div");p.className="hoj-disc-field";let g=document.createElement("label");g.innerHTML=`${f.t("discussion.title")} <span style="color:#F56C6C;">*</span>`;let h=document.createElement("input");h.type="text",h.className="hoj-disc-title",h.placeholder=f.t("discussion.titlePlaceholder"),h.maxLength=200,h.value=r.title||"",p.append(g,h);let m=document.createElement("div");m.className="hoj-disc-field";let b=document.createElement("label");b.innerHTML=`${f.t("discussion.description")} <span style="color:#F56C6C;">*</span>`;let j=document.createElement("input");j.type="text",j.className="hoj-disc-desc",j.placeholder=f.t("discussion.descriptionPlaceholder"),j.maxLength=200,j.value=r.description||"",m.append(b,j);let x=document.createElement("div");x.className="hoj-disc-field hoj-disc-field--editor";let y=document.createElement("label");y.textContent=f.t("discussion.content");let C=document.createElement("div");C.className="hoj-disc-editor",x.append(y,C);let k=document.createElement("div");k.className="hoj-disc-advanced",k.innerHTML=`
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
`,k.querySelector(".hoj-disc-advanced-title").textContent=f.t("discussion.advanced"),k.querySelector(".hoj-disc-advanced-hint").textContent=f.t("discussion.advancedHint"),k.querySelector(".hoj-disc-adv-label-role").textContent=f.t("discussion.role"),k.querySelector(".hoj-disc-adv-label-views").textContent=f.t("discussion.viewNum"),k.querySelector(".hoj-disc-adv-label-likes").textContent=f.t("discussion.likeNum"),k.querySelector(".hoj-disc-adv-label-comments").textContent=f.t("discussion.commentNum"),k.querySelector(".hoj-disc-adv-label-top").textContent=f.t("discussion.topPriority"),k.querySelector(".hoj-disc-adv-label-forceUpdate").textContent=f.t("discussion.forceUpdate"),k.querySelector('.hoj-disc-adv-role option[value="user"]').textContent=f.t("discussion.roleUser"),k.querySelector('.hoj-disc-adv-role option[value="admin"]').textContent=f.t("discussion.roleAdmin"),k.querySelector('.hoj-disc-adv-role option[value="root"]').textContent=f.t("discussion.roleRoot"),k.querySelector(".hoj-disc-adv-role").value=r.role||"user",k.querySelector(".hoj-disc-adv-viewNum").value=r.viewNum??0,k.querySelector(".hoj-disc-adv-likeNum").value=r.likeNum??0,k.querySelector(".hoj-disc-adv-commentNum").value=r.commentNum??0,k.querySelector(".hoj-disc-adv-topPriority").checked=!!r.topPriority,k.querySelector(".hoj-disc-adv-forceUpdate").parentElement.title=f.t("discussion.forceUpdateHint");let A=k.querySelector(".hoj-disc-advanced-toggle"),w=k.querySelector(".hoj-disc-advanced-body");A.addEventListener("click",()=>{let L=w.style.display!=="none";w.style.display=L?"none":"block",A.classList.toggle("is-open",!L)});let P=document.createElement("div");P.className="hoj-disc-footer";let N=document.createElement("button");N.type="button",N.className="hoj-snippet-btn",N.textContent=f.t("dialog.cancel");let B=document.createElement("button");B.type="button",B.className="hoj-snippet-btn hoj-snippet-btn--primary",B.textContent=f.t("discussion.save"),P.append(N,B),l.append(p,m,u,x,k,P);let _=null,M=!1,S=J({title:f.t("discussion.edit"),bodyEl:l,width:"760px",maxHeight:"85vh",fullscreen:!0,onClose:()=>{if(M=!0,_){try{_.destroy()}catch{}_=null}}});N.addEventListener("click",()=>S());let F=a(()=>_,"getEditor");requestAnimationFrame(()=>{if(!M)try{_=new s(C,{cdn:Fe,height:"100%",width:"100%",theme:Zn(e).editorTheme,icon:"ant",mode:"ir",value:r.content||"",placeholder:f.t("discussion.contentPlaceholder"),tab:"  ",counter:{enable:!0,type:"markdown"},cache:{enable:!1},preview:{theme:{current:"light",path:`${Fe}/dist/css/content-theme`},hljs:{style:"github",lineNumber:!0},math:{engine:"KaTeX",inlineDigit:!0},markdown:{toc:!0}},toolbar:er(F,e)})}catch(L){console.error("[Discussion] Vditor 初始化失败:",L),v("@discussion.initEditorFailed","error")}}),B.addEventListener("click",async()=>{if(!_)return v("@discussion.editorNotReady","warning");let L=Number(d.value),H=h.value.trim(),T=j.value.trim(),R=_.getValue().trim();if(!L)return v("@discussion.categoryRequired","warning");if(!H)return v("@discussion.titleRequired","warning");if(!T)return v("@discussion.descriptionRequired","warning");if(!R)return v("@discussion.contentRequired","warning");let I=k.querySelector(".hoj-disc-adv-role").value||"user",U=Math.max(0,Number(k.querySelector(".hoj-disc-adv-viewNum").value)||0),$=Math.max(0,Number(k.querySelector(".hoj-disc-adv-likeNum").value)||0),V=Math.max(0,Number(k.querySelector(".hoj-disc-adv-commentNum").value)||0),te=k.querySelector(".hoj-disc-adv-topPriority").checked,je=k.querySelector(".hoj-disc-adv-forceUpdate").checked;B.disabled=!0;let Xe=B.textContent;B.textContent=f.t("discussion.saving");try{let xe={id:Number(n),categoryId:L,title:H,description:T,content:R,role:I,viewNum:U,likeNum:$,commentNum:V,topPriority:te,status:0},to=`${window.location.origin}/api/discussion`;if(o){to=`${window.location.origin}/api/group/discussion`;let no=Number(o);xe.gid=Number.isNaN(no)?o:no}let Ze=je?"POST":"PUT",gn=localStorage.getItem("token")||"",Ct=await(await fetch(to,{method:Ze,headers:{Authorization:gn,"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(xe)})).json().catch(()=>null);if(Ct&&(Ct.status===void 0||Ct.status===200))v("@discussion.saveSuccess","success",2e3),S(),setTimeout(()=>location.reload(),800);else{let no=Ct?.msg||Ct?.message||"Unknown error";v(f.t("discussion.saveFailed",{msg:no}),"error"),B.disabled=!1,B.textContent=Xe}}catch(xe){console.error("[Discussion] 保存失败:",xe),v(f.t("discussion.saveFailed",{msg:xe.message}),"error"),B.disabled=!1,B.textContent=Xe}})}async function dl(e){let t=f.t.bind(f),o;try{o=await Qn()}catch(T){console.error("[Group] Vditor 加载失败:",T),v("@discussion.loadEditorFailed","error");return}let n=document.createElement("div");n.className="hoj-disc-form";let r=document.createElement("div");r.className="hoj-disc-field",r.innerHTML=`<label>${W(t("group.name"))} <span style="color:#F56C6C;">*</span></label>`;let i=document.createElement("input");i.type="text",i.className="hoj-disc-title",i.placeholder=t("group.namePlaceholder"),i.maxLength=25,r.appendChild(i);let s=document.createElement("div");s.className="hoj-disc-field",s.innerHTML=`<label>${W(t("group.shortName"))}<span class="hoj-field-optional">(optional)</span></label>`;let l=document.createElement("input");l.type="text",l.className="hoj-disc-title",l.placeholder=t("group.shortNamePlaceholder"),l.maxLength=10,s.appendChild(l);let u=document.createElement("div");u.className="hoj-disc-field",u.innerHTML=`<label>${W(t("group.brief"))}<span class="hoj-field-optional">(optional)</span></label>`;let c=document.createElement("input");c.type="text",c.className="hoj-disc-desc",c.placeholder=t("group.briefPlaceholder"),c.maxLength=50,u.appendChild(c);let d=document.createElement("div");d.className="hoj-disc-field",d.innerHTML=`
        <label>${W(t("group.auth"))}</label>
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
    `;let p=d.querySelectorAll(".hoj-group-auth-option"),g=a((T,R)=>{T&&(T.textContent=R)},"setText");g(p[0].querySelector(".hoj-group-auth-title"),t("group.auth.public")),g(p[0].querySelector(".hoj-group-auth-desc"),t("group.auth.publicTip")),g(p[1].querySelector(".hoj-group-auth-title"),t("group.auth.protected")),g(p[1].querySelector(".hoj-group-auth-desc"),t("group.auth.protectedTip")),g(p[2].querySelector(".hoj-group-auth-title"),t("group.auth.private")),g(p[2].querySelector(".hoj-group-auth-desc"),t("group.auth.privateTip"));let h=document.createElement("div");h.className="hoj-disc-field",h.style.display="none",h.innerHTML=`<label>${W(t("group.code"))}<span class="hoj-field-optional">(optional)</span></label>`;let m=document.createElement("input");m.type="text",m.className="hoj-disc-title",m.placeholder=t("group.codePlaceholder"),m.maxLength=64,h.appendChild(m),d.addEventListener("change",T=>{let R=T.target;R.name==="hoj-group-auth"&&(h.style.display=R.value==="3"?"":"none")});let b=document.createElement("div");b.className="hoj-disc-field",b.innerHTML=`
        <label>${W(t("group.visible"))}</label>
        <div class="hoj-group-visible-row">
            <span class="hoj-group-visible-label is-active" data-side="public"></span>
            <div class="hoj-group-visible-switch" role="switch" aria-checked="true" tabindex="0"></div>
            <span class="hoj-group-visible-label" data-side="hidden"></span>
        </div>
        <div class="hoj-group-visible-hint"></div>
    `;let j=b.querySelector('[data-side="public"]'),x=b.querySelector('[data-side="hidden"]'),y=b.querySelector(".hoj-group-visible-switch"),C=b.querySelector(".hoj-group-visible-hint");j.textContent=t("group.visiblePublic"),x.textContent=t("group.visibleHidden"),C.textContent=t("group.visibleHint");let k=!0,A=a(()=>{j.classList.toggle("is-active",k),x.classList.toggle("is-active",!k),y.classList.toggle("is-hidden",!k),y.setAttribute("aria-checked",String(k)),C.textContent=t(k?"group.visibleHintPublic":"group.visibleHintHidden")},"renderVisible"),w=a(()=>{k=!k,A()},"toggleVisible");y.addEventListener("click",w),j.addEventListener("click",()=>{k||w()}),x.addEventListener("click",()=>{k&&w()}),y.addEventListener("keydown",T=>{(T.key===" "||T.key==="Enter")&&(T.preventDefault(),w())}),A();let P=document.createElement("div");P.className="hoj-disc-field hoj-disc-field--editor hoj-disc-field--editor-bottom",P.innerHTML=`<label>${W(t("group.description"))} <span style="color:#F56C6C;">*</span></label>`;let N=document.createElement("div");N.className="hoj-disc-editor",P.appendChild(N);let B=document.createElement("div");B.className="hoj-disc-footer";let _=document.createElement("button");_.type="button",_.className="hoj-snippet-btn",_.textContent=t("dialog.cancel");let M=document.createElement("button");M.type="button",M.className="hoj-snippet-btn hoj-snippet-btn--primary",M.textContent=t("group.create"),B.append(_,M),n.append(r,s,u,d,h,b,P,B);let S=null,F=!1,L=J({title:t("group.createTitle"),bodyEl:n,width:"760px",maxHeight:"85vh",fullscreen:!0,onClose:()=>{if(F=!0,S){try{S.destroy()}catch{}S=null}}});_.addEventListener("click",()=>L());let H=a(()=>S,"getEditor");requestAnimationFrame(()=>{if(!F)try{S=new o(N,{cdn:Fe,height:"100%",width:"100%",theme:Zn(e).editorTheme,icon:"ant",mode:"ir",value:"",placeholder:t("group.descriptionPlaceholder"),tab:"  ",counter:{enable:!0,type:"markdown"},cache:{enable:!1},preview:{theme:{current:"light",path:`${Fe}/dist/css/content-theme`},hljs:{style:"github",lineNumber:!0},math:{engine:"KaTeX",inlineDigit:!0},markdown:{toc:!0}},toolbar:er(H,e)})}catch(T){console.error("[Group] Vditor 初始化失败:",T),v("@discussion.initEditorFailed","error")}}),M.addEventListener("click",async()=>{if(!S)return v("@discussion.editorNotReady","warning");let T=i.value.trim(),R=l.value.trim(),I=c.value.trim(),U=S.getValue().trim(),$=d.querySelector('input[name="hoj-group-auth"]:checked'),V=$?Number($.value):1,te=V===3?m.value.trim():"",je=k;if(!T)return v("@group.nameRequired","warning");if(T.length>25)return v("@group.nameTooLong","warning");if(R.length>10)return v("@group.shortNameTooLong","warning");if(I.length>50)return v("@group.briefTooLong","warning");if(!U)return v("@group.descriptionRequired","warning");M.disabled=!0;let Xe=M.textContent;M.textContent=t("group.creating");try{await ae("/api/group",{method:"POST",body:{name:T,shortName:R,brief:I,description:U,auth:V,code:te,visible:je}}),v("@group.createSuccess","success",2e3),L(),setTimeout(()=>location.reload(),800)}catch{M.disabled=!1,M.textContent=Xe}})}function Do(e){if(!e.VditorDiscussionPublish)return!1;let t=window.location.pathname,o=/^\/discussion(\/|$)/.test(t),n=t.match(/^\/group\/([^\/]+)\/discussion(\/|$)/),r=!!n;if(!o&&!r)return!1;let i=r?n[1]:void 0,s=[...document.querySelectorAll("button.el-button--primary")].find(u=>{let c=(u.textContent||"").trim();return/发布一个讨论|发布讨论|创建|new discussion|create discussion|create/i.test(c)});if(!s)return!1;let l=i?`group:${i}`:"top";return s.dataset.hojDiscIntercepted===l||(s.dataset.hojDiscIntercepted=l,s.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),u.stopImmediatePropagation(),cl(e,{gid:i})},!0),console.log(`[Discussion] 已接管「发布 / 创建」按钮 (${i?"group "+i:"top level"})`)),!0}function Ho(e){if(!e.VditorDiscussionEdit)return!1;let t=sl();if(!t)return!1;let o=[...document.querySelectorAll("a")].find(n=>{let r=(n.textContent||"").trim();return/编辑|edit/i.test(r)?!!n.querySelector(".el-icon-edit-outline")||/^编辑$|^edit$/i.test(r):!1});return o?(o.dataset.hojEditIntercepted==="1"||(o.dataset.hojEditIntercepted="1",o.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),tr(e,t)},!0),console.log("[Discussion] 已接管「编辑」按钮",t)),!0):!1}function Io(e){if(!e.VditorGroupCreate||!/^\/group\/?$/.test(window.location.pathname))return!1;let t=document.querySelectorAll("button.el-button--primary"),o=null;for(let n of Array.from(t)){let r=(n.textContent||"").trim();if(/创建团队|create\s+group|new\s+group/i.test(r)){o=n;break}}return o?(o.dataset.hojCreateGroupIntercepted==="1"||(o.dataset.hojCreateGroupIntercepted="1",o.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),dl(e)},!0),console.log("[Group] 已接管「创建团队」按钮")),!0):!1}var Fe,No,al,il,or=O(()=>{"use strict";G();K();ke();Fe="https://unpkg.com/vditor@3.10.4",No=null;a(nl,"_pageWindow");a(Zn,"getVditorTheme");a(Qn,"ensureVditor");a(Xn,"fetchDiscussionCategories");a(Ya,"getVditorUploadConfig");a(rl,"uploadVditorAttachment");al='<svg viewBox="0 0 32 32"><path fill="currentColor" d="M27 5H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 2v12.59l-6.29-6.3-6.3 6.3-3.41-3.41L5 22.18V7h22zM10 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>',il='<svg viewBox="0 0 32 32"><path fill="currentColor" d="M20 4H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10l-6-6zm-1 7V6l5 5h-5zM12 15h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h5v2h-5v-2z"/></svg>';a(Ka,"makeVditorUploadToolbarItem");a(er,"buildVditorToolbar");a(sl,"parseDiscussionEditContext");a(ll,"fetchDiscussionDetail");a(cl,"openNewDiscussionDialog");a(tr,"openEditDiscussionDialog");a(dl,"openGroupCreateDialog");a(Do,"injectDiscussionInterceptor");a(Ho,"injectDiscussionEditInterceptor");a(Io,"injectGroupCreateInterceptor")});function ml(e){let t=String(e??"").trim();if(!t)return null;if(ul.includes(t))return t;for(let{canonical:o,match:n}of hl)if(n.test(t))return o;return null}function bt(){try{let e=localStorage.getItem(gt);if(!e)return null;let t=JSON.parse(e);return ml(t?.language)}catch{return null}}function nr(e){try{let t=localStorage.getItem(gt),o=t?JSON.parse(t):{};o.language=e,localStorage.setItem(gt,JSON.stringify(o))}catch(t){console.warn("[SubmitOverride] 写入语言失败:",t)}}function Bo(){try{let e=localStorage.getItem(gt);if(!e)return null;let o=JSON.parse(e)?.cfLanguage;return o&&pl.includes(o)?o:null}catch{return null}}function rr(e){try{let t=localStorage.getItem(gt),o=t?JSON.parse(t):{};o.cfLanguage=e,localStorage.setItem(gt,JSON.stringify(o))}catch(t){console.warn("[SubmitOverride] 写入 CF 语言失败:",t)}}function ei(e,t){let o=t?Po||Ne:Ao||Me,n=document.createElement("div");n.className="hoj-lang-picker",e.forEach(i=>{let s=document.createElement("div");s.className="hoj-lang-picker__group";let l=document.createElement("div");l.className="hoj-lang-picker__title",l.textContent=i.name,s.appendChild(l);let u=document.createElement("div");u.className="hoj-lang-picker__items",i.langs.forEach(c=>{let d=document.createElement("button");d.type="button",d.className="hoj-lang-picker__item",c===o&&d.classList.add("is-selected"),d.dataset.lang=c,d.textContent=c,u.appendChild(d)}),s.appendChild(u),n.appendChild(s)});let r=J({title:f.t("submit.chooseLang"),bodyEl:n,width:"620px",maxHeight:"70vh"});n.addEventListener("click",i=>{let s=i.target.closest(".hoj-lang-picker__item");if(!s)return;i.preventDefault(),i.stopPropagation();let l=s.dataset.lang||"";t?(Po=l,rr(l)):(Ao=l,nr(l));let u=document.querySelector("#hoj-lang-trigger .hoj-lang-trigger__label");u&&(u.textContent=l),r()})}function ve(){return Ao}function ti(e){Ao=e}function ye(){return Po}function oi(e){Po=e}function ni(){return Qa}function ri(e){Qa=e}var gt,ul,pl,Xa,Za,Ao,Po,Qa,Me,Ne,hl,Oo=O(()=>{"use strict";G();K();gt="hojIndividualLanguageAndSetting",ul=["C++","C++ With O2","C++ 17","C++ 17 With O2","C++ 20","C++ 20 With O2","C","C With O2","Python3","Python2","Java","Golang","C#","PHP","PyPy2","PyPy3","JavaScript Node","JavaScript V8","Ruby","Rust"],pl=["GNU G++17","GNU G++20","GNU G++23","Clang++17 Diagnostics","Microsoft Visual C++ 2017","C# Mono 6.8","C# 8, .NET Core 3.1","D DMD32 v2.091.0","Go 1.15.6","Haskell GHC 8.10.1","Java 1.8.0_241","Java 11.0.6","Kotlin 1.4.0","OCaml 4.02.1","Delphi 7","Free Pascal 3.0.2","PascalABC.NET 3.4.2","Perl 5.20.1","PHP 7.2.13","Python 2.7.18","Python 3.9.1","PyPy 2.7 (7.3.0)","PyPy 3.7 (7.3.0)","Ruby 3.0.0","Rust 1.49.0","Scala 2.12.8","JavaScript V8 4.8.0","Node.js 12.6.3"],Xa=[{name:"C++",langs:["C++","C++ With O2","C++ 17","C++ 17 With O2","C++ 20","C++ 20 With O2"]},{name:"C",langs:["C","C With O2"]},{name:"Python",langs:["Python3","Python2","PyPy3","PyPy2"]},{name:"Java",langs:["Java"]},{name:"Golang",langs:["Golang"]},{name:"C#",langs:["C#"]},{name:"PHP",langs:["PHP"]},{name:"JavaScript",langs:["JavaScript Node","JavaScript V8"]},{name:"Ruby",langs:["Ruby"]},{name:"Rust",langs:["Rust"]}],Za=[{name:"C++",langs:["GNU G++17","GNU G++20","GNU G++23","Clang++17 Diagnostics","Microsoft Visual C++ 2017"]},{name:"C#",langs:["C# Mono 6.8","C# 8, .NET Core 3.1"]},{name:"D",langs:["D DMD32 v2.091.0"]},{name:"Go",langs:["Go 1.15.6"]},{name:"Haskell",langs:["Haskell GHC 8.10.1"]},{name:"Java",langs:["Java 1.8.0_241","Java 11.0.6"]},{name:"Kotlin",langs:["Kotlin 1.4.0"]},{name:"OCaml",langs:["OCaml 4.02.1"]},{name:"Pascal",langs:["Delphi 7","Free Pascal 3.0.2","PascalABC.NET 3.4.2"]},{name:"Perl",langs:["Perl 5.20.1"]},{name:"PHP",langs:["PHP 7.2.13"]},{name:"Python",langs:["Python 2.7.18","Python 3.9.1","PyPy 2.7 (7.3.0)","PyPy 3.7 (7.3.0)"]},{name:"Ruby",langs:["Ruby 3.0.0"]},{name:"Rust",langs:["Rust 1.49.0"]},{name:"Scala",langs:["Scala 2.12.8"]},{name:"JavaScript",langs:["JavaScript V8 4.8.0","Node.js 12.6.3"]}],Ao=null,Po=null,Qa=!1,Me="C++",Ne="GNU G++17",hl=[{canonical:"C++ 20 With O2",match:/c\+\+\s*20\s*with\s*o2/i},{canonical:"C++ 17 With O2",match:/c\+\+\s*17\s*with\s*o2/i},{canonical:"C++ With O2",match:/^c\+\+\s*with\s*o2/i},{canonical:"C++ 20",match:/c\+\+\s*20/i},{canonical:"C++ 17",match:/c\+\+\s*17/i},{canonical:"C++",match:/^c\+\+\s*$/i},{canonical:"C With O2",match:/^c\s+with\s*o2/i},{canonical:"C",match:/^c\s*$/i},{canonical:"PyPy3",match:/^pypy\s*3/i},{canonical:"PyPy2",match:/^pypy\s*2/i},{canonical:"Python3",match:/^python\s*3|^py3/i},{canonical:"Python2",match:/^python\s*2|^py2/i},{canonical:"Golang",match:/^go(lang)?\s*$/i},{canonical:"Java",match:/^java\s*$/i},{canonical:"C#",match:/^c#|csharp/i},{canonical:"PHP",match:/^php/i},{canonical:"JavaScript Node",match:/javascript.*node|node.*js/i},{canonical:"JavaScript V8",match:/javascript|v8/i},{canonical:"Ruby",match:/^ruby/i},{canonical:"Rust",match:/^rust/i}];a(ml,"matchKnownLanguage");a(bt,"readStoredLanguage");a(nr,"writeStoredLanguage");a(Bo,"readStoredCFLanguage");a(rr,"writeStoredCFLanguage");a(ei,"openLanguagePicker");a(ve,"getSelectedLang");a(ti,"setSelectedLang");a(ye,"getSelectedCFLang");a(oi,"setSelectedCFLang");a(ni,"getUseCFLang");a(ri,"setUseCFLang")});function si(){let e=window.location.pathname.match(/^\/problem\/([^\/?#]+)/);return e?decodeURIComponent(e[1]):null}function gl(){let e=document.querySelector(".vue-codemirror-wrap .CodeMirror")||document.querySelector(".CodeMirror");if(e&&e.CodeMirror&&typeof e.CodeMirror.getValue=="function")return e.CodeMirror;for(let t of Array.from(document.querySelectorAll("textarea")))if(t.CodeMirror&&typeof t.CodeMirror.getValue=="function")return t.CodeMirror;return null}function bl(){let e=document.querySelector("#js-right-header .select-row .el-select .el-input__inner");return e&&e.value?e.value.trim():null}function fl(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t)||{}:{}}catch{return{}}}function ii(){let e=si();if(!e)return;let t=gl();if(!t)return;let o=`hojProblemCodeAndSetting_NoContest_${e}`,n=fl(o);n.code=t.getValue();let r=bt()||bl();r&&(n.language=r),typeof n.language!="string"&&(n.language="C++"),typeof n.theme!="string"&&(n.theme="solarized"),typeof n.fontSize!="string"&&(n.fontSize="14px"),typeof n.tabSize!="number"&&(n.tabSize=4);try{localStorage.setItem(o,JSON.stringify(n)),console.log(`[AutoSave] 已保存 ${o}（${n.code.length} 字符）`)}catch(i){console.warn("[AutoSave] 保存失败:",i)}}function ar(){Ro&&(clearInterval(Ro),Ro=null,console.log("[AutoSave] 已停止"))}function Vt(e){if(ar(),!e.AutoSaveCode)return;let t=si();if(!t)return;let o=Math.max(5,Number(e.AutoSaveCodeInterval)||30);if(Ro=window.setInterval(ii,o*1e3),console.log(`[AutoSave] 已启动，题目 ${t}，间隔 ${o} 秒`),!ai){ai=!0;let n=a(()=>{e.AutoSaveCode&&ii()},"saveOnLeave");document.addEventListener("visibilitychange",()=>{document.hidden&&n()}),window.addEventListener("pagehide",n),window.addEventListener("beforeunload",n)}}var Ro,ai,ir=O(()=>{"use strict";Oo();Ro=null,ai=!1;a(si,"_getAutoSaveProblemId");a(gl,"_findCodeMirror");a(bl,"_getCurrentLanguage");a(fl,"_readStoredSetting");a(ii,"_autoSaveTick");a(ar,"stopAutoSaveCode");a(Vt,"syncAutoSaveCode")});var sr={};Z(sr,{attemptAutoLogin:()=>qo,checkLoginAndAutoLogin:()=>jl,clearLoginState:()=>yl,manualLogin:()=>vl});async function qo(e){let t=e.DefaultUsername,o=e.DefaultPassword;if(!(!e.AutoLogin||!t||!o))try{if((await(await fetch(`${window.location.origin}/api/get-user-home-info`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"})).json())?.status===200){console.log("[AutoLogin] 已登录，跳过自动登录");return}console.log("[AutoLogin] 登录状态已失效，尝试自动登录…"),await li(t,o)?(console.log("[AutoLogin] 自动登录成功"),v(f.t("login.autoSuccess"),"success"),location.reload()):(console.warn("[AutoLogin] 自动登录失败"),v(f.t("login.autoFailed"),"error"))}catch(n){console.error("[AutoLogin] 检查登录状态出错:",n)}}async function li(e,t){try{let o=await fetch(`${window.location.origin}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:e,password:t})}),n=o.headers.get("Authorization"),r=await o.json(),i=r?.data;if(!n)return console.warn("[AutoLogin] 响应头中没有 Authorization"),!1;let s=n,l=o.ok;try{r&&r.status&&r.status!==200&&(l=!1)}catch{}if(!l)return console.warn("[AutoLogin] 登录失败，状态码:",o.status),!1;if(localStorage.setItem("token",s),i!=null)try{localStorage.setItem("userInfo",typeof i=="string"?i:JSON.stringify(i))}catch(u){console.warn("[AutoLogin] 写入 userInfo 失败:",u)}return console.log("[AutoLogin] token 已写入 localStorage"),!0}catch(o){return console.error("[AutoLogin] 登录请求失败:",o),!1}}async function vl(e){if(!e.DefaultUsername||!e.DefaultPassword){v(f.t("login.manualLogging"),"info");return}await li(e.DefaultUsername,e.DefaultPassword)?(v(f.t("login.autoSuccess"),"success"),location.reload()):v(f.t("login.autoFailed"),"error")}function yl(){localStorage.removeItem("token"),localStorage.removeItem("userInfo"),v(f.t("login.cleared"),"success")}var jl,$o=O(()=>{"use strict";G();K();a(qo,"attemptAutoLogin");a(li,"doLogin");a(vl,"manualLogin");a(yl,"clearLoginState");jl=qo});var ur={};Z(ur,{checkCheckInStatus:()=>Go,doCheckIn:()=>pi,injectCheckInButton:()=>dr,refreshCheckInStatus:()=>wl,showCheckInResult:()=>cr});function di(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${o}`}async function ui(){if(ft)return ft;try{let e=localStorage.getItem("userInfo");if(e){let t=typeof e=="string"?JSON.parse(e):e;if(t&&t.username)return ft=t.username,ft}}catch{}try{let e=localStorage.getItem("token")||"",o=await(await fetch(`${window.location.origin}/api/get-user-home-info`,{method:"GET",headers:{Authorization:e,"Content-Type":"application/json"},credentials:"include"})).json();if(o?.status===200&&o?.data?.username)return ft=o.data.username,ft}catch{}return null}function xl(e){return new Promise(t=>{GM_xmlhttpRequest({method:"POST",url:`${ci}/checkin`,headers:{"Content-Type":"application/json"},data:JSON.stringify({username:e}),onload:o=>{if(o.status===200)try{let n=JSON.parse(o.responseText);if(n.success&&n.data)return t(n.data)}catch{}console.warn("[CheckIn] 签到失败:",o.status,o.responseText),t(null)},onerror:()=>{console.warn("[CheckIn] 网络错误"),t(null)},ontimeout:()=>{console.warn("[CheckIn] 超时"),t(null)}})})}function kl(e){return new Promise(t=>{GM_xmlhttpRequest({method:"GET",url:`${ci}/checkin?username=${encodeURIComponent(e)}`,onload:o=>{if(o.status===200)try{let n=JSON.parse(o.responseText);if(n.success&&n.data)return t(n.data)}catch{}t(null)},onerror:()=>t(null),ontimeout:()=>t(null)})})}async function Go(){try{let e=await ui();if(!e)return{checked:!1};let t=await kl(e);if(t){let o=localStorage.getItem(zo.date),n=di();return{checked:o===n,luck:t.checkInFortuneLuck,result:t.checkInFortuneResult}}}catch(e){console.warn("[CheckIn] Failed to query status:",e)}return{checked:!1}}async function pi(e,t=!0){if(!e.CheckInEnabled){v(f.t("checkin.disabled"),"warning");return}try{let o=await ui();if(!o){v(f.t("checkin.queryFailed"),"error");return}let n=await xl(o);if(n){let r=di();localStorage.setItem(zo.date,r),localStorage.setItem(zo.luck,n.checkInFortuneLuck||""),localStorage.setItem(zo.result,n.checkInFortuneResult||""),t&&e.CheckInAutoPopup&&await cr(n.checkInFortuneLuck,n.checkInFortuneResult)}}catch{v(f.t("checkin.failed"),"error")}}async function cr(e,t){let o=e?f.t("checkin.resultTitle"):f.t("checkin.alreadyTitle"),n=`
    <div style="text-align:center;padding:10px;">
      <div style="font-size:24px;margin-bottom:8px;">${e||""}</div>
      <div style="color:${e&&lr[e]?lr[e]:"#666"};font-weight:600;margin-bottom:8px;">${e||""}</div>
      <div style="font-size:13px;opacity:.8;">${t||""}</div>
    </div>
  `;await ie({title:"@"+(e?"checkin.resultTitle":"checkin.alreadyTitle"),html:n,type:"success",confirmText:"@checkin.acceptGoodLuck",showCancel:!1})}async function wl(){let e=await Go(),t=document.getElementById("hoj-checkin-luck");t&&(e.checked&&e.luck?(t.textContent=`${e.luck} —— ${e.result}`,t.style.color=lr[e.luck]||""):(t.textContent=f.t("checkin.notChecked"),t.style.color=""))}function dr(e){if(!e.CheckInEnabled)return!1;let t=document.querySelector("#header ul.el-menu.el-menu--horizontal, #header ul.el-menu--horizontal");if(!t)return!1;if(document.getElementById("hoj-checkin-btn"))return!0;let o=document.createElement("li");o.id="hoj-checkin-btn",o.className="el-menu-item",o.setAttribute("role","menuitem"),o.setAttribute("tabindex","0"),o.style.cursor="pointer",o.dataset.checkedState="no";let n=a(()=>{let s=o.dataset.checkedState==="yes",l=s?"el-icon-check":"el-icon-magic-stick",u=s?"checkin.btnDone":"checkin.btn";o.innerHTML=`<i class="${l}"></i>${f.t(u)}`,o.title=f.t("checkin.btnTitle"),o.style.color=s?"#909399":"",o.style.fontWeight=s?"normal":""},"renderText");n();let r=f.onChange(()=>{if(!o.isConnected){r();return}n()}),i=a(async()=>{if(!e.CheckInEnabled)return;let s=await Go();s&&(o.dataset.checkedState=s.checked?"yes":"no",n())},"refreshStyle");return o.addEventListener("click",async s=>{if(s.preventDefault(),s.stopPropagation(),!e.CheckInEnabled)return v("@checkin.disabled","warning");let l=await Go();if(!l)return v("@checkin.queryFailed","error");if(l.checked){await cr(l.luck,l.result);return}await pi(e),i()}),t.appendChild(o),i(),!0}var ci,zo,lr,ft,Uo=O(()=>{"use strict";G();K();ci="https://hojtag.rkcd.me",zo={date:"hoj_checkin_lastCheckInDate",luck:"hoj_checkin_checkInFortuneLuck",result:"hoj_checkin_checkInFortuneResult",username:"hoj_checkin_username"},lr={大吉:"#FF4D4F",中吉:"#FA8C16",小吉:"#FADB14",吉:"#52C41A",半吉:"#13C2C2",平:"#909399"};a(di,"getTodayDateStr");a(ui,"getCurrentUsername");ft=null;a(xl,"checkInRemote");a(kl,"queryCheckInRemote");a(Go,"checkCheckInStatus");a(pi,"doCheckIn");a(cr,"showCheckInResult");a(wl,"refreshCheckInStatus");a(dr,"injectCheckInButton")});var Yo={};Z(Yo,{applyEditorSettingsNow:()=>Ci,commitEditorSetting:()=>Wo,destroyVSCodeEditor:()=>vr,getEditorValue:()=>Il,hookSiteEditorSettings:()=>Ti,isVSCodeEditorMounted:()=>Hl,mountVSCodeEditor:()=>br,openEditorSettingsDialog:()=>Ei,syncVSCodeEditor:()=>yr});function Ko(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Sl(){let e=Ko();return e.monaco?Promise.resolve(e.monaco):Jt||(Jt=new Promise((t,o)=>{if(!e.require||!e.require.config){let n=document.createElement("script");n.src=`${ji}/vs/loader.js`,n.async=!0,n.onload=()=>mi(t,o),n.onerror=()=>o(new Error("Monaco loader 加载失败")),(document.head||document.documentElement).appendChild(n)}else mi(t,o)}),Jt)}function mi(e,t){let o=Ko();try{if(!o.require||typeof o.require.config!="function"){t(new Error("AMD loader 未就绪（require.config 不可用）"));return}o.require.config({paths:{vs:`${ji}/vs`}}),o.require(["vs/editor/editor.main"],()=>{o.monaco?e(o.monaco):t(new Error("Monaco 未挂载到页面 window"))},n=>t(new Error("Monaco 模块加载失败: "+(n&&n.message?n.message:n))))}catch(n){t(n)}}function xi(){let e=document.querySelector(".vue-codemirror-wrap .CodeMirror")||document.querySelector(".CodeMirror");if(e&&e.CodeMirror&&typeof e.CodeMirror.getValue=="function")return e.CodeMirror;for(let t of Array.from(document.querySelectorAll("textarea")))if(t.CodeMirror&&typeof t.CodeMirror.getValue=="function")return t.CodeMirror;return null}function gi(e){let t=String(e||"").toLowerCase();return/c\+\+|cpp|g\+\+|gcc/.test(t)?"cpp":/^c(\s|$)|^c\b/.test(t)?"c":/python|pypy|^py\d?/.test(t)?"python":/java(?!script)/.test(t)?"java":/javascript|node|^js$/.test(t)?"javascript":/^go|golang/.test(t)?"go":/rust/.test(t)?"rust":/c#|csharp/.test(t)?"csharp":/php/.test(t)?"php":/ruby/.test(t)?"ruby":/kotlin/.test(t)?"kotlin":/scala/.test(t)?"scala":/swift/.test(t)?"swift":/pascal|delphi/.test(t)?"pascal":/haskell/.test(t)?"haskell":"cpp"}function bi(){let e=document.querySelector("#js-right-header .select-row .el-select .el-input__inner");if(e&&e.value)return e.value.trim();let t=document.querySelector("#js-right-header .select-row .el-select-dropdown__item.selected");return t?(t.textContent||"").trim():null}function Tl(e){return e==="vs"?"molarized light":"monokai"}function ki(){let e=window.location.pathname.match(/^\/problem\/([^\/?#]+)/);return e?`hojProblemCodeAndSetting_NoContest_${decodeURIComponent(e[1])}`:null}function wi(){let e=ki();if(!e)return{};try{let t=localStorage.getItem(e);return t?JSON.parse(t)||{}:{}}catch{return{}}}function _l(e){let t=ki();if(t)try{let o=wi();Object.assign(o,e),typeof o.language!="string"&&(o.language="C++"),typeof o.theme!="string"&&(o.theme="monokai"),typeof o.fontSize!="string"&&(o.fontSize="14px"),typeof o.tabSize!="number"&&(o.tabSize=4),localStorage.setItem(t,JSON.stringify(o))}catch(o){console.warn("[VSCode] 写入站点编辑器设置失败:",o)}}function fr(e){let t=String(e.VSCodeTheme||"").trim().toLowerCase();if((t==="vs"||t==="vs-dark"||t==="hc-black")&&(t=Tl(t).toLowerCase()),!pr[t]){let l=wi(),u=typeof l.theme=="string"?l.theme.toLowerCase().trim():"";t=pr[u]?u:"monokai"}let o=pr[t]||"vs-dark",n=parseInt(String(e.VSCodeFontSize||""),10),r=Math.max(10,Math.min(32,Number.isFinite(n)&&n>0?n:14)),i=Number(e.VSCodeTabSize),s=Math.max(1,Math.min(8,Number.isFinite(i)&&i>0?i:4));return{theme:o,fontSize:r,tabSize:s,themeName:t}}function Ll(){let e=document.querySelector("#js-right-header");if(!e)return null;let t=e.querySelector("i.el-icon-s-tools");if(t){let n=t.closest("button");if(n)return n}let o=e.querySelector(".select-row.fl-right .el-popover__reference")||e.querySelector(".fl-right .el-popover__reference");return o?o.closest("button")||o:null}function hr(e){let t=document.createElement("div");return t.textContent=e,t.style.cssText="font-size:12px;font-weight:600;opacity:.7;margin:14px 0 6px;",t}function mr(e,t,o,n){let r=document.createElement("div");r.style.cssText="display:flex;flex-direction:column;gap:6px;";let i=document.createElement("div");i.textContent=e,i.style.cssText="font-size:13px;font-weight:600;opacity:.85;",r.appendChild(i);let s=document.createElement("div");s.style.cssText="display:flex;flex-wrap:wrap;gap:6px;";let l=[],u=a(c=>{l.forEach(({el:d,value:p})=>{let g=String(p)===String(c);d.style.cssText=["padding:5px 12px","font-size:12px","font-family:inherit","cursor:pointer","border-radius:5px","transition:background .12s,border-color .12s,color .12s",g?"background:#409EFF;border:1px solid #409EFF;color:#fff;font-weight:600;":"background:transparent;border:1px solid rgba(0,0,0,.15);color:inherit;"].join(";")})},"paint");return t.forEach(c=>{let d=document.createElement("button");d.type="button",d.textContent=c.label,d.dataset.value=String(c.value),d.addEventListener("click",()=>{u(c.value),n(c.value)}),l.push({el:d,value:c.value}),s.appendChild(d)}),u(o),r.appendChild(s),r}function Wo(e){let t=Je;if(!t)return;if(e.theme!==void 0&&(t.VSCodeTheme=e.theme),e.fontSize!==void 0){let n=parseInt(String(e.fontSize),10);Number.isFinite(n)&&n>0&&(t.VSCodeFontSize=String(n))}if(e.tabSize!==void 0){let n=Number(e.tabSize);Number.isFinite(n)&&n>0&&(t.VSCodeTabSize=String(n))}Y(t);let o={};e.theme!==void 0&&(o.theme=e.theme),e.fontSize!==void 0&&(o.fontSize=`${parseInt(e.fontSize,10)}px`),e.tabSize!==void 0&&(o.tabSize=Number(e.tabSize)),Object.keys(o).length&&_l(o),Ml(t),Fl(),Ci()}function Fl(){Promise.resolve().then(()=>(Mt(),_i)).then(e=>{try{e.refreshSettingsPanel()}catch{}}).catch(()=>{})}function Ml(e){try{let t=document.getElementById("hoj-settings-panel");if(!t)return;let o=t.querySelector('select[data-key="VSCodeTheme"]');o&&(o.value=String(e.VSCodeTheme||"monokai"));let n=t.querySelector('select[data-key="VSCodeFontSize"]');n&&(n.value=String(parseInt(String(e.VSCodeFontSize||""),10)||14));let r=t.querySelector('select[data-key="VSCodeTabSize"]');r&&(r.value=String(Number(e.VSCodeTabSize)||4))}catch(t){console.warn("[VSCode] 同步面板控件失败:",t)}}function Ei(){let e=Je,t=String(e?.VSCodeTheme||"monokai").toLowerCase().trim(),o=fi.some(c=>c.value===t)?t:"monokai",n=String(parseInt(String(e?.VSCodeFontSize||""),10)||14),r=vi.includes(n)?n:"14",i=Number(e?.VSCodeTabSize)||4,s=yi.some(c=>c.value===i)?i:4,l=document.createElement("div"),u=document.createElement("div");u.textContent="这些设置与「Better HOJ 设置面板」共用同一份配置，改动会立即应用并保存。",u.style.cssText="font-size:12px;opacity:.65;line-height:1.6;margin-bottom:4px;",l.appendChild(u),l.appendChild(hr("主题")),l.appendChild(mr("代码配色",fi,o,c=>{Wo({theme:c})})),l.appendChild(hr("字体大小")),l.appendChild(mr("编辑器字号",vi.map(c=>({value:c,label:c})),r,c=>{Wo({fontSize:c})})),l.appendChild(hr("Tab 长度")),l.appendChild(mr("Tab 宽度",yi,s,c=>{Wo({tabSize:c})})),J({title:"编辑器设置",bodyEl:l,width:"420px",maxHeight:"70vh"})}function Ci(e){e&&(Je=e);let t=Je;if(!t)return;let o=fr(t);if(!z){Kt=o,console.log("[VSCode] 编辑器未就绪，已暂存设置:",o);return}Si(o)}function Si(e){if(!z)return;let t=e.theme!==jt,o=e.fontSize!==xt||e.tabSize!==kt;if(!(!t&&!o))try{let n=Ko();t&&(n.monaco?.editor?.setTheme(e.theme),jt=e.theme),o&&(z.updateOptions({fontSize:e.fontSize,tabSize:e.tabSize}),xt=e.fontSize,kt=e.tabSize),console.log("[VSCode] 已应用编辑器设置:",e)}catch(n){console.warn("[VSCode] 应用编辑器设置失败:",n)}}function Nl(){if(!Kt||!z)return;let e=Kt;Kt=null,Si(e)}function Ti(e){e&&(Je=e);let t=Ll();t&&t.dataset.hojVscodeGearHooked!=="1"&&(t.dataset.hojVscodeGearHooked="1",t.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation(),Ei()},!0),console.log("[VSCode] 已接管站点齿轮按钮"))}async function br(e){if(!e.VSCodeEditor||(Je=e,vt))return!1;let t=xi();if(!t)return!1;let o=t.getWrapperElement?.();if(!o)return!1;if(z&&ne===t&&Ve?.isConnected)return Dl(e),!0;z&&vr();let n;vt=!0;try{n=await Sl()}catch(m){return console.error("[VSCode] Monaco 加载失败:",m),vt=!1,Jt=null,gr=String(window.location.pathname),v("VS Code 编辑器加载失败，已回退到原生编辑器","error"),!1}ne=t;let r=document.createElement("div");r.id=El,r.style.cssText="position:relative;width:100%;height:100%;min-height:0;";let i=document.createElement("div");i.id=Cl,i.style.cssText="position:absolute;inset:0;width:100%;height:100%;",r.appendChild(i),o.parentNode?.insertBefore(r,o);let s=Math.round(o.getBoundingClientRect().height||o.offsetHeight||0),l=a(()=>{let m=parseFloat(String(o.style.height||"").replace("px",""));if(Number.isFinite(m)&&m>0)return Math.round(m);let b=o.offsetHeight||o.getBoundingClientRect().height||0;return b>0?Math.round(b):s},"readSiteHeight"),u=a(()=>{let m=l();if(m>0&&(s=m),s>0&&(r.style.height=s+"px",z&&typeof z.layout=="function"))try{z.layout()}catch{}},"syncHeightFromCM");s>0&&(r.style.height=s+"px"),o.style.position="absolute",o.style.left="-99999px",o.style.top="0",o.style.visibility="hidden",o.style.pointerEvents="none",Ve=r,Jo=u;let c=fr(e),d=gi(bi());z=n.editor.create(i,{value:t.getValue(),language:d,theme:c.theme,fontSize:c.fontSize,tabSize:c.tabSize,insertSpaces:!0,automaticLayout:!0,minimap:{enabled:!0},scrollBeyondLastLine:!1,fontFamily:'"JetBrains Mono", "Fira Code", "Source Code Pro", Consolas, monospace',renderWhitespace:"selection",smoothScrolling:!0,cursorBlinking:"smooth",wordWrap:"off"});try{let m=new ResizeObserver(()=>{Jo?.()});m.observe(o),yt.push(()=>m.disconnect())}catch{}let p=a(()=>{Jo?.()},"onWinResize");window.addEventListener("resize",p),yt.push(()=>window.removeEventListener("resize",p));let g=z.onDidChangeModelContent(()=>{if(!Ue){Ue=!0;try{let m=z.getValue();if(ne.getValue()!==m){let b=ne.getCursor?.();if(ne.setValue(m),b&&ne.setCursor)try{ne.setCursor(b)}catch{}}}finally{Ue=!1}}});yt.push(()=>g.dispose()),Wt=a(()=>{if(!Ue){Ue=!0;try{let m=ne.getValue();z.getValue()!==m&&z.setValue(m)}finally{Ue=!1}}},"_cmListener"),ne.on("change",Wt),Vo=ne;let h=window.setInterval(()=>{if(!z)return;let m=gi(bi()),b=z.getModel();b&&b.getLanguageId()!==m&&n.editor.setModelLanguage(b,m)},1500);return yt.push(()=>clearInterval(h)),jt=c.theme,xt=c.fontSize,kt=c.tabSize,vt=!1,Nl(),console.log("[VSCode] 编辑器已挂载，语言 =",d),!0}function Dl(e){if(!z)return;let t=fr(e),o=t.theme!==jt,n=t.fontSize!==xt||t.tabSize!==kt;if(!o&&!n)return;let r=Ko();try{o&&(r.monaco?.editor?.setTheme(t.theme),jt=t.theme),n&&(z.updateOptions({fontSize:t.fontSize,tabSize:t.tabSize}),xt=t.fontSize,kt=t.tabSize)}catch(i){console.warn("[VSCode] 更新编辑器选项失败:",i)}}function vr(){if(yt.forEach(e=>{try{e()}catch{}}),yt=[],Vo&&Wt)try{Vo.off("change",Wt)}catch{}if(Wt=null,Vo=null,z){try{z.dispose()}catch{}z=null}if(Ve){let e=ne?.getWrapperElement?.();e&&(e.style.display=""),Ve.remove(),Ve=null}ne=null,Jo=null,Kt=null,Ue=!1,vt=!1,jt="",xt=0,kt=0,document.querySelectorAll("[data-hoj-vscode-hooked]").forEach(e=>{delete e.dataset.hojVscodeHooked})}function Hl(){return!!(z&&Ve?.isConnected)}function Il(){if(z)return z.getValue();let e=xi();return e?e.getValue():""}function yr(e){if(Je=e,!(/^\/problem[\/:][^\/?#]+/.test(window.location.pathname)||/^\/training\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname)||/^\/contest\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname)||/^\/group\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname))||!e.VSCodeEditor){(Ve||z)&&vr(),gr="";return}Ti(e);let o=Date.now();if(!(o-hi<300)&&(hi=o,gr!==String(window.location.pathname))){if(vt||z){br(e);return}br(e)}}var ji,El,Cl,Jt,z,ne,Ve,vt,jt,xt,kt,Ue,gr,hi,yt,Wt,Vo,Jo,Kt,pr,Je,fi,vi,yi,Yt=O(()=>{"use strict";le();G();ji="https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/monaco-editor/0.45.0/min",El="hoj-vscode-wrap",Cl="hoj-vscode-host",Jt=null,z=null,ne=null,Ve=null,vt=!1,jt="",xt=0,kt=0,Ue=!1,gr="",hi=0,yt=[],Wt=null,Vo=null,Jo=null,Kt=null;a(Ko,"_pageWindow");a(Sl,"loadMonaco");a(mi,"initMonaco");a(xi,"findCodeMirror");a(gi,"toMonacoLang");a(bi,"currentLanguage");pr={monokai:"vs-dark","molarized light":"vs","molarized dark":"vs-dark",material:"vs-dark",idea:"vs",eclipse:"vs","base16-dark":"vs-dark",cobalt:"vs-dark",dracula:"vs-dark",solarized:"vs",default:"vs-dark"};a(Tl,"monacoThemeToStored");a(ki,"_settingKey");a(wi,"_readSiteSettings");a(_l,"_writeSiteSettings");a(fr,"readEditorSettings");Je=null;a(Ll,"findGearButton");fi=[{value:"monokai",label:"Monokai"},{value:"molarized light",label:"Molarized Light"},{value:"material",label:"Material"},{value:"idea",label:"IDEA"},{value:"eclipse",label:"Eclipse"},{value:"base16-dark",label:"Base16-dark"},{value:"cobalt",label:"Cobalt"},{value:"dracula",label:"Dracula"}],vi=["12px","14px","16px","18px","20px"],yi=[{value:2,label:"2 个空格"},{value:4,label:"4 个空格"},{value:8,label:"8 个空格"}];a(hr,"sectionLabel");a(mr,"optionRow");a(Wo,"commitEditorSetting");a(Fl,"refreshPanelUI");a(Ml,"syncPanelControls");a(Ei,"openEditorSettingsDialog");a(Ci,"applyEditorSettingsNow");a(Si,"applySettingsToEditor");a(Nl,"applyPendingSettings");a(Ti,"hookSiteEditorSettings");a(br,"mountVSCodeEditor");a(Dl,"applyEditorOptions");a(vr,"destroyVSCodeEditor");a(Hl,"isVSCodeEditorMounted");a(Il,"getEditorValue");a(yr,"syncVSCodeEditor")});var Ni={};Z(Ni,{injectRecommendButton:()=>Xo,openRecommendDialog:()=>Mi});async function Al(e){if(!e)return null;try{let t=await fetch(`https://hdnoip.com/api/ability/student/${encodeURIComponent(e)}`,{method:"GET",credentials:"omit"});if(!t.ok)throw new Error(`HTTP ${t.status}`);return(await t.json())?.data||null}catch(t){return console.warn("[Hdnoip] 请求失败:",t),null}}function Xt(e){return String(e).replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function Xo(e){if(Fi)return;let t=document.getElementById("pick-one");if(!t||!e.hdnoipCFName)return;let o=t.cloneNode(!0);o.id="hoj-rec-btn",o.removeAttribute("long"),o.style.marginLeft="8px";let n=o.querySelector("span");n&&n.childNodes.forEach(r=>{r.nodeType===Node.TEXT_NODE&&(r.textContent=" 题目推荐 ")}),o.addEventListener("click",async r=>{if(r.preventDefault(),r.stopPropagation(),o.dataset.loading==="1")return;o.dataset.loading="1";let i=n?n.innerHTML:"";n&&(n.innerHTML='<i class="fa fa-spinner fa-spin"></i> 加载中...');try{await Mi(e.hdnoipCFName)}catch(s){console.error("[RecDialog] 出错:",s),v("打开推荐列表失败","error")}finally{o.dataset.loading="0",n&&(n.innerHTML=i)}}),t.insertAdjacentElement("afterend",o),Fi=!0,console.log("[RecDialog] 题目推荐按钮已注入")}async function Mi(e){if(!e){v("请先在 Better HOJ 设置中填写 Codeforces 用户名","warning");return}let o=(await Al(e))?.recommendations;if(!o||typeof o!="object"){v("未获取到推荐数据，请检查 CF 用户名","error");return}let n=Object.keys(Li).filter(u=>o[u]&&Array.isArray(o[u].problems)&&o[u].problems.length>0);if(!n.length){v("暂无推荐题目","warning");return}let r=document.createElement("div");r.className="hoj-rec-dialog",r.innerHTML=`
    <div class="hoj-rec-meta">
        <span>CF 用户名：<b>${Xt(e)}</b></span>
        <span style="opacity:.6;margin-left:10px;">共 ${n.length} 个分类</span>
    </div>
    <div class="hoj-rec-tabs" role="tablist"></div>
    <div class="hoj-rec-content" role="tabpanel"></div>
  `;let i=r.querySelector(".hoj-rec-tabs"),s=r.querySelector(".hoj-rec-content"),l=a(u=>{let c=o[u],d=c.problems||[],p=c.target_rating??"-",g=c.rating_range||"";s.innerHTML=`
      <div class="hoj-rec-meta">
          <span>目标难度 <b>${Xt(String(p))}</b></span>
          ${g?`<span style="opacity:.6;margin-left:10px;">推荐区间 ${Xt(g)}</span>`:""}
          <span style="opacity:.6;margin-left:10px;">${d.length} 道</span>
      </div>
      <ul class="hoj-rec-list">
          ${d.map(h=>{let m=Xt(h.problem_id||h.id||""),b=Xt(h.name||m),j=String(h.problem_id||h.id||"").trim(),x=j?`/problem/CF-${encodeURIComponent(j)}`:"#",y=h.rating??"",C=typeof h.weight=="number"?h.weight.toFixed(3):"";return`<li class="hoj-rec-item">
                    <a href="${x}" target="_blank" rel="noopener" class="hoj-rec-link">
                        <span class="hoj-rec-id">${m}</span>
                        <span class="hoj-rec-name">${b}</span>
                        <span class="hoj-rec-rating">CF ${y}</span>
                        ${C?`<span class="hoj-rec-weight">w=${C}</span>`:""}
                    </a>
                </li>`}).join("")}
      </ul>
    `},"renderCategory");n.forEach((u,c)=>{let d=document.createElement("button");d.type="button",d.className="hoj-rec-tab"+(c===0?" active":""),d.dataset.cat=u,d.setAttribute("role","tab"),d.textContent=`${Li[u]} (${o[u].problems.length})`,d.addEventListener("click",()=>{i.querySelectorAll(".hoj-rec-tab").forEach(p=>p.classList.remove("active")),d.classList.add("active"),l(u)}),i.appendChild(d)}),l(n[0]),J({title:`题目推荐 · ${e}`,bodyEl:r,width:"640px",maxHeight:"80vh"})}var Li,Fi,jr=O(()=>{"use strict";G();Li={basic:"基础算法",thinking:"思维构造",dp:"动态规划",ds:"数据结构",graph:"图论算法",math:"数学数论",string:"字符串"};a(Al,"fetchHdnoipData");a(Xt,"escapeHtml");Fi=!1;a(Xo,"injectRecommendButton");a(Mi,"openRecommendDialog")});var _i={};Z(_i,{applySettingsPanelFullscreen:()=>en,closeSettingsPanel:()=>on,createSettingsPanel:()=>Qo,getSettingsPanel:()=>We,openSettingsPanel:()=>Di,openSettingsPanelFullscreen:()=>Ft,refreshSettingsPanel:()=>tn,toggleSettingsPanel:()=>wt});function Qo(e){Zo=e;let t=document.createElement("div");t.id="hoj-settings-panel",t.innerHTML=Pl(),t.querySelectorAll("[data-i18n]").forEach(n=>{let r=n.getAttribute("data-i18n");n.textContent=E(r)});let o=t.querySelector("#hoj-fullscreen-toggle");return o&&(o.checked=!!e.SettingsFullscreen,o.addEventListener("change",()=>{e.SettingsFullscreen=o.checked,Y(e),en()})),document.body.appendChild(t),ea(t),f.apply(t),f.onChange(()=>{t.isConnected&&f.apply(t)}),Bl(t),Ol(t,e),ql(t),Ca(t,e),q=t,Bn(t),t}function Pl(){return`
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
                        <option value="15" data-i18n="autosave.15">15 秒</option>
                        <option value="30" data-i18n="autosave.30">30 秒</option>
                        <option value="60" data-i18n="autosave.60">1 分钟</option>
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
                        <option value="admin" data-i18n="vditor.uploadModeAdmin"></option>
                        <option value="group" data-i18n="vditor.uploadModeGroup"></option>
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
                <span class="hoj-section-title" data-i18n="better.vscode">VS Code 编辑器</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row">
                    <span data-i18n="vscode.enable">启用 VS Code 编辑器</span>
                    <input type="checkbox" data-key="VSCodeEditor">
                </div>
                <div class="hoj-row">
                    <span data-i18n="vscode.theme">主题</span>
                    <select data-key="VSCodeTheme">
                        <option value="monokai">Monokai（深色）</option>
                        <option value="molarized light">Molarized Light（浅色）</option>
                        <option value="material">Material（深色）</option>
                        <option value="idea">IDEA（浅色）</option>
                        <option value="eclipse">Eclipse（浅色）</option>
                        <option value="base16-dark">Base16-dark（深色）</option>
                        <option value="cobalt">Cobalt（深色）</option>
                        <option value="dracula">Dracula（深色）</option>
                    </select>
                </div>
                <div class="hoj-row">
                    <span data-i18n="vscode.fontSize">字体大小</span>
                    <select data-key="VSCodeFontSize">
                        <option value="12">12px</option>
                        <option value="14">14px</option>
                        <option value="16">16px</option>
                        <option value="18">18px</option>
                        <option value="20">20px</option>
                    </select>
                </div>
                <div class="hoj-row">
                    <span data-i18n="vscode.tabSize">Tab 长度</span>
                    <select data-key="VSCodeTabSize">
                        <option value="2">2 个空格</option>
                        <option value="4">4 个空格</option>
                        <option value="8">8 个空格</option>
                    </select>
                </div>
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-vscode-settings-btn" type="button" class="hoj-mini-btn" data-i18n="vscode.openDialog">打开编辑器设置</button>
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
                <div class="hoj-row">
                    <span data-i18n="perf.enable">高性能模式</span>
                    <input type="checkbox" data-key="PerfMode">
                </div>
                <div class="hoj-row" style="padding-left:6px;">
                    <span data-i18n="perf.hint" style="font-size:11px;opacity:.6;white-space:normal;line-height:1.5;">关闭弹窗淡出动画与背景模糊，低性能设备上更流畅</span>
                </div>
                <div class="hoj-row hoj-version-row" id="hoj-version-row" title="">
                    <span data-i18n="about.version">版本</span>
                    <span class="hoj-version-text">${Q.name} (${Q.version})</span>
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
`}function Bl(e){let t=e.querySelector("#hoj-version-row");if(!t)return;let o=t.querySelector(".hoj-version-text"),n=a(()=>t.setAttribute("title",E("about.copyVersionHint")),"setTitle");n(),f.onChange(()=>{t.isConnected&&n()}),t.style.cursor="pointer",t.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();let s=`${Q.name} (${Q.version})`,l=a(()=>{v(E("about.copied",{v:s}),"success",1500);let u=t.style.background;t.style.transition="background .15s",t.style.background="rgba(64, 158, 255, .12)",setTimeout(()=>{t.style.background=u},300)},"done");try{if(typeof fn=="function"){fn(s),l();return}if(navigator.clipboard?.writeText){navigator.clipboard.writeText(s).then(l).catch(()=>r(s,l));return}}catch{}r(s,l)});function r(i,s){let l=document.createElement("textarea");l.value=i,l.style.cssText="position:fixed;left:-9999px;top:0;",document.body.appendChild(l),l.select();try{document.execCommand("copy"),s()}catch{v(E("about.copyFailed"),"error")}finally{document.body.removeChild(l)}}a(r,"fallbackCopy")}function Ol(e,t){e.querySelectorAll("[data-key]").forEach(r=>{let i=r.getAttribute("data-key"),s=r;s.type==="checkbox"?s.checked=!!t[i]:s.value=t[i]??"",s.addEventListener("change",()=>Rl(s,i,t))}),e.querySelectorAll(".hoj-section-header").forEach(r=>{r.addEventListener("click",()=>{let i=r.closest(".hoj-section");i&&i.classList.toggle("collapsed")})}),ee(e,"#hoj-close",()=>e.classList.remove("open")),ee(e,"#hoj-import-export-btn",()=>Kn(t)),ee(e,"#hoj-login-manual",()=>Promise.resolve().then(()=>($o(),sr)).then(r=>r.manualLogin(t))),ee(e,"#hoj-logout-manual",()=>Promise.resolve().then(()=>($o(),sr)).then(r=>r.clearLoginState())),ee(e,"#hoj-clear-favorites",async()=>{let{NewDialog:r}=await Promise.resolve().then(()=>(G(),uo));await r({title:"@fav.clearConfirm.title",content:"@fav.clearConfirm.body",type:"warning"})&&Promise.resolve().then(()=>(Ht(),Da)).then(s=>s.clearAllFavorites())}),ee(e,"#hoj-checkin-do",()=>Promise.resolve().then(()=>(Uo(),ur)).then(r=>r.doCheckIn(t))),ee(e,"#hoj-checkin-refresh",()=>Promise.resolve().then(()=>(Uo(),ur)).then(r=>r.refreshCheckInStatus())),ee(e,"#hoj-tag-refresh",()=>Promise.resolve().then(()=>(Ge(),Gt)).then(r=>r.refreshTag(t))),ee(e,"#hoj-tag-push",()=>Promise.resolve().then(()=>(Ge(),Gt)).then(r=>r.pushMyTag(t))),ee(e,"#hoj-tag-delete",async()=>{let{NewDialog:r,NewAlert:i}=await Promise.resolve().then(()=>(G(),uo));if(!await r({title:"清除云端标签",content:"确定要删除你在云端保存的个人标签吗？",type:"warning"}))return;let u=await(await Promise.resolve().then(()=>(Ge(),Gt))).deleteMyTag(t);i(u.success?u.message:"删除失败："+u.message,u.success?"success":"error")}),ee(e,"#hoj-navbar-layout-btn",()=>Rn(t)),ee(e,"#hoj-vscode-settings-btn",()=>{Promise.resolve().then(()=>(Yt(),Yo)).then(r=>r.openEditorSettingsDialog())}),ee(e,"#hoj-snippet-manage-btn",()=>vo(t)),ee(e,"#hoj-snippet-open-btn",()=>Re(t));let o=e.querySelector('select[data-key="VditorUploadMode"]'),n=e.querySelector("#hoj-vditor-gid-row");o&&n&&(n.style.display=o.value==="group"?"flex":"none",o.addEventListener("change",()=>{n.style.display=o.value==="group"?"flex":"none"}))}async function Rl(e,t,o){if(!e.readOnly){if(e.type==="checkbox"?o[t]=e.checked:o[t]=e.value,Y(o),Ee(o),ce(o),Ce(o),t==="Open"&&(o.Open||document.documentElement.classList.remove("hoj-dark-mode","hoj-lg-active"),Ce(o),Ee(o)),t==="ImageSource"){let{syncDynamicWallpaperOptions:n}=await Promise.resolve().then(()=>(Lt(),ja));n(o,q)}if(t==="hdnoipCFName"){let{injectRecommendButton:n}=await Promise.resolve().then(()=>(jr(),Ni)),r=document.getElementById("hoj-rec-btn");r&&r.remove(),document.getElementById("pick-one")&&setTimeout(n,100)}if(t==="DarkMode"){let n=q?.querySelector("#hoj-mouse-glow-row");if(n&&(n.style.display=o.Open&&o.DarkMode?"flex":"none"),o.Open&&o.DarkMode){let{initCardGlow:r}=await Promise.resolve().then(()=>(Se(),ho));r(o)}}if((t==="CustomRankTag"||t==="CustomRankTagColor")&&($e(),Jn(o),Le(),_e()&&(document.querySelectorAll(".hoj-userhome-tag").forEach(n=>n.remove()),setTimeout(ze,100))),(t==="AutoSaveCode"||t==="AutoSaveCodeInterval")&&Vt(o),t==="PerfMode"){let{setPerfMode:n}=await Promise.resolve().then(()=>(G(),uo));n(!!o.PerfMode)}if((t==="ToolsEnabled"||t==="ToolsKeystroke"||t==="ToolsPageTime"||t==="ToolsClock")&&st(o),t==="VSCodeEditor"&&(await Promise.resolve().then(()=>(Yt(),Yo))).syncVSCodeEditor(o),(t==="VSCodeTheme"||t==="VSCodeFontSize"||t==="VSCodeTabSize")&&(await Promise.resolve().then(()=>(Yt(),Yo))).applyEditorSettingsNow(o),(t==="VditorDiscussionPublish"||t==="VditorDiscussionEdit"||t==="VditorGroupCreate")&&(document.querySelectorAll("[data-hoj-disc-intercepted]").forEach(n=>delete n.dataset.hojDiscIntercepted),document.querySelectorAll("[data-hoj-edit-intercepted]").forEach(n=>delete n.dataset.hojEditIntercepted),document.querySelectorAll("[data-hoj-create-group-intercepted]").forEach(n=>delete n.dataset.hojCreateGroupIntercepted),o.VditorDiscussionPublish&&Do(o),o.VditorDiscussionEdit&&Ho(o),o.VditorGroupCreate&&Io(o)),t==="VditorUploadMode"){let n=q?.querySelector("#hoj-vditor-gid-row");n&&(n.style.display=o.VditorUploadMode==="group"?"flex":"none")}et.some(n=>n.keys.includes(t))&&Mn(o)}}function ee(e,t,o){let n=e.querySelector(t);n&&n.addEventListener("click",o)}function ql(e){let t=e.querySelector(".hoj-panel-header");if(!t)return;t.style.cursor="move",t.style.userSelect="none",t.style.touchAction="none";let o=!1,n=0,r=0,i=0,s=0,l=a(d=>{if(e.classList.contains("hoj-fullscreen")||d.button!==0||d.target.closest("button"))return;d.preventDefault(),o=!0;let p=e.getBoundingClientRect();n=d.clientX,r=d.clientY,i=p.left,s=p.top,e.style.right="auto",e.style.left=p.left+"px",e.style.top=p.top+"px",document.addEventListener("mousemove",u,!0),document.addEventListener("mouseup",c,!0)},"onMouseDown"),u=a(d=>{if(!o)return;let p=d.clientX-n,g=d.clientY-r,h=i+p,m=s+g,b=e.offsetWidth,j=e.offsetHeight;h=Math.max(0,Math.min(h,window.innerWidth-b)),m=Math.max(0,Math.min(m,window.innerHeight-j)),e.style.left=h+"px",e.style.top=m+"px"},"onMouseMove"),c=a(()=>{o=!1,document.removeEventListener("mousemove",u,!0),document.removeEventListener("mouseup",c,!0)},"onMouseUp");t.addEventListener("mousedown",l)}function en(e){if(!q)return;let t=e===void 0?!!Zo?.SettingsFullscreen:!!e;q.style.left="",q.style.top="",q.style.right="",q.style.width="",q.classList.toggle("hoj-fullscreen",t);let o=q.querySelector("#hoj-fullscreen-toggle");o&&(o.checked=t)}function Ft(){if(q||(q=Qo(Zo??{})),!q)return;q.style.left="",q.style.top="",q.style.right="",q.style.width="",tn(),q.classList.add("open"),en(!0);let e=q.querySelector(".hoj-panel-header");e&&(e.style.touchAction="auto"),requestAnimationFrame(()=>{let t=q.getBoundingClientRect();console.log("[MobileMenu] 全屏面板 rect:",t.width,t.height)})}function tn(){let e=q,t=Zo;if(!(!e||!t))try{e.querySelectorAll("[data-key]").forEach(i=>{let s=i.getAttribute("data-key");if(!s)return;let l=i,u=t[s];if(l.type==="checkbox")l.checked=!!u;else{let c=u==null?"":String(u);l.value!==c&&(l.value=c)}});try{Qr(e)}catch{}try{Mn(t)}catch{}let o=e.querySelector('select[data-key="VditorUploadMode"]'),n=e.querySelector("#hoj-vditor-gid-row");o&&n&&(n.style.display=o.value==="group"?"flex":"none");let r=e.querySelector("#hoj-mouse-glow-row");r&&(r.style.display=t.Open&&t.DarkMode?"flex":"none")}catch(o){console.warn("[Settings] 刷新面板失败:",o)}}function Di(){q&&(tn(),q.classList.add("open"))}function on(){q&&q.classList.remove("open")}function wt(){q&&(q.classList.contains("open")||tn(),q.classList.toggle("open"))}function We(){return q}var q,Zo,Mt=O(()=>{"use strict";K();G();ta();Ta();Yn();So();At();or();Ge();ir();lt();Se();Lt();le();He();Pt();q=null,Zo=null;a(Qo,"createSettingsPanel");a(Pl,"getSettingsPanelHTML");a(Bl,"initVersionCopy");a(Ol,"bindSettingsEvents");a(Rl,"handleConfigChange");a(ee,"bindClick");a(ql,"enablePanelDrag");a(en,"applySettingsPanelFullscreen");a(Ft,"openSettingsPanelFullscreen");a(tn,"refreshSettingsPanel");a(Di,"openSettingsPanel");a(on,"closeSettingsPanel");a(wt,"toggleSettingsPanel");a(We,"getSettingsPanel")});K();le();G();He();Mt();Se();$o();G();K();Pt();function $l(e,t){let o=String(e).split(".").map(i=>parseInt(i,10)||0),n=String(t).split(".").map(i=>parseInt(i,10)||0),r=Math.max(o.length,n.length);for(let i=0;i<r;i++){let s=o[i]??0,l=n[i]??0;if(s!==l)return s<l?-1:1}return 0}a($l,"cmpVersion");async function Hi(){let e=Q;try{let t=await fetch("https://betterhoj.rkcd.me/latest",{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok){console.warn("[Update] 获取远程版本失败:",t.status);return}let o=await t.json();if(!o||!o.version)return;if($l(o.version,e.version)<=0){console.log("[Update] 当前已是最新版本:",e.version);return}let n=Math.abs((o.count??0)-(e.count??0)),r=n<3?"warning":"error",i="";Array.isArray(o.changelog)&&o.changelog.length&&(i='<ul style="margin:8px 0 0 18px;padding:0;">'+o.changelog.map(u=>`<li>${u}</li>`).join("")+"</ul>");let s=`
      <div>${f.t("update.current")}：<b>${e.version}</b>（${e.name}）</div>
      <div>${f.t("update.latest")}：<b>${o.version}</b>（${o.name}）</div>
      <div>${f.t("update.date")}：${o.date||"-"}</div>
      <div>${f.t("update.changelog")}：</div>
      ${i||`<div>${f.t("update.noChangelog")}</div>`}
      <div style="color:...">
          ${n<3?f.t("update.normal"):f.t("update.urgent")}
      </div>
    `;await ie({title:"@update.available",html:s,type:r,confirmText:"@update.gotoDownload",cancelText:"@update.later",closeOnMask:!1})&&o.downloadUrl&&(console.log("[Update] 跳转到下载页面:",o.downloadUrl),En.open(o.downloadUrl,"_blank"))}catch(t){console.warn("[Update] 检查更新出错:",t)}}a(Hi,"checkScriptUpdate");Uo();Ge();Ht();jr();So();At();var zl=["ssf.hdoi.cn","deeplearning.org.cn","oi.cnuschool.org.cn","172.16.21.199"];function xr(e){let t=e.split(":")[0];return zl.includes(t)}a(xr,"isKnownHojHost");function Ii(e){let t=(e.AutoRedirectHost||"").trim();if(!t||!e.EnableRedirect)return;let o=window.location.hostname,n=t.split(":")[0];if(o===n||!xr(o))return;let i=`${(e.AutoRedirectProtocol||"").trim()||window.location.protocol.replace(":","")}://${t}${window.location.pathname}${window.location.search}${window.location.hash}`;console.log(`[AutoRedirect] ${window.location.host} → ${n}`),window.location.replace(i)}a(Ii,"autoRedirect");function nn(){if(!window.location.pathname.startsWith("/new")){let i=document.getElementById("hoj-back-old-btn");return i&&i.remove(),!1}if(document.getElementById("hoj-back-old-btn"))return!0;let t=document.querySelector("nav[data-v-7b0404d0]")||document.querySelector("nav[data-v-9dacc850]");if(!t)return!1;let o=t.querySelector("button.gear-item");if(!o)return!1;let n=o.parentElement,r=document.createElement("button");return r.id="hoj-back-old-btn",r.className=o.className,r.style.color="#86868B",r.innerHTML=`
    <span class="w-4 h-4 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </span>
    <span class="truncate">返回旧前端</span>
  `,r.addEventListener("click",()=>{window.location.href="/home"}),n.appendChild(r),console.log("[BackOld] 已注入返回旧前端按钮"),!0}a(nn,"injectBackToOldBtn");function Gl(e,t){let o=(t.AutoRedirectHost||"").trim();if(!o)return e;let n=o.split(":")[0];try{if(e.startsWith("//")){let r=new URL(window.location.protocol+e);return!xr(r.hostname)||r.hostname===n?e:(r.hostname=n,r.toString())}if(/^https?:\/\//i.test(e)){let r=new URL(e);return!xr(r.hostname)||r.hostname===n?e:(r.hostname=n,r.toString())}return e}catch{return e}}a(Gl,"rewriteHojUrl");function kr(e){if(!e.AutoRedirectHost)return;let t=document.querySelectorAll("a[href]"),o=0;t.forEach(n=>{let r=n.getAttribute("href");if(!r)return;let i=Gl(r,e);i!==r&&(n.setAttribute("href",i),o++)}),o>0&&console.log(`[AutoRedirect] 已改写 ${o} 个链接`)}a(kr,"rewriteAllHojLinks");or();G();K();rt();Oo();var Ul=["C++","C++ With O2","C++ 17","C++ 17 With O2","C++ 20","C++ 20 With O2","C","C With O2","Python3","Python2","Java","Golang","C#","PHP","PyPy2","PyPy3","JavaScript Node","JavaScript V8","Ruby","Rust"],Vl=[{canonical:"C++ 20 With O2",match:/c\+\+\s*20\s*with\s*o2/i},{canonical:"C++ 17 With O2",match:/c\+\+\s*17\s*with\s*o2/i},{canonical:"C++ With O2",match:/^c\+\+\s*with\s*o2/i},{canonical:"C++ 20",match:/c\+\+\s*20/i},{canonical:"C++ 17",match:/c\+\+\s*17/i},{canonical:"C++",match:/^c\+\+\s*$/i},{canonical:"C With O2",match:/^c\s+with\s*o2/i},{canonical:"C",match:/^c\s*$/i},{canonical:"PyPy3",match:/^pypy\s*3/i},{canonical:"PyPy2",match:/^pypy\s*2/i},{canonical:"Python3",match:/^python\s*3|^py3/i},{canonical:"Python2",match:/^python\s*2|^py2/i},{canonical:"Golang",match:/^go(lang)?\s*$/i},{canonical:"Java",match:/^java\s*$/i},{canonical:"C#",match:/^c#|csharp/i},{canonical:"PHP",match:/^php/i},{canonical:"JavaScript Node",match:/javascript.*node|node.*js/i},{canonical:"JavaScript V8",match:/javascript|v8/i},{canonical:"Ruby",match:/^ruby/i},{canonical:"Rust",match:/^rust/i}],Ai={"C++":"text/x-c++src","C++ With O2":"text/x-c++src","C++ 17":"text/x-c++src","C++ 17 With O2":"text/x-c++src","C++ 20":"text/x-c++src","C++ 20 With O2":"text/x-c++src",C:"text/x-csrc","C With O2":"text/x-csrc",Python3:"text/x-python",Python2:"text/x-python",PyPy3:"text/x-python",PyPy2:"text/x-python",Java:"text/x-java",Golang:"text/x-go","C#":"text/x-csharp",PHP:"text/x-php","JavaScript Node":"text/javascript","JavaScript V8":"text/javascript",Ruby:"text/x-ruby",Rust:"text/x-rustsrc"};function Cr(e){if(!e)return"C++";let t=String(e).trim();if(!t)return"C++";if(Ul.includes(t))return t;for(let{canonical:o,match:n}of Vl)if(n.test(t))return o;return"C++"}a(Cr,"normalizeLanguage");function Jl(e){let t=Cr(e);if(Ai[t])return Ai[t];let o=String(e||"").toLowerCase();return/^gnu\s*g\+\+|^clang\+\+|visual\s*c\+\+/.test(o)?"text/x-c++src":/^c#/.test(o)?"text/x-csharp":/^d\s|^dmd/.test(o)?"text/x-d":/^go\s/.test(o)?"text/x-go":/^haskell/.test(o)?"text/x-haskell":/^java\s/.test(o)?"text/x-java":/^kotlin/.test(o)?"text/x-kotlin":/^ocaml/.test(o)?"text/x-ocaml":/^delphi|^free\s*pascal|^pascal/.test(o)?"text/x-pascal":/^perl/.test(o)?"text/x-perl":/^php/.test(o)?"text/x-php":/^python\s*2/.test(o)||/^python\s*3/.test(o)||/^pypy\s*2/.test(o)||/^pypy\s*3/.test(o)?"text/x-python":/^ruby/.test(o)?"text/x-ruby":/^rust/.test(o)?"text/x-rustsrc":/^scala/.test(o)?"text/x-scala":/^javascript/.test(o)||/^node/.test(o)?"text/javascript":"text/x-c++src"}a(Jl,"getTestJudgeMode");function Pi(){let e=document.getElementById("hoj-lang-trigger");return!!e&&e.dataset.mode==="cf"}a(Pi,"_hojCurrentIsCFLang");function Wl(){return Pi()?ye()||Bo()||Ne:ve()||bt()||Me}a(Wl,"_hojCurrentSelectedLang");function rn(e){return new Promise(t=>setTimeout(t,e))}a(rn,"_sleep");function Kl(){let e=document.querySelector(".CodeMirror");if(e&&e.CodeMirror)return e.CodeMirror;let o=(typeof unsafeWindow<"u"?unsafeWindow:window).CodeMirror;return o&&o.editors&&o.editors.length?o.editors[0]:null}a(Kl,"_findCodeMirror");function Yl(){return document.querySelector("#js-right-header .el-select")?.value||null}a(Yl,"_getCurrentLanguage");function Xl(e){let t=document.querySelector("#js-right-header .el-select");if(t){for(let o of t.options||[])if(o.value===e||Cr(o.value)===e){t.value=o.value,t.dispatchEvent(new Event("change")),t.dispatchEvent(new Event("input"));break}}}a(Xl,"_hojSyncNativeSelect");function Zl(e){if(!e)return null;let t=e.data;return typeof t=="string"?t:t&&typeof t=="object"?t.testJudgeKey||t.key||t.testJudgeId||null:e.testJudgeKey||e.key||null}a(Zl,"_extractTestJudgeKey");async function Ql(e){let t=localStorage.getItem("token")||"";return(await fetch(`${window.location.origin}/api/submit-problem-test-judge`,{method:"POST",headers:{Authorization:t,"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)})).json()}a(Ql,"_submitOneTest");async function ec(e,t){let o=localStorage.getItem("token")||"",n=150;for(let r=0;r<n;r++){if(t&&t.aborted)throw new Error("ABORTED");await rn(800);let s=await(await fetch(`${window.location.origin}/api/get-test-judge-result?testJudgeKey=${encodeURIComponent(e)}`,{headers:{Authorization:o},credentials:"include"})).json();if(!s||s.status!==200)continue;let l=s.data&&s.data.status;if(!(l===5||l===6||l===7)&&l!==void 0)return s.data}throw new Error("POLL_TIMEOUT")}a(ec,"_pollTestResult");var wr=3e3,Er=0;async function tc(e,t){let o=0;for(;o<20;){if(o++,t.signal.aborted)throw new Error("ABORTED");let n=Date.now()-Er;if(n<wr&&await rn(wr-n),t.signal.aborted)throw new Error("ABORTED");Er=Date.now();let r;try{r=await Ql(e)}catch{await rn(1e3);continue}let i=r?.msg||"";if(r?.status===403||/过于频繁|太频繁|too\s*frequent|rate\s*limit/i.test(i)){await rn(wr);continue}return r}throw new Error("RATE_LIMITED")}a(tc,"_rateLimitedSubmit");function Bi(e){let t=null;for(let n of e){let r=n.querySelector(".hoj-tj-status");if(r&&(r.classList.contains("fail")||r.classList.contains("error"))){t=n;break}}if(!t)return;let o=t.querySelector(".hoj-tj-row-body");o&&(o.style.display="");try{t.scrollIntoView({behavior:"smooth",block:"center"})}catch{t.scrollIntoView()}}a(Bi,"expandFirstFailure");function oc(e){let{rows:t,currentIdx:o,reason:n,setStatus:r,total:i,pass:s}=e;for(let c=o;c<t.length;c++){let d=t[c],p=d.querySelector(".hoj-tj-status");p&&(p.classList.contains("pass")||p.classList.contains("fail")||p.classList.contains("error"))||r(d,f.t("testjudge.skipped"),"skipped")}Bi(t);let l=n==="compile-error"?"testjudge.alertCompileError":"testjudge.alertStopped",u=f.t("testjudge.alertDetail",{pass:s,total:i,done:o});v(f.t(l)+" — "+u,n==="compile-error"?"error":"warning",3500)}a(oc,"finalizeTestRun");async function nc(){let e=Kl();if(!e)return v("@testjudge.noEditor","warning");let t=(e.getValue()||"").trim();if(!t)return v("@testjudge.noCode","warning");let o=Pi(),n=Wl(),r=o?n:Cr(n),i=Jl(r),s=o;if(!o&&document.getElementById("hoj-lang-trigger"))try{let S=Yl();if(S!==r){console.log("[TestJudge] 同步语言到原生 select：",S,"→",r),Xl(r);let F=document.querySelector("#js-right-header .el-select .el-input__inner");if(F&&F.value!==r){F.value=r;try{F.dispatchEvent(new Event("input",{bubbles:!0})),F.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}}}catch(S){console.warn("[TestJudge] 同步语言失败:",S)}let l;try{l=await nt()}catch(S){return console.warn("[TestJudge] 获取题目失败:",S),v("@testjudge.noProblem","warning")}let u=l?.data?.problem||l?.data?.problems?.[0];if(!u)return v("@testjudge.noProblem","warning");let c=u.id;if(!c)return v("@testjudge.noProblem","warning");let d=mo(u.examples||"").map((S,F)=>({input:S.input,output:S.output,id:F}));if(!d.length)return v("@testjudge.noSamples","warning");let p=document.createElement("div");p.className="hoj-tj-wrap";let g=document.createElement("div");g.className="hoj-tj-summary";let h=document.createElement("div");h.className="hoj-tj-summary-text";let m=document.createElement("button");m.type="button",m.className="hoj-snippet-btn",m.textContent=f.t("testjudge.cancel"),g.append(h,m),p.appendChild(g);let b=document.createElement("div");b.className="hoj-tj-list",p.appendChild(b);let j=d.map((S,F)=>{let L=document.createElement("div");L.className="hoj-tj-row",L.dataset.idx=String(F),L.innerHTML=`
            <div class="hoj-tj-row-head">
                <span class="hoj-tj-idx">#${F+1}</span>
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
        `;let H=L.querySelectorAll(".hoj-tj-block-title");H[0].textContent=f.t("testjudge.input"),H[1].textContent=f.t("testjudge.expected"),H[2].textContent=f.t("testjudge.actual"),H[3].textContent=f.t("testjudge.stderr"),L.querySelector(".hoj-tj-row-head").addEventListener("click",()=>{let R=L.querySelector(".hoj-tj-row-body");R.style.display=R.style.display==="none"?"":"none"});let T=L.querySelectorAll(".hoj-tj-pre");return T[0].textContent=S.input??"",T[1].textContent=S.output??"",b.appendChild(L),L}),x=a((S,F,L)=>{let H=S.querySelector(".hoj-tj-status");H.textContent=F,H.className="hoj-tj-status "+(L||""),L&&/^(pass|fail|error|running|submitting|skipped)$/.test(L)?S.dataset.state=L:delete S.dataset.state},"setStatus"),y=a((S,F)=>{S.querySelector(".hoj-tj-meta").textContent=F||""},"setMeta"),C=a((S,F)=>{S.querySelectorAll(".hoj-tj-pre")[2].textContent=F??""},"setActual"),k=a((S,F)=>{let L=S.querySelector(".hoj-tj-stderr-block");if(!F){L.style.display="none";return}L.style.display="",S.querySelector(".hoj-tj-pre--err").textContent=F},"setStderr");j.forEach(S=>x(S,f.t("testjudge.submitting"),"submitting"));let A=0,w=0,P=a(()=>{h.textContent=f.t("testjudge.progress",{done:A,total:d.length})+" · "+f.t("testjudge.summary",{pass:w,total:d.length})},"updateSummary");P();let N=new AbortController,B=!1,_=!1,M=0;m.addEventListener("click",()=>{B||(B=!0,m.disabled=!0,N.abort())}),J({title:f.t("testjudge.runAll"),bodyEl:p,width:"820px",maxHeight:"85vh",fullscreen:!0,onClose:()=>N.abort()}),Er=0;try{for(let S=0;S<d.length&&(M=S,!N.signal.aborted);S++){let F=j[S],L=d[S];x(F,f.t("testjudge.runningOne"),"running");try{let H=await tc({pid:c,language:r,code:t,type:"public",userInput:L.input??"",expectedOutput:L.output??"",mode:i,isRemoteJudge:s},N),T=null,R=H?.data?.status;if(R!==void 0&&R!==5&&R!==6&&R!==7)T=H.data;else{let je=Zl(H);if(!je)throw new Error(H?.msg||"No testJudgeKey");T=await ec(je,N.signal)}let I=T?.status,U=window.JUDGE_STATUS,$=typeof U<"u"&&U[String(I)]?.name||String(I),V=Number(I)===0,te=Number(I)===-2;if(x(F,V?f.t("testjudge.pass"):f.t("testjudge.fail"),V?"pass":"fail"),y(F,`${f.t("testjudge.time")}: ${T?.time??"-"}ms · ${f.t("testjudge.memory")}: ${T?.memory??"-"}KB · `+$),C(F,T?.userOutput??""),k(F,T?.stderr||""),V&&w++,A++,P(),te){_=!0,M=S+1;break}}catch(H){if(H?.message==="ABORTED"||N.signal.aborted)break;x(F,f.t("testjudge.error"),"error"),y(F,H.message||String(H)),A++,P()}}}finally{B||_?(A=Math.max(A,M),P(),oc({rows:j,currentIdx:M,reason:_?"compile-error":"user-stop",setStatus:x,total:d.length,pass:w})):Bi(j)}}a(nc,"runAllTestJudge");function Oi(){if(document.getElementById("hoj-tj-all-btn"))return!0;let e=window.location.pathname,t=/^\/problem\/[^\/?#]+/.test(e),o=/^\/contest\/[^\/]+\/problem\/[^\/?#]+/.test(e),n=/^\/group\/[^\/]+\/problem\/[^\/?#]+/.test(e);if(!t&&!o&&!n)return!1;let r=document.querySelector(".el-drawer__body");if(!r||!r.querySelector(".el-tabs__nav.is-top"))return!1;let s=r.querySelector("#tab-2");if(!s)for(let c of r.querySelectorAll(".el-tabs__item")){let d=(c.textContent||"").trim();if(d.includes("运行自测")||d.includes("在线自测")||/run\s*test/i.test(d)){s=c;break}}if(!s)return!1;let l=document.createElement("div");l.id="hoj-tj-all-btn",l.className="el-tabs__item is-top hoj-tj-tab",l.setAttribute("role","tab"),l.setAttribute("tabindex","0"),l.style.cursor="pointer",l.innerHTML=`
        <span data-v-6e9809fa class="tj-btn el-tag el-tag--warning el-tag--plain" style="cursor:pointer;">
            <i class="el-icon-video-play"></i> <span></span>
        </span>
    `;let u=l.querySelector(".tj-btn > span");return u&&(u.textContent=f.t("testjudge.runAll")),l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),nc()}),s.insertAdjacentElement("afterend",l),console.log("[TestJudge] 已注入「全部自测」到自测抽屉 tab 栏"),!0}a(Oi,"injectRunAllTestButton");lt();ir();Yt();Mt();Lt();var an=!1;function Sr(){let e=document.querySelector("#header ul.el-menu.el-menu--horizontal, #header ul.el-menu--horizontal");if(!e)return!1;if(an){let n=document.getElementById("hoj-settings-btn");if(n&&e.contains(n))return!0;an=!1}let t=document.getElementById("hoj-settings-btn");if(t&&e.contains(t))return an=!0,!0;let o=document.createElement("li");return o.id="hoj-settings-btn",o.className="el-menu-item",o.setAttribute("role","menuitem"),o.setAttribute("tabindex","0"),o.innerHTML='<i class="el-icon-setting"></i>Better HOJ',o.style.cursor="pointer",o.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),wt();let r=We(),i=r&&r.classList.contains("open");o.classList.toggle("is-active",!!i)}),e.appendChild(o),an=!0,console.log("[OldUI] Better HOJ 设置按钮已注入"),!0}a(Sr,"injectSettingsButton");function Tr(){if(!window.location.pathname.startsWith("/new")){let i=document.getElementById("hoj-new-settings-btn");return i&&i.remove(),!1}if(document.getElementById("hoj-new-settings-btn"))return!0;let t=document.querySelector("nav[data-v-7b0404d0]")||document.querySelector("nav[data-v-9dacc850]");if(!t)return!1;let o=t.querySelector("button.gear-item");if(!o)return!1;let n=o.parentElement;if(!n)return!1;let r=document.createElement("button");return r.id="hoj-new-settings-btn",r.className=o.className,r.style.color="#86868B",r.innerHTML=`
    <span class="w-4 h-4 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82-.33l-.06-.06a2 2 0 0 1-2.83-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l-.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33-1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </span>
    <span class="truncate">Better HOJ</span>
  `,r.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),wt();let s=We(),l=s&&s.classList.contains("open");r.classList.toggle("animate-active-breath",!!l),r.style.color=l?"#007AFF":"#86868B",r.style.fontWeight=l?"bold":""}),n.appendChild(r),console.log("[NewHeader] Better HOJ 按钮已注入"),!0}a(Tr,"injectNewHeaderButton");function _r(){let e=document.querySelector(".mu-drawer");if(!e)return!1;if(e.querySelector("#hoj-mobile-settings-btn"))return!0;let t=e.querySelector("ul.mu-list");if(!t)return!1;let o=document.createElement("li");return o.id="hoj-mobile-settings-btn",o.className="hoj-mobile-menu-item",o.innerHTML=`
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
`,o.querySelector(".mu-item-wrapper").addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),Fn(),Ft()}),t.appendChild(o),console.log("[MobileMenu] Better HOJ 入口已注入"),!0}a(_r,"injectMobileMenuButton");G();rt();rt();function rc(){if(crypto?.randomUUID)return crypto.randomUUID();if(crypto?.getRandomValues){let e=new Uint8Array(16);crypto.getRandomValues(e),e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=Array.from(e,o=>o.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}a(rc,"randomUUID");function Ri(e,t){return new Promise(o=>{GM_xmlhttpRequest({method:"POST",url:`http://localhost:${t}/`,headers:{"Content-Type":"application/json"},data:JSON.stringify(e),onload:n=>o(n.status===200?{message:"发送成功",success:!0,status:200}:{message:`错误：CPH 返回状态码 ${n.status}`,success:!1,status:n.status}),onerror:()=>o({message:`连接失败
请确认 CPH 插件已启动，且端口为 ${t}`,success:!1,status:502}),ontimeout:()=>o({message:"连接超时，请检查插件状态",success:!1,status:504})})})}a(Ri,"sendToCPH");function ac(e){let t=e.match(/^CF-(\d+)([A-Z])$/i);if(t){let o=t[1],n=t[2];return`https://codeforces.com/problemset/problem/${o}/${n}`}return window.location.href}a(ac,"getProblemUrlForCPH");function qi(e,t){let o=e?.data?.problem||e?.data?.problems?.[0];if(!o)return null;let n=mo(o.examples||"");if(!n.length)return null;let i=me()?.problemId||o.problemId||"",s=window.location.href;return t.realCPHurl&&(s=ac(i)),{name:`HOJ - ${i}`,url:s,memoryLimit:o.memoryLimit||0,timeLimit:o.timeLimit||0,group:"HOJ",tests:n.map((l,u)=>({input:l.input,output:l.output,id:u})),testType:"single",input:{type:"stdin"},output:{type:"stdout"},languages:{java:{mainClass:"Main",taskClass:""}},batch:{id:rc(),size:1}}}a(qi,"buildCPHData");Ht();lt();ke();var $i="custom-copy-btn",Zt=null,zi=null,sn=null,Lr=null;function ic(e){let t=[];if(!e)return t;let o=e.match(/^CF-(\d+)(.+)$/i);if(o){let n=o[1],r=o[2];return t.push({name:"Codeforces",id:"hoj-jump-cf",url:`https://codeforces.com/problemset/problem/${n}/${r}`}),t.push({name:"洛谷",id:"hoj-jump-lg-cf",url:`https://www.luogu.com.cn/problem/CF${n}${r}`}),t}if(o=e.match(/^AC-(abc|arc|agc)(\d+)_(.+)$/i),o){let n=o[1].toLowerCase(),r=o[2],i=o[3],s=`${n}${r}`;return t.push({name:"AtCoder",id:"hoj-jump-atcoder",url:`https://atcoder.jp/contests/${s}/tasks/${s}_${i}`}),t.push({name:"洛谷",id:"hoj-jump-lg-atcoder",url:`https://www.luogu.com.cn/problem/AT_${s}_${i}`}),t}return o=e.match(/^LIBRE-(\d+)$/i),o&&t.push({name:"LibreOJ",id:"hoj-jump-libreoj",url:`https://loj.ac/p/${o[1]}`}),t}a(ic,"getJumpUrls");function sc(){if(document.getElementById("import-to-cph-btn"))return;let e=document.querySelector(".question-intr");if(!e)return;let t=document.createElement("button");t.id="import-to-cph-btn",t.className="el-button el-button--primary is-plain bhoj-mini-button",t.textContent="导入到 CPH",t.style.cssText="padding:5px 10px;margin-left:8px;cursor:pointer;",t.addEventListener("click",async()=>{if(!Zt)return v("题目信息尚未加载","warning");let o=await Ri(Zt,27121);v(o.success?"题目已成功导入到 CPH！":"导入失败："+o.message,o.success?"success":"error")}),e.appendChild(t)}a(sc,"addImportButton");function lc(){let e=document.getElementById("import-to-cph-btn");e&&e.remove()}a(lc,"removeImportButton");function cc(){if(document.getElementById("download-testcase-btn"))return;let e=document.querySelector(".question-intr");if(!e)return;let t=document.createElement("button");t.id="download-testcase-btn",t.className="el-button el-button--primary is-plain bhoj-mini-button",t.textContent="下载数据",t.style.cssText="padding:5px 10px;margin-left:8px;cursor:pointer;",t.addEventListener("click",async()=>{let n=me()?.problemId||"";if(!n)return v("题目 ID 尚未获取","warning");let r=localStorage.getItem("token")||"";try{let i=await fetch(`${window.location.origin}/api/file/download-testcase?pid=${encodeURIComponent(n)}`,{headers:{Authorization:r},credentials:"include"});if(i.status===200){let s=await i.blob(),l=URL.createObjectURL(s),u=document.createElement("a");u.href=l,u.download=`${n}-testcase.zip`,document.body.appendChild(u),u.click(),document.body.removeChild(u),URL.revokeObjectURL(l)}else v(`下载失败，状态码：${i.status}`,"error")}catch{v("下载请求出错","error")}}),e.appendChild(t)}a(cc,"addDownloadButton");function dc(){let e=document.getElementById("download-testcase-btn");e&&e.remove()}a(dc,"removeDownloadButton");function uc(){["hoj-jump-cf","hoj-jump-lg-cf","hoj-jump-atcoder","hoj-jump-lg-atcoder","hoj-jump-libreoj"].forEach(e=>{let t=document.getElementById(e);t&&t.remove()})}a(uc,"clearJumpButtons");function pc(){if(!sn)return;let e=document.querySelector(".question-intr");if(!e)return;let t=ic(sn);t.length&&t.forEach(({name:o,id:n,url:r})=>{if(document.getElementById(n))return;let i=document.createElement("button");i.id=n,i.type="button",i.className="el-button el-button--primary is-plain bhoj-mini-button",i.textContent=o,i.style.cssText="padding:5px 10px;margin-left:8px;cursor:pointer;",i.addEventListener("click",()=>window.open(r,"_blank")),e.appendChild(i)})}a(pc,"addJumpButtons");function hc(e){let t=e?.data?.problem||e?.data?.problems?.[0];if(!t)return;let o=[["题目描述","description"],["输入描述","input"],["输出描述","output"],["提示","hint"]];document.querySelectorAll(".question-intr p.title, #problem-content p.title").forEach(n=>{let r=n.textContent.trim(),i=o.find(([l])=>l===r);if(!i)return;let s=n.querySelector(`.${$i}`);s||(s=document.createElement("a"),s.className=`copy ${$i}`,s.style.cssText="cursor:pointer;margin-left:8px;",s.title="复制内容",s.innerHTML='<i class="el-icon-document-copy"></i>',s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),mc(t[i[1]]||"").then(()=>{s.style.color="#67C23A",setTimeout(()=>s.style.color="",1e3)})}),n.appendChild(s))})}a(hc,"addCopyButtons");async function mc(e){return v("复制成功","success"),co(e)}a(mc,"copyText");async function Gi(e){let t=me();if(!t)return;console.log(t);let o=t.type==="contest"?`contest:${t.cid}/${t.displayId}`:`problem:${t.problemId}`;if(Lr!==o){Lr=o,uc(),lc(),dc(),Zt=null,zi=null,sn=null;try{let n=await nt();console.log("[SmartHOJ] autoFetchProblemInfo 结果:",n);let r=n?.data?.problem||n?.data?.problems?.[0]||null;r?.id&&(zi=r.id),r?.problemId&&(sn=r.problemId);let i=qi(n,e);i&&(Zt=i);let s=!!t.gid;Fr={hasCPH:!!i,hasDownload:s,copyData:n};let l=a(()=>{Lr===o&&gc()},"inject");qt(".question-intr",l,15e3),bc(l)}catch(n){console.error("[SmartHOJ] 自动获取题目失败:",n)}}}a(Gi,"autoFetchProblemInfo");var Fr=null,Ke=null;function gc(){let e=Fr;return!e||!document.querySelector(".question-intr")?!1:(e.hasCPH&&Zt&&sc(),e.hasDownload&&cc(),e.copyData&&hc(e.copyData),pc(),Dn(),!0)}a(gc,"injectProblemButtons");function bc(e){Ke&&Ke.disconnect();let t=null,o=!1;Ke=new MutationObserver(()=>{o||t||(t=window.setTimeout(()=>{if(t=null,!!document.querySelector(".question-intr")){o=!0;try{e()}finally{window.setTimeout(()=>{o=!1},0)}}},50))}),Ke.observe(document.body,{childList:!0,subtree:!0})}a(bc,"watchProblemContainer");function Ui(){Ke&&(Ke.disconnect(),Ke=null),Fr=null}a(Ui,"stopProblemButtonWatch");G();var dn=10*1e3,ln=0,ue=null,cn=0,pe=null,Vi=null;function Mr(){let e=window.location.pathname;return/^\/discussion-detail\/[^\/?#]+/.test(e)||/^\/group\/[^\/]+\/discussion-detail\/[^\/?#]+/.test(e)}a(Mr,"isDiscussionDetailPage");function fc(){let e=window.location.pathname,t=e.match(/^\/discussion-detail\/([^\/?#]+)/);return t?decodeURIComponent(t[1]):(t=e.match(/^\/group\/[^\/]+\/discussion-detail\/([^\/?#]+)/),t?decodeURIComponent(t[1]):null)}a(fc,"getDiscussionIdFromUrl");function Nr(){return/^\/new\/discussion\/[^\/?#]+/.test(window.location.pathname)}a(Nr,"isNewDiscussionPage");function vc(){let e=window.location.pathname.match(/^\/new\/discussion\/([^\/?#]+)/);return e?decodeURIComponent(e[1]):null}a(vc,"getNewDiscussionId");async function Ji(e,t){try{let o=localStorage.getItem("token")||"",n=`${window.location.origin}/api/discussion-like?did=${encodeURIComponent(e)}&toLike=${t?"true":"false"}`,r=await fetch(n,{method:"GET",headers:{Authorization:o,"Content-Type":"application/json"},credentials:"include"}),i=null;try{i=await r.json()}catch{i=null}let s=i&&typeof i.status<"u"?i.status:200;return r.ok&&s===200?{ok:!0,reason:""}:{ok:!1,reason:i&&(i.msg||i.message||i.error)||(r.status===401||s===401?"请先登录后再操作":"")||(r.status===403||s===403?"没有权限执行此操作":"")||(r.status===429||s===429?"操作过于频繁，请稍后再试":"")||(r.status>=500?"服务器错误，请稍后再试":"")||(t?"点赞失败":"取消失败")}}catch(o){return console.error("[DiscussionLike] 请求失败:",o),{ok:!1,reason:"网络错误，请稍后重试"}}}a(Ji,"requestLike");function Wi(){if(!Mr())return!1;let e=fc();if(!e)return!1;if(document.getElementById("hoj-like-box"))return!0;let t=document.querySelector("a.like[data-v-13564ee3], a.like");if(!t)return!1;let o=t.parentElement;if(!o)return!1;o.querySelectorAll("a.like").forEach(h=>{h.style.display="none"});let n=document.createElement("div");n.id="hoj-like-box",n.className="hoj-like-box",n.innerHTML=`
        <button type="button" class="hoj-like-btn hoj-like-btn--like">
            <i class="fa fa-thumbs-o-up"></i><span>点赞</span>
        </button>
        <button type="button" class="hoj-like-btn hoj-like-btn--unlike">
            <i class="fa fa-thumbs-down"></i><span>取消点赞</span>
        </button>
        <span class="hoj-like-cooldown" aria-live="polite"></span>
        <span class="hoj-like-progress"><span class="hoj-like-progress-inner"></span></span>
    `;let r=o.querySelector("a.like");r&&r.parentNode===o?o.insertBefore(n,r):o.appendChild(n);let i=n.querySelector(".hoj-like-btn--like"),s=n.querySelector(".hoj-like-btn--unlike"),l=n.querySelector(".hoj-like-cooldown"),u=n.querySelector(".hoj-like-progress-inner"),c=a(h=>{i.disabled=h,s.disabled=h},"setButtonsDisabled"),d=a(()=>{ln=0,ue&&(cancelAnimationFrame(ue),ue=null),n.classList.remove("is-cooldown"),c(!1),l.textContent="",u.style.width="100%"},"endCooldown"),p=a(()=>{ln=Date.now()+dn,n.classList.add("is-cooldown"),c(!0),u.style.transition="none",u.style.width="100%",u.offsetHeight,u.style.transition=`width ${dn}ms linear`,requestAnimationFrame(()=>{u.style.width="0%"});let h=a(()=>{let m=ln-Date.now();if(m<=0){d();return}l.textContent=Math.ceil(m/1e3)+"s",ue=requestAnimationFrame(h)},"tick");ue&&cancelAnimationFrame(ue),ue=requestAnimationFrame(h)},"startCooldown"),g=a(async h=>{if(n.classList.contains("is-cooldown"))return;p();let m=await Ji(e,h);if(m.ok){v(h?"点赞成功":"已取消点赞","success",1500);return}d(),v(m.reason,"error",2500)},"sendLike");return i.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),g(!0)}),s.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),g(!1)}),console.log("[DiscussionLike] 已接管点赞按钮 did="+e),!0}a(Wi,"injectDiscussionLikeButtons");function Ki(){ue&&(cancelAnimationFrame(ue),ue=null),ln=0;let e=document.getElementById("hoj-like-box");e&&e.remove()}a(Ki,"cleanupDiscussionLikeButtons");function Yi(){if(!Nr())return!1;let e=vc();if(!e)return!1;if(document.getElementById("hoj-new-like-box"))return!0;let t=document.querySelectorAll("button[data-v-cf7f5c93], button"),o=null;for(let h of Array.from(t)){let m=h.querySelector("span");if(!m)continue;let b=(m.textContent||"").trim();if(/^点赞(\s|$|\d)/.test(b)){o=h;break}}if(!o)return!1;let n=o.parentElement;if(!n)return!1;n.querySelectorAll("button").forEach(h=>{let m=h.querySelector("span");m&&/^点赞(\s|$|\d)/.test((m.textContent||"").trim())&&(h.style.display="none")});let r=document.createElement("div");r.id="hoj-new-like-box",r.className="hoj-new-like-box",r.innerHTML=`
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
    `;let i=Array.from(n.querySelectorAll("button")).find(h=>h.style.display==="none");i&&i.parentNode===n?n.insertBefore(r,i):n.appendChild(r);let s=r.querySelector(".hoj-new-like-btn--like"),l=r.querySelector(".hoj-new-like-btn--unlike"),u=r.querySelector(".hoj-new-like-cd"),c=r.querySelector(".hoj-new-like-bar-inner"),d=a(()=>{cn=0,pe&&(cancelAnimationFrame(pe),pe=null),r.classList.remove("is-cooldown"),s.disabled=!1,l.disabled=!1,u.textContent="",c.style.width="100%"},"endCooldown"),p=a(()=>{cn=Date.now()+dn,Vi=r,r.classList.add("is-cooldown"),s.disabled=!0,l.disabled=!0,c.style.transition="none",c.style.width="100%",c.offsetHeight,c.style.transition=`width ${dn}ms linear`,requestAnimationFrame(()=>{c.style.width="0%"});let h=a(()=>{let m=cn-Date.now();if(m<=0){d();return}u.textContent=Math.ceil(m/1e3)+"s",pe=requestAnimationFrame(h)},"tick");pe&&cancelAnimationFrame(pe),pe=requestAnimationFrame(h)},"startCooldown"),g=a(async h=>{if(r.classList.contains("is-cooldown"))return;p();let m=await Ji(e,h);if(m.ok){v(h?"点赞成功":"已取消点赞","success",1500);return}d(),v(m.reason,"error",2500)},"sendLike");return s.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),g(!0)}),l.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),g(!1)}),console.log("[DiscussionLike/new] 已接管 did="+e),!0}a(Yi,"injectNewDiscussionLikeButtons");function Xi(){pe&&(cancelAnimationFrame(pe),pe=null),cn=0,Vi=null;let e=document.getElementById("hoj-new-like-box");e&&e.remove()}a(Xi,"cleanupNewDiscussionLikeButtons");G();K();var Qt=null,Dr=!1,yc=/\/api\/(?:group\/)?get-discussion-list(?:\?|#|$)/,jc=["keyword","cid","currentPage","limit","pid","onlyMine","gid"];function Zi(e){return typeof e=="string"&&yc.test(e)}a(Zi,"_isDiscussionListUrl");function xc(e){try{let t=new URL(e,window.location.origin),o={};return t.searchParams.forEach((n,r)=>{o[r]=n}),o}catch{return{}}}a(xc,"_paramsFromUrl");function kc(e,t){for(let o of jc)if(String(e?.[o]??"")!==String(t?.[o]??""))return!1;return!0}a(kc,"_discListParamsMatch");function Hr(e,t,o){!t||typeof t!="object"||(Qt={params:xc(e),data:t,ts:Date.now(),source:o},console.log("[DiscussionList] 缓存响应",Qt.params,"←",o))}a(Hr,"_recordDiscussionList");function un(){if(!un._done){un._done=!0;try{let e=window.fetch;window.fetch=function(t,o){let n=typeof t=="string"?t:t&&t.url||"",r=e.call(this,t,o);return Zi(n)&&r.then(i=>{try{i.clone().json().then(s=>Hr(n,s,"page-fetch")).catch(()=>{})}catch{}}).catch(()=>{}),r}}catch(e){console.warn("[DiscussionList] hook fetch 失败:",e)}try{let e=window.XMLHttpRequest;if(e&&e.prototype){let t=e.prototype.open,o=e.prototype.send;e.prototype.open=function(n,r,...i){return this._hojDiscUrl=r,t.call(this,n,r,...i)},e.prototype.send=function(n){return Zi(this._hojDiscUrl)&&this.addEventListener("load",()=>{try{let r=JSON.parse(this.responseText);Hr(this._hojDiscUrl,r,"page-xhr")}catch{}},{once:!0}),o.call(this,n)}}}catch(e){console.warn("[DiscussionList] hook XHR 失败:",e)}console.log("[DiscussionList] 响应监听已挂载")}}a(un,"hookDiscussionListResponses");async function Qi(e){if(!e.VditorDiscussionEdit)return!1;let t=window.location.pathname,o=null;if(/^\/discussion\/?$/.test(t))o=null;else{let h=t.match(/^\/group\/([^\/]+)\/discussion\/?$/);if(!h)return!1;o=h[1]}let n=[...document.querySelectorAll(".title-article > .el-card.list-card")];if(!n.length)return!1;if(n.every(h=>h.querySelector(".hoj-list-edit-btn")&&h.querySelector(".hoj-list-del-btn")&&[...h.querySelectorAll(".title-msg .el-dropdown")].filter(m=>m.querySelector(".el-icon-more")).every(m=>m.classList.contains("hoj-dropdown-replaced"))))return!0;let i=new URLSearchParams(window.location.search),s={keyword:i.get("keyword")??"",cid:i.get("cid")??"",currentPage:i.get("currentPage")??"1",limit:i.get("limit")??"10",pid:i.get("pid")??"",onlyMine:i.get("onlyMine")??"false"};o!==null&&(s.gid=o);let l=null;if(Qt&&kc(Qt.params,s))l=Qt.data?.data;else{if(Dr)return!1;Dr=!0;try{let h=new URLSearchParams(s).toString(),m=o!==null?`/api/group/get-discussion-list?${h}`:`/api/get-discussion-list?${h}`,b=await ae(m,{silent:!0});Hr(`${window.location.origin}${m}`,{status:200,data:b,msg:"success"},"self"),l=b}catch(h){console.warn("[DiscussionList] 主动请求失败:",h)}finally{Dr=!1}}let u=Array.isArray(l?.records)?l.records:[];if(!u.length)return!1;let c=a(h=>{let m=h.querySelector(".article-hlink > a"),b=h.querySelector(".article-hlink2 > p"),j=h.querySelector(".title-msg .pl");return{title:m?(m.textContent||"").trim():"",description:b?(b.textContent||"").trim():"",author:j?(j.textContent||"").trim():""}},"cardInfo"),d=new Set,p=[];for(let h of u)for(let m of n){if(d.has(m))continue;let b=c(m);if(b.title===(h.title||"")&&b.description===(h.description||"")&&b.author===(h.author||"")){d.add(m),p.push({record:h,card:m});break}}if(!p.length)return!1;let g=0;for(let{record:h,card:m}of p){if(h.content===null||h.content===void 0)continue;let b=m.querySelector(".title-msg");if(!b)continue;if(!m.querySelector(".hoj-list-edit-btn")){let x=document.createElement("a");x.className="hoj-list-edit-btn",x.setAttribute("href","javascript:void(0)"),x.innerHTML='<i class="el-icon-edit-outline"></i><span></span>';let y=x.querySelector("span");y&&(y.textContent=f.t("discussion.edit")),x.title=f.t("discussion.edit"),x.dataset.did=String(h.id),x.addEventListener("click",C=>{C.preventDefault(),C.stopPropagation(),wc({did:h.id,gid:o??void 0})}),b.appendChild(x)}if(m.querySelectorAll(".title-msg .el-dropdown").forEach(x=>{x.querySelector(".el-icon-more")&&x.classList.add("hoj-dropdown-replaced")}),!m.querySelector(`.hoj-list-del-btn[data-did="${h.id}"]`)){let x=document.createElement("a");x.className="hoj-list-del-btn",x.setAttribute("href","javascript:void(0)"),x.dataset.did=String(h.id),x.innerHTML='<i class="el-icon-delete"></i><span></span>';let y=x.querySelector("span");y&&(y.textContent=f.t("discussion.delete")),x.title=f.t("discussion.delete"),x.addEventListener("click",async k=>{if(k.preventDefault(),k.stopPropagation(),!await ie({title:"@discussion.deleteConfirmTitle",content:"@discussion.deleteConfirmBody",type:"warning"}))return;let w=new URLSearchParams({did:String(h.id)});o!==null&&w.set("gid",o);let P=o?`/api/group/discussion?${w.toString()}`:`/api/discussion?${w.toString()}`;try{await ae(P,{method:"DELETE"}),v("@discussion.deleteSuccess","success",1800);let N=x.closest(".title-article");N&&(N.style.transition="opacity .25s",N.style.opacity="0",setTimeout(()=>N.remove(),260))}catch(N){console.warn("[Discussion List] 删除失败:",N)}});let C=m.querySelector(".title-msg .el-dropdown.hidden-xs-only")||m.querySelector(".title-msg .el-dropdown")||m.querySelector(".title-msg");C&&C.parentNode&&C.insertAdjacentElement("beforebegin",x)}g++}return console.log(`[Discussion List] ${o?`group=${o} `:""}匹配 ${p.length} 张卡片，注入 ${g} 处按钮`),g>0}a(Qi,"injectDiscussionListEditButtons");function es(){document.querySelectorAll(".hoj-list-edit-btn, .hoj-list-del-btn").forEach(e=>e.remove()),document.querySelectorAll("[data-hoj-disc-intercepted]").forEach(e=>{delete e.dataset.hojDiscIntercepted})}a(es,"clearDiscussionListButtons");var Ir=null;function ts(e){Ir=e}a(ts,"setDiscussionEditorOpener");function wc(e){Ir?Ir(e):console.warn("[DiscussionList] 编辑对话框未注册")}a(wc,"openDiscussionEditor");G();K();rt();Oo();var Ar=!1,Pr="",eo=null;function os(e){if(eo===e)return;eo=e,console.log("[SubmitOverride] 容器未就绪，等待渲染…");let t=Date.now(),o=a(()=>!!document.querySelector("#js-right-header .el-select")||[...document.querySelectorAll("button")].some(i=>{let s=(i.textContent||"").trim();return s==="提交评测"||/^submit$/i.test(s)}),"ready"),n=a(()=>{if(eo===e&&(eo=null),window.location.href!==e)return;let i=!!document.querySelector("#js-right-header .el-select"),s=[...document.querySelectorAll("button")].some(l=>{let u=(l.textContent||"").trim();return u==="提交评测"||/^submit$/i.test(u)});i&&s?Br():os(e)},"finish"),r=new MutationObserver(()=>{if(!o()){Date.now()-t>15e3&&r.disconnect();return}r.disconnect(),n()});r.observe(document.body,{childList:!0,subtree:!0})}a(os,"_scheduleSubmitOverrideRetry");var Ec=/\/api\/submit-problem-test-judge(?:\?|#|$)/;function Cc(){let e=window.location.pathname,t=e.match(/^\/contest\/([^\/]+)\/problem\/([^\/?#]+)/);if(t){let o=Number(t[1]);return{cid:Number.isNaN(o)?t[1]:o,tid:null,displayPid:decodeURIComponent(t[2])}}if(t=e.match(/^\/training\/([^\/]+)\/problem\/([^\/?#]+)/),t){let o=Number(t[1]);return{cid:0,tid:Number.isNaN(o)?t[1]:o,displayPid:decodeURIComponent(t[2])}}return t=e.match(/^\/group\/([^\/]+)\/problem\/([^\/?#]+)/),t?{cid:0,tid:null,gid:t[1],displayPid:decodeURIComponent(t[2])}:(t=e.match(/^\/problem\/([^\/?#]+)/),t?{cid:0,tid:null,displayPid:decodeURIComponent(t[1])}:null)}a(Cc,"parseProblemSubmitContext");function Sc(){let e=document.querySelector(".CodeMirror");if(e&&e.CodeMirror)return e.CodeMirror;let o=(typeof unsafeWindow<"u"?unsafeWindow:window).CodeMirror;return o&&o.editors&&o.editors.length?o.editors[0]:null}a(Sc,"_findCodeMirror");async function Br(){let e=Cc();if(!e)return!1;let{cid:t,tid:o,gid:n,displayPid:r}=e,i=window.location.href;if(Pr===i)return!0;if(Ar)return!1;Ar=!0;try{let s;try{let g=await nt(),h=g?.data?.problem||g?.data?.problems?.[0];if(!h)return!1;s={isRemote:!!h.isRemote,problemId:String(h.problemId||r)}}catch(g){return console.warn("[SubmitOverride] 获取详情失败:",g),!1}let l=s.isRemote&&/^CF-/i.test(s.problemId);if(ri(l),s.isRemote&&!l)return Pr=i,console.log("[SubmitOverride] isRemote=true 且非 CF 题，跳过注入"),!1;let u=l?Za:Xa,c=document.querySelector("#js-right-header .el-select"),p=a(()=>[...document.querySelectorAll("button")].find(g=>{let h=(g.textContent||"").trim();return h==="提交评测"||/^submit$/i.test(h)}),"findSubmitBtn")();if(!c||!p)return os(i),!1;if(!document.getElementById("hoj-lang-trigger")){c.style.display="none",l?ye()||(oi(Bo()||Ne),rr(ye())):ve()||(ti(bt()||Me),nr(ve()));let g=document.createElement("button");g.id="hoj-lang-trigger",g.type="button",g.className="el-button el-button--default el-button--small",g.dataset.mode=l?"cf":"hoj",g.innerHTML='<i class="el-icon-arrow-down"></i><span class="hoj-lang-trigger__label"></span>';let h=g.querySelector(".hoj-lang-trigger__label");h&&(h.textContent=l?ye()||Ne:ve()||Me),g.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),ei(u,l)}),c.parentElement?.appendChild(g)}return p.dataset.hojSubmitOverridden!=="1"&&(p.dataset.hojSubmitOverridden="1",p.addEventListener("click",async g=>{g.preventDefault(),g.stopPropagation(),g.stopImmediatePropagation();let h=(Sc()||{getValue:()=>""}).getValue().trim();if(!h)return v("@submit.noCode","warning");let m=l?ye()||Ne:ve()||Me,b=p.innerHTML;p.disabled=!0,p.innerHTML='<i class="el-icon-loading"></i><span> '+f.t("submit.submitting")+"</span>";try{let j=await ae("/api/submit-problem-judge",{method:"POST",body:{pid:r,language:m,code:h,cid:t,tid:o,gid:n,isRemote:l}});v("@submit.success","success",1500);let x=null;typeof j=="string"?x=j:j&&typeof j=="object"&&(x=j.submitId||j.id||j.data&&(j.data.submitId||j.data.id)||null),setTimeout(()=>{x?window.location.href=`/submission-detail/${x}`:window.location.href="/status"},800)}catch(j){console.warn("[SubmitOverride] 提交失败:",j),v(f.t("submit.failed",{msg:j?.message||String(j)}),"error"),p.disabled=!1,p.innerHTML=b}},!0)),eo=null,Pr=i,console.log(`[SubmitOverride] 已接管 ${r}（${l?"CF 远程":"普通"}，cid=${t}, tid=${o}，语言=${l?ye():ve()}）`),!0}finally{Ar=!1}}a(Br,"injectProblemSubmitOverride");function pn(){if(!pn._done){pn._done=!0;try{let e=window.fetch;window.fetch=function(t,o){let n=typeof t=="string"?t:t&&t.url||"";if(Ec.test(n)){let r=Tc(),i=ni()?ye()||Ne:ve()||Me;if(o&&typeof o.body=="string")try{let s=JSON.parse(o.body);s.language=i,o={...o,body:JSON.stringify(s)}}catch{}}return e.call(this,t,o)}}catch(e){console.warn("[TestJudgeLang] hook fetch 失败:",e)}console.log("[TestJudgeLang] 语言拦截已挂载")}}a(pn,"hookTestJudgeLanguage");function Tc(){let e=document.querySelector("#js-right-header .el-select .el-select-dropdown__item.selected");if(e)return(e.textContent||"").trim();let t=document.querySelector("#js-right-header .el-select .el-input__inner");return t&&t.value?t.value.trim():null}a(Tc,"_hojReadNativeLang");G();K();async function _c(){try{let e=localStorage.getItem("userInfo");if(e){let t=typeof e=="string"?JSON.parse(e):e;if(t&&t.username)return t.username}}catch{}try{let e=localStorage.getItem("token")||"",o=await(await fetch(`${window.location.origin}/api/get-user-home-info`,{method:"GET",headers:{Authorization:e,"Content-Type":"application/json"},credentials:"include"})).json();if(o?.status===200&&o?.data?.username)return o.data.username}catch{}return null}a(_c,"getCurrentUsername");async function ns(){if(!/^\/status(\/|$)/.test(window.location.pathname)&&!/^\/group\/[^\/]+\/status(\/|$)/.test(window.location.pathname))return!1;let e=[...document.querySelectorAll(".vxe-table")],t=null;for(let p of e){let g=[...p.querySelectorAll("thead th .vxe-cell--title")].map(j=>(j.textContent||"").trim()),h=g.some(j=>/^(Run\s*ID|运行\s*ID)$/i.test(j)),m=g.some(j=>/^(Status|状态)$/i.test(j)),b=g.some(j=>/^(Author|作者)$/i.test(j));if(h&&m&&b){t=p;break}}if(!t)return!1;let o=[...t.querySelectorAll("thead th")],n=a(p=>o.findIndex(g=>{let h=g.querySelector(".vxe-cell--title");if(!h)return!1;let m=(h.textContent||"").trim();return p.some(b=>b.test(m))}),"matchBy"),r=n([/^(Run\s*ID|运行\s*ID)$/i,/^ID$/i]),i=n([/^(Status|状态)$/i]),s=n([/^(Author|作者)$/i]);if(r<0||i<0||s<0)return console.warn("[Resubmit] 无法识别列索引:",{idIdx:r,statusIdx:i,authorIdx:s}),!1;let l=await _c();if(!l)return!1;let u=String(l).trim(),c=t.querySelector("tbody");if(!c)return!1;let d=0;return c.querySelectorAll("tr.vxe-body--row").forEach(p=>{let g=p.querySelectorAll("td.vxe-body--column");if(g.length<=Math.max(r,i,s))return;let h=g[r],m=g[i],b=g[s],j=((h.querySelector(".vxe-cell--label")||h).textContent||"").trim();if(!j)return;let x=(m.textContent||"").replace(/\s+/g," ").trim();if(!/Submitted\s*Failed/i.test(x)||((b.querySelector("a")||b).textContent||"").trim()!==u)return;let C=m.querySelector(".el-tag");if(!C||C.querySelector("i.el-icon-refresh:not([data-hoj-resubmit])")||C.querySelector("[data-hoj-resubmit]"))return;let k=document.createElement("i");k.setAttribute("data-hoj-resubmit",j),k.className="el-icon-refresh",k.title=f.t("resubmit.tooltip"),k.style.cursor="pointer",k.style.marginRight="4px",k.addEventListener("click",async A=>{if(A.preventDefault(),A.stopPropagation(),A.stopImmediatePropagation(),k.dataset.loading==="1")return;k.dataset.loading="1";let w=k.className;k.className="el-icon-loading";try{await ae(`/api/resubmit?submitId=${encodeURIComponent(j)}`,{silent:!0}),v("@resubmit.success","success",1500);let P=document.querySelector(".hidden-xs-only button .el-icon-refresh")?.closest("button")||document.querySelector(".hidden-sm-and-up button .el-icon-refresh")?.closest("button");P?P.click():setTimeout(()=>location.reload(),500)}catch(P){v(f.t("resubmit.failed",{msg:P?.message||String(P)}),"error"),k.className=w}finally{k.dataset.loading="0"}}),C.insertBefore(k,C.firstChild),d++}),d&&console.log(`[Resubmit] 已注入 ${d} 个重测图标`),d>0}a(ns,"injectResubmitButtons");G();ke();lt();function rs(e){let t=typeof unsafeWindow<"u"?unsafeWindow:null;return t&&t[e]?t[e]:window[e]}a(rs,"_pageGlobal");function as(e){if(!e)return"";let t=String(e).toLowerCase().trim();t=t.replace(/\s*with\s*o2\b/g,"").replace(/\s*\bo2\b/g,"").replace(/\s*\d+(\.\d+)*\s*$/g,"").replace(/[_\-]+/g,"").replace(/\s+/g,"");let o={c:"c",cpp:"cpp","c++":"cpp",cxx:"cpp",cc:"cpp","gnug++":"cpp","gnuc++":"cpp",gnugcc:"cpp",gcc:"cpp","c++20":"cpp","c++17":"cpp","c++14":"cpp","c++11":"cpp",python:"python",python3:"python",python2:"python",py3:"python",py2:"python",pypy:"python",pypy3:"python",pypy2:"python",java:"java",java18:"java",javajdk:"java",javascript:"javascript",js:"javascript",javascriptnode:"javascript",javascriptv8:"javascript",node:"javascript",nodejs:"javascript",go:"go",golang:"go",rust:"rust",rs:"rust","c#":"csharp",csharp:"csharp",kotlin:"kotlin",swift:"swift",php:"php",ruby:"ruby",perl:"perl",lua:"lua",r:"r",scala:"scala",pascal:"pascal",delphi:"pascal",bash:"bash",shell:"bash",sh:"bash",sql:"sql",json:"json",xml:"xml",html:"xml",css:"css",markdown:"markdown",md:"markdown",plaintext:"plaintext",text:"plaintext"};return o[t]?o[t]:t.includes("python")||t.includes("pypy")?"python":t.includes("c++")||t.includes("cpp")||t.includes("g++")?"cpp":t.includes("java")&&!t.includes("javascript")?"java":t.includes("javascript")||t.includes("node")?"javascript":t.includes("golang")||t==="go"?"go":t.includes("rust")?"rust":t.includes("csharp")||t.includes("c#")?"csharp":""}a(as,"mapToHljsLang");function Lc(e,t){let o=document.createElement("div");o.className="el-col el-col-24",o.style.marginTop="13px";let n=document.createElement("div");n.className="markdown-body submission-detail";let r=document.createElement("pre");r.style.borderLeft="3px solid rgb(25, 190, 107)";let i=document.createElement("code");i.textContent=e;let s=as(t);s?i.className=`hljs language-${s}`:i.className="hljs";let l=rs("hljs");try{if(typeof l<"u")if(s&&l.getLanguage(s))i.innerHTML=l.highlight(e,{language:s,ignoreIllegals:!0}).value;else{let c=l.highlightAuto(e);i.innerHTML=c.value,c.language&&i.classList.add(`language-${c.language}`)}}catch(c){console.warn("[CodeBlock] hljs 高亮失败:",c),i.textContent=e}let u=document.createElement("i");return u.title="copy",u.className="el-icon-document-copy code-copy",u.textContent=" COPY",u.style.cursor="pointer",u.addEventListener("click",()=>co(e)),r.append(i,u),n.appendChild(r),o.appendChild(n),o}a(Lc,"buildCodeBlockHtml");function Fc(e){return new Promise(t=>{GM_xmlhttpRequest({method:"GET",url:`https://hojcode.rkcd.me/${e}`,onload:o=>{if(o.status===200)try{t(JSON.parse(o.responseText)?.data||null)}catch{t(null)}else t(null)},onerror:()=>t(null)})})}a(Fc,"fetchRemoteSubmissionData");function Mc(){let e=document.querySelector(".el-row.is-justify-space-around.el-row--flex");if(e)return e;let t=document.querySelectorAll(".el-col.el-col-24");return t.length?t[t.length-1].parentElement||t[t.length-1]:null}a(Mc,"findInjectionTarget");var hn=null;function Nc(){let e=window.location.href;hn!==e&&(hn=e,console.log("[CodeViewer] #status 未就绪，等待渲染…"),qt("#status",()=>{hn===e&&(hn=null),window.location.href===e&&Rr()},15e3))}a(Nc,"_scheduleCodeButtonRetry");async function Rr(){let e=window.location.pathname.match(/\/submission-detail\/([^\/?#]+)/);if(!e)return;let t=e[1];if(document.getElementById("hoj-show-code-btn"))return;let o=document.getElementById("status");if(!o){Nc();return}if(document.querySelector(".markdown-body.submission-detail"))return;let r=document.createElement("button");r.id="hoj-show-code-btn",r.type="button",r.className="el-button el-button--primary is-plain bhoj-mini-button",r.textContent="查看代码",r.style.cssText="margin-left:10px;padding:4px 10px;cursor:pointer;vertical-align:middle;";let i;r.addEventListener("click",u=>{if(u.preventDefault(),u.stopPropagation(),!i?.code){v("远程无代码","error");return}Dc(i.code,i.language||null),r.style.cssText="margin-left:10px;padding:4px 10px;cursor:pointer;vertical-align:middle;display:none;",v("代码获取成功","success")}),(o.querySelector(".el-alert__content")||o).appendChild(r),i=await Fc(t)}a(Rr,"injectCodeButtonIntoStatus");function Dc(e,t){let o=Mc();if(!o)return;document.querySelectorAll(".markdown-body.submission-detail").forEach(r=>{if(!o.contains(r)){let i=r.closest(".el-col.el-col-24");i&&i.querySelector(".markdown-body.submission-detail")?i.remove():r.remove()}});let n=o.querySelector(".markdown-body.submission-detail");if(n){let r=n.querySelector("pre code");if(r){let i=as(t);r.className="hljs"+(i?` language-${i}`:"");let s=rs("hljs");try{if(typeof s<"u"&&i&&s.getLanguage(i))r.innerHTML=s.highlight(e,{language:i,ignoreIllegals:!0}).value;else if(typeof s<"u"){let l=s.highlightAuto(e);r.innerHTML=l.value,l.language&&r.classList.add(`language-${l.language}`)}else r.textContent=e}catch{r.textContent=e}return}}o.appendChild(Lc(e,t))}a(Dc,"injectCodeBlockToBottom");var Or="hoj-force-update-checkbox",is="hoj-force-update-fields",Et=!1;function Hc(){let e=document.getElementById(Or);e&&(e.checked=Et);let t=document.getElementById(is);t&&(t.style.display=Et?"block":"none")}a(Hc,"syncForceCheckbox");function qr(){if(!window.location.pathname.endsWith("/discussion"))return!1;let e=document.querySelector(".el-dialog__footer .dialog-footer");if(!e)return!1;if(document.getElementById(Or))return!0;let t=document.createElement("label");t.style.cssText="margin-right:15px;display:inline-flex;align-items:center;cursor:pointer;",t.title="启用 ForceUpdate";let o=document.createElement("input");o.type="checkbox",o.id=Or,o.style.marginRight="5px",o.checked=Et,o.addEventListener("change",i=>{Et=i.target.checked;try{window.__forceDiscussionUpdate__=Et}catch{}Hc()});let n=document.createElement("span");n.textContent="ForceUpdate",t.append(o,n),e.insertBefore(t,e.firstChild);let r=document.createElement("div");return r.id=is,r.style.cssText=`display:${Et?"block":"none"};margin-top:10px;text-align:left;`,r.innerHTML=`
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">role</label><input id="force-role-input" type="text" placeholder="user/admin/root" style="width:100px;padding:4px;"></div>
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">viewNum</label><input id="force-viewNum-input" type="number" placeholder="0" style="width:80px;padding:4px;"></div>
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">likeNum</label><input id="force-likeNum-input" type="number" placeholder="0" style="width:80px;padding:4px;"></div>
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">commentNum</label><input id="force-commentNum-input" type="number" placeholder="0" style="width:80px;padding:4px;"></div>`,e.insertBefore(r,t.nextSibling),!0}a(qr,"injectForceOption");function ss(){new MutationObserver(()=>{window.location.pathname.endsWith("/discussion")&&document.querySelector(".el-dialog__footer .dialog-footer")&&qr()}).observe(document.body,{childList:!0,subtree:!0})}a(ss,"startDiscussionObserver");Pt();var D=Ie(),ls="",Ic="",$r=null;f.start();Cn(!!D.PerfMode);mt(D);ts(e=>{tr(D,{gid:e.gid,did:String(e.did)})});function mn(){Ee(D),Ce(D),ce(D),mt(D)}a(mn,"reapplyAllStyles");async function cs(){console.log("[BetterHOJ] Initializing v"+Q.version),mn(),we(D),Vt(D),st(D),xo(),it(D),await Hi(),await qo(D),Ii(D),kr(D),new MutationObserver(()=>kr(D)).observe(document.body,{childList:!0,subtree:!0}),Qo(D),Tr(),_r(),Sr(),Bc(),Oc(),un(),pn(),Ac(),Oe(),new MutationObserver(Oe).observe(document.body,{childList:!0,subtree:!0}),ps(),new MutationObserver(ps).observe(document.body,{childList:!0,subtree:!0}),ss(),ds(),new MutationObserver(ds).observe(document.documentElement,{childList:!0,subtree:!0}),nn(),new MutationObserver(()=>nn()).observe(document.body,{childList:!0,subtree:!0}),new MutationObserver(()=>{document.getElementById("pick-one")&&Xo(D)}).observe(document.body,{childList:!0,subtree:!0}),dt(300),setInterval(()=>dt(0),3e3),Mo(),setInterval(us,1e3),us(),console.log("[BetterHOJ] Initialization complete")}a(cs,"initialize");function ds(){Tr(),_r(),Sr(),dr(D),Wi(),Yi(),D.VditorDiscussionPublish&&Do(D),D.VditorDiscussionEdit&&Ho(D),D.VditorGroupCreate&&Io(D),Oi(),Qi(D),ns(),qr(),yr(D)}a(ds,"tryInject");function us(){if(window.location.href===ls)return;ls=window.location.href;let e=/^\/problem[\/:][^\/?#]+/.test(window.location.pathname)||/^\/training\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname)||/^\/contest\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname)||/^\/group\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname);if(e)Gi(D),document.getElementById("pick-one")&&setTimeout(Xo,1200),setTimeout(()=>Vt(D),1200);else{let t=document.getElementById("hoj-recommendations-panel");t&&t.remove(),ar(),Ui()}e?Br():Ic="",/\/submission-detail\/[^\/?#]+/.test(window.location.pathname)&&Rr(),(/^\/discussion(\/|$|\?)/.test(window.location.pathname)||/^\/group\/[^\/]+\/discussion(\/|$)/.test(window.location.pathname))&&es(),fe()?(ht(),Le(),Un()):_e()?(ht(),Fo(),setTimeout(()=>ze(D),500)):($e(),Vn()),Mr()||Ki(),Nr()||Xi(),dt(100),nn()}a(us,"onUrlChange");function ps(){$r||($r=window.setTimeout(()=>{$r=null,Hn()},400))}a(ps,"scheduleFavSetup");function Ac(){try{let e=window.fetch;window.fetch=function(t,o){let n=typeof t=="string"?t:t&&t.url||"";return zn(n)?e.call(this,t,o).then(r=>(setTimeout(()=>{fe()&&(console.log("[RankTag] 排行榜接口已完成，重新注入"),Le())},150),r)):e.call(this,t,o)}}catch(e){console.warn("[RankTag] hook fetch 失败:",e)}}a(Ac,"hookRankListApi");var zr=[];function Pc(){typeof yn=="function"&&zr.forEach(e=>{try{yn(e)}catch{}}),zr=[]}a(Pc,"_unregisterMenuCommands");function Ye(e,t){if(typeof vn!="function")return;let o=vn(e,t);o!=null&&zr.push(o)}a(Ye,"_addMenuCommand");function Bc(){Pc(),Ye(E("menu.openSettings"),()=>{window.__BETTER_HOJ__?.openSettings?.()}),Ye(E("menu.toggleDarkMode"),()=>{D.DarkMode=!D.DarkMode,Y(D),mn(),v(D.DarkMode?E("menu.darkOn"):E("menu.darkOff"),"success")}),Ye(E("menu.toggleSmartHoj"),()=>{D.Open=!D.Open,Y(D),mn(),v(D.Open?E("menu.smartOn"):E("menu.smartOff"),"success")}),Ye(E("menu.openSnippetPanel"),()=>Re(D)),Ye(E("menu.manageSnippets"),()=>{Promise.resolve().then(()=>(At(),Pa)).then(e=>e.openSnippetManager(D))}),Ye(E("menu.importExport"),()=>{Promise.resolve().then(()=>(Yn(),Wa)).then(e=>e.openImportExportDialog(D))}),Ye(E("menu.togglePanelFullscreen"),()=>{let t=We()?.querySelector("#hoj-fullscreen-toggle");t&&(t.checked=!t.checked,t.dispatchEvent(new Event("change")))})}a(Bc,"registerMenuCommands");function Oc(){document.addEventListener("keydown",e=>{if(e.key==="Escape"){on();return}e.ctrlKey&&e.altKey&&e.key.toLowerCase()==="s"&&(e.preventDefault(),Re(D)),e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==="b"&&(e.preventDefault(),wt())})}a(Oc,"setupGlobalHotkeys");window.__BETTER_HOJ__={config:()=>D,reload:mn,openSettings:()=>{let e=We();e&&e.classList.add("open")},VERSION_INFO:Q};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",cs):cs();})();

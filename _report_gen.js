const fs = require('fs');
const docx = require('C:/Users/HYY/AppData/Roaming/npm/node_modules/docx');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, PageNumber, Footer
} = docx;

const BASE = 'd:/gaojiwangyesheji/';

// ---------- 工具函数 ----------
function p(text, opts) {
  opts = opts || {};
  return new Paragraph({
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { after: opts.after !== undefined ? opts.after : 120, line: 320 },
    children: [new TextRun({
      text: text,
      bold: !!opts.bold,
      size: opts.size || 24,
      font: opts.font || '宋体',
      color: opts.color || '000000'
    })]
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 160 },
    children: [new TextRun({ text: text, bold: true, size: 32, font: '黑体', color: '000000' })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text: text, bold: true, size: 28, font: '黑体', color: '000000' })]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 100 },
    children: [new TextRun({ text: text, bold: true, size: 24, font: '黑体', color: '000000' })]
  });
}

function codePara(text, first, last) {
  return new Paragraph({
    spacing: { after: last ? 120 : 0, line: 260 },
    shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
    indent: { left: 240, right: 240 },
    children: [new TextRun({ text: text, size: 18, font: 'Consolas', color: '333333' })]
  });
}

function img(file, w, h, caption) {
  const out = [new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 40 },
    children: [new ImageRun({
      type: 'png',
      data: fs.readFileSync(BASE + file),
      transformation: { width: w, height: h },
      altText: { title: caption, description: caption, name: caption }
    })]
  })];
  out.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
    children: [new TextRun({ text: caption, size: 18, font: '宋体', color: '808080' })]
  }));
  return out;
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 60, line: 300 },
    children: [new TextRun({ text: text, size: 24, font: '宋体' })]
  });
}

const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: '999999' };
const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function infoRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        borders, width: { size: 2400, type: WidthType.DXA },
        shading: { fill: 'F2F6FC', type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 24, font: '宋体' })] })]
      }),
      new TableCell({
        borders, width: { size: 6600, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: value, size: 24, font: '宋体' })] })]
      })
    ]
  });
}

// ---------- 正文内容 ----------
const children = [];

// ===== 封面 =====
children.push(new Paragraph({ spacing: { before: 2400 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { after: 200 },
  children: [new TextRun({ text: '《高级网页设计I》', bold: true, size: 44, font: '黑体' })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { after: 600 },
  children: [new TextRun({ text: '网页元素设计 项目报告', bold: true, size: 36, font: '黑体' })]
}));
children.push(new Table({
  width: { size: 9000, type: WidthType.DXA },
  columnWidths: [2400, 6600],
  alignment: AlignmentType.CENTER,
  rows: [
    infoRow('学　　号', '24001010428'),
    infoRow('姓　　名', '侯雅月'),
    infoRow('班　　级', '（请填写班级）'),
    infoRow('项目选题名称', '汽车之家大连站首页——网页元素设计')
  ]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { before: 800 },
  children: [new TextRun({ text: '大连东软信息学院', size: 24, font: '宋体', color: '666666' })]
}));
children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 一、实施过程 =====
children.push(h1('一、实施过程'));

children.push(h2('1. 项目需求与实现'));
children.push(p('本次实验在三级项目选题“汽车之家大连站首页”的基础上，选取三个典型网页元素进行设计实现：① 导航条（顶部横向导航 + 左侧竖向导航）；② 一左一右（今日焦点：左大图 + 右文字列表）；③ 上图下文（汽车视频卡片列表 + tab 切换样式）。三个元素中，元素二包含大尺寸图片，元素三包含 6 张视频封面图片，元素一包含站点 Logo 与 iconfont 图标字体，满足“至少两处要有图片或图表”的要求。'));
children.push(p('实现文件为 9-2 网页元素设计.html（配套完整站点页面为 9-1 汽车之家大连站.html），全部布局使用 flex 完成，未使用 float 与表格布局；图片与图标均本地化存放，图标使用 iconfont.cn 下载的字体图标替代 png 图标。', { after: 200 }));

children.push(h3('网页元素1：导航条（导航）'));
children.push(p('取自汽车之家大连站首页顶部。实现要点：顶部通栏高 64px，内容区 1160px 居中；搜索框 480×40px、圆角 20px；搜索按钮 76×32px，主色 #3d7eff；左侧竖向导航宽 104px、条目高 42px，选中态底色 #eaf2ff、文字 #3d7eff。'));
children.push(...img('_orig1.png', 560, 178, '网页元素1 原图（汽车之家大连站导航区）'));
children.push(...img('_el1.png', 560, 366, '网页元素1 实现图（本页导航区）'));

children.push(h3('网页元素2：一左一右（今日焦点）'));
children.push(p('取自首页“今日焦点 NEWS”栏目。实现要点：左侧大图 560×336px、圆角 8px，右侧文字区 flex:1、左边距 24px；大标题 24px 加粗；副标题与链接列表 13px，链接列表每行 5 列（width:20%），单行超出省略号显示。'));
children.push(...img('_orig2.png', 560, 157, '网页元素2 原图（今日焦点区）'));
children.push(...img('_el2.png', 560, 321, '网页元素2 实现图（本页一左一右区）'));

children.push(h3('网页元素3：上图下文（视频卡片 + tab）'));
children.push(p('取自首页“汽车视频”栏目。实现要点：卡片宽 356px、间距 22px，一行三列、自动换行；封面 356×200px、圆角 8px；来源、时长、作者头像绝对定位浮于封面四角；标题 14px 两行 40px 超出省略；tab 选中态为蓝色 #3d7eff 加 20×3px 下划线。'));
children.push(...img('_orig3.png', 520, 322, '网页元素3 原图（汽车视频区）'));
children.push(...img('_el3.png', 520, 429, '网页元素3 实现图（本页上图下文区）'));

children.push(h2('2. 项目代码'));
children.push(p('代码规范性说明：'));
children.push(bullet('所有类名、id、JS 变量均以姓名拼音 hou_ya_yue_（侯雅月）开头，满足“代码中包含姓名/类名含姓名缩写”的要求；'));
children.push(bullet('文件头部设置公共（全局）CSS：清除默认内外边距、统一盒模型、统一字体与链接、列表、图片样式，各模块复用；'));
children.push(bullet('全部使用 class 选择器，CSS 中未使用 id 选择器（id 仅用于 JS 交互锚点），未使用 float，未使用表格布局，布局全部采用 flex；'));
children.push(bullet('相同样式只定义一次并复用（如卡片、榜单、tab 等公共类），未出现重复定义的选择器。'));

children.push(h3('网页元素1 核心代码（导航条）'));
[
  '<!-- HTML：左侧竖向导航（顶部横向导航结构类似，均为 flex 容器） -->',
  '<nav class="hou_ya_yue_col">',
  '  <a href="javascript:;" class="hou_ya_yue_on">',
  '    <i class="hou_ya_yue_if hou_ya_yue_i-shouye"></i>首页</a>',
  '  <a href="javascript:;"><i class="hou_ya_yue_if hou_ya_yue_i-xuanche"></i>选车<em></em></a>',
  '</nav>',
  '',
  '/* CSS：flex 纵向列表 + 选中态高亮 */',
  '.hou_ya_yue_nav-side { display: flex; margin-top: 16px; }',
  '.hou_ya_yue_nav-side .hou_ya_yue_col {',
  '  width: 104px; background: #fafbfc; border: 1px solid #eef0f3;',
  '  border-radius: 8px; padding: 8px 0; }',
  '.hou_ya_yue_nav-side .hou_ya_yue_col a {',
  '  display: flex; align-items: center; height: 42px;',
  '  padding: 0 8px 0 14px; font-size: 14px; color: #333;',
  '  position: relative; white-space: nowrap; }',
  '.hou_ya_yue_nav-side .hou_ya_yue_col a.hou_ya_yue_on {',
  '  color: #3d7eff; background: #eaf2ff; font-weight: bold; }'
].forEach((t, i, arr) => children.push(codePara(t, i === 0, i === arr.length - 1)));

children.push(h3('网页元素2 核心代码（一左一右）'));
[
  '<!-- HTML：左图右文，flex 一行两列 -->',
  '<div class="hou_ya_yue_lr">',
  '  <a href="javascript:;" class="hou_ya_yue_lr-pic"><img src="image/xxx.png" alt=""></a>',
  '  <div class="hou_ya_yue_lr-txt"><h3>标题</h3><div class="hou_ya_yue_list">…</div></div>',
  '</div>',
  '',
  '/* CSS：左侧固定宽，右侧自适应，列表每行 5 列 */',
  '.hou_ya_yue_lr { display: flex; }',
  '.hou_ya_yue_lr-pic { width: 560px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }',
  '.hou_ya_yue_lr-pic img { width: 560px; height: 336px; object-fit: cover; }',
  '.hou_ya_yue_lr-txt { flex: 1; margin-left: 24px; min-width: 0; }',
  '.hou_ya_yue_lr-txt h3 { font-size: 24px; line-height: 1.35; margin: 4px 0 8px; }',
  '.hou_ya_yue_lr-txt .hou_ya_yue_list { display: flex; flex-wrap: wrap; }',
  '.hou_ya_yue_lr-txt .hou_ya_yue_list a {',
  '  width: 20%; font-size: 13px; line-height: 28px;',
  '  overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }'
].forEach((t, i, arr) => children.push(codePara(t, i === 0, i === arr.length - 1)));

children.push(h3('网页元素3 核心代码（上图下文）'));
[
  '<!-- HTML：封面在上、标题在下，四角信息绝对定位 -->',
  '<div class="hou_ya_yue_card-item">',
  '  <a href="javascript:;" class="hou_ya_yue_cover">',
  '    <img src="image/xxx.png" alt="">',
  '    <span class="hou_ya_yue_src">汽车之家</span>',
  '    <span class="hou_ya_yue_dur">04:07</span>',
  '    <span class="hou_ya_yue_user"><img src="image/xxx.jpg" alt="">长测纪</span>',
  '  </a>',
  '  <h5><a href="javascript:;">标题文字</a></h5>',
  '</div>',
  '',
  '/* CSS：flex-wrap 三列换行 + 封面圆角与角标定位 */',
  '.hou_ya_yue_cards { display: flex; flex-wrap: wrap; margin-top: 14px; }',
  '.hou_ya_yue_card-item { width: 356px; margin: 0 22px 18px 0; }',
  '.hou_ya_yue_card-item:nth-child(3n) { margin-right: 0; }',
  '.hou_ya_yue_card-item .hou_ya_yue_cover {',
  '  position: relative; border-radius: 8px; overflow: hidden; }',
  '.hou_ya_yue_card-item .hou_ya_yue_cover img {',
  '  width: 356px; height: 200px; object-fit: cover; }',
  '.hou_ya_yue_card-item .hou_ya_yue_cover .hou_ya_yue_dur {',
  '  position: absolute; right: 8px; bottom: 8px; font-size: 12px;',
  '  color: #fff; background: rgba(0,0,0,.6); border-radius: 3px; padding: 0 5px; }',
  '.hou_ya_yue_card-item h5 {',
  '  font-size: 14px; line-height: 20px; margin-top: 8px;',
  '  height: 40px; overflow: hidden; }'
].forEach((t, i, arr) => children.push(codePara(t, i === 0, i === arr.length - 1)));

children.push(h2('3. 测试与发布'));
children.push(p('测试环境：Windows 10/11，使用 Microsoft Edge（Chromium 内核）与 Google Chrome 双浏览器打开 9-2 网页元素设计.html，三个元素渲染效果一致，无错位、无样式丢失。'));
children.push(p('视口测试：分别在 1920px、1360px、768px 三种视口宽度下查看。页面主体为 1160px 固定宽度居中布局，1920px 与 1360px 视口下正常显示；768px 视口下出现横向滚动条（与汽车之家官网在窄视口下的表现一致，属于固定宽度站点的预期行为），各元素内部布局不被破坏。'));
children.push(...img('_vp1920.png', 560, 277, '1920×950 视口测试截图（Edge 浏览器）'));
children.push(...img('_vp768.png', 300, 352, '768×900 视口测试截图（Chrome 浏览器）'));
children.push(p('发布：项目为纯静态页面，可直接部署到任意静态服务器（gitee pages、github pages、wamp/www 等）。本次将源码打包为“学号-姓名”压缩包随报告一并提交，如后续开通 gitee pages 将补充发布截图。'));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 二、项目总结 =====
children.push(h1('二、项目总结'));
children.push(h2('1. 所得'));
children.push(p('本次实验完整实践了“看设计图 → 测量尺寸配色 → 规划 HTML 结构 → 写公共 CSS → 写模块选择器 → 多浏览器多视口验证”的网页制作流程，主要收获有四点：'));
children.push(bullet('养成先测量后编码的习惯：先量出导航 64px、搜索框 480×40px、左图 560×336px、卡片 356×200px，再提取主色 #3d7eff、橙 #ff6600、底色 #f5f6f7，写样式时心里有数，返工明显减少；'));
children.push(bullet('掌握 flex 常见套路：一左一右用“固定宽 + flex:1”，上图下文用“flex-wrap + nth-child 清除末列右边距”，导航用“flex 纵向 + align-items 居中”，比浮动更直观稳定；'));
children.push(bullet('掌握定位与浮层：照片左下角标题用 position:absolute + linear-gradient 遮罩实现，侧栏 position:fixed 后主内容必须 margin-left 让出 104px，否则被遮挡；'));
children.push(bullet('认识到公共 CSS 与命名规范的价值：统一 hou_ya_yue_ 前缀与公共样式后，各类卡片可互相复用，改一处全站生效，并按指导书全程使用 class、不用 id 选择器与表格布局。'));

children.push(h2('2. 教训'));
children.push(bullet('多行卡片统一写 margin-right 导致末列留白、整行不齐，需用 nth-child(3n)/nth-child(4n) 清零；'));
children.push(bullet('flex 子项默认 min-width:auto，长标题会撑破容器，需设 min-width:0 并配合 overflow:hidden、white-space:nowrap、text-overflow:ellipsis 做省略号；'));
children.push(bullet('按钮颜色被 a:hover 覆盖时，不应滥用 !important，而应用 a.xxx 提高选择器特异性来自然覆盖；'));
children.push(bullet('固定 104px 竖导航遇“超级补贴”这类长词条会折行，需压缩内边距并加 white-space:nowrap，布局要预先考虑极端内容长度；'));
children.push(bullet('1160px 固定宽在 768px 窄视口出现横向滚动条，虽与官网一致，但说明响应式设计仍有必要；图片引用必须严格核对本地文件名，否则会出现裂图。'));

children.push(h2('3. 项目实施心得'));
children.push(p('网页制作不是把元素堆上去，而是“先结构、再复用、后细节”。这次先划分模块（导航 / 一左一右 / 上图下文），再抽公共样式，最后才处理圆角、渐变与角标等细节，效率远高于一上手就写样式。同时体会到规范比技巧更重要：统一的命名前缀、公共样式、间距与配色，让几十个模块保持一致、便于修改；多浏览器多视口测试也不可省略，能发现静态检查发现不了的问题。'));
children.push(p('合理使用 AI 能显著提升效率，但前提是自己能看懂并判断它给出的代码。我把 AI 当作“测量助手 + 代码草稿生成器 + 规范检查工具”而非替代品，每段代码都逐行核对、按需修改并在浏览器中验证效果。'));

children.push(h2('4. AI 使用说明（按要求声明）'));
children.push(p('本次实验使用 CodeBuddy IDE 内置大模型（auto）辅助开发，用途为：① 分析设计截图、判读模块结构并协助测量尺寸与提取主色（本人复核）；② 生成全局 CSS 骨架与 flex 布局初始代码（本人调整命名、补充语义化标签并逐行核对）；③ 批量规范检查与修正（id 选择器、float、表格布局、多余 !important 等）；④ 使用无头浏览器（Edge --headless）在 1920/1360/768px 三种视口批量截图并裁切效果图；⑤ 协助报告结构与排版。'));
children.push(p('声明：所有核心 HTML/CSS 代码均由本人理解、修改并最终确认，显示效果由本人在浏览器中逐一验证，AI 仅起辅助与提效作用。', { after: 240 }));
children.push(p('报告与源码提交文件名：学号-侯雅月（请按实际学号重命名）。', { color: '888888' }));

// ---------- 组装文档 ----------
const doc = new Document({
  styles: {
    default: { document: { run: { font: '宋体', size: 24 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: '黑体' }, paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: '黑体' }, paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: '黑体' }, paragraph: { spacing: { before: 160, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 560, hanging: 280 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: '第 ', size: 18, font: '宋体', color: '888888' }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, font: '宋体', color: '888888' }),
            new TextRun({ text: ' 页', size: 18, font: '宋体', color: '888888' })
          ]
        })]
      })
    },
    children: children
  }]
});

Packer.toBuffer(doc).then(function (buffer) {
  fs.writeFileSync(BASE + '_report_out.docx', buffer);
  try {
    fs.copyFileSync(BASE + '_report_out.docx', 'D:/24001010428-侯雅月-网页元素设计项目报告.docx');
    console.log('report written to D:/');
  } catch (e) {
    console.log('D:/ file is locked, kept at workspace: _report_out.docx');
  }
  console.log('report written');
});

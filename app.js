// CareerAI - AI 求职助手
const { useState, useEffect, useRef } = React;
const h = React.createElement;

// ===== ICONS =====
function SvgIcon(d, w, h) {
  return function(props) {
    return React.createElement('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: w || 20, height: h || 20,
      viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: 2,
      strokeLinecap: 'round', strokeLinejoin: 'round',
      ...props
    }, d.map(function(c) { return React.createElement(c[0], c[1]); }));
  };
}

var Icons = {
  Briefcase: SvgIcon([['rect', {x:2,y:7,width:20,height:14,rx:2,ry:2}], ['path', {d:'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'}]], 20, 20),
  FileText: SvgIcon([['path', {d:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'}], ['polyline', {points:'14 2 14 8 20 8'}], ['line', {x1:16,y1:13,x2:8,y2:13}], ['line', {x1:16,y1:17,x2:8,y2:17}]], 20, 20),
  CheckSquare: SvgIcon([['polyline', {points:'9 11 12 14 22 4'}], ['path', {d:'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'}]], 20, 20),
  TrendingUp: SvgIcon([['polyline', {points:'22 7 13.5 15.5 8.5 10.5 2 17'}], ['polyline', {points:'16 7 22 7 22 13'}]], 20, 20),
  Send: SvgIcon([['line', {x1:22,y1:2,x2:11,y2:13}], ['polygon', {points:'22 2 15 22 11 13 2 9 22 2'}]], 20, 20),
  Sparkles: SvgIcon([['path', {d:'m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z'}]], 20, 20),
  User: SvgIcon([['path', {d:'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'}], ['circle', {cx:12,cy:7,r:4}]], 20, 20),
  Menu: SvgIcon([['line', {x1:4,y1:6,x2:20,y2:6}], ['line', {x1:4,y1:12,x2:20,y2:12}], ['line', {x1:4,y1:18,x2:20,y2:18}]], 24, 24),
  X: SvgIcon([['line', {x1:18,y1:6,x2:6,y2:18}], ['line', {x1:6,y1:6,x2:18,y2:18}]], 18, 18),
  Trash2: SvgIcon([['polyline', {points:'3 6 5 6 21 6'}], ['path', {d:'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'}]], 16, 16),
};

// ===== ONBOARDING FORM =====
function OnboardingForm(props) {
  var onSubmit = props.onSubmit;
  var fieldState = useState({ education: '', age: '', major: '', target: '' });
  var fields = fieldState[0], setFields = fieldState[1];
  var errState = useState({});
  var errs = errState[0], setErrs = errState[1];

  function setF(key, val) {
    var u = Object.assign({}, fields);
    u[key] = val;
    setFields(u);
    if (errs[key]) {
      var e2 = Object.assign({}, errs);
      delete e2[key];
      setErrs(e2);
    }
  }

  function validate() {
    var e = {};
    if (!fields.education) e.education = '请选择学历';
    if (!fields.age || fields.age < 16 || fields.age > 60) e.age = '请输入有效年龄(16-60)';
    if (!fields.major.trim()) e.major = '请输入专业';
    if (!fields.target.trim()) e.target = '请输入求职意向';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    var e2 = validate();
    if (Object.keys(e2).length > 0) { setErrs(e2); return; }
    onSubmit({ education: fields.education, age: parseInt(fields.age), major: fields.major.trim(), target: fields.target.trim() });
  }

  var eduOpts = ['大专', '本科', '硕士', '博士', '其他'];

  return h('div', {className: 'min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4'},
    h('div', {className: 'w-full max-w-lg', style: {animation: 'slideUp .5s ease-out'}},
      h('div', {className: 'bg-white rounded-2xl shadow-xl shadow-blue-100/50 border border-blue-50 overflow-hidden'},
        h('div', {className: 'bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white text-center'},
          h('div', {className: 'w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4'},
            h(Icons.Sparkles, {w: 32, h: 32})
          ),
          h('h1', {className: 'text-2xl font-bold mb-2'}, 'CareerAI'),
          h('p', {className: 'text-blue-100 text-sm'}, '在开始之前, 先了解一下你')
        ),
        h('form', {onSubmit: handleSubmit, className: 'px-8 py-6'},
          h('div', {className: 'space-y-5'},
            h('div', null,
              h('label', {className: 'block text-sm font-medium text-gray-700 mb-1.5'}, '学历'),
              h('div', {className: 'flex gap-2 flex-wrap'},
                eduOpts.map(function(opt) {
                  return h('button', {
                    key: opt, type: 'button',
                    onClick: function() { setF('education', opt); },
                    className: 'px-4 py-2 rounded-xl text-sm font-medium transition-all ' +
                      (fields.education === opt ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200')
                  }, opt);
                })
              ),
              errs.education ? h('p', {className: 'text-red-500 text-xs mt-1'}, errs.education) : null
            ),
            h('div', null,
              h('label', {className: 'block text-sm font-medium text-gray-700 mb-1.5', htmlFor: 'inp-age'}, '年龄'),
              h('input', {
                id: 'inp-age', type: 'number', min: 16, max: 60,
                value: fields.age, placeholder: '请输入年龄',
                onChange: function(e) { setF('age', e.target.value); },
                className: 'w-full px-4 py-2.5 rounded-xl border ' + (errs.age ? 'border-red-300 bg-red-50' : 'border-gray-200') + ' text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition'
              }),
              errs.age ? h('p', {className: 'text-red-500 text-xs mt-1'}, errs.age) : null
            ),
            h('div', null,
              h('label', {className: 'block text-sm font-medium text-gray-700 mb-1.5', htmlFor: 'inp-major'}, '专业'),
              h('input', {
                id: 'inp-major', type: 'text',
                value: fields.major, placeholder: '如：计算机科学、金融学、农业机械化...',
                onChange: function(e) { setF('major', e.target.value); },
                className: 'w-full px-4 py-2.5 rounded-xl border ' + (errs.major ? 'border-red-300 bg-red-50' : 'border-gray-200') + ' text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition'
              }),
              errs.major ? h('p', {className: 'text-red-500 text-xs mt-1'}, errs.major) : null
            ),
            h('div', null,
              h('label', {className: 'block text-sm font-medium text-gray-700 mb-1.5', htmlFor: 'inp-target'}, '求职意向'),
              h('input', {
                id: 'inp-target', type: 'text',
                value: fields.target, placeholder: '如：产品经理、数据分析师、机械工程师...',
                onChange: function(e) { setF('target', e.target.value); },
                className: 'w-full px-4 py-2.5 rounded-xl border ' + (errs.target ? 'border-red-300 bg-red-50' : 'border-gray-200') + ' text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition'
              }),
              errs.target ? h('p', {className: 'text-red-500 text-xs mt-1'}, errs.target) : null
            )
          ),
          h('button', {
            type: 'submit',
            className: 'w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:shadow-blue-300 active:scale-[0.98]'
          }, '开始使用'),
          h('p', {className: 'text-center text-xs text-gray-400 mt-4'}, '信息仅用于个性化求职建议, 不会存储到服务器')
        )
      )
    )
  );
}

// ===== MODE CONFIG =====
var modes = [
  { id: 'career-prep', name: '求职准备清单', icon: 'Briefcase', color: 'blue', desc: '输入专业和目标岗位, AI智能拆解准备清单并按优先级排序' },
  { id: 'resume-polish', name: '简历打磨对话', icon: 'FileText', color: 'orange', desc: '像朋友一样追问, 帮你把模糊经历改写为STAR法则描述' },
  { id: 'daily-tasks', name: '每日小任务', icon: 'CheckSquare', color: 'emerald', desc: '每日推送学习任务 + 自动生成反馈' },
  { id: 'offer-analysis', name: 'Offer决策分析', icon: 'TrendingUp', color: 'purple', desc: '输入两个Offer, AI给出SWOT对比和长期发展预测' },
];

var modeColors = {
  'career-prep':    { bg:'bg-blue-50', border:'border-blue-200', text:'text-blue-700', hover:'hover:bg-blue-100', act:'bg-blue-100 border-blue-300', btn:'bg-blue-600 hover:bg-blue-700', lt:'bg-blue-50' },
  'resume-polish':  { bg:'bg-orange-50', border:'border-orange-200', text:'text-orange-700', hover:'hover:bg-orange-100', act:'bg-orange-100 border-orange-300', btn:'bg-orange-600 hover:bg-orange-700', lt:'bg-orange-50' },
  'daily-tasks':    { bg:'bg-emerald-50', border:'border-emerald-200', text:'text-emerald-700', hover:'hover:bg-emerald-100', act:'bg-emerald-100 border-emerald-300', btn:'bg-emerald-600 hover:bg-emerald-700', lt:'bg-emerald-50' },
  'offer-analysis': { bg:'bg-purple-50', border:'border-purple-200', text:'text-purple-700', hover:'hover:bg-purple-100', act:'bg-purple-100 border-purple-300', btn:'bg-purple-600 hover:bg-purple-700', lt:'bg-purple-50' },
};

// ===== DEEPSEEK API CONFIG =====
// API Key 由后端 server.js 通过环境变量注入，前端不暴露
var DEEPSEEK_API_URL = '/api/chat';
var DEEPSEEK_MODEL = 'deepseek-v4-flash';

var systemPrompts = {
  'career-prep': '你是一名资深职业规划顾问。基于用户的学历、专业背景与目标岗位，输出一份精准的求职准备方案。要求：使用Markdown格式；以优先矩阵表格呈现任务列表（列：优先级、任务项、能力对标、建议周期），优先级用粗体标注**【高】**/**【中】**/**【低】**；每项附具体执行路径；结尾以> 引用格式给出战略性总结。禁止使用示例占位，直接基于用户实际条件输出。',
  'resume-polish': '你是一名招聘总监级别的简历顾问，精通STAR法则（Situation-Task-Action-Result）。流程：先以1-2个针对性问题挖掘用户经历的量化细节，再将其重构为标准STAR框架。使用Markdown格式输出；每个STAR维度以> 引用格式独立呈现（S:/T:/A:/R:为前缀），量化成果加粗；结尾附一段面试口述稿，以30秒内可完成为限。',
  'daily-tasks': '你是一名学习与发展（L&D）规划专家。基于用户专业方向与求职目标，制定当日可执行的学习计划。使用Markdown格式输出：任务清单表格（列：任务、类别、预估时长、产出标准）；周进度追踪表（列：指标项、当前进度、目标值）；结尾以> 引用格式给出调整建议。任务需具备可验证性且难度递增。',
  'offer-analysis': '你是一名职业战略分析师。对用户提供的多个Offer进行结构化比较。使用Markdown格式输出：定量对比表（列：维度、Offer A、Offer B，涵盖薪资、城市、平台、岗位、成长性）；各Offer的SWOT四象限分析表；三年发展路径推演表；以> 引用格式出具综合决策建议，表述需客观、数据驱动。'
};

// ===== AI RESPONSE GENERATORS (Fallback) =====
var resumeQuestions = [
  "你在学校或实习中做过哪些跟数据、用户调研、需求分析相关的事情？哪怕很小的事也可以说说~",
  "能具体说说你在那个项目中承担了什么角色？是你主导的,还是配合别人做的？",
  "这个项目最终带来了什么可量化的结果？比如效率提升了多少、用户增长了多少？",
  "过程中遇到的最大困难是什么？你是怎么解决的？"
];

function genPrep(inp) {
  var m=inp.major||'你的专业',t=inp.target||'目标岗位',s=inp.skills||'未填写';
  return '<h2>📋 '+t+'岗位 · 准备清单</h2><p>基于「'+m+'」+ 技能「'+s+'」</p>'+
    '<table><tr><th>优先级</th><th>任务</th><th>说明</th><th>建议时间</th></tr>'+
    '<tr><td><span class="tag-h">高</span></td><td><strong>产品实习</strong></td><td>'+t+'岗最看重实战,至少1段相关实习</td><td>尽快投递</td></tr>'+
    '<tr><td><span class="tag-h">高</span></td><td><strong>打造作品集</strong></td><td>完成产品分析/PRD/竞品调研</td><td>2-4周</td></tr>'+
    '<tr><td><span class="tag-h">高</span></td><td><strong>原型设计</strong></td><td>熟练Figma/Axure,产出2-3个高保真原型</td><td>3-4周</td></tr>'+
    '<tr><td><span class="tag-m">中</span></td><td><strong>数据分析项目</strong></td><td>SQL+Excel完成用户行为分析</td><td>3-4周</td></tr>'+
    '<tr><td><span class="tag-m">中</span></td><td><strong>产品思维书单</strong></td><td>《启示录》《俞军产品方法论》《用户体验要素》</td><td>持续</td></tr>'+
    '<tr><td><span class="tag-m">中</span></td><td><strong>产品比赛</strong></td><td>腾讯犀牛鸟/全国大学生产品设计大赛</td><td>关注赛程</td></tr>'+
    '<tr><td><span class="tag-l">低</span></td><td><strong>行业认知</strong></td><td>36氪/虎嗅/ProductHunt,每周输出1篇分析</td><td>长期</td></tr>'+
    '<tr><td><span class="tag-l">低</span></td><td><strong>人脉拓展</strong></td><td>产品经理线下沙龙,LinkedIn链接业内人士</td><td>持续</td></tr>'+
    '<tr><td><span class="tag-l">低</span></td><td><strong>英语能力</strong></td><td>互联网出海趋势,CET-6以上</td><td>长期</td></tr></table>'+
    '<blockquote>💡 计算机背景是你的独特优势——技术理解力+产品思维=最有竞争力的PM画像</blockquote>';
}

function genResume(inp,qIdx){
  if(qIdx===0)return '<h2>🔍 简历挖掘中...</h2><p><strong>追问：</strong>'+resumeQuestions[1]+'</p><blockquote>💡 STAR法则 = <strong>S</strong>ituation + <strong>T</strong>ask + <strong>A</strong>ction + <strong>R</strong>esult</blockquote>';
  if(qIdx<resumeQuestions.length-1)return '<h2>📝 记录中...</h2><p><strong>追问：</strong>'+resumeQuestions[qIdx+1]+'</p>';
  return '<h2>✨ STAR法则改写完成！</h2>'+
    '<h3>📌 项目经历 · 产品优化</h3>'+
    '<blockquote><strong>S:</strong>在课程项目中,团队需要优化校园二手交易平台,但用户留存率低于20%。<br>'+
    '<strong>T:</strong>我负责用户调研与需求分析,目标将转化率提升30%。<br>'+
    '<strong>A:</strong>发放200份问卷,深度访谈12名用户；用Excel交叉分析定位搜索匹配度低为核心痛点；撰写PRD推动上线智能推荐。<br>'+
    '<strong>R:</strong>搜索转化率从18%升至47%,7日留存提升22%,项目获校级优秀结题。</blockquote>'+
    '<h3>🎯 面试30秒话术</h3><p><em>"我做过校园二手平台优化项目。通过200份问卷+12次访谈定位了搜索匹配问题,推动团队做智能推荐。转化率翻2.6倍,留存提升22%。"</em></p>'+
    '<blockquote>💡 体现了<strong>数据驱动决策</strong>+<strong>用户同理心</strong>+<strong>落地执行力</strong>,正是PM核心素质！</blockquote>';
}

function genTasks(){
  var d=new Date(),day=d.getDay()||7;
  return '<h2>📅 '+d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日 · 今日任务</h2>'+
    '<div class="citem" style="display:flex;align-items:center;gap:8px;padding:8px 12px;margin:4px -4px;border-radius:8px;cursor:pointer"><div style="width:18px;height:18px;border-radius:4px;border:2px solid #d1d5db"></div><span><strong>刷3道产品面试题</strong> (牛客网·产品经理专区) <code>学习</code> ⏱30min</span></div>'+
    '<div class="citem" style="display:flex;align-items:center;gap:8px;padding:8px 12px;margin:4px -4px;border-radius:8px;cursor:pointer"><div style="width:18px;height:18px;border-radius:4px;border:2px solid #d1d5db"></div><span><strong>阅读1篇行业分析报告</strong> (36氪/虎嗅/艾瑞咨询) <code>阅读</code> ⏱20min</span></div>'+
    '<div class="citem" style="display:flex;align-items:center;gap:8px;padding:8px 12px;margin:4px -4px;border-radius:8px;cursor:pointer"><div style="width:18px;height:18px;border-radius:4px;border:2px solid #d1d5db"></div><span><strong>打开Figma,临摹1个App原型</strong> <code>练习</code> ⏱45min</span></div>'+
    '<div class="citem" style="display:flex;align-items:center;gap:8px;padding:8px 12px;margin:4px -4px;border-radius:8px;cursor:pointer"><div style="width:18px;height:18px;border-radius:4px;border:2px solid #d1d5db"></div><span><strong>找1位校友或前辈交流</strong> <code>社交</code> ⏱30min</span></div>'+
    '<hr><h3>📊 本周进度</h3>'+
    '<table><tr><th>指标</th><th>完成情况</th></tr>'+
    '<tr><td>累计学习天数</td><td>本周 '+(Math.min(day,2)+2)+' 天 / 目标 5 天</td></tr>'+
    '<tr><td>面试题刷题量</td><td>本周 9 道 / 目标 15 道</td></tr>'+
    '<tr><td>原型练习</td><td>本周 2 个 / 目标 3 个</td></tr>'+
    '<tr><td>行业报告</td><td>本周 3 篇 / 目标 5 篇</td></tr></table>'+
    '<blockquote>💪 比上周进步20%,继续保持！坚持3周形成稳定学习节奏。</blockquote>';
}

function genOffer(o1,o2){
  var c1=(o1&&o1.company)||'Offer A',c2=(o2&&o2.company)||'Offer B';
  function sw(o,s){
    if(!o||!o.company)return '—';
    var z=o.size||'';
    if(s)return z.indexOf('大')>=0||z.indexOf('上市')>=0||z.indexOf('500')>=0?'品牌背书强,体系完善,培训丰富,履历含金量高':z.indexOf('中')>=0?'成长空间大,晋升清晰,易脱颖而出':'扁平化管理,决策快,接触核心业务';
    return z.indexOf('大')>=0||z.indexOf('上市')>=0||z.indexOf('500')>=0?'晋升周期长,个人影响力有限,可能成螺丝钉':z.indexOf('中')>=0?'培训体系不完善,需更强自驱力':'抗风险弱,福利不稳定';
  }
  return '<h2>⚖️ Offer SWOT对比</h2>'+
    '<h3>📊 基础数据</h3><table><tr><th>维度</th><th>'+c1+'</th><th>'+c2+'</th></tr>'+
    '<tr><td>薪资</td><td>'+((o1&&o1.salary)||'—')+'</td><td>'+((o2&&o2.salary)||'—')+'</td></tr>'+
    '<tr><td>城市</td><td>'+((o1&&o1.city)||'—')+'</td><td>'+((o2&&o2.city)||'—')+'</td></tr>'+
    '<tr><td>公司规模</td><td>'+((o1&&o1.size)||'—')+'</td><td>'+((o2&&o2.size)||'—')+'</td></tr></table>'+
    '<hr><h3>🔵 '+c1+' SWOT</h3>'+
    '<table><tr><th>💪 优势</th><th>🔻 劣势</th></tr><tr><td>'+sw(o1,true)+'</td><td>'+sw(o1,false)+'</td></tr></table>'+
    '<table><tr><th>🚀 机会</th><th>⚠️ 威胁</th></tr><tr><td>行业上升期,晋升空间大</td><td>竞争激烈,淘汰率高</td></tr></table>'+
    '<hr><h3>🟠 '+c2+' SWOT</h3>'+
    '<table><tr><th>💪 优势</th><th>🔻 劣势</th></tr><tr><td>'+sw(o2,true)+'</td><td>'+sw(o2,false)+'</td></tr></table>'+
    '<hr><h3>🎯 综合建议</h3>'+
    '<blockquote>优先<strong>快速成长</strong>→选平台大、mentor强的公司。更重<strong>生活平衡</strong>→综合薪资性价比和城市成本。</blockquote>'+
    '<h3>📈 3年发展预测</h3>'+
    '<table><tr><th>时间</th><th>'+c1+'</th><th>'+c2+'</th></tr>'+
    '<tr><td>第1年</td><td>熟悉业务,建立专业能力</td><td>快速上手,积累项目经验</td></tr>'+
    '<tr><td>第2年</td><td>独立负责模块,展现价值</td><td>带小项目,拓展影响力</td></tr>'+
    '<tr><td>第3年</td><td>晋升或跳槽,+40-60%</td><td>人脉积累,选择面更广</td></tr></table>'+
    '<blockquote>💡 以上为行业常规推演,个人努力是最大变量。</blockquote>';
}

// ===== REACT COMPONENTS =====

function MessageBubble(props) {
  var msg = props.msg, mid = props.mid;
  var isU = msg.role === 'user';
  var mc = modeColors[mid] || modeColors['career-prep'];
  return h('div', {className: 'flex ' + (isU ? 'justify-end' : 'justify-start') + ' mb-4', style: {animation: 'fadeIn .3s ease-out'}},
    h('div', {className: 'max-w-[88%] md:max-w-[75%] rounded-2xl px-4 py-3 ' + (isU ? 'bg-blue-600 text-white rounded-br-md' : 'bg-white border ' + mc.border + ' rounded-bl-md shadow-sm')},
      isU
        ? h('p', {className: 'text-white leading-relaxed whitespace-pre-wrap'}, msg.content)
        : h('div', {className: 'md text-sm', dangerouslySetInnerHTML: {__html: msg.content}})
    )
  );
}

function ChatArea(props) {
  var modeId = props.modeId, messages = props.messages, isThinking = props.isThinking, profile = props.profile;
  var onSend = props.onSend, onClear = props.onClear;
  var inputState = useState('');
  var input = inputState[0], setInput = inputState[1];
  var endRef = useRef(null), inpRef = useRef(null);
  var mode = modes.find(function(m) { return m.id === modeId; });
  var mc = modeColors[modeId];

  useEffect(function() {
    if (endRef.current) endRef.current.scrollIntoView({behavior: 'smooth'});
  }, [messages, isThinking]);

  useEffect(function() {
    if (inpRef.current) inpRef.current.focus();
  }, [modeId]);

  function submit(e) {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  }

  function WelcomeCard() {
    if (messages.length > 0) return null;
    var iconEl, title, subtitle, tips, actions;
    if (modeId === 'career-prep') {
      iconEl = h(Icons.Sparkles, {className: 'text-blue-600'});
      title = '求职准备方案';
      var pfStr = profile ? (profile.major + ' · ' + profile.target) : '';
      subtitle = '基于专业背景与目标岗位，生成结构化准备清单';
      tips = profile ? '请补充您的技能栈与实践经历' : '请先完成个人信息，AI将据此制定针对性方案';
      actions = ['补充技能与经历', '直接生成清单'].map(function(t) {
        return h('button', {key: t, onClick: function() { onSend(t); }, className: 'px-3 py-1.5 text-xs rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 transition'}, t);
      });
    } else if (modeId === 'resume-polish') {
      iconEl = h(Icons.FileText, {className: 'text-orange-600'});
      title = 'STAR法则简历重构'; subtitle = '结构化追问 + 量化成果提炼';
      tips = '描述一段项目或实习经历，AI将引导您补充关键细节并重构为标准STAR框架';
      actions = h('button', {onClick: function() { onSend('开始'); }, className: 'px-5 py-2 bg-orange-600 text-white rounded-xl text-sm hover:bg-orange-700 transition'}, '开始对话');
    } else if (modeId === 'daily-tasks') {
      iconEl = h(Icons.CheckSquare, {className: 'text-emerald-600'});
      title = '每日学习计划'; subtitle = '可验证任务编排 + 进度追踪';
      tips = null;
      actions = h('button', {onClick: function() { onSend('生成今日任务'); }, className: 'px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm hover:bg-emerald-700 transition'}, '生成今日任务');
    } else if (modeId === 'offer-analysis') {
      iconEl = h(Icons.TrendingUp, {className: 'text-purple-600'});
      title = 'Offer决策分析'; subtitle = 'SWOT四象限 + 三年发展推演';
      tips = '输入格式：Offer A: 公司 岗位 薪资 城市 规模 | Offer B: 公司 岗位 薪资 城市 规模';
      actions = null;
    }
    var colorMap = {'career-prep': {border:'border-blue-100',bg:'bg-blue-100'},
      'resume-polish': {border:'border-orange-100',bg:'bg-orange-100'},
      'daily-tasks': {border:'border-emerald-100',bg:'bg-emerald-100'},
      'offer-analysis': {border:'border-purple-100',bg:'bg-purple-100'}};
    var cc = colorMap[modeId];
    return h('div', {style: {animation: 'slideUp .4s ease-out'}, className: 'bg-white rounded-2xl border ' + cc.border + ' shadow-sm p-6 mx-4 mt-4'},
      h('div', {className: 'flex items-center gap-3 mb-3'},
        h('div', {className: 'w-10 h-10 rounded-xl ' + cc.bg + ' flex items-center justify-center'}, iconEl),
        h('div', null, h('h3', {className: 'font-semibold text-gray-800'}, title), h('p', {className: 'text-sm text-gray-500'}, subtitle))
      ),
      tips ? h('p', {className: 'text-sm text-gray-500 mb-4'}, tips) : null,
      h('div', {className: 'flex gap-2 flex-wrap'}, actions)
    );
  }

  return h('div', {className: 'flex flex-col h-full'},
    h('div', {className: 'px-6 py-4 border-b ' + mc.border + ' bg-white flex items-center justify-between'},
      h('div', {className: 'flex items-center gap-3'},
        h('div', {className: 'w-9 h-9 rounded-lg ' + mc.lt + ' flex items-center justify-center'}, h(Icons[mode.icon])),
        h('div', null, h('h2', {className: 'font-semibold text-gray-800 text-sm'}, mode.name), h('p', {className: 'text-xs text-gray-400'}, mode.desc))
      ),
      h('div', {className: 'flex items-center gap-2'},
        profile ? h('div', {className: 'hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-xs'},
          h(Icons.User, {w: 14, h: 14, className: 'text-blue-500'}),
          h('span', {className: 'text-gray-600'}, profile.education + ' · ' + profile.major + ' · ' + profile.target)
        ) : null,
        messages.length > 0 ? h('button', {onClick: onClear, className: 'text-xs text-gray-400 hover:text-red-500 transition flex items-center gap-1'}, h(Icons.Trash2), '清空') : null
      )
    ),
    h('div', {className: 'flex-1 overflow-y-auto scrollbar px-4 py-4'},
      h(WelcomeCard),
      messages.map(function(m, i) { return h(MessageBubble, {key: i, msg: m, mid: modeId}); }),
      isThinking ? h('div', {className: 'flex items-center gap-1 px-4 py-3'}, h('span', {className: 'dot'}), h('span', {className: 'dot'}), h('span', {className: 'dot'})) : null,
      h('div', {ref: endRef})
    ),
    h('div', {className: 'px-4 py-3 border-t ' + mc.border + ' bg-white'},
      h('form', {onSubmit: submit, className: 'flex items-end gap-2'},
        h('textarea', {
          ref: inpRef, value: input,
          onChange: function(e) { setInput(e.target.value); },
          onKeyDown: function(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } },
          placeholder: '输入你的问题...', rows: 1,
          className: 'flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200',
          style: {maxHeight: '120px'}
        }),
        h('button', {type: 'submit', disabled: !input.trim(), className: 'shrink-0 w-10 h-10 rounded-xl ' + mc.btn + ' text-white flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed'},
          h(Icons.Send)
        )
      )
    )
  );
}

// ===== APP ROOT COMPONENT =====
function App() {
  var profileState = useState(null);
  var profile = profileState[0], setProfile = profileState[1];
  var modeState = useState('career-prep');
  var modeId = modeState[0], setModeId = modeState[1];
  var sidebarState = useState(true);
  var sidebar = sidebarState[0], setSidebar = sidebarState[1];
  var msgsState = useState({});
  var messages = msgsState[0], setMessages = msgsState[1];
  var thinkingState = useState({});
  var thinking = thinkingState[0], setThinking = thinkingState[1];
  var resumeIdxState = useState({});
  var resumeIdx = resumeIdxState[0], setResumeIdx = resumeIdxState[1];
  var currentMsgs = messages[modeId] || [];
  var currentThinking = thinking[modeId] || false;

  function parseInput(text) {
    var parts = text.split('|');
    if (parts.length === 2 && (text.indexOf('Offer') === 0 || text.indexOf('offer') === 0)) {
      function parseOffer(str) {
        str = str.replace(/Offer\s*[AB]:?\s*/i, '').trim();
        var pieces = str.split(/\s+/);
        return { company: pieces[0] || '', salary: pieces[1] || '', city: pieces[2] || '', size: pieces.slice(3).join(' ') || '' };
      }
      return { type: 'offer', offer1: parseOffer(parts[0]), offer2: parseOffer(parts[1]) };
    }
    return { type: 'general', text: text };
  }

  function handleSend(text) {
    var newMsgs = (messages[modeId] || []).concat([{ role: 'user', content: text }]);
    var u1 = Object.assign({}, messages); u1[modeId] = newMsgs; setMessages(u1);
    var u2 = Object.assign({}, thinking); u2[modeId] = true; setThinking(u2);

    // Build API messages
    var apiMessages = [
      { role: 'system', content: systemPrompts[modeId] || systemPrompts['career-prep'] }
    ];

    // Inject user profile as context
    if (profile) {
      apiMessages.push({
        role: 'system',
        content: '【用户背景】学历：' + profile.education + ' | 年龄：' + profile.age + '岁 | 专业：' + profile.major + ' | 求职意向：' + profile.target
      });
    }

    apiMessages.push({ role: 'user', content: text });

    fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 4096
      })
    })
    .then(function(res) {
      if (!res.ok) { return res.text().then(function(t) { throw new Error('API ' + res.status + ': ' + t); }); }
      return res.json();
    })
    .then(function(data) {
      var rawContent = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
      var response = typeof marked !== 'undefined' ? marked.parse(rawContent) : rawContent;
      var updatedMsgs = (messages[modeId] || []).concat([{ role: 'ai', content: response }]);
      var u3 = Object.assign({}, messages); u3[modeId] = updatedMsgs; setMessages(u3);
      var u4 = Object.assign({}, thinking); u4[modeId] = false; setThinking(u4);
    })
    .catch(function(err) {
      console.error('DeepSeek API error:', err);
      var errHtml = '<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;">' +
        '<strong style="color:#dc2626;">API 调用失败</strong>' +
        '<p style="color:#991b1b;font-size:13px;margin:4px 0;">' + err.message + '</p>' +
        '<p style="color:#991b1b;font-size:12px;">请检查 API Key 和网络连接后重试。</p></div>';
      var updatedMsgs = (messages[modeId] || []).concat([{ role: 'ai', content: errHtml }]);
      var u3 = Object.assign({}, messages); u3[modeId] = updatedMsgs; setMessages(u3);
      var u4 = Object.assign({}, thinking); u4[modeId] = false; setThinking(u4);
    });
  }

  function handleClear() {
    var newMsgs = Object.assign({}, messages);
    newMsgs[modeId] = [];
    setMessages(newMsgs);
    var newRI = Object.assign({}, resumeIdx);
    newRI[modeId] = 0;
    setResumeIdx(newRI);
  }

  if (!profile) {
    return h(OnboardingForm, { onSubmit: function(p) { setProfile(p); } });
  }

  return h('div', {className: 'flex h-screen overflow-hidden bg-gray-50'},
    sidebar ? h('div', {className: 'fixed inset-0 bg-black/30 z-20 lg:hidden', onClick: function() { setSidebar(false); }}) : null,
    h('div', {className: (sidebar ? 'translate-x-0' : '-translate-x-full') + ' fixed lg:relative z-30 lg:translate-x-0 w-64 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-300'},
      h('div', {className: 'p-5 border-b border-gray-100'},
        h('div', {className: 'flex items-center gap-3 mb-2'},
          h('div', {className: 'w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center'},
            h(Icons.Sparkles, {w: 22, h: 22, className: 'text-white'})
          ),
          h('div', null,
            h('h1', {className: 'font-bold text-gray-800 text-base'}, 'CareerAI'),
            h('p', {className: 'text-xs text-gray-400'}, 'AI 求职助手')
          )
        ),
        profile ? h('div', {className: 'mt-3 pt-3 border-t border-gray-100'},
          h('div', {className: 'flex items-center gap-2'},
            h('div', {className: 'w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center'}, h(Icons.User, {w: 14, h: 14, className: 'text-blue-600'})),
            h('div', {className: 'min-w-0'},
              h('p', {className: 'text-xs font-medium text-gray-700 truncate'}, profile.target),
              h('p', {className: 'text-xs text-gray-400 truncate'}, profile.education + ' · ' + profile.major + ' · ' + profile.age + '岁')
            )
          )
        ) : null
      ),
      h('div', {className: 'flex-1 overflow-y-auto scrollbar py-3 px-3'},
        h('p', {className: 'text-xs text-gray-400 font-medium px-2 mb-2 uppercase tracking-wider'}, '功能模块'),
        modes.map(function(m) {
          var isActive = modeId === m.id;
          var mc2 = modeColors[m.id];
          return h('button', {
            key: m.id, onClick: function() { setModeId(m.id); setSidebar(false); },
            className: 'w-full text-left px-3 py-3 rounded-xl mb-1.5 transition-all duration-200 flex items-start gap-3 ' +
              (isActive ? mc2.act + ' shadow-sm' : 'hover:bg-gray-50')
          },
            h('div', {className: 'w-9 h-9 rounded-lg ' + (isActive ? mc2.lt : 'bg-gray-100') + ' flex items-center justify-center shrink-0'},
              h(Icons[m.icon], {className: isActive ? mc2.text : 'text-gray-500'})
            ),
            h('div', {className: 'min-w-0'},
              h('div', {className: 'text-sm font-medium ' + (isActive ? 'text-gray-800' : 'text-gray-600')}, m.name),
              h('div', {className: 'text-xs ' + (isActive ? 'text-gray-500' : 'text-gray-400') + ' mt-0.5 leading-relaxed'}, m.desc)
            )
          );
        })
      ),
      h('div', {className: 'p-4 border-t border-gray-200'},
        h('div', {className: 'flex items-center gap-2 text-xs text-gray-400'},
          h('div', {className: 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse'}), 'Powered by DeepSeek · v2.0'
        )
      )
    ),
    h('div', {className: 'flex-1 flex flex-col min-w-0'},
      h('div', {className: 'lg:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white'},
        h('button', {onClick: function() { setSidebar(true); }, className: 'text-gray-500'}, h(Icons.Menu)),
        h('span', {className: 'font-semibold text-gray-800 text-sm'}, (modes.find(function(m2) { return m2.id === modeId; }) || {}).name || 'CareerAI')
      ),
      h(ChatArea, {modeId: modeId, messages: currentMsgs, isThinking: currentThinking, onSend: handleSend, onClear: handleClear, profile: profile})
    )
  );
}

ReactDOM.render(h(App), document.getElementById('root'));

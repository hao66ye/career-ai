// CareerAI - Vercel Serverless Function
// 代理到 DeepSeek API，解决 CORS 问题
export default async function handler(req, res) {
  // CORS 预检
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持 POST 请求' });
  }

  const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;
  if (!DEEPSEEK_KEY) {
    return res.status(500).json({ error: '服务器未配置 DEEPSEEK_KEY 环境变量' });
  }

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + DEEPSEEK_KEY
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // 透传 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('DeepSeek proxy error:', err.message);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(502).json({ error: 'DeepSeek API 不可达: ' + err.message });
  }
}

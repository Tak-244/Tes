import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { base, info } = req.query;
  if (!base || !info) {
    return res.status(400).json({ error: 'Faltam parâmetros base ou info.' });
  }

  const key = 'WM3t-Av5u-thfP-GiBV-sM3B';
  const url = `https://voidsearch.localto.net/api/search?Access-Key=${key}&Base=${base}&Info=${info}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    // Tenta parsear JSON; em erro, retorna raw para debugging
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      return res.status(500).json({ error: 'Resposta não é JSON', raw: text });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erro no fetch externo', details: err.message });
  }
}

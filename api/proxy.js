import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { base, info } = req.query;

  if (!base || !info) {
    return res.status(400).json({ error: 'Parâmetros base e info são obrigatórios.' });
  }

  const accessKey = 'WM3t-Av5u-thfP-GiBV-sM3B';
  const url = `https://voidsearch.localto.net/api/search?Access-Key=${accessKey}&Base=${base}&Info=${info}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: `Erro na API externa: ${response.statusText}` });
    }

    const data = await response.json();

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor proxy.', details: error.message });
  }
}

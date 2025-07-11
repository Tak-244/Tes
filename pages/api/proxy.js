export default async function handler(req, res) {
  const { base, info } = req.query;

  if (!base || !info) {
    return res.status(400).json({ error: "Parâmetros 'base' e 'info' são obrigatórios." });
  }

  const url = `https://voidsearch.localto.net/api/search?Access-Key=WM3t-Av5u-thfP-GiBV-sM3B&Base=${base}&Info=${info}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar dados da API.", detalhes: err.message });
  }
}

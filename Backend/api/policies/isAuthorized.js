const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token de autenticação não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    return proceed();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};

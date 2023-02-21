const CAST_ERROR = 'CastError';
const VALIDATION_ERROR = 'Validation failed';
const allowedCors = ['https://amelin.mesto.nomoredomains.icu', 'http://localhost:3000'];
const backendUrl = {
  local: 'http://localhost:3001',
  deploy: 'https://amelin.mesto.backend.nomoredomains.icu',
};

module.exports = {
  CAST_ERROR,
  VALIDATION_ERROR,
  allowedCors,
  backendUrl,
};

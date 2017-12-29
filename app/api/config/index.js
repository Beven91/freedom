export default {
  API: 'https://demo.api.com',
  VENYLOG: 'https://demo.log.com/l.gif',
  ...(process.env.NODE_ENV === "production") ? require('./production.js') : require('./development.js')
}
import rateLimit from 'express-rate-limit';

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const rateMinute: any = process.env.RATE_MINUTE!! || 15;
const rateMax: any = process.env.RATE_MAX || 100;

export default rateLimit({
  windowMs: rateMinute * 60 * 1000,
  max: rateMax,
});

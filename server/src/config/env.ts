export type NodeEnvironment = 'development' | 'production' | 'test';

export interface AppEnv {
  port: number;
  mongodbUri: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  clientUrl: string;
  nodeEnv: NodeEnvironment;
}

function requireString(name: string, value: string | undefined): string {
  if (value === undefined || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const nodeEnvRaw = process.env.NODE_ENV ?? 'development';
const nodeEnv: NodeEnvironment =
  nodeEnvRaw === 'production' || nodeEnvRaw === 'test'
    ? nodeEnvRaw
    : 'development';

const portRaw = process.env.PORT ?? '5000';
const port = Number.parseInt(portRaw, 10);
if (Number.isNaN(port) || port <= 0) {
  throw new Error('PORT must be a positive integer');
}

export const env: AppEnv = {
  port,
  mongodbUri: requireString('MONGODB_URI', process.env.MONGODB_URI),
  razorpayKeyId: requireString('RAZORPAY_KEY_ID', process.env.RAZORPAY_KEY_ID),
  razorpayKeySecret: requireString(
    'RAZORPAY_KEY_SECRET',
    process.env.RAZORPAY_KEY_SECRET
  ),
  clientUrl: requireString('CLIENT_URL', process.env.CLIENT_URL),
  nodeEnv,
};

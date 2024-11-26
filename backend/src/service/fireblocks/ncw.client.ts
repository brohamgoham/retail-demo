import { FireblocksSDK } from "fireblocks-sdk";
import { readFileSync } from 'fs';
import { FireblocksRateLimiter } from '@util/rateLimiter';
import { endpointLimits } from '@util/endpointLimits';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { BasePath } from "@fireblocks/ts-sdk";
require('dotenv').config();
export interface Clients {
    signer: FireblocksSDK;
    admin: FireblocksSDK;
  }

  
  const pathToSecret = process.env.FIREBLOCKS_PATH_TO_SECRET_NCW;
  const secretKey = readFileSync(pathToSecret!, 'utf8');
  const signerApiKey = process.env.FIREBLOCKS_API_KEY_NCW_SIGNER;
  const adminApiKey = process.env.FIREBLOCKS_API_KEY_NCW_ADMIN;
  
  class NCWClient {
    public fireblocksClient: Clients
    private rateLimiter: FireblocksRateLimiter;
  
    constructor(basePath?: BasePath) {
      this.rateLimiter = new FireblocksRateLimiter(endpointLimits);
  
      try {
        const axiosInstance = axios.create({
          timeout: 30000,
        });
  
        // Add a request interceptor to handle rate limiting and Idempotency-Key
        axiosInstance.interceptors.request.use(async (config) => {
          const endpoint = config.url?.split('?')[0] || '';
          const method = config.method?.toUpperCase() || 'GET';
          await this.rateLimiter.throttle(endpoint, method);
  
          // Add Idempotency-Key header for POST requests, except for /v1/transactions
          if (method === 'POST' && !endpoint.endsWith('/v1/ncw')) {
            config.headers['X-End-User-Wallet-Id'] = randomUUID();
          }
  
          return config;
        });
  
        this.fireblocksClient = {
          signer: new FireblocksSDK(
            signerApiKey,
            secretKey,
            basePath || BasePath.US
          ),
          admin: new FireblocksSDK(
            adminApiKey,
            secretKey,
            basePath || BasePath.US
          )
        };
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  }
  
  const ncwClient = new NCWClient();
  export default ncwClient;
  
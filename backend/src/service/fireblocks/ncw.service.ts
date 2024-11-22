
  import apiClient from './api.client';
  import { createLogger } from '@util/logger.utils';
  import { FireblocksSDK } from "fireblocks-sdk";

  const logger = createLogger('<Fireblocks Embedded Wallets Service>');
  
  class FireblocksNCWService {
    private ncwAPI: FireblocksSDK;
    
  }
  
  export const fireblocksNCWService = new FireblocksNCWService();
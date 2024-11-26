
  import apiClient from './api.client';
  import { createLogger } from '@util/logger.utils';
  import { FireblocksSDK } from "fireblocks-sdk";

  const logger = createLogger('<Fireblocks Embedded Wallets Service>');
  
  class FireblocksNCWService {
    private ncwAPI: FireblocksSDK;

    constructor() {
      // Needs a NCW Signer API Key  
      this.ncwAPI = new FireblocksSDK(process.env.FIREBLOCKS_NCW_KEY, process.env.FIREBLOCKS_API_SECRET, process.env.FIREBLOCKS_API_URL);
    }

    async getDeviceStatus(walletId: string) {
      try {
        const res = await this.ncwAPI.NCW.getLatestBackup(walletId);
        return res;
      } catch (error) {
        logger.error(`Error getting device status for wallet ${walletId}: ${error}`);
        throw error;
      }
    }

    async getDeviceSetupStatus(deviceId: string, walletId: string) {
    try {
      const res = await this.ncwAPI.NCW.getDeviceSetupStatus(deviceId, walletId);
      return res;
    } catch (error) {
      logger.error(`Error getting device setup status for device ${deviceId} and wallet ${walletId}: ${error}`);
      throw error;
    }
  }
}
  
  export const fireblocksNCWService = new FireblocksNCWService();
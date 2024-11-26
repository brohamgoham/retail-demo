
  import ncwClient from './ncw.client';
  import { createLogger } from '@util/logger.utils';

  const logger = createLogger('<Fireblocks Embedded Wallets Service>');
  
  class FireblocksNCWService {


    async getDeviceStatus(walletId: string) {
      try {
        const res = await ncwClient.fireblocksClient.signer.NCW.getLatestBackup(walletId);
        return res;
      } catch (error) {
        logger.error(`Error getting device status for wallet ${walletId}: ${error}`);
        throw error;
      }
    }

    async getDeviceSetupStatus(deviceId: string, walletId: string) {
    try {
      const res = await ncwClient.fireblocksClient.signer.NCW.getDeviceSetupStatus(deviceId, walletId);
      return res;
    } catch (error) {
      logger.error(`Error getting device setup status for device ${deviceId} and wallet ${walletId}: ${error}`);
      throw error;
    }
  }
}
  
  export const fireblocksNCWService = new FireblocksNCWService();
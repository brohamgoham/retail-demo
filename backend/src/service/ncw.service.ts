import { createLogger } from '@util/logger.utils';
import { FireblocksSDK } from "fireblocks-sdk";
import fs from 'fs';
import path from 'path';

const logger = createLogger('<Fireblocks Embedded Wallets Service>');

const secretKey = fs.readFileSync(path.resolve("./keys/retail-ncw.key"), "utf8");
const adminApiKey = process.env.FIREBLOCKS_API_KEY_NCW_ADMIN;
const fireblocksSDK = new FireblocksSDK(secretKey, adminApiKey, "https://api.fireblocks.io");

export class FireblocksNCWService {
  async getDeviceStatus(walletId: string) {
    try {
      const res = await fireblocksSDK.NCW.getWallet(walletId);

      return res;
    } catch (error) {
      logger.error(`Error getting device status for wallet ${walletId}: ${error}`);
      throw error;
    }
  }

  // TODO: Fix this once I have a completed device so I can actually get a device w keys
  async getDeviceSetupStatus(deviceId: string, walletId: string) {
    try {
      const res = await fireblocksSDK.NCW.getDeviceSetupStatus(deviceId, walletId);
      return res;
    } catch (error) {
      logger.error(`Error getting device setup status for device ${deviceId} and wallet ${walletId}: ${error}`);
      throw error;
    }
  }
}

export const fireblocksNCWService = new FireblocksNCWService();
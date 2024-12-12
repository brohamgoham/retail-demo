import { createLogger } from '@util/logger.utils';
import { FireblocksSDK } from "fireblocks-sdk";
import fs from 'fs';
import path from 'path';

const logger = createLogger('<Fireblocks Embedded Wallets Service>');

const secretKey = fs.readFileSync(path.resolve("./keys/retail-ncw.key"), "utf8");
const adminApiKey = process.env.FIREBLOCKS_API_KEY_NCW_ADMIN;
const signerApiKey = process.env.FIREBLOCKS_API_KEY_NCW_SIGNER;
const fireblocksSDK = new FireblocksSDK(secretKey, adminApiKey, "https://api.fireblocks.io");
const fireblocksSDKSigner = new FireblocksSDK(secretKey, signerApiKey, "https://api.fireblocks.io");

export class FireblocksNCWService {
  async getDeviceStatus(walletId: string) {
    try {
      logger.info(`Getting device status for wallet ${walletId}`);
      const res = await fireblocksSDK.NCW.getWalletSetupStatus(walletId);
      logger.info(`Device status for wallet ${walletId}: ${res}`);
      return res;
    } catch (error) {
      logger.error(`Error getting device status for wallet ${walletId}: ${error}`);
      throw error;
    }
  }

  async getDeviceSetupStatus(deviceId: string, walletId: string) {
    try {
      logger.info(`Getting device setup status for device ${deviceId} and wallet ${walletId}`);
      const res = await fireblocksSDK.NCW.getDeviceSetupStatus(deviceId, walletId);
      return res;
    } catch (error) {
      logger.error(`Error getting device setup status for device ${deviceId} and wallet ${walletId}: ${error}`);
      throw error;
    }
  }

  /**
   * Get NCW wallet devices
   *
   * @param {string} walletId
   * @return {*}  {Promise<NCW.Device>}
   */
  async getWalletDevices(walletId: string) {
    try {
      logger.info(`Getting wallet devices for wallet ${walletId}`);
      const res = await fireblocksSDK.NCW.getWalletDevices(walletId);
      return res;
    } catch (error) {
      logger.error(`Error getting wallet devices for wallet ${walletId}: ${error}`);
      throw error;
    }
  }

  /**
   * Set NCW wallet device's enabled state
   *
   * @param {string} walletId
   * @param {string} deviceId
   * @param {boolean} enabled
   * @return {*}  {Promise<void>}
   */
  async enableWalletDevice(walletId: string, enabled: boolean) {
    try {
      logger.info(`Enabling wallet ${walletId} with enabled state ${enabled}`);
      const res = await fireblocksSDK.NCW.enableWallet(walletId, enabled);
      return res;
    } catch (error) {
      logger.error(`Error enabling wallet ${walletId}: ${error}`);
      throw error;
    }
  }

  async invokeWalletRpc(walletId: string, deviceId: string, payload: string) {
    try {
      logger.info(`Invoking wallet RPC for wallet ${walletId} and device ${deviceId} with payload ${payload}`);
      const res = await fireblocksSDK.NCW.invokeWalletRpc(walletId, deviceId, payload);
      logger.info(`Wallet RPC response for wallet ${walletId} and device ${deviceId}: ${res}`);
      return res;
    } catch (error) {
      logger.error(`Error invoking wallet RPC for wallet ${walletId} and device ${deviceId}: ${error}`);
      throw error;
    }
  }
  
}

export const fireblocksNCWService = new FireblocksNCWService();
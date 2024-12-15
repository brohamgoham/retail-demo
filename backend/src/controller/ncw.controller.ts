import { Request, Response } from 'express';
import { fireblocksNCWService } from '@service/ncw.service';

export class NCWController {
  static async getDeviceStatus(req: Request, res: Response) {
    const { walletId } = req.params;
    try {
      const deviceStatus = await fireblocksNCWService.getDeviceStatus(walletId);
      return res.status(200).json(deviceStatus);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getDeviceSetupStatus(req: Request, res: Response) {
    const { deviceId, walletId } = req.params;
    try {
      const setup = await fireblocksNCWService.getDeviceSetupStatus(deviceId, walletId);
      const keySetup = setup.setupStatus.map((key) => ({
        status: key.status,
        algorithmName: key.algorithmName,
        confirmed: key.confirmed,
        backedUp: key.backedUp
      }));
      const setupStatus = {
        status: setup.status,
        deviceId: setup.deviceId,
        keySetup: keySetup
      }
      return res.status(200).json(setupStatus);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getWalletDevices(req: Request, res: Response) {
    const { walletId } = req.params;
    try {
      const walletDevices = await fireblocksNCWService.getWalletDevices(walletId);
      console.log("getWalletDevices=>", walletDevices);
      const devices = walletDevices.map((device) => ({
        deviceId: device.deviceId,
        enabled: device.enabled
      }));
      return res.status(200).json(devices);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async enableWallet(req: Request, res: Response) {
    const { walletId } = req.params;
    const { enabled } = req.body;
    try {
      await fireblocksNCWService.enableWalletDevice(walletId, enabled);
      console.log("enableWalletDevice=>?", enabled);
      return res.status(201).json({ message: `Wallet device enabled status set to ${enabled}`, enabled });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getWalletAssets(req: Request, res: Response) {
    const { walletId, accountId } = req.params;
    try {
      const addr = await fireblocksNCWService.getWalletAssets(walletId, 0);
      console.log("getWalletAssets=>", addr);
      return res.status(200).json(addr);
    } catch (error) {
      console.error('Error getting wallet assets:', error);
      return res.status(404).json({ error: error.message });
    }
  }

  static async invokeWalletRpc(req: Request, res: Response) {
    const { walletId, deviceId } = req.params;
    const { payload } = req.body;
    try {
      const invoke = await fireblocksNCWService.invokeWalletRpc(walletId, deviceId, payload);
      console.log("invokeWalletRpc=>", invoke);
      return res.status(200).json(res);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getLatestBackup(req: Request, res: Response) {
    const { walletId } = req.params;
    try {
      const latest = await fireblocksNCWService.getLatestBackup(walletId);
      console.log(
        'getLatestBackup =>', latest
      );
      const backup = latest.keys.map((key) => ({
        deviceId: key.deviceId,
        publicKey: key.publicKey,
        keyId: key.keyId,
        algorithm: key.algorithm
      }));
      console.log("backup=>", backup);
      const backupResponse = {
        passphraseId: latest.passphraseId,
        createdAt: latest.createdAt,
        keys: backup
      };
      res.status(200).json(backupResponse);
    } catch (error) {
      return res.status(404).json({ error: error.message});
    }
  }
}

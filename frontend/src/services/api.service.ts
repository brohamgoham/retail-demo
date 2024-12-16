import axiosInstance from "./axios.service";
import * as urls from "../lib/constants";
import authStore from "@/store/authStore";
import terminalStore from "@/store/terminalStore";
import { TransactionParams } from "@/lib/types";

class ApiService {
  /**
   * Fetches the user's wallet
   * @returns {Promise<any>} The wallet data
   */
  getWallet = async () => {
    try {
      return (await axiosInstance.get(urls.WALLET)).data;
    } catch (error) {
      console.error("Error fetching wallets:", error);
      throw error;
    }
  };

  /**
   * Creates a new wallet for the user
   * @returns {Promise<any>} The newly created wallet data
   */
  createUserWallet = async () => {
    try {
      const newWallet = await axiosInstance.post(urls.WALLET);
      console.log("Created a new wallet for the user:", newWallet)
      return newWallet.data;
    } catch (error) {
      console.log("Failed to create user wallet for user:", authStore.user.id);
      throw error;
    }
  };

  getWalletAssets = async (walletId: string) => {
    try {
      const url = urls.getAssetsUrl(walletId);
      return (await axiosInstance.get(url)).data;
    } catch (error) {
      console.error("Error fetching wallet assets:", error);
    }
  };

  createWalletAsset = async (walletId: string, assetId: string) => {
    try {
      const url = urls.getAssetsUrl(walletId);
      const newAsset = axiosInstance.post(url, {
        assetId,
      });
      return newAsset;
    } catch (error) {
      console.error("Error creating wallet assets:", error);
    }
  };

  createTransaction = async (
    amount: string,
    assetId: string,
    destination: string,
    feeLevel: string
  ) => {
    try {
      const transactionRequest = {
        amount,
        assetId,
        feeLevel,
        destination: {
          type: "ONE_TIME_ADDRESS",
          oneTimeAddress: {
            address: destination,
          },
        },
      };
      const res = await axiosInstance.post(urls.SUBMIT_TRANSACTION, {
        transactionRequest,
      });
      const message = `${new Date().toISOString()}: Created a new transaction from the withdrawal vault account. We have 3 withdrawal vault accounts and we are randomly creating transactions from these when users want to withdraw their funds.`
      terminalStore.addLog(message)
      return res.data; 
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  async getTransactions() {
    const response = await axiosInstance.get(urls.TRANSCATIONS);
    return response.data;
  }

  async getTxFee(txData: TransactionParams) {
    const response = await axiosInstance.post(urls.TRANSCATIONS, { transactionRequest: txData });
    return response.data;
  }

  /**
   * Fetches the device status by wallet ID
   * @param {string} walletId - The ID of the wallet
   * @returns {Promise<any>} The device status data
   */
  getDeviceSetupStatus = async (walletId: string, deviceId: string) => {
    try {
      const res = await axiosInstance.get(urls.getDeviceSetupStatus(walletId, deviceId));
      console.log("Running get Device SETUP Status");
      return res.data;
    } catch (error) {
      console.error("Failed to get device setup status");
      throw error;
    }
  }

  async getDeviceStatus(walletId: string) {
    try {
      const res = await axiosInstance.get(urls.getDeviceEw(walletId));
      console.log("Running get Device Status");
      return res.data;
    } catch (error) {
      console.error("ERROR calling NCW backend, check API key is NCW admin/signer");
      throw error;
    }
  }

  async getWalletDevices(walletId: string) {
    try {
      const res = await axiosInstance.get(urls.getWalletDevices(walletId));
      console.log("getWalletDevices FE=>", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching wallet devices:", error);
      throw error;
    }
  }

  async enableWallet(walletId: string, enabled: boolean) {
    try {
      const res = await axiosInstance.put(urls.NCW_ENABLE_WALLET(walletId), { enabled });
      return res.data;
    } catch (error) {
      console.error("Error enabling wallet device:", error);
      throw error;
    }
  }

  async invokeWalletRpc(walletId: string, deviceId: string, payload: any) {
    try {
      const res = await axiosInstance.post(urls.NCW_INVOKE_WALLET_RPC(walletId, deviceId), { payload });
      return res.data;
    } catch (error) {
      console.error("Error invoking wallet RPC:", error);
      throw error;
    }
  }

  async getLatest(walletId: string) {
    try {
      const res = await axiosInstance.get(urls.NCW_LATEST(walletId));
      return res.data;
    } catch (error) {
      console.error("Error no backup found", error);
      throw error;
    }
  }

  async getAddresses(walletId: string, accountId: string) {
    try {
      if (!walletId || !accountId) {
        throw new Error('Wallet ID and Account ID are required');
      }
      const res = await axiosInstance.get(urls.getWalletAssets(walletId, accountId));
      return res.data;
    } catch (error) {
      console.error('No Address', error);
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;

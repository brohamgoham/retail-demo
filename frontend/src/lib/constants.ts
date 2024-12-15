import 'dotenv/config';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const WALLET = `${BACKEND_BASE_URL}/wallet`
export const getAssetsUrl = (walletId: string) => `${WALLET}/${walletId}/assets`;
export const AUTH = `${BACKEND_BASE_URL}/auth`
export const SUPPORTED_ASSETS = `${BACKEND_BASE_URL}/supported-assets`
export const TRANSCATIONS = `${BACKEND_BASE_URL}/transactions`
export const SUBMIT_TRANSACTION = `${TRANSCATIONS}/submit`

export const EW =`${BACKEND_BASE_URL}/ew`
//export const NCW_GET_DEVICE_SETUP_STATUS = (walletId: string, deviceId: string) => `${EW}/device/setup/${deviceId}/${walletId}`
export const getDeviceEw = (walletId: string) => `${EW}/device/${walletId}` // getWalletSetupStatus
export const getWalletDevices = (walletId: string) =>  `${EW}/wallet/${walletId}` // getWalletDevices
export const getDeviceSetupStatus = (walletId: string, deviceId: string) => `${EW}/device/setup/${walletId}/${deviceId}`

export const NCW_ENABLE_WALLET = (walletId: string) => `${EW}/wallet/enable/${walletId}`
export const NCW_INVOKE_WALLET_RPC = (walletId: string, deviceId: string) => `${EW}/invoke/${walletId}/${deviceId}`
export const NCW_LATEST = (walletId: string) => `${EW}/wallet/latest/${walletId}`
export const getWalletAssets = (walletId: string, accountId: string) => `${EW}/wallet/assets/${walletId}/${accountId}`
import { NCWController } from '@controller/ncw.controller';
import { Router } from 'express';

const router = Router();

router.get(
    '/device/:walletId',
    NCWController.getDeviceStatus
  )

  router.get(
    '/device/setup/:deviceId/:walletId',
    NCWController.getDeviceSetupStatus
  )
  router.get(
  '/wallet/assets/:walletId/:accountId',
  NCWController.getWalletAssets
)
  router.get(
    '/wallet/:walletId',
    NCWController.getWalletDevices
  )

  router.get(
  '/wallet/latest/:walletId',
  NCWController.getLatestBackup
)

  router.put(
    '/wallet/enable/:walletId',
    NCWController.enableWallet
  )

  router.post(
    '/invoke/:walletId/:deviceId',
    NCWController.invokeWalletRpc
  )

  export default router;

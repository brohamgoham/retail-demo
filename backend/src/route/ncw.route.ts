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
    '/wallet/:walletId',
    NCWController.getWalletDevices
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
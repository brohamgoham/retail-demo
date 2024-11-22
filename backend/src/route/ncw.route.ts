import { NCWController } from '@controller/ncw.controller';
import { Router } from 'express';

const router = Router();

router.get(
    '/device',
    NCWController.getDeviceStatus
  )
  
  
  
  export default router;
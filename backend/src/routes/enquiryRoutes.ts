import express from 'express';
import {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController';

const router = express.Router();

router.route('/').get(getEnquiries).post(createEnquiry);
router
  .route('/:id')
  .get(getEnquiryById)
  .patch(updateEnquiryStatus)
  .delete(deleteEnquiry);

export default router;

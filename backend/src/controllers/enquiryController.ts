import { Request, Response, NextFunction } from 'express';
import Enquiry from '../models/Enquiry';

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Public
export const getEnquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Public
export const getEnquiryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (enquiry) {
      res.json(enquiry);
    } else {
      res.status(404);
      throw new Error('Enquiry not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create an enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, userType, serviceOfInterest, message } = req.body;

    // Basic Validation
    if (!name || !email || !phone || !userType || !serviceOfInterest || !message) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      userType,
      serviceOfInterest,
      message,
    });

    const createdEnquiry = await enquiry.save();
    res.status(201).json(createdEnquiry);
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id
// @access  Public
export const updateEnquiryStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (enquiry) {
      enquiry.status = status || enquiry.status;
      const updatedEnquiry = await enquiry.save();
      res.json(updatedEnquiry);
    } else {
      res.status(404);
      throw new Error('Enquiry not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Public
export const deleteEnquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (enquiry) {
      await enquiry.deleteOne();
      res.json({ message: 'Enquiry removed' });
    } else {
      res.status(404);
      throw new Error('Enquiry not found');
    }
  } catch (error) {
    next(error);
  }
};

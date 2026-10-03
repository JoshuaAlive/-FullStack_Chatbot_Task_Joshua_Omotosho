import mongoose, { Document, Schema } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  userType: 'Student' | 'Customer' | 'Other';
  serviceOfInterest: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    userType: {
      type: String,
      enum: ['Student', 'Customer', 'Other'],
      required: true,
    },
    serviceOfInterest: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model<IEnquiry>('Enquiry', enquirySchema);

export default Enquiry;

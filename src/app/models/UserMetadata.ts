
import mongoose from 'mongoose';

const UserMetadataSchema = new mongoose.Schema({
  clerkUserId: { type: String, unique: true },
  email: String,
  plan: { type: String, default: 'free' },
  createdAt: Date,
});

export default mongoose.models.UserMetadata || mongoose.model('UserMetadata', UserMetadataSchema);

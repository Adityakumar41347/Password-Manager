// models/User.js
import mongoose from 'mongoose';

const PasswordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
  id: String,
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwords: [PasswordSchema],
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
// actions/useractions.js
'use server';

import { connectDB } from '@/db/connectDB';
import { User } from '@/models/User';

export const updatePasswordsInDB = async (passwordArray, email) => {
  await connectDB();

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email, passwords: passwordArray });
  } else {
    user.passwords = passwordArray;
  }

  await user.save();
  return true;
};

export const getPasswordsFromDB = async (email) => {
  await connectDB();
  const user = await User.findOne({ email });
  return user?.passwords || [];
};
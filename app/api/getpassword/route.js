import { NextResponse } from 'next/server';
import { connectDB } from '@/db/connectDB';
import { User } from '@/models/User';

export async function POST(req) {
  const { email } = await req.json();
  await connectDB();
  const user = await User.findOne({ email });
  return NextResponse.json({ passwords: user?.passwords || [] });
}
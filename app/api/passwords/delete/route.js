import { NextResponse } from 'next/server';
import { connectDB } from '@/db/connectDB';
import { User } from '@/models/User';

export async function POST(req) {
  const { email, passwordId } = await req.json();
  await connectDB();

  try {
    const updated = await User.updateOne(
      { email },
      { $pull: { passwords: { id: passwordId } } }
    );

    if (updated.modifiedCount === 0) {
      return NextResponse.json({ error: 'Password not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Password deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete password' }, { status: 500 });
  }
}
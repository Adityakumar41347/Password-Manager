import dbConnect from '../../../lib/dbConnect';
import Password from '../../../models/Password';

export default async function handler(req, res) {
    const { id } = req.query;

    await dbConnect();

    if (req.method === 'DELETE') {
        try {
            await Password.findByIdAndDelete(id);
            res.status(200).json({ message: 'Password deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete password' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
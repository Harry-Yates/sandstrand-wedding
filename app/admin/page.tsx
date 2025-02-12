'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import Navbar from '../components/Navbar';

// Define the type for an RSVP response
interface RSVPResponse {
    id: string;
    name: string;
    email: string;
    attending: boolean;
    guests: number;
    meal_preference: string | null;
    created_at: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [responses, setResponses] = useState<RSVPResponse[]>([]);
    const [loading, setLoading] = useState(false);

    // ADMIN_PASSWORD is hard-coded for demonstration.
    const ADMIN_PASSWORD = 'admin123';

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            fetchResponses();
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    const fetchResponses = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('rsvp')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            setError(error.message);
        } else {
            setResponses(data || []);
        }
        setLoading(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen relative">
                <Navbar />
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative min-h-screen flex items-center justify-center pt-20 z-10">
                    <div className="max-w-md w-full bg-white/90 backdrop-blur-sm shadow-lg rounded-lg px-8 py-6">
                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Admin Login</h2>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            {error && <div className="text-red-600 text-sm">{error}</div>}
                            <button
                                type="submit"
                                className="w-full bg-rose-600 text-white py-3 px-4 rounded-md hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <Navbar />
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 pt-20 z-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8 text-center">RSVP Responses</h1>
                    {loading ? (
                        <div className="text-center text-white">Loading responses...</div>
                    ) : responses.length === 0 ? (
                        <div className="text-center text-white">No RSVP responses yet.</div>
                    ) : (
                        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Attending</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Guests</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Meal Preference</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Response Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {responses.map((res) => (
                                            <tr key={res.id} className="hover:bg-gray-50/50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${res.attending ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {res.attending ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.guests}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.meal_preference || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(res.created_at).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 
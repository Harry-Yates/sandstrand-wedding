'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase/client';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [responses, setResponses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // ADMIN_PASSWORD is hard-coded for a simple demo; move to secure server-side auth in production.
    const ADMIN_PASSWORD = "admin123";

    // Handle the login form submission.
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            fetchResponses();
        } else {
            setError("Incorrect password. Please try again.")
        }
    };

    // Fetch RSVP responses from Supabase.
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

    // If the user is not authenticated, show the login form.
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
                        <button
                            type="submit"
                            className="w-full bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Once authenticated, display the list of RSVP responses.
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Admin - RSVP Responses</h1>
            {loading ? (
                <p className="text-center">Loading responses...</p>
            ) : responses.length === 0 ? (
                <p className="text-center">No RSVP responses yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Email</th>
                                <th className="py-2 px-4 border">Attending</th>
                                <th className="py-2 px-4 border">Guests</th>
                                <th className="py-2 px-4 border">Meal Preference</th>
                                <th className="py-2 px-4 border">Response Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responses.map((res) => (
                                <tr key={res.id}>
                                    <td className="py-2 px-4 border">{res.name}</td>
                                    <td className="py-2 px-4 border">{res.email}</td>
                                    <td className="py-2 px-4 border">{res.attending ? 'Yes' : 'No'}</td>
                                    <td className="py-2 px-4 border">{res.guests}</td>
                                    <td className="py-2 px-4 border">{res.meal_preference || '-'}</td>
                                    <td className="py-2 px-4 border">{new Date(res.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
} 
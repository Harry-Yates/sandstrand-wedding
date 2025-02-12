'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Container, Title, Section } from '@/components/ui';
import Navbar from '@/components/Navbar';

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
            <>
                <Navbar />
                <Section dark>
                    <Container>
                        <Title dark>Admin Login</Title>
                        <div className="max-w-md mx-auto mt-8">
                            <form onSubmit={handleLogin} className="bg-background/90 backdrop-blur-sm shadow-lg rounded-lg p-8 space-y-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        className="mt-1 block w-full rounded-md border-border shadow-sm 
                                                 focus:border-primary focus:ring-primary sm:text-sm 
                                                 transition-colors px-3 py-2 text-text bg-background"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter admin password"
                                    />
                                </div>

                                {error && (
                                    <div className="text-status-error text-sm">
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="w-80 bg-primary text-white py-3 px-4 rounded-md 
                                                 hover:bg-primary-light transition-colors focus:outline-none 
                                                 focus:ring-2 focus:ring-primary focus:ring-offset-2
                                                 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Container>
                </Section>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Section dark>
                <Container>
                    <Title dark>Admin Dashboard</Title>
                    <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 pt-20 z-10">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-3xl font-bold text-white mb-8 text-center">RSVP Responses</h1>
                            {loading ? (
                                <div className="text-center text-white">Loading responses...</div>
                            ) : responses.length === 0 ? (
                                <div className="text-center text-white">No RSVP responses yet.</div>
                            ) : (
                                <div className="bg-background/90 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-border">
                                            <thead className="bg-background/50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Email</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Attending</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Guests</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Meal Preference</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Response Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {responses.map((res) => (
                                                    <tr key={res.id} className="hover:bg-background/50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{res.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{res.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${res.attending ? 'bg-status-success/20 text-status-success' : 'bg-status-error/20 text-status-error'}`}>
                                                                {res.attending ? 'Yes' : 'No'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{res.guests}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{res.meal_preference || '-'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{new Date(res.created_at).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
} 
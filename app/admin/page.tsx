'use client';

import { useState, useEffect } from 'react';
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

    // Add useEffect to fetch responses when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchResponses();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
                setIsAuthenticated(true);
            } else {
                setError('Incorrect password. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchResponses = async () => {
        try {
            const { data, error } = await supabase
                .from('rsvp')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            console.log('Fetched responses:', data); // Debug log
            setResponses(data || []);
        } catch (error) {
            console.error('Error fetching responses:', error);
            setError('Failed to fetch responses');
        }
    };

    const totalAttending = responses.reduce((sum, response) => {
        return sum + (response.attending ? 1 + response.guests : 0);
    }, 0);

    if (!isAuthenticated) {
        return (
            <>
                <Navbar />
                <Section>
                    <Container>
                        <Title>Admin Login</Title>
                        <div className="max-w-md mx-auto mt-8">
                            <form onSubmit={handleLogin} className="bg-background-secondary rounded-lg p-8 space-y-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        className="mt-1 block w-full rounded-md border-border bg-background 
                                                 text-text-primary shadow-sm px-3 py-2
                                                 focus:border-primary focus:ring-primary sm:text-sm 
                                                 transition-colors"
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

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 px-4 rounded-md 
                                             hover:bg-primary-light transition-colors focus:outline-none 
                                             focus:ring-2 focus:ring-primary focus:ring-offset-2
                                             disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
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
            <Section>
                <Container>
                    <div className="flex justify-between items-center mb-8">
                        <Title>RSVP Responses ({responses.length})</Title>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="px-4 py-2 text-sm font-medium text-text-primary hover:text-primary transition-colors"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-background-secondary p-6 rounded-lg">
                            <h3 className="text-text-secondary text-sm font-medium">Total Responses</h3>
                            <p className="text-text-primary text-2xl font-bold mt-2">{responses.length}</p>
                        </div>
                        <div className="bg-background-secondary p-6 rounded-lg">
                            <h3 className="text-text-secondary text-sm font-medium">Total Attending</h3>
                            <p className="text-text-primary text-2xl font-bold mt-2">{totalAttending}</p>
                        </div>
                        <div className="bg-background-secondary p-6 rounded-lg">
                            <h3 className="text-text-secondary text-sm font-medium">Response Rate</h3>
                            <p className="text-text-primary text-2xl font-bold mt-2">
                                {responses.length > 0 ?
                                    `${Math.round((responses.filter(r => r.attending).length / responses.length) * 100)}%`
                                    : '0%'}
                            </p>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-text-secondary text-center py-8">
                            Loading responses...
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-status-error text-center py-8">
                            {error}
                        </div>
                    )}

                    {/* Responses Table */}
                    {!loading && !error && responses.length > 0 && (
                        <div className="bg-background-secondary rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-border">
                                    <thead className="bg-background-tertiary">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Email</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Guests</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Meal</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-background divide-y divide-border">
                                        {responses.map((response) => (
                                            <tr key={response.id} className="hover:bg-background-tertiary">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{response.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{response.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${response.attending
                                                        ? 'bg-status-success/10 text-status-success'
                                                        : 'bg-status-error/10 text-status-error'
                                                        }`}>
                                                        {response.attending ? 'Attending' : 'Not Attending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{response.guests}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{response.meal_preference || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                    {new Date(response.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* No Data State */}
                    {!loading && !error && responses.length === 0 && (
                        <div className="text-text-secondary text-center py-8">
                            No RSVP responses yet.
                        </div>
                    )}
                </Container>
            </Section>
        </>
    );
} 
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
    bus_pickup_location: string | null;
    tennis_level: string | null;
    attending_days: {
        all_days: boolean;
        tennis_day: boolean;
        wedding_day: boolean;
        beach_day: boolean;
    };
    additional_notes: string | null;
    created_at: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [responses, setResponses] = useState<RSVPResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

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
        } catch {
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

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this RSVP?')) {
            return;
        }

        setDeleteLoading(id);
        setError('');

        try {
            // Log the attempt
            console.log('Attempting to delete RSVP with ID:', id);

            const { data, error: deleteError } = await supabase
                .from('rsvp')
                .delete()
                .eq('id', id)
                .select(); // Add select to get the deleted row

            if (deleteError) {
                console.error('Delete error:', deleteError);
                throw deleteError;
            }

            console.log('Delete response:', data);

            // Update the local state to remove the deleted response
            setResponses(prevResponses => prevResponses.filter(response => response.id !== id));

        } catch (err) {
            console.error('Error deleting response:', err);
            setError('Failed to delete response. Please try again.');
        } finally {
            setDeleteLoading(null);
        }
    };

    if (!isAuthenticated) {
        return (
            <>
                <Navbar />
                <Section className="bg-[#c7436c]">
                    <Container>
                        <div className="max-w-md mx-auto mt-20">
                            <Title variant="light" className="mb-8 text-[#e0ab2a]">Admin Login</Title>
                            <div className="bg-[#352129] p-8 rounded-lg shadow-lg">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full p-3 mb-4 rounded border border-[#e0ab2a]/20 bg-[#ae1231]/10 text-[#e0ab2a] placeholder-[#e0ab2a]/70"
                                />
                                <button
                                    onClick={handleLogin}
                                    className="w-full bg-[#ae1231] text-[#e0ab2a] font-bold py-3 px-4 rounded hover:bg-[#ae1231]/90 transition-colors"
                                >
                                    Login
                                </button>
                                {error && <p className="mt-4 text-[#ae1231] text-center">{error}</p>}
                            </div>
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
                    <div className="flex justify-between items-center mb-8">
                        <Title dark>RSVP Responses ({responses.length})</Title>
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Bus Pickup</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Tennis</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Days</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Notes</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
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
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{response.bus_pickup_location || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{response.tennis_level || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                                                    {response.attending_days?.all_days ? 'All Days' :
                                                        [
                                                            response.attending_days?.tennis_day && 'Tennis',
                                                            response.attending_days?.wedding_day && 'Wedding',
                                                            response.attending_days?.beach_day && 'Beach'
                                                        ].filter(Boolean).join(', ') || '-'
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-normal text-sm text-text-primary max-w-xs">
                                                    {response.additional_notes || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                    {new Date(response.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() => handleDelete(response.id)}
                                                        disabled={deleteLoading === response.id}
                                                        className="text-status-error hover:text-status-error/80 transition-colors
                                                                 disabled:opacity-50 disabled:cursor-not-allowed
                                                                 focus:outline-none focus:ring-2 focus:ring-status-error focus:ring-offset-2
                                                                 rounded-md px-2 py-1"
                                                        title="Delete RSVP"
                                                    >
                                                        {deleteLoading === response.id ? (
                                                            <span>Deleting...</span>
                                                        ) : (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
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
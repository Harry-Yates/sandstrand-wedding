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
    // Authentication and data states
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [responses, setResponses] = useState<RSVPResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    // New state for filtering and sorting
    const [filterQuery, setFilterQuery] = useState('');
    const [filterTennisLevel, setFilterTennisLevel] = useState('All');
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Fetch responses when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchResponses();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    const fetchResponses = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('rsvp')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            console.log('Fetched responses:', data);
            setResponses(data || []);
        } catch (error) {
            console.error('Error fetching responses:', error);
            setError('Failed to fetch responses');
        } finally {
            setLoading(false);
        }
    };

    // Updated totalAttending calculation
    const totalAttending = responses.filter(response => response.attending).length;

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this RSVP?')) {
            return;
        }

        setDeleteLoading(id);
        setError('');

        try {
            console.log('Attempting to delete RSVP with ID:', id);

            const { data, error: deleteError } = await supabase
                .from('rsvp')
                .delete()
                .eq('id', id)
                .select();

            if (deleteError) {
                console.error('Delete error:', deleteError);
                throw deleteError;
            }

            console.log('Delete response:', data);

            // Update the local state to remove the deleted response
            setResponses(prevResponses =>
                prevResponses.filter(response => response.id !== id)
            );
        } catch (err) {
            console.error('Error deleting response:', err);
            setError('Failed to delete response. Please try again.');
        } finally {
            setDeleteLoading(null);
        }
    };

    // Handler for sorting when clicking on table headers
    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Compute unique tennis levels from responses (filtering out null values with a type guard)
    const uniqueTennisLevels = Array.from(
        new Set(
            responses
                .map(response => response.tennis_level)
                .filter((level): level is string => level !== null)
        )
    );

    // Aggregate tennis level counts for dashboard stats
    const tennisCounts = responses.reduce((acc, response) => {
        if (response.tennis_level) {
            acc[response.tennis_level] = (acc[response.tennis_level] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    // Filter responses based on search query and tennis level filter
    const filteredResponses = responses.filter(response => {
        const queryMatch =
            filterQuery === '' ||
            response.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
            response.email.toLowerCase().includes(filterQuery.toLowerCase());
        const tennisMatch =
            filterTennisLevel === 'All' ||
            response.tennis_level === filterTennisLevel;
        return queryMatch && tennisMatch;
    });

    // Sort the filtered responses based on the selected sort field and direction
    const sortedResponses = [...filteredResponses];
    if (sortField) {
        sortedResponses.sort((a, b) => {
            switch (sortField) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'email':
                    return a.email.localeCompare(b.email);
                case 'guests':
                    return a.guests - b.guests;
                case 'tennis_level':
                    return (a.tennis_level || '').localeCompare(b.tennis_level || '');
                case 'created_at':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                default:
                    return 0;
            }
        });
        if (sortDirection === 'desc') {
            sortedResponses.reverse();
        }
    }

    // If not authenticated, render the login page
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-[#ff3e6b] pt-32 pb-20">
                <Navbar />
                <div className="container mx-auto px-4">
                    <h1 className="text-[#ffe234] text-6xl md:text-8xl font-bungee mb-16 text-center mt-8 relative z-50">
                        Portal
                    </h1>
                    {/* Decorative SVG elements */}
                    <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 text-[#ff1744] opacity-15 transform rotate-12 z-10">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50 10 
                                    C60 10, 70 20, 70 30
                                    C70 40, 90 40, 90 50
                                    C90 60, 70 60, 70 70
                                    C70 80, 60 90, 50 90
                                    C40 90, 30 80, 30 70
                                    C30 60, 10 60, 10 50
                                    C10 40, 30 40, 30 30
                                    C30 20, 40 10, 50 10Z"
                                fill="currentColor" />
                        </svg>
                    </div>
                    <div className="absolute top-24 left-0 w-32 h-32 md:w-48 md:h-48 text-[#ff1744] opacity-20">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="40" fill="currentColor" />
                        </svg>
                    </div>
                    <div className="absolute top-1/2 -left-10 w-40 h-40 md:w-64 md:h-64 text-[#ff1744] opacity-20 transform rotate-12">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50 10 
                                    C60 10, 70 20, 70 30
                                    C70 40, 90 40, 90 50
                                    C90 60, 70 60, 70 70
                                    C70 80, 60 90, 50 90
                                    C40 90, 30 80, 30 70
                                    C30 60, 10 60, 10 50
                                    C10 40, 30 40, 30 30
                                    C30 20, 40 10, 50 10Z"
                                fill="currentColor" />
                        </svg>
                    </div>
                    <div className="absolute top-2/3 right-20 w-28 h-28 md:w-44 md:h-44 text-[#ff1744] opacity-25 transform -rotate-45">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50 10 
                                    C60 10, 70 20, 70 30
                                    C70 40, 90 40, 90 50
                                    C90 60, 70 60, 70 70
                                    C70 80, 60 90, 50 90
                                    C40 90, 30 80, 30 70
                                    C30 60, 10 60, 10 50
                                    C10 40, 30 40, 30 30
                                    C30 20, 40 10, 50 10Z"
                                fill="currentColor" />
                        </svg>
                    </div>
                    <div className="absolute top-2/3 right-1/3 w-16 h-16 md:w-24 md:h-24 text-[#ff1744] opacity-30 transform rotate-90">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50 10 
                                    C60 10, 70 20, 70 30
                                    C70 40, 90 40, 90 50
                                    C90 60, 70 60, 70 70
                                    C70 80, 60 90, 50 90
                                    C40 90, 30 80, 30 70
                                    C30 60, 10 60, 10 50
                                    C10 40, 30 40, 30 30
                                    C30 20, 40 10, 50 10Z"
                                fill="currentColor" />
                        </svg>
                    </div>
                    <div className="absolute bottom-20 right-10 w-32 h-32 md:w-52 md:h-52 text-[#ff1744] opacity-15 transform rotate-180">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50 10 
                                    C60 10, 70 20, 70 30
                                    C70 40, 90 40, 90 50
                                    C90 60, 70 60, 70 70
                                    C70 80, 60 90, 50 90
                                    C40 90, 30 80, 30 70
                                    C30 60, 10 60, 10 50
                                    C10 40, 30 40, 30 30
                                    C30 20, 40 10, 50 10Z"
                                fill="currentColor" />
                        </svg>
                    </div>
                    <div className="absolute bottom-40 left-24 w-20 h-20 md:w-28 md:h-28 text-[#ff1744] opacity-25 transform -rotate-30">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50 10 
                                    C60 10, 70 20, 70 30
                                    C70 40, 90 40, 90 50
                                    C90 60, 70 60, 70 70
                                    C70 80, 60 90, 50 90
                                    C40 90, 30 80, 30 70
                                    C30 60, 10 60, 10 50
                                    C10 40, 30 40, 30 30
                                    C30 20, 40 10, 50 10Z"
                                fill="currentColor" />
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-md mx-auto mb-20">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                            <h2 className="text-[#ff3e6b] text-3xl font-bungee mb-6 text-center">
                                Enter Password
                            </h2>
                            <form className="space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff3e6b] focus:border-transparent"
                                        placeholder="Enter password"
                                    />
                                    {error && (
                                        <p className="mt-2 text-sm text-red-600">{error}</p>
                                    )}
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-3 px-8 rounded-lg font-bungee bg-[#ff3e6b] text-white hover:bg-[#ff1744] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Enter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
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

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-background-secondary p-4 rounded-lg flex flex-col">
                            <h3 className="text-text-secondary text-sm font-medium mb-1">Total Responses</h3>
                            <p className="text-text-primary text-6xl font-bold font-bungee flex-grow flex items-center">{responses.length}</p>
                        </div>
                        <div className="bg-background-secondary p-4 rounded-lg flex flex-col">
                            <h3 className="text-text-secondary text-sm font-medium mb-1">Total Attending</h3>
                            <p className="text-text-primary text-6xl font-bold font-bungee flex-grow flex items-center">{totalAttending}</p>
                        </div>
                        <div className="bg-background-secondary p-4 rounded-lg flex flex-col">
                            <h3 className="text-text-secondary text-sm font-medium mb-1">Response Rate</h3>
                            <p className="text-text-primary text-6xl font-bold font-bungee flex-grow flex items-center">
                                {responses.length > 0
                                    ? `${Math.round((responses.filter(r => r.attending).length / responses.length) * 100)}%`
                                    : '0%'
                                }
                            </p>
                        </div>
                        <div className="bg-background-secondary p-4 rounded-lg">
                            <h3 className="text-text-secondary text-sm font-medium mb-1">Tennis Level Breakdown</h3>
                            <ul className="mt-2">
                                {Object.entries(tennisCounts).map(([level, count]) => (
                                    <li key={level} className="text-text-primary text-lg">
                                        {level}: {count}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Filter Options */}
                    <div className="flex flex-wrap gap-4 mb-4">
                        <input
                            type="text"
                            value={filterQuery}
                            onChange={(e) => setFilterQuery(e.target.value)}
                            placeholder="Search by name or email"
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff3e6b] focus:border-transparent"
                        />
                        <select
                            value={filterTennisLevel}
                            onChange={(e) => setFilterTennisLevel(e.target.value)}
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff3e6b] focus:border-transparent"
                        >
                            <option value="All">All Tennis Levels</option>
                            {uniqueTennisLevels.map(level => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
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
                                <table className="min-w-full divide-y divide-border rsvp-form">
                                    <thead className="bg-background-tertiary">
                                        <tr>
                                            <th
                                                onClick={() => handleSort('name')}
                                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                                            >
                                                Name{sortField === 'name' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                                            </th>
                                            <th
                                                onClick={() => handleSort('email')}
                                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                                            >
                                                Email{sortField === 'email' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                                Bus Pickup
                                            </th>
                                            <th
                                                onClick={() => handleSort('tennis_level')}
                                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                                            >
                                                Tennis{sortField === 'tennis_level' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                                Days
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                                Notes
                                            </th>
                                            <th
                                                onClick={() => handleSort('created_at')}
                                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                                            >
                                                Date{sortField === 'created_at' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-border">
                                        {sortedResponses.map((response) => (
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
                                                        className="text-status-error hover:text-status-error/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-status-error focus:ring-offset-2 rounded-md px-2 py-1"
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
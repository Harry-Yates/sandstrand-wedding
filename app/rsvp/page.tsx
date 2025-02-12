'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import Navbar from "../components/Navbar";

export default function RSVPPage() {
    // Possible form states.
    const [formState, setFormState] = useState<'initial' | 'submitting' | 'success' | 'error'>('initial');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormState('submitting');

        // Get the form data.
        const formData = new FormData(event.currentTarget);

        // Insert data into Supabase.
        const { error } = await supabase.from('rsvp').insert({
            name: formData.get('name'),
            email: formData.get('email'),
            attending: formData.get('attending') === 'yes',
            guests: Number(formData.get('guests')),
            meal_preference: formData.get('meal'),
        });

        // Set the form state based on the response.
        if (error) {
            setFormState('error');
            setErrorMessage(error.message);
        } else {
            setFormState('success');
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center mb-8">RSVP for Our Wedding</h1>

                {formState === 'success' ? (
                    <div className="bg-green-100 p-4 rounded text-green-700 text-center">
                        <p className="font-semibold">Thank you for your RSVP! We look forward to celebrating with you.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                                />
                            </label>
                        </div>

                        <div>
                            <fieldset>
                                <legend className="text-sm font-medium text-gray-700">Will you be attending?</legend>
                                <div className="mt-2 space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="yes"
                                            required
                                            className="h-4 w-4 text-rose-600 focus:ring-rose-500"
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="no"
                                            required
                                            className="h-4 w-4 text-rose-600 focus:ring-rose-500"
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Number of Guests (including yourself)
                                <select
                                    name="guests"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>
                                            {num} {num === 1 ? 'guest' : 'guests'}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Meal Preference
                                <select
                                    name="meal"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                                >
                                    <option value="">Please select...</option>
                                    <option value="beef">Beef</option>
                                    <option value="chicken">Chicken</option>
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                </select>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={formState === 'submitting'}
                            className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {formState === 'submitting' ? 'Submitting...' : 'Submit RSVP'}
                        </button>

                        {formState === 'error' && (
                            <div className="bg-red-100 p-4 rounded text-red-700">
                                <p>Error: {errorMessage}</p>
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
} 
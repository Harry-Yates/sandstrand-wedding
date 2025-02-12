'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Container, Title, Section } from '@/components/ui';

import Navbar from '@/components/Navbar';

export default function RSVPPage() {
    const [formState, setFormState] = useState('initial');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'yes',
        guests: '0',
        meal_preference: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');

        try {
            const { error } = await supabase.from('rsvps').insert([{
                name: formData.name,
                email: formData.email,
                attending: formData.attending === 'yes',
                guests: parseInt(formData.guests),
                meal_preference: formData.meal_preference,
            }]);

            if (error) throw error;
            setFormState('success');
        } catch (error) {
            console.error('Error:', error);
            setFormState('error');
        }
    };

    return (
        <>
            <Navbar />
            <Section dark>
                <Container>
                    <Title dark>RSVP</Title>
                    <div className="max-w-2xl mx-auto mt-8">
                        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-8">
                            {formState === 'success' ? (
                                <div className="text-center">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Thank you!</h3>
                                    <p className="text-gray-600">Your RSVP has been received.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors px-3 py-2 text-gray-900"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors px-3 py-2 text-gray-900"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Will you be attending? <span className="text-red-500">*</span>
                                            </label>
                                            <div className="mt-2 space-x-6">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        value="yes"
                                                        checked={formData.attending === 'yes'}
                                                        onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                        className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                                    />
                                                    <span className="ml-2 text-gray-700">Yes</span>
                                                </label>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        value="no"
                                                        checked={formData.attending === 'no'}
                                                        onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                        className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                                    />
                                                    <span className="ml-2 text-gray-700">No</span>
                                                </label>
                                            </div>
                                        </div>

                                        {formData.attending === 'yes' && (
                                            <>
                                                <div>
                                                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Number of Additional Guests
                                                    </label>
                                                    <select
                                                        id="guests"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors px-3 py-2 bg-white text-gray-900"
                                                        value={formData.guests}
                                                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                                    >
                                                        {[0, 1, 2, 3, 4].map((num) => (
                                                            <option key={num} value={num}>
                                                                {num} {num === 1 ? 'guest' : 'guests'}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="meal" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Meal Preference <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        id="meal"
                                                        required={formData.attending === 'yes'}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors px-3 py-2 bg-white text-gray-900"
                                                        value={formData.meal_preference}
                                                        onChange={(e) => setFormData({ ...formData, meal_preference: e.target.value })}
                                                    >
                                                        <option value="">Please select...</option>
                                                        <option value="meat">Meat</option>
                                                        <option value="fish">Fish</option>
                                                        <option value="vegetarian">Vegetarian</option>
                                                        <option value="vegan">Vegan</option>
                                                    </select>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {formState === 'submitting' ? 'Submitting...' : 'Submit RSVP'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}
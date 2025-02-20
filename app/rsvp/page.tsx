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
        bus_pickup_location: '',
        tennis_level: '',
        attending_days: {
            all_days: false,
            tennis_day: false,
            wedding_day: false,
            beach_day: false,
        },
        additional_notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');

        try {
            const { error } = await supabase.from('rsvp').insert([{
                name: formData.name,
                email: formData.email,
                attending: formData.attending === 'yes',
                guests: parseInt(formData.guests),
                meal_preference: formData.meal_preference,
                bus_pickup_location: formData.bus_pickup_location,
                tennis_level: formData.tennis_level,
                attending_days: formData.attending_days,
                additional_notes: formData.additional_notes,
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
                        <div className="bg-background/90 backdrop-blur-sm shadow-lg rounded-lg p-8">
                            {formState === 'success' ? (
                                <div className="text-center">
                                    <h3 className="text-2xl font-semibold text-text mb-4">Thank you!</h3>
                                    <p className="text-text-secondary">Your RSVP has been received.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                                                Name <span className="text-status-error">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                className="mt-1 block w-full rounded-md border-border shadow-sm 
                                                         focus:border-primary focus:ring-primary sm:text-sm 
                                                         transition-colors px-3 py-2 text-text bg-background"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                                                Email <span className="text-status-error">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                className="mt-1 block w-full rounded-md border-border shadow-sm 
                                                         focus:border-primary focus:ring-primary sm:text-sm 
                                                         transition-colors px-3 py-2 text-text bg-background"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                                Will you be attending? <span className="text-status-error">*</span>
                                            </label>
                                            <div className="mt-2 space-x-6">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        value="yes"
                                                        checked={formData.attending === 'yes'}
                                                        onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                        className="form-radio h-4 w-4 text-primary border-border focus:ring-primary"
                                                    />
                                                    <span className="ml-2 text-text">Yes</span>
                                                </label>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        value="no"
                                                        checked={formData.attending === 'no'}
                                                        onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                        className="form-radio h-4 w-4 text-primary border-border focus:ring-primary"
                                                    />
                                                    <span className="ml-2 text-text">No</span>
                                                </label>
                                            </div>
                                        </div>

                                        {formData.attending === 'yes' && (
                                            <>
                                                <div>
                                                    <label htmlFor="guests" className="block text-sm font-medium text-text-secondary mb-1">
                                                        Number of Additional Guests
                                                    </label>
                                                    <select
                                                        id="guests"
                                                        className="mt-1 block w-full rounded-md border-border shadow-sm 
                                                                 focus:border-primary focus:ring-primary sm:text-sm 
                                                                 transition-colors px-3 py-2 text-text bg-background"
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
                                                    <label htmlFor="meal" className="block text-sm font-medium text-text-secondary mb-1">
                                                        Meal Preference <span className="text-status-error">*</span>
                                                    </label>
                                                    <select
                                                        id="meal"
                                                        required={formData.attending === 'yes'}
                                                        className="mt-1 block w-full rounded-md border-border shadow-sm 
                                                                 focus:border-primary focus:ring-primary sm:text-sm 
                                                                 transition-colors px-3 py-2 text-text bg-background"
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

                                                <div>
                                                    <label htmlFor="bus" className="block text-sm font-medium text-text-secondary mb-1">
                                                        Bus Pickup Location
                                                    </label>
                                                    <select
                                                        id="bus"
                                                        className="mt-1 block w-full rounded-md border-border shadow-sm 
                                                                 focus:border-primary focus:ring-primary sm:text-sm 
                                                                 transition-colors px-3 py-2 text-text bg-background"
                                                        value={formData.bus_pickup_location}
                                                        onChange={(e) => setFormData({ ...formData, bus_pickup_location: e.target.value })}
                                                    >
                                                        <option value="">I&apos;ll make my own way</option>
                                                        <option value="riviera_strand">Riviera Strand</option>
                                                        <option value="skansen">Skansen</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="tennis" className="block text-sm font-medium text-text-secondary mb-1">
                                                        Tennis Level 🎾
                                                    </label>
                                                    <select
                                                        id="tennis"
                                                        className="mt-1 block w-full rounded-md border-border shadow-sm 
                                                                 focus:border-primary focus:ring-primary sm:text-sm 
                                                                 transition-colors px-3 py-2 text-text bg-background"
                                                        value={formData.tennis_level}
                                                        onChange={(e) => setFormData({ ...formData, tennis_level: e.target.value })}
                                                    >
                                                        <option value="">Please select...</option>
                                                        <option value="pro">Total Pro</option>
                                                        <option value="intermediate">Intermediate</option>
                                                        <option value="beginner">Beginner</option>
                                                        <option value="vibes">Just here for the vibes!</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-2">
                                                        Which days will you be joining us? 🎉
                                                    </label>
                                                    <div className="space-y-2">
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.attending_days.all_days}
                                                                onChange={(e) => setFormData({
                                                                    ...formData,
                                                                    attending_days: {
                                                                        all_days: e.target.checked,
                                                                        tennis_day: e.target.checked,
                                                                        wedding_day: e.target.checked,
                                                                        beach_day: e.target.checked
                                                                    }
                                                                })}
                                                                className="form-checkbox h-4 w-4 text-primary border-border focus:ring-primary"
                                                            />
                                                            <span className="ml-2 text-text">All three days – Tennis, Wedding, & Beach Party! 🎾💍🏖️</span>
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.attending_days.tennis_day}
                                                                onChange={(e) => setFormData({
                                                                    ...formData,
                                                                    attending_days: {
                                                                        ...formData.attending_days,
                                                                        tennis_day: e.target.checked,
                                                                        all_days: false
                                                                    }
                                                                })}
                                                                className="form-checkbox h-4 w-4 text-primary border-border focus:ring-primary"
                                                            />
                                                            <span className="ml-2 text-text">June 19th – Tennis Tournament 🎾</span>
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.attending_days.wedding_day}
                                                                onChange={(e) => setFormData({
                                                                    ...formData,
                                                                    attending_days: {
                                                                        ...formData.attending_days,
                                                                        wedding_day: e.target.checked,
                                                                        all_days: false
                                                                    }
                                                                })}
                                                                className="form-checkbox h-4 w-4 text-primary border-border focus:ring-primary"
                                                            />
                                                            <span className="ml-2 text-text">June 20th – Wedding & Celebration 💒</span>
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.attending_days.beach_day}
                                                                onChange={(e) => setFormData({
                                                                    ...formData,
                                                                    attending_days: {
                                                                        ...formData.attending_days,
                                                                        beach_day: e.target.checked,
                                                                        all_days: false
                                                                    }
                                                                })}
                                                                className="form-checkbox h-4 w-4 text-primary border-border focus:ring-primary"
                                                            />
                                                            <span className="ml-2 text-text">June 21st – Beach Party 🌊🍕</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <label htmlFor="additional_notes" className="block text-sm font-medium text-text-secondary mb-1">
                                                        Anything we need to know? 📝
                                                    </label>
                                                    <textarea
                                                        id="additional_notes"
                                                        rows={4}
                                                        className="mt-1 block w-full rounded-md border-border shadow-sm 
                                                                 focus:border-primary focus:ring-primary sm:text-sm 
                                                                 transition-colors px-3 py-2 text-text bg-background"
                                                        value={formData.additional_notes}
                                                        onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                                                        placeholder="Any dietary restrictions, accessibility requirements, or other things we should know about?"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="inline-flex justify-center py-2.5 px-6 border border-transparent 
                                                     shadow-sm text-sm font-medium rounded-md text-white bg-primary 
                                                     hover:bg-primary-light focus:outline-none focus:ring-2 
                                                     focus:ring-offset-2 focus:ring-primary transition-colors 
                                                     disabled:opacity-50 disabled:cursor-not-allowed"
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
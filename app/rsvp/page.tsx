'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
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

        // Immediate logging before any processing
        console.log('Raw form data:', formData);
        console.log('Attending value:', formData.attending);
        console.log('Raw guests value:', formData.guests);

        try {
            // Explicitly convert guests to number and handle undefined/null
            let guestsCount = 0;

            if (formData.attending === 'yes') {
                const parsedGuests = Number(formData.guests);
                guestsCount = isNaN(parsedGuests) ? 0 : Math.max(0, parsedGuests);
            }

            console.log('Final guests count:', guestsCount);

            const submitData = {
                name: formData.name,
                email: formData.email,
                attending: formData.attending === 'yes',
                meal_preference: formData.meal_preference || null,
                bus_pickup_location: formData.bus_pickup_location || null,
                tennis_level: formData.tennis_level || null,
                attending_days: formData.attending_days || null,
                additional_notes: formData.additional_notes || null,
            };

            console.log('Final submit data:', submitData);

            const { error, data } = await supabase.from('rsvp').insert([submitData]).select();
            console.log('Supabase response:', { error, data });

            if (error) {
                console.error('Submission error:', error);
                throw new Error('Failed to submit RSVP. Please try again.');
            }
            setFormState('success');
        } catch (error) {
            console.error('Error:', error);
            setFormState('error');
        }
    };

    return (
        <main className="min-h-screen bg-[#ff3e6b] pt-32 pb-20">
            <Navbar />
            <div className="container mx-auto px-4">
                <h1 className="text-[#ffe234] text-6xl md:text-8xl font-bungee mb-16 text-center mt-8">
                    RSVP
                </h1>

                {/* Multiple decorative elements scattered across the background */}
                {/* Top left */}
                <div className="absolute top-40 left-10 w-32 h-32 md:w-48 md:h-48 text-[#ff1744] opacity-30 transform -rotate-12">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C65 10, 75 25, 75 40
                                C75 55, 90 60, 90 75
                                C90 85, 75 90, 60 90
                                C45 90, 40 75, 40 60
                                C40 45, 25 40, 10 40
                                C10 25, 25 10, 40 10
                                C45 10, 50 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Top right */}
                <div className="absolute top-60 right-10 w-24 h-24 md:w-40 md:h-40 text-[#ff1744] opacity-30 transform rotate-45">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10
                                C60 10, 70 15, 80 30
                                C90 45, 90 55, 90 70
                                C90 85, 80 90, 50 90
                                C20 90, 10 85, 10 70
                                C10 55, 10 45, 20 30
                                C30 15, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Middle left */}
                <div className="absolute top-1/2 left-20 w-16 h-16 md:w-32 md:h-32 text-[#ff1744] opacity-20 transform rotate-90">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C65 10, 75 25, 75 40
                                C75 55, 90 60, 90 75
                                C90 85, 75 90, 60 90
                                C45 90, 40 75, 40 60
                                C40 45, 25 40, 10 40
                                C10 25, 25 10, 40 10
                                C45 10, 50 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Middle right */}
                <div className="absolute top-2/3 right-24 w-20 h-20 md:w-36 md:h-36 text-[#ff1744] opacity-25 transform -rotate-30">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10
                                C60 10, 70 15, 80 30
                                C90 45, 90 55, 90 70
                                C90 85, 80 90, 50 90
                                C20 90, 10 85, 10 70
                                C10 55, 10 45, 20 30
                                C30 15, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Bottom left */}
                <div className="absolute bottom-20 left-32 w-28 h-28 md:w-44 md:h-44 text-[#ff1744] opacity-20 transform rotate-180">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C65 10, 75 25, 75 40
                                C75 55, 90 60, 90 75
                                C90 85, 75 90, 60 90
                                C45 90, 40 75, 40 60
                                C40 45, 25 40, 10 40
                                C10 25, 25 10, 40 10
                                C45 10, 50 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Bottom right */}
                <div className="absolute bottom-40 right-16 w-20 h-20 md:w-32 md:h-32 text-[#ff1744] opacity-25 transform rotate-135">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10
                                C60 10, 70 15, 80 30
                                C90 45, 90 55, 90 70
                                C90 85, 80 90, 50 90
                                C20 90, 10 85, 10 70
                                C10 55, 10 45, 20 30
                                C30 15, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Small decorative elements */}
                <div className="absolute top-1/4 left-1/3 w-12 h-12 md:w-24 md:h-24 text-[#ff1744] opacity-15 transform rotate-45">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C65 10, 75 25, 75 40
                                C75 55, 90 60, 90 75
                                C90 85, 75 90, 60 90
                                C45 90, 40 75, 40 60
                                C40 45, 25 40, 10 40
                                C10 25, 25 10, 40 10
                                C45 10, 50 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                <div className="absolute bottom-1/3 right-1/3 w-16 h-16 md:w-28 md:h-28 text-[#ff1744] opacity-20 transform -rotate-60">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10
                                C60 10, 70 15, 80 30
                                C90 45, 90 55, 90 70
                                C90 85, 80 90, 50 90
                                C20 90, 10 85, 10 70
                                C10 55, 10 45, 20 30
                                C30 15, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto mb-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                        {formState === 'success' ? (
                            <div className="text-center">
                                <h3 className="text-[#ff3e6b] text-2xl font-bungee mb-4">Thank you!</h3>
                                <p className="text-gray-700">Your RSVP has been received.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    {/* Name Input */}
                                    <div>
                                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                            Name <span className="text-[#ff3e6b]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                                     focus:ring-2 focus:ring-[#ff3e6b] focus:border-transparent"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                            Email <span className="text-[#ff3e6b]">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                                     focus:ring-2 focus:ring-[#ff3e6b] focus:border-transparent"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    {/* Attending Radio Buttons */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Will you be attending? <span className="text-[#ff3e6b]">*</span>
                                        </label>
                                        <div className="mt-2 space-x-6">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    value="yes"
                                                    checked={formData.attending === 'yes'}
                                                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                    className="form-radio h-4 w-4 text-[#ff3e6b] border-gray-300 focus:ring-[#ff3e6b]"
                                                />
                                                <span className="ml-2 text-gray-700">Yes</span>
                                            </label>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    value="no"
                                                    checked={formData.attending === 'no'}
                                                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                    className="form-radio h-4 w-4 text-[#ff3e6b] border-gray-300 focus:ring-[#ff3e6b]"
                                                />
                                                <span className="ml-2 text-gray-700">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    {formData.attending === 'yes' && (
                                        <>
                                            {/* Meal Preference Select */}
                                            <div>
                                                <label htmlFor="meal" className="block text-gray-700 font-medium mb-2">
                                                    Meal Preference <span className="text-[#ff3e6b]">*</span>
                                                </label>
                                                <select
                                                    id="meal"
                                                    required={formData.attending === 'yes'}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                                             focus:ring-2 focus:ring-[#ff3e6b] focus:border-transparent"
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

                                            {/* Bus Pickup Location Select */}
                                            <div>
                                                <label htmlFor="bus" className="block text-gray-700 font-medium mb-2">
                                                    Bus Pickup Location
                                                </label>
                                                <select
                                                    id="bus"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                                             focus:ring-2 focus:ring-[#ff3e6b] focus:border-transparent"
                                                    value={formData.bus_pickup_location}
                                                    onChange={(e) => setFormData({ ...formData, bus_pickup_location: e.target.value })}
                                                >
                                                    <option value="">I&apos;ll make my own way</option>
                                                    <option value="riviera_strand">Riviera Strand</option>
                                                    <option value="skansen">Skansen</option>
                                                </select>
                                            </div>

                                            {/* Tennis Level Select */}
                                            <div>
                                                <label htmlFor="tennis" className="block text-gray-700 font-medium mb-2">
                                                    Tennis Level 🎾
                                                </label>
                                                <select
                                                    id="tennis"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                                             focus:ring-2 focus:ring-[#ff3e6b] focus:border-transparent"
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

                                            {/* Attending Days Checkboxes */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">
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
                                                            className="form-checkbox h-4 w-4 text-[#ff3e6b] border-gray-300 focus:ring-[#ff3e6b]"
                                                        />
                                                        <span className="ml-2 text-gray-700">All three days – Tennis, Wedding, & Beach Party! 🎾💍🏖️</span>
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
                                                            className="form-checkbox h-4 w-4 text-[#ff3e6b] border-gray-300 focus:ring-[#ff3e6b]"
                                                        />
                                                        <span className="ml-2 text-gray-700">June 19th – Tennis Tournament 🎾</span>
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
                                                            className="form-checkbox h-4 w-4 text-[#ff3e6b] border-gray-300 focus:ring-[#ff3e6b]"
                                                        />
                                                        <span className="ml-2 text-gray-700">June 20th – Wedding & Celebration 💒</span>
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
                                                            className="form-checkbox h-4 w-4 text-[#ff3e6b] border-gray-300 focus:ring-[#ff3e6b]"
                                                        />
                                                        <span className="ml-2 text-gray-700">June 21st – Beach Party 🌊🍕</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Additional Notes Textarea */}
                                            <div>
                                                <label htmlFor="additional_notes" className="block text-gray-700 font-medium mb-2">
                                                    Anything we need to know? 📝
                                                </label>
                                                <textarea
                                                    id="additional_notes"
                                                    rows={4}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                                             focus:ring-2 focus:ring-[#ff3e6b] focus:border-transparent"
                                                    value={formData.additional_notes}
                                                    onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                                                    placeholder="Any dietary restrictions, accessibility requirements, or other things we should know about?"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        disabled={formState === 'submitting'}
                                        className="inline-flex justify-center py-3 px-8 rounded-lg font-bungee
                                                 bg-[#ff3e6b] text-[#ffe234] hover:bg-[#ff1744] 
                                                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {formState === 'submitting' ? 'Submitting...' : 'Submit RSVP'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
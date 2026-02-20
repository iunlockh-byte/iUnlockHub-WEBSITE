"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Star, MessageSquare, Send, User, Trash2 } from 'lucide-react';

interface Review {
    id: string;
    created_at: string;
    user_email: string;
    user_id: string;
    rating: number;
    comment: string;
}

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        fetchReviews();
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const fetchReviews = async () => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setReviews(data);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSubmitting(true);

        const { error } = await supabase.from('reviews').insert({
            user_id: user.id,
            user_email: user.email,
            rating,
            comment: newComment
        });

        if (!error) {
            setNewComment('');
            setRating(5);
            fetchReviews();
        }
        setSubmitting(false);
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from('reviews').delete().eq('id', id);
        if (!error) fetchReviews();
    };

    return (
        <section className="py-24 bg-neutral-900 border-t border-neutral-800">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6">Customer Reviews</h2>
                        <p className="text-gray-400 text-lg">
                            See what our community says about their experience with iUnlock Hub.
                        </p>
                    </div>

                    {/* Add Review Form */}
                    {user ? (
                        <div className="bg-neutral-800/40 border border-neutral-700/50 rounded-[2rem] p-8 mb-16">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-red-500" />
                                Share Your Experience
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setRating(num)}
                                            className="focus:outline-none transition-transform active:scale-90"
                                        >
                                            <Star className={`w-8 h-8 ${rating >= num ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'}`} />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Tell us about the service you received..."
                                    className="w-full bg-black/40 border border-neutral-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-red-600/50 transition-all min-h-[120px]"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/20"
                                >
                                    <Send className="w-4 h-4" />
                                    {submitting ? 'Posting...' : 'Post Review'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-red-600/5 border border-red-600/10 rounded-[2rem] p-8 mb-16 text-center">
                            <p className="text-gray-400 mb-4">You must be logged in to leave a review.</p>
                            <a href="/auth" className="text-red-500 font-bold hover:underline">Sign in to share your experience →</a>
                        </div>
                    )}

                    {/* Review List */}
                    <div className="space-y-6">
                        {loading ? (
                            <div className="text-center text-zinc-600 py-10">Loading reviews...</div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center text-zinc-600 py-10 italic">No reviews yet. Be the first to share!</div>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id} className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 transition-colors hover:border-neutral-700 group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold leading-tight">{review.user_email.split('@')[0]}</p>
                                                <p className="text-zinc-600 text-xs">{new Date(review.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-800'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed pl-13">
                                        {review.comment}
                                    </p>
                                    {user?.id === review.user_id && (
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="mt-4 text-zinc-600 hover:text-red-500 transition-colors p-2 -ml-2 rounded-lg hover:bg-red-500/5"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

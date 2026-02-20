"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { MessageSquare, Heart, Image as ImageIcon, Send, User, Trash2, Github, Share2, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';

interface Post {
    id: string;
    created_at: string;
    user_email: string;
    user_id: string;
    content: string;
    image_url: string | null;
}

interface Comment {
    id: string;
    created_at: string;
    post_id: string;
    user_email: string;
    user_id: string;
    content: string;
}

export default function CommunityPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState('');
    const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
    const [activeComments, setActiveComments] = useState<{ [key: string]: boolean }>({});
    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        fetchPosts();
        fetchComments();
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: true });
        if (!error && data) setComments(data);
    };

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) setPosts(data);
        setLoading(false);
    };

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !content) return;
        setUploading(true);

        let image_url = null;
        if (image) {
            const fileExt = image.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('community')
                .upload(filePath, image);

            if (!uploadError) {
                const { data: { publicUrl } } = supabase.storage
                    .from('community')
                    .getPublicUrl(filePath);
                image_url = publicUrl;
            }
        }

        const { error } = await supabase.from('posts').insert({
            user_id: user.id,
            user_email: user.email,
            content,
            image_url
        });

        if (!error) {
            setContent('');
            setImage(null);
            fetchPosts();
        }
        setUploading(false);
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
                            <Github className="w-10 h-10 text-red-600" />
                            Community Feed
                        </h1>
                        <p className="text-zinc-500">Connect with other customers and share your unlocking journey.</p>
                    </div>
                </div>

                {/* Create Post Area */}
                {user ? (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-12">
                        <form onSubmit={handlePost} className="space-y-4">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="What's happening? Share your latest success..."
                                className="w-full bg-black/40 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-600/50 transition-all min-h-[100px] resize-none"
                            />

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-zinc-500 hover:text-white transition-colors group">
                                    <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-zinc-700">
                                        <ImageIcon className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium">{image ? image.name : 'Add Media'}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                                    />
                                </label>

                                <button
                                    type="submit"
                                    disabled={uploading || !content}
                                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center gap-2"
                                >
                                    <Send className="w-4 h-4 ml-1" />
                                    {uploading ? 'Posting...' : 'Post Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-12 text-center">
                        <p className="text-zinc-400 mb-4">Join the community to share your experience.</p>
                        <a href="/auth" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 inline-block">
                            Sign In to Post
                        </a>
                    </div>
                )}

                {/* Feed */}
                <div className="space-y-8">
                    {loading ? (
                        <div className="py-20 text-center text-zinc-600">Loading the feed...</div>
                    ) : (
                        posts.map((post) => (
                            <article key={post.id} className="group bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-3xl overflow-hidden transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-zinc-800 to-black rounded-xl border border-white/5 flex items-center justify-center text-zinc-400">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold tracking-tight">{post.user_email.split('@')[0]}</p>
                                                <p className="text-zinc-600 text-xs">{new Date(post.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <button className="text-zinc-700 hover:text-zinc-400 p-2 transition-colors">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <p className="text-zinc-300 mb-6 leading-relaxed">
                                        {post.content}
                                    </p>

                                    {post.image_url && (
                                        <div className="mb-6 rounded-2xl overflow-hidden border border-white/5 bg-black">
                                            <img
                                                src={post.image_url}
                                                alt="User shared content"
                                                className="w-full h-auto object-cover max-h-[500px] hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                                        <button className="flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors">
                                            <Heart className="w-5 h-5" />
                                            <span className="text-sm font-medium">Like</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                                            className={`flex items-center gap-2 transition-colors ${activeComments[post.id] ? 'text-blue-500' : 'text-zinc-500 hover:text-blue-500'}`}
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="text-sm font-medium">
                                                {comments.filter(c => c.post_id === post.id).length} Comments
                                            </span>
                                        </button>
                                    </div>

                                    {/* Comments Section */}
                                    {activeComments[post.id] && (
                                        <div className="mt-6 pt-6 border-t border-white/5 space-y-4 animate-in fade-in slide-in-from-top-2">
                                            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                                {comments.filter(c => c.post_id === post.id).map(comment => (
                                                    <div key={comment.id} className="flex gap-3">
                                                        <div className="w-8 h-8 bg-zinc-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                                                            <User className="w-4 h-4 text-zinc-500" />
                                                        </div>
                                                        <div className="flex-1 bg-zinc-800/50 rounded-2xl p-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-xs font-bold text-zinc-300">{comment.user_email.split('@')[0]}</span>
                                                                <span className="text-[10px] text-zinc-600">{new Date(comment.created_at).toLocaleDateString()}</span>
                                                            </div>
                                                            <p className="text-sm text-zinc-400">{comment.content}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {comments.filter(c => c.post_id === post.id).length === 0 && (
                                                    <p className="text-center text-xs text-zinc-600 py-4 italic">No comments yet. Start the conversation!</p>
                                                )}
                                            </div>

                                            {user && (
                                                <div className="flex gap-2 pt-2">
                                                    <input
                                                        type="text"
                                                        value={newComment[post.id] || ''}
                                                        onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                        placeholder="Write a comment..."
                                                        className="flex-1 bg-black/40 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-600/50 transition-all"
                                                        onKeyDown={async (e) => {
                                                            if (e.key === 'Enter' && newComment[post.id]) {
                                                                const { error } = await supabase.from('comments').insert({
                                                                    post_id: post.id,
                                                                    user_id: user.id,
                                                                    user_email: user.email,
                                                                    content: newComment[post.id]
                                                                });
                                                                if (!error) {
                                                                    setNewComment(prev => ({ ...prev, [post.id]: '' }));
                                                                    fetchComments();
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            if (!newComment[post.id]) return;
                                                            const { error } = await supabase.from('comments').insert({
                                                                post_id: post.id,
                                                                user_id: user.id,
                                                                user_email: user.email,
                                                                content: newComment[post.id]
                                                            });
                                                            if (!error) {
                                                                setNewComment(prev => ({ ...prev, [post.id]: '' }));
                                                                fetchComments();
                                                            }
                                                        }}
                                                        className="p-2 bg-red-600 rounded-xl text-white hover:bg-red-700 transition-colors"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { Clock, User, ArrowRight, BookOpen, Search } from 'lucide-react';

export const BlogSection: React.FC<{ limit?: number }> = ({ limit }) => {
  const { setActiveRoute } = useApp();
  const allPosts = storageService.getBlogPosts().filter(b => b.published);

  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Orthodontics', label: 'Orthodontics & Braces' },
    { id: 'Cosmetic Dentistry', label: 'Cosmetic & Whitening' },
    { id: 'Implantology', label: 'Dental Implants' },
    { id: 'Endodontics', label: 'Root Canal Therapy' },
    { id: 'Periodontics', label: 'Gum & Oral Health' },
    { id: 'Pediatric Care', label: 'Pediatric Dental Care' },
  ];

  const filtered = allPosts.filter(p => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesQuery =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
              Oral Health Insights
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Dental Education & Guides
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Written by our dental surgeons to provide transparent, evidence-based guidance on everyday dental wellness.
            </p>
          </div>

          {!limit && (
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              />
            </div>
          )}
        </div>

        {/* Categories Bar */}
        {!limit && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCat === cat.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-teal-400 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-teal-700 uppercase tracking-wider text-[11px]">
                    {post.category}
                  </span>
                  <span className="tabular-nums text-[11px]">{post.readTime}</span>
                </div>

                <h3
                  onClick={() => {
                    setActiveRoute(`/blog/${post.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-base sm:text-lg font-bold text-slate-900 font-display hover:text-teal-700 cursor-pointer transition-colors leading-snug"
                >
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{post.author}</div>
                  <div className="text-[10px] text-slate-400">{post.authorTitle}</div>
                </div>

                <button
                  onClick={() => {
                    setActiveRoute(`/blog/${post.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 group"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

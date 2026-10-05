import React from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { Clock, User, Calendar, ArrowRight, ChevronLeft, Share2, BookOpen } from 'lucide-react';

export const BlogPostDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const { setActiveRoute } = useApp();
  const post = storageService.getBlogPostBySlug(slug) || storageService.getBlogPosts()[0];
  const relatedPosts = storageService.getBlogPosts().filter(p => p.id !== post.id).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-slate-800">Article Not Found</h2>
        <button
          onClick={() => setActiveRoute('/blog')}
          className="mt-4 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => setActiveRoute('/')} className="hover:text-slate-900">
            Home
          </button>
          <span>/</span>
          <button onClick={() => setActiveRoute('/blog')} className="hover:text-slate-900">
            Blog
          </button>
          <span>/</span>
          <span className="text-teal-800 font-semibold truncate">{post.title}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-12 shadow-xs">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider text-[11px]">
              {post.category}
            </span>
            <span>·</span>
            <span className="tabular-nums">{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author Box */}
          <div className="flex items-center gap-3.5 pb-8 mb-8 border-b border-slate-100">
            <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm">
              {post.author.split(' ')[1]?.[0] || 'D'}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">{post.author}</div>
              <div className="text-xs text-slate-500">{post.authorTitle}</div>
            </div>
          </div>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8 bg-slate-50 p-5 rounded-xl border border-slate-100">
            {post.excerpt}
          </p>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-6">
            {post.content.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-2">Tags:</span>
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900 font-display mb-6">
            Related Oral Health Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map(rel => (
              <div
                key={rel.id}
                onClick={() => {
                  setActiveRoute(`/blog/${rel.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-teal-400 cursor-pointer transition-all shadow-2xs"
              >
                <div className="text-[10px] uppercase font-bold text-teal-700 mb-1">
                  {rel.category}
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug">
                  {rel.title}
                </h4>
                <div className="text-[11px] text-slate-400 mt-3 flex items-center justify-between">
                  <span>{rel.readTime}</span>
                  <span className="text-teal-700 font-semibold">Read →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

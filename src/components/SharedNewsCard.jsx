import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

export default function SharedNewsCard({ news, onLikeToggle, onCommentAdd }) {
  const { isAuthenticated } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please login to like news');
      return;
    }

    try {
      const response = await axios.post(`/api/shared-news/${news._id}/like`);
      onLikeToggle?.(news._id, response.data);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please login to comment');
      return;
    }

    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`/api/shared-news/${news._id}/comment`, {
        comment: newComment
      });
      
      onCommentAdd?.(news._id, response.data);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      {news.imageUrl && (
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={news.sharedBy?.avatar || '/default-avatar.png'}
            alt={news.sharedBy?.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {news.sharedBy?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(news.createdAt)}
            </p>
          </div>
          <span className="ml-auto px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {news.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          {news.title}
        </h3>
        
        {news.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {news.description}
          </p>
        )}

        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium mb-4"
        >
          Read full article →
        </a>

        <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition ${
                news.isLiked
                  ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {news.isLiked ? '❤️' : '🤍'} {news.likesCount || 0}
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              💬 {news.comments?.length || 0}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <FacebookShareButton url={news.url} quote={news.title}>
              <FacebookIcon size={24} round />
            </FacebookShareButton>
            <TwitterShareButton url={news.url} title={news.title}>
              <TwitterIcon size={24} round />
            </TwitterShareButton>
            <WhatsappShareButton url={news.url} title={news.title}>
              <WhatsappIcon size={24} round />
            </WhatsappShareButton>
          </div>
        </div>

        {showComments && (
          <div className="mt-4 space-y-4 border-t dark:border-gray-700 pt-4">
            {news.comments?.map((comment) => (
              <div key={comment._id} className="flex gap-3">
                <img
                  src={comment.user?.avatar || '/default-avatar.png'}
                  alt={comment.user?.name}
                  className="w-6 h-6 rounded-full"
                />
                <div>
                  <p className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {comment.user?.name}
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-300">
                      {comment.comment}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))}

            {isAuthenticated && (
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '...' : 'Post'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

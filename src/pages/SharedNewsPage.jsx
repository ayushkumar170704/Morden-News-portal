import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ShareNewsModal from '../components/ShareNewsModal';

export default function SharedNewsPage() {
  const { isAuthenticated } = useAuth();
  const [sharedNews, setSharedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  const loadSharedNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/shared-news', { 
        params: { page: 1, limit: 12 } 
      });
      setSharedNews(response.data.sharedNews || []);
    } catch (error) {
      console.error('Error loading shared news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSharedNews();
  }, []);

  const handleNewsShared = (newSharedNews) => {
    setSharedNews(prevNews => [newSharedNews, ...prevNews]);
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Community Shared News
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover and share news articles with the community
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <Link
              to="/"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Home
            </Link>
            
            {isAuthenticated && (
              <button
                onClick={() => setShowShareModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                📰 Share News Article
              </button>
            )}
          </div>
        </div>

        {!isAuthenticated && (
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 text-center text-lg">
              <strong>Please Login</strong> to share news articles and interact with the community!
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading shared news...</p>
            </div>
          </div>
        ) : sharedNews.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No shared news found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Be the first to share an interesting news article!
            </p>
            {isAuthenticated && (
              <button
                onClick={() => setShowShareModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Share Your First News
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sharedNews.map(news => (
              <div key={news._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {news.description}
                </p>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Read full article →
                </a>
              </div>
            ))}
          </div>
        )}

        {showShareModal && (
          <ShareNewsModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            onNewsShared={handleNewsShared}
          />
        )}
      </div>
    </div>
  );
}

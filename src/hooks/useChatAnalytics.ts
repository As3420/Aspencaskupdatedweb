import { useState, useEffect } from 'react';
import { ChatAnalytics } from '../types/chat';

export const useChatAnalytics = () => {
  const [analytics, setAnalytics] = useState<ChatAnalytics>({
    totalSessions: 0,
    activeUsers: 0,
    averageSessionDuration: 0,
    commonQueries: [],
    satisfactionScore: 0,
    conversionRate: 0
  });

  useEffect(() => {
    // Load analytics from localStorage
    const savedAnalytics = localStorage.getItem('aspencask_chat_analytics');
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    }
  }, []);

  const updateAnalytics = (data: Partial<ChatAnalytics>) => {
    setAnalytics(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('aspencask_chat_analytics', JSON.stringify(updated));
      return updated;
    });
  };

  const trackSession = () => {
    updateAnalytics({
      totalSessions: analytics.totalSessions + 1,
      activeUsers: analytics.activeUsers + 1
    });
  };

  const trackQuery = (query: string) => {
    const commonQueries = [...analytics.commonQueries];
    const existingQuery = commonQueries.find(q => q.includes(query.toLowerCase()));
    
    if (!existingQuery) {
      commonQueries.push(query.toLowerCase());
      updateAnalytics({ commonQueries: commonQueries.slice(-20) }); // Keep last 20 queries
    }
  };

  const trackSatisfaction = (score: number) => {
    const newScore = (analytics.satisfactionScore + score) / 2;
    updateAnalytics({ satisfactionScore: newScore });
  };

  return {
    analytics,
    trackSession,
    trackQuery,
    trackSatisfaction,
    updateAnalytics
  };
};
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InteractiveThreatMap from './pages/interactive-threat-map';
import RealTimeMonitoringDashboard from './pages/real-time-monitoring-dashboard';
import CommunityAlertPreferences from './pages/community-alert-preferences';
import AlertManagementCenter from './pages/alert-management-center';
import HistoricalDataAnalysis from './pages/historical-data-analysis';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AlertManagementCenter />} />
        <Route path="/interactive-threat-map" element={<InteractiveThreatMap />} />
        <Route path="/real-time-monitoring-dashboard" element={<RealTimeMonitoringDashboard />} />
        <Route path="/community-alert-preferences" element={<CommunityAlertPreferences />} />
        <Route path="/alert-management-center" element={<AlertManagementCenter />} />
        <Route path="/historical-data-analysis" element={<HistoricalDataAnalysis />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

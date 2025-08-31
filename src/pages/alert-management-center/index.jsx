import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AlertCard from './components/AlertCard';
import AlertComposer from './components/AlertComposer';
import AlertFilters from './components/AlertFilters';
import AlertHistory from './components/AlertHistory';
import ThresholdConfig from './components/ThresholdConfig';

const AlertManagementCenter = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isThresholdConfigOpen, setIsThresholdConfigOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    severity: '',
    threatType: '',
    timeRange: 'all'
  });

  // Mock data for alerts
  const mockAlerts = [
    {
      id: 'ALT-001',
      title: 'Critical Sea Level Rise Detected',
      threatType: 'Sea Level Rise',
      severity: 'critical',
      status: 'active',
      location: 'Mumbai Coastal Zone',
      description: 'Abnormal sea level rise of 2.3m detected in Mumbai coastal areas. Immediate evacuation of low-lying areas recommended. Storm surge conditions expected to worsen.',
      affectedArea: '15km coastal radius',
      confidence: 95,
      source: 'Tide Gauge Station MUM-01',
      recipientCount: 25847,
      timestamp: '2025-08-30 18:15:00',
      distribution: {
        sms: { sent: 25847, delivered: 24932, failed: 915 },
        push: { sent: 18234, delivered: 17891, failed: 343 },
        email: { sent: 12456, delivered: 12234, failed: 222 }
      }
    },
    {
      id: 'ALT-002',
      title: 'Harmful Algal Bloom Alert',
      threatType: 'Algal Bloom',
      severity: 'high',
      status: 'active',
      location: 'Goa Beaches',
      description: 'Toxic algal bloom detected along Goa coastline. Water contact prohibited. Marine life impact observed. Health advisory issued for coastal communities.',
      affectedArea: '8km beach stretch',
      confidence: 87,
      source: 'Satellite Imagery Analysis',
      recipientCount: 12456,
      timestamp: '2025-08-30 16:45:00',
      distribution: {
        sms: { sent: 12456, delivered: 12123, failed: 333 },
        push: { sent: 9876, delivered: 9654, failed: 222 },
        email: { sent: 7890, delivered: 7723, failed: 167 }
      }
    },
    {
      id: 'ALT-003',
      title: 'Illegal Dumping Activity Detected',
      threatType: 'Illegal Dumping',
      severity: 'moderate',
      status: 'pending',
      location: 'Chennai Port Area',
      description: 'Unauthorized waste discharge detected near Chennai port. Environmental hazard assessment in progress. Authorities notified for immediate action.',
      affectedArea: '2km radius from port',
      confidence: 78,
      source: 'Drone Surveillance',
      recipientCount: 5432,
      timestamp: '2025-08-30 14:20:00',
      distribution: {
        sms: { sent: 5432, delivered: 5234, failed: 198 },
        push: { sent: 4321, delivered: 4198, failed: 123 },
        email: { sent: 3456, delivered: 3398, failed: 58 }
      }
    },
    {
      id: 'ALT-004',
      title: 'Cyclone Approach Warning',
      threatType: 'Cyclone',
      severity: 'high',
      status: 'resolved',
      location: 'Odisha Coast',
      description: 'Cyclone Biparjoy approaching Odisha coast. Expected landfall in 48 hours. Evacuation procedures initiated. Emergency shelters activated.',
      affectedArea: '50km coastal zone',
      confidence: 92,
      source: 'Weather Station Network',
      recipientCount: 45678,
      timestamp: '2025-08-29 22:30:00',
      distribution: {
        sms: { sent: 45678, delivered: 44892, failed: 786 },
        push: { sent: 34567, delivered: 33891, failed: 676 },
        email: { sent: 23456, delivered: 23123, failed: 333 }
      }
    },
    {
      id: 'ALT-005',
      title: 'Minor Temperature Anomaly',
      threatType: 'Sea Level Rise',
      severity: 'low',
      status: 'cancelled',
      location: 'Kerala Backwaters',
      description: 'Slight temperature increase detected in Kerala backwater systems. Monitoring continues. No immediate action required.',
      affectedArea: '5km waterway network',
      confidence: 65,
      source: 'Temperature Sensors',
      recipientCount: 2345,
      timestamp: '2025-08-30 12:15:00',
      distribution: {
        sms: { sent: 2345, delivered: 2298, failed: 47 },
        push: { sent: 1876, delivered: 1834, failed: 42 },
        email: { sent: 1234, delivered: 1211, failed: 23 }
      }
    }
  ];

  // Mock alert history data
  const mockAlertHistory = [
    {
      id: 'HIST-001',
      alertId: 'ALT-001',
      alertTitle: 'Critical Sea Level Rise Detected',
      action: 'created',
      user: 'Dr. Sarah Chen',
      timestamp: '2025-08-30 18:15:00',
      description: 'Alert created based on tide gauge readings exceeding critical threshold',
      affectedUsers: 25847,
      deliveryStats: {
        sms: { sent: 25847, delivered: 24932 },
        push: { sent: 18234, delivered: 17891 },
        email: { sent: 12456, delivered: 12234 }
      }
    },
    {
      id: 'HIST-002',
      alertId: 'ALT-002',
      alertTitle: 'Harmful Algal Bloom Alert',
      action: 'escalated',
      user: 'Marine Biologist Team',
      timestamp: '2025-08-30 17:30:00',
      description: 'Alert escalated from moderate to high severity due to toxicity levels',
      changes: [
        { field: 'Severity', from: 'moderate', to: 'high' },
        { field: 'Recipient Count', from: '8,456', to: '12,456' }
      ]
    },
    {
      id: 'HIST-003',
      alertId: 'ALT-004',
      alertTitle: 'Cyclone Approach Warning',
      action: 'resolved',
      user: 'Emergency Coordinator',
      timestamp: '2025-08-30 08:45:00',
      description: 'Cyclone passed without major impact, alert marked as resolved',
      affectedUsers: 45678
    },
    {
      id: 'HIST-004',
      alertId: 'ALT-005',
      alertTitle: 'Minor Temperature Anomaly',
      action: 'cancelled',
      user: 'System Administrator',
      timestamp: '2025-08-30 13:20:00',
      description: 'False positive detected, alert cancelled after sensor recalibration'
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
    setFilteredAlerts(mockAlerts);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = alerts;

    // Apply filters
    if (filters?.status) {
      filtered = filtered?.filter(alert => alert?.status === filters?.status);
    }
    if (filters?.severity) {
      filtered = filtered?.filter(alert => alert?.severity === filters?.severity);
    }
    if (filters?.threatType) {
      filtered = filtered?.filter(alert => alert?.threatType === filters?.threatType);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered?.filter(alert =>
        alert?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        alert?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        alert?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Sort by timestamp (newest first)
    filtered?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredAlerts(filtered);
  }, [alerts, filters, searchQuery]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      severity: '',
      threatType: '',
      timeRange: 'all'
    });
    setSearchQuery('');
  };

  const handleCreateAlert = () => {
    setEditingAlert(null);
    setIsComposerOpen(true);
  };

  const handleEditAlert = (alertId) => {
    const alert = alerts?.find(a => a?.id === alertId);
    setEditingAlert(alert);
    setIsComposerOpen(true);
  };

  const handleSaveAlert = (alertData) => {
    if (editingAlert) {
      // Update existing alert
      setAlerts(prev => prev?.map(alert =>
        alert?.id === editingAlert?.id
          ? { ...alert, ...alertData, timestamp: new Date()?.toLocaleString() }
          : alert
      ));
    } else {
      // Create new alert
      const newAlert = {
        id: `ALT-${String(alerts?.length + 1)?.padStart(3, '0')}`,
        ...alertData,
        status: 'active',
        confidence: 85,
        source: 'Manual Entry',
        recipientCount: 1000,
        timestamp: new Date()?.toLocaleString(),
        distribution: {
          sms: { sent: 1000, delivered: 980, failed: 20 },
          push: { sent: 800, delivered: 785, failed: 15 },
          email: { sent: 600, delivered: 590, failed: 10 }
        }
      };
      setAlerts(prev => [newAlert, ...prev]);
    }
  };

  const handleEscalateAlert = (alertId) => {
    setAlerts(prev => prev?.map(alert => {
      if (alert?.id === alertId) {
        const severityOrder = ['low', 'moderate', 'high', 'critical'];
        const currentIndex = severityOrder?.indexOf(alert?.severity);
        const newSeverity = currentIndex < severityOrder?.length - 1
          ? severityOrder?.[currentIndex + 1]
          : alert?.severity;
        return { ...alert, severity: newSeverity };
      }
      return alert;
    }));
  };

  const handleCancelAlert = (alertId) => {
    setAlerts(prev => prev?.map(alert =>
      alert?.id === alertId
        ? { ...alert, status: 'cancelled' }
        : alert
    ));
  };

  const handleViewDetails = (alertId) => {
    // In a real app, this would navigate to a detailed view
    console.log('View details for alert:', alertId);
  };

  const getAlertCounts = () => {
    return {
      critical: alerts?.filter(a => a?.severity === 'critical' && a?.status === 'active')?.length,
      high: alerts?.filter(a => a?.severity === 'high' && a?.status === 'active')?.length,
      moderate: alerts?.filter(a => a?.severity === 'moderate' && a?.status === 'active')?.length,
      low: alerts?.filter(a => a?.severity === 'low' && a?.status === 'active')?.length
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Alert Management Center - Coastal Threat Alert</title>
        <meta name="description" content="Configure, monitor, and distribute critical coastal threat notifications across multiple communication channels" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  Alert Management Center
                </h1>
                <p className="text-muted-foreground font-caption mt-2">
                  Configure, monitor, and distribute critical coastal threat notifications
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  iconName="History"
                  iconPosition="left"
                  onClick={() => setIsHistoryOpen(true)}
                >
                  View History
                </Button>
                
                <Button
                  variant="outline"
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => setIsThresholdConfigOpen(true)}
                >
                  Configure Thresholds
                </Button>
                
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleCreateAlert}
                >
                  Create Alert
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search alerts by title, location, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full"
                />
              </div>
            </div>

            <AlertFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              alertCounts={getAlertCounts()}
            />
          </div>

          {/* Alert List */}
          <div className="space-y-4">
            {filteredAlerts?.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                  <Icon name="AlertTriangle" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  No alerts found
                </h3>
                <p className="text-muted-foreground font-caption mb-6">
                  {searchQuery || Object.values(filters)?.some(f => f)
                    ? 'Try adjusting your search or filters' :'Create your first alert to get started'
                  }
                </p>
                {!searchQuery && !Object.values(filters)?.some(f => f) && (
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={handleCreateAlert}
                  >
                    Create First Alert
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground font-caption">
                    Showing {filteredAlerts?.length} of {alerts?.length} alerts
                  </p>
                </div>

                {filteredAlerts?.map((alert) => (
                  <AlertCard
                    key={alert?.id}
                    alert={alert}
                    onEscalate={handleEscalateAlert}
                    onModify={handleEditAlert}
                    onCancel={handleCancelAlert}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </main>
      {/* Modals */}
      <AlertComposer
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onSave={handleSaveAlert}
        editingAlert={editingAlert}
      />
      <AlertHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        alertHistory={mockAlertHistory}
      />
      <ThresholdConfig
        isOpen={isThresholdConfigOpen}
        onClose={() => setIsThresholdConfigOpen(false)}
        onSave={(config) => console.log('Threshold config saved:', config)}
        currentConfig={{
          seaLevel: { low: 0.5, moderate: 1.0, high: 1.5, critical: 2.0 },
          windSpeed: { low: 25, moderate: 40, high: 60, critical: 80 },
          waveHeight: { low: 2.0, moderate: 3.5, high: 5.0, critical: 7.0 },
          temperature: { low: 2.0, moderate: 4.0, high: 6.0, critical: 8.0 }
        }}
      />
    </div>
  );
};

export default AlertManagementCenter;
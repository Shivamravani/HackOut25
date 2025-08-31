import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ThreatStatusCard from './components/ThreatStatusCard';
import ActiveAlertsList from './components/ActiveAlertsList';
import SensorReadingsCarousel from './components/SensorReadingsCarousel';
import InteractiveCoastalMap from './components/InteractiveCoastalMap';
import LiveDataWidgets from './components/LiveDataWidgets';
import QuickActionPanel from './components/QuickActionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RealTimeMonitoringDashboard = () => {
  const navigate = useNavigate();
  const [currentThreat, setCurrentThreat] = useState('moderate');
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('2 minutes ago');
  const [isOnline, setIsOnline] = useState(true);

  // Mock data for demonstration with Indian locations and contact info
  const activeAlerts = [
    {
      id: 1,
      type: 'sea-level',
      title: 'Rising Sea Level Detected',
      description: 'Tide gauge readings show abnormal water level increase of 0.8m above normal high tide predictions. Coastal flooding risk elevated for low-lying areas.',
      severity: 'high',
      location: 'Nariman Point Station',
      timestamp: '5 min ago'
    },
    {
      id: 2,
      type: 'algal-bloom',
      title: 'Algal Bloom Formation',
      description: 'Satellite imagery indicates potential harmful algal bloom development in coastal waters. Water quality monitoring recommended.',
      severity: 'moderate',
      location: 'Versova Beach Area',
      timestamp: '12 min ago'
    },
    {
      id: 3,
      type: 'weather-warning',
      title: 'Monsoon System Approaching',
      description: 'Weather station data shows rapid pressure drop and increasing wind speeds. Heavy monsoon conditions expected within 6 hours.',
      severity: 'high',
      location: 'Mumbai Weather Center',
      timestamp: '18 min ago'
    }
  ];

  const sensorData = [
    {
      id: 1,
      name: 'Marine Drive Station Alpha',
      type: 'tide-gauge',
      location: 'Marine Drive',
      status: 'normal',
      lastUpdated: '30 sec ago',
      readings: [
        { parameter: 'Water Level', value: '2.3', unit: 'm', trend: 'up', change: '+0.2m' },
        { parameter: 'Temperature', value: '28.5', unit: '°C', trend: 'stable' },
        { parameter: 'Salinity', value: '35.2', unit: 'ppt', trend: 'down', change: '-0.1ppt' },
        { parameter: 'pH Level', value: '8.1', unit: 'pH', trend: 'stable' }
      ]
    },
    {
      id: 2,
      name: 'Bandra Weather Station Beta',
      type: 'weather-station',
      location: 'Bandra-Kurla Complex',
      status: 'warning',
      lastUpdated: '1 min ago',
      readings: [
        { parameter: 'Wind Speed', value: '52', unit: 'km/h', trend: 'up', change: '+15km/h' },
        { parameter: 'Pressure', value: '1003', unit: 'hPa', trend: 'down', change: '-12hPa' },
        { parameter: 'Humidity', value: '85', unit: '%', trend: 'up', change: '+8%' },
        { parameter: 'Visibility', value: '8', unit: 'km', trend: 'down', change: '-4km' }
      ]
    },
    {
      id: 3,
      name: 'Juhu Water Quality Monitor',
      type: 'water-quality',
      location: 'Juhu Beach',
      status: 'critical',
      lastUpdated: '45 sec ago',
      readings: [
        { parameter: 'Dissolved O2', value: '4.2', unit: 'mg/L', trend: 'down', change: '-1.1mg/L' },
        { parameter: 'Turbidity', value: '15.8', unit: 'NTU', trend: 'up', change: '+3.2NTU' },
        { parameter: 'Chlorophyll', value: '28.5', unit: 'μg/L', trend: 'up', change: '+12.3μg/L' },
        { parameter: 'Nitrates', value: '2.1', unit: 'mg/L', trend: 'stable' }
      ]
    }
  ];

  const mapSensors = [
    { id: 1, name: 'Station Alpha', status: 'normal', type: 'tide-gauge' },
    { id: 2, name: 'Station Beta', status: 'warning', type: 'weather' },
    { id: 3, name: 'Station Gamma', status: 'critical', type: 'water-quality' },
    { id: 4, name: 'Station Delta', status: 'normal', type: 'seismic' },
    { id: 5, name: 'Station Echo', status: 'offline', type: 'satellite' },
    { id: 6, name: 'Station Foxtrot', status: 'normal', type: 'tide-gauge' }
  ];

  const weatherData = {
    timestamp: Date.now(),
    temperature: 32,
    feelsLike: 38,
    humidity: 78,
    windSpeed: 22,
    windDirection: 225,
    pressure: 1008
  };

  const tideData = {
    timestamp: Date.now(),
    currentLevel: 1.8,
    trend: 'rising',
    highTide: { time: '14:32', level: '2.4' },
    lowTide: { time: '20:15', level: '0.6' }
  };

  const satelliteData = {
    timestamp: Date.now(),
    cloudCover: 65,
    visibility: 12,
    resolution: 10,
    status: 'active'
  };

  const systemStatus = {
    uptime: '99.8%',
    activeSensors: 18,
    totalSensors: 20,
    dataQuality: 94,
    responseTime: 85
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated('Just now');
      setTimeout(() => setLastUpdated('1 minute ago'), 60000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle connection status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleAlertAcknowledge = (alertId) => {
    console.log('Acknowledging alert:', alertId);
    // In real app, this would update the alert status
  };

  const handleAlertEscalate = (alertId) => {
    console.log('Escalating alert:', alertId);
    // In real app, this would escalate the alert
  };

  const handleAlertAccept = (alertId) => {
    console.log('Accepting alert:', alertId);
    // In real app, this would update the alert status
  };

  const handleAlertRaise = (alertId) => {
    console.log('Raising alert:', alertId);
    // In real app, this would raise the alert
  };

  const handleSensorClick = (sensor) => {
    console.log('Sensor clicked:', sensor);
    // In real app, this would show sensor details
  };

  const handleEmergencyAlert = () => {
    console.log('Emergency alert triggered');
    // In real app, this would broadcast emergency alert
  };

  const handleSystemCheck = () => {
    console.log('System check initiated');
    // In real app, this would run system diagnostics
  };

  const handleExportData = () => {
    console.log('Exporting data');
    // In real app, this would export current data
  };

  const handleRefreshData = () => {
    console.log('Refreshing all data');
    setLastUpdated('Just now');
    // In real app, this would refresh all sensor data
  };

  const handleNavigateToMap = () => {
    navigate('/interactive-threat-map');
  };

  const handleNavigateToAlerts = () => {
    navigate('/alert-management-center');
  };

  const handleNavigateToAnalysis = () => {
    navigate('/historical-data-analysis');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Real-time Monitoring Dashboard
                </h1>
                <p className="text-muted-foreground font-body">
                  Live coastal threat monitoring and environmental data analysis for Mumbai
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Connection Status */}
                <div className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg border
                  ${isOnline ? 'border-success/20 bg-success/10 text-success' : 'border-error/20 bg-error/10 text-error'}
                `}>
                  <Icon name={isOnline ? 'Wifi' : 'WifiOff'} size={16} />
                  <span className="text-sm font-caption font-medium">
                    {isOnline ? 'Connected' : 'Offline'}
                  </span>
                </div>

                {/* Quick Navigation */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNavigateToMap}
                    iconName="Map"
                    iconSize={16}
                  >
                    Threat Map
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNavigateToAlerts}
                    iconName="Bell"
                    iconSize={16}
                  >
                    Alerts
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-First Layout */}
          <div className="space-y-6">
            {/* Critical Status Section - Always First on Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ThreatStatusCard 
                  currentThreat={currentThreat}
                  lastUpdated={lastUpdated}
                />
              </div>
              <div className="lg:col-span-1">
                <QuickActionPanel
                  onEmergencyAlert={handleEmergencyAlert}
                  onSystemCheck={handleSystemCheck}
                  onExportData={handleExportData}
                  onRefreshData={handleRefreshData}
                  systemStatus={systemStatus}
                />
              </div>
            </div>

            {/* Active Alerts - High Priority on Mobile */}
            <ActiveAlertsList
              alerts={activeAlerts}
              onAccept={handleAlertAccept}
              onRaise={handleAlertRaise}
            />

            {/* Live Data Widgets */}
            <LiveDataWidgets
              weatherData={weatherData}
              tideData={tideData}
              satelliteData={satelliteData}
            />

            {/* Sensor Readings Carousel - Mobile Optimized */}
            <SensorReadingsCarousel sensorData={sensorData} />

            {/* Interactive Map - Expandable */}
            <InteractiveCoastalMap
              sensors={mapSensors}
              onSensorClick={handleSensorClick}
              isFullscreen={isMapFullscreen}
              onToggleFullscreen={() => setIsMapFullscreen(!isMapFullscreen)}
            />

            {/* Quick Navigation Footer - Mobile Only */}
            <div className="md:hidden bg-card rounded-xl border border-border p-4">
              <h3 className="font-body font-semibold text-foreground mb-4">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleNavigateToMap}
                  iconName="Map"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Threat Map
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNavigateToAlerts}
                  iconName="Bell"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Alert Center
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNavigateToAnalysis}
                  iconName="TrendingUp"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Analysis
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/community-alert-preferences')}
                  iconName="Settings"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 right-4 bg-error text-error-foreground p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <Icon name="WifiOff" size={20} />
            <div>
              <div className="font-body font-semibold">Connection Lost</div>
              <div className="text-sm opacity-90">
                Operating in offline mode. Critical alerts cached locally.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeMonitoringDashboard;
import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MapContainer from './components/MapContainer';
import MapControls from './components/MapControls';
import MapLegend from './components/MapLegend';
import SensorPopup from './components/SensorPopup';
import TimeSlider from './components/TimeSlider';
import MobileInfoPanel from './components/MobileInfoPanel';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const InteractiveThreatMap = () => {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [selectedThreatZone, setSelectedThreatZone] = useState(null);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
  const [isTimeSliderVisible, setIsTimeSliderVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchLocation, setSearchLocation] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Layer visibility state
  const [layers, setLayers] = useState({
    threats: true,
    sensors: true,
    environment: true,
    zones: true
  });

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle fullscreen toggle
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleSensorClick = (sensor) => {
    setSelectedSensor(sensor);
    setSelectedThreatZone(null);
    if (isMobile) {
      setIsMobileInfoOpen(true);
    }
  };

  const handleThreatZoneClick = (zone) => {
    setSelectedThreatZone(zone);
    setSelectedSensor(null);
    if (isMobile) {
      setIsMobileInfoOpen(true);
    }
  };

  const handleLayerToggle = (layerName, isVisible) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: isVisible
    }));
  };

  const handleZoomIn = () => {
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    console.log('Zoom out');
  };

  const handleResetView = () => {
    console.log('Reset view');
    setSelectedSensor(null);
    setSelectedThreatZone(null);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleLocationSearch = (query) => {
    setSearchLocation(query);
    console.log('Searching for:', query);
  };

  const handleTimeChange = (time, range) => {
    setCurrentTime(time);
    console.log('Time changed:', time, range);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleViewSensorDetails = (sensorId) => {
    console.log('View sensor details:', sensorId);
    // In a real app, this would navigate to a detailed sensor view
  };

  const handleViewSensorHistory = (sensorId) => {
    console.log('View sensor history:', sensorId);
    setIsTimeSliderVisible(true);
  };

  const handleExportMap = () => {
    console.log('Export map');
    // In a real app, this would generate a map export
  };

  return (
    <div className={`min-h-screen bg-background ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {!isFullscreen && <Header />}
      
      <main className={`${isFullscreen ? 'h-screen' : 'h-screen pt-16'} relative overflow-hidden`}>
        {/* Map Container */}
        <MapContainer
          onSensorClick={handleSensorClick}
          onThreatZoneClick={handleThreatZoneClick}
          layers={layers}
          currentTime={currentTime}
          timeRange="24h"
          searchLocation={searchLocation}
        />

        {/* Map Controls */}
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
          onToggleFullscreen={handleToggleFullscreen}
          onLocationSearch={handleLocationSearch}
          isFullscreen={isFullscreen}
        />

        {/* Map Legend - Desktop */}
        {!isMobile && (
          <MapLegend
            layers={layers}
            onLayerToggle={handleLayerToggle}
            isCollapsed={isLegendCollapsed}
            onToggleCollapse={() => setIsLegendCollapsed(!isLegendCollapsed)}
          />
        )}

        {/* Sensor Popup - Desktop */}
        {!isMobile && selectedSensor && (
          <div 
            className="absolute z-30"
            style={{ 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <SensorPopup
              sensor={selectedSensor}
              onClose={() => setSelectedSensor(null)}
              onViewDetails={handleViewSensorDetails}
              onViewHistory={handleViewSensorHistory}
            />
          </div>
        )}

        {/* Time Slider */}
        {isTimeSliderVisible && (
          <TimeSlider
            onTimeChange={handleTimeChange}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
          />
        )}

        {/* Mobile Info Panel */}
        {isMobile && isMobileInfoOpen && (
          <MobileInfoPanel
            selectedSensor={selectedSensor}
            threatData={selectedThreatZone}
            onClose={() => setIsMobileInfoOpen(false)}
          />
        )}

        {/* Mobile Action Buttons */}
        {isMobile && (
          <div className="absolute bottom-4 right-4 z-20 flex flex-col space-y-2">
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsMobileInfoOpen(true)}
              iconName="Info"
              iconSize={20}
              className="shadow-lg"
            >
              <span className="sr-only">Show information panel</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsTimeSliderVisible(!isTimeSliderVisible)}
              iconName="Clock"
              iconSize={20}
              className="shadow-lg bg-card"
            >
              <span className="sr-only">Toggle time controls</span>
            </Button>
          </div>
        )}

        {/* Desktop Action Bar */}
        {!isMobile && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-2 bg-card border border-border rounded-lg shadow-lg p-2">
            <Button
              variant={isTimeSliderVisible ? "default" : "outline"}
              size="sm"
              onClick={() => setIsTimeSliderVisible(!isTimeSliderVisible)}
              iconName="Clock"
              iconPosition="left"
            >
              Time Controls
            </Button>
            <div className="w-px h-6 bg-border" />
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportMap}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
              iconName="Layers"
              iconPosition="left"
            >
              {isLegendCollapsed ? 'Show' : 'Hide'} Legend
            </Button>
          </div>
        )}

        {/* Status Indicators */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4">
          {/* Active Alerts */}
          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
              <span className="text-sm font-body font-medium text-foreground">3 Active Alerts</span>
            </div>
          </div>

          {/* Sensor Status */}
          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-sm font-body font-medium text-foreground">24/26 Sensors Online</span>
            </div>
          </div>

          {/* Last Update */}
          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
            <div className="flex items-center space-x-2">
              <Icon name="RefreshCw" size={14} className="text-muted-foreground" />
              <span className="text-sm font-body text-muted-foreground">Updated 2 min ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InteractiveThreatMap;
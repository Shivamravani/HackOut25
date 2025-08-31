import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveCoastalMap = ({ sensors, onSensorClick, isFullscreen, onToggleFullscreen }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [mapView, setMapView] = useState('satellite');

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'north-coast', name: 'North Coast' },
    { id: 'south-coast', name: 'South Coast' },
    { id: 'east-coast', name: 'East Coast' },
    { id: 'west-coast', name: 'West Coast' }
  ];

  const mapViews = [
    { id: 'satellite', name: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', name: 'Terrain', icon: 'Mountain' },
    { id: 'hybrid', name: 'Hybrid', icon: 'Layers' }
  ];

  const getSensorStatusColor = (status) => {
    const colorMap = {
      normal: '#10B981', // green-500
      warning: '#F59E0B', // amber-500
      critical: '#EF4444', // red-500
      offline: '#6B7280' // gray-500
    };
    return colorMap?.[status] || '#6B7280';
  };

  // Mock coordinates for Mumbai, India
  const mockCoordinates = "19.0760,72.8777"; // Mumbai, India coordinates

  return (
    <div className={`
      bg-card rounded-xl border border-border overflow-hidden
      ${isFullscreen ? 'fixed inset-4 z-50' : ''}
    `}>
      {/* Map Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Coastal Threat Map
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFullscreen}
              iconName={isFullscreen ? "Minimize2" : "Maximize2"}
              iconSize={16}
            >
              {isFullscreen ? "Exit" : "Fullscreen"}
            </Button>
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Region Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e?.target?.value)}
              className="text-sm font-body bg-background border border-border rounded px-2 py-1 text-foreground"
            >
              {regions?.map((region) => (
                <option key={region?.id} value={region?.id}>
                  {region?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Map View Toggle */}
          <div className="flex items-center space-x-1 bg-background rounded-lg p-1 border border-border">
            {mapViews?.map((view) => (
              <button
                key={view?.id}
                onClick={() => setMapView(view?.id)}
                className={`
                  flex items-center space-x-1 px-3 py-1 rounded text-xs font-caption font-medium
                  transition-all duration-200
                  ${mapView === view?.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={view?.icon} size={14} />
                <span>{view?.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className={`relative ${isFullscreen ? 'h-full' : 'h-96'}`}>
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Coastal Threat Monitoring Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mockCoordinates}&z=10&output=embed`}
          className="w-full h-full"
        />

        {/* Sensor Overlay Indicators */}
        <div className="absolute inset-0 pointer-events-none">
          {sensors?.map((sensor, index) => (
            <div
              key={sensor?.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${20 + (index * 15) % 60}%`,
                top: `${30 + (index * 10) % 40}%`
              }}
            >
              <button
                onClick={() => onSensorClick(sensor)}
                className={`
                  w-4 h-4 rounded-full border-2 border-white shadow-lg
                  hover:scale-125 transition-transform duration-200
                  animate-pulse
                `}
                style={{ backgroundColor: getSensorStatusColor(sensor?.status) }}
                title={`${sensor?.name} - ${sensor?.status}`}
              />
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg">
          <h4 className="text-sm font-body font-semibold text-foreground mb-2">
            Sensor Status
          </h4>
          <div className="space-y-1">
            {[
              { status: 'normal', label: 'Normal', count: sensors?.filter(s => s?.status === 'normal')?.length },
              { status: 'warning', label: 'Warning', count: sensors?.filter(s => s?.status === 'warning')?.length },
              { status: 'critical', label: 'Critical', count: sensors?.filter(s => s?.status === 'critical')?.length },
              { status: 'offline', label: 'Offline', count: sensors?.filter(s => s?.status === 'offline')?.length }
            ]?.map((item) => (
              <div key={item?.status} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full border border-white"
                  style={{ backgroundColor: getSensorStatusColor(item?.status) }}
                />
                <span className="text-xs font-caption text-foreground">
                  {item?.label} ({item?.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Update Indicator */}
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs font-caption text-foreground font-medium">
              Live Updates
            </span>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-foreground">
              {sensors?.length}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              Total Sensors
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-success">
              {sensors?.filter(s => s?.status === 'normal')?.length}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              Online
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-warning">
              {sensors?.filter(s => s?.status === 'warning')?.length}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              Warnings
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-error">
              {sensors?.filter(s => s?.status === 'critical')?.length}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              Critical
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCoastalMap;
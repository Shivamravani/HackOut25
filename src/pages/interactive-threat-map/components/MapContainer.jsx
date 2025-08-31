import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MapContainer = ({ 
  onSensorClick, 
  onThreatZoneClick, 
  layers, 
  currentTime, 
  timeRange,
  searchLocation 
}) => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai coordinates
  const [zoomLevel, setZoomLevel] = useState(12);

  // Mock sensor data with Indian locations
  const sensors = [
    {
      id: 'tg-001',
      name: 'Marine Drive Tide Gauge',
      type: 'tide-gauge',
      location: 'Marine Drive, Mumbai',
      position: { lat: 18.9447, lng: 72.8258 },
      status: 'active',
      lastUpdate: '2 minutes ago',
      readings: [
        { parameter: 'Water Level', value: '2.3', unit: 'm' },
        { parameter: 'Temperature', value: '28.5', unit: '°C' },
        { parameter: 'Salinity', value: '35.2', unit: 'ppt' }
      ],
      thresholds: [
        { level: 'warning', value: '3.0m' },
        { level: 'critical', value: '3.5m' }
      ]
    },
    {
      id: 'ws-012',
      name: 'Bandra-Worli Sea Link Weather Station',
      type: 'weather-station',
      location: 'Bandra-Worli Sea Link, Mumbai',
      position: { lat: 19.0330, lng: 72.8206 },
      status: 'active',
      lastUpdate: '1 minute ago',
      readings: [
        { parameter: 'Wind Speed', value: '18.5', unit: 'km/h' },
        { parameter: 'Wind Direction', value: 'SW', unit: '' },
        { parameter: 'Pressure', value: '1008.2', unit: 'hPa' }
      ],
      thresholds: [
        { level: 'warning', value: '45 km/h' },
        { level: 'critical', value: '65 km/h' }
      ]
    },
    {
      id: 'wq-005',
      name: 'Juhu Beach Water Quality Monitor',
      type: 'water-quality',
      location: 'Juhu Beach, Mumbai',
      position: { lat: 19.0961, lng: 72.8262 },
      status: 'warning',
      lastUpdate: '5 minutes ago',
      readings: [
        { parameter: 'pH Level', value: '7.2', unit: '' },
        { parameter: 'Dissolved Oxygen', value: '6.8', unit: 'mg/L' },
        { parameter: 'Turbidity', value: '15.3', unit: 'NTU' }
      ],
      thresholds: [
        { level: 'warning', value: 'pH < 7.5' },
        { level: 'critical', value: 'pH < 7.0' }
      ]
    }
  ];

  // Mock threat zones with Mumbai locations
  const threatZones = [
    {
      id: 'tz-001',
      type: 'high-tide',
      severity: 'moderate',
      center: { lat: 18.9447, lng: 72.8258 },
      radius: 2000,
      description: 'High tide alert zone - Marine Drive area'
    },
    {
      id: 'tz-002',
      type: 'monsoon-surge',
      severity: 'high',
      center: { lat: 19.0330, lng: 72.8206 },
      radius: 3000,
      description: 'Potential monsoon surge impact zone'
    }
  ];

  const getSensorIcon = (type, status) => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg cursor-pointer transform hover:scale-110 transition-transform";
    
    let bgColor = '';
    switch (status) {
      case 'active': bgColor = 'bg-success'; break;
      case 'warning': bgColor = 'bg-warning'; break;
      case 'critical': bgColor = 'bg-error'; break;
      case 'maintenance': bgColor = 'bg-muted-foreground'; break;
      default: bgColor = 'bg-gray-500';
    }

    const iconName = type === 'tide-gauge' ? 'Waves' : 
                    type === 'weather-station' ? 'Cloud' : 
                    type === 'water-quality' ? 'Droplets' : 'Radio';

    return { classes: `${baseClasses} ${bgColor}`, iconName };
  };

  const getThreatZoneStyle = (severity) => {
    switch (severity) {
      case 'high': return 'border-error bg-error/20';
      case 'moderate': return 'border-warning bg-warning/20';
      case 'low': return 'border-success bg-success/20';
      default: return 'border-muted bg-muted/20';
    }
  };

  useEffect(() => {
    if (searchLocation) {
      // Handle location search - in a real app, this would geocode the location
      console.log('Searching for location:', searchLocation);
    }
  }, [searchLocation]);

  return (
    <div ref={mapRef} className="relative w-full h-full bg-slate-100 overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Interactive Threat Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
        className="absolute inset-0"
      />
      {/* Overlay Container for Sensors and Threat Zones */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sensor Markers */}
        {layers?.sensors && sensors?.map(sensor => {
          const { classes, iconName } = getSensorIcon(sensor?.type, sensor?.status);
          
          // Calculate position based on map center and zoom (simplified positioning)
          const offsetX = (sensor?.position?.lng - mapCenter?.lng) * 100 * zoomLevel;
          const offsetY = (mapCenter?.lat - sensor?.position?.lat) * 100 * zoomLevel;
          
          return (
            <div
              key={sensor?.id}
              className="absolute pointer-events-auto"
              style={{
                left: `calc(50% + ${offsetX}px)`,
                top: `calc(50% + ${offsetY}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => onSensorClick(sensor)}
            >
              <div className={classes}>
                <Icon name={iconName} size={16} />
              </div>
              {/* Sensor Label */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-card border border-border rounded px-2 py-1 text-xs font-caption text-foreground whitespace-nowrap shadow-sm">
                {sensor?.name?.split(' ')?.[0]}
              </div>
            </div>
          );
        })}

        {/* Threat Zone Overlays */}
        {layers?.threats && threatZones?.map(zone => {
          const offsetX = (zone?.center?.lng - mapCenter?.lng) * 100 * zoomLevel;
          const offsetY = (mapCenter?.lat - zone?.center?.lat) * 100 * zoomLevel;
          const size = (zone?.radius / 1000) * 20; // Simplified size calculation
          
          return (
            <div
              key={zone?.id}
              className={`absolute pointer-events-auto border-2 rounded-full cursor-pointer ${getThreatZoneStyle(zone?.severity)}`}
              style={{
                left: `calc(50% + ${offsetX}px)`,
                top: `calc(50% + ${offsetY}px)`,
                width: `${size}px`,
                height: `${size}px`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => onThreatZoneClick(zone)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon 
                  name="AlertTriangle" 
                  size={Math.min(size / 3, 24)} 
                  className={zone?.severity === 'high' ? 'text-error' : 
                            zone?.severity === 'moderate' ? 'text-warning' : 'text-success'} 
                />
              </div>
            </div>
          );
        })}

        {/* Environmental Zones */}
        {layers?.environment && (
          <>
            {/* Blue Carbon Habitat */}
            <div
              className="absolute pointer-events-auto border-2 border-emerald-500 bg-emerald-500/20 rounded-lg"
              style={{
                left: '20%',
                top: '30%',
                width: '200px',
                height: '150px'
              }}
            >
              <div className="absolute top-2 left-2 bg-emerald-600 text-white px-2 py-1 rounded text-xs font-caption">
                Blue Carbon Habitat
              </div>
            </div>

            {/* Mangrove Area */}
            <div
              className="absolute pointer-events-auto border-2 border-lime-500 bg-lime-500/20 rounded-lg"
              style={{
                left: '60%',
                top: '20%',
                width: '180px',
                height: '120px'
              }}
            >
              <div className="absolute top-2 left-2 bg-lime-600 text-white px-2 py-1 rounded text-xs font-caption">
                Mangrove Forest
              </div>
            </div>
          </>
        )}

        {/* Zone Boundaries */}
        {layers?.zones && (
          <>
            {/* Evacuation Zone */}
            <div
              className="absolute pointer-events-auto border-4 border-dashed border-red-600 bg-red-600/10 rounded-lg"
              style={{
                left: '10%',
                top: '60%',
                width: '300px',
                height: '200px'
              }}
            >
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-caption">
                Evacuation Zone
              </div>
            </div>

            {/* Warning Zone */}
            <div
              className="absolute pointer-events-auto border-4 border-dashed border-orange-400 bg-orange-400/10 rounded-lg"
              style={{
                left: '40%',
                top: '50%',
                width: '250px',
                height: '180px'
              }}
            >
              <div className="absolute top-2 left-2 bg-orange-400 text-white px-2 py-1 rounded text-xs font-caption">
                Warning Zone
              </div>
            </div>
          </>
        )}
      </div>
      {/* Map Attribution */}
      <div className="absolute bottom-2 right-2 bg-card/90 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs font-caption text-muted-foreground">
        © Google Maps • Mumbai Coastal Threat Alert System
      </div>
      {/* Current Time Indicator */}
      {currentTime > 0 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-body font-medium shadow-lg">
          Historical View: {timeRange} ago
        </div>
      )}
    </div>
  );
};

export default MapContainer;
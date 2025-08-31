import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MapLegend = ({ layers, onLayerToggle, isCollapsed, onToggleCollapse }) => {
  const [activeTab, setActiveTab] = useState('threats');

  const legendTabs = [
    { id: 'threats', label: 'Threats', icon: 'AlertTriangle' },
    { id: 'sensors', label: 'Sensors', icon: 'Radio' },
    { id: 'environment', label: 'Environment', icon: 'Leaf' },
    { id: 'zones', label: 'Zones', icon: 'Map' }
  ];

  const threatLegendItems = [
    { id: 'high-tide', color: 'bg-red-500', label: 'High Tide Alert', count: 12 },
    { id: 'storm-surge', color: 'bg-orange-500', label: 'Storm Surge', count: 8 },
    { id: 'algal-bloom', color: 'bg-yellow-500', label: 'Algal Bloom', count: 5 },
    { id: 'illegal-dumping', color: 'bg-purple-500', label: 'Illegal Dumping', count: 3 },
    { id: 'cyclone-path', color: 'bg-pink-500', label: 'Cyclone Path', count: 2 }
  ];

  const sensorLegendItems = [
    { id: 'tide-gauge', color: 'bg-blue-500', label: 'Tide Gauges', count: 24, status: 'active' },
    { id: 'weather-station', color: 'bg-green-500', label: 'Weather Stations', count: 18, status: 'active' },
    { id: 'water-quality', color: 'bg-teal-500', label: 'Water Quality', count: 15, status: 'active' },
    { id: 'seismic', color: 'bg-indigo-500', label: 'Seismic Sensors', count: 9, status: 'maintenance' },
    { id: 'camera', color: 'bg-gray-500', label: 'Surveillance Cameras', count: 32, status: 'active' }
  ];

  const environmentLegendItems = [
    { id: 'blue-carbon', color: 'bg-emerald-500', label: 'Blue Carbon Habitats', area: '2,450 ha' },
    { id: 'coral-reef', color: 'bg-cyan-500', label: 'Coral Reefs', area: '1,200 ha' },
    { id: 'mangrove', color: 'bg-lime-500', label: 'Mangrove Forests', area: '3,800 ha' },
    { id: 'seagrass', color: 'bg-green-400', label: 'Seagrass Beds', area: '950 ha' }
  ];

  const zoneLegendItems = [
    { id: 'evacuation', color: 'bg-red-600', label: 'Evacuation Zones', type: 'Critical' },
    { id: 'warning', color: 'bg-orange-400', label: 'Warning Zones', type: 'Moderate' },
    { id: 'watch', color: 'bg-yellow-400', label: 'Watch Zones', type: 'Low' },
    { id: 'safe', color: 'bg-green-400', label: 'Safe Zones', type: 'Normal' }
  ];

  const renderLegendContent = () => {
    switch (activeTab) {
      case 'threats':
        return threatLegendItems?.map(item => (
          <div key={item?.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${item?.color}`} />
              <span className="text-sm font-body text-foreground">{item?.label}</span>
            </div>
            <span className="text-xs font-caption text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {item?.count}
            </span>
          </div>
        ));
      case 'sensors':
        return sensorLegendItems?.map(item => (
          <div key={item?.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${item?.color} relative`}>
                {item?.status === 'maintenance' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full" />
                )}
              </div>
              <span className="text-sm font-body text-foreground">{item?.label}</span>
            </div>
            <span className="text-xs font-caption text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {item?.count}
            </span>
          </div>
        ));
      case 'environment':
        return environmentLegendItems?.map(item => (
          <div key={item?.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${item?.color}`} />
              <span className="text-sm font-body text-foreground">{item?.label}</span>
            </div>
            <span className="text-xs font-caption text-muted-foreground">
              {item?.area}
            </span>
          </div>
        ));
      case 'zones':
        return zoneLegendItems?.map(item => (
          <div key={item?.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${item?.color} opacity-60`} />
              <span className="text-sm font-body text-foreground">{item?.label}</span>
            </div>
            <span className="text-xs font-caption text-muted-foreground font-medium">
              {item?.type}
            </span>
          </div>
        ));
      default:
        return null;
    }
  };

  if (isCollapsed) {
    return (
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={onToggleCollapse}
          className="bg-card border border-border rounded-lg p-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Icon name="Layers" size={20} className="text-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-20 w-80 bg-card border border-border rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">Map Legend</h3>
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-muted rounded-md transition-colors"
        >
          <Icon name="X" size={18} className="text-muted-foreground" />
        </button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {legendTabs?.map(tab => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-3 px-2 text-sm font-body font-medium
              transition-colors border-b-2
              ${activeTab === tab?.id
                ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        <div className="p-2 space-y-1">
          {renderLegendContent()}
        </div>
      </div>
      {/* Layer Controls */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-body font-medium text-foreground">Layer Visibility</span>
          <button className="text-xs font-caption text-primary hover:text-primary/80">
            Toggle All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['Threats', 'Sensors', 'Environment', 'Zones']?.map(layer => (
            <label key={layer} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                onChange={(e) => onLayerToggle(layer?.toLowerCase(), e?.target?.checked)}
              />
              <span className="text-sm font-body text-foreground">{layer}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
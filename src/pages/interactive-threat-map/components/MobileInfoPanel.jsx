import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const MobileInfoPanel = ({ selectedSensor, threatData, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [panelHeight, setPanelHeight] = useState('partial'); // partial, full

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'sensors', label: 'Sensors', icon: 'Radio' },
    { id: 'threats', label: 'Threats', icon: 'AlertTriangle' },
    { id: 'environment', label: 'Environment', icon: 'Leaf' }
  ];

  const togglePanelHeight = () => {
    setPanelHeight(prev => prev === 'partial' ? 'full' : 'partial');
  };

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Current Conditions */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-sm font-heading font-semibold text-foreground mb-3">Current Conditions</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary">Normal</div>
            <div className="text-xs font-caption text-muted-foreground">Threat Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-success">24</div>
            <div className="text-xs font-caption text-muted-foreground">Active Sensors</div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <h4 className="text-sm font-heading font-semibold text-foreground mb-3">Recent Alerts</h4>
        <div className="space-y-2">
          {[
            { type: 'High Tide', location: 'Marina Bay', time: '2 hours ago', severity: 'moderate' },
            { type: 'Water Quality', location: 'Coastal Park', time: '4 hours ago', severity: 'low' },
            { type: 'Weather Alert', location: 'Harbor District', time: '6 hours ago', severity: 'high' }
          ]?.map((alert, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                alert?.severity === 'high' ? 'bg-error' : 
                alert?.severity === 'moderate' ? 'bg-warning' : 'bg-success'
              }`} />
              <div className="flex-1">
                <div className="text-sm font-body font-medium text-foreground">{alert?.type}</div>
                <div className="text-xs font-caption text-muted-foreground">{alert?.location} • {alert?.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSensors = () => (
    <div className="space-y-3">
      {[
        { name: 'Tide Gauge TG-001', location: 'Marina Bay', status: 'active', value: '2.3m', type: 'tide-gauge' },
        { name: 'Weather Station WS-012', location: 'Harbor District', status: 'active', value: '15°C', type: 'weather' },
        { name: 'Water Quality WQ-005', location: 'Coastal Park', status: 'warning', value: '7.2 pH', type: 'water' },
        { name: 'Seismic Sensor SS-003', location: 'Pier 7', status: 'maintenance', value: 'Offline', type: 'seismic' }
      ]?.map((sensor, index) => (
        <div key={index} className="p-3 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                sensor?.status === 'active' ? 'bg-success' : 
                sensor?.status === 'warning' ? 'bg-warning' : 'bg-muted-foreground'
              }`} />
              <span className="text-sm font-body font-medium text-foreground">{sensor?.name}</span>
            </div>
            <span className="text-sm font-body text-foreground">{sensor?.value}</span>
          </div>
          <div className="text-xs font-caption text-muted-foreground">{sensor?.location}</div>
        </div>
      ))}
    </div>
  );

  const renderThreats = () => (
    <div className="space-y-3">
      {[
        { type: 'High Tide Alert', severity: 'moderate', affected: '3 zones', eta: '2 hours' },
        { type: 'Storm Surge', severity: 'high', affected: '5 zones', eta: '6 hours' },
        { type: 'Algal Bloom', severity: 'low', affected: '1 zone', eta: 'Current' },
        { type: 'Illegal Dumping', severity: 'moderate', affected: '2 locations', eta: 'Ongoing' }
      ]?.map((threat, index) => (
        <div key={index} className="p-3 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                threat?.severity === 'high' ? 'bg-error' : 
                threat?.severity === 'moderate' ? 'bg-warning' : 'bg-success'
              }`} />
              <span className="text-sm font-body font-medium text-foreground">{threat?.type}</span>
            </div>
            <span className="text-xs font-caption text-muted-foreground capitalize">{threat?.severity}</span>
          </div>
          <div className="flex justify-between text-xs font-caption text-muted-foreground">
            <span>Affected: {threat?.affected}</span>
            <span>ETA: {threat?.eta}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEnvironment = () => (
    <div className="space-y-4">
      {/* Blue Carbon Status */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <h4 className="text-sm font-heading font-semibold text-emerald-800 mb-2">Blue Carbon Habitats</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-lg font-heading font-bold text-emerald-700">2,450 ha</div>
            <div className="text-xs font-caption text-emerald-600">Total Area</div>
          </div>
          <div>
            <div className="text-lg font-heading font-bold text-emerald-700">94%</div>
            <div className="text-xs font-caption text-emerald-600">Health Score</div>
          </div>
        </div>
      </div>

      {/* Environmental Zones */}
      <div>
        <h4 className="text-sm font-heading font-semibold text-foreground mb-3">Environmental Zones</h4>
        <div className="space-y-2">
          {[
            { name: 'Mangrove Forests', area: '3,800 ha', health: '96%', color: 'bg-lime-500' },
            { name: 'Coral Reefs', area: '1,200 ha', health: '87%', color: 'bg-cyan-500' },
            { name: 'Seagrass Beds', area: '950 ha', health: '91%', color: 'bg-green-400' }
          ]?.map((zone, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
              <div className={`w-4 h-4 rounded ${zone?.color}`} />
              <div className="flex-1">
                <div className="text-sm font-body font-medium text-foreground">{zone?.name}</div>
                <div className="text-xs font-caption text-muted-foreground">{zone?.area} • Health: {zone?.health}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'sensors': return renderSensors();
      case 'threats': return renderThreats();
      case 'environment': return renderEnvironment();
      default: return renderOverview();
    }
  };

  return (
    <div className={`
      fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border rounded-t-xl shadow-2xl
      transition-all duration-300 ease-in-out
      ${panelHeight === 'full' ? 'h-5/6' : 'h-1/2'}
    `}>
      {/* Handle */}
      <div className="flex justify-center py-2">
        <button
          onClick={togglePanelHeight}
          className="w-12 h-1 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50 transition-colors"
        />
      </div>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">Map Information</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePanelHeight}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Icon name={panelHeight === 'full' ? 'ChevronDown' : 'ChevronUp'} size={18} className="text-muted-foreground" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Icon name="X" size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map(tab => (
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
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MobileInfoPanel;
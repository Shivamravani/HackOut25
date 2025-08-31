import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SensorPopup = ({ sensor, onClose, onViewDetails, onViewHistory }) => {
  if (!sensor) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      case 'maintenance': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'AlertCircle';
      case 'maintenance': return 'Settings';
      default: return 'Circle';
    }
  };

  return (
    <div className="absolute z-30 bg-card border border-border rounded-lg shadow-xl w-80 max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${sensor?.type === 'tide-gauge' ? 'bg-blue-100' : 
            sensor?.type === 'weather-station' ? 'bg-green-100' : 
            sensor?.type === 'water-quality' ? 'bg-teal-100' : 'bg-gray-100'}`}>
            <Icon 
              name={sensor?.type === 'tide-gauge' ? 'Waves' : 
                sensor?.type === 'weather-station' ? 'Cloud' : 
                sensor?.type === 'water-quality' ? 'Droplets' : 'Radio'} 
              size={20} 
              className={sensor?.type === 'tide-gauge' ? 'text-blue-600' : 
                sensor?.type === 'weather-station' ? 'text-green-600' : 
                sensor?.type === 'water-quality' ? 'text-teal-600' : 'text-gray-600'} 
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{sensor?.name}</h3>
            <p className="text-sm font-caption text-muted-foreground">{sensor?.location}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded-md transition-colors"
        >
          <Icon name="X" size={18} className="text-muted-foreground" />
        </button>
      </div>
      {/* Status */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-body font-medium text-foreground">Status</span>
          <div className={`flex items-center space-x-2 ${getStatusColor(sensor?.status)}`}>
            <Icon name={getStatusIcon(sensor?.status)} size={16} />
            <span className="text-sm font-body font-medium capitalize">{sensor?.status}</span>
          </div>
        </div>
        <div className="text-xs font-caption text-muted-foreground">
          Last updated: {sensor?.lastUpdate}
        </div>
      </div>
      {/* Current Readings */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">Current Readings</h4>
        <div className="space-y-2">
          {sensor?.readings?.map((reading, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-body text-muted-foreground">{reading?.parameter}</span>
              <div className="text-right">
                <span className="text-sm font-body font-medium text-foreground">{reading?.value}</span>
                <span className="text-xs font-caption text-muted-foreground ml-1">{reading?.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Alert Thresholds */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">Alert Thresholds</h4>
        <div className="space-y-2">
          {sensor?.thresholds?.map((threshold, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  threshold?.level === 'warning' ? 'bg-warning' : 
                  threshold?.level === 'critical' ? 'bg-error' : 'bg-success'
                }`} />
                <span className="text-sm font-body text-muted-foreground capitalize">{threshold?.level}</span>
              </div>
              <span className="text-sm font-body text-foreground">{threshold?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Actions */}
      <div className="p-4 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewHistory(sensor?.id)}
          iconName="TrendingUp"
          iconPosition="left"
          className="flex-1"
        >
          History
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewDetails(sensor?.id)}
          iconName="ExternalLink"
          iconPosition="left"
          className="flex-1"
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default SensorPopup;
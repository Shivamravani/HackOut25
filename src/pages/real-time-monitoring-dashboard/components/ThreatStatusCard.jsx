import React from 'react';
import Icon from '../../../components/AppIcon';

const ThreatStatusCard = ({ currentThreat, lastUpdated }) => {
  const threatConfig = {
    normal: {
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      icon: 'Shield',
      label: 'Normal',
      description: 'All systems operational'
    },
    moderate: {
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      icon: 'AlertTriangle',
      label: 'Moderate',
      description: 'Elevated conditions detected'
    },
    high: {
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      icon: 'AlertCircle',
      label: 'High Alert',
      description: 'Immediate attention required'
    },
    critical: {
      color: 'text-error',
      bgColor: 'bg-error/20',
      borderColor: 'border-error/30',
      icon: 'Zap',
      label: 'Critical',
      description: 'Emergency response activated'
    }
  };

  const config = threatConfig?.[currentThreat];

  return (
    <div className={`
      p-6 rounded-xl border-2 ${config?.borderColor} ${config?.bgColor}
      shadow-lg transition-all duration-300 hover:shadow-xl
    `}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`
            p-3 rounded-full ${config?.bgColor} ${config?.color}
            shadow-sm
          `}>
            <Icon name={config?.icon} size={24} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Current Threat Level
            </h3>
            <p className="text-sm font-caption text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
        <div className={`
          px-4 py-2 rounded-full ${config?.bgColor} ${config?.color}
          font-body font-semibold text-sm
        `}>
          {config?.label}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-foreground font-body">
          {config?.description}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-muted-foreground" />
            <span className="text-sm font-caption text-muted-foreground">
              System Status
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-caption text-success font-medium">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatStatusCard;
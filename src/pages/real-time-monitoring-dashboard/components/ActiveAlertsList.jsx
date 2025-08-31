import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveAlertsList = ({ alerts, onAccept, onRaise }) => {
  const alertTypeConfig = {
    'sea-level': {
      icon: 'Waves',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      label: 'Sea Level Rise'
    },
    'algal-bloom': {
      icon: 'Droplets',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      label: 'Algal Bloom'
    },
    'illegal-dumping': {
      icon: 'Trash2',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      label: 'Illegal Dumping'
    },
    'cyclonic-activity': {
      icon: 'Wind',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      label: 'Cyclonic Activity'
    },
    'weather-warning': {
      icon: 'CloudRain',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      label: 'Weather Warning'
    }
  };

  const severityConfig = {
    low: { color: 'text-success', bgColor: 'bg-success/10', label: 'Low' },
    moderate: { color: 'text-warning', bgColor: 'bg-warning/10', label: 'Moderate' },
    high: { color: 'text-error', bgColor: 'bg-error/10', label: 'High' },
    critical: { color: 'text-error', bgColor: 'bg-error/20', label: 'Critical' }
  };

  if (alerts?.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No Active Alerts
        </h3>
        <p className="text-muted-foreground font-body">
          All systems are operating normally
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Active Alerts
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
            <span className="text-sm font-caption text-error font-medium">
              {alerts?.length} Active
            </span>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {alerts?.map((alert) => {
          const typeConfig = alertTypeConfig?.[alert?.type];
          const severityConf = severityConfig?.[alert?.severity];

          return (
            <div key={alert?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`
                  p-2 rounded-lg ${typeConfig?.bgColor} ${typeConfig?.color}
                  flex-shrink-0
                `}>
                  <Icon name={typeConfig?.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-body font-semibold text-foreground truncate">
                      {alert?.title}
                    </h4>
                    <div className={`
                      px-2 py-1 rounded text-xs font-caption font-medium
                      ${severityConf?.bgColor} ${severityConf?.color}
                    `}>
                      {severityConf?.label}
                    </div>
                  </div>
                  
                  <p className="text-sm font-body text-muted-foreground mb-3 line-clamp-2">
                    {alert?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs font-caption text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{alert?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{alert?.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => onAccept(alert?.id)}
                        iconName="Check"
                        iconSize={14}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="destructive"
                        size="xs"
                        onClick={() => onRaise(alert?.id)}
                        iconName="ArrowUp"
                        iconSize={14}
                      >
                        Raise
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveAlertsList;
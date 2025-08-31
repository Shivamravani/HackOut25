import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alert, onRaise, onModify, onCancel, onViewDetails }) => {
  const severityConfig = {
    low: { 
      color: 'text-success', 
      bgColor: 'bg-success/10', 
      borderColor: 'border-success/20',
      icon: 'Info'
    },
    moderate: { 
      color: 'text-warning', 
      bgColor: 'bg-warning/10', 
      borderColor: 'border-warning/20',
      icon: 'AlertTriangle'
    },
    high: { 
      color: 'text-error', 
      bgColor: 'bg-error/10', 
      borderColor: 'border-error/20',
      icon: 'AlertOctagon'
    },
    critical: { 
      color: 'text-error', 
      bgColor: 'bg-error/20', 
      borderColor: 'border-error/30',
      icon: 'Zap'
    }
  };

  const threatTypeIcons = {
    'Sea Level Rise': 'Waves',
    'Algal Bloom': 'Droplets',
    'Illegal Dumping': 'Trash2',
    'Cyclone': 'Wind',
    'Tsunami': 'Mountain',
    'Monsoon Surge': 'CloudRain'
  };

  const statusConfig = {
    active: { color: 'text-success', bgColor: 'bg-success/10', label: 'Active' },
    pending: { color: 'text-warning', bgColor: 'bg-warning/10', label: 'Pending' },
    cancelled: { color: 'text-muted-foreground', bgColor: 'bg-muted', label: 'Cancelled' },
    resolved: { color: 'text-muted-foreground', bgColor: 'bg-muted', label: 'Resolved' }
  };

  const config = severityConfig?.[alert?.severity];
  const statusStyle = statusConfig?.[alert?.status];

  return (
    <div className={`
      bg-card border rounded-lg p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-200
      ${config?.borderColor} ${config?.bgColor}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className={`
            flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-lg
            ${config?.bgColor} ${config?.color}
          `}>
            <Icon name={config?.icon} size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-base lg:text-lg font-heading font-semibold text-foreground truncate">
                {alert?.title}
              </h3>
              <div className={`
                px-2 py-1 rounded-full text-xs font-caption font-medium
                ${statusStyle?.bgColor} ${statusStyle?.color}
              `}>
                {statusStyle?.label}
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name={threatTypeIcons?.[alert?.threatType] || 'AlertTriangle'} size={14} />
                <span className="font-caption">{alert?.threatType}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span className="font-caption truncate">{alert?.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`
          px-3 py-1 rounded-full text-xs font-caption font-medium uppercase tracking-wide
          ${config?.bgColor} ${config?.color}
        `}>
          {alert?.severity}
        </div>
      </div>
      {/* Alert Details */}
      <div className="mb-4">
        <p className="text-sm lg:text-base text-foreground mb-3 line-clamp-2">
          {alert?.description}
        </p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground font-caption">Confidence:</span>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    alert?.confidence >= 80 ? 'bg-success' : 
                    alert?.confidence >= 60 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${alert?.confidence}%` }}
                />
              </div>
              <span className="font-body font-medium text-foreground">{alert?.confidence}%</span>
            </div>
          </div>
          
          <div>
            <span className="text-muted-foreground font-caption">Source:</span>
            <p className="font-body font-medium text-foreground mt-1">{alert?.source}</p>
          </div>
          
          <div>
            <span className="text-muted-foreground font-caption">Affected Area:</span>
            <p className="font-body font-medium text-foreground mt-1">{alert?.affectedArea}</p>
          </div>
          
          <div>
            <span className="text-muted-foreground font-caption">Recipients:</span>
            <p className="font-body font-medium text-foreground mt-1">{alert?.recipientCount?.toLocaleString()}</p>
          </div>
        </div>
      </div>
      {/* Distribution Status */}
      <div className="mb-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-caption font-medium text-foreground">Distribution Status</span>
          <span className="text-xs text-muted-foreground">{alert?.timestamp}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            <div>
              <p className="font-body font-medium text-foreground">{alert?.distribution?.sms?.sent}</p>
              <p className="text-xs text-muted-foreground">SMS Sent</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={16} className="text-secondary" />
            <div>
              <p className="font-body font-medium text-foreground">{alert?.distribution?.push?.sent}</p>
              <p className="text-xs text-muted-foreground">Push Sent</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-accent" />
            <div>
              <p className="font-body font-medium text-foreground">{alert?.distribution?.email?.sent}</p>
              <p className="text-xs text-muted-foreground">Email Sent</p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(alert?.id)}
          className="flex-1 sm:flex-none"
        >
          Details
        </Button>
        
        {alert?.status === 'active' && (
          <>
            <Button
              variant="secondary"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={() => onModify(alert?.id)}
              className="flex-1 sm:flex-none"
            >
              Modify
            </Button>
            
            <Button
              variant="warning"
              size="sm"
              iconName="TrendingUp"
              iconPosition="left"
              onClick={() => onRaise(alert?.id)}
              className="flex-1 sm:flex-none"
            >
              Raise
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={() => onCancel(alert?.id)}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
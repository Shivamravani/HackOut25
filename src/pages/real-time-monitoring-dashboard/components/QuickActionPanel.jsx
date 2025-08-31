import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ 
  onEmergencyAlert, 
  onSystemCheck, 
  onExportData, 
  onRefreshData,
  systemStatus 
}) => {
  const quickActions = [
    {
      id: 'emergency',
      label: 'Emergency Alert',
      description: 'Broadcast critical alert to all users',
      icon: 'AlertTriangle',
      variant: 'destructive',
      onClick: onEmergencyAlert
    },
    {
      id: 'system-check',
      label: 'System Check',
      description: 'Run comprehensive system diagnostics',
      icon: 'Shield',
      variant: 'outline',
      onClick: onSystemCheck
    },
    {
      id: 'export',
      label: 'Export Data',
      description: 'Download current monitoring data',
      icon: 'Download',
      variant: 'secondary',
      onClick: onExportData
    },
    {
      id: 'refresh',
      label: 'Refresh All',
      description: 'Update all sensor readings',
      icon: 'RefreshCw',
      variant: 'default',
      onClick: onRefreshData
    }
  ];

  const systemMetrics = [
    {
      label: 'System Uptime',
      value: systemStatus?.uptime,
      icon: 'Clock',
      color: 'text-success'
    },
    {
      label: 'Active Sensors',
      value: `${systemStatus?.activeSensors}/${systemStatus?.totalSensors}`,
      icon: 'Activity',
      color: systemStatus?.activeSensors === systemStatus?.totalSensors ? 'text-success' : 'text-warning'
    },
    {
      label: 'Data Quality',
      value: `${systemStatus?.dataQuality}%`,
      icon: 'CheckCircle',
      color: systemStatus?.dataQuality > 90 ? 'text-success' : systemStatus?.dataQuality > 70 ? 'text-warning' : 'text-error'
    },
    {
      label: 'Response Time',
      value: `${systemStatus?.responseTime}ms`,
      icon: 'Zap',
      color: systemStatus?.responseTime < 100 ? 'text-success' : systemStatus?.responseTime < 500 ? 'text-warning' : 'text-error'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Quick Actions
        </h3>
        <p className="text-sm font-body text-muted-foreground mt-1">
          Emergency controls and system management
        </p>
      </div>
      <div className="p-6 space-y-6">
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              onClick={action?.onClick}
              iconName={action?.icon}
              iconPosition="left"
              iconSize={18}
              className="h-auto p-4 flex-col items-start text-left"
            >
              <div className="w-full">
                <div className="font-body font-semibold mb-1">
                  {action?.label}
                </div>
                <div className="text-xs opacity-80 font-caption">
                  {action?.description}
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* System Metrics */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-body font-semibold text-foreground mb-4">
            System Status
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {systemMetrics?.map((metric, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={metric?.icon} size={16} className={metric?.color} />
                  <span className="text-sm font-caption text-muted-foreground">
                    {metric?.label}
                  </span>
                </div>
                <div className={`text-lg font-heading font-bold ${metric?.color}`}>
                  {metric?.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Status */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-body text-foreground font-medium">
                Real-time Connection
              </span>
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              Last sync: {new Date()?.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-body font-semibold text-foreground mb-3">
            Emergency Contacts
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-body text-muted-foreground">Coast Guard</span>
              <Button variant="ghost" size="xs" iconName="Phone" iconSize={14}>
                Call
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-body text-muted-foreground">Emergency Services</span>
              <Button variant="ghost" size="xs" iconName="Phone" iconSize={14}>
                Call
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-body text-muted-foreground">Environmental Agency</span>
              <Button variant="ghost" size="xs" iconName="Phone" iconSize={14}>
                Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;
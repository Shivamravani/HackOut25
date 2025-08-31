import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AlertFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  alertCounts 
}) => {
  const severityOptions = [
    { value: '', label: 'All Severities' },
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const threatTypeOptions = [
    { value: '', label: 'All Threat Types' },
    { value: 'Sea Level Rise', label: 'Sea Level Rise' },
    { value: 'Algal Bloom', label: 'Algal Bloom' },
    { value: 'Illegal Dumping', label: 'Illegal Dumping' },
    { value: 'Cyclone', label: 'Cyclone' },
    { value: 'Tsunami', label: 'Tsunami' },
    { value: 'Storm Surge', label: 'Storm Surge' }
  ];

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  const severityStats = [
    { 
      key: 'critical', 
      label: 'Critical', 
      count: alertCounts?.critical, 
      color: 'text-error',
      bgColor: 'bg-error/10',
      icon: 'Zap'
    },
    { 
      key: 'high', 
      label: 'High', 
      count: alertCounts?.high, 
      color: 'text-error',
      bgColor: 'bg-error/10',
      icon: 'AlertOctagon'
    },
    { 
      key: 'moderate', 
      label: 'Moderate', 
      count: alertCounts?.moderate, 
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      icon: 'AlertTriangle'
    },
    { 
      key: 'low', 
      label: 'Low', 
      count: alertCounts?.low, 
      color: 'text-success',
      bgColor: 'bg-success/10',
      icon: 'Info'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 space-y-6">
      {/* Quick Stats */}
      <div>
        <h3 className="text-base font-heading font-semibold text-foreground mb-4">
          Alert Overview
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {severityStats?.map((stat) => (
            <div
              key={stat?.key}
              className={`
                flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                ${filters?.severity === stat?.key 
                  ? `${stat?.bgColor} border border-current ${stat?.color}` 
                  : 'bg-muted/50 hover:bg-muted border border-transparent'
                }
              `}
              onClick={() => onFilterChange('severity', filters?.severity === stat?.key ? '' : stat?.key)}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-lg
                ${filters?.severity === stat?.key ? stat?.bgColor : 'bg-background'}
              `}>
                <Icon 
                  name={stat?.icon} 
                  size={16} 
                  className={filters?.severity === stat?.key ? stat?.color : 'text-muted-foreground'}
                />
              </div>
              <div>
                <p className="text-lg font-body font-bold text-foreground">
                  {stat?.count}
                </p>
                <p className="text-xs font-caption text-muted-foreground">
                  {stat?.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Filter Controls */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-heading font-semibold text-foreground">
            Filter Alerts
          </h3>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            placeholder="Filter by status"
          />

          <Select
            label="Threat Type"
            options={threatTypeOptions}
            value={filters?.threatType}
            onChange={(value) => onFilterChange('threatType', value)}
            placeholder="Filter by threat type"
          />

          <Select
            label="Severity"
            options={severityOptions}
            value={filters?.severity}
            onChange={(value) => onFilterChange('severity', value)}
            placeholder="Filter by severity"
          />

          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={filters?.timeRange}
            onChange={(value) => onFilterChange('timeRange', value)}
          />
        </div>
      </div>
      {/* Active Filters Display */}
      {(filters?.status || filters?.threatType || filters?.severity || filters?.timeRange !== 'all') && (
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
          <span className="text-sm font-caption text-muted-foreground">Active filters:</span>
          
          {filters?.status && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <span className="font-caption">Status: {filters?.status}</span>
              <button
                onClick={() => onFilterChange('status', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.threatType && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
              <span className="font-caption">Type: {filters?.threatType}</span>
              <button
                onClick={() => onFilterChange('threatType', '')}
                className="hover:bg-secondary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.severity && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              <span className="font-caption">Severity: {filters?.severity}</span>
              <button
                onClick={() => onFilterChange('severity', '')}
                className="hover:bg-accent/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.timeRange !== 'all' && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
              <span className="font-caption">Time: {timeRangeOptions?.find(opt => opt?.value === filters?.timeRange)?.label}</span>
              <button
                onClick={() => onFilterChange('timeRange', 'all')}
                className="hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertFilters;
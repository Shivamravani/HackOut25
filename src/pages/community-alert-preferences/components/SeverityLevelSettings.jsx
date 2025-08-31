import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SeverityLevelSettings = ({ preferences, onPreferenceChange }) => {
  const severityLevels = [
    {
      id: 'info',
      name: 'Informational',
      icon: 'Info',
      description: 'General updates and non-urgent environmental information',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      examples: ['Tide schedule updates', 'Weather forecasts', 'Educational content']
    },
    {
      id: 'advisory',
      name: 'Advisory',
      icon: 'AlertCircle',
      description: 'Conditions that may require attention or preparation',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      examples: ['Small craft advisories', 'Moderate weather changes', 'Water quality notices']
    },
    {
      id: 'watch',
      name: 'Watch',
      icon: 'Eye',
      description: 'Potentially dangerous conditions developing',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      examples: ['Storm watch', 'Flood watch', 'High tide warnings']
    },
    {
      id: 'warning',
      name: 'Warning',
      icon: 'AlertTriangle',
      description: 'Dangerous conditions are imminent or occurring',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      examples: ['Severe weather warnings', 'Flash flood warnings', 'Evacuation advisories']
    },
    {
      id: 'emergency',
      name: 'Emergency',
      icon: 'Siren',
      description: 'Life-threatening situations requiring immediate action',
      color: 'text-red-800',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-300',
      examples: ['Tsunami warnings', 'Hurricane emergencies', 'Immediate evacuation orders']
    }
  ];

  const handleSeverityToggle = (severityId, checked) => {
    const updatedSeverities = checked 
      ? [...preferences?.severityLevels, severityId]
      : preferences?.severityLevels?.filter(id => id !== severityId);
    
    onPreferenceChange('severityLevels', updatedSeverities);
  };

  const getSelectedCount = () => preferences?.severityLevels?.length;
  const getTotalCount = () => severityLevels?.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="Gauge" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Alert Severity Levels</h3>
            <p className="text-sm text-muted-foreground">Choose which severity levels to receive</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{getSelectedCount()}/{getTotalCount()}</p>
          <p className="text-xs text-muted-foreground">levels selected</p>
        </div>
      </div>
      <div className="space-y-4">
        {severityLevels?.map((level) => (
          <div key={level?.id} className={`${level?.bgColor} rounded-lg border ${level?.borderColor} p-4`}>
            <div className="flex items-start space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm`}>
                <Icon name={level?.icon} size={18} className={level?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={level?.name}
                  description={level?.description}
                  checked={preferences?.severityLevels?.includes(level?.id)}
                  onChange={(e) => handleSeverityToggle(level?.id, e?.target?.checked)}
                  className="mb-3"
                />
                <div className="ml-6">
                  <p className="text-xs font-medium text-foreground mb-2">Examples:</p>
                  <ul className="space-y-1">
                    {level?.examples?.map((example, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <span className="text-xs text-muted-foreground">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Recommendation</p>
            <p className="text-xs text-muted-foreground mt-1">
              For comprehensive coastal safety, we recommend enabling at least "Watch", "Warning", and "Emergency" levels. 
              You can always adjust these settings based on your needs and location risk factors.
            </p>
          </div>
        </div>
      </div>
      {preferences?.severityLevels?.length === 0 && (
        <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
            <div>
              <p className="text-sm font-medium text-error">No severity levels selected</p>
              <p className="text-xs text-error/80 mt-1">
                You won't receive any alerts. Please select at least one severity level to stay informed about coastal threats.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeverityLevelSettings;
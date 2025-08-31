import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ThreatTypePreferences = ({ preferences, onPreferenceChange }) => {
  const threatTypes = [
    {
      id: 'sea_level_rise',
      name: 'Sea Level Rise',
      icon: 'Waves',
      description: 'Alerts for unusual tidal patterns and rising water levels',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'weather_warnings',
      name: 'Weather Warnings',
      icon: 'CloudRain',
      description: 'Storm warnings, cyclones, and severe weather conditions',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'algal_blooms',
      name: 'Algal Blooms',
      icon: 'Droplets',
      description: 'Harmful algae blooms affecting water quality and marine life',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'illegal_dumping',
      name: 'Illegal Dumping',
      icon: 'AlertTriangle',
      description: 'Reports of illegal waste disposal in coastal areas',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'marine_pollution',
      name: 'Marine Pollution',
      icon: 'Fish',
      description: 'Oil spills, chemical contamination, and marine ecosystem threats',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'erosion_alerts',
      name: 'Coastal Erosion',
      icon: 'Mountain',
      description: 'Shoreline changes and coastal infrastructure threats',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const handleThreatToggle = (threatId, checked) => {
    const updatedThreats = checked 
      ? [...preferences?.threatTypes, threatId]
      : preferences?.threatTypes?.filter(id => id !== threatId);
    
    onPreferenceChange('threatTypes', updatedThreats);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Shield" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Threat Types</h3>
          <p className="text-sm text-muted-foreground">Choose which types of threats you want to be alerted about</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {threatTypes?.map((threat) => (
          <div key={threat?.id} className={`${threat?.bgColor} rounded-lg p-4 border border-border/50`}>
            <div className="flex items-start space-x-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-white shadow-sm`}>
                <Icon name={threat?.icon} size={16} className={threat?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={threat?.name}
                  description={threat?.description}
                  checked={preferences?.threatTypes?.includes(threat?.id)}
                  onChange={(e) => handleThreatToggle(threat?.id, e?.target?.checked)}
                  className="mb-0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Smart Recommendations</p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on your location and community patterns, we recommend enabling Sea Level Rise and Weather Warnings for comprehensive coastal protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatTypePreferences;
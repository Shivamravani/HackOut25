import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GeographicPreferences = ({ preferences, onPreferenceChange }) => {
  const [customLocation, setCustomLocation] = useState('');

  const predefinedAreas = [
    { value: 'miami_beach', label: 'Juhu Beach, MH' },
    { value: 'outer_banks', label: 'Girgaon Chowpatty, MH' },
    { value: 'cape_cod', label: 'Versova Beach, MH' },
    { value: 'galveston', label: 'Marve Beach, MH' },
    { value: 'santa_monica', label: 'Aksa Beach, MH' },
    { value: 'key_west', label: 'Dadar Chowpatty, MH' },
    { value: 'myrtle_beach', label: 'Manori Beach, MH' },
    { value: 'virginia_beach', label: 'Colaba, MH' }
  ];

  const radiusOptions = [
    { value: '5', label: '5 miles' },
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
    { value: '100', label: '100 miles' }
  ];

  const handleLocationAdd = () => {
    if (customLocation?.trim()) {
      const newLocation = {
        id: Date.now()?.toString(),
        name: customLocation?.trim(),
        type: 'custom'
      };
      onPreferenceChange('monitoredAreas', [...preferences?.monitoredAreas, newLocation]);
      setCustomLocation('');
    }
  };

  const handleLocationRemove = (locationId) => {
    const updatedAreas = preferences?.monitoredAreas?.filter(area => area?.id !== locationId);
    onPreferenceChange('monitoredAreas', updatedAreas);
  };

  const handlePredefinedAreaChange = (selectedValues) => {
    const newAreas = selectedValues?.map(value => {
      const area = predefinedAreas?.find(a => a?.value === value);
      return {
        id: value,
        name: area?.label,
        type: 'predefined'
      };
    });
    onPreferenceChange('monitoredAreas', newAreas);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
          <Icon name="MapPin" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Geographic Areas</h3>
          <p className="text-sm text-muted-foreground">Select coastal areas you want to monitor</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Predefined Areas Selection */}
        <div>
          <Select
            label="Popular Coastal Areas"
            description="Select from commonly monitored coastal regions"
            multiple
            searchable
            clearable
            options={predefinedAreas}
            value={preferences?.monitoredAreas?.filter(area => area?.type === 'predefined')?.map(area => area?.id)}
            onChange={handlePredefinedAreaChange}
            placeholder="Choose coastal areas..."
          />
        </div>

        {/* Custom Location Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Add Custom Location</label>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter city, zip code, or coordinates"
              value={customLocation}
              onChange={(e) => setCustomLocation(e?.target?.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleLocationAdd}
              disabled={!customLocation?.trim()}
              iconName="Plus"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Monitoring Radius */}
        <div>
          <Select
            label="Monitoring Radius"
            description="How far from your selected areas should we monitor?"
            options={radiusOptions}
            value={preferences?.monitoringRadius}
            onChange={(value) => onPreferenceChange('monitoringRadius', value)}
            placeholder="Select radius..."
          />
        </div>

        {/* Current Monitored Areas */}
        {preferences?.monitoredAreas?.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Currently Monitoring</label>
            <div className="space-y-2">
              {preferences?.monitoredAreas?.map((area) => (
                <div key={area?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{area?.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      area?.type === 'predefined' ?'bg-primary/10 text-primary' :'bg-secondary/10 text-secondary'
                    }`}>
                      {area?.type === 'predefined' ? 'Popular' : 'Custom'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLocationRemove(area?.id)}
                    iconName="X"
                    iconSize={14}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Map Preview */}
        <div className="bg-muted/30 rounded-lg p-4 border-2 border-dashed border-border">
          <div className="text-center py-8">
            <Icon name="Map" size={48} className="text-muted-foreground mx-auto mb-3" />
            <h4 className="text-sm font-medium text-foreground mb-2">Interactive Map Preview</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Visual representation of your monitored areas would appear here
            </p>
            <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon name="Waves" size={32} className="text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Coastal Areas Map</p>
                <p className="text-xs text-muted-foreground">
                  {preferences?.monitoredAreas?.length} location{preferences?.monitoredAreas?.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicPreferences;
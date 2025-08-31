import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonTools = ({ onComparisonChange, selectedSensors }) => {
  const [comparisonType, setComparisonType] = useState('temporal');
  const [selectedPeriods, setSelectedPeriods] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const comparisonTypes = [
    { value: 'temporal', label: 'Time Period Comparison', icon: 'Clock' },
    { value: 'spatial', label: 'Location Comparison', icon: 'MapPin' },
    { value: 'sensor', label: 'Sensor Comparison', icon: 'Activity' }
  ];

  const timePeriods = [
    { value: '2024-q1', label: 'Q1 2024 (Jan-Mar)', range: '2024-01-01 to 2024-03-31' },
    { value: '2024-q2', label: 'Q2 2024 (Apr-Jun)', range: '2024-04-01 to 2024-06-30' },
    { value: '2024-q3', label: 'Q3 2024 (Jul-Sep)', range: '2024-07-01 to 2024-09-30' },
    { value: '2023-q4', label: 'Q4 2023 (Oct-Dec)', range: '2023-10-01 to 2023-12-31' },
    { value: '2023-full', label: 'Full Year 2023', range: '2023-01-01 to 2023-12-31' },
    { value: 'summer-2024', label: 'Summer 2024', range: '2024-06-01 to 2024-08-31' },
    { value: 'winter-2023', label: 'Winter 2023', range: '2023-12-01 to 2024-02-29' }
  ];

  const locations = [
    { value: 'maine_coast', label: 'Maine Coast', coordinates: '44.3106, -68.2073' },
    { value: 'cape_cod', label: 'Cape Cod Bay', coordinates: '41.7003, -70.2962' },
    { value: 'chesapeake_bay', label: 'Chesapeake Bay', coordinates: '38.9784, -76.4951' },
    { value: 'san_francisco_bay', label: 'San Francisco Bay', coordinates: '37.7749, -122.4194' },
    { value: 'puget_sound', label: 'Puget Sound', coordinates: '47.6062, -122.3321' },
    { value: 'galveston_bay', label: 'Galveston Bay', coordinates: '29.3013, -94.7977' }
  ];

  const handleComparisonTypeChange = (type) => {
    setComparisonType(type);
    setSelectedPeriods([]);
    setSelectedLocations([]);
    onComparisonChange({
      type,
      periods: [],
      locations: [],
      sensors: selectedSensors
    });
  };

  const handlePeriodToggle = (periodValue) => {
    const updatedPeriods = selectedPeriods?.includes(periodValue)
      ? selectedPeriods?.filter(p => p !== periodValue)
      : [...selectedPeriods, periodValue];
    
    setSelectedPeriods(updatedPeriods);
    onComparisonChange({
      type: comparisonType,
      periods: updatedPeriods,
      locations: selectedLocations,
      sensors: selectedSensors
    });
  };

  const handleLocationToggle = (locationValue) => {
    const updatedLocations = selectedLocations?.includes(locationValue)
      ? selectedLocations?.filter(l => l !== locationValue)
      : [...selectedLocations, locationValue];
    
    setSelectedLocations(updatedLocations);
    onComparisonChange({
      type: comparisonType,
      periods: selectedPeriods,
      locations: updatedLocations,
      sensors: selectedSensors
    });
  };

  const clearComparison = () => {
    setSelectedPeriods([]);
    setSelectedLocations([]);
    onComparisonChange({
      type: comparisonType,
      periods: [],
      locations: [],
      sensors: selectedSensors
    });
  };

  const getActiveComparisons = () => {
    switch (comparisonType) {
      case 'temporal':
        return selectedPeriods?.length;
      case 'spatial':
        return selectedLocations?.length;
      case 'sensor':
        return selectedSensors?.length;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Comparison Tools</h3>
        <div className="flex items-center space-x-2">
          {getActiveComparisons() > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {getActiveComparisons()} active
            </span>
          )}
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconSize={16}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {/* Comparison Type Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Comparison Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {comparisonTypes?.map((type) => (
            <Button
              key={type?.value}
              variant={comparisonType === type?.value ? "default" : "outline"}
              onClick={() => handleComparisonTypeChange(type?.value)}
              className="justify-start"
              iconName={type?.icon}
              iconSize={16}
            >
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      {isExpanded && (
        <div className="space-y-4">
          {/* Temporal Comparison */}
          {comparisonType === 'temporal' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">
                  Select Time Periods to Compare
                </label>
                {selectedPeriods?.length > 0 && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setSelectedPeriods([])}
                    iconName="X"
                    iconSize={14}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {timePeriods?.map((period) => (
                  <div
                    key={period?.value}
                    className={`
                      flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors
                      ${selectedPeriods?.includes(period?.value)
                        ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                      }
                    `}
                    onClick={() => handlePeriodToggle(period?.value)}
                  >
                    <div>
                      <div className="font-medium text-foreground text-sm">{period?.label}</div>
                      <div className="text-xs text-muted-foreground">{period?.range}</div>
                    </div>
                    <div className={`
                      w-4 h-4 rounded border-2 flex items-center justify-center
                      ${selectedPeriods?.includes(period?.value)
                        ? 'border-primary bg-primary' :'border-muted-foreground'
                      }
                    `}>
                      {selectedPeriods?.includes(period?.value) && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spatial Comparison */}
          {comparisonType === 'spatial' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">
                  Select Locations to Compare
                </label>
                {selectedLocations?.length > 0 && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setSelectedLocations([])}
                    iconName="X"
                    iconSize={14}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {locations?.map((location) => (
                  <div
                    key={location?.value}
                    className={`
                      flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors
                      ${selectedLocations?.includes(location?.value)
                        ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                      }
                    `}
                    onClick={() => handleLocationToggle(location?.value)}
                  >
                    <div>
                      <div className="font-medium text-foreground text-sm">{location?.label}</div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name="MapPin" size={12} />
                        <span>{location?.coordinates}</span>
                      </div>
                    </div>
                    <div className={`
                      w-4 h-4 rounded border-2 flex items-center justify-center
                      ${selectedLocations?.includes(location?.value)
                        ? 'border-primary bg-primary' :'border-muted-foreground'
                      }
                    `}>
                      {selectedLocations?.includes(location?.value) && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sensor Comparison */}
          {comparisonType === 'sensor' && (
            <div>
              <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                <Icon name="Info" size={16} className="text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  Sensor comparison uses your currently selected sensors from the Sensor Type Selector.
                  Select multiple sensors above to compare their readings.
                </div>
              </div>
              {selectedSensors?.length > 0 && (
                <div className="mt-3">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Comparing {selectedSensors?.length} sensor{selectedSensors?.length !== 1 ? 's' : ''}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSensors?.map((sensorId) => (
                      <span
                        key={sensorId}
                        className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {sensorId?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={clearComparison}
              disabled={getActiveComparisons() === 0}
              iconName="RotateCcw"
              iconSize={16}
            >
              Reset Comparison
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {getActiveComparisons() > 0 
                ? `${getActiveComparisons()} item${getActiveComparisons() !== 1 ? 's' : ''} selected for comparison`
                : 'Select items to compare'
              }
            </div>
          </div>
        </div>
      )}
      {/* Active Comparison Summary */}
      {!isExpanded && getActiveComparisons() > 0 && (
        <div className="mt-3 p-2 bg-muted rounded-md">
          <div className="text-sm text-foreground">
            <strong>{comparisonType?.charAt(0)?.toUpperCase() + comparisonType?.slice(1)} Comparison:</strong>
            {comparisonType === 'temporal' && ` ${selectedPeriods?.length} time periods`}
            {comparisonType === 'spatial' && ` ${selectedLocations?.length} locations`}
            {comparisonType === 'sensor' && ` ${selectedSensors?.length} sensors`}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTools;
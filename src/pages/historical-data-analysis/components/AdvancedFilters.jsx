import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilters = ({ onFiltersChange, appliedFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    weatherCorrelation: false,
    seasonalPatterns: false,
    threatEvents: false,
    dataQuality: 'all',
    valueRange: { min: '', max: '' },
    anomalyThreshold: 2,
    timeOfDay: [],
    weatherConditions: [],
    tidePhases: []
  });

  const dataQualityOptions = [
    { value: 'all', label: 'All Data Quality Levels' },
    { value: 'high', label: 'High Quality Only' },
    { value: 'medium', label: 'Medium Quality and Above' },
    { value: 'flagged', label: 'Flagged Data Only' }
  ];

  const timeOfDayOptions = [
    { value: 'dawn', label: 'Dawn (5-7 AM)', icon: 'Sunrise' },
    { value: 'morning', label: 'Morning (7-12 PM)', icon: 'Sun' },
    { value: 'afternoon', label: 'Afternoon (12-6 PM)', icon: 'Sun' },
    { value: 'evening', label: 'Evening (6-9 PM)', icon: 'Sunset' },
    { value: 'night', label: 'Night (9 PM-5 AM)', icon: 'Moon' }
  ];

  const weatherConditionOptions = [
    { value: 'clear', label: 'Clear Skies', icon: 'Sun' },
    { value: 'cloudy', label: 'Cloudy', icon: 'Cloud' },
    { value: 'rainy', label: 'Rainy', icon: 'CloudRain' },
    { value: 'stormy', label: 'Stormy', icon: 'CloudLightning' },
    { value: 'windy', label: 'High Winds', icon: 'Wind' }
  ];

  const tidePhaseOptions = [
    { value: 'high_tide', label: 'High Tide', icon: 'ArrowUp' },
    { value: 'low_tide', label: 'Low Tide', icon: 'ArrowDown' },
    { value: 'rising', label: 'Rising Tide', icon: 'TrendingUp' },
    { value: 'falling', label: 'Falling Tide', icon: 'TrendingDown' }
  ];

  const handleFilterChange = (filterKey, value) => {
    const updatedFilters = {
      ...filters,
      [filterKey]: value
    };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleArrayFilterToggle = (filterKey, value) => {
    const currentArray = filters?.[filterKey];
    const updatedArray = currentArray?.includes(value)
      ? currentArray?.filter(item => item !== value)
      : [...currentArray, value];
    
    handleFilterChange(filterKey, updatedArray);
  };

  const handleRangeChange = (type, value) => {
    const updatedRange = {
      ...filters?.valueRange,
      [type]: value
    };
    handleFilterChange('valueRange', updatedRange);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      weatherCorrelation: false,
      seasonalPatterns: false,
      threatEvents: false,
      dataQuality: 'all',
      valueRange: { min: '', max: '' },
      anomalyThreshold: 2,
      timeOfDay: [],
      weatherConditions: [],
      tidePhases: []
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.weatherCorrelation) count++;
    if (filters?.seasonalPatterns) count++;
    if (filters?.threatEvents) count++;
    if (filters?.dataQuality !== 'all') count++;
    if (filters?.valueRange?.min || filters?.valueRange?.max) count++;
    if (filters?.anomalyThreshold !== 2) count++;
    count += filters?.timeOfDay?.length;
    count += filters?.weatherConditions?.length;
    count += filters?.tidePhases?.length;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={clearAllFilters}
              iconName="RotateCcw"
              iconSize={14}
            >
              Clear
            </Button>
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
      {isExpanded && (
        <div className="space-y-6">
          {/* Analysis Options */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Analysis Options</h4>
            <div className="space-y-2">
              <Checkbox
                label="Enable weather correlation analysis"
                description="Correlate sensor data with weather patterns"
                checked={filters?.weatherCorrelation}
                onChange={(e) => handleFilterChange('weatherCorrelation', e?.target?.checked)}
              />
              <Checkbox
                label="Apply seasonal pattern detection"
                description="Identify recurring seasonal trends"
                checked={filters?.seasonalPatterns}
                onChange={(e) => handleFilterChange('seasonalPatterns', e?.target?.checked)}
              />
              <Checkbox
                label="Mark threat event periods"
                description="Highlight periods with environmental threats"
                checked={filters?.threatEvents}
                onChange={(e) => handleFilterChange('threatEvents', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Data Quality Filter */}
          <div>
            <Select
              label="Data Quality Filter"
              description="Filter data based on quality assessment"
              options={dataQualityOptions}
              value={filters?.dataQuality}
              onChange={(value) => handleFilterChange('dataQuality', value)}
            />
          </div>

          {/* Value Range Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Value Range Filter</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                label="Minimum Value"
                placeholder="Min"
                value={filters?.valueRange?.min}
                onChange={(e) => handleRangeChange('min', e?.target?.value)}
              />
              <Input
                type="number"
                label="Maximum Value"
                placeholder="Max"
                value={filters?.valueRange?.max}
                onChange={(e) => handleRangeChange('max', e?.target?.value)}
              />
            </div>
          </div>

          {/* Anomaly Threshold */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Anomaly Detection Threshold
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="4"
                step="0.5"
                value={filters?.anomalyThreshold}
                onChange={(e) => handleFilterChange('anomalyThreshold', parseFloat(e?.target?.value))}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-foreground min-w-16">
                {filters?.anomalyThreshold}σ
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Standard deviations from mean to flag as anomaly
            </p>
          </div>

          {/* Time of Day Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Time of Day</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {timeOfDayOptions?.map((option) => (
                <div
                  key={option?.value}
                  className={`
                    flex items-center space-x-2 p-2 rounded-md border cursor-pointer transition-colors
                    ${filters?.timeOfDay?.includes(option?.value)
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                    }
                  `}
                  onClick={() => handleArrayFilterToggle('timeOfDay', option?.value)}
                >
                  <div className={`
                    w-4 h-4 rounded border-2 flex items-center justify-center
                    ${filters?.timeOfDay?.includes(option?.value)
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                    }
                  `}>
                    {filters?.timeOfDay?.includes(option?.value) && (
                      <Icon name="Check" size={12} color="white" />
                    )}
                  </div>
                  <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{option?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Conditions Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Weather Conditions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {weatherConditionOptions?.map((option) => (
                <div
                  key={option?.value}
                  className={`
                    flex items-center space-x-2 p-2 rounded-md border cursor-pointer transition-colors
                    ${filters?.weatherConditions?.includes(option?.value)
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                    }
                  `}
                  onClick={() => handleArrayFilterToggle('weatherConditions', option?.value)}
                >
                  <div className={`
                    w-4 h-4 rounded border-2 flex items-center justify-center
                    ${filters?.weatherConditions?.includes(option?.value)
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                    }
                  `}>
                    {filters?.weatherConditions?.includes(option?.value) && (
                      <Icon name="Check" size={12} color="white" />
                    )}
                  </div>
                  <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{option?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tide Phases Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Tide Phases</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tidePhaseOptions?.map((option) => (
                <div
                  key={option?.value}
                  className={`
                    flex items-center space-x-2 p-2 rounded-md border cursor-pointer transition-colors
                    ${filters?.tidePhases?.includes(option?.value)
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                    }
                  `}
                  onClick={() => handleArrayFilterToggle('tidePhases', option?.value)}
                >
                  <div className={`
                    w-4 h-4 rounded border-2 flex items-center justify-center
                    ${filters?.tidePhases?.includes(option?.value)
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                    }
                  `}>
                    {filters?.tidePhases?.includes(option?.value) && (
                      <Icon name="Check" size={12} color="white" />
                    )}
                  </div>
                  <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{option?.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Quick Filter Summary */}
      {!isExpanded && activeFiltersCount > 0 && (
        <div className="mt-3 p-2 bg-muted rounded-md">
          <div className="text-sm text-foreground">
            <strong>Active Filters:</strong>
            {filters?.weatherCorrelation && ' Weather Correlation'}
            {filters?.seasonalPatterns && ' Seasonal Patterns'}
            {filters?.threatEvents && ' Threat Events'}
            {filters?.dataQuality !== 'all' && ` ${filters?.dataQuality} Quality`}
            {filters?.timeOfDay?.length > 0 && ` ${filters?.timeOfDay?.length} Time Periods`}
            {filters?.weatherConditions?.length > 0 && ` ${filters?.weatherConditions?.length} Weather Conditions`}
            {filters?.tidePhases?.length > 0 && ` ${filters?.tidePhases?.length} Tide Phases`}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SensorTypeSelector = ({ onSensorTypesChange, selectedTypes }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const sensorCategories = [
    {
      category: 'Water Quality',
      icon: 'Droplets',
      sensors: [
        { id: 'ph', name: 'pH Levels', unit: 'pH', color: 'text-blue-600' },
        { id: 'salinity', name: 'Salinity', unit: 'ppt', color: 'text-cyan-600' },
        { id: 'temperature', name: 'Water Temperature', unit: '°C', color: 'text-red-600' },
        { id: 'dissolved_oxygen', name: 'Dissolved Oxygen', unit: 'mg/L', color: 'text-green-600' }
      ]
    },
    {
      category: 'Sea Level & Tides',
      icon: 'Waves',
      sensors: [
        { id: 'tide_gauge', name: 'Tide Gauge', unit: 'm', color: 'text-indigo-600' },
        { id: 'sea_level', name: 'Sea Level Rise', unit: 'mm/year', color: 'text-purple-600' },
        { id: 'wave_height', name: 'Wave Height', unit: 'm', color: 'text-teal-600' }
      ]
    },
    {
      category: 'Weather Conditions',
      icon: 'Cloud',
      sensors: [
        { id: 'wind_speed', name: 'Wind Speed', unit: 'm/s', color: 'text-gray-600' },
        { id: 'wind_direction', name: 'Wind Direction', unit: '°', color: 'text-slate-600' },
        { id: 'air_pressure', name: 'Atmospheric Pressure', unit: 'hPa', color: 'text-orange-600' },
        { id: 'humidity', name: 'Humidity', unit: '%', color: 'text-emerald-600' }
      ]
    },
    {
      category: 'Environmental Threats',
      icon: 'AlertTriangle',
      sensors: [
        { id: 'algal_bloom', name: 'Algal Bloom Detection', unit: 'cells/mL', color: 'text-lime-600' },
        { id: 'pollution', name: 'Pollution Levels', unit: 'ppm', color: 'text-red-700' },
        { id: 'turbidity', name: 'Water Turbidity', unit: 'NTU', color: 'text-amber-600' }
      ]
    }
  ];

  const handleSensorToggle = (sensorId) => {
    const updatedTypes = selectedTypes?.includes(sensorId)
      ? selectedTypes?.filter(id => id !== sensorId)
      : [...selectedTypes, sensorId];
    
    onSensorTypesChange(updatedTypes);
  };

  const handleCategoryToggle = (category) => {
    const categoryIds = category?.sensors?.map(sensor => sensor?.id);
    const allSelected = categoryIds?.every(id => selectedTypes?.includes(id));
    
    if (allSelected) {
      // Deselect all in category
      const updatedTypes = selectedTypes?.filter(id => !categoryIds?.includes(id));
      onSensorTypesChange(updatedTypes);
    } else {
      // Select all in category
      const updatedTypes = [...new Set([...selectedTypes, ...categoryIds])];
      onSensorTypesChange(updatedTypes);
    }
  };

  const clearAllSelections = () => {
    onSensorTypesChange([]);
  };

  const selectAllSensors = () => {
    const allSensorIds = sensorCategories?.flatMap(cat => cat?.sensors?.map(sensor => sensor?.id));
    onSensorTypesChange(allSensorIds);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Sensor Types</h3>
        <div className="flex items-center space-x-2">
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
        <>
          <div className="flex space-x-2 mb-4">
            <Button
              variant="outline"
              size="xs"
              onClick={selectAllSensors}
              iconName="CheckSquare"
              iconSize={14}
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={clearAllSelections}
              iconName="Square"
              iconSize={14}
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-4">
            {sensorCategories?.map((category) => {
              const categoryIds = category?.sensors?.map(sensor => sensor?.id);
              const selectedInCategory = categoryIds?.filter(id => selectedTypes?.includes(id))?.length;
              const allSelected = selectedInCategory === categoryIds?.length;
              const someSelected = selectedInCategory > 0 && selectedInCategory < categoryIds?.length;

              return (
                <div key={category?.category} className="border border-border rounded-md p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={category?.icon} size={18} className="text-muted-foreground" />
                      <h4 className="font-medium text-foreground">{category?.category}</h4>
                      <span className="text-xs text-muted-foreground">
                        ({selectedInCategory}/{categoryIds?.length})
                      </span>
                    </div>
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={() => handleCategoryToggle(category)}
                      label=""
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category?.sensors?.map((sensor) => (
                      <div key={sensor?.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                        <Checkbox
                          checked={selectedTypes?.includes(sensor?.id)}
                          onChange={() => handleSensorToggle(sensor?.id)}
                          label=""
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${sensor?.color?.replace('text-', 'bg-')}`} />
                            <span className="text-sm font-medium text-foreground truncate">
                              {sensor?.name}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{sensor?.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {selectedTypes?.length > 0 && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Selected Sensors: {selectedTypes?.length}
            </span>
            <Button
              variant="ghost"
              size="xs"
              onClick={clearAllSelections}
              iconName="X"
              iconSize={14}
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedTypes?.slice(0, 5)?.map((typeId) => {
              const sensor = sensorCategories?.flatMap(cat => cat?.sensors)?.find(s => s?.id === typeId);
              return (
                <span
                  key={typeId}
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {sensor?.name}
                </span>
              );
            })}
            {selectedTypes?.length > 5 && (
              <span className="text-xs text-muted-foreground">
                +{selectedTypes?.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorTypeSelector;
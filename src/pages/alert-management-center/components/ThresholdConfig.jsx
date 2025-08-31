import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const ThresholdConfig = ({ isOpen, onClose, onSave, currentConfig }) => {
  const [config, setConfig] = useState(currentConfig || {
    seaLevel: {
      low: 0.5,
      moderate: 1.0,
      high: 1.5,
      critical: 2.0
    },
    windSpeed: {
      low: 25,
      moderate: 40,
      high: 60,
      critical: 80
    },
    waveHeight: {
      low: 2.0,
      moderate: 3.5,
      high: 5.0,
      critical: 7.0
    },
    temperature: {
      low: 2.0,
      moderate: 4.0,
      high: 6.0,
      critical: 8.0
    }
  });

  const [selectedSensor, setSelectedSensor] = useState('seaLevel');

  const sensorTypes = [
    {
      key: 'seaLevel',
      label: 'Sea Level Rise',
      icon: 'Waves',
      unit: 'meters',
      description: 'Abnormal sea level elevation thresholds'
    },
    {
      key: 'windSpeed',
      label: 'Wind Speed',
      icon: 'Wind',
      unit: 'km/h',
      description: 'Wind speed alert thresholds for storm detection'
    },
    {
      key: 'waveHeight',
      label: 'Wave Height',
      icon: 'Activity',
      unit: 'meters',
      description: 'Dangerous wave height thresholds'
    },
    {
      key: 'temperature',
      label: 'Temperature Anomaly',
      icon: 'Thermometer',
      unit: '°C',
      description: 'Temperature deviation from normal range'
    }
  ];

  const severityLevels = [
    { key: 'low', label: 'Low', color: 'text-success', bgColor: 'bg-success/10' },
    { key: 'moderate', label: 'Moderate', color: 'text-warning', bgColor: 'bg-warning/10' },
    { key: 'high', label: 'High', color: 'text-error', bgColor: 'bg-error/10' },
    { key: 'critical', label: 'Critical', color: 'text-error', bgColor: 'bg-error/20' }
  ];

  const handleThresholdChange = (sensorType, severity, value) => {
    setConfig(prev => ({
      ...prev,
      [sensorType]: {
        ...prev?.[sensorType],
        [severity]: parseFloat(value) || 0
      }
    }));
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const resetToDefaults = () => {
    setConfig({
      seaLevel: { low: 0.5, moderate: 1.0, high: 1.5, critical: 2.0 },
      windSpeed: { low: 25, moderate: 40, high: 60, critical: 80 },
      waveHeight: { low: 2.0, moderate: 3.5, high: 5.0, critical: 7.0 },
      temperature: { low: 2.0, moderate: 4.0, high: 6.0, critical: 8.0 }
    });
  };

  if (!isOpen) return null;

  const currentSensor = sensorTypes?.find(s => s?.key === selectedSensor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
              <Icon name="Settings" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Alert Threshold Configuration
              </h2>
              <p className="text-sm text-muted-foreground font-caption">
                Configure alert triggers for different sensor types and severity levels
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={resetToDefaults}
            >
              Reset Defaults
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sensor Type Selector */}
          <div className="w-64 border-r border-border bg-muted/30 p-4 overflow-y-auto">
            <h3 className="text-sm font-caption font-medium text-foreground mb-4">
              Sensor Types
            </h3>
            
            <div className="space-y-2">
              {sensorTypes?.map((sensor) => (
                <button
                  key={sensor?.key}
                  onClick={() => setSelectedSensor(sensor?.key)}
                  className={`
                    w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-all duration-200
                    ${selectedSensor === sensor?.key
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                    }
                  `}
                >
                  <Icon 
                    name={sensor?.icon} 
                    size={20} 
                    className={selectedSensor === sensor?.key ? 'text-primary-foreground' : 'text-primary'}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium">
                      {sensor?.label}
                    </p>
                    <p className={`
                      text-xs font-caption mt-1 line-clamp-2
                      ${selectedSensor === sensor?.key ? 'text-primary-foreground/80' : 'text-muted-foreground'}
                    `}>
                      {sensor?.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Threshold Configuration */}
          <div className="flex-1 p-6 overflow-y-auto">
            {currentSensor && (
              <div className="space-y-6">
                {/* Sensor Header */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Icon name={currentSensor?.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {currentSensor?.label} Thresholds
                    </h3>
                    <p className="text-sm text-muted-foreground font-caption">
                      {currentSensor?.description} • Unit: {currentSensor?.unit}
                    </p>
                  </div>
                </div>

                {/* Threshold Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {severityLevels?.map((level) => (
                    <div
                      key={level?.key}
                      className={`
                        p-4 border rounded-lg
                        ${level?.bgColor} border-current ${level?.color}
                      `}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`w-3 h-3 rounded-full ${level?.color?.replace('text-', 'bg-')}`} />
                        <h4 className="text-base font-body font-semibold text-foreground">
                          {level?.label} Alert
                        </h4>
                      </div>
                      
                      <Input
                        label={`Threshold Value (${currentSensor?.unit})`}
                        type="number"
                        step="0.1"
                        min="0"
                        value={config?.[selectedSensor]?.[level?.key]}
                        onChange={(e) => handleThresholdChange(selectedSensor, level?.key, e?.target?.value)}
                        placeholder={`Enter ${level?.key} threshold`}
                      />
                      
                      <p className="text-xs text-muted-foreground mt-2 font-caption">
                        Alert triggered when value exceeds {config?.[selectedSensor]?.[level?.key]} {currentSensor?.unit}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Threshold Visualization */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="text-sm font-caption font-medium text-foreground mb-3">
                    Threshold Visualization
                  </h4>
                  
                  <div className="relative h-8 bg-background rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 bg-success/20 flex items-center justify-center">
                        <span className="text-xs font-caption text-success font-medium">
                          Normal (&lt; {config?.[selectedSensor]?.low})
                        </span>
                      </div>
                      <div className="flex-1 bg-success/30 flex items-center justify-center">
                        <span className="text-xs font-caption text-success font-medium">
                          Low ({config?.[selectedSensor]?.low}+)
                        </span>
                      </div>
                      <div className="flex-1 bg-warning/30 flex items-center justify-center">
                        <span className="text-xs font-caption text-warning font-medium">
                          Moderate ({config?.[selectedSensor]?.moderate}+)
                        </span>
                      </div>
                      <div className="flex-1 bg-error/20 flex items-center justify-center">
                        <span className="text-xs font-caption text-error font-medium">
                          High ({config?.[selectedSensor]?.high}+)
                        </span>
                      </div>
                      <div className="flex-1 bg-error/30 flex items-center justify-center">
                        <span className="text-xs font-caption text-error font-medium">
                          Critical ({config?.[selectedSensor]?.critical}+)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <p className="text-sm text-muted-foreground font-caption">
            Changes will apply to all future alerts for the selected sensor types
          </p>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThresholdConfig;
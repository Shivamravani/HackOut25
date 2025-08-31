import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SensorReadingsCarousel = ({ sensorData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sensorData?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sensorData?.length) % sensorData?.length);
  };

  const getSensorIcon = (type) => {
    const iconMap = {
      'tide-gauge': 'Waves',
      'weather-station': 'Cloud',
      'water-quality': 'Droplets',
      'seismic': 'Activity',
      'satellite': 'Satellite'
    };
    return iconMap?.[type] || 'Gauge';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      normal: 'text-success',
      warning: 'text-warning',
      critical: 'text-error',
      offline: 'text-muted-foreground'
    };
    return colorMap?.[status] || 'text-muted-foreground';
  };

  const getStatusBgColor = (status) => {
    const colorMap = {
      normal: 'bg-success/10',
      warning: 'bg-warning/10',
      critical: 'bg-error/10',
      offline: 'bg-muted/10'
    };
    return colorMap?.[status] || 'bg-muted/10';
  };

  if (!sensorData || sensorData?.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <Icon name="WifiOff" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No Sensor Data
        </h3>
        <p className="text-muted-foreground font-body">
          Unable to connect to sensor network
        </p>
      </div>
    );
  }

  const currentSensor = sensorData?.[currentIndex];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Sensor Readings
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              disabled={sensorData?.length <= 1}
              iconName="ChevronLeft"
              iconSize={16}
            />
            <span className="text-sm font-caption text-muted-foreground px-2">
              {currentIndex + 1} / {sensorData?.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              disabled={sensorData?.length <= 1}
              iconName="ChevronRight"
              iconSize={16}
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className={`
            p-3 rounded-lg ${getStatusBgColor(currentSensor?.status)} ${getStatusColor(currentSensor?.status)}
          `}>
            <Icon name={getSensorIcon(currentSensor?.type)} size={24} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-body font-semibold text-foreground">
                {currentSensor?.name}
              </h4>
              <div className={`
                px-2 py-1 rounded text-xs font-caption font-medium
                ${getStatusBgColor(currentSensor?.status)} ${getStatusColor(currentSensor?.status)}
              `}>
                {currentSensor?.status?.charAt(0)?.toUpperCase() + currentSensor?.status?.slice(1)}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm font-caption text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{currentSensor?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>Updated {currentSensor?.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {currentSensor?.readings?.map((reading, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-caption text-muted-foreground">
                  {reading?.parameter}
                </span>
                <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-heading font-bold text-foreground">
                  {reading?.value}
                </span>
                <span className="text-sm font-caption text-muted-foreground">
                  {reading?.unit}
                </span>
              </div>
              {reading?.trend && (
                <div className={`
                  flex items-center space-x-1 mt-2 text-xs font-caption
                  ${reading?.trend === 'up' ? 'text-error' : reading?.trend === 'down' ? 'text-success' : 'text-muted-foreground'}
                `}>
                  <Icon 
                    name={reading?.trend === 'up' ? 'TrendingUp' : reading?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                    size={12} 
                  />
                  <span>{reading?.change || 'Stable'}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        {sensorData?.length > 1 && (
          <div className="flex justify-center space-x-2 mt-6">
            {sensorData?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'}
                `}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorReadingsCarousel;
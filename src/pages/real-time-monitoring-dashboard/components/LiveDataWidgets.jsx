import React from 'react';
import Icon from '../../../components/AppIcon';

const LiveDataWidgets = ({ weatherData, tideData, satelliteData }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions?.[Math.round(degrees / 45) % 8];
  };

  const getTideStatus = (level) => {
    if (level > 2.5) return { status: 'High', color: 'text-error', bgColor: 'bg-error/10' };
    if (level > 1.5) return { status: 'Rising', color: 'text-warning', bgColor: 'bg-warning/10' };
    if (level < 0.5) return { status: 'Low', color: 'text-success', bgColor: 'bg-success/10' };
    return { status: 'Normal', color: 'text-foreground', bgColor: 'bg-muted/10' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Weather Widget */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Cloud" size={20} className="text-primary" />
            <h3 className="font-body font-semibold text-foreground">
              Weather Conditions
            </h3>
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            {formatTimestamp(weatherData?.timestamp)}
          </div>
        </div>

        <div className="space-y-4">
          {/* Temperature */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Thermometer" size={16} className="text-muted-foreground" />
              <span className="text-sm font-body text-muted-foreground">Temperature</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-heading font-bold text-foreground">
                {weatherData?.temperature}°C
              </div>
              <div className="text-xs font-caption text-muted-foreground">
                Feels like {weatherData?.feelsLike}°C
              </div>
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Droplets" size={16} className="text-muted-foreground" />
              <span className="text-sm font-body text-muted-foreground">Humidity</span>
            </div>
            <div className="text-lg font-heading font-bold text-foreground">
              {weatherData?.humidity}%
            </div>
          </div>

          {/* Wind */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Wind" size={16} className="text-muted-foreground" />
              <span className="text-sm font-body text-muted-foreground">Wind</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-heading font-bold text-foreground">
                {weatherData?.windSpeed} km/h
              </div>
              <div className="text-xs font-caption text-muted-foreground">
                {getWindDirection(weatherData?.windDirection)}
              </div>
            </div>
          </div>

          {/* Pressure */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Gauge" size={16} className="text-muted-foreground" />
              <span className="text-sm font-body text-muted-foreground">Pressure</span>
            </div>
            <div className="text-lg font-heading font-bold text-foreground">
              {weatherData?.pressure} hPa
            </div>
          </div>
        </div>
      </div>
      {/* Tide Widget */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Waves" size={20} className="text-primary" />
            <h3 className="font-body font-semibold text-foreground">
              Tide Gauge
            </h3>
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            {formatTimestamp(tideData?.timestamp)}
          </div>
        </div>

        <div className="space-y-4">
          {/* Current Level */}
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-foreground mb-2">
              {tideData?.currentLevel}m
            </div>
            <div className={`
              inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-caption font-medium
              ${getTideStatus(tideData?.currentLevel)?.bgColor} ${getTideStatus(tideData?.currentLevel)?.color}
            `}>
              <Icon name="Activity" size={14} />
              <span>{getTideStatus(tideData?.currentLevel)?.status}</span>
            </div>
          </div>

          {/* Tide Times */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-body text-muted-foreground">High Tide</span>
              <div className="text-right">
                <div className="font-body font-medium text-foreground">
                  {tideData?.highTide?.time}
                </div>
                <div className="text-xs font-caption text-muted-foreground">
                  {tideData?.highTide?.level}m
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-body text-muted-foreground">Low Tide</span>
              <div className="text-right">
                <div className="font-body font-medium text-foreground">
                  {tideData?.lowTide?.time}
                </div>
                <div className="text-xs font-caption text-muted-foreground">
                  {tideData?.lowTide?.level}m
                </div>
              </div>
            </div>
          </div>

          {/* Trend Indicator */}
          <div className="flex items-center justify-center space-x-2 pt-2 border-t border-border">
            <Icon 
              name={tideData?.trend === 'rising' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={tideData?.trend === 'rising' ? 'text-warning' : 'text-success'} 
            />
            <span className="text-sm font-body text-muted-foreground">
              {tideData?.trend === 'rising' ? 'Rising' : 'Falling'}
            </span>
          </div>
        </div>
      </div>
      {/* Satellite Widget */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Satellite" size={20} className="text-primary" />
            <h3 className="font-body font-semibold text-foreground">
              Satellite Imagery
            </h3>
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            {formatTimestamp(satelliteData?.timestamp)}
          </div>
        </div>

        <div className="space-y-4">
          {/* Satellite Image Thumbnail */}
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop"
              alt="Satellite view of coastal area"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2 left-2 text-white">
              <div className="text-xs font-caption">
                Latest Capture
              </div>
              <div className="text-sm font-body font-medium">
                Coastal Region Overview
              </div>
            </div>
          </div>

          {/* Satellite Data */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-body text-muted-foreground">Cloud Cover</span>
              <span className="font-body font-medium text-foreground">
                {satelliteData?.cloudCover}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-body text-muted-foreground">Visibility</span>
              <span className="font-body font-medium text-foreground">
                {satelliteData?.visibility} km
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-body text-muted-foreground">Resolution</span>
              <span className="font-body font-medium text-foreground">
                {satelliteData?.resolution}m
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center space-x-2 pt-2 border-t border-border">
            <div className={`
              w-2 h-2 rounded-full
              ${satelliteData?.status === 'active' ? 'bg-success animate-pulse' : 'bg-muted-foreground'}
            `} />
            <span className="text-sm font-body text-muted-foreground">
              {satelliteData?.status === 'active' ? 'Live Feed' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDataWidgets;
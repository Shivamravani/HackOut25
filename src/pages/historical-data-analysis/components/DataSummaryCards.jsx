import React, { useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const DataSummaryCards = ({ data, selectedSensors, dateRange }) => {
  const summaryStats = useMemo(() => {
    if (!data || data?.length === 0 || selectedSensors?.length === 0) return [];

    return selectedSensors?.map(sensorId => {
      const values = data?.map(d => d?.[sensorId])?.filter(v => v !== undefined && v !== null);
      
      if (values?.length === 0) return null;

      const min = Math.min(...values);
      const max = Math.max(...values);
      const avg = values?.reduce((sum, val) => sum + val, 0) / values?.length;
      const latest = values?.[values?.length - 1];
      const previous = values?.[values?.length - 2] || latest;
      const change = latest - previous;
      const changePercent = previous !== 0 ? (change / previous) * 100 : 0;

      // Detect anomalies (values beyond 2 standard deviations)
      const stdDev = Math.sqrt(values?.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values?.length);
      const anomalies = values?.filter(val => Math.abs(val - avg) > 2 * stdDev)?.length;

      return {
        sensorId,
        min,
        max,
        avg,
        latest,
        change,
        changePercent,
        anomalies,
        dataPoints: values?.length
      };
    })?.filter(Boolean);
  }, [data, selectedSensors]);

  const getSensorInfo = (sensorId) => {
    const sensorConfig = {
      ph: { name: 'pH Levels', unit: 'pH', icon: 'Droplets', color: 'text-blue-600', bgColor: 'bg-blue-50' },
      salinity: { name: 'Salinity', unit: 'ppt', icon: 'Waves', color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
      temperature: { name: 'Water Temperature', unit: '°C', icon: 'Thermometer', color: 'text-red-600', bgColor: 'bg-red-50' },
      dissolved_oxygen: { name: 'Dissolved Oxygen', unit: 'mg/L', icon: 'Wind', color: 'text-green-600', bgColor: 'bg-green-50' },
      tide_gauge: { name: 'Tide Gauge', unit: 'm', icon: 'Activity', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
      sea_level: { name: 'Sea Level Rise', unit: 'mm/year', icon: 'TrendingUp', color: 'text-purple-600', bgColor: 'bg-purple-50' },
      wave_height: { name: 'Wave Height', unit: 'm', icon: 'Waves', color: 'text-teal-600', bgColor: 'bg-teal-50' },
      wind_speed: { name: 'Wind Speed', unit: 'm/s', icon: 'Wind', color: 'text-gray-600', bgColor: 'bg-gray-50' },
      air_pressure: { name: 'Atmospheric Pressure', unit: 'hPa', icon: 'Gauge', color: 'text-orange-600', bgColor: 'bg-orange-50' },
      humidity: { name: 'Humidity', unit: '%', icon: 'CloudRain', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
      algal_bloom: { name: 'Algal Bloom', unit: 'cells/mL', icon: 'AlertTriangle', color: 'text-lime-600', bgColor: 'bg-lime-50' },
      pollution: { name: 'Pollution Levels', unit: 'ppm', icon: 'AlertCircle', color: 'text-red-700', bgColor: 'bg-red-100' },
      turbidity: { name: 'Water Turbidity', unit: 'NTU', icon: 'Eye', color: 'text-amber-600', bgColor: 'bg-amber-50' }
    };
    return sensorConfig?.[sensorId] || { name: sensorId, unit: '', icon: 'Activity', color: 'text-gray-600', bgColor: 'bg-gray-50' };
  };

  const formatValue = (value, unit) => {
    if (typeof value !== 'number') return 'N/A';
    return `${value?.toFixed(2)} ${unit}`;
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getAnomalyStatus = (anomalies, total) => {
    const percentage = (anomalies / total) * 100;
    if (percentage > 10) return { status: 'High', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (percentage > 5) return { status: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'Low', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  if (summaryStats?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center">
          <Icon name="BarChart3" size={32} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No data available for summary statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Data Summary</h3>
        {dateRange && (
          <span className="text-sm text-muted-foreground">
            {dateRange?.label}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {summaryStats?.map((stats) => {
          const sensorInfo = getSensorInfo(stats?.sensorId);
          const anomalyStatus = getAnomalyStatus(stats?.anomalies, stats?.dataPoints);

          return (
            <div key={stats?.sensorId} className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${sensorInfo?.bgColor}`}>
                    <Icon name={sensorInfo?.icon} size={20} className={sensorInfo?.color} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{sensorInfo?.name}</h4>
                    <p className="text-xs text-muted-foreground">{stats?.dataPoints} readings</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${anomalyStatus?.bgColor} ${anomalyStatus?.color}`}>
                  {stats?.anomalies} anomalies
                </div>
              </div>
              <div className="space-y-3">
                {/* Current Value */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">
                      {formatValue(stats?.latest, sensorInfo?.unit)}
                    </span>
                    <div className={`flex items-center space-x-1 ${getChangeColor(stats?.change)}`}>
                      <Icon name={getChangeIcon(stats?.change)} size={14} />
                      <span className="text-xs font-medium">
                        {Math.abs(stats?.changePercent)?.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-medium text-foreground">
                      {formatValue(stats?.min, sensorInfo?.unit)}
                    </div>
                    <div className="text-muted-foreground">Min</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-medium text-foreground">
                      {formatValue(stats?.avg, sensorInfo?.unit)}
                    </div>
                    <div className="text-muted-foreground">Avg</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-medium text-foreground">
                      {formatValue(stats?.max, sensorInfo?.unit)}
                    </div>
                    <div className="text-muted-foreground">Max</div>
                  </div>
                </div>

                {/* Trend Indicator */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">Trend</span>
                  <div className={`flex items-center space-x-1 ${getChangeColor(stats?.change)}`}>
                    <Icon name={getChangeIcon(stats?.change)} size={12} />
                    <span className="text-xs font-medium">
                      {stats?.change > 0 ? 'Increasing' : stats?.change < 0 ? 'Decreasing' : 'Stable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Overall Summary */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
            <span className="font-medium text-foreground">Analysis Summary</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {summaryStats?.length} sensor{summaryStats?.length !== 1 ? 's' : ''} analyzed
          </span>
        </div>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-foreground">
              {summaryStats?.reduce((sum, s) => sum + s?.dataPoints, 0)}
            </div>
            <div className="text-muted-foreground">Total Readings</div>
          </div>
          <div>
            <div className="font-medium text-foreground">
              {summaryStats?.reduce((sum, s) => sum + s?.anomalies, 0)}
            </div>
            <div className="text-muted-foreground">Total Anomalies</div>
          </div>
          <div>
            <div className="font-medium text-foreground">
              {summaryStats?.filter(s => s?.change > 0)?.length}
            </div>
            <div className="text-muted-foreground">Increasing Trends</div>
          </div>
          <div>
            <div className="font-medium text-foreground">
              {summaryStats?.filter(s => s?.change < 0)?.length}
            </div>
            <div className="text-muted-foreground">Decreasing Trends</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSummaryCards;
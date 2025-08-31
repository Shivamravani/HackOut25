import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataVisualizationChart = ({ data, selectedSensors, dateRange, selectedAreas }) => {
  const [chartType, setChartType] = useState('line');
  const [showGrid, setShowGrid] = useState(true);
  const [smoothCurve, setSmoothCurve] = useState(true);

  // Mock data generation based on selections
  const chartData = useMemo(() => {
    if (!dateRange || selectedSensors?.length === 0) return [];

    const generateMockData = () => {
      const data = [];
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const dataPoints = Math.min(daysDiff, 100); // Limit to 100 points for performance

      for (let i = 0; i <= dataPoints; i++) {
        const currentDate = new Date(startDate);
        currentDate?.setDate(startDate?.getDate() + (i * daysDiff / dataPoints));
        
        const dataPoint = {
          date: currentDate?.toISOString()?.split('T')?.[0],
          timestamp: currentDate?.getTime()
        };

        // Generate mock values for each selected sensor
        selectedSensors?.forEach(sensorId => {
          switch (sensorId) {
            case 'ph':
              dataPoint[sensorId] = 7.5 + Math.sin(i * 0.1) * 0.5 + (Math.random() - 0.5) * 0.2;
              break;
            case 'salinity':
              dataPoint[sensorId] = 35 + Math.cos(i * 0.08) * 2 + (Math.random() - 0.5) * 0.5;
              break;
            case 'temperature':
              dataPoint[sensorId] = 20 + Math.sin(i * 0.05) * 8 + (Math.random() - 0.5) * 2;
              break;
            case 'dissolved_oxygen':
              dataPoint[sensorId] = 8 + Math.sin(i * 0.12) * 1.5 + (Math.random() - 0.5) * 0.3;
              break;
            case 'tide_gauge':
              dataPoint[sensorId] = Math.sin(i * 0.3) * 2 + (Math.random() - 0.5) * 0.2;
              break;
            case 'sea_level':
              dataPoint[sensorId] = 3.2 + (i * 0.01) + (Math.random() - 0.5) * 0.1;
              break;
            case 'wave_height':
              dataPoint[sensorId] = 1.5 + Math.sin(i * 0.2) * 1 + (Math.random() - 0.5) * 0.3;
              break;
            case 'wind_speed':
              dataPoint[sensorId] = 10 + Math.sin(i * 0.15) * 5 + (Math.random() - 0.5) * 2;
              break;
            case 'air_pressure':
              dataPoint[sensorId] = 1013 + Math.sin(i * 0.1) * 10 + (Math.random() - 0.5) * 3;
              break;
            case 'humidity':
              dataPoint[sensorId] = 65 + Math.sin(i * 0.08) * 15 + (Math.random() - 0.5) * 5;
              break;
            case 'algal_bloom':
              dataPoint[sensorId] = Math.max(0, 1000 + Math.sin(i * 0.2) * 800 + (Math.random() - 0.5) * 200);
              break;
            case 'pollution':
              dataPoint[sensorId] = Math.max(0, 50 + Math.sin(i * 0.18) * 30 + (Math.random() - 0.5) * 10);
              break;
            case 'turbidity':
              dataPoint[sensorId] = Math.max(0, 5 + Math.sin(i * 0.25) * 3 + (Math.random() - 0.5) * 1);
              break;
            default:
              dataPoint[sensorId] = Math.random() * 100;
          }
        });
      }
      return data;
    };

    return generateMockData();
  }, [dateRange, selectedSensors]);

  const sensorColors = {
    ph: '#3B82F6',
    salinity: '#06B6D4',
    temperature: '#EF4444',
    dissolved_oxygen: '#10B981',
    tide_gauge: '#6366F1',
    sea_level: '#8B5CF6',
    wave_height: '#14B8A6',
    wind_speed: '#6B7280',
    wind_direction: '#64748B',
    air_pressure: '#F97316',
    humidity: '#059669',
    algal_bloom: '#84CC16',
    pollution: '#DC2626',
    turbidity: '#F59E0B'
  };

  const getSensorUnit = (sensorId) => {
    const units = {
      ph: 'pH',
      salinity: 'ppt',
      temperature: '°C',
      dissolved_oxygen: 'mg/L',
      tide_gauge: 'm',
      sea_level: 'mm/year',
      wave_height: 'm',
      wind_speed: 'm/s',
      wind_direction: '°',
      air_pressure: 'hPa',
      humidity: '%',
      algal_bloom: 'cells/mL',
      pollution: 'ppm',
      turbidity: 'NTU'
    };
    return units?.[sensorId] || '';
  };

  const getSensorName = (sensorId) => {
    const names = {
      ph: 'pH Levels',
      salinity: 'Salinity',
      temperature: 'Water Temperature',
      dissolved_oxygen: 'Dissolved Oxygen',
      tide_gauge: 'Tide Gauge',
      sea_level: 'Sea Level Rise',
      wave_height: 'Wave Height',
      wind_speed: 'Wind Speed',
      wind_direction: 'Wind Direction',
      air_pressure: 'Atmospheric Pressure',
      humidity: 'Humidity',
      algal_bloom: 'Algal Bloom Detection',
      pollution: 'Pollution Levels',
      turbidity: 'Water Turbidity'
    };
    return names?.[sensorId] || sensorId;
  };

  const formatTooltipValue = (value, name) => {
    if (typeof value === 'number') {
      return [value?.toFixed(2), getSensorName(name)];
    }
    return [value, name];
  };

  const formatXAxisLabel = (tickItem) => {
    const date = new Date(tickItem);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartTypes = [
    { type: 'line', icon: 'TrendingUp', label: 'Line Chart' },
    { type: 'area', icon: 'AreaChart', label: 'Area Chart' },
    { type: 'bar', icon: 'BarChart3', label: 'Bar Chart' }
  ];

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    const xAxisProps = {
      dataKey: 'date',
      tickFormatter: formatXAxisLabel,
      tick: { fontSize: 12 }
    };

    const yAxisProps = {
      tick: { fontSize: 12 }
    };

    const tooltipProps = {
      labelFormatter: (label) => new Date(label)?.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      formatter: formatTooltipValue,
      contentStyle: {
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px'
      }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />}
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Tooltip {...tooltipProps} />
            <Legend />
            {selectedSensors?.map((sensorId, index) => (
              <Area
                key={sensorId}
                type={smoothCurve ? 'monotone' : 'linear'}
                dataKey={sensorId}
                stackId={index < 3 ? '1' : '2'}
                stroke={sensorColors?.[sensorId]}
                fill={sensorColors?.[sensorId]}
                fillOpacity={0.3}
                name={getSensorName(sensorId)}
              />
            ))}
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />}
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Tooltip {...tooltipProps} />
            <Legend />
            {selectedSensors?.map((sensorId) => (
              <Bar
                key={sensorId}
                dataKey={sensorId}
                fill={sensorColors?.[sensorId]}
                name={getSensorName(sensorId)}
              />
            ))}
          </BarChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />}
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Tooltip {...tooltipProps} />
            <Legend />
            {selectedSensors?.map((sensorId) => (
              <Line
                key={sensorId}
                type={smoothCurve ? 'monotone' : 'linear'}
                dataKey={sensorId}
                stroke={sensorColors?.[sensorId]}
                strokeWidth={2}
                dot={false}
                name={getSensorName(sensorId)}
              />
            ))}
          </LineChart>
        );
    }
  };

  if (!dateRange || selectedSensors?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8">
        <div className="text-center">
          <Icon name="BarChart3" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Data to Display</h3>
          <p className="text-muted-foreground">
            Please select a date range and at least one sensor type to view the data visualization.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data Visualization</h3>
          <p className="text-sm text-muted-foreground">
            {selectedSensors?.length} sensor{selectedSensors?.length !== 1 ? 's' : ''} • {chartData?.length} data points
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {chartTypes?.map((type) => (
              <Button
                key={type?.type}
                variant={chartType === type?.type ? "default" : "ghost"}
                size="xs"
                onClick={() => setChartType(type?.type)}
                iconName={type?.icon}
                iconSize={14}
                className="px-2"
              >
                <span className="hidden sm:inline ml-1">{type?.label}</span>
              </Button>
            ))}
          </div>

          {/* Chart Options */}
          <div className="flex items-center space-x-2">
            <Button
              variant={showGrid ? "default" : "outline"}
              size="xs"
              onClick={() => setShowGrid(!showGrid)}
              iconName="Grid3X3"
              iconSize={14}
            >
              <span className="hidden sm:inline ml-1">Grid</span>
            </Button>
            
            {chartType === 'line' && (
              <Button
                variant={smoothCurve ? "default" : "outline"}
                size="xs"
                onClick={() => setSmoothCurve(!smoothCurve)}
                iconName="Waves"
                iconSize={14}
              >
                <span className="hidden sm:inline ml-1">Smooth</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="mt-4 p-3 bg-muted rounded-md">
        <h4 className="text-sm font-medium text-foreground mb-2">Active Sensors</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {selectedSensors?.map((sensorId) => (
            <div key={sensorId} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: sensorColors?.[sensorId] }}
              />
              <span className="text-xs text-foreground truncate">
                {getSensorName(sensorId)} ({getSensorUnit(sensorId)})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationChart;
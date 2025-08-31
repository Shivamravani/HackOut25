import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DateRangePicker from './components/DateRangePicker';
import SensorTypeSelector from './components/SensorTypeSelector';
import GeographicAreaSelector from './components/GeographicAreaSelector';
import DataVisualizationChart from './components/DataVisualizationChart';
import DataSummaryCards from './components/DataSummaryCards';
import ComparisonTools from './components/ComparisonTools';
import ExportTools from './components/ExportTools';
import AdvancedFilters from './components/AdvancedFilters';

const HistoricalDataAnalysis = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedSensorTypes, setSelectedSensorTypes] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [comparisonSettings, setComparisonSettings] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('analysis'); // 'analysis', 'comparison', 'export'

  // Generate mock chart data when filters change
  useEffect(() => {
    if (selectedDateRange && selectedSensorTypes?.length > 0) {
      setIsLoading(true);
      // Simulate data loading
      setTimeout(() => {
        const mockData = generateMockChartData();
        setChartData(mockData);
        setIsLoading(false);
      }, 1000);
    } else {
      setChartData([]);
    }
  }, [selectedDateRange, selectedSensorTypes, selectedAreas, advancedFilters]);

  const generateMockChartData = () => {
    if (!selectedDateRange) return [];

    const startDate = new Date(selectedDateRange.startDate);
    const endDate = new Date(selectedDateRange.endDate);
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const dataPoints = Math.min(daysDiff, 100);

    const data = [];
    for (let i = 0; i <= dataPoints; i++) {
      const currentDate = new Date(startDate);
      currentDate?.setDate(startDate?.getDate() + (i * daysDiff / dataPoints));
      
      const dataPoint = {
        date: currentDate?.toISOString()?.split('T')?.[0],
        timestamp: currentDate?.getTime()
      };

      selectedSensorTypes?.forEach(sensorId => {
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

  const handleExport = (exportData) => {
    console.log('Exporting data:', exportData);
    // In a real application, this would trigger the actual export process
  };

  const hasValidSelection = selectedDateRange && selectedSensorTypes?.length > 0;

  const viewModes = [
    { mode: 'analysis', label: 'Analysis', icon: 'BarChart3' },
    { mode: 'comparison', label: 'Comparison', icon: 'GitCompare' },
    { mode: 'export', label: 'Export', icon: 'Download' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Historical Data Analysis
                </h1>
                <p className="text-muted-foreground mt-1">
                  Analyze environmental trends and generate comprehensive reports for coastal management planning
                </p>
              </div>
              
              {/* View Mode Selector */}
              <div className="flex bg-muted rounded-lg p-1">
                {viewModes?.map((mode) => (
                  <Button
                    key={mode?.mode}
                    variant={viewMode === mode?.mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode(mode?.mode)}
                    iconName={mode?.icon}
                    iconSize={16}
                    className="px-4"
                  >
                    {mode?.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Sidebar - Filters and Controls */}
            <div className="xl:col-span-1 space-y-6">
              <DateRangePicker
                onDateRangeChange={setSelectedDateRange}
                selectedRange={selectedDateRange}
              />
              
              <SensorTypeSelector
                onSensorTypesChange={setSelectedSensorTypes}
                selectedTypes={selectedSensorTypes}
              />
              
              <GeographicAreaSelector
                onAreaChange={setSelectedAreas}
                selectedAreas={selectedAreas}
              />

              {viewMode === 'analysis' && (
                <AdvancedFilters
                  onFiltersChange={setAdvancedFilters}
                  appliedFilters={advancedFilters}
                />
              )}

              {viewMode === 'comparison' && (
                <ComparisonTools
                  onComparisonChange={setComparisonSettings}
                  selectedSensors={selectedSensorTypes}
                />
              )}

              {viewMode === 'export' && (
                <ExportTools
                  selectedSensors={selectedSensorTypes}
                  selectedAreas={selectedAreas}
                  dateRange={selectedDateRange}
                  onExport={handleExport}
                />
              )}
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {/* Loading State */}
              {isLoading && (
                <div className="bg-card rounded-lg border border-border p-8">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-muted-foreground">Loading data...</span>
                  </div>
                </div>
              )}

              {/* Data Visualization */}
              {!isLoading && (
                <DataVisualizationChart
                  data={chartData}
                  selectedSensors={selectedSensorTypes}
                  dateRange={selectedDateRange}
                  selectedAreas={selectedAreas}
                />
              )}

              {/* Data Summary Cards */}
              {!isLoading && hasValidSelection && (
                <DataSummaryCards
                  data={chartData}
                  selectedSensors={selectedSensorTypes}
                  dateRange={selectedDateRange}
                />
              )}

              {/* No Data State */}
              {!isLoading && !hasValidSelection && (
                <div className="bg-card rounded-lg border border-border p-12">
                  <div className="text-center">
                    <Icon name="BarChart3" size={64} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Start Your Analysis
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Select a date range and sensor types from the sidebar to begin analyzing historical environmental data.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Calendar" size={16} />
                        <span>Choose date range</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Activity" size={16} />
                        <span>Select sensors</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={16} />
                        <span>Pick locations</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats Bar */}
              {hasValidSelection && !isLoading && (
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {chartData?.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Data Points</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {selectedSensorTypes?.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Sensors</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {selectedAreas?.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Locations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {selectedDateRange ? Math.ceil((new Date(selectedDateRange.endDate) - new Date(selectedDateRange.startDate)) / (1000 * 60 * 60 * 24)) : 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Days</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HistoricalDataAnalysis;
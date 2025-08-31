import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState('normal');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [userRole, setUserRole] = useState('community');

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/real-time-monitoring-dashboard',
      icon: 'Activity',
      tooltip: 'Real-time monitoring command center'
    },
    {
      label: 'Threat Map',
      path: '/interactive-threat-map',
      icon: 'Map',
      tooltip: 'Geographic visualization and threat zones'
    },
    {
      label: 'Alerts',
      path: '/alert-management-center',
      icon: 'AlertTriangle',
      tooltip: 'Alert management and notifications'
    },
    {
      label: 'Analysis',
      path: '/historical-data-analysis',
      icon: 'TrendingUp',
      tooltip: 'Historical data and trend analysis'
    },
    {
      label: 'Preferences',
      path: '/community-alert-preferences',
      icon: 'Settings',
      tooltip: 'Community alert preferences'
    }
  ];

  const alertStatusConfig = {
    normal: { color: 'text-success', bgColor: 'bg-success/10', label: 'Normal' },
    moderate: { color: 'text-warning', bgColor: 'bg-warning/10', label: 'Moderate' },
    high: { color: 'text-error', bgColor: 'bg-error/10', label: 'High Alert' },
    critical: { color: 'text-error', bgColor: 'bg-error/20', label: 'Critical' }
  };

  const userRoleConfig = {
    community: { label: 'Community', icon: 'Users' },
    official: { label: 'Official', icon: 'Shield' },
    admin: { label: 'Admin', icon: 'Crown' }
  };

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Simulate alert status updates
    const alertInterval = setInterval(() => {
      const statuses = ['normal', 'moderate', 'high', 'critical'];
      setAlertStatus(statuses?.[Math.floor(Math.random() * statuses?.length)]);
    }, 30000);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      clearInterval(alertInterval);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Waves" size={24} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-heading font-semibold text-foreground">
              Coastal Threat Alert
            </h1>
            <p className="text-xs font-caption text-muted-foreground">
              Environmental Monitoring System
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium
                transition-all duration-200 hover:bg-muted/50 active:scale-98
                ${isActivePath(item?.path) 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-foreground hover:text-primary'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Status Indicators & User Menu */}
        <div className="flex items-center space-x-3">
          {/* Alert Status Indicator */}
          <div className={`
            hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-caption font-medium
            ${alertStatusConfig?.[alertStatus]?.bgColor} ${alertStatusConfig?.[alertStatus]?.color}
          `}>
            <div className={`w-2 h-2 rounded-full ${alertStatusConfig?.[alertStatus]?.color?.replace('text-', 'bg-')}`} />
            <span>{alertStatusConfig?.[alertStatus]?.label}</span>
          </div>

          {/* Connection Status */}
          <div className={`
            hidden sm:flex items-center space-x-1 px-2 py-1 rounded text-xs font-caption
            ${isOnline ? 'text-success' : 'text-error'}
          `}>
            <Icon name={isOnline ? 'Wifi' : 'WifiOff'} size={14} />
            <span className="hidden md:inline">{isOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* User Role Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-full">
            <Icon name={userRoleConfig?.[userRole]?.icon} size={14} className="text-muted-foreground" />
            <span className="text-xs font-caption font-medium text-muted-foreground">
              {userRoleConfig?.[userRole]?.label}
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="lg:hidden"
            iconName={isMobileMenuOpen ? 'X' : 'Menu'}
            iconSize={20}
          >
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-in">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-body font-medium
                  transition-all duration-200 active:scale-98
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {/* Mobile Status Indicators */}
            <div className="pt-3 mt-3 border-t border-border space-y-2">
              <div className={`
                flex items-center justify-between px-3 py-2 rounded-md
                ${alertStatusConfig?.[alertStatus]?.bgColor}
              `}>
                <span className="text-sm font-caption font-medium text-foreground">
                  Threat Level
                </span>
                <div className={`flex items-center space-x-2 ${alertStatusConfig?.[alertStatus]?.color}`}>
                  <div className={`w-2 h-2 rounded-full ${alertStatusConfig?.[alertStatus]?.color?.replace('text-', 'bg-')}`} />
                  <span className="text-sm font-medium">{alertStatusConfig?.[alertStatus]?.label}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-caption font-medium text-foreground">
                  Connection
                </span>
                <div className={`flex items-center space-x-2 ${isOnline ? 'text-success' : 'text-error'}`}>
                  <Icon name={isOnline ? 'Wifi' : 'WifiOff'} size={16} />
                  <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
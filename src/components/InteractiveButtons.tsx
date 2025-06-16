import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Download, 
  Save, 
  Trash2, 
  Settings, 
  Plus, 
  Minus,
  RefreshCw,
  Check,
  X,
  Volume2,
  VolumeX,
  Loader2,
  AlertTriangle,
  Undo,
  Redo,
  ChevronRight
} from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  ripple?: boolean;
  confirmAction?: boolean;
  confirmMessage?: string;
}

interface RippleEffect {
  x: number;
  y: number;
  id: number;
}

export const InteractiveButtons: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [confirmDialog, setConfirmDialog] = useState<{ show: boolean; message: string; action: () => void } | null>(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new AudioContext();
    }
  }, []);

  // Play sound effect
  const playSound = (frequency: number = 800, duration: number = 100) => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  // Enhanced Button Component
  const EnhancedButton: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    children,
    onClick,
    ariaLabel,
    tooltip,
    icon,
    ripple = true,
    confirmAction = false,
    confirmMessage = 'Are you sure?'
  }) => {
    const [ripples, setRipples] = useState<RippleEffect[]>([]);
    const [showTooltip, setShowTooltip] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const baseClasses = `
      relative overflow-hidden font-medium rounded-lg transition-all duration-200 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
      disabled:opacity-50 disabled:cursor-not-allowed
      transform active:scale-95 hover:scale-105
    `;

    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-blue-500/25',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-lg hover:shadow-gray-500/25',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-red-500/25',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-lg hover:shadow-green-500/25',
      warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500 shadow-lg hover:shadow-yellow-500/25'
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      // Create ripple effect
      if (ripple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { x, y, id: Date.now() };
        
        setRipples(prev => [...prev, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
      }

      // Play sound
      playSound(variant === 'danger' ? 600 : variant === 'success' ? 1000 : 800);

      // Handle confirmation
      if (confirmAction && onClick) {
        setConfirmDialog({
          show: true,
          message: confirmMessage,
          action: onClick
        });
      } else if (onClick) {
        onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(e as any);
      }
    };

    return (
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          disabled={disabled || loading}
          aria-label={ariaLabel}
          role="button"
          tabIndex={0}
        >
          {/* Ripple Effects */}
          {ripples.map(ripple => (
            <span
              key={ripple.id}
              className="absolute bg-white/30 rounded-full animate-ping"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                animationDuration: '0.6s'
              }}
            />
          ))}

          {/* Button Content */}
          <span className="relative flex items-center justify-center space-x-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : icon ? (
              <span className="flex-shrink-0">{icon}</span>
            ) : null}
            <span>{children}</span>
          </span>
        </button>

        {/* Tooltip */}
        {tooltip && showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50 animate-fade-in">
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
          </div>
        )}
      </div>
    );
  };

  // Simulate async operation
  const simulateAsyncOperation = async (key: string, duration: number = 2000) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    setShowProgress(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 100));
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    await new Promise(resolve => setTimeout(resolve, duration));
    
    clearInterval(interval);
    setLoadingStates(prev => ({ ...prev, [key]: false }));
    setShowProgress(false);
    setProgress(0);
    playSound(1200, 150); // Success sound
  };

  // Undo/Redo functionality
  const addToUndoStack = (action: string) => {
    setUndoStack(prev => [...prev, action]);
    setRedoStack([]); // Clear redo stack when new action is performed
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastAction = undoStack[undoStack.length - 1];
      setUndoStack(prev => prev.slice(0, -1));
      setRedoStack(prev => [...prev, lastAction]);
      playSound(700, 100);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastRedo = redoStack[redoStack.length - 1];
      setRedoStack(prev => prev.slice(0, -1));
      setUndoStack(prev => [...prev, lastRedo]);
      playSound(900, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Interactive Button System</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience enhanced user interactions with responsive buttons, sound effects, 
            loading states, and accessibility features.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Controls</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                <span className="text-sm">{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <EnhancedButton
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              tooltip="Undo last action"
              icon={<Undo className="h-4 w-4" />}
              variant="secondary"
              ariaLabel="Undo"
            >
              Undo ({undoStack.length})
            </EnhancedButton>

            <EnhancedButton
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              tooltip="Redo last undone action"
              icon={<Redo className="h-4 w-4" />}
              variant="secondary"
              ariaLabel="Redo"
            >
              Redo ({redoStack.length})
            </EnhancedButton>
          </div>
        </div>

        {/* Progress Indicator */}
        {showProgress && (
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Processing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Button Variants */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">Button Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">Primary Actions</h3>
              <div className="space-y-3">
                <EnhancedButton
                  variant="primary"
                  icon={<Play className="h-4 w-4" />}
                  tooltip="Start the process"
                  onClick={() => {
                    addToUndoStack('Started process');
                    simulateAsyncOperation('start');
                  }}
                  loading={loadingStates.start}
                  ariaLabel="Start process"
                >
                  Start Process
                </EnhancedButton>

                <EnhancedButton
                  variant="success"
                  icon={<Save className="h-4 w-4" />}
                  tooltip="Save your changes"
                  onClick={() => {
                    addToUndoStack('Saved changes');
                    simulateAsyncOperation('save', 1500);
                  }}
                  loading={loadingStates.save}
                  ariaLabel="Save changes"
                >
                  Save Changes
                </EnhancedButton>

                <EnhancedButton
                  variant="secondary"
                  icon={<Download className="h-4 w-4" />}
                  tooltip="Download file"
                  onClick={() => {
                    addToUndoStack('Downloaded file');
                    simulateAsyncOperation('download', 3000);
                  }}
                  loading={loadingStates.download}
                  ariaLabel="Download file"
                >
                  Download
                </EnhancedButton>
              </div>
            </div>

            {/* Dangerous Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">Dangerous Actions</h3>
              <div className="space-y-3">
                <EnhancedButton
                  variant="danger"
                  icon={<Trash2 className="h-4 w-4" />}
                  tooltip="Delete permanently"
                  confirmAction={true}
                  confirmMessage="This action cannot be undone. Are you sure?"
                  onClick={() => {
                    addToUndoStack('Deleted item');
                    simulateAsyncOperation('delete', 1000);
                  }}
                  loading={loadingStates.delete}
                  ariaLabel="Delete item"
                >
                  Delete Item
                </EnhancedButton>

                <EnhancedButton
                  variant="warning"
                  icon={<RefreshCw className="h-4 w-4" />}
                  tooltip="Reset all settings"
                  confirmAction={true}
                  confirmMessage="This will reset all your settings to default values."
                  onClick={() => {
                    addToUndoStack('Reset settings');
                    simulateAsyncOperation('reset', 2000);
                  }}
                  loading={loadingStates.reset}
                  ariaLabel="Reset settings"
                >
                  Reset Settings
                </EnhancedButton>
              </div>
            </div>

            {/* Utility Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">Utility Actions</h3>
              <div className="space-y-3">
                <EnhancedButton
                  variant="secondary"
                  icon={<Settings className="h-4 w-4" />}
                  tooltip="Open settings"
                  onClick={() => addToUndoStack('Opened settings')}
                  ariaLabel="Open settings"
                >
                  Settings
                </EnhancedButton>

                <EnhancedButton
                  variant="primary"
                  icon={<Plus className="h-4 w-4" />}
                  tooltip="Add new item"
                  onClick={() => addToUndoStack('Added new item')}
                  ariaLabel="Add new item"
                >
                  Add Item
                </EnhancedButton>

                <EnhancedButton
                  variant="secondary"
                  icon={<Minus className="h-4 w-4" />}
                  tooltip="Remove item"
                  onClick={() => addToUndoStack('Removed item')}
                  ariaLabel="Remove item"
                >
                  Remove
                </EnhancedButton>
              </div>
            </div>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">Button Sizes</h2>
          
          <div className="flex flex-wrap items-center gap-4">
            <EnhancedButton
              size="sm"
              variant="primary"
              tooltip="Small button"
              onClick={() => addToUndoStack('Clicked small button')}
            >
              Small
            </EnhancedButton>

            <EnhancedButton
              size="md"
              variant="primary"
              tooltip="Medium button"
              onClick={() => addToUndoStack('Clicked medium button')}
            >
              Medium
            </EnhancedButton>

            <EnhancedButton
              size="lg"
              variant="primary"
              tooltip="Large button"
              onClick={() => addToUndoStack('Clicked large button')}
            >
              Large
            </EnhancedButton>
          </div>
        </div>

        {/* Multi-step Process */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">Multi-step Process</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <EnhancedButton
                variant="primary"
                icon={<ChevronRight className="h-4 w-4" />}
                tooltip="Start multi-step process"
                onClick={() => {
                  addToUndoStack('Started multi-step process');
                  simulateAsyncOperation('multistep', 5000);
                }}
                loading={loadingStates.multistep}
                ariaLabel="Start multi-step process"
              >
                Start Multi-step Process
              </EnhancedButton>
            </div>
          </div>
        </div>

        {/* Disabled States */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">Disabled States</h2>
          
          <div className="flex flex-wrap gap-4">
            <EnhancedButton
              variant="primary"
              disabled={true}
              tooltip="This button is disabled"
              ariaLabel="Disabled primary button"
            >
              Disabled Primary
            </EnhancedButton>

            <EnhancedButton
              variant="danger"
              disabled={true}
              tooltip="This button is disabled"
              ariaLabel="Disabled danger button"
            >
              Disabled Danger
            </EnhancedButton>

            <EnhancedButton
              variant="success"
              disabled={true}
              tooltip="This button is disabled"
              ariaLabel="Disabled success button"
            >
              Disabled Success
            </EnhancedButton>
          </div>
        </div>

        {/* Action History */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Action History</h2>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {undoStack.length === 0 ? (
              <p className="text-gray-400 text-sm">No actions performed yet</p>
            ) : (
              undoStack.map((action, index) => (
                <div key={index} className="text-sm text-gray-300 p-2 bg-gray-700/50 rounded">
                  {index + 1}. {action}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmDialog?.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-white">Confirm Action</h3>
            </div>
            
            <p className="text-gray-300 mb-6">{confirmDialog.message}</p>
            
            <div className="flex space-x-3">
              <EnhancedButton
                variant="danger"
                onClick={() => {
                  confirmDialog.action();
                  setConfirmDialog(null);
                }}
                ariaLabel="Confirm action"
              >
                Confirm
              </EnhancedButton>
              
              <EnhancedButton
                variant="secondary"
                onClick={() => setConfirmDialog(null)}
                ariaLabel="Cancel action"
              >
                Cancel
              </EnhancedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
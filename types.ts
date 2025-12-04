export interface Signal {
  id: string;
  asset: string;
  direction: 'LONG' | 'SHORT' | 'HOLD';
  confidence: number;
  timestamp: string;
  rationaleShort: string;
  agentSource: string; // e.g., 'CryptoMetaLearner'
}

export interface Metric {
  label: string;
  value: string | number;
  change?: number;
  isCurrency?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface PnLDataPoint {
  time: string;
  value: number;
}

export interface DriftMetric {
  feature: string;
  driftScore: number; // 0 to 1
  status: 'STABLE' | 'WARNING' | 'CRITICAL';
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  SIGNALS = 'SIGNALS',
  COPILOT = 'COPILOT',
  DRIFT = 'DRIFT',
  SETTINGS = 'SETTINGS'
}
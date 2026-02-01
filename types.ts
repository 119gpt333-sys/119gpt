
export interface StatItem {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface RiskAnalysis {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  recommendedAction: string;
  suggestedAIModels: string[];
}

export interface DatabaseCategory {
  title: string;
  items: string[];
  color: string;
  iconType: 'Code' | 'Fire' | 'Satellite';
}

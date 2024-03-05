export interface MuzikButton {
  id: string;
  type: 'TEXT' | 'TEXT_ICON' | 'ICON';
  label: string;
  icon?: string;
  class: string;
}

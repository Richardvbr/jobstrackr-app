export type ApplicationStatusType =
  | 'interested'
  | 'applied'
  | 'processing'
  | 'denied'
  | 'accepted'
  | 'offered'
  | 'withdrawn'
  | 'ghosted';

export type EmploymentType =
  | 'full-time'
  | 'part-time'
  | 'internship'
  | 'freelance'
  | 'contract'
  | 'other';

export type WorkModelType = 'office' | 'remote' | 'hybrid';

export type ApplicationTableRow = {
  edit: any;
} & Application;

export type Application = Database['public']['Tables']['applications']['Row'];

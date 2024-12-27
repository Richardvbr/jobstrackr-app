export type ApplicationStatus =
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

// export type Application = {
//   id: string;
//   user_id: string;
//   company: string;
//   position: string;
//   employment_type: EmploymentType;
//   location: string;
//   link: string;
//   notes: string;
//   applied_at: string;
//   status: ApplicationStatus;
//   salary: string;
//   via: string;
//   labels: string;
//   work_model: WorkModelType;
//   salary_currency: string;
//   updated_at: string;
// };

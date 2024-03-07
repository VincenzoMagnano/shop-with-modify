export interface User {
    id?: string;
    name: string;
    surname: string;
    role: 'pj' | 'ps' | 'dir';
    authentication: boolean;
  };
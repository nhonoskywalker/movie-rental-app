export interface Response<T> {
  data?: T;
  statusCode?: number;
  isSuccessful?: boolean;
  errors: string[];
  message: string;
}

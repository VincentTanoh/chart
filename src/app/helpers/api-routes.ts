import { environment } from '@environments/environment';

// create complete path to api
export function apiRoute(route: string): string {
  return `${environment.osApi.url}/${route}`;
}

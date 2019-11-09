import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
 
export const adalConfig = {
  tenant: 'b36ac463-b379-4752-9185-dcb045b3bea2',
  clientId: '21a8dd34-3d87-453b-bd4d-4446c81f9685',
  endpoints: {
    api: 'https://sstack.crm.dynamics.com/',
  },
  cacheLocation: 'localStorage',
};
 
export const authContext = new AuthenticationContext(adalConfig);
 
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);
 
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
import { Network } from 'types';
import axios, { AxiosInstance } from 'axios';

const scanApiInstance = (baseURL: string): AxiosInstance =>
  axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

// ? I wonder if it would be better to move the request method of ScanApi from the site to the snaps background.
export const scanApi = async (
  network: Network,
): Promise<AxiosInstance | null> => {
  if (network?.scanApiUrl) {
    const scanApiUrl = network?.scanApiUrl;
    try {
      const result = scanApiInstance(scanApiUrl);
      return result;
    } catch (e) {
      console.error(e);
      return null;
    }
  } else {
    console.error(`Invalid network label: ${network.label}`);
    return null;
  }
};

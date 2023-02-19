export interface Config {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  refreshToken: string;
  expireDate: string;
  deviceId: string;
}

export interface PlayingStatus {
  song: string;
  artist: string;
  progress: number;
  duration: number;
  shuffle: boolean;
  volumen: number;
  repeat: string;
  isPlaying: boolean;
}

export interface Device {
  id: string;
  isActive: boolean;
  isPrivateSession: boolean;
  isRestricted: boolean;
  name: string;
  type: string;
  volumen: number;
}

export interface Identity {
  id: number;
  name: string;
  email: string;
  idp: Idp;
  geo: Geo;
  user_uuid: string;
  account_id: string;
  ip: string;
  auth_status: string;
  common_name: string;
  service_token_id: string;
  service_token_status: boolean;
  is_warp: boolean;
  is_gateway: boolean;
  version: number;
  orgs: Org[];
  teams: any[];
}

export interface Geo {
  country: string;
}

export interface Idp {
  id: string;
  type: string;
}

export interface Org {
  id: number;
  name: string;
}

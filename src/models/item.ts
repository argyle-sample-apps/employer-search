export type LinkItem = {
  id: string;
  item_id: string;
  name: string;
  type: string;
  has_two_fa: boolean;
  is_disabled: boolean;
  kind: string;
  known_limitations: any;
  status: string;
  status_details: any;
  logo_url: string;
  features: any;
  is_supported: boolean;
  is_fallback?: boolean;
};

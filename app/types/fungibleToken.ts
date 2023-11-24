export interface ApiResponse {
  total: number;
  limit: number;
  cursor: string;
  items: FungibleToken[];
}

export interface FungibleToken {
  interface: string;
  id: string;
  content: Content;
  authorities: any[];
  compression: Compression;
  grouping: any[];
  royalty: Royalty;
  creators: any[];
  ownership: Ownership;
  supply: null | number;
  mutable: boolean;
  burnt: boolean;
  mint_extensions?: MintExtensions;
  token_info: TokenInfo;
}

export interface Content {
  $schema: string;
  json_uri: string;
  files: any[];
  metadata: Record<string, any>;
  links: Record<string, any>;
}

export interface Compression {
  eligible: boolean;
  compressed: boolean;
  data_hash: string;
  creator_hash: string;
  asset_hash: string;
  tree: string;
  seq: number;
  leaf_id: number;
}

export interface Royalty {
  royalty_model: string;
  target: null | string;
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
}

export interface Ownership {
  frozen: boolean;
  delegated: boolean;
  delegate: null | string;
  ownership_model: string;
  owner: string;
}

export interface MintExtensions {
  transfer_fee_config: TransferFeeConfig;
}

export interface TransferFeeConfig {
  withheld_amount: number;
  newer_transfer_fee: TransferFee;
  older_transfer_fee: TransferFee;
  withdraw_withheld_authority: string;
  transfer_fee_config_authority: string;
}

export interface TransferFee {
  epoch: number;
  maximum_fee: number;
  transfer_fee_basis_points: number;
}

export interface TokenInfo {
  symbol: string;
  balance: number;
  supply: number;
  decimals: number;
  token_program: string;
  associated_token_address: string;
  price_info: PriceInfo;
}

export interface PriceInfo {
  price_per_token: number;
  total_price: number;
  currency: string;
}

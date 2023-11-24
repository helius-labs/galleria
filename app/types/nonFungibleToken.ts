export interface NonFungibleApiResponse {
  items: NonFungibleToken[];
  // Add other fields if the API response includes more than just the items array
}

export interface NonFungibleToken {
  interface: string;
  id: string;
  content: NonFungibleContent;
  authorities: Authority[];
  compression: Compression;
  grouping: Grouping[];
  royalty: Royalty;
  creators: Creator[];
  ownership: Ownership;
  supply: Supply | null;
  mutable: boolean;
  burnt: boolean;
}

export interface NonFungibleContent {
  $schema: string;
  json_uri: string;
  files: File[];
  metadata: Metadata;
  links: Record<string, string>;
}

export interface File {
  uri: string;
  cdn_uri: string;
  mime: string;
}

export interface Metadata {
  attributes: Attribute[];
  description: string;
  name: string;
  symbol: string;
  // Add any other fields present in the metadata
}

export interface Attribute {
  value: string;
  trait_type: string;
}

export interface Authority {
  address: string;
  scopes: string[];
}

// Reuse Compression, Royalty, and Ownership interfaces from fungibleToken type file

export interface Grouping {
  group_key: string;
  group_value: string;
}

export interface Creator {
  address: string;
  share: number;
  verified: boolean;
}

export interface Supply {
  print_max_supply: number;
  print_current_supply: number;
  edition_nonce: number;
}

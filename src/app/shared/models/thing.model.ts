export interface Thing {
  _id: string;
  urn?: string;
  name: string;
  description: string;
  shortDescription: string;
  createdAt: Date;
  updatedAt: Date;
  type?: string;
  url: string;
}

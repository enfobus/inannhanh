// lib/contentful.ts
import { createClient, Entry } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

type ImageFields = {
  file: {
    url: string;
  };
};

type ServiceFields = {
  title: string;
  description: string;
  urgency: string;
  image?: ImageFields;
};

export type Service = Entry<ServiceFields>;

export const getServices = async (): Promise<Service[]> => {
  const response = await client.getEntries<Service>({ content_type: 'service' });

  // In dữ liệu JSON ra console để kiểm tra cấu trúc
 
  return response.items;
};

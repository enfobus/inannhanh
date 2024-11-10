// lib/contentful.ts
import { createClient, Entry, EntrySkeletonType } from 'contentful';

// Thiết lập Contentful Client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

// Định nghĩa kiểu cho dữ liệu ảnh
type ImageFields = {
  file: {
    url: string;
  };
};

// Định nghĩa kiểu `ServiceSkeleton` dựa trên `EntrySkeletonType`
interface ServiceSkeleton extends EntrySkeletonType {
  fields: {
    title: string;
    description: string;
    urgency: string;
    image?: ImageFields;
  };
}

// `Service` sẽ là `Entry<ServiceSkeleton>`
export type Service = Entry<ServiceSkeleton>;

// Hàm lấy dữ liệu dịch vụ từ Contentful
export const getServices = async (): Promise<Service[]> => {
  const response = await client.getEntries<Service>({ content_type: 'service' });
  return response.items;
};

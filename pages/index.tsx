// pages/index.tsx
import { GetStaticProps } from 'next';
import { getServices, Service } from '../lib/contentful';
import Image from 'next/image';

type HomeProps = {
  services: Service[];
};

const Home = ({ services }: HomeProps) => {
  return (
    <div className="container">
      <h1>Dịch vụ in ấn nhanh</h1>
      <div className="services">
        {services.map((service, index) => (
          <div key={index} className="service">
            {service.fields.image?.file?.url ? (
              <Image
                src={`https:${service.fields.image.file.url}`} // Đảm bảo thêm "https:"
                alt={service.fields.title}
                width={500}  // Kích thước tùy chỉnh cho hình ảnh
                height={300} // Kích thước tùy chỉnh cho hình ảnh
              />
            ) : (
              <p>Hình ảnh không khả dụng</p>
            )}
            <h2>{service.fields.title}</h2>
            <p>{service.fields.description}</p>
            <p><strong>Thời gian:</strong> {service.fields.urgency}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Lấy dữ liệu dịch vụ từ Contentful
export const getStaticProps: GetStaticProps = async () => {
  const services = await getServices();
  
  return {
    props: {
      services,
    },
  };
};

export default Home;

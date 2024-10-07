import Link from 'next/link';
import Image from 'next/image'; 

const UpdatePropertyList = () => {

  const properties = [
    {
      id: '123',
      address: '123 Main Street',
      listingDate: '2024-10-10',
      propertyType: 'Flat',
      bedroom: 4,
      bathroom: 4,
      homeSize: 1000.5,
      imageUrl: '/images/property1.jpg',  
    },
    {
      id: '1234',
      address: '456 Oak Avenue',
      listingDate: '2024-09-10',
      propertyType: 'Bungalow',
      bedroom: 5,
      bathroom: 6,
      homeSize: 10000.5,
      imageUrl: '/images/property2.jpg',  
    },
  ];

  return (
    <div>
      <h1>Update Properties</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <Link href={`/update-property/${property.id}`}>
              <div>
                {/* Use the Image component from next/image for better optimization */}
                <Image
                  src={property.imageUrl}
                  alt={`Image of ${property.address}`}
                  width={500}  // Set appropriate width
                  height={300}  // Set appropriate height
                />
                <p>Update {property.address}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdatePropertyList;

import Link from 'next/link';
import '../../styles/globals.css';

export default function UpdatePropertyPage() {
  const properties = [
    { id: '123', address: '123 Main Street' },
    { id: '1234', address: '456 Oak Avenue' },
    { id: '12345', address: 'Konark Pooram' },
  ];

  return (
    <div className="update-property">
      <h2>Update Properties</h2>
      <table className="property-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.address}</td>
              <td>
                <Link href={`/update-property/${property.id}`} className="update-link">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

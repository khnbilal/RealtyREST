import { notFound } from 'next/navigation';
import UpdatePropertyForm from './UpdatePropertyForm';

async function getProperty(id) {
  const res = await fetch(`/api/Realty/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export default async function UpdateProperty({ params }) {
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div>
      <h1>Update Property {params.id}</h1>
      <UpdatePropertyForm property={property} />
    </div>
  );
}

import '../styles/globals.css'; // Import the global styles
import Navbar from './components/Navbar'; // Import the Navbar component

export const metadata = {
  title: 'RealtyREST',
  description: 'Manage property listings with ease',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Add the Navbar to the layout */}
        <Navbar />
        {/* Main content of the page */}
        {children}
      </body>
    </html>
  );
}

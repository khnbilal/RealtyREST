// app/contact.js
import Link from 'next/link';

const Contact = () => {
    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: 'black' }}>
            <h1>Contact Us</h1>
            <p>Phone: +91 84217 80972</p>
            <p>Email: khn.bilal17@gmail.com</p>
            <Link href="/" style={{ color: 'white', textDecoration: 'underline' }}>Back to Home</Link>
        </div>
    );
};

export default Contact;

// app/about/page.js
import './about.css'; // Make sure to create this CSS file

export default function AboutPage() {
    return (
        <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <div className="about-section">
                <h2>Our Mission</h2>
                <p>
                    Welcome to RealtyREST! At RealtyREST, we believe that finding the perfect property should be a seamless and enjoyable experience. We are a dedicated team of real estate enthusiasts committed to connecting buyers, sellers, and renters with their dream properties.
                </p>
            </div>
            <div className="about-section">
                <h2>Our Expertise</h2>
                <p>
                    With a passion for real estate and a deep understanding of the market, our team brings years of experience and expertise to the table. We strive to provide accurate and up-to-date listings, ensuring that our clients have access to the best opportunities available.
                </p>
            </div>
            <div className="about-section">
                <h2>Our Vision</h2>
                <p>
                    We envision a world where real estate transactions are transparent, efficient, and stress-free. By leveraging the latest technologies and data-driven insights, we aim to redefine how people search for and transact real estate.
                </p>
            </div>
            <div className="about-section">
                <h2>Your Journey</h2>
                <p>
                    Whether you are a first-time buyer, a seasoned investor, or looking to rent your next home, RealtyREST is here to assist you. We invite you to explore our platform, discover amazing properties, and experience a new standard of real estate services.
                </p>
            </div>
            <div className="about-section">
                <h2>Thank You!</h2>
                <p>
                    Thank you for choosing RealtyREST. We look forward to helping you make your real estate dreams a reality!
                </p>
            </div>
        </div>
    );
}

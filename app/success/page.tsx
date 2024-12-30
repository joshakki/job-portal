// pages/Success.js
import Link from 'next/link';
import '../success/Success.css'; // Import CSS module for styles

const Success = () => {
    return (
        <div className="container">
            <div className="tickContainer">
                <svg className="tick" viewBox="0 0 24 24">
                    <path d="M1 12.5l5 5L23 2" />
                </svg>
            </div>
            <h1>Application Submitted Successfully!</h1>
            <p>Thank you for applying to our job position. We appreciate your interest.</p>
            <p>Our team will review your application and get back to you shortly.</p>
            <Link href="/jobs">
            <div className="link">Return to Home</div>
            </Link>
        </div>
    );
};

export default Success;

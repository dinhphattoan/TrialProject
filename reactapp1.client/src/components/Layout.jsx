import React from 'react';
import Header from './Header'; // Import your Header component
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div>
            <Header />  {/* The header is placed here */}
            <main>{children}</main> {/* The main content */}
            <Footer />
        </div>
    );
}

export default Layout;
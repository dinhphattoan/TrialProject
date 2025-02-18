import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ alignContent: 'center', display: 'flex' } }>
                <Box sx={{
                    borderRadius: 3,
                    margin: 1,
                    paddingTop: 2,
                    paddingBottom: 3,
                    paddingLeft: 3, paddingRight: 3,
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark'
                    },
                    alignItems: 'center'
                }}>
                    {children}
                </Box>

            </main>
            <Footer />
        </>
           

    );
};

export default Layout;
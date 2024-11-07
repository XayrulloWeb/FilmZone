import React from 'react';

function Footer(props) {
    return (
        <>
            <footer className="footer" role="contentinfo" itemScope itemType="http://schema.org/WPFooter">
                <div className="social" role="navigation" aria-labelledby="social-heading">
                    <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
                    <a href="#" aria-label="Youtube"><i className="fa-brands fa-youtube"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="#" aria-label="Mastodon"><i className="fa-brands fa-telegram"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                </div>
                <hr className="footer-break"/>

                <p className="copyright">© 2024 XayrulloWeb. Demo of a <span style={{color: 'red'}}>FilmZone</span>.
                    Some Rights Reserved</p>

            </footer>

        </>
    );
}

export default Footer;
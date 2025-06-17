import React from 'react';

function Footer(props) {
    return (
        <>
            <footer className="footer">
                <div className="social">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="https://t.me" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-telegram"></i></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                </div>
                <hr className="footer-break"/>

                <p className="copyright">© 2024 XayrulloWeb. Demo of a <span style={{color: 'red'}}>FilmZone</span>.
                    Some Rights Reserved</p>

            </footer>

        </>
    );
}

export default Footer;
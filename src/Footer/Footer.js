import React from 'react';

function Footer(props) {
    return (
        <>
            <footer className="footer">
                <div className="social">
                    <a href="#"><i className="fa-brands fa-facebook"></i></a>
                    <a href="#" ><i className="fa-brands fa-youtube"></i></a>
                    <a href="#" ><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="#" ><i className="fa-brands fa-telegram"></i></a>
                    <a href="#" ><i className="fa-brands fa-instagram"></i></a>
                </div>
                <hr className="footer-break"/>

                <p className="copyright">© 2024 XayrulloWeb. Demo of a <span style={{color: 'red'}}>FilmZone</span>.
                    Some Rights Reserved</p>

            </footer>

        </>
    );
}

export default Footer;
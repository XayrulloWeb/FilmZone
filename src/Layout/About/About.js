import React from "react";
import { Typography, Avatar, Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "../../assets/Style/About.css";

const About = () => {
  const visitInstagram = () => {
    window.location = "/";
  };
  return (
      <div className="aboutSection">

          <div className='aboutSectionContainer'>
              <Typography component='h1'>About Us</Typography>

              <div>
                  <div>
                      <Avatar
                          style={{
                              width: '13vmax',
                              height: '13vmax',
                              margin: '2vmax 0'
                          }}
                          src='https://img.freepik.com/premium-photo/cute-cat-hacker-operating-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_839035-1626306.jpg'
                          alt='Founder'
                      />
                      <Typography variant='h4'>EwEb Developer</Typography>
                      <Typography variant='h6' component="h6">Founder & CEO of Order Planning</Typography>
                          <button className='instagram-submit' onClick={visitInstagram}>Visit Instagram</button>
                      <span>
                          This is a MERN stack Movies website made by{' '}
                          <a href='/' target='blank'>
                              @eweb
                          </a>
                          . I'm a <b>Full Stack Developer</b>.
                      </span>
                  </div>
                  <div className='aboutSectionContainer2'>
                      <Typography component='h2'>Our Brands</Typography>
                      <a
                          href='#'
                          target='blank'
                      >
                          <YouTubeIcon className='youtubeSvgIcon' />
                      </a>

                      <a
                          href='#'
                          target='blank'
                      >
                          <InstagramIcon className='instagramSvgIcon' />
                      </a>

                      <a
                          href='#'
                          target='blank'
                      >
                          <FacebookIcon className='facebookSvgIcon' />
                      </a>

                      <a
                          href='#'
                          target='blank'
                      >
                          <LinkedInIcon className='linkedinSvgIcon' />
                      </a>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default About;

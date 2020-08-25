const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Welcome(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const links = [
    {
      content: `Learn more using the [documentation on this site.](${docUrl(
        'detection_models.html',
      )})`,
      title: 'Browse Docs',
    },
    {
      content: 'Ask questions about the documentation and project <a href="https://join.slack.com/t/rentadronecl/shared_invite/zt-dvgh8er7-hsv4p_jf75dsgkyGE1dHuw">Join Slack</a>',
      title: 'Join the community',
    }
  ];

  const projects = [
    {
      content: 'Based in model detector YOLOv.3, this repository contains four detector model with their weights and the explanation of how to use these models.',
      title: 'Photovoltaic Fault Detector'
    },
    {
      content: 'Set of Machine Learning Algorithms developed with the aim of determining health states of different types of crops.',
      title: 'Precision Agriculture'
    },
    {
      content: 'API specification for deploy the detection models, this repository contains a performant, production-ready reference implementation.',
      title: 'Web-API'
    },
    {
      content: 'Production-ready reference implementation of an administration tool, which gives you easy access to the EXIF meta-data of an image, generate KMZ and more.',
      title: 'UI'
    }
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <h1>Rentadrone Developers</h1>
        <p>
            This is an initiative started by <a href="https://rentadrone.cl" target="_blank">Rentadrone.cl</a> to establish an inclusive community
            of AI researchers for the development and exchange of best practices for AI in thermographic imaging.
        </p>
        <p>
          A part of our workload is dedicated to open source and side projects.
          You can spot team members in user groups or as conference speakers as well.
        </p>
        <GridBlock contents={projects} layout="fourColumn" />
        <GridBlock contents={links} layout="twoColumn" />
      </Container>
    </div>
  );
}

module.exports = Welcome;
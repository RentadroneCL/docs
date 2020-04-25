const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Welcome(props) {
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <h1>Photovoltaic Fault Detector </h1>
        <p>
            This is an initiative started by <a href="https://rentadrone.cl">Rentadrone.cl</a> to establish an inclusive community
            of AI researchers for the development and exchange of best practices for AI in thermographic imaging.
        </p>
        <p>
          A part of our workload is dedicated to open source and side projects.
          You can spot team members in user groups or as conference speakers as well.
        </p>
      </Container>
    </div>
  );
}

module.exports = Welcome;
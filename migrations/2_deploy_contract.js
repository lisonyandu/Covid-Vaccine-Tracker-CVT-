var cvtArtifact = artifacts.require("cvt");

module.exports = function (deployer) {
  deployer.deploy(cvtArtifact);
};

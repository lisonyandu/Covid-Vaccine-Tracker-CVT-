var covidVaccineRegisterArtifact = artifacts.require("covidVaccineRegister");

module.exports = function (deployer) {
  deployer.deploy(covidVaccineRegisterArtifact);
};

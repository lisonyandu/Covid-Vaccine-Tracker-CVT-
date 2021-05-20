pragma solidity ^0.5.0;

contract covidVaccineRegister {

  // define the struct Day1User
  struct VaccinationRecord {
    string name;
    string surname;
    string  vaccinationdate;
    string vaccinationname;
    string vaccinationplace;
    address added_by;
  }
  // define the array of users
  VaccinationRecord[] public vaccinationRecords;

  function createVaccinationRecord(
   string calldata _name,
   string calldata _surname, 
   string calldata _vaccinationdate, 
   string calldata _vaccinationname, 
   string calldata _vaccinationplace) external returns(uint){
    // get an instance of vaccination records using the input variables and push into the array of vaccination_records, returns the id
    uint id = vaccinationRecords.push(VaccinationRecord(_name, _surname, _vaccinationdate, _vaccinationname, _vaccinationplace, msg.sender)) - 1;
    
    // return the vaccination id
    return id;
  }
  function getNumberOfVaccinations() public returns(uint) {
    // return the length of the vaccinationRecords array
    return vaccinationRecords.length;
  }

}
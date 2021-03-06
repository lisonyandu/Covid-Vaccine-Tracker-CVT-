pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

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
   string calldata _vaccinationplace) external  returns(uint){
    // get an instance of vaccination records using the input variables and push into the array of vaccination_records, returns the id
   uint id = vaccinationRecords.push(VaccinationRecord(_name, _surname, _vaccinationdate, _vaccinationname, _vaccinationplace, msg.sender)) - 1;
    
    // return the vaccination id
    return id;
  }

  function getNumberOfVaccinations() external view returns(uint) {
    // return the length of the vaccinationRecords array
    return vaccinationRecords.length;
  }
   function getVaccinationRecord(uint index) external view returns(VaccinationRecord memory) {
    // return a vaccination record from an array
    
    uint len = vaccinationRecords.length;
     if(index>0 && index<len)
     {
         return vaccinationRecords[index];
     }
     revert("An invalid index is passed to the function!");
  }



}
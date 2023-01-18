# Swachh-Bharat
A web app built using Spring-Boot &amp; ReactJS, that provides the functionality of adding the garbage dump location through a web-interface. After that driver guys will get the notification alert based on the location, to pickup the garbage and help in keeping the city clean. Each successfull pickup, provides E-coin to both user &amp; driver.

## Status :-
In **Development**.

## Technology Used :-
  - Spring Boot
  - ReactJS with Redux
  - MySQL

## Features :-
  - Provides role-based authorization. There are two types of user here: Normal User (who will update the garbage dump location) & Driver User (who will pickup/clean the dump).
  - After each successfull pickup, both Normal User & Driver User will get E-coins.
  - A responsive Dashboard to see the added location details & coins earned.
  - User also have the option of uploading the image of location.
  - There is an option to track the location, it will open the Google Maps and shows the route to the garbage point.
  - User can edit or delete the added location as per requirement.
  - Whenever user added a garbage dump location, a notification will be sent to the Driver Users of that same city, where that added garbage dump belongs.
  - Wrote unit-tests for backend services using Junit5 + Mockito + MockMvc.
  
  
  ## Output :-
  
- Login Page<br>
  <img src="https://user-images.githubusercontent.com/56812557/212472178-13d396df-85c2-4d69-a58f-5e17a1496121.png" alt="Login Page" width="100%" height="100%" >

- Registration Page<br>
  <img src="https://user-images.githubusercontent.com/56812557/212472192-a57d0f35-f7ff-4b35-8e58-1eedeb745b56.png" alt="Registration Page" width="100%" height="100%" >
  
- User Dashboard Page<br>
  <img src="https://user-images.githubusercontent.com/56812557/213194665-b32e3f8c-6f6b-4e11-a787-389be9de41b5.png" alt="User Dashboard Page" width="100%" height="100%" >
  
- User Profile Page<br>
  <img src="https://user-images.githubusercontent.com/56812557/212472970-8636c0e1-c96e-4070-bcdb-754259266e6c.png" alt="User Profile Page" width="100%" height="100%" >
  
- User Add Location Page<br>
  <img src="https://user-images.githubusercontent.com/56812557/212472327-a12b34eb-684c-4a96-90a4-5a4087644bec.png" alt="User Add Location Page" width="100%" height="100%" >
  
- User Location Details Modal/Popup (Appears after clicking on any location shown in Dashboard)<br>
  <img src="https://user-images.githubusercontent.com/56812557/213194905-102b6567-8e5d-4281-9f69-9f6a7b933c49.png" alt="User Location Details Modal" width="100%" height="100%" >
  
- User Edit Location Page<br>
  <img src="https://user-images.githubusercontent.com/56812557/213195071-d409e176-3b5d-4e74-9b63-a867d34bfe13.png" alt="User Edit Location Page" width="100%" height="100%" >
  
- User Delete Location Popup<br>
  <img src="https://user-images.githubusercontent.com/56812557/213195391-eb5c7404-235e-4c2e-a2b8-8014d9ee17af.png" alt="User Delete Location Popup" width="100%" height="100%" >
  
- Driver Dashboard Page<br>
  <img src="https://user-images.githubusercontent.com/56812557/213195919-e84f539e-cd13-4534-a44d-b1a847505abb.png" alt="Driver Dashboard Page" width="100%" height="100%" >
  
- Driver Profile Page<br>
  <img src="https://user-images.githubusercontent.com/56812557/213193500-29718cfd-f05b-4fb4-aed7-9fb8a3adde06.png" alt="Driver Profile Page" width="100%" height="100%" >
  
- Driver Popup/Modal<br>
  <img src="https://user-images.githubusercontent.com/56812557/213193515-db8473d2-4d2d-4e0f-9414-e06c7390dd6e.png" alt="Driver Popup/Modal" width="100%" height="100%" >
  
  
## Dev :- Prakash Gupta

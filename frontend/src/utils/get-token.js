// get-token.js
const getToken = () => {
    return localStorage.getItem('authToken'); // or however you're storing the token
  };
  
  export default getToken;
  
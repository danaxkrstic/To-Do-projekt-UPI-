// signup.test.js

const { JSDOM } = require('jsdom');
const { attemptSignUp, isValidEmail, displayError, sendSignUpRequest, handleSignUpResponse } = require('./sign_up');


// treba xhr2 paket za simulirat XMLHttpRequest
const XMLHttpRequest = require('xhr2');
global.XMLHttpRequest = XMLHttpRequest;

// napravimo bazni DOM za testirat ga - naš OG
const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="sign_up.css">
    <script defer src="sign_up.js"></script>
    <title> Sign In </title>
</head>
<body>
    <div class="container">

        <h1>Sign-In</h1>

        <form name="prijava" onsubmit="attemptSignUp(event)">

            <div class="input">

                <label for="username">Username</b></label>
                <input type="text" id="username" name="username" required>

                <label for="email">E-mail</label>
                <input type="text" id="email" name="email" required>

                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>

            </div>

            <input type="submit" name="submit_signup" value="Sign Up">
      
        </form>
        <div id="error"></div>

    </div>

</body>
</html>

`);

//namistimo document
global.document = dom.window.document;

// Mocking isValidEmail
jest.mock('./sign_up', () => ({
  ...jest.requireActual('./sign_up'), //oznaka da inaće ne koristimo mock za ovu funkciju
  isValidEmail: jest.fn(),
}));

// simuliramo storage i window jer se koriste u funkcijama
global.localStorage = {
  setItem: jest.fn(),
};
global.window = {
  location: { href: '' },
  alert: jest.fn(),
};

describe('attemptSignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.getElementById('error').innerHTML = '';
  });

  it('Correct input pass', async () => {
    isValidEmail.mockReturnValue(true);

    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        id: 'your-form-id',
        elements: {
          email: { value: 'test@example.com' },
          password: { value: 'yourpassword' },
          username: { value: 'yourusername' },
        },
      },
    };

    // mock za XMLHttpRequest
    const mockXHR = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      onreadystatechange: jest.fn(),
      readyState: 4,
      status: 200,
      responseText: 'success',
    };

    global.XMLHttpRequest = jest.fn(() => mockXHR);

    attemptSignUp(mockEvent); 

    // čekamo da se XMLHttpReques izvrši
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  

  it('Successful error message', () => {
    displayError('Test error message');
    expect(document.getElementById('error').innerHTML).toBe('Test error message');
  });

  it('should send signup request', () => {
    const email = 'test@example.com';
    const password = 'yourpassword';
    const username = 'yourusername';

    // Set up a mock for XMLHttpRequest
    const mockXHR = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      onreadystatechange: jest.fn(),
      readyState: 4,
      status: 200,
      responseText: 'success',
    };

    global.XMLHttpRequest = jest.fn(() => mockXHR);

    sendSignUpRequest(email, password, username);

    expect(mockXHR.open).toHaveBeenCalledWith('POST', 'sign_up.php', true);
  });

  it('handle SignUpResponse', () => {
    const email = 'test@example.com';
    const status = 200;
    const responseText = 'success';

    handleSignUpResponse(status, responseText, email);

    // Provjerava jesu li pozvani localStorage.setItem i window.location.href
    expect(localStorage.setItem).toHaveBeenCalledWith('email', email);
    expect(window.location.href).toBe('to_do.html');

    // da nema alerta
    expect(window.alert).not.toHaveBeenCalled();

  });
});

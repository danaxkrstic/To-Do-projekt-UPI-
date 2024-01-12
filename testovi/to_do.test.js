const { JSDOM } = require('jsdom');
const { extractNumberFromString , Obrada_UserTasks} = require('../to_do');

jest.mock('../to_do', () => ({
    ...jest.requireActual('../to_do'),
    GetUser: jest.fn(),
    // ... mock other functions if needed
}));

// napravimo bazni DOM za testirat ga - naš OG
const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="to_do.css">
    <script defer src="to_do.js"></script>
    <title> To Do </title>
</head>

<body>
    <div class="container">

        

            <header class="header">
            <form method="post">
                <h2 id="h2_hello">Hello </h2>
            </form>
                <button onclick="LogOut()" name="log_out">LOG OUT</button>
            </header>

        

            <div class="task_list">

                
                <div id="task">
                   
                </div>
                
                <div id="task_input">
                    <input type="text" id="description_input" name="description_input">
                    <input type="date" id="date_input" name="date_input">
                    <button type="submit" name="add_task" onclick="AddTask()">Add</button>
                </div>

            </div>

            <div class = "search_div">

                <input type="text" id="search_input" name="search_input">
                <button name="search_task" onclick="SearchTasks()">Search</button>
                <button type="submit" name="refresh" onclick="Refresh()">Refresh all tasks</button>

            </div>

            <footer class="footer">
                <button name="change_pass" onclick="ChangePassword()">Change Password?</button>
                <input type="text" id="new_pass" name="new_pass">
                <div id="error-pass"></div>
            </footer>

        

    </div>

</body>

</html>


`);

//namistimo document
global.document = dom.window.document;

document.getElementById = jest.fn();


describe('Obrada_UserTasks', () => {
    it('should update the innerHTML of the specified element', () => {
        // Mock the necessary elements and values
        const mockedElement = {
            innerHTML: '',
        };
        document.getElementById.mockReturnValueOnce(mockedElement);

        // Call the function
        Obrada_UserTasks('Hello, user');

        // Check if the innerHTML is updated as expected
        expect(mockedElement.innerHTML).toBe('Hello, user!');
    });
});

describe('extractNumberFromString', () => {
    it('should extract a number from a string', () => {

        const inputString = 'abc123xyz';

        const result = extractNumberFromString(inputString);

        expect(result).toBe(123);
    });

    it('should return null if no numbers are found', () => {

        const inputString = 'noNumbersHere';

        const result = extractNumberFromString(inputString);

        // Je li null
        expect(result).toBeNull();
    });

});
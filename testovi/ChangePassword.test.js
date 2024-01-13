const { JSDOM } = require('jsdom');
const { ChangePassword }  = require('../todo_js/to_do');

const XMLHttpRequest = require('xhr2');
global.XMLHttpRequest = XMLHttpRequest;

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

global.document = dom.window.document;

describe('ChangePassword', () => {

    it('should change the password and update the error message', async () => {
        // Mock user input
        document.getElementById('new_pass').value = 'newPassword';
    
        // mock for XMLHttpRequest
        const mockXHR = {
            open: jest.fn(),
            setRequestHeader: jest.fn(),
            send: jest.fn(),
            onreadystatechange: jest.fn(),
            readyState: 4,
            status: 200,
            responseText: 'Password changed.',
        };
    
        global.XMLHttpRequest = jest.fn(() => mockXHR);
    
        ChangePassword();

        await new Promise((resolve) => setTimeout(resolve, 0));
    
        // verificirajmo da pozvani
        expect(mockXHR.open).toHaveBeenCalledWith('POST', './php/change_password.php', true);
        expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-type', 'application/x-www-form-urlencoded');
    
        // za test prolaska
        const expectedSendParameter = `email=${encodeURIComponent('')}&passw=${encodeURIComponent('newPassword')}`;
    
        // verificirajmo da povuklo prave
        expect(mockXHR.send).toHaveBeenCalledWith(expectedSendParameter);
    
        // simulacija onreadystatechange event
        mockXHR.onreadystatechange();
    
        // verifikacija update-a errora
        const errorMessage = document.getElementById('error-pass');
        expect(errorMessage.innerHTML).toBe('Password changed.');
    });
    
    

    it('should handle an empty password input', async () => {
        
        // Mock user input
        document.getElementById('new_pass').value = '';
    
        // Spy on XMLHttpRequest methods
        const openSpy = jest.spyOn(XMLHttpRequest.prototype, 'open');
        const setRequestHeaderSpy = jest.spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
        const sendSpy = jest.spyOn(XMLHttpRequest.prototype, 'send');
    
        ChangePassword();
    
        // cekamo da se izvrsi
        await new Promise((resolve) => setTimeout(resolve, 0));
    
        // verificiramo da nismo pozvali XML...
        expect(openSpy).not.toHaveBeenCalled();
        expect(setRequestHeaderSpy).not.toHaveBeenCalled();
        expect(sendSpy).not.toHaveBeenCalled();
    });
});

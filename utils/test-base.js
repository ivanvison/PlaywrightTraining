const base = require('@playwright/test');

exports.customTest = base.test.extend({
    
    testDataForLogin : {
        userType : "Invalid User",
        userName : "test@fusioninvoice.com",
        password : "demopass"
    }

})
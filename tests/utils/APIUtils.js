class APIUtils {
    
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZiZWVkYWUyNmI3ZTFhMTBlOTViNTMiLCJ1c2VyRW1haWwiOiJpdmFudmlzb25Ab3V0bG9vay5jb20iLCJ1c2VyTW9iaWxlIjo4MDk1ODAxMTExLCJ1c2VyUm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjUxNzk2NjgyLCJleHAiOjE2ODMzNTQyODJ9.cmpSCSK7FXbQN373F0-gITzXCEJD6e4PsiOvs8jIMB8"
        //userId: "626beedae26b7e1a10e95b53"
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:this.loginPayLoad})
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers:{
                'Authorization' : response.token,
                'Content-Type'  : 'application/json'
            },
        })
    
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderID = orderResponseJson.orders[0];
        response.orderID = orderID;
        return response;
        console.log(orderID);
    }

}

module.exports = {APIUtils};
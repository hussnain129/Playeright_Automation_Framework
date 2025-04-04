class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        )
        const loginResponseBody = await loginResponse.json();
        const token = loginResponseBody.token;
        console.log("Token: ", token);
        console.log("Login Response Body: ", loginResponseBody);
        return token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    "Authorization": response.token,
                    "Content-Type": "application/json"
                }
            }
        )
        const orderResponseBody = await orderResponse.json();
        console.log("Order Response Body: ", orderResponseBody);
        const orderID = orderResponseBody.orders[0];
        response.orderID = orderID;
        console.log("Order ID: ", orderID);
        return response;
    }

}
module.exports = APIUtils;
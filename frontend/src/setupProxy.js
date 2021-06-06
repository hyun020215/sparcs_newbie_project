const createProxyMiddleware = require("http-proxy-middleware");

// Frontend�� ���� API ��û�� Backend�� �����մϴ� (proxy)
// ���� ��� http://localhost:3000/api/list �� ���� ��û��
// http://localhost:8080/list �� ���޵˴ϴ�.

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            },
        })
    );
};
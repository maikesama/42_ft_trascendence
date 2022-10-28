"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [,
            `http://${process.env.HOST}:3333`,
            `http://${process.env.HOST}:3000`,
            'http://10.11.9.3:3000',
            'http://10.11.9.3',
            `http://${process.env.HOST}`],
        credentials: true
    });
    const microservice = app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        port: 3333,
    });
    app.use(cookieParser());
    await app.startAllMicroservices().then(() => console.log('Microservice is listening'));
    await app.listen(3333);
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: { credentials: true, origin: [`http://${process.env.HOST}:3333`,
                `http://${process.env.HOST}:3000`,
                `http://${process.env.HOST}`] } });
    app.use(cookieParser());
    await app.listen(3333);
}
bootstrap();
//# sourceMappingURL=main.js.map
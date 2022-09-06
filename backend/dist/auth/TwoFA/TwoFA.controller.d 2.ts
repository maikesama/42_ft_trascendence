import { TwoFactorAuthenticationService } from './TwoFA.service';
import { Response } from 'express';
import RequestWithUser from '../requestWithUser.interface';
export declare class TwoFactorAuthenticationController {
    private readonly twofaservice;
    constructor(twofaservice: TwoFactorAuthenticationService);
    register(response: Response, request: RequestWithUser): Promise<any>;
}

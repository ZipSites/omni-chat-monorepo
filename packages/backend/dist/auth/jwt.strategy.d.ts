import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
export interface JwtPayload {
    email: string;
    sub: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: JwtPayload): Promise<any>;
}
export {};

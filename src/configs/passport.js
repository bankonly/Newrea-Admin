import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { secretOrKey } from "./setup";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

export default passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            return done(null, jwt_payload);
        })
    );
};
import passport from 'passport';
import { Strategy } from 'passport-github2';
import config from 'config';
import { getUserWithGitHubId, loginUser } from '../users/crud';
import { VerifyCallback } from 'passport-oauth2';

passport.serializeUser((user: Express.User, done): void => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done): void => {
    done(null, user);
});

passport.use(
    new Strategy(
        { ...config.get('github') },
        async (_: string, __: string, profile: { id: number }, done: VerifyCallback) => {
            try {
                const githubId = +profile.id;
                let userId = (await getUserWithGitHubId(githubId))?.github_id;
                if (!userId) userId = await loginUser({ github_id: githubId });
                if (!userId) return done(null, undefined);
                return done(null, { id: userId });
            } catch (err) {
                done(err as Error);
            }
        }
    )
);

export default passport;

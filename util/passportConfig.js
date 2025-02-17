const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const passportConfig = async (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const admin = await prisma.admin.findUnique({ where: { username } });

        if (!admin) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        //hashing and salting
        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
          // passwords do not match!
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        return done(null, admin);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id },
      });

      done(null, admin);
    } catch (err) {
      done(err);
    }
  });
};

module.exports = { passportConfig };

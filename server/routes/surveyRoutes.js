const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");
const Survey = mongoose.model("surveys");

module.exports = app => {
    app.post("/api/surveys/webhooks", (req, res) => {
        const p = new Path("/api/surveys/:surveyId/:choice");
        const events = _.chain(req.body)
            .map(event => {
                const pathname = new URL(event.url).pathname;

                const match = p.test(pathname);
                if (match) {
                    return {
                        email: event.email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    };
                }
            })
            .compact()
            .uniqBy("email", "surveyId")
            .value();

        console.log(events);
        res.send({});
    });

    app.post("/api/surveys", requireLogin, async (req, res) => {
        console.log("Error");
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            //recipients: recipients.split(',').map(email => { return { email: email }})
            // recipients: recipients.split(",").map(email => {
            //     return { email: email };
            // }),
            recipients: recipients
                .split(",")
                .map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        console.log(
            recipients.split(",").map(email => {
                return { email: email };
            })
        );
        console.log(survey);

        //Great place to send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (error) {
            res.status(422).send(error);
        }
    });
};

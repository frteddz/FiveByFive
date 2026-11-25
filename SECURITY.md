# Security policy

FiveByFive is a fork of [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo). Report issues that affect this fork here.

## Reporting a vulnerability

Use GitHub's private vulnerability reporting on [github.com/frteddz/FiveByFive](https://github.com/frteddz/FiveByFive) if it is enabled. Otherwise contact the maintainer privately through their GitHub profile and say that you are reporting a security issue. Please do not open a public issue with exploit details.

Include enough to reproduce the problem:

- What the vulnerability is
- Steps or a proof of concept
- What an attacker could do with it
- Any logs or screenshots that help

## What to expect

The maintainer will look at the report and follow up with a timeline if it is confirmed. If it is not treated as a vulnerability, you should get an explanation. Give a fix time to ship before disclosing the details publicly.

## Ground rules

Do not run tests that could take the site down, degrade service for other users, or access data that is not yours. Stick to your own accounts and deployments.

## Scope

The training flow runs mostly in the browser. Saved progress lives in localStorage, and there is no sign-in step in the training screens. Server routes inherited from upstream exist under `app/api/`, and some depend on external services. If you find a problem in one of those, include the route in your report.

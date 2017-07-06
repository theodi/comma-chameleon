# Contributing to Comma Chameleon

Open Data Certificates is open source, and contributions are gratefully accepted!
Details on how to contribute are below. By participating in this project, you agree to abide by our [Code of Conduct](https://github.com/theodi/comma-chameleon/blob/master/.github/CODE_OF_CONDUCT.md).

Before you start coding, please reach out to us either on our [gitter channel](https://gitter.im/theodi/toolbox) or by tagging a repository administrator on the issue ticket you are interested in contributing towards to indicate your interest in helping.

If this is your first time contributing to the ODI’s codebase you will need to [create a fork of this repository](https://help.github.com/articles/fork-a-repo/).

Consult our [Getting Started Guide](https://github.com/theodi/toolbox/wiki/Developers-Guide:-Getting-Started) (if necessary) and then follow the [readme instructions](https://github.com/theodi/comma-chameleon/blob/master/README.md#development) to get your Development environment running locally

Ensure that the [tests](https://github.com/theodi/comma-chameleon/blob/master/README.md#tests) pass before working on your contribution

## Code Review Process

All contributions to the codebase - whether fork or pull request - will be reviewed per the below criteria.
To increase your chances of your push being accepted please be aware of the following
- Write [well formed commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- Follow our [style guide recommendations](https://github.com/theodi/toolbox/blob/README.md#code-style-guide)
- Write tests for all changes (additions or refactors of existing code).
- Of the github integrations we use two will be utilised to check appraise your contribution. In order of priority these are
    - Travis ensures that all tests (existing and additions) pass
    - Travis/Coveralls ensures that overall test coverage for lines of code meets a certain threshold. If this metric dips below what it previously was for the repository you’re pushing to then your PR will be rejected
    - Gemnasium ensures dependencies are up to date
- Once your PR is published and passes the above checks a repository administrator will review your contribution. Where appropriate comments may be provided and amendments suggested before your PR is merged into Master.
- Once your PR is accepted you will be granted push access to the repository you have contributed to! Congratulations on joining our community, you’ll no longer need to work from forks.

If you make a contribution to another repository in the Toolbox you will be expected to repeat this process. Read more about that [here](https://github.com/theodi/toolbox/blob/master/README.md#push-access).

## Code Style Guide

We follow the same code style conventions as detailed in Github’s [Ruby Style Guide](https://github.com/github/rubocop-github/blob/master/STYLEGUIDE.md)

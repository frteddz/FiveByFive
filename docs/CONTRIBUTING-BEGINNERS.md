# First contribution, step by step

This is for someone who has never contributed to a GitHub project. No prior knowledge assumed. If you have used Git before, [CONTRIBUTING.md](../CONTRIBUTING.md) is the shorter read.

FiveByFive lives at [github.com/frteddz/FiveByFive](https://github.com/frteddz/FiveByFive). It is a fork of [lingdojo/kana-dojo](https://github.com/lingdojo/kana-dojo).

## What Git and GitHub are

Git keeps versions of a folder on your computer. GitHub is a website that hosts copies of Git folders so people can work together. A **fork** is your own copy of someone else's project on GitHub. A **clone** is that copy downloaded to your machine. A **pull request** is a request for your changes to be merged into the original.

## 1. Get the tools

- Install Node.js 24 LTS from [nodejs.org](https://nodejs.org/). npm comes with it.
- Install Git from [git-scm.com](https://git-scm.com/).
- A text editor helps. VS Code is fine.
- Make a GitHub account at [github.com](https://github.com/) if you do not have one.

Check the install in a terminal:

```bash
node --version
npm --version
git --version
```

## 2. Fork the repo

Open [github.com/frteddz/FiveByFive](https://github.com/frteddz/FiveByFive) while signed in. Click Fork near the top right. You now have `github.com/<your-username>/FiveByFive`.

## 3. Clone your fork

```bash
git clone https://github.com/<your-username>/FiveByFive.git
cd FiveByFive
npm install
npm run dev
```

Open http://localhost:3000. You should see the app. Leave the dev server running if you like.

On Windows, if `npm install` complains about scripts, run the terminal as Administrator once, or check with whoever manages your machine. Do not skip dependency installs to get around it.

## 4. Make a small change

Pick something tiny for the first one. Good options:

- Fix a typo in a doc file
- Add an accepted spelling to the alphabet data
- Improve one unclear line of UI copy in a locale file

Open the file in your editor, change one thing, and save.

If you want to see the change in the browser, the dev server updates on save. Content edits may need a refresh.

## 5. Check your work

```bash
npm run check
npm run test
```

If both pass, you are in good shape. If they fail on something you did not touch, ask before changing unrelated code.

## 6. Save the change in Git

Git changes are saved in two steps. `add` picks files. `commit` records them with a message.

```bash
git status
git add README.md
git commit -m "docs: fix a typo in the setup section"
```

Replace `README.md` with the file you changed. The message format `type: what you did` is the convention here. Common types are `docs`, `fix`, `feat` and `test`.

## 7. Push and open a pull request

```bash
git push
```

The first push on a new branch may ask you to set upstream. Follow the command Git prints.

Now go to `github.com/<your-username>/FiveByFive`. GitHub will offer to open a pull request. Click it, write a short description of what changed and how you checked it, then submit.

That is the whole loop. Later changes skip the fork step and start at "make a small change".

## If something goes wrong

- `git status` tells you what Git thinks changed
- `git diff` shows the actual edits
- Read the error before pasting commands. Most messages say what is missing
- [docs/TROUBLESHOOTING.md](./TROUBLESHOOTING.md) covers setup problems
- Open an issue at [github.com/frteddz/FiveByFive](https://github.com/frteddz/FiveByFive/issues) if you get stuck

# GitHub Account, `gh` CLI, and Claude Desktop Setup Guide

This guide reflects the official GitHub, Microsoft, and Claude docs available on March 18, 2026.

Use this guide if you want a simple, repeatable setup for new users on macOS or Windows.

If you already have a working GitHub account and GitHub credentials on your machine, skip to the `gh` installation section for your OS.

---

## 1. Create a GitHub Account

Skip this section if you already have a GitHub account and can sign in successfully.

1. Open `https://github.com/`.
2. Click **Sign up**.
3. Follow the prompts to create a personal GitHub account.
4. Verify your email address when GitHub asks.
5. Turn on two-factor authentication after signup.
6. Optionally add a passkey after 2FA is enabled.

Notes:

- GitHub Free is sufficient for this workflow.
- Use a work email if the repositories will belong to a company or client.
- If your company uses GitHub Enterprise Cloud or SSO, complete any required org login steps before continuing.

---

## 2. Install the Required Tools

For the workflow in this guide, users need:

1. `git`
2. GitHub CLI (`gh`)
3. Claude Desktop

### macOS dependencies

Recommended path:

1. Homebrew
2. GitHub CLI via Homebrew
3. Claude Desktop

Practical note:

- Most Macs already have `git`, or will prompt you to install Apple Command Line Tools the first time you run `git`.
- Homebrew itself requires Apple Command Line Tools or Xcode.

### Windows dependencies

Recommended path:

1. WinGet
2. Git for Windows
3. GitHub CLI via WinGet
4. Claude Desktop

Practical note:

- WinGet ships as part of Microsoft App Installer on supported Windows versions.
- For `gh`, prefer PowerShell or Windows Terminal over Git Bash.

---

## 3. Install `gh` on macOS

### 3A. Install Homebrew if needed

Check whether Homebrew is already installed:

```bash
brew --version
```

If that command fails, install Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If the installer tells you to install Apple Command Line Tools first, do that and then rerun the Homebrew install.

### 3B. Install GitHub CLI

```bash
brew install gh
```

### 3C. Verify the install

```bash
gh --version
git --version
```

If `git --version` fails or opens an Apple install prompt, complete that install first.

---

## 4. Install `gh` on Windows

### 4A. Check whether WinGet is available

Open **PowerShell** or **Windows Terminal** and run:

```powershell
winget --version
```

If `winget` is missing, update or install **App Installer** from Microsoft. On supported Windows 10 and Windows 11 systems, WinGet is provided through App Installer.

### 4B. Install Git for Windows

```powershell
winget install --id Git.Git
```

### 4C. Install GitHub CLI

```powershell
winget install --id GitHub.cli
```

### 4D. Verify the install

```powershell
gh --version
git --version
```

Important Windows note:

- GitHub documents known prompt/input issues when `gh` is run inside MinTTY, which is the terminal Git Bash uses by default.
- Prefer **PowerShell** or **Windows Terminal** for `gh auth login`.
- If someone insists on Git Bash, a fallback is:

```bash
winpty gh auth login
```

---

## 5. Authenticate `gh` the Recommended Way

Do this on both macOS and Windows after `gh` is installed.

Run:

```bash
gh auth login
```

Choose these options:

1. **GitHub.com**
2. **HTTPS**
3. **Yes** when asked whether to authenticate Git with your GitHub credentials
4. **Login with a web browser**

Then run:

```bash
gh auth setup-git
gh auth status
```

Why this is the recommended setup:

- GitHub recommends GitHub CLI or Git Credential Manager for HTTPS credential caching.
- `gh auth login` uses a browser-based flow by default.
- GitHub CLI stores credentials in the system credential store when possible.
- `gh auth setup-git` configures `git` to use GitHub CLI as a credential helper.

Avoid this for normal user setup:

- Manually creating a long-lived PAT
- Saving a PAT in a plaintext file
- Telling users to paste PATs into random config files

If your organization ever needs headless automation, that is a separate case. For interactive end users, browser-based `gh auth login` is the cleaner path.

---

## 6. Install Claude Desktop

### macOS

Requirements:

- macOS 11 or later

Steps:

1. Go to `https://claude.ai/download`.
2. Download the macOS build.
3. Install it.
4. Open Claude from Applications.
5. Sign in with the user’s Claude account.

### Windows

Requirements:

- Windows 10 or later

Steps:

1. Go to `https://claude.ai/download`.
2. Download the Windows build.
3. Install it.
4. Open Claude from the Start menu.
5. Sign in with the user’s Claude account.

---

## 7. Important Clarification About Claude Desktop and `gh`

This is the part that usually causes confusion.

Claude Desktop does support GitHub-related workflows, but Anthropic’s current docs do **not** document a dedicated Claude Desktop setting that says “use this local `gh` binary” or “read this PAT from disk.”

As of March 18, 2026, the documented GitHub paths in Claude Desktop are:

1. **GitHub integration**
2. **Cowork**, which brings Claude Code’s agentic capabilities into Claude Desktop

So the accurate setup guidance is:

- Use `gh` for the user’s local Git and GitHub command-line workflow.
- Use Claude Desktop’s **GitHub integration** when you want Claude chat or projects to pull repository context from GitHub.
- Use **Cowork** when you want Claude Desktop’s code-enabled task mode.

Do not document this as “Claude Desktop is pointed at a PAT file on disk,” because that is not the official model Anthropic documents.

---

## 8. Configure Claude Desktop for GitHub Access

If the goal is for Claude Desktop to read repository content from GitHub inside chat or projects, use the built-in GitHub integration.

### Option A: Enable GitHub from chat

1. Open Claude Desktop.
2. In a chat, click the **+** button in the lower-left corner.
3. Choose **Add from GitHub**.
4. Follow the GitHub authentication flow.
5. Select the repository, then the files or folders you want Claude to use.

### Option B: Enable GitHub from settings

1. Open Claude Desktop.
2. Go to **Settings > Connectors**.
3. Find **GitHub**.
4. Click **Connect**.
5. Follow the GitHub authentication flow.

Notes:

- This is a GitHub OAuth / GitHub App style connection inside Claude, not a pointer to the local `gh` credential store.
- Users still authenticate individually, even on Team and Enterprise plans.

---

## 9. Configure Claude Desktop for Code-Enabled Work

Anthropic currently describes the code-enabled visual mode in Claude Desktop as **Cowork**.

### Cowork availability

- Available on paid plans: Pro, Max, Team, Enterprise
- Available on macOS
- Available on Windows x64 only
- Windows arm64 is not supported
- Claude Desktop must stay open while Cowork is running

### Start Cowork

1. Open Claude Desktop.
2. Use the mode selector to switch from **Chat** to **Cowork**.
3. Describe the task.
4. Review Claude’s plan.
5. Let it run.

Important note:

- Anthropic documents Cowork as running in an isolated VM on the user’s computer.
- Because of that, do not assume that installing `gh` on the host automatically creates a documented Claude Desktop `gh` integration.
- If you specifically need Claude to run local `git` and `gh` commands in your own shell environment, the documented product for that is still **Claude Code in the terminal**, not Claude Desktop chat.

---

## 10. Recommended Team Standard

If you want one standard setup to give everyone:

1. Create a normal GitHub user account if needed.
2. Install `git`.
3. Install `gh`.
4. Authenticate with `gh auth login`.
5. Run `gh auth setup-git`.
6. Verify with `gh auth status`.
7. Install Claude Desktop.
8. Enable the GitHub integration in Claude Desktop for repo context.
9. Use Cowork for code-enabled desktop tasks.

That gives you:

- Secure GitHub auth using the browser flow
- No plaintext PAT files
- A working local Git and GitHub CLI setup
- A working Claude Desktop GitHub integration
- A documented path for Claude Desktop’s code-enabled mode

---

## 11. Quick Verification Checklist

Have the user confirm all of these:

```bash
gh --version
git --version
gh auth status
```

And inside Claude Desktop:

1. Claude Desktop opens and the user is signed in
2. The GitHub integration can connect successfully
3. The correct repository is visible to Claude
4. If on a paid plan, Cowork mode is available

---

## Sources

- GitHub account setup: https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account
- GitHub credential caching recommendation: https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git
- GitHub CLI install options: https://github.com/cli/cli
- `gh auth login`: https://cli.github.com/manual/gh_auth_login
- `gh auth setup-git`: https://cli.github.com/manual/gh_auth_setup-git
- `gh auth status`: https://cli.github.com/manual/gh_auth_status
- GitHub CLI MinTTY note for Windows: https://cli.github.com/manual/gh_help_mintty
- Homebrew install: https://brew.sh/
- Homebrew macOS requirements: https://docs.brew.sh/Installation
- WinGet / App Installer: https://learn.microsoft.com/en-us/windows/package-manager/winget/
- Claude Desktop install: https://support.claude.com/en/articles/10065433-installing-claude-desktop
- Cowork in Claude Desktop: https://support.claude.com/en/articles/13345190-get-started-with-cowork
- Claude GitHub integration: https://support.claude.com/en/articles/10167454-using-the-github-integration
- Claude integrations setup: https://support.claude.com/en/articles/10168395-setting-up-claude-integrations

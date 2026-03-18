# GitHub Account, Git, and Claude Desktop Setup Guide

This guide reflects the official Git, GitHub, and Claude docs available on March 18, 2026.

Use this when onboarding someone on macOS or Windows who needs:

1. a GitHub account
2. Git installed locally
3. Claude Desktop connected to GitHub

If the user already has a GitHub account and can sign in successfully, skip the GitHub account section.

Important clarification:

- Git is useful if the user will work with repositories on their own computer.
- Git is **not** required just to connect GitHub to Claude Desktop through the built-in GitHub connector.
- GitHub CLI (`gh`) is not required for this setup.

---

## 1. Create a GitHub Account

Skip this section if the user already has a GitHub account and working credentials.

1. Open `https://github.com/`.
2. Click **Sign up**.
3. Follow the prompts to create a personal GitHub account.
4. Verify the email address when GitHub asks.
5. Turn on two-factor authentication after signup.
6. Optionally add a passkey after 2FA is enabled.

Notes:

- GitHub Free is sufficient for this workflow.
- Use a work email if the repositories belong to a company or client.
- If the company uses GitHub Enterprise Cloud or SSO, complete any required organization login steps before continuing.

---

## 2. Install Git on macOS

If the user does not already have Git installed, the simplest official path is to install Apple’s Xcode Command Line Tools, which include Git.

### Recommended install method

1. Open **Terminal**.
2. Run:

```bash
xcode-select --install
```

3. When macOS prompts for installation, approve it.
4. Wait for the install to finish.
5. Verify Git:

```bash
git --version
```

Practical notes:

- This does not require Homebrew.
- If macOS says the tools are already installed, just run `git --version` to confirm Git is available.
- Users may be asked for an administrator password during installation.

### Alternative for teams that already use Homebrew

If your team already standardizes on Homebrew, Git’s official install page also lists:

```bash
brew install git
```

---

## 3. Install Git on Windows

If the user does not already have Git installed, the simplest supported option is Git for Windows.

### Recommended install method

1. Open `https://git-scm.com/download/win`.
2. Download the latest maintained Windows installer.
3. Run the installer.
4. Accept the default options unless your team has a different standard.
5. After installation, open **PowerShell** or **Windows Terminal**.
6. Verify Git:

```powershell
git --version
```

### Optional WinGet install

If the machine already has WinGet available, Git for Windows also documents this install command:

```powershell
winget install --id Git.Git -e --source winget
```

Practical notes:

- WinGet is part of Microsoft App Installer on supported versions of Windows.
- If you use the standard installer from `git-scm.com`, WinGet is not required.
- PowerShell or Windows Terminal is the cleanest place to verify Git after installation.

---

## 4. Install Claude Desktop

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

## 5. Connect GitHub in Claude Desktop

Claude Desktop has a built-in GitHub connector. This is the supported path for giving Claude Desktop access to repository context from GitHub.

### Connect GitHub from Settings

1. Open Claude Desktop.
2. Go to **Settings > Connectors**.
3. Find **GitHub**.
4. Click **Connect**.
5. Follow the GitHub authentication flow.

Important notes:

- This is Claude Desktop’s own GitHub integration flow.
- It does not require the local `gh` CLI.
- It does not require storing a PAT in a file on disk.

### Add GitHub content from chat

Once GitHub is connected:

1. Open a chat in Claude Desktop.
2. Click the **+** button in the lower-left corner.
3. Choose **Add from GitHub**.
4. Select the repository.
5. Select the files or folders you want Claude to use as context.

---

## 6. Advanced Manual Fallback: Local GitHub MCP Server

If the built-in GitHub connector is unavailable, blocked by policy, or not behaving the way you need, there is a second path: configure a local GitHub MCP server in Claude Desktop.

This is the kind of setup described in community walkthroughs like:

- https://lobehub.com/mcp/rohithdasm-github-mcp-claude-integration

Use this only as an **advanced fallback**, not as the default onboarding path.

### Why this is a fallback instead of the default

- It adds extra dependencies.
- It requires editing Claude Desktop’s MCP config manually.
- It requires a GitHub personal access token.
- The MCP server can expose write actions such as creating or updating files, pull requests, issues, and repositories.

### Extra dependencies for this fallback

In addition to Git and Claude Desktop, the user will need:

1. Node.js
2. npm / `npx`
3. A GitHub personal access token

The official MCP docs note that many local MCP servers require Node.js and use `npx` to run.

### High-level setup

1. Install Node.js LTS from `https://nodejs.org/`.
2. Verify:

```bash
node --version
npx --version
```

3. In Claude Desktop, open **Settings > Developer**.
4. Click **Edit Config**.
5. Add a GitHub MCP server entry to `claude_desktop_config.json`.
6. Restart Claude Desktop fully.

### Example MCP config

This is the official example pattern shown in the MCP servers documentation for GitHub:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

Claude Desktop MCP config file locations:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Security notes for this fallback

- Treat the token like a password.
- Prefer the minimum permissions needed.
- Set an expiration date.
- Do not make this the default option for non-technical users.

GitHub recommends fine-grained personal access tokens and minimum permissions where possible. Inference: if the exact GitHub operations you need are not supported by a fine-grained token, or your organization has a specific requirement, you may need to adjust token type and permissions accordingly.

### Recommended wording in the guide

If you want this reflected directly in the onboarding doc, the safest framing is:

`If Claude Desktop’s built-in GitHub connector is unavailable, advanced users can alternatively configure the official GitHub MCP server manually in Claude Desktop. This requires Node.js, editing claude_desktop_config.json, and supplying a GitHub personal access token, so it should be treated as a backup path rather than the default setup.`

---

## 7. Team and Enterprise Note

For Team and Enterprise plans:

1. An organization Owner or Primary Owner may need to enable GitHub first.
2. That is done in **Admin settings > Connectors**.
3. After that, each user still authenticates individually with GitHub.

Additional notes from Anthropic’s docs:

- Integrations are only available in private projects.
- Chats with synced content cannot be shared.

---

## 8. Claude Desktop Code-Enabled Mode

If you mean the code-enabled desktop experience rather than the terminal CLI, Anthropic currently documents that experience as **Cowork** inside Claude Desktop.

### Start Cowork

1. Open Claude Desktop.
2. Switch from **Chat** to **Cowork** using the mode selector.
3. Describe the coding task.
4. Review Claude’s plan.
5. Let it run.

Important notes:

- Claude Desktop must stay open while Cowork is running.
- GitHub access for Claude Desktop can come from the built-in GitHub connector, or from a manually configured GitHub MCP server if you use the fallback above. `gh` is not required for either path.
- Installing local Git is still useful for developers, but it is separate from Claude Desktop connector auth.

---

## 9. Recommended Onboarding Standard

If you want one simple standard setup for most users:

1. Create a GitHub account if needed.
2. Install Git locally.
3. Verify `git --version`.
4. Install Claude Desktop.
5. Sign in to Claude Desktop.
6. Open **Settings > Connectors**.
7. Connect **GitHub**.
8. In chat, verify **Add from GitHub** works.
9. If the connector is unavailable, use the manual GitHub MCP setup only as a fallback.
10. If needed, use **Cowork** for the code-enabled desktop mode.

This avoids:

- unnecessary GitHub CLI setup
- unnecessary PAT handling
- plaintext credential storage
- confusion between local developer tooling and Claude Desktop connectors

---

## 10. Quick Verification Checklist

If the user needs local Git:

```bash
git --version
```

Inside Claude Desktop, confirm:

1. Claude Desktop opens and the user is signed in.
2. **Settings > Connectors > GitHub** shows a successful connection.
3. **Add from GitHub** works inside chat.
4. The correct repository is visible to Claude.
5. If the user is using code-enabled desktop mode, **Cowork** is available.

---

## Sources

- GitHub account setup: https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account
- Git setup basics: https://docs.github.com/en/get-started/git-basics/set-up-git
- Git install for macOS: https://git-scm.com/install/mac.html
- Git install for Windows: https://git-scm.com/install/windows
- Claude Desktop install: https://support.claude.com/en/articles/10065433-installing-claude-desktop
- Claude integrations setup: https://support.claude.com/en/articles/10168395-setting-up-claude-integrations
- Claude GitHub integration: https://support.claude.com/en/articles/10167454-using-the-github-integration
- MCP local server setup for Claude Desktop: https://modelcontextprotocol.io/docs/develop/connect-local-servers
- Official MCP server GitHub config example: https://github.com/modelcontextprotocol/servers
- GitHub token guidance: https://docs.github.com/github-ae@latest/rest/authentication/keeping-your-api-credentials-secure
- Cowork in Claude Desktop: https://support.claude.com/en/articles/13345190-get-started-with-cowork

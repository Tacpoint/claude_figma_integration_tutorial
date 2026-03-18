# Figma MCP + Claude Desktop (Claude Code) — Setup & Tutorial

A practical guide for designers on connecting the Claude Desktop app to Figma via the Model Context Protocol (MCP), so you can push live React views into Figma and pull Figma designs back into code.

---

## What You'll Need

- [Claude Desktop](https://claude.ai/download) app with **Claude Code enabled**
- [Figma Desktop](https://www.figma.com/downloads/) app
- Node.js 20+ and npm
- Your React app running locally (this guide uses the `agent-slide` Vite app)

---

## 1. Enable Claude Code in the Desktop App

1. Open **Claude Desktop**
2. Go to **Settings → Developer**
3. Toggle on **Claude Code**

This unlocks Claude's ability to read your file system, run terminal commands, and connect to MCP servers — all from within the desktop app.

---

## 2. Add the Figma MCP Server

You can add the Figma MCP server directly inside Claude Desktop — no config file editing needed:

1. Go to **Settings → Integrations** (or **Settings → MCP Servers**)
2. Click **Add MCP Server**
3. Fill in the fields:
   - **Name:** `figma`
   - **Transport:** `HTTP`
   - **URL:** `https://mcp.figma.com/mcp`
4. Click **Save** and restart Claude Desktop when prompted

> **Prefer the terminal?** You can also add it via Claude Code's built-in CLI by running this in any chat:
> ```
> claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
> ```

### Windows fallback — edit the config file manually

If the Settings UI isn't available in your version of Claude Desktop, you can add the MCP server by editing the config file directly.

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```
(Paste that path into File Explorer's address bar and hit Enter)

In both cases, add the following — creating the file if it doesn't exist:

```json
{
  "mcpServers": {
    "figma": {
      "transport": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

Save the file and restart Claude Desktop.

---

## 3. Authenticate with Figma

1. Open Claude Desktop and start a new conversation
2. Type `/mcp` to list connected servers — you should see `figma` listed
3. Claude will prompt you with a browser link to authenticate your Figma account
4. Complete the OAuth flow in your browser — you only need to do this once

To verify everything is working, try this prompt:

```
List all available Figma MCP tools
```

You should see tools like `get_file`, `get_node`, `post_comment`, `create_frame`, etc.

---

## 4. Install the React App

The `agent-slide` app is a Vite + React single-page app styled to match the Agent slide from the brown bag deck.

```bash
cd claude_design_brownbag/agent-slide
npm install
npm run dev
```

The app will start at **http://localhost:5173** by default.

### File structure

```
agent-slide/
├── src/
│   ├── App.jsx       ← Main component (the Agent slide)
│   ├── App.css       ← All styles
│   └── index.css     ← Global reset
├── index.html
└── package.json
```

---

## 5. Get Your Figma File URL

In the **Figma Desktop** app:

- To point Claude at a **specific page**: right-click the page tab at the bottom of the canvas and select **Copy link to page**
- To point Claude at a **specific frame**: right-click the frame on the canvas and select **Copy link**

The URL will look like:
```
https://www.figma.com/design/FILEID/filename?node-id=0-1&m=dev
```

Keep this handy — you'll paste it into your Claude prompts.

---

## 6. Push Your React App → Figma

With your Vite dev server running (`npm run dev`), open Claude Desktop and use a prompt like this:

```
My app is running locally on http://localhost:5173/

Look at the Agent slide view. Capture a screenshot and send it to this Figma file:
https://www.figma.com/design/YOUR_FILE_ID/your-file-name?node-id=0-1&m=dev
```

Claude will:
1. Take a screenshot of your running app
2. Connect to Figma via the MCP
3. Create a new frame in your Figma file with the captured view

> **Tip:** Be specific about what view or component you want captured. If your app has multiple states (e.g. a card expanded vs collapsed), describe the state — e.g. "with the Reason card expanded".

---

## 7. Pull a Figma Design → React

To go the other direction — translating a Figma frame into React code — use a prompt like:

```
Look at the frame called "Agent Card – Hover State" in this Figma file:
https://www.figma.com/design/YOUR_FILE_ID/your-file-name?node-id=0-1&m=dev

Translate it into a React component using the same CSS variable conventions
already used in App.css. Match the spacing, colors, and typography exactly.
```

Claude will read the Figma node's design properties via the MCP and write a matching React component directly into your project.

> **Tip:** The more context you give Claude about your existing code conventions (CSS variables, component patterns, file structure), the better the generated code will match your codebase.

---

## Useful Prompt Patterns

| Goal | Prompt pattern |
|------|---------------|
| Screenshot current view → Figma | "My app is on http://localhost:5173. Capture the [view name] and send to [figma url]" |
| Figma frame → React component | "Read the frame [name] from [figma url] and write a matching React component" |
| Sync design tokens | "Extract all colors and spacing values from [figma url] and update my CSS variables in App.css" |
| Annotate a Figma frame | "Add a comment to the frame [name] in [figma url] noting that the card hover state needs review" |

---

## Troubleshooting

**`/mcp` shows no Figma server**
Go back to Settings → Integrations, confirm the server is saved, and restart Claude Desktop.

**Authentication link expired**
Type `/mcp` again in Claude Desktop — it will generate a fresh browser link.

**Claude can't reach localhost**
Make sure your dev server is actually running (`npm run dev`) and the port in your prompt matches what Vite is using.

**Figma URL returns an error**
Use **Copy link** from Figma Desktop rather than copying from a browser tab — the format can differ and break the MCP lookup.

---

## Quick Reference

```bash
# Start React app
cd agent-slide && npm run dev
```

```
# Inside Claude Desktop
/mcp                                  ← list connected servers
List all available Figma MCP tools    ← verify Figma is working
```


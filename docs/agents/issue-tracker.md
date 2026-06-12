# Issue tracker: Linear

Issues, PRDs, and triage for this repo live in **Linear**, accessed through the **Linear MCP server**.

> **Setup required:** the Linear MCP server must be connected to the session for these workflows to run. If the Linear MCP tools aren't available, stop and tell the user to connect the Linear integration (e.g. via `claude mcp add` or the Linear app's MCP integration) before proceeding — do not silently fall back to another tracker.

## Conventions

- **Team / project:** team `FREE` (freelance), project `toupin-towing` (<https://linear.app/bif/project/toupin-towing-f5b254a4607e>). File all issues for this repo into this team/project unless told otherwise.
- **Issues** are Linear issues. The issue identifier (e.g. `FREE-123`) is the canonical reference.
- **PRDs** are written as a Linear issue (or document) in the project; implementation issues link back to it as sub-issues or via the parent relationship.
- **Triage state** is expressed with Linear labels matching the role strings in `triage-labels.md`. If you prefer Linear workflow states over labels, update `triage-labels.md` to record that mapping.

## When a skill says "publish to the issue tracker"

Use the Linear MCP server to create a new issue (or sub-issue) in the configured team/project. Set the title, description (markdown body), and any applicable triage label. Return the resulting Linear issue identifier and URL.

## When a skill says "fetch the relevant ticket"

Use the Linear MCP server to read the issue by its identifier (e.g. `FREE-123`) or URL. The user will normally pass the identifier or URL directly. Read the description and comments for full context.

## When a skill says "apply a triage label" / "move issue state"

Use the Linear MCP server to add the label string from `triage-labels.md` (or transition the workflow state, if you've mapped roles to states there).

## When a skill says "comment on the issue"

Use the Linear MCP server to add a comment to the issue rather than editing the description.

# rush-archive-plugin

A Rush plugin for maintaining an archive log of deleted packages for future discovery.

## Usage

After installing the plugin, run `rush archive` for further instructions.

## Motivation

In a single-repo world, you can archive repos by marking them as archived in GitHub.  In a monorepo, you really just want to delete the code and let people look at the git history.  However, you don't want to lose all organizational knowledge of what was deleted -- people need to know *where* to look in the git history.  This cli helps maintain a structured log of archived packages (who archived it, when they archived it, why the archived it, and where the code used to live), and produces a parallel consumable output in Markdown format.  See [here](../../../common/archive/ARCHIVE.md) for an example of what the output looks like.

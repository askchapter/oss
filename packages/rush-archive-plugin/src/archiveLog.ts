import { FileSystem, JsonFile } from "@rushstack/node-core-library";
import { RushConfiguration } from "@rushstack/rush-sdk";
import * as path from "path";

export interface ArchiveLogEntry {
    packageName: string;
    relativePath: string;
    finalVersion: string;
    user: string;
    commitHash: string;
    timestamp: string;
    comments: string;
}

export function loadArchiveLog(rushConfiguration: RushConfiguration): ArchiveLogEntry[] {
    const archiveLogFile = path.join(rushConfiguration.commonFolder, "archive", "ARCHIVE.json");
    if (!FileSystem.exists(archiveLogFile)) {
        return [];
    }
    return JsonFile.load(archiveLogFile);
}

export function saveArchiveLog(rushConfiguration: RushConfiguration, archiveLog: ArchiveLogEntry[]): void {
    const repoUrl = rushConfiguration.repositoryUrls[0];
    const markdownHeader = ["# Archive", "This file should not be manually modified."];
    const markdownEntries = archiveLog.flatMap((entry) => {
        const entryMarkdown = [
            `## ${entry.packageName}`,
            `Archived: ${entry.timestamp} - ${entry.user}\\`,
            `Final version: ${entry.finalVersion}\\`,
            `[Explore](${repoUrl}/tree/${entry.commitHash}/${entry.relativePath})`,
        ];
        const withComments =
            entry.comments !== "" ? [...entryMarkdown, "### Comments", entry.comments] : entryMarkdown;
        return withComments;
    });
    const markdown = [...markdownHeader, ...markdownEntries].join("\n");

    const archiveFolder = path.join(rushConfiguration.commonFolder, "archive");
    const archiveLogFile = path.join(archiveFolder, "ARCHIVE.json");
    const archiveLogMarkdownFile = path.join(archiveFolder, "ARCHIVE.md");
    FileSystem.ensureFolder(archiveFolder);
    JsonFile.save(archiveLog, archiveLogFile);
    FileSystem.writeFile(archiveLogMarkdownFile, markdown);
}

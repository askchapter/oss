import { ArchiveLogEntry, loadArchiveLog, saveArchiveLog } from "./archiveLog";
import * as git from "./git";
import { getRepoRoot } from "@rushstack/package-deps-hash";
import { RushConfiguration } from "@rushstack/rush-sdk";
import * as path from "path";

export interface ArchiveOpts {
    packageName: string;
    comments: string;
}

export function archive({ packageName, comments }: ArchiveOpts): void {
    const rushConfiguration = RushConfiguration.loadFromDefaultLocation();
    const project = rushConfiguration.getProjectByName(packageName);
    if (project === undefined) {
        throw new Error(`Could not find Rush project with package name ${packageName}`);
    }
    if (project.consumingProjects.size > 0) {
        throw new Error(
            `${packageName} cannot be archived because it is depended on by ${
                project.consumingProjects.size
            } projects:\n${Array.from(project.consumingProjects.keys())
                .map((project) => project.packageName)
                .join("\n")}`
        );
    }

    // Prepare archive log entry
    const repoRoot = getRepoRoot(rushConfiguration.rushJsonFolder);
    const archiveLogEntry: ArchiveLogEntry = {
        packageName,
        relativePath: path.relative(repoRoot, project.projectFolder),
        finalVersion: project.packageJsonEditor.version,
        user: git.getUsername(),
        commitHash: git.getCurrentCommitHash(),
        timestamp: new Date().toUTCString(),
        comments,
    };

    // Append an entry to the archive log
    const archiveLog = loadArchiveLog(rushConfiguration);
    saveArchiveLog(rushConfiguration, [archiveLogEntry, ...archiveLog]);

    console.log(
        `🗄️  Added archive entry for ${packageName}.  You should proceed to delete its code, remove it from \`rush.json\`, and remove any other references to it.  Then commit your changes and submit a PR.`
    );
}

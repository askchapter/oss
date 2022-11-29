import { Executable } from "@rushstack/node-core-library";

export function getUsername(): string {
    const result = Executable.spawnSync("git", ["config", "user.name"], {
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.status !== 0) {
        throw new Error(
            'Failed getting git username, make sure to configure it (`git config --global user.name "FIRST_NAME LAST_NAME"`)'
        );
    }
    return result.stdout.trim();
}

export function getCurrentCommitHash(): string {
    // https://stackoverflow.com/questions/949314/how-to-retrieve-the-hash-for-the-current-commit-in-git
    const result = Executable.spawnSync("git", ["rev-parse", "HEAD"], {
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.status !== 0) {
        throw new Error("Failed getting current git commit hash");
    }
    return result.stdout.trim();
}

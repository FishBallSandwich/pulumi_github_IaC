import * as pulumi from "@pulumi/pulumi";
import * as github from "@pulumi/github";

const repoName = "Pulumi_created_repo";
const repoDescription = "testing IaC + CICD with pulum";

const repo = new github.Repository(repoName, {
    name: repoName,
    description: repoDescription,
    visibility: "public",
});

const fileName = "README.md"
const readmeContent = `# ${repoName}
This repository was generated by Pulumi to test out Pulumi for IaC + github Actions CICD
`;

const readme = new github.RepositoryFile("README", {
    repository: repo.name,
    file: fileName,
    content: readmeContent,
});

const branchProtection = new github.BranchProtection("mainBranchProtection",{
    repositoryId: repo.nodeId,
    pattern:"main",
    enforceAdmins: false,
    allowsDeletions: true,
    requiredPullRequestReviews: [{
        requireCodeOwnerReviews: true,
        requiredApprovingReviewCount: 1
    }],
    forcePushBypassers: [
    "FishBallSandwich"
    ]
});


export const repositoryName = repo.name;
export const repositoryUrl = repo.htmlUrl;
/* eslint-disable github/no-then */
import * as core from '@actions/core';
import * as github from '@actions/github';
import {ActionInputs} from './enums';

const octokit = github.getOctokit(core.getInput(ActionInputs.GITHUB_TOKEN));
const repo = github.context.repo;

export async function run(): Promise<void> {
  try {
    const branches = await octokit.repos
      .listBranches({...repo})
      .then(response => response.data);
    const base = branches.find(
      (b) /** branch */ => b.name === core.getInput(ActionInputs.BRANCH_BASE)
    );
    const compare = branches.find(
      (b) /** branch */ => b.name === core.getInput(ActionInputs.BRANCH_COMPARE)
    );

    if (base == null) {
      return core.setFailed(
        `Base branch "${base}" do not exist on repository ${repo.owner}/${repo.repo}`
      );
    }
    if (compare == null) {
      return core.setFailed(
        `Compare branch "${compare}" do not exist on repository ${repo.owner}/${repo.repo}`
      );
    }
    return core.exportVariable(
      'COMPARE_RESULT_SAME',
      base.commit === compare.commit
    );
  } catch (err) {
    return core.setFailed(`Compare failed! ${err.message}`);
  }
}

if (process.env.NODE_ENV !== 'test') {
  run();
}

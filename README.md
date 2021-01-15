# compare-branch

A simple Github Action that compare a branch with another

## The example speaks better than the finest speeches

```yml
name: 'Example'
on:
  workflow_dispatch:

jobs:
  compare:
    runs-on: ubuntu-latest
    steps:
      - name: 'Compare'
        uses: imsamdez/actions.compare-branch@1.0.3
        with:
          base: master
          compare: prod
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Use result

This action creates a Github Action environment variable `COMPARE_RESULT_SAME` that you can use with others action steps (see example bellow)

```yml
name: 'Example'
on:
  workflow_dispatch:

jobs:
  compare:
    runs-on: ubuntu-latest
    steps:
      - name: 'Compare'
        uses: imsamdez/actions.compare-branch@1.0.3
        with:
          base: master
          compare: prod
          github_token: ${{ secrets.GITHUB_TOKEN }}
      # Make use of the result with COMPARE_RESULT_SAME env variable
      - name: 'Result'
        run: echo Result is $COMPARE_RESULT_SAME
      - name: 'Foo (executed if branches are at same commit)'
        run: echo Branches are at same commit!!!
        if: env.COMPARE_RESULT_SAME == 'true'
      - name: 'Bar (executed if branches are at diff commit)'
        run: echo Branches are not at same commit.
        if: env.COMPARE_RESULT_SAME == 'false'
```

#!/bin/bash
set -e
rm -rf merge-demo && mkdir merge-demo && cd merge-demo
git init -b main
echo "Hello World" > file.txt
git add . && git commit -m "Initial commit"

git checkout -b branch-a
echo "Change from A" > file.txt
git commit -am "Edit in branch-a"

git checkout main
git checkout -b branch-b
echo "Change from B" > file.txt
git commit -am "Edit in branch-b"

git checkout main
git merge branch-a
git merge branch-b || true      # CONFLICT here
cat file.txt                    # shows conflict markers
# resolve manually, then:
echo "Resolved: A and B combined" > file.txt
git add file.txt
git commit -m "Resolve merge conflict"
git log --graph --oneline --all

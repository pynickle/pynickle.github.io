---
author: "ENC_Euphony"
title: "Key Programming Standards and Conventions"
date: "2025-09-16"
description: "This article explores essential programming standards, such as Semantic Versioning and AngularJS conventions, to help developers write consistent, maintainable code. Learn best practices to enhance collaboration and software quality."
categories: ["programming"]
weight: 2
---
# Key Programming Standards and Conventions

## Introduction
Modern software development relies on standardized practices to ensure consistency, maintainability, and collaboration. This article explores key programming conventions, such as Semantic Versioning and frameworks like AngularJS, to help developers adopt best practices.

## [Semantic Versioning](https://semver.org/)
Semantic Versioning (SemVer) is a versioning scheme that uses a three-part number (e.g., `1.2.3`) to convey meaning about changes in software:
- **Major (1)**: Breaking changes. *(Incompatible API changes)*
- **Minor (2)**: New features, backward-compatible. *(Functionality Addition in a backward compatible manner)*
- **Patch (3)**: Bug fixes, backward-compatible.

Adopting SemVer ensures clear communication of a project's evolution. You can visit their website to learn about other more detailed rules.

## [AngularJS's Commit Message Convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)
AngularJS, a popular JavaScript framework, has gained widespread recognition and adoption for its git commit message conventions.

Each submitted message consists of a header, body, and footer. The header uses a special format containing the type, scope, and subject:

```
<Type>(<Scope>): <Subject>
<Empty line>
<Body>
<Empty line>
<Footer>
```

A **title** is _required_, while the **scope** of the title is _optional_.

### Revert Commits

Begin with revert:, followed by the header of the reverted commit.
Include in the body: This reverts commit <hash>, where <hash> is the SHA of the commit being reverted.

For example:
```
revert: feat($location): add support for HTML5 mode

This reverts commit 9c1a1e3.
```

### Commit Types

* **feat**: Introduces a new feature.
* **fix**: Addresses a bug.
* **docs**: Updates documentation only.
* **style**: Formats code without changing its behavior (e.g., white-space, missing semicolons).
* **refactor**: Modifies code without adding features or fixing bugs.
* **perf**: Enhances performance.
* **test**: Adds or corrects tests.
* **chore**: Updates build processes or auxiliary tools (e.g., documentation generation).

### Scope

Specifies the part of the codebase affected (e.g., `$location`, `$browser`, `ngClick`, `ngView`).
Use `*` when changes impact multiple scopes.

Of course, you can flexibly apply the above rules. You may leave the scope field blank when affecting multiple code files, or create your own types. 

After all, the **fundamental purpose** of using this convention is to _maintain the readability of commit messages_.

## [Keep a ChangeLog](https://keepachangelog.com/)

Keep a ChangeLog is a specification for writing changelog. A well-written changelog should enable users and contributors to clearly see what noteworthy updates exist between two versions.

The most important part of this specification is grouping similar changes together. Below are some grouping categories:

* **Added**: Newly added features.
* **Changed**: Modifications to existing features.
* **Deprecated**: Features no longer recommended for use and scheduled for removal.
* **Removed**: Features that have been removed.
* **Fixed**: Bug fixes.
* **Security**: Security enhancements.

Also remember one very basic thing: _**changelogs are written for people, not machines**_.

You can visit their website for more detailed information on the _changelog format_.

## Conclusion
Following established programming standards like **Semantic Versioning** and **AngularJS's Git Commit Message Convention** improves code quality and team collaboration. Start integrating these practices to build robust, maintainable software.
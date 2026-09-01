<!--VITE PLUS START-->

# 使用 Vite+：面向 Web 的统一工具链

本项目使用 Vite+，这是一套构建在 Vite、Rolldown、Vitest、tsdown、Oxlint、Oxfmt 和 Vite Task 之上的统一工具链。Vite+ 将运行时管理、包管理和前端工具整合到一个名为 `vp` 的全局 CLI 中。Vite+ 与 Vite 不同，它通过 `vp dev` 和 `vp build` 来调用 Vite。运行 `vp help` 可查看命令列表，运行 `vp <command> --help` 可查看特定命令的说明。

文档位于本地 `node_modules/vite-plus/docs`，或在线访问 https://viteplus.dev/guide/。

## 内置命令 vs 脚本

`vp <name>` 运行内置命令。`vp run <name>` 运行 `package.json` 中的脚本或 `vite.config.ts` 中的任务。脚本无法覆盖内置命令，因此 `vp dev` 与 `vp run dev` 可能行为不同。请先检查 `package.json` 和 `vite.config.ts`；当项目定义了同名脚本或任务时，使用 `vp run <name>`。

## 工具版本

运行 `vp toolchain` 可查看当前 Vite+ 发行版中的版本与依赖关系。
追加工具名称可筛选图谱的一部分，例如运行
`vp toolchain vite`。使用 `--global` 可忽略本地的 `vite-plus` 包。使用
`vp why <package>` 可查看包管理器的依赖图谱。

## 审查清单

- [ ] 拉取远程变更后、开始工作前，运行 `vp install`。
- [ ] 运行 `vp check` 和 `vp test`，对变更进行格式化、Lint、类型检查与测试。
- [ ] 检查是否有 `vite.config.ts` 任务或 `package.json` 脚本需要用于校验，通过 `vp run <script>` 运行。
- [ ] 若安装、运行时或包管理行为异常，运行 `vp env doctor`，并在求助时附上其输出。

<!--VITE PLUS END-->

<!-- ant-design START -->

这个版本可能包含破坏性变更，组件 API、约定、文件结构都可能与你训练数据中的内容不同。在编写任何代码之前，请先阅读 https://ant.design/docs/react/for-agents-cn.md 和 https://raw.githubusercontent.com/ant-design/ant-design-cli/main/skills/antd/SKILL.md，留意弃用提示，并按照说明使用 Ant Design。

如果你可以安装 skills，请运行：
npx skills add ant-design/ant-design-cli

<!-- ant-design END -->

<!-- GITFLOW START -->

# Git 工作流（GitFlow 轻量版）

面向本仓库（`survey-admin`）的分支、提交、合并与发布约定。Agent 与开发者均须遵守；**未经用户明确要求，不得 push、不得改远程保护分支、不得 force push。**

## 分支模型

| 分支              | 作用                                | 可否直接提交         |
| ----------------- | ----------------------------------- | -------------------- |
| `master`          | 生产就绪代码；始终可部署            | 否（仅通过 PR 合并） |
| `develop`（可选） | 集成下一版本；日常开发汇合点        | 否（仅通过 PR 合并） |
| `feature/*`       | 新功能 / 非紧急改动                 | 是                   |
| `fix/*`           | 非紧急缺陷修复                      | 是                   |
| `hotfix/*`        | 生产紧急修复，从 `master` 拉出      | 是                   |
| `release/*`       | 发版准备（版本号、changelog、收尾） | 是                   |

若仓库尚未启用 `develop`：**默认从 `master` 拉出 `feature/*` / `fix/*`，合并回 `master`。** 引入 `develop` 后，日常开发改从 `develop` 拉出并合回 `develop`；仅 `release/*` 与 `hotfix/*` 合入 `master`。

## 命名规范

- `feature/<简短英文或拼音>-<摘要>`，例：`feature/survey-list-filter`
- `fix/<issue号或摘要>`，例：`fix/login-redirect`
- `hotfix/<摘要>`，例：`hotfix/auth-token-expire`
- `release/v<major.minor.patch>`，例：`release/v1.2.0`
- 分支名使用小写、连字符；避免空格与中文路径名

## 日常开发流程

1. 开始前：`git fetch origin`，确认基于最新的 `master`（或 `develop`）。
2. 创建分支：`git checkout -b feature/<name> origin/master`（或 `origin/develop`）。
3. 拉取依赖并自检：`vp install`；改完后运行 `vp check` 与 `vp test`（见上文 Vite+ 审查清单）。
4. 小步提交；推送到个人远程分支：`git push -u origin HEAD`。
5. 开 PR → 目标分支为 `master`（或 `develop`）→ Code Review → 合并。
6. 合并后删除远程功能分支；本地可 `git branch -d`。

## 提交信息

- 使用简体中文，祈使/陈述均可，说明「为什么」优先于「改了什么文件」。
- 推荐前缀（可选）：`feat:` / `fix:` / `refactor:` / `chore:` / `docs:` / `test:`
- 示例：`feat: 问卷列表支持按状态筛选`
- 一次提交只做一件事；不要把无关格式化与业务改动混在同一 commit。
- **不要**在提交中包含密钥、`.env`、凭证文件。

## Pull Request

- 标题简洁，与分支目的一致。
- 正文至少包含：变更摘要、测试方式（本地 `vp check` / `vp test` / 手动路径）。
- 合并策略优先 **Squash merge**（保持 `master`/`develop` 历史清晰）；发布相关分支可用 merge commit。
- CI / 检查未通过不得合并。
- Agent 创建 PR 时使用 `gh pr create`；合并前须用户确认，除非用户明确授权「直接合并」。

## 发版（release）

1. 从 `develop`（或当前稳定 `master`）创建 `release/vX.Y.Z`。
2. 仅允许版本号、changelog、构建配置等发版相关改动；阻塞缺陷可在此分支修。
3. PR 合入 `master`；打 tag：`vX.Y.Z`。
4. 若存在 `develop`，将 `master` 回合并入 `develop`，避免分叉。

## 热修（hotfix）

1. 从 `master` 创建 `hotfix/<name>`。
2. 最小改动修复 → PR 合入 `master` → 打补丁 tag（如 `vX.Y.Z+1` 或 `vX.Y.(Z+1)`）。
3. 同步回合并入 `develop`（若已启用）。

## Agent 禁令与安全

- **禁止**：`--force` / `--force-with-lease` 推送到 `master`/`develop`；改 `git config`；跳过 hooks（`--no-verify`）；交互式 rebase（`-i`）。
- **禁止**：在未获用户明确指示时执行 `git commit`、`git push`、创建/合并 PR。
- **禁止**：amend 已推送的提交；仅当用户明确要求且满足安全条件时可 amend 本地未推送提交。
- 冲突解决：优先在功能分支解决；不要在 `master` 上直接改。
- 不确定目标分支或发版策略时，先问用户，不要猜测。

## 快速对照

| 场景          | 从哪拉                | 合到哪                       |
| ------------- | --------------------- | ---------------------------- |
| 新功能 / 重构 | `master` 或 `develop` | 同左                         |
| 普通 bug      | 同上                  | 同上                         |
| 生产紧急修复  | `master`              | `master`（再同步 `develop`） |
| 发版收尾      | `develop` 或 `master` | `master` + tag               |

<!-- GITFLOW END -->

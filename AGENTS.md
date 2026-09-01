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

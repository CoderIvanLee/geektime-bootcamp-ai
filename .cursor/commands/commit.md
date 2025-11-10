---
description: 提交代码更改
argument-hint: [message] [type]
allowed-tools: Bash(git:*)
---

# 提交代码更改

我将帮助你提交代码更改。让我先检查当前状态，然后执行提交。

## 步骤 1: 检查当前状态

### 当前分支
!`git branch --show-current`

### Git 状态
!`git status`

### 未暂存的更改
!`git diff --stat`

### 已暂存的更改
!`git diff --cached --stat`

## 步骤 2: 查看更改详情

### 未暂存的文件更改
!`git diff --name-status`

### 已暂存的文件更改
!`git diff --cached --name-status`

## 步骤 3: 暂存更改

如果没有已暂存的更改，我将暂存所有更改：

```bash
# 检查是否有已暂存的更改
if [ -z "$(git diff --cached --name-only)" ]; then
  echo "暂存所有更改..."
  git add .
fi
```

## 步骤 4: 生成提交信息

基于更改内容生成提交信息：

### 更改的文件类型
!`git diff --cached --name-only 2>/dev/null | sed 's/.*\.//' | sort | uniq -c | sort -rn || git diff --name-only | sed 's/.*\.//' | sort | uniq -c | sort -rn`

### 主要更改的文件
!`git diff --cached --stat 2>/dev/null | head -10 || git diff --stat | head -10`

**提交信息格式（Conventional Commits）：**

- `type`: $2（如果未提供，将根据更改自动推断）
  - `feat`: 新功能
  - `fix`: 修复 bug
  - `docs`: 文档更改
  - `style`: 代码格式（不影响代码运行）
  - `refactor`: 重构（既不是新功能也不是修复 bug）
  - `perf`: 性能优化
  - `test`: 测试相关
  - `chore`: 构建过程或辅助工具的变动
  - `ci`: CI 配置更改

- `message`: $1（如果未提供，将基于更改生成）

## 步骤 5: 执行提交

```bash
# 确保有已暂存的更改
if [ -z "$(git diff --cached --name-only)" ]; then
  echo "没有已暂存的更改，正在暂存所有更改..."
  git add .
fi

# 确定提交类型
if [ -n "$2" ]; then
  COMMIT_TYPE="$2"
else
  # 根据更改自动推断类型
  CHANGED_FILES=$(git diff --cached --name-only 2>/dev/null || git diff --name-only)
  if echo "$CHANGED_FILES" | grep -qE '\.(md|mdx|txt)$'; then
    COMMIT_TYPE="docs"
  elif echo "$CHANGED_FILES" | grep -qE '(test|spec)'; then
    COMMIT_TYPE="test"
  elif echo "$CHANGED_FILES" | grep -qE '\.(css|scss|less)$'; then
    COMMIT_TYPE="style"
  else
    COMMIT_TYPE="feat"
  fi
fi

# 确定提交信息
if [ -n "$1" ]; then
  COMMIT_MSG="$1"
else
  # 基于更改生成提交信息
  CHANGED_FILES=$(git diff --cached --name-only 2>/dev/null || git diff --name-only | head -3)
  COMMIT_MSG="更新: $(echo "$CHANGED_FILES" | head -1 | xargs basename)"
fi

# 执行提交
git commit -m "$COMMIT_TYPE: $COMMIT_MSG"
```

**使用方法：**

- `/commit` - 自动暂存所有更改并生成提交信息
- `/commit "添加新功能"` - 使用自定义提交信息（自动推断类型）
- `/commit "修复登录问题" fix` - 指定提交信息和类型
- `/commit "更新文档" docs` - 文档类型提交
- `/commit "重构用户服务" refactor` - 重构类型提交

**示例：**

- `/commit "添加用户认证功能" feat`
- `/commit "修复登录 bug" fix`
- `/commit "更新 API 文档" docs`
- `/commit "优化数据库查询" perf`

**注意：**
- 提交前会显示所有更改，请确认后再提交
- 建议使用 Conventional Commits 格式（type: message）
- 提交类型会自动推断，也可以手动指定
- 如果没有已暂存的更改，会自动暂存所有更改

# Clash Rule Manager — AGENTS.md

## 项目概述

本项目自动管理 Clash/Mihomo 规则集，通过 GitHub Actions 每周合并三个来源的规则，并支持个人自定义补丁。

```
blackmatrix7（基础层） → Accademia（补充层/同名覆盖） → custom/（个人层/前置注入）
```

## 目录结构

```
clash_rule/
├── rules/                     # [自动生成] 合并后的最终规则，由 GitHub Actions 产出
├── icons/                     # [手写] 策略组/节点通用图标资源（CDN 加速分发）
├── custom/                    # [手写] 个人自定义规则补丁（最高优先级）
│   ├── cAI/                   # AI 固定代理节点（日本），涵盖 AI 工具链调用域名
│   ├── cDirect/               # 杂项直连规则
│   ├── cProxy/                # 杂项代理规则
│   ├── cCloudflare/           # Cloudflare CDN 直连规则（纯域名，脱离上游跟踪）
│   ├── prevent_dns_leak/      # DNS 泄漏检测站点
│   ├── Bing/                  # Bing 搜索补丁
│   ├── Copilot/               # Copilot 补丁
│   ├── MicrosoftEdge/         # Edge 浏览器补丁
│   ├── Claude/                # Claude AI 补丁
│   ├── OpenAI/                # OpenAI 补丁
│   ├── Google/                # Google 服务补丁
│   ├── Facebook/              # Meta/Facebook 补丁
│   ├── cGrok/                 # xAI/Grok 补丁（脱离上游跟踪）
│   ├── Direct.yaml            # 强制直连模板
│   └── Proxy.yaml             # 强制代理模板
├── scripts/
│   └── merge_rules.py         # 规则合并脚本
├── overwrite/
│   └── clash.js               # ClashParty（Mihomo Party）覆写配置
├── .github/workflows/
│   └── sync.yml               # 周度自动合并 CI
└── README.md
```

## 规则分类——路由策略

`custom/` 中的自定义规则按**路由意图**分类，而非按产品/公司：

| 目录 | 路由策略 | 说明 |
|:---|:---|:---|
| `cAI/` | 🤖 AI_API（固定日本节点） | AI 服务及其工具链依赖（HuggingFace、Jina、Qwen 等） |
| `cDirect/` | 🏠 全局直连 | 不需要代理的系统/工具基础设施 |
| `cProxy/` | 🔀 节点选择 | 需要代理的杂项服务 |
| `cCloudflare/` | 🌩️ Cloudflare（直连） | Cloudflare 自有域名及常用 CDN 域名，纯域名规则（无 IP-CIDR），脱离上游跟踪 |
| `<Product>/` | 对应代理组 | 与上游 `rules/<Product>/` 同名的补丁，前置注入到对应规则集 |

> **重要**：`cAI` 的定义是「需要走固定 AI 节点（如日本）的服务」，不单纯指 AI 产品。即使不是 AI 产品本身（如 `deno.dev`），如果被 AI 工具链调用需要特定代理，也应放在 `cAI`。

## 常见操作

### 1. 添加新的自定义规则

在 `custom/` 下对应目录的 `.yaml` 文件中添加域名：

```yaml
payload:
  - DOMAIN-SUFFIX,example.com
  - DOMAIN-KEYWORD,example
  - PROCESS-NAME,Example.exe
```

- 若目录与上游 `rules/<Name>/` 同名 → 规则会**前置注入**到上游规则列表头部（优先匹配）
- 若目录在上游不存在（如 `cAI/`、`cDirect/`） → 完整拷贝到 `rules/`，成为独立规则集

### 2. 检查补丁是否与上游重复

```bash
# 用 gh 查看远端 rules 文件
gh api /repos/chmhlive/clash_rule/contents/rules/<Name>/<Name>.yaml --jq '.content' | base64 -d

# 本地检查特定域名是否在 rules 中存在（排除 custom marker 行）
grep -n "目标域名" /vhdx/prj/clash_rule/rules/<Name>/<Name>.yaml | grep -v "Custom Rules"
```

### 3. 清理重复/验证补丁价值

1. 列出 `custom/<Name>/` 中的每一条域名
2. 用 `grep` 在 `rules/<Name>/` 中逐一查找
3. 注意 DOMAIN-SUFFIX 的传递覆盖关系：
   - `DOMAIN-SUFFIX,microsoft.com` 覆盖所有 `*.microsoft.com` 子域
   - `DOMAIN-KEYWORD,microsoft` 覆盖所有含 `microsoft` 的域名
   - 如果上游已有这类宽泛规则，具体的子域补丁就是重复的

### 4. 提交并触发自动化构建

```bash
git add custom/ scripts/ overwrite/
git commit -m "feat/fix(custom): <描述>"
git push

# 手动触发 GitHub Actions 工作流
gh workflow run sync.yml --ref main

# 查看运行日志
gh run watch <run_id>
```

### 5. 验证远端生成结果

```bash
# 检查规则目录是否存在
gh api /repos/chmhlive/clash_rule/contents/rules/<Name>

# 查看合并后的 yaml 内容
gh api /repos/chmhlive/clash_rule/contents/rules/<Name>/<Name>.yaml --jq '.content' | base64 -d

# 验证只有一个 payload 块
gh api ... | base64 -d | grep -c "^payload:"
```

### 6. 添加新的规则集到 ClashParty 配置

在 `overwrite/clash.js` 中需要三处修改：

1. **ruleProviders** — 定义规则集来源（URL、格式、behavior）
2. **rules** — 指定 RULE-SET 的匹配顺序和代理组
3. **proxy-groups** — 定义代理组的名称、类型、节点列表

```javascript
// ① ruleProviders
"myrule": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/MyRule/MyRule.yaml",
    "path": "./ruleset/chmhlive/myrule.yaml"
},

// ② rules（排在高优先级位置）
"RULE-SET,myrule,我定义的代理组",

// ③ proxy-groups
{
    ...groupBaseOption,
    "name": "我定义的代理组",
    "type": "select",
    "proxies": ["AI_API", "节点选择", "延迟选优", ...],
    "include-all": true,
}
```

## 关键经验

### 规则冲突处理

当多个规则集覆盖同一域名时，Clash **从上到下匹配，命中即停止**。例如：

```
RULE-SET,Copilot,AI_API     ← 命中 copilot.microsoft.com → AI 节点
RULE-SET,MicrosoftAPPs,DIRECT  ← 不会到达（已被上面命中）
```

**策略**：将粒度更细的规则集（Bing/Copilot/Edge）排在通用规则集（MicrosoftAPPs）**前面**。

### merge_rules.py 的正确行为

- 同名文件：**提取 custom 的规则条目，注入到上游 payload 列表头部**（单一 `payload:` 块）
- 不同名文件：直接拷贝到 `rules/` 目录
- `Direct.yaml` / `Proxy.yaml` 等模板文件会直接覆盖上游同名文件

> ⚠️ 曾有一个严重 bug：旧版直接拼接两个文件的完整内容，导致文件中有两个 `payload:` 键，YAML 解析时第二个覆盖第一个，custom 规则全部失效。现在已修复为 payload 列表合并。

### ClashParty 覆写配置审查要点

审查 `overwrite/clash.js` 时需关注：

| 检查项 | 说明 |
|:---|:---|
| rule-provider URL | 确认指向正确的合并后文件（`.yaml` 而非 `_Domain.yaml`） |
| behavior | classical 对应 yaml 格式，domain 对应纯域名列表 |
| path | 每个 provider 的本地缓存路径必须唯一，不能碰撞 |
| rules 顺序 | 精确规则在前，宽泛规则在后 |
| proxy-groups 默认值 | SELECT 类型的 proxies 数组第一项为默认选中值 |
| 代理组一致性 | 同类别服务（AI 类）的默认代理应一致 |

### 工具调用速查

```bash
# GitHub 操作
gh run list --limit 3 --workflow sync.yml     # 查看最近的 workflow 运行
gh workflow run sync.yml --ref main            # 手动触发
gh run view <id> --json status,conclusion      # 查看运行状态
gh api /repos/chmhlive/clash_rule/contents/rules/<path>  # 查看远端文件

# jsDelivr CDN 缓存刷新 (Purge)
# 单文件秒级刷新（无需触发完整 CI，终端执行或浏览器直接访问）
curl -i "https://purge.jsdelivr.net/gh/chmhlive/clash_rule@main/overwrite/clash.js"
curl -i "https://purge.jsdelivr.net/gh/chmhlive/clash_rule@main/icons/<文件名>"
curl -i "https://purge.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/<Name>/<Name>.yaml"

# 本地验证
python3 -c "import py_compile; py_compile.compile('scripts/merge_rules.py', doraise=True)"  # 语法检查
grep -F "domain" rules/<Name>/<Name>.yaml | grep -v "Custom Rules"  # 查找域名
```

## 工作流规范

### 任务完成后必问

每次任务（规则变更、配置修改等）全部执行完毕后，必须主动询问用户：**"是否需要提交变更并触发 GitHub Actions 工作流？"**

不得自行提交或触发工作流，需等待用户明确确认。

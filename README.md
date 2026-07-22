# 🛡️ Clash Rule (个人精选与合并分流规则库)

本项目是一个自动化的 Clash / Stash 规则整合仓库，旨在将上游三大规则源进行优先级合并，输出最优化、低内存占用的 Clash 分流规则。

---

## 🏗️ 规则合并架构与优先级

生成的 `rules/` 目录中的规则按照以下 **优先级由高到低** 进行合并与覆盖：

1. **最高优先级 (Level 3)**: `custom/` 目录
   * 存放你个人自定义/修改的规则文件（优先追加或直接独立生成）。
2. **中等优先级 (Level 2)**: [`Accademia/Additional_Rule_For_Clash`](https://github.com/Accademia/Additional_Rule_For_Clash)
   * 提供精修与补充规则（如 AppleAI, Grok, Gemini 以及剔除冗余后的 China 规则）。若与底层同名，直接进行**文件级覆盖**。
3. **基础优先级 (Level 1)**: [`blackmatrix7/ios_rule_script`](https://github.com/blackmatrix7/ios_rule_script)
   * 提供海量通用的全量 Clash 规则基础层。

---

## ⏰ 更新频率说明

* **定时每周自动更新**：每周一 00:00 UTC（北京时间每周一 08:00），GitHub Actions 会自动触发 Python 脚本，拉取上游最新规则并合并发布到 `rules/` 目录。

---

## ⚡ 手动触发更新方案

若上游有紧急更新或你修改了 `custom/` 中的规则，无需等待一周，可通过以下方式**手动立即触发更新**：

1. 打开本项目在 GitHub 的网页页面。
2. 点击顶部导航栏的 **`Actions`** 选项卡。
3. 在左侧列表中选择 **`Weekly Clash Rule Merge Sync`** 工作流。
4. 点击右侧的 **`Run workflow`** 按钮，再点击绿色的 **`Run workflow`** 启动更新。

---

## 🔗 Clash / Stash 客户端订阅地址

可以使用以下两种方式进行订阅：

### 方式一：jsDelivr CDN 全球免费加速订阅（推荐）
适用于网络连通性较差的环境，通过 CDN 加速获取最新规则：

```yaml
rule-providers:
  # 示例 1: 引用精修版的中国域名分流规则 (jsDelivr CDN)
  China:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/China.yaml"
    path: ./rules/China.yaml
    interval: 86400

  # 示例 2: 引用 AppleAI 分流规则 (jsDelivr CDN)
  AppleAI:
    type: http
    behavior: classical
    url: "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/AppleAI.yaml"
    path: ./rules/AppleAI.yaml
    interval: 86400
```

### 方式二：GitHub Raw 直连订阅

```yaml
rule-providers:
  China:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/China.yaml"
    path: ./rules/China.yaml
    interval: 86400

  AppleAI:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/AppleAI.yaml"
    path: ./rules/AppleAI.yaml
    interval: 86400
```

---

## 📁 目录结构

```text
clash_rule/
├── custom/                 # 个人自定义规则（改动这里并提交即可）
│   ├── README.md
│   ├── Direct.yaml
│   └── Proxy.yaml
├── scripts/
│   └── merge_rules.py      # 自动拉取与合并处理脚本
├── .github/
│   workflows/
│       sync.yml            # 每周自动构建工作流
├── rules/                  # 自动生成的最终规则集合（客户端订阅此处）
└── README.md               # 本说明文档
```
